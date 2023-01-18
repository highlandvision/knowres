<?php
/**
 * @package     KR
 * @subpackage  <Enter sub package>
 * @copyright   Copyright (C) 2022 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\KR\Email;

use Exception;
use HighlandVision\Helpscout\HelpDesk\Email;

/**
 * Send email to Helpscout
 *
 * @params
 *
 * @since  4.0.0
 * @return
 */
class HelpScoutEmailService implements InterfaceEmailService
{
	/**
	 * Interface to HelScout library
	 *
	 * @inheritDoc
	 * @throws Exception
	 */
	public static function dispatchEmail(string $email, string $subject, string $body, array $options)
	{
		$Email = new Email($email, $subject, $body, $options);
		$Email->sendEmail();
	}
}