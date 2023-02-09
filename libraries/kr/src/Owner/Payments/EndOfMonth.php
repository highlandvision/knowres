<?php
/**
 * @package     KR
 * @subpackage  Library
 * @copyright   Copyright (C) 2021 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\KR\Owner\Payments;

use Exception;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Owner\Payments;
use HighlandVision\KR\Utility;

use function count;
use function is_countable;
use function round;

/**
 * Process eom (end of month) payment schedule
 *
 * @params
 *
 * @since   3.3.1
 */
class EndOfMonth extends Payments
{
	/**
	 * Initialize
	 *
	 * @param  object  $payment  Contract payment data
	 *
	 * @throws Exception
	 * @since  3.3.1
	 */
	public function __construct(object $payment)
	{
		parent::__construct($payment, 'eom');
	}

	/**
	 * Process payment
	 *
	 * @throws Exception
	 * @since  3.3.1
	 */
	public function process()
	{
		if ($this->net)
		{
			$value = $this->setNet();
		}
		else
		{
			$value = $this->setCommission();
		}

		if ($value > 0)
		{
			$this->addOwnerPayment($value);
		}
	}

	/**
	 * Set owner commission payment
	 *
	 * @throws Exception
	 * @since  3.3.1
	 */
	protected function setCommission(): float
	{
		if (!$this->owner_pc)
		{
			return 0;
		}

		$room     = $this->contract->room_total * $this->owner_pc;
		$extras   = $this->setExtraValue();
		$expenses = $this->setExpenses();
		$due      = $room + $extras - $expenses - $this->previous_total;

		return Utility::roundValue($due, $this->contract->currency);
	}

	/**
	 * Sum the value for any expenses shared or paid by owner
	 *
	 * @since   3.3.1
	 * @return float
	 */
	protected function setExpenses(): float
	{
		$total = 0;

		if ($this->payment->whopays > 0)
		{
			if ($this->contract->agent_commission > 0)
			{
				if ($this->payment->whopays == 1)
				{
					$total = $total + $this->contract->agent_commission;
				}
				else if ($this->payment->whopays == 2)
				{
					$total = $total + $this->contract->agent_commission * $this->owner_pc;
				}
			}

			if ($this->contract->channel_commission > 0)
			{
				if ($this->payment->whopays == 1)
				{
					$total = $total + $this->contract->channel_commission;
				}
				else if ($this->payment->whopays == 2)
				{
					$total = $total + $this->contract->channel_commission * $this->owner_pc;
				}
			}
		}

		return round($total, 2);
	}

	/**
	 * Sum the value for any extras paid to owner
	 *
	 * @throws Exception
	 * @since  3.3.1
	 * @return float
	 */
	protected function setExtraValue(): float
	{
		$total = 0;

		if (is_countable($this->contract->extras) && count($this->contract->extras))
		{
			foreach ($this->contract->extras as $k => $v)
			{
				$extra = KrFactory::getAdminModel('extra')->getItem($k);
				if ($extra->payto == 1)
				{
					$total = $total + $v['value'];
				}
				else if ($extra->payto == 2)
				{
					$total = $total + $v['value'] * $this->owner_pc;
				}
			}
		}

		return round($total, 2);
	}

	/**
	 * Set owner net payment value
	 *
	 * @throws Exception
	 * @since  3.3.1
	 * @return float
	 */
	protected function setNet(): float
	{
		if ($this->contract->net_price == 0)
		{
			return 0;
		}

		$net    = $this->contract->net_price;
		$extras = $this->setExtraValue();
		$due    = $net + $extras - $this->previous_total;

		return Utility::roundValue($due, $this->contract->currency);
	}
}