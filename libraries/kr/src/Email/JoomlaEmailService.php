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
use HighlandVision\KR\Framework\KrMethods;

/**
 * Inteface for emails service *
 * @since 3.3.0
 */
class JoomlaEmailService implements InterfaceEmailService
{
	/**
	 * Sends an email
	 *
	 * @inheritDoc
	 * @throws Exception
	 */
	public static function dispatchEmail(string $email, string $subject, string $body, array $options)
	{
		KrMethods::sendEmail(
			$options['mailfrom'], $options['fromname'], $email, $subject, $body, true,
			$options['cc'], $options['bcc'], $options['reply_to'], $options['reply_name'], $options['attachments']
		);
	}
}