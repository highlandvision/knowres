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

use function count;

/**
 * Create owner payments based on guest payments
 *
 * @since 3.3.1
 **/
class PaymentsQueue
{
	/** @var object Payment data */
	private object $payment;
	/** @var string Today */
	private string $today;

	/**
	 * Initialize
	 *
	 * @throws Exception
	 * @since  3.3.1
	 */
	public function __construct()
	{
		$this->today = TickTock::getDate();
	}

	/**
	 * Process payments in queue
	 *
	 * @throws Exception
	 * @since  3.3.1
	 */
	public function process(): void
	{
		$queue = KrFactory::getListModel('contractpayments')->getPaymentQueue();
		if (!count($queue))
		{
			return;
		}

		foreach ($queue as $this->payment)
		{
			$this->processBySchedule();
		}
	}

	/**
	 * Process payments as per schedule
	 * eom = EOM payment
	 * rgp = receipt of guest balance payment
	 * dba = n days before arrival date
	 * dad = n days after departure date
	 *
	 * @throws Exception
	 * @since  3.3.1
	 */
	protected function processBySchedule(): void
	{
		$payments = false;

		if ($this->payment->schedule === 'eom')
		{
			if (TickTock::getEom() == $this->today)
			{
				$payments = new Payments\EndOfMonth($this->payment);
			}
		}
		else if ($this->payment->schedule === 'rgp')
		{
			if ($this->payment->booking_status == 40)
			{
				$payments = new Payments\Balance($this->payment, 'rgp');
			}
		}
		else if ($this->payment->schedule === 'dba')
		{
			if ($this->payment->booking_status == 40
				&& TickTock::modifyDays($this->payment->arrival, $this->payment->days, '-') <= $this->today)
			{
				$payments = new Payments\Balance($this->payment, 'dba');
			}
		}
		else if ($this->payment->schedule === 'dad')
		{
			if ($this->payment->booking_status == 40
				&& TickTock::modifyDays($this->payment->departure, $this->payment->days) <= $this->today)
			{
				$payments = new Payments\Balance($this->payment, 'dad');
			}
		}

		if ($payments)
		{
			$payments->process();
			KrFactory::getListModel('contractpayments')->updateActionedPayments([$this->payment->id]);
		}
		else if ($this->payment->pay_deposit > 0 && $this->payment->booking_status == 10 && $this->payment->deposit > 0)
		{
			if ($this->payment->pay_deposit == 1)
			{
				$payments = new Payments\Deposit($this->payment);
			}
			else if ($this->payment->pay_deposit == 2)
			{
				if (TickTock::modifyDays($this->payment->payment_date, $this->payment->deposit_days) >= $this->today)
				{
					$payments = new Payments\Deposit($this->payment);
				}
			}

			if ($payments)
			{
				$payments->process();
				KrFactory::getListModel('contractpayments')->updateActionedPayments([$this->payment->id]);
			}
		}
	}
}