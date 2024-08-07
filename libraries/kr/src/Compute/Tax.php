<?php
/**
 * @package     Know Hubs
 * @subpackage  Library
 * @copyright   Copyright (c) 2020, Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\KR\Compute;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Hub;
use HighlandVision\KR\Utility;
use InvalidArgumentException;

use function count;
use function in_array;
use function min;

/**
 * Hub tax calculations
 *
 * @since 3.3.0
 */
class Tax
{
	/** @var Hub Hub data. */
	protected Hub $Hub;
	/** @var int ID mof agent. */
	protected int $agent_id = 0;
	/** @var float Net price. */
	protected float $room_total = 0;
	/** @var float Total tax calculated. */
	protected float $tax_total = 0;
	/** @var array Calculated tax values. */
	protected array $taxes = [];
	/** @var mixed Tax rate row. */
	protected mixed $trow;

	/**
	 * Process tax rates
	 *
	 * @param  Hub   $Hub    Hub base class
	 * @param  bool  $gross  Set true for agent reverse calculation
	 *
	 * @throws Exception
	 * @since  3.3.0
	 */
	public function calculate(Hub $Hub, bool $gross = false): void
	{
		$this->Hub = $Hub;

		if ((int) $this->Hub->params->get('tax_ignore') || !(int) $this->Hub->getValue('guests')) {
			return;
		}

		$this->room_total = $this->Hub->getValue('room_total');
		$this->agent_id   = $this->Hub->getValue('agent_id');

		$this->calculateTaxes($this->Hub->settings['tax_code_1'], $gross);
		$this->calculateTaxes($this->Hub->settings['tax_code_2'], $gross);
		$this->calculateTaxes($this->Hub->settings['tax_code_3'], $gross);

		$this->Hub->setValue('taxes', $this->taxes);
		$this->Hub->setValue('tax_total', $this->tax_total);
	}

	/**
	 * Calculate tax value for specific tax
	 *
	 * @param  float  $base     Base value
	 * @param  array  $agents   All agent_id who include the tax
	 * @param  int    $base_id  ID of base rate for supplements
	 *
	 * @throws InvalidArgumentException
	 * @since  2.5.0
	 * @return float Tax value
	 */
	protected function calcTaxValue(float $base, array $agents, int $base_id = 0): float
	{
		$tax = 0;

		if (!$this->trow->fixed) {
			// % calculation
			if ($this->trow->gross && !$base_id) {
				$tax = $base * ($this->trow->rate / (100 + $this->trow->rate));
			} else {
				// Rate excludes tax or supplemental tax
				$tax = $base * ($this->trow->rate / 100);
			}
		} else {
			// Fixed value calculation
			if (!$this->trow->per_night) {
				// Charge per stay
				$tax = $this->trow->rate;
			} else {
				// Charge per night
				$nights = $this->Hub->getValue('nights');
				$tax    = $this->trow->rate * min($nights,
				                                  $this->trow->max_nights > 0 ? $this->trow->max_nights : $nights);
			}

			if ($this->trow->basis) {
				// Per guest
				if ($this->trow->applicable_age > 17) {
					$tax = $tax * $this->Hub->getValue('adults');
				} else {
					$count = $this->Hub->getValue('adults');
					$ages  = $this->Hub->getValue('child_ages');
					foreach ($ages as $age) {
						if ($age >= $this->trow->applicable_age) {
							$count++;
						}
					}

					$tax = $tax * $count;
				}
			}
		}

		return $this->Hub->round($tax);
	}

	/**
	 * Calculate taxes
	 *
	 * @param  string  $code   Tax ID
	 * @param  bool    $gross  Set true for agent reverse calulation
	 *
	 * @throws Exception
	 * @since  3.3.0
	 */
	protected function calculateTaxes(string $code, bool $gross): void
	{
		if (empty($code)) {
			return;
		}

		$row = KrFactory::getListModel('taxrates')->getByCode($code, $this->Hub->getValue('arrival'));
		if (!is_countable($row) || count($row) != 1) {
			return;
		}

		$this->trow = $row[0];

		$agents = Utility::decodeJson($this->trow->agent, true);
		if (!is_countable($agents) || !count($agents)) {
			$agents = [];
		}
		$type = $this->setType($this->trow, $agents);
		if (!$type) {
			return;
		}

		if ($gross && in_array($this->agent_id, $agents)) {
			$this->trow->gross = true;
		}

		$tax = $this->calcTaxValue($this->room_total, $agents);
		if ($type <> 3) {
			$this->tax_total += $tax;
		}

		$this->taxes[$this->trow->id] = [
			'value'       => $tax,
			'pc'          => $this->trow->rate,
			'calc'        => $this->room_total,
			'type'        => $type,
			'id'          => $this->trow->id,
			'agent'       => $this->trow->agent,
			'gross'       => $this->trow->gross,
			'pay_arrival' => $this->trow->pay_arrival || $type == 3 ? 1 : 0,
			'taxrate_id'  => $this->trow->taxrate_id,
			'tt_option'   => $this->trow->tt_option,
			'base_id'     => 0
		];

		if ($this->trow->taxrate_id) {
			$base_id   = $this->trow->id;
			$gross     = $this->trow->gross;
			$poa       = $this->trow->pay_arrival || $type == 3 ? 1 : 0;
			$agent     = $this->trow->agent;
			$tt_option = $this->trow->tt_option;

			$this->trow = KrFactory::getAdminModel('taxrate')->getItem($this->trow->taxrate_id);
			$supplement = $this->calcTaxValue($tax, $agents, $base_id);
			if ($type <> 3) {
				$this->tax_total += $supplement;
			}

			$this->taxes[$this->trow->id] = [
				'value'       => $supplement,
				'pc'          => $this->trow->rate,
				'calc'        => $tax,
				'type'        => $type,
				'id'          => $this->trow->id,
				'agent'       => $agent,
				'gross'       => $gross,
				'pay_arrival' => $poa,
				'taxrate_id'  => $this->trow->taxrate_id,
				'tt_option'   => $tt_option,
				'base_id'     => $base_id
			];
		}
	}

	/**
	 * Set the tax type
	 *
	 * @param  mixed  $trow    Object or stdClass.
	 * @param  array  $agents  Agents who already include this tax.
	 *
	 * @throws InvalidArgumentException
	 * @since  4.0.0
	 * @return int 0->Do not charge, 1->Charge, 2->Gross, 3->POA.
	 */
	protected function setType(mixed $trow, array $agents): int
	{
		if (in_array($this->agent_id, $agents)) {
			return 1;
		}
		// if Agent and TT
		if ($this->agent_id && $trow->tax_type == 'TOURIST') {
			// if !age applicable
			if (!$trow->applicable_age) {
				return 1;
			}
			// if child ages set
			if ($this->Hub->getValue('child_ages_set')) {
				return 1;
			}
			// do not charge
			if (!$trow->tt_option) {
				return 0;
			}

			// if tt_option = 1 charge all adults as POA
			return 3;
		}

		if ($trow->gross) {
			return 2;
		}
		if ($trow->pay_arrival) {
			return 3;
		}

		return 1;
	}
}