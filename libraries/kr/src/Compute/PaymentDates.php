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

use function explode;
use function in_array;
use function intval;

/**
 * Calculate payment dates
 *
 * @since 3.9.3
 */
class PaymentDates
{
	/** @var ?string Balance date. */
	protected ?string $balance_date;
	/** @var ?string Expiry date. */
	protected ?string $expiry_date;
	/** @var Hub Hub. */
	protected Hub $Hub;

	/**
	 * Calculate payment dates
	 *
	 * @param   Hub  $Hub  Hub base class
	 *
	 * @throws Exception
	 * @since 1.0.0
	 */
	public function calculate(Hub $Hub): void
	{
		$this->Hub          = $Hub;
		$this->expiry_date  = $this->Hub->getValue('expiry_date');
		$this->balance_date = $this->Hub->getValue('balance_date');

		$expiry_date  = $this->calcExpiryDate();
		$balance_date = $this->calcBalanceDate($expiry_date);

		$this->Hub->setValue('expiry_date', $expiry_date);
		$this->Hub->setValue('balance_date', $balance_date);
	}

	/**
	 * Set expiry Date
	 *
	 * @throws Exception
	 * @since  1.0.0
	 * @return mixed
	 */
	protected function calcExpiryDate(): mixed
	{
		if ($this->Hub->getValue('booking_status') >= 10)
		{
			return $this->expiry_date;
		}

		$expiry_date = $this->Hub->today;
		if (!(int) $this->Hub->getValue('expiry_days'))
		{
			return $expiry_date;
		}

		$WEarray     = [];
		$weekendDays = explode(',', $this->Hub->settings['weekenddays']);
		foreach ($weekendDays as $val)
		{
			$WEarray[] = intval($val);
		}

		$count = 0;
		while ($count < $this->Hub->getValue('expiry_days'))
		{
			$expiry_date = TickTock::modifyDays($expiry_date);
			$dow         = TickTock::getDow($expiry_date);
			if (!in_array($dow, $WEarray))
			{
				$count++;
			}
		}

		if ($expiry_date > $this->Hub->getValue('arrival'))
		{
			$expiry_date = $this->Hub->getValue('arrival');
		}

		return $expiry_date;
	}

	/**
	 * Calculate balance date
	 *
	 * @param   string  $expiry_date  Calculated expiry date
	 *
	 * @throws Exception
	 * @since 1.0.0
	 * @return string
	 */
	protected function calcBalanceDate(string $expiry_date): string
	{
		if ($this->Hub->getValue('booking_status') >= 40)
		{
			return $this->balance_date;
		}

		$balance_date = $this->Hub->getValue('arrival');
		if (!$this->Hub->getValue('balance_days'))
		{
			return $balance_date;
		}

		$balance_date = TickTock::modifyDays($this->Hub->getValue('arrival'), $this->Hub->getValue('balance_days'), '-');
		if ($balance_date < $expiry_date)
		{
			$balance_date = $expiry_date;
		}

		return $balance_date;
	}
}