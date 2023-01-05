<?php
/**
 * @package    Know Reservations
 * @subpackage Library
 * @copyright  Copyright (c) 2020, Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\KR\Core;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Email\ContractEmail;
use HighlandVision\KR\Hub;

/**
 * Send emails as required
 *
 * @since 3.3.0
 */
class Emails
{
	/** @var Hub Hub data. */
	protected Hub $hub;

	/**
	 * Action emails
	 *
	 * @param   Hub  $hub  Hub data
	 *
	 * @throws Exception
	 * @since 1.0.0
	 * @return bool
	 */
	public function action(Hub $hub): bool
	{
		$this->hub = $hub;
		if ($this->hub->getValue('isEdit'))
		{
			return true;
		}
		if (!$this->hub->getValue('guest_id'))
		{
			return true;
		}

		$this->sendEmails();

		return true;
	}

	/**
	 * Sends the emails as required
	 *
	 * @throws Exception
	 * @since 1.0.0
	 */
	protected function sendEmailS(): void
	{
		if ($this->hub->getValue('email_trigger'))
		{
			$trigger = $this->hub->getValue('email_trigger');
		}
		else if ($this->hub->getValue('booking_status') == 99)
		{
			if ($this->hub->getValue('on_request'))
			{
				$trigger = 'BOOKREQUESTCANCEL';
			}
			else
			{
				$trigger = 'BOOKCANCEL';
			}
		}
		else if ($this->hub->getValue('on_request'))
		{
			$trigger = 'BOOKREQUEST';
		}
		else if ($this->hub->getValue('booking_status') > 10)
		{
			$trigger = 'BOOKCONFIRM';
		}
		else
		{
			$trigger = 'BOOK';
		}

		$email = new ContractEmail($trigger);
		$email->sendTheEmails($this->hub->getValue('id'));
	}
}