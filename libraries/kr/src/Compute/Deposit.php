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
use HighlandVision\KR\Hub;
use HighlandVision\KR\TickTock;

use function ceil;

/**
 * Compute deposit payment
 *
 * @since 3.9.3
 */
class Deposit
{
	/** @var Hub $Hub Hub. */
	protected Hub $Hub;

	/**
	 * Calculate deposit payment
	 *
	 * @param  Hub  $Hub  Hub base class
	 *
	 * @throws Exception
	 * @since 1.0.0
	 */
	public function calculate(Hub $Hub): void
	{
		$this->Hub = $Hub;
		$this->Hub->setValue('contract_total', $this->Hub->getValue('room_total') + $this->Hub->getValue('tax_total')
			+ $this->Hub->getValue('extra_total'));

		$deposit       = $this->Hub->getValue('deposit');
		$total         = $this->Hub->getValue('contract_total');
		$nonrefundable = $this->Hub->getValue('agent_nonrefundable');
		$deposit_pc    = 0;

		if ($this->Hub->getValue('agent_id'))
		{
			if ($this->Hub->getValue('agent_deposit_paid'))
			{
				$deposit_pc = $this->Hub->getValue('agent_deposit');
			}
			else
			{
				$deposit_pc = $this->Hub->getValue('agent_deposit_unconfirmed');
			}

			$total = $this->Hub->getValue('agent_value');
			if (!$this->Hub->getValue('agent_deposit_paid') && !$this->Hub->getValue('agent_deposit_unconfirmed_agent'))
			{
				$total = $this->Hub->getValue('contract_total');
			}
		}

		if (!$this->Hub->getValue('manual') || $deposit == 0)
		{
			$deposit = $this->setDeposit($total, $nonrefundable, $deposit_pc);
		}

		if ($deposit > $total)
		{
			$deposit = $total;
		}

		$this->Hub->setValue('deposit', $deposit);
		$this->Hub->setValue('deposit_system', $deposit);
	}

	/**
	 * Calculates the deposit to be charged
	 *
	 * @param  float  $total          Value to base calculation on
	 * @param  bool   $nonrefundable  TRUE if non-refundable rate (agents only)
	 * @param  int    $deposit_pc     Override deposit percentage (agents only)
	 *
	 * @throws Exception
	 * @since  1.0.0
	 * @return float|int
	 */
	protected function setDeposit(float $total, bool $nonrefundable, int $deposit_pc): float|int
	{
		$arrival = $this->Hub->getValue('arrival');
		$today   = $this->Hub->today;
		$deposit = 0;

		if (!(int) $this->Hub->settings['chargeDepositYesNo'])
		{
			return $deposit;
		}

		// Full amount if non-refundable
		if ($nonrefundable)
		{
			return $this->Hub->round($total);
		}

		// If variable deposits check if arrival is within the tolerance
		// and if so set the deposit to the full amount
		if ((int) $this->Hub->settings['variable_deposit_threashold'])
		{
			if (TickTock::differenceDays($today, $arrival) <= (int) $this->Hub->settings['variable_deposit_threashold'])
			{
				return $this->Hub->round($total);
			}
		}

		if ((int) $this->Hub->settings['depositIsPercentage'])
		{
			// Calculate based on fixed value or % of contract total
			if ($deposit_pc)
			{
				$deposit = $total * $deposit_pc / 100;
			}
			else
			{
				$deposit = $total * $this->Hub->settings['depositValue'] / 100;
			}
		}
		else
		{
			$deposit = $this->Hub->settings['depositValue'];
		}

		if ((int) $this->Hub->settings['roundupDepositYesNo'])
		{
			$deposit = ceil($deposit);
		}
		else
		{
			$deposit = $this->Hub->round($deposit);
		}

		return $deposit;
	}
}