<?php
/**
 * @package    Know Reservations
 * @subpackage Admin Models
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Administrator\Model;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Joomla\Extend\AdminModel;
use HighlandVision\KR\Utility;
use Joomla\CMS\Form\Form;
use Joomla\CMS\Object\CMSObject;

/**
 * Knowres contract payment model.
 *
 * @since 1.0.0
 */
class ContractpaymentModel extends AdminModel
{
	/**  @var string The type alias. */
	public $typeAlias = 'com_knowres.contractpayment';
	/** @var mixed Batch copy/move command. If set to false, the batch copy/move command is not supported. */
	protected $batch_copymove = false;
	/**  @var ?string The prefix to use with controller messages. */
	protected $text_prefix = 'COM_KNOWRES_PAYMENT';

	/**
	 * Calculate full balance (includes unconfirmed payments) and confirmed balances
	 *
	 * @param   CMSObject  $contract  Contract row
	 * @param   array      $payments  Contract payments
	 * @param   array      $fees      Contract fees
	 *
	 * @since  4.0.0
	 * @return array [Confirmed balance, Full balance].
	 */
	public static function setBalances(CMSObject $contract, array $payments = [], array $fees = []): array
	{
		$balance = $contract->contract_total;
		foreach ($fees as $f)
		{
			$balance += $f->value;
		}

		$balance_all = $balance;

		foreach ($payments as $p)
		{
			$balance_all -= $p->base_amount;
			if ($p->confirmed)
			{
				$balance -= $p->base_amount;
			}
		}

		return [Utility::roundValue($balance, $contract->currency),
		        Utility::roundValue($balance_all, $contract->currency)];
	}

	/**
	 * Method to get a knowres record.
	 *
	 * @param   int  $pk  The id of the primary key.
	 *
	 * @throws Exception
	 * @since  1.0.0
	 * @return CMSObject|false  Object on success, false on failure.
	 */
	public function getItem($pk = null): CMSObject|false
	{
		/* @var ContractpaymentModel $item */
		$item = parent::getItem($pk);
		if ($item)
		{
			if ($item->service_id > 0)
			{
				/* @var ServiceModel $service */
				$service              = KrFactory::getAdminModel('service')->getItem($item->service_id);
				$item->service_name   = $service->name;
				$item->service_plugin = $service->plugin;
			}
		}

		return $item;
	}

	/**
	 * Add additional validation to form data
	 *
	 * @param   Form   $form  The form to validate against.
	 * @param   array  $data  The data to validate.
	 * @param   null   $group
	 *
	 * @since  1.0.0
	 * @return bool|array
	 */
	public function validate($form, $data, $group = null): bool|array
	{
		$data = parent::validate($form, $data, $group);
		if ($data === false)
		{
			return false;
		}

		if (!(float) $data['amount'])
		{
			$this->setError("Please enter a payment amount");

			return false;
		}

		if ((float) $data['amount'] < 0)
		{
			$this->setError("Please remove the - sign from the Amount and set Refund to Yes");

			return false;
		}

		if ($data['currency_res'] == $data['currency'])
		{
			$data['rate']        = 1;
			$data['base_amount'] = $data['amount'];

			return $data;
		}
		else
		{
			if (((float) $data['rate'] == 1 && !(float) $data['base_amount'])
				|| ((float) $data['rate'] == 0
					&& (float) $data['base_amount'] == 0))
			{
				$this->setError("Please enter Reservation amount or rate");

				return false;
			}
			else
			{
				if ((float) $data['base_amount'] == 0 && (float) $data['rate'] > 0)
				{
					$data['base_amount'] = round((float) $data['amount'] / (float) $data['rate'], 2);
				}
				else if (((float) $data['rate'] == 0 || (float) $data['rate'] == 1) && (float) $data['base_amount'] > 0)
				{
					$data['rate'] = round((float) $data['amount'] / (float) $data['base_amount'], 4);
				}

				return $data;
			}
		}
	}

	/**
	 * Method to get the data that should be injected in the form.
	 *
	 * @throws Exception
	 * @since  1.0.0
	 * @return mixed The data for the form.
	 */
	protected function loadFormData(): mixed
	{
		$data = KrMethods::getUserState('com_knowres.edit.contractpayment.data', []);
		if (empty($data))
		{
			$data = $this->getItem();
		}

		return $data;
	}
}