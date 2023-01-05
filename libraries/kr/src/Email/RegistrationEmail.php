<?php
/**
 * @package    Know Reservations
 * @subpackage Library
 * @copyright  Copyright (c) 2020, Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\KR\Email;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Email;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\TickTock;
use InvalidArgumentException;
use Joomla\CMS\Object\CMSObject;

/**
 * Class Email for User Registration
 *
 * @since 1.0.0
 */
class RegistrationEmail extends Email
{
	/** @var string The guest email */
	protected string $guest_email = '';
	/** @var string The guest name */
	protected string $guest_name = '';
	/** @var string The password */
	protected string $password = '';
	/** @var string The username */
	protected string $username = '';

	/**
	 * Constructor
	 *
	 * @param   string  $trigger     The email trigger
	 * @param   int     $trigger_id  ID of required trigger
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	public function __construct(string $trigger, int $trigger_id = 0)
	{
		//TODO-v4.1 Test for CV
		parent::__construct($trigger);

		$this->trigger_id = $trigger_id;
	}

	/**
	 * Send email for guest registration
	 *
	 * @param   string  $username     User name
	 * @param   string  $password     Password
	 * @param   string  $guest_name   Guest name
	 * @param   string  $guest_email  Gguest email
	 *
	 * @throws InvalidArgumentException|Exception
	 * @since  3.3.0
	 */
	public function sendTheEmails(string $username, string $password, string $guest_name, string $guest_email)
	{
		if (!$username || !$password || !$guest_name || !$guest_email)
		{
			throw new InvalidArgumentException('All parameters are required');
		}

		$this->username    = $username;
		$this->password    = $password;
		$this->guest_name  = $guest_name;
		$this->guest_email = $guest_email;

		$this->gatherData();
	}

	/**
	 * Get the email data
	 *
	 * @throws Exception
	 * @since  1.0.0
	 * @return void
	 */
	public function setData(): void
	{
		$this->data['SITENAME']    = KrMethods::getCfg('sitename');
		$this->data['TODAY']       = TickTock::displayDate(TickTock::getDate());
		$this->data['REGNAME']     = $this->guest_name;
		$this->data['REGUSERNAME'] = $this->username;
		$this->data['REGPASSWORD'] = $this->password;
	}

	/**
	 * Send email
	 *
	 * @param   CMSObject  $trigger  Email trigger item
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	protected function sendEmails(CMSObject $trigger)
	{
		$this->constructEmail($trigger->email_template_id);

		$mailfrom = KrMethods::getCfg('mailfrom');
		$fromname = KrMethods::getCfg('fromname');

		if ($this->testing)
		{
			$this->guest_email = 'info@highlandgigs.co.uk';
		}

		if ($trigger->send_guest && $this->guest_email)
		{
			KrMethods::sendEmail($mailfrom, $fromname, $this->guest_email, $this->output_subject, $this->output_body);
		}

		if ($trigger->send_admin)
		{
			if ($trigger->send_guest)
			{
				$this->output_subject = 'COPY ' . $this->output_subject;
			}

			KrMethods::sendEmail($mailfrom, $fromname, $mailfrom, $this->output_subject, $this->output_body);
		}
	}
}