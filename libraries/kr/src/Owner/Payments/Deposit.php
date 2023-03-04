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
use HighlandVision\KR\Owner\Payments;
use HighlandVision\KR\Utility;

/**
 * Process Deposit payment (pay on receipt of guest deposit) schedule
 *
 * @since   3.3.1
 */
class Deposit extends Payments
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
		parent::__construct($payment, 'dep');
	}

	/**
	 * Process payment
	 *
	 * @throws Exception
	 * @since  3.3.1
	 */
	public function process()
	{
		if ($this->previous_total > 0)
		{
			$value = 0;
		}
		else if ($this->net)
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
	 * @since  3.3.1
	 * @return float
	 */
	protected function setCommission(): float
	{
		if (!$this->owner_pc)
		{
			return 0;
		}

		if ($this->owner->deposit_pc > 0)
		{
			return Utility::roundValue($this->contract->room_total * $this->owner_deposit_pc,
				$this->contract->currency);
		}
		else
		{
			return Utility::roundValue($this->contract->deposit * $this->owner_pc, $this->contract->currency);
		}
	}

	/**
	 * Set owner net payment deposit value
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

		if ($this->owner->deposit_pc > 0)
		{
			return Utility::roundValue($this->contract->net_price * $this->owner_deposit_pc, $this->contract->currency);
		}
		else
		{
			return Utility::roundValue($this->contract->deposit / $this->contract->contract_total
				* $this->contract->net_price, $this->contract->currency);
		}
	}
}
