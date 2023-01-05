<?php
/**
 * @package     KR
 * @subpackage  Library
 * @copyright   Copyright (C) 2021 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\KR\Owner;

use Exception;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\TickTock;
use InvalidArgumentException;
use RuntimeException;
use stdClass;

/**
 * Genertae payment scheule for owners
 *
 * @since  3.3.1
 */
class Payments
{
	/** @var object Contract row */
	protected object $contract;
	/** @var bool Owner set for net rates */
	protected bool $net;
	/** @var float Owner payment % */
	protected float $owner_pc = 0;
	/** @var ?float Previous payments total to owner */
	protected ?float $previous_total = 0;
	/** @var object Payment data */
	protected object $payment;
	/** @var string Payment type */
	private string $type;
	/** @var string Today */
	private string $today;

	/**
	 * Initialize
	 *
	 * @param   object  $payment  Payment data
	 * @param   string  $type     Payment type
	 *
	 * @throws Exception
	 * @since  3.3.1
	 */
	public function __construct(object $payment, string $type)
	{
		$this->today   = TickTock::getDate();
		$this->payment = $payment;
		$this->type    = $type;
		$this->readData();
		$this->owner_pc = (100 - $this->payment->commission) / 100;
	}

	/**
	 * Read Contract
	 *
	 * @throws RuntimeException
	 * @throws InvalidArgumentException|Exception
	 * @since  3.3.1
	 */
	protected function readContract(): void
	{
		$this->contract = KrFactory::getAdminModel('contract')->getItem($this->payment->contract_id);
		if (!$this->contract->id)
		{
			throw new RuntimeException('Contract not found for id ' . $this->contract_id);
		}
	}

	/**
	 * Read required database tables
	 *
	 * @throws Exception
	 * @since  3.3.1
	 */
	protected function readData(): void
	{
		$this->readContract();
		$this->net            = $this->getSetting($this->contract->property_id, 'net_rates');
		$this->previous_total = KrFactory::getListModel('ownerpayments')
		                                 ->getTotalForContract($this->payment->contract_id);
		if (is_null($this->previous_total))
		{
			$this->previous_total = 0;
		}
	}

	/**
	 * Get property setting
	 *
	 * @param   int     $property_id  ID of property
	 * @param   string  $name         Name of settings
	 *
	 * @since  3.3.1
	 * @return mixed
	 */
	protected function getSetting(int $property_id, string $name): mixed
	{
		$settings = KrFactory::getListModel('propertysettings')->getOneSetting($name);

		if (!isset($settings[$property_id]))
		{
			return $settings[0];
		}
		else
		{
			return $settings[$property_id];
		}
	}

	/**
	 * Insert owner payment
	 *
	 * @param   float  $amount  Payment value
	 *
	 * @throws Exception
	 * @since  3.3.1
	 */
	protected function addOwnerPayment(float $amount): void
	{
		$ps               = new stdClass();
		$ps->owner_id     = $this->payment->owner_id;
		$ps->contract_id  = $this->payment->contract_id;
		$ps->amount       = $amount;
		$ps->calculated   = $amount;
		$ps->type         = $this->type;
		$ps->payment_date = $this->today;
		$ps->state        = 1;
		$ps->created_at   = TickTock::getTs();
		KrFactory::insert('owner_payment', $ps);
	}
}