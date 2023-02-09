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
use HighlandVision\KR\TickTock;

use function ceil;

/**
 * Compute agent owner deposit payment
 *
 * @since 3.3.3
 */
class AgentOwnerDeposit
{
	/** @var Hub $Hub Hub. */
	protected Hub $Hub;

	/**
	 * Calculate agent owner deposit payment
	 *
	 * @param  Hub  $Hub  Hub base class
	 *
	 * @throws Exception
	 * @since  3.3.3
	 * @noinspection PhpLoopNeverIteratesInspection
	 */
	public function calculate(Hub $Hub): void
	{
		$this->Hub     = $Hub;
		$owner_deposit = 0;

		while (true)
		{
			if (!(int) $this->Hub->settings['chargeDepositYesNo'])
			{
				break;
			}
			if ($this->Hub->getValue('isEdit'))
			{
				break;
			}
			if (!$this->Hub->getValue('agent_id'))
			{
				break;
			}
			//TODO-v4.1 Shift owner payments to custom library?
			if (!$this->Hub->params->get('owner_payments', false))
			{
				break;
			}
			if (!$this->Hub->agent->owner_deposit_payment)
			{
				break;
			}

			$owner_id = $this->Hub->getValue('owner_id');
			if (!$owner_id)
			{
				break;
			}

			$owner = KrFactory::getAdminModel('owner')->getItem($owner_id);
			if (!$owner->id || !$owner->pay_deposit)
			{
				break;
			}

			$owner_deposit = $this->setOwnerDeposit($owner);
			break;
		}

		$this->Hub->setValue('owner_deposit', $owner_deposit);
	}

	/**
	 * Set the owner deposit
	 *
	 * @param  object  $owner  Owner row
	 *
	 * @throws Exception
	 * @since  3.3.0
	 */
	protected function setOwnerDeposit(object $owner): float
	{
		$owner_deposit = 0;
		$arrival       = $this->Hub->getValue('arrival');
		$today         = $this->Hub->today;
		$total         = $this->Hub->getValue('contract_total');

		if ((int) $this->Hub->settings['variable_deposit_threashold'])
		{
			if (TickTock::differenceDays($today, $arrival) <= (int) $this->Hub->settings['variable_deposit_threashold'])
			{
				return (float) $owner_deposit;
			}
		}

		$guest_deposit = $this->setGuestDeposit($total);
		if ($guest_deposit > 0)
		{
			if ($this->Hub->params->get('net_rates', 0))
			{
				if ($this->Hub->getValue('net_price') > 0)
				{
					$owner_deposit = $guest_deposit / $total * $this->Hub->getValue('net_price');
				}
				else if ($this->Hub->getValue('net_price_system') > 0)
				{
					$owner_deposit = $guest_deposit / $total * $this->Hub->getValue('net_price_system');
				}
			}
			else if ($owner->commission)
			{
				$pc            = (100 - $owner->commission) / 100;
				$owner_deposit = $guest_deposit * $pc;
			}
		}

		return $this->Hub->round($owner_deposit);
	}

	/**
	 * Calculates the guest deposit that would be charged
	 *
	 * @param  float  $total  Value to base calculation
	 *
	 * @throws Exception
	 * @since  3.3.3
	 * @return float
	 */
	protected function setGuestDeposit(float $total): float
	{
		if ((int) $this->Hub->settings['depositIsPercentage'])
		{
			$guest_deposit = $total * $this->Hub->settings['depositValue'] / 100;
		}
		else
		{
			$guest_deposit = $this->Hub->settings['depositValue'];
		}

		if ((int) $this->Hub->settings['roundupDepositYesNo'])
		{
			$guest_deposit = ceil($guest_deposit);
		}

		if ($guest_deposit > $total)
		{
			$guest_deposit = $total;
		}

		return $this->Hub->round($guest_deposit);
	}
}