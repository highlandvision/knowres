<?php
/**
 * @package    Know Reservations
 * @subpackage Library
 * @copyright  Copyright (c) 2020, Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\KR;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Compute;
use HighlandVision\KR\Email\RegistrationEmail;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use InvalidArgumentException;
use Joomla\Registry\Registry;
use RuntimeException;
use stdClass;

use function abs;
use function count;
use function is_null;
use function is_numeric;
use function preg_replace;
use function property_exists;
use function rand;
use function round;
use function strtolower;

/**
 * Reservation hub
 *
 * @since 3.3.0
 */
class Hub
{
	/** @var object Agent row */
	public object $agent;
	/** @var stdClass Session contract data */
	protected stdClass $contractData;
	/** @var array Model validation errors */
	public array $errors = [];
	/** @var stdClass Original contract data KR options */
	public stdClass $original_data;
	/** @var Registry KR params */
	public Registry $params;
	/** @var object Property row */
	public object $property;
	/** @var array Property settings */
	public array $settings = [];
	/* @var string Today's date yyyy-mm-dd */
	public string $today;
	/** @var array Valid sessions */
	public array $valid_sessions
		= ['contractData',
		   'guestData',
		   'paymentData'];

	/**
	 * Constructor initialise
	 *
	 * @param  stdClass  $contractData  Contract session data
	 *
	 * @throws Exception
	 * @since  3.3.0
	 */
	public function __construct(stdClass $contractData)
	{
		$this->contractData = clone $contractData;

		$this->validateProperty();
		$this->validateArrival();
		$this->validateDeparture();
		$this->validateGuests();
		$this->validateId();

		$this->settings = KrFactory::getListModel('propertysettings')
		                           ->getPropertysettings($this->getValue('property_id'));
		$this->setValue('currency', $this->settings['currency']);
		$this->setValue('decimals', KrFactory::getListModel('currencies')
		                                     ->getDp($this->settings['currency']));
		if ($contractData->expiry_days == 0)
		{
			$this->setValue('expiry_days', $this->settings['expiry_days']);
		}
		if ($contractData->balance_days == 0)
		{
			$this->setValue('balance_days', $this->settings['balance_days']);
		}
		$this->setValue('nights', TickTock::differenceDays($this->getValue('arrival'), $this->getValue('departure')));
		$this->setValue('date_range',
			TickTock::allDatesBetween($this->getValue('arrival'), $this->getValue('departure'), true));
		$this->setValue('booking_type', $this->property->booking_type);

		$this->params = KrMethods::getParams();
		$this->today  = TickTock::getDateForTimezone('Y-m-d', $this->property->timezone);
	}

	/**
	 * Adjust nightly rates for all dates
	 *
	 * @param  float  $value     Discount value
	 * @param  bool   $increase  False to decrease nightly rate
	 *
	 * @throws RuntimeException
	 * @throws InvalidArgumentException
	 * @since  3.4.0
	 * @return array
	 */
	public function adjustNightly(float $value, bool $increase = true): array
	{
		$nightly   = $this->getValue('nightly');
		$last      = array_key_last($nightly);
		$remaining = $value;
		$per_night = round($value / $this->getValue('nights'), 2);
		if (!$increase)
		{
			$per_night = -abs($per_night);
		}

		foreach ($nightly as $date => $rate)
		{
			if ($date == $last)
			{
				$nightly[$date] = $rate - $remaining;
			}
			else
			{
				$nightly[$date] = $rate + $per_night;
			}

			$remaining = round($remaining - abs($per_night), 2);
		}

		return $nightly;
	}

	/**
	 * Process the core database updates and changes
	 *
	 * @param  array  $actions  Actions for contracts
	 *
	 * @throws Exception
	 * @since  3.3.0
	 * @return bool
	 */
	public function action(array $actions): bool
	{
		$this->errors = [];

		foreach ($actions as $a)
		{
			$core = match ($a)
			{
				'block' => new Core\Block(),
				'cancel' => new Core\Cancel(),
				'channel' => new Core\Channel(),
				'confirm' => new Core\Confirm(),
				'delete' => new Core\Delete(),
				'emails' => new Core\Emails(),
				'guest' => new Core\Guest(),
				'manager' => new Core\Manager(),
				'quick' => new Core\Quick(),
				'requestapprove' => new Core\Requestapprove(),
				'requestreject' => new Core\Requestreject(),
				'resurrect' => new Core\Resurrect(),
				'servicequeue' => new Core\Servicequeue(),
			};

			if (!$core->action($this))
			{
				return false;
			}
		}

		return true;
	}

	/**
	 * Check what type of guest and if we have an existing guest.
	 *
	 * @throws Exception
	 * @throws RuntimeException
	 * @since  3.3.0
	 */
	public function checkGuestUser(): void
	{
		$email = $this->getValue('email', 'guestData');
		$item  = KrFactory::getListModel('guests')->checkGuestEmail($email);
		if (!empty($item->id))
		{
			foreach ($item as $key => $value)
			{
				if (!$this->getValue($key, 'guestData'))
				{
					$this->setValue($key, $value, 'guestData');
				}
			}
		}
		else
		{
			if (!(int) $this->params->get('create_user', 0))
			{
				$this->setValue('id', 0, 'guestData');
			}
			else
			{
				$this->createUser();
			}
		}
	}

	/**
	 * Get the contract values
	 *
	 * @param  array  $computations   Computations to perform for contract
	 * @param  bool   $set_total      True to set the contract total
	 *                                normally when deposit is not required
	 *
	 * @throws RuntimeException
	 * @throws Exception
	 * @since  3.3.0
	 */
	public function compute(array $computations, bool $set_total = false): void
	{
		foreach ($computations as $t)
		{
			$compute = match ($t)
			{
				'agent' => new Compute\Agent(),
				'agentownerdeposit' => new Compute\AgentOwnerDeposit(),
				'base' => new Compute\Base(),
				'commission' => new Compute\Commission(),
				'coupon' => new Compute\Coupon(),
				'deposit' => new Compute\Deposit(),
				'discount' => new Compute\Discount(),
				'dow' => new Compute\Dow(),
				'extras' => new Compute\Extras(),
				'longstay' => new Compute\Longstay(),
				'override' => new Compute\Override(),
				'paymentdates' => new Compute\PaymentDates(),
				'ratemarkup' => new Compute\RateMarkup(),
				'seasons' => new Compute\Seasons(),
				'shortstay' => new Compute\Shortstay(),
				'tax' => new Compute\Tax(),
			};

			$compute->calculate($this);

			if ($t == 'base' && $this->getValue('room_total_gross') == 0)
			{
				$this->setValue('adjustments', []);
				$this->setValue('balance', 0);
				$this->setValue('deposit', 0);
				$this->setValue('discount', 0);
				$this->setValue('discounts', []);
				break;
			}

			if ($set_total)
			{
				$total = $this->round($this->getValue('room_total') + $this->getValue('extra_total')
					+ $this->getValue('tax_total'));
				$this->setValue('contract_total', $total);
			}
		}

		$this->resetShortBook();
	}

	/**
	 * Money display
	 *
	 * @param  float  $value  Value to be displayed
	 *
	 * @throws InvalidArgumentException
	 * @throws RuntimeException
	 * @since  3.3.0
	 * @return string
	 */
	public function currencyDisplay(float $value): string
	{
		return Utility::displayValue($value, $this->getValue('currency'), $this->getValue('decimals'));
	}

	/**
	 * Set booking status
	 *
	 * @throws Exception
	 * @since  3.3.0
	 * @return int
	 */
	public function doBookingStatus(): int
	{
		$booking_status = 1;
		if ($this->getValue('agent_deposit_paid'))
		{
			if ($this->getValue('deposit') != $this->getValue('contract_total'))
			{
				if (!$this->getValue('balance_days'))
				{
					$booking_status = 39;
				}
				else if ($this->getValue('balance_date') >= TickTock::getDate())
				{
					$booking_status = 10;
				}
				else
				{
					$booking_status = 30;
				}
			}
			else
			{
				$booking_status = 40;
			}
		}

		return $booking_status;
	}

	/**
	 * Return data
	 *
	 * @param  string  $session  Session data type to return
	 *
	 * @throws InvalidArgumentException
	 * @throws RuntimeException
	 * @since  3.3.0
	 * @return stdClass
	 */
	public function getData(string $session = 'contractData'): stdClass
	{
		$this->validateSession($session);

		return $this->$session;
	}

	/**
	 * Return original contract data
	 *
	 * @since  3.3.0
	 * @return stdClass
	 */
	public function getOriginalData(): stdClass
	{
		return $this->original_data;
	}

	/**
	 * Get individual session value
	 *
	 * @param  string  $key      Session key
	 * @param  string  $session  Session type
	 *
	 * @throws RuntimeException
	 * @throws InvalidArgumentException
	 * @since  3.3.0
	 * @return mixed
	 */
	public function getValue(string $key, string $session = 'contractData'): mixed
	{
		$this->validateSession($session, $key);

		return $this->$session->$key;
	}

	/**
	 * Round currency values as per decimal places
	 *
	 * @param  float  $value  Value to be rounded
	 *
	 * @throws InvalidArgumentException
	 * @throws RuntimeException
	 * @since  3.3.0
	 * @return float
	 */
	public function round(float $value): float
	{
		$value = round($value, $this->getValue('decimals'));
		if (!$value)
		{
			$value = abs($value);
		}

		return $value;
	}

	/**
	 * Set rate adjustment values
	 *
	 * @param  string  $type   Type of adjustment
	 * @param  string  $value  Adjustment calculation
	 * @param  string  $pc     Value used for calculation
	 * @param  string  $calc   Base calculation value
	 *
	 * @throws InvalidArgumentException
	 * @throws RuntimeException
	 * @since  3.3.0
	 */
	public function setAdjustments(string $type, string $value, string $pc, string $calc): void
	{
		$adjustments = $this->getValue('adjustments');

		$adjustments[$type] = ['value' => $value,
		                       'pc'    => $pc,
		                       'calc'  => $calc];

		$this->setValue('adjustments', $adjustments);
	}

	/**
	 * Set agent object
	 *
	 * @param  object  $agent  Agent row
	 *
	 * @throws RuntimeException
	 * @since  3.3.0
	 */
	public function setAgent(object $agent): void
	{
		if (empty($agent))
		{
			throw new RuntimeException('Agent data is not set');
		}

		$this->agent = $agent;
	}

	/**
	 * Set session data
	 *
	 * @param  stdClass  $data     Data
	 * @param  string    $session  Session type
	 *
	 * @throws InvalidArgumentException
	 * @throws RuntimeException
	 * @since  3.3.0
	 */
	public function setData(stdClass $data, string $session = 'contractData'): void
	{
		$this->validateSession($session);
		$this->$session = $data;
	}

	/**
	 * Set rate discount values
	 *
	 * @param  string  $type   Type of adiscount
	 * @param  float   $value  Discount calculation
	 * @param  string  $pc     Value used for calculation
	 * @param  string  $calc   Base calculation value
	 * @param  float   $base   Base calculation
	 *
	 * @since  3.3.0
	 */
	public function setDiscounts(string $type, float $value, string $pc, string $calc, float $base = 0): void
	{
		$this->contractData->discounts[$type] = ['value' => $value,
		                                         'pc'    => $pc,
		                                         'calc'  => $calc,
		                                         'base'  => $base
		];
	}

	/**
	 * Validate extras
	 *
	 * @throws InvalidArgumentException
	 * @throws RuntimeException
	 * @since  3.3.0
	 */
	public function setExtras(): void
	{
		$extras     = [];
		$quantities = $this->getValue('extra_quantities');
		$ids        = $this->getValue('extra_ids');

		for ($i = 0; $i < count($quantities); $i++)
		{
			if ($quantities[$i] > 0)
			{
				$extras[$ids[$i]] = ['quantity' => $quantities[$i],
				                     'value'    => 0];
			}
		}

		$this->setValue('extras', $extras);
	}

	/**
	 * Set original contract data for comparison
	 *
	 * @param  stdClass  $data  Original data
	 *
	 * @since 3.3.0
	 */
	public function setOriginalData(stdClass $data): void
	{
		$this->original_data = $data;
	}

	/**
	 * Set individual session value
	 *
	 * @param  string  $key      Session key
	 * @param  mixed   $value    Value
	 * @param  string  $session  Session type
	 *
	 * @throws InvalidArgumentException
	 * @throws RuntimeException
	 * @since 1.0.0
	 */
	public function setValue(string $key, mixed $value, string $session = 'contractData'): void
	{
		$this->validateSession($session, $key);

		$this->$session->$key = $value;
	}

	/**
	 * Money display for form field
	 *
	 * @param  float|string  $value  Value to be displayed
	 *
	 * @throws InvalidArgumentException
	 * @throws RuntimeException
	 * @since  3.3.0
	 * @return string
	 */
	public function valueDisplay(float|string $value): string
	{
		return Utility::displayMoney((float) $value, $this->getValue('decimals'));
	}

	/**
	 * Create new user
	 *
	 * @throws Exception
	 * @throws RuntimeException
	 * @since  3.3.0
	 */
	protected function createUser(): void
	{
		$email     = $this->getValue('email', 'guestData');
		$firstname = $this->getValue('firstname', 'guestData');
		$surname   = $this->getValue('surname', 'guestData');

		$user_id = KrFactory::checkUser($email);
		if (empty($user_id))
		{
			$username = $this->getUsername($firstname, $surname);
			$password = Cryptor::generateRandomString();
			$user_id  = KrMethods::registerUser($firstname . ' ' . $surname, $username, $email, $password);
			if ($user_id)
			{
				$Registration = new RegistrationEmail('USERREGISTRATION');
				$Registration->sendTheEmails($username, $password, $firstname . ' ' . $surname, $email);
			}
		}

		$this->setValue('user_id', $user_id, 'guestData');
	}

	/**
	 * Generate a username from guest input
	 *
	 * @param  string  $firstname  Guest first anme
	 * @param  string  $surname    Guest surname
	 *
	 * @since  3.3.1
	 * @return string
	 */
	protected function getUsername(string $firstname, string $surname): string
	{
		$valid = false;
		while (!$valid)
		{
			$username = $firstname[0] . $surname . rand(0, 1000);
			$username = strtolower(preg_replace('/[^A-Za-z\d_-]+/', "", $username));

			if (!KrFactory::checkUsername($username))
			{
				$valid = true;
			}
		}

		return $username;
	}

	/**
	 * Validate arrival date
	 *
	 * @throws InvalidArgumentException|RuntimeException
	 * @since  3.3.0
	 */
	protected function validateArrival(): void
	{
		$arrival = $this->getValue('arrival');
		if (!$arrival)
		{
			throw new InvalidArgumentException('Arrival must be supplied');
		}

		if (!TickTock::isValidDate($arrival))
		{
			throw new InvalidArgumentException('Arrival date is invalid');
		}

		$this->setValue('arrival', $arrival);
	}

	/**
	 * Validate departure date
	 *
	 * @throws InvalidArgumentException
	 * @throws RuntimeException
	 * @since  3.3.0
	 */
	protected function validateDeparture(): void
	{
		$departure = $this->getValue('departure');
		if (!$departure)
		{
			throw new InvalidArgumentException('Departure date must be supplied');
		}

		if (!TickTock::isValidDate($departure))
		{
			throw new InvalidArgumentException('Departure date is invalid');
		}

		if ($departure <= $this->getValue('arrival'))
		{
			throw new InvalidArgumentException('Departure is on or before arrival');
		}
	}

	/**
	 * Validate guest numbers
	 *
	 * @throws InvalidArgumentException
	 * @throws RuntimeException
	 * @since  3.3.0
	 */
	protected function validateGuests(): void
	{
		if (!$this->getValue('black_booking'))
		{
			$guests = $this->getValue('guests');
			if (!is_numeric($guests) || !$guests)
			{
				throw new InvalidArgumentException('#Guests should consist of numbers only and should not be zero');
			}

			//TODO-v4.1 Reinstate for adults, children and ages
			//			$free = $this->setFreeGuests();
			//			if ($guests > $this->property->sleeps + $this->property->sleeps_extra + $free)
			//			{
			//				throw new InvalidArgumentException('Adults plus Children exceed the sleeping capacity for this property');
			//			}
			//
			//			$children   = $this->getValue('children');
			//			$child_ages = $this->getValue('child_ages');
			//			if ($children > 0 && is_countable($child_ages))
			//			{
			//				if (count($child_ages) > 0 && count($child_ages) < $children)
			//				{
			//					throw new InvalidArgumentException('Please enter an age for each child');
			//				}
			//				if (count($child_ages) > 0 && count($child_ages) > $children)
			//				{
			//					throw new InvalidArgumentException('Number of children must match number of ages');
			//				}
			//
			//				foreach ($child_ages as $age)
			//				{
			//					if ($age < 0 or $age > 18)
			//					{
			//						throw new InvalidArgumentException('Please enter ages from 2 to 17 for each child');
			//					}
			//				}
			//			}
			//			else if ($children == 0 && is_countable($child_ages) && count($child_ages) > 0)
			//			{
			//				throw new InvalidArgumentException('Number of children must match number of ages');
			//			}
		}
	}

	//TODO-v4.1 Reinstate for adults, children and ages
	//	/**
	//	 * Set number of free guests - children under free infants age
	//	 *
	//	 * @throws InvalidArgumentException
	//	 * @throws RuntimeException
	//	 * @since  4.0.0
	//	 */
	//	public function setFreeGuests()
	//	{
	//		if (!$this->property->sleeps_infant_max)
	//		{
	//			$this->setValue('free_guests', 0);
	//		}
	//
	//		$child_ages = $this->getValue('child_ages');
	//		$free       = 0;
	//		foreach ($child_ages as $age)
	//		{
	//			if ($age <= $this->property->sleeps_infant_age && $free < $this->property->sleeps_infant_max)
	//			{
	//				$free++;
	//			}
	//		}
	//
	//		$this->setValue('free_guests', $free);
	//
	//		return $free;
	//	}

	/**
	 * Validate edit ID
	 *
	 * @throws InvalidArgumentException
	 * @throws RuntimeException
	 * @since  3.3.0
	 */
	protected function validateId(): void
	{
		$id = $this->getValue('id');
		if (!$id)
		{
			return;
		}

		if (!is_numeric($id))
		{
			throw new InvalidArgumentException('Edit Id should consist of numbers only and should not be zero');
		}
	}

	/**
	 * Validate property
	 *
	 * @throws InvalidArgumentException
	 * @throws RuntimeException
	 * @throws Exception
	 * @since  3.3.0
	 */
	protected function validateProperty(): void
	{
		$property_id = $this->getValue('property_id');
		if (!is_numeric($property_id) || !$property_id)
		{
			throw new InvalidArgumentException('Property ID must be non zero');
		}

		$this->property = KrFactory::getAdminModel('property')->getItem($property_id);
		if (empty($this->property->id))
		{
			throw new RuntimeException('Property ID not found');
		}
	}

	/**
	 * Validate session
	 *
	 * @param  string   $session  Session name
	 * @param  ?string  $key      Session key
	 *
	 * @throws InvalidArgumentException
	 * @throws RuntimeException
	 * @since  3.3.0
	 */
	protected function validateSession(string $session, string $key = null): void
	{
		if (!in_array($session, $this->valid_sessions))
		{
			throw new InvalidArgumentException('Invalid session value of ' . $session . ' requested');
		}

		if (!is_null($key))
		{
			if (!property_exists($this->$session, $key))
			{
				throw new RuntimeException('Variable does not exist for ' . $key . ' in ' . $session);
			}
		}
	}

	/**
	 * Reset short book fields after rate is calculated
	 *
	 * @throws RuntimeException
	 * @throws InvalidArgumentException
	 * @since  3.4.0
	 */
	private function resetShortBook(): void
	{
		if ($this->getValue('shortbook'))
		{
			if ($this->getValue('adjustmentsRq'))
			{
				$adj = $this->getValue('shortbook_nights') . ' nights charged at ' . $this->getValue('nights');
				$this->setAdjustments('Short Book', $adj, '', '');
			}

			$this->setValue('departure', $this->getValue('shortbook_departure'));
			$this->setValue('nights', $this->getValue('shortbook_nights'));
			$this->setValue('date_range', $this->getValue('shortbook_date_range'));
		}
	}
}