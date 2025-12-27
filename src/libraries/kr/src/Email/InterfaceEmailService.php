<?php
/**
 * @package     Know Reservations
 * @subpackage  Library
 * @copyright   Copyright (c) 2020, Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\KR\Email;

// phpcs:disable PSR1.Files.SideEffects
defined('_JEXEC') or die;
// phpcs:enable PSR1.Files.SideEffects

/**
 * Interface email service currently Joomla / Helpscout.
 *
 * @since 4.0.0
 */
interface InterfaceEmailService
{
	/**
	 * Dispatch the email
	 *
	 * @param  string  $email    Recipient Email
	 * @param  string  $subject  Email subject
	 * @param  string  $body     Email body
	 * @param  array   $options  {firstname: string, surname: string, tags: array, cc: array, bcc: array, attachments: array}
	 *
	 * @since  4.0.0
	 */
	static function dispatchEmail(string $email, string $subject, string $body, array $options);
}