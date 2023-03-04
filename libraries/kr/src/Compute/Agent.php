<?php
/**
 * @package    Know Reservations
 * @subpackage Library
 * @copyright  Copyright (c) 2020, Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\KR\Compute;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Compute;
use HighlandVision\KR\Hub;

/**
 * Pricing for agent
 *
 * @since 3.3.0
 */
class Agent
{
	/** @var Hub Hub data. */
	protected Hub $Hub;

	/**
	 * Reverse calculate contract totals from agent value
	 *
	 * @param  Hub  $Hub  Hub base class
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	public function calculate(Hub $Hub): void
	{
		$this->Hub = $Hub;
		$this->calculateAgent();
	}

	/**
	 * Reverse calculate the contract values based on the agent value
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	private function calculateAgent(): void
	{
		$agent_value = (float) $this->Hub->getValue('agent_value');
		$extra_total = (float) $this->Hub->getValue('extra_total');
		$working     = $agent_value;

		if (!$this->Hub->agent->mandatory_extras_excluded)
		{
			$working = $agent_value - $extra_total;
		}

		$this->Hub->setValue('room_total', $working);
		$this->doTax();
		$room_total     = $this->Hub->round($working);
		$contract_total = $room_total;

		if (!$this->Hub->agent->mandatory_extras_excluded)
		{
			$contract_total += $extra_total;
		}

		$contract_total = $this->addIncludedTax($contract_total);
		if ($contract_total != $agent_value)
		{
			$room_total = $room_total + ($agent_value - $contract_total);
		}

		$contract_total = $room_total + $this->Hub->getValue('tax_total') + $extra_total;

		if ($this->Hub->agent->commission && !$this->Hub->getValue('agent_commission'))
		{
			$agent_commission = $agent_value * $this->Hub->agent->commission / 100;
			$this->Hub->setValue('agent_commission', $this->Hub->round($agent_commission));
		}

		$this->Hub->setValue('agent_deposit_paid', $this->Hub->agent->deposit_paid);
		$this->Hub->setValue('agent_deposit_unconfirmed', $this->Hub->agent->deposit_unconfirmed);
		$this->Hub->setValue('agent_deposit_unconfirmed_agent', $this->Hub->agent->deposit_unconfirmed_agent);
		$this->Hub->setValue('deposit_paid', $this->Hub->agent->deposit_paid);
		$this->Hub->setValue('agent_deposit', $this->Hub->agent->deposit);
		$this->Hub->setValue('agent_value', $agent_value);
		$this->Hub->setValue('contract_total', $contract_total);
		$this->Hub->setValue('room_total', $room_total);
		$this->Hub->setValue('room_total_gross', $room_total);
		$this->Hub->setValue('markup', 0);
	}

	/**
	 * Get the tax values
	 *
	 * @throws Exception
	 * @since  3.3.0
	 */
	private function doTax(): void
	{
		$tax = new Compute\Tax();
		$tax->calculate($this->Hub, true);
	}

	/**
	 * Add tax to working value if it is included in agent totals
	 *
	 * @param  float  $working  Working value
	 *
	 * @since  3.2.0
	 * @return float
	 */
	private function addIncludedTax(float $working): float
	{
		$taxes = $this->Hub->getValue('taxes');
		if (!empty($taxes[1]) && $taxes[1]['value'] > 0)
		{
			if ($this->isTaxIncluded($taxes[1]))
			{
				$working += $taxes[1]['value'];
			}
		}
		if (!empty($taxes[2]) && $taxes[2]['value'] > 0)
		{
			if ($this->isTaxIncluded($taxes[2]))
			{
				$working += $taxes[2]['value'];
			}
		}
		if (!empty($taxes[3]) && $taxes[3]['value'] > 0)
		{
			if ($this->isTaxIncluded($taxes[3]))
			{
				$working += $taxes[3]['value'];
			}
		}

		return $working;
	}

	/**
	 * Check if a tax is included
	 *
	 * @param  array  $tax  Tax values from tax calculation
	 *
	 * @since  4.0.0
	 * @return bool
	 */
	private function isTaxIncluded(array $tax): bool
	{
		if (!empty($tax['agent']) && $tax['type'] == 1)
		{
			return true;
		}

		return false;
	}
}