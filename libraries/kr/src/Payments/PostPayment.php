<?php
/**
 * @package     Know Reservations
 * @subpackage  Site Controller
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\KR\Payments;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Email\ContractEmail;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Logger;
use HighlandVision\KR\Session as KrSession;
use HighlandVision\KR\TickTock;
use HighlandVision\KR\Utility;
use InvalidArgumentException;
use RuntimeException;
use stdClass;

use function defined;
use function is_numeric;

/**
 * Service gateways
 * OBD - Online booking deposit
 * OBR - Online booking request
 * PBD = Post booking deposit from manager booking
 * PBB = Post booking balance
 * RBD = Post booking deposit from request booking
 * CBB = Channel booking balance
 *
 * @since 3.3.1
 */
class PostPayment
{
	/* @var false|object Contract item */
	private false|object $contract;
	/* @var int ID of contract */
	private int $contract_id;
	/** @var array Form fields */
	protected array $fields = [];
	/* @var false|object Guest item */
	private false|object $guest;
	/* @var object|null Service parameters */
	protected ?object $parameters = null;
	/* @var stdClass Payment session data */
	protected stdClass $paymentData;
	/* @var int Service ID */
	protected int $service_id = 0;

	/**
	 * Initialize
	 *
	 * @param  int       $service_id   ID of service
	 * @param  stdClass  $paymentData  Session payment data
	 *
	 * @throws Exception
	 * @since  3.3.1
	 */
	public function __construct(int $service_id, stdClass $paymentData)
	{
		$this->setService($service_id);

		$this->paymentData = $paymentData;
		if (!$this->paymentData->payment_type)
		{
			throw new InvalidArgumentException('Payment type should not be empty');
		}

		$this->setContractId($this->paymentData->contract_id);
	}

	/**
	 * Process payment data
	 *
	 * @throws Exception
	 * @since  3.3.1
	 */
	public function processPayment(): void
	{
		$this->readTables();
		$this->saveAll();
		$this->sendEmails();
		$this->reset();
	}

	/**
	 * Read Contract
	 *
	 * @throws RuntimeException
	 * @throws InvalidArgumentException
	 * @throws Exception
	 * @since  3.3.1
	 */
	protected function readContract(): void
	{
		if (!$this->contract_id)
		{
			throw new InvalidArgumentException('Contract ID must be non zero');
		}

		$this->contract = KrFactory::getAdminModel('contract')->getItem($this->contract_id);
		if (!$this->contract->id)
		{
			throw new RuntimeException('Contract not found for id ' . $this->contract_id);
		}
	}

	/**
	 * Read Guest
	 *
	 * @throws RuntimeException
	 * @throws InvalidArgumentException
	 * @throws Exception
	 * @since  3.3.1
	 */
	protected function readGuest(): void
	{
		if (!$this->contract->guest_id)
		{
			throw new InvalidArgumentException('Contract Guest ID must be non zero');
		}

		$this->guest = KrFactory::getAdminModel('guest')->getItem($this->contract->guest_id);
		if (!$this->guest->id)
		{
			throw new RuntimeException('Guest not found for ID ' . $this->contract->guest_id);
		}
	}

	/**
	 * Read Payment for RBD
	 *
	 * @throws RuntimeException
	 * @since  3.3.1
	 */
	protected function readPayment(): void
	{
		$payment = KrFactory::getListModel('contractpayments')->getPending($this->contract_id, $this->service_id);
		if (!$payment->id)
		{
			throw new RuntimeException('Payment not found for id ' . $this->contract_id);
		}
	}

	/**
	 * Set the service
	 *
	 * @param  int  $service_id  ID of service
	 *
	 * @throws Exception
	 * @since  1.2.2
	 */
	protected function setService(int $service_id): void
	{
		$service = KrFactory::getAdminModel('service')->getItem($service_id);
		if (!$service->id)
		{
			throw new RuntimeException('Service not found for ID ' . $service_id);
		}

		$this->service_id = $service_id;
	}

	/**
	 * Read database for required tables
	 *
	 * @throws RuntimeException
	 * @throws InvalidArgumentException
	 * @throws Exception
	 * @since  3.3.1
	 */
	protected function readTables(): void
	{
		$this->readContract();
		$this->readGuest();
		if ($this->paymentData->payment_type == 'RBD')
		{
			$this->readPayment();
		}
	}

	/**
	 * Reset session and state
	 *
	 * @throws Exception
	 * @since  3.3.1
	 */
	protected function reset(): void
	{
		KrMethods::setUserState('com_knowres.edit.contract.data', null);
		KrMethods::setUserState('com_knowres.edit.guest.data', null);
		KrMethods::setUserState('com_knowres.edit.confirm.data', null);

		$userSession              = new KrSession\User();
		$userData                 = $userSession->getData();
		$userData->pr_contract_id = $this->contract_id;
		$userSession->setData($userData);

		$paymentSession = new KrSession\Payment();
		$paymentSession->resetData();
		$contractSession = new KrSession\Contract();
		$contractSession->resetData();
		$guestSession = new KrSession\Guest();
		$guestSession->resetData();
	}

	/**
	 * Save the payment and other data
	 *
	 * @throws RuntimeException
	 * @throws Exception
	 * @since  3.3.1
	 */
	protected function saveAll(): void
	{
		try
		{
			$db = KrFactory::getDatabase();
			$db->transactionStart();

			$modelPayment = KrFactory::getAdminModel('contractpayment');
			$modelPayment->save((array) $this->paymentData);
			$payment_id = $modelPayment->getState('contractpayment.id');

			if ($this->paymentData->payment_type == 'OBR' && $this->paymentData->customer_ref)
			{
				$this->updateGuest();
			}

			$this->saveFee($payment_id);
			$this->updateIncludedFees($payment_id);
			$this->updateContract();

			$db->transactionCommit();
		}
		catch (Exception $e)
		{
			$db->transactionRollback();
			Logger::logMe($e->getMessage());
			throw $e;
		}
	}

	/**
	 * Save the surcharge fee
	 *
	 * @param  int  $payment_id  The payment ID related to the fee
	 *
	 * @throws Exception
	 * @since  3.3.1
	 */
	protected function saveFee(int $payment_id): void
	{
		if ($this->paymentData->base_surcharge > 0 && $this->paymentData->payment_type != 'RBD')
		{
			$fee                      = new stdClass();
			$fee->id                  = 0;
			$fee->description         = KrMethods::plain('COM_KNOWRES_PAYMENT_SURCHARGE');
			$fee->value               = $this->paymentData->base_surcharge;
			$fee->contract_id         = $this->paymentData->contract_id;
			$fee->contract_payment_id = $payment_id;
			$fee->created_at          = TickTock::getTS();
			$fee->created_by          = KrMethods::getUser()->id;
			KrFactory::insert('contract_fee', $fee);
		}
	}

	/**
	 * Send emails based on the payment type
	 *
	 * @throws Exception
	 * @since  3.3.1
	 */
	protected function sendEmails(): void
	{
		if (!$this->paymentData->manual)
		{
			if ($this->paymentData->payment_type == 'OBR')
			{
				// Booking request
				$email = new ContractEmail('BOOKREQUEST');
				$email->sendTheEmails($this->paymentData->contract_id, $this->paymentData->amount,
					$this->paymentData->currency, $this->service_id);
			}
			else if ($this->paymentData->payment_type == 'RBD')
			{
				// Booking request deposit
				$email = new ContractEmail('BOOKREQUESTCONFIRM');
				$email->sendTheEmails($this->paymentData->contract_id, $this->paymentData->amount,
					$this->paymentData->currency, $this->service_id);
			}
			else if ($this->paymentData->payment_type == 'OBD' || $this->paymentData->payment_type == 'PBD')
			{
				// Online deposit
				$email = new ContractEmail('BOOKCONFIRM');
				$email->sendTheEmails($this->paymentData->contract_id, $this->paymentData->amount,
					$this->paymentData->currency, $this->service_id);
			}
			else if ($this->paymentData->payment_type == 'PBB' || $this->paymentData->payment_type == 'CBB')
			{
				// Balance
				$email = new ContractEmail('PAYRECEIPT');
				$email->sendTheEmails($this->paymentData->contract_id, $this->paymentData->amount,
					$this->paymentData->currency, $this->service_id);
			}
		}
		else
		{
			// Manual gateways
			$email = new ContractEmail('PAYINIT');
			$email->sendTheEmails($this->paymentData->contract_id, $this->paymentData->amount,
				$this->paymentData->currency, $this->service_id);
		}
	}

	/**
	 * Set contract ID
	 *
	 * @param  int  $contract_id  ID of contract
	 *
	 * @throws InvalidArgumentException
	 * @since  3.3.1
	 */
	protected function setContractId(int $contract_id): void
	{
		if (!is_numeric($contract_id) || !$contract_id)
		{
			throw new InvalidArgumentException('Contract ID should consist of numbers only and should not be zero');
		}

		$this->contract_id = $contract_id;
	}

	/**
	 * Update changes for contract values
	 *
	 * @throws Exception
	 * @since  3.3.1
	 */
	protected function updateContract(): void
	{
		$update             = new stdClass();
		$update->id         = $this->paymentData->contract_id;
		$update->updated_at = TickTock::getTS();
		$update->updated_by = KrMethods::getUser()->id;

		if (!$this->paymentData->manual)
		{
			$update = $this->updateContractForOnlinePayment($update);
		}
		else
		{
			if ($this->paymentData->payment_type == 'OBD' || $this->paymentData->payment_type == 'PBD')
			{
				$update->state          = 1;
				$update->booking_status = 5;
				$update->expiry_date    = $this->paymentData->expiry_date;
			}
			else if ($this->paymentData->payment_type == 'PBB')
			{
				$update->booking_status = 35;
			}
		}

		KrFactory::update('contract', $update);
	}

	/**
	 * Update contract data for an online payment
	 *
	 * @param  stdClass  $update  Update data
	 *
	 * @throws Exception
	 * @since  3.3.1
	 * @return stdClass
	 */
	protected function updateContractForOnlinePayment(stdClass $update): stdClass
	{
		switch ($this->paymentData->payment_type)
		{
			case 'OBR':
				$update->state          = 1;
				$update->booking_status = 1;

				break;
			case 'CBD':
			case 'OBD':
			case 'PBD':
			case 'RBD':
				$update->state      = 1;
				$update->on_request = 0;
				if (Utility::compareFloat($this->paymentData->base_amount,
					$this->contract->contract_total + $this->paymentData->base_surcharge))
				{
					if (!$this->paymentData->confirmed)
					{
						$update->booking_status = 5;
					}
					else
					{
						$update->booking_status = 40;
					}
				}
				else
				{
					if (!$this->paymentData->confirmed)
					{
						$update->booking_status = 5;
					}
					else if (!$this->contract->balance_days)
					{
						$update->booking_status = 39;
					}
					else if ($this->contract->balance_date <= TickTock::getDate()
						|| ($this->contract->balance_date == $this->contract->arrival
							&& $this->contract->balance_date == $this->contract->expiry_date))
					{
						$update->booking_status = 30;
					}
					else
					{
						$update->booking_status = 10;
					}
				}

				break;
			case 'PBB':
			case 'CBB':
				if (!$this->paymentData->confirmed)
				{
					$update->booking_status = 35;
				}
				else if (!$this->contract->balance_days)
				{
					$update->booking_status = 39;
				}
				else
				{
					$update->booking_status = 40;
				}

				break;
			default:
				break;
		}

		return $update;
	}

	/**
	 * Update guest with new customer_ref
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	protected function updateGuest(): void
	{
		$update               = new stdClass();
		$update->id           = $this->guest->id;
		$update->customer_ref = $this->paymentData->customer_ref;
		$update->updated_at   = TickTock::getTS();

		KrFactory::update('guest', $update);
	}

	/**
	 * Update the payment ID for any fees included
	 * with this payment
	 *
	 * @param  int  $payment_id  ID of payment
	 *
	 * @since  1.0.0
	 */
	protected function updateIncludedFees(int $payment_id): void
	{
		KrFactory::getListModel('contractfees')->updatePaidFees($this->paymentData->contract_id, $payment_id);
	}
}