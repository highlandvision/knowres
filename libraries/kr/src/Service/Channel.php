<?php
/**
 * @package     Know Reservations
 * @subpackage  Library
 * @copyright   Copyright (c) 2020, Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\KR\Service;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Hub;
use HighlandVision\KR\Service;
use HighlandVision\KR\TickTock;
use InvalidArgumentException;
use RuntimeException;
use stdClass;

/**
 * Service channel
 *
 * @since  1.2.2
 */
class Channel extends Service
{
	/** @var object Agent row */
	protected object $agent;
	/** @var stdClass Contract session data */
	protected stdClass $contractData;
	/** @var array DOW wfor date $range */
	protected array $dow = [];
	/** @var string Final date to send */
	protected string $final = '';
	/** @var string First date to send */
	protected string $first = '';
	/** @var string Current foreign booking */
	protected string $foreign_booking = '';
	/** @var string Foreign key */
	protected string $foreign_key = '';
	/** @var array Hold form data */
	protected array $form;
	/** @var stdClass Guest session data */
	protected stdClass $guestData;
	/** @var Hub Hub */
	protected Hub $Hub;
	/** @var array Rooms for the property */
	protected array $property_rooms = [];
	/** @var object Property xref */
	protected object $property_xref;
	/** @var array Required date range */
	protected array $range = [];
	/** @var array Service property xrefs */
	protected array $xrefs;

	/**
	 * Constructor
	 *
	 * @param   int  $service_id  ID of service
	 * @param   int  $test        1 for testing
	 *
	 * @throws Exception
	 * @since  1.2.2
	 */
	public function __construct(int $service_id, int $test = 1)
	{
		parent::__construct($service_id, $test);
	}

	/**
	 * Get the booking agent either from the foreign key or the agent ID
	 * This will depend on the CM/channel being processed
	 *
	 * @param   string  $foreign_key  The agent foreign key
	 * @param   int     $agent_id     The ID for the agent
	 * @param   bool    $confirmed    Set to true to return confirmed agent info
	 *
	 * @throws RuntimeException
	 * @throws Exception
	 * @since  3.1.0
	 * @return void
	 */
	protected function setAgent(string $foreign_key, int $agent_id = 0, bool $confirmed = false): void
	{
		if ($agent_id)
		{
			$this->agent = KrFactory::getAdminModel('agent')->getItem($agent_id);
			if (!$this->agent->id)
			{
				throw new RuntimeException('Agent not found for ID ' . $agent_id);
			}
		}
		else if ($foreign_key)
		{
			$agents = KrFactory::getListModel('agents')->getAgentByForeignKey($this->service_id, $foreign_key);
			if (count($agents) == 1)
			{
				$this->agent = $agents[0];
			}
			else
			{
				foreach ($agents as $agent)
				{
					if ($agent->deposit_paid && $confirmed)
					{
						$this->agent = $agent;
						break;
					}
					else if (!$agent->deposit_paid && !$confirmed)
					{
						$this->agent = $agent;
						break;
					}
				}
			}

			if (!$this->agent->id)
			{
				throw new RuntimeException('Agent not found for foreign key ' . $foreign_key);
			}
		}
	}

	/**
	 * Calculate channel commission (if any)
	 *
	 * @param   float  $service_value  Booking value
	 *
	 * @since  2.3.0
	 * @return float
	 */
	protected function getChannelCommission(float $service_value): float
	{
		if (empty($this->parameters->commission_pc))
		{
			return 0.0;
		}

		$pc = (float) $this->parameters->commission_pc;

		return $this->Hub->round($service_value * $pc / 100);
	}

	/**
	 * Get contract id from foreign key
	 *
	 * @since  1.2.2
	 * @return bool|array
	 */
	protected function getContractByForeignKey(): bool|array
	{
		$contract_ids = KrFactory::getListModel('servicexrefs')
		                         ->getContractForForeignKey($this->service_id, $this->foreign_booking);
		if (!count($contract_ids))
		{
			return false;
		}
		else
		{
			return $contract_ids;
		}
	}

	/**
	 * Get property descriptions
	 *
	 * @param   string  $name  Name of field holding data to display
	 *
	 * @since  1.2.2
	 * @return array
	 */
	protected function getDescriptions(string $name): array
	{
		$descriptions = [];
		$fields       = [];

		if (!$name)
		{
			return $descriptions;
		}

		if (!isset($this->parameters->$name) || !is_array($this->parameters->$name))
		{
			return $descriptions;
		}

		foreach ($this->parameters->$name as $f)
		{
			$fields[] = 'p' . $f;
		}

		if (count($fields))
		{
			$text = KrFactory::getListModel('translations')->getTranslationByItem('property', $this->property->id);
			foreach ($fields as $f)
			{
				foreach ($text as $t)
				{
					if ($t->field == $f)
					{
						if (!isset($descriptions[$t->language]))
						{
							$descriptions[$t->language] = '';
						}

						$descriptions[$t->language] .= $t->text . "\n\n";
					}
				}
			}
		}

		return $descriptions;
	}

	/**
	 * Read xref for property
	 *
	 * @param   int  $property_id  ID of property
	 *
	 * @throws RuntimeException
	 * @throws RuntimeException
	 * @since  3.3.0
	 */
	protected function readServiceXrefProperty(int $property_id)
	{
		if (!$property_id)
		{
			throw new InvalidArgumentException('Property ID must be non zero');
		}

		$data = KrFactory::getListModel('servicexrefs')->getServiceProperty($this->service->id, $property_id);
		if (!count($data) || count($data) > 1)
		{
			throw new RuntimeException('Zero or multiple service xref records found for service ' . $this->service_id
				. ' property ID ' . $property_id);
		}

		$this->property_xref = $data[0];
	}

	/**
	 * Save new or modified reservation
	 *
	 * @throws Exception
	 * @since  2.3.0
	 * @return bool
	 */
	protected function saveContract(): bool
	{
		$computations = [
			'base',
			'dow',
			'seasons',
			'shortstay',
			'longstay',
			'ratemarkup',
			'discount',
			'tax',
			'extras',
			'deposit',
			'paymentdates',
			'commission',
			'agentownerdeposit'
		];

		$this->Hub->compute($computations);

		$room_total = $this->Hub->getValue('room_total');
		if (!$room_total)
		{
			throw new RuntimeException('Contract total could not be calculated');
		}

		$computations = [
			'extras',
			'discount',
			'agent',
			'tax',
			'deposit',
			'paymentdates',
			'commission',
		];
		$this->Hub->compute($computations);

		$actions = ['channel',
		            'servicequeue',
		            'emails'];

		return $this->Hub->action($actions);
	}

	/**
	 * Set the date range to process
	 *
	 * @throws Exception
	 * @since  3.3.1
	 */
	protected function setDateRange()
	{
		$this->range = TickTock::allDatesBetween($this->first, $this->final);
		$this->dow   = TickTock::allDowBetween($this->first, $this->final);
	}

	/**
	 * Set the date range to process
	 *
	 * @param   string  $first  First date
	 * @param   int     $cbl    Max advance bookings for channel
	 * @param   int     $abl    Max advance bookings from property settings
	 *
	 * @throws Exception
	 * @since  3.3.1
	 */
	protected function setDates(string $first, int $cbl, int $abl = 365)
	{
		$this->first = $first;

		$channel     = TickTock::modifyDays($this->first, $cbl);
		$settings    = TickTock::modifyDays($this->first, $abl);
		$this->final = min($settings, $channel);
	}
}