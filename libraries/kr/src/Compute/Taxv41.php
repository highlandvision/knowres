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
use InvalidArgumentException;
use RuntimeException;

use function min;

/**
 * Hub tax calculations
 *
 * @since 3.3.0
 */
class Taxv41
{
	//TODO-v4.1 reinstate as Tax.php when adults, children and ages sorted.
	/** @var Hub Hub data. */
	protected Hub $Hub;
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
	 * @param  Hub  $Hub  Hub base class
	 *
	 * @throws RuntimeException|Exception
	 * @since  3.3.0
	 */
	public function calculate(Hub $Hub): void
	{
		$this->Hub = $Hub;

		if ((int) $this->Hub->params->get('tax_ignore') || (int) $this->Hub->settings['tax_ignore']
			|| !(int) $this->Hub->getValue('adults'))
		{
			return;
		}

		$this->room_total = $this->Hub->getValue('room_total');

		$this->calculateTaxes($this->Hub->settings['tax_code_1']);
		$this->calculateTaxes($this->Hub->settings['tax_code_2']);
		$this->calculateTaxes($this->Hub->settings['tax_code_3']);

		$this->Hub->setValue('taxes', $this->taxes);
		$this->Hub->setValue('tax_total', $this->tax_total);
	}

	/**
	 * Calculate taxes
	 *
	 * @param  string  $code  Tax ID
	 *
	 * @throws Exception
	 * @since  3.3.0
	 */
	protected function calculateTaxes(string $code): void
	{
		if (!empty($code))
		{
			$row = KrFactory::getListModel('taxrates')->getByCode($code, $this->Hub->getValue('arrival'));
			if (!is_countable($row) || count($row) != 1)
			{
				return;
			}

			$this->trow                   = $row[0];
			$tax                          = $this->calcTaxValue($this->room_total);
			$this->taxes[$this->trow->id] = [
				'value'       => $tax,
				'pc'          => $this->trow->rate,
				'calc'        => $this->room_total,
				'type'        => $this->trow->pay_arrival ? 3 : 1,
				'id'          => $this->trow->id,
				'agent'       => $this->trow->agent,
				'gross'       => $this->trow->gross,
				'pay_arrival' => $this->trow->pay_arrival,
				'taxrate_id'  => $this->trow->taxrate_id,
				'base_id'     => 0
			];

			if ($this->trow->taxrate_id)
			{
				$base_id                      = $this->trow->id;
				$this->trow                   = KrFactory::getAdminModel('taxrate')->getItem($this->trow->taxrate_id);
				$supplement                   = $this->calcTaxValue($tax, $base_id);
				$this->taxes[$this->trow->id] = [
					'value'       => $supplement,
					'pc'          => $this->trow->rate,
					'calc'        => $tax,
					'type'        => $this->trow->pay_arrival ? 3 : 1,
					'id'          => $this->trow->id,
					'agent'       => $this->trow->agent,
					'gross'       => $this->trow->gross,
					'pay_arrival' => $this->trow->pay_arrival,
					'taxrate_id'  => $this->trow->taxrate_id,
					'base_id'     => $base_id
				];
			}
		}
	}

	/**
	 * Calculate tax value for specific tax
	 *
	 * @param  float  $base     Base value
	 * @param  int    $base_id  ID of base rate for supplments
	 *
	 * @throws InvalidArgumentException
	 * @throws RuntimeException
	 * @since  2.5.0
	 * @return float Tax value
	 */
	protected function calcTaxValue(float $base, int $base_id = 0): float
	{
		if (!$this->trow->fixed)
		{
			// Percentage calculation
			if ($this->trow->gross && !$base_id)
			{
				$tax = $base - ($base / (($this->trow->rate / 100) + 1));
			}
			else
			{
				// Rate excludes tax or supplemental tax
				$tax = $base * ($this->trow->rate / 100);
			}
		}
		else
		{
			// Fixed value calculation
			if (!$this->trow->per_night)
			{
				// Charge per stay
				$tax = $this->trow->rate;
			}
			else
			{
				// Charge per night
				$nights = $this->Hub->getValue('nights');
				$tax    = $this->trow->rate * min($nights,
						$this->trow->max_nights > 0 ? $this->trow->max_nights : $nights);
			}

			if ($this->trow->basis)
			{
				// Per guest
				if ($this->trow->applicable_age > 17)
				{
					$tax = $tax * $this->Hub->getValue('adults');
				}
				else
				{
					$count = $this->Hub->getValue('adults');
					$ages  = $this->Hub->getValue('child_ages');
					foreach ($ages as $age)
					{
						if ($age >= $this->trow->applicable_age)
						{
							$count++;
						}
					}

					$tax = $tax * $count;
				}
			}
		}

		$tax = $this->Hub->round($tax);
		if (!$this->trow->gross && !$this->trow->pay_arrival)
		{
			$this->tax_total += $tax;
		}

		return $tax;
	}
}