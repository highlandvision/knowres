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
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use InvalidArgumentException;
use RuntimeException;

/**
 * Emails for reservation enquiry.
 *
 * @since 1.0.0
 */
class EnquiryEmail extends Email
{
	/** @var string Guest (enquirer) name */
	protected string $guest_name = '';
	/** @var string Owner email */
	protected string $owner_email = '';
	/** @var string Owner name */
	protected string $owner_name = '';

	/**
	 * Constructor
	 *
	 * @param  string  $trigger     The email trigger
	 * @param  int     $trigger_id  ID of required trigger
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	public function __construct(string $trigger, int $trigger_id = 0)
	{
		parent::__construct($trigger);

		$this->trigger_id = $trigger_id;
	}

	/**
	 * Send email for form enquiry
	 *
	 * @param  int    $property_id  ID of property
	 * @param  array  $input        Input from form data
	 *
	 * @throws InvalidArgumentException|Exception
	 * @since  3.3.0
	 * @return void
	 */
	public function sendTheEmails(int $property_id, array $input): void
	{
		if (!is_countable($input) || !count($input))
		{
			throw new InvalidArgumentException('Input parameter is required and must have data');
		}

		$this->data             = $input;
		$this->data['SITENAME'] = KrMethods::getCfg('sitename');
		$this->property_id      = $property_id;
		$this->gatherData();
	}

	/**
	 * Set the email fields
	 *
	 * @throws RuntimeException|Exception
	 * @since 1.0.0
	 */
	public function setData(): void
	{
		$this->guest_email = $this->data['REQEMAIL'];
		$this->guest_name  = $this->data['REQNAME'];

		$this->setPropertyData();
		$this->setContactData();

		if ($this->agency->id)
		{
			$this->setHelpScout();
		}
	}

	/**
	 * Send email
	 *
	 * @param  object  $trigger  Email trigger
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	protected function sendEmails(object $trigger): void
	{
		$this->constructEmail($trigger->email_template_id);

		$this->cc         = null;
		$this->bcc        = null;
		$this->reply_to   = null;
		$this->reply_name = null;

		if ($trigger->send_guest && $this->guest_email)
		{
			if ($trigger->send_owner && $this->owner_email)
			{
				$this->reply_to   = $this->owner_email;
				$this->reply_name = $this->owner_name;
			}
			else
			{
				$this->reply_to   = $this->manager_email;
				$this->reply_name = $this->manager_name;
			}

			$this->dispatchEmail($this->guest_email, $this->guest_name);
		}

		if ($trigger->send_owner && $this->owner_email)
		{
			$this->reply_to   = $this->guest_email;
			$this->reply_name = $this->guest_name;

			$this->dispatchEmail($this->owner_email, $this->guest_name);
		}

		if ($trigger->send_agent && $this->agency_email)
		{
			$this->reply_to   = $this->guest_email;
			$this->reply_name = $this->guest_name;

			$this->dispatchEmail($this->agency_email, $this->guest_name);
		}

		if ($trigger->send_admin)
		{
			$this->dispatchEmail(KrMethods::getCfg('mailfrom'), $this->guest_name);
		}
	}

	/**
	 * Set contact details for Manager, Agency and Default
	 * 1. Set property manager if there is a speciic property.
	 * 2. Set to default agency if no manager or property for an enquiry.
	 *
	 * @param  ?int  $agency_id  ID of agency
	 *
	 * @throws Exception
	 * @since  4.0.0
	 */
	protected function setContactData(?int $agency_id = null): void
	{
		$this->setAgency($agency_id);
		$enquiry_email = KrMethods::getParams->get('enquiry_email', null);

		if (!empty($this->property))
		{
			$settings = KrFactory::getListModel('propertysettings')
			                     ->getPropertysettings($this->property->id, 'default_manager');
			if ((int) $settings['default_manager'])
			{
				$manager                       = KrFactory::getAdminModel('manager')
				                                          ->getItem((int) $settings['default_manager']);
				$this->data['MANAGEREMAIL']    = $manager->email;
				$this->data['MANAGERNAME']     = $manager->name;
				$this->data['AGENCYEMAIL']     = $manager->agency_email;
				$this->data['AGENCYNAME']      = $manager->agency_name;
				$this->data['AGENCYTELEPHONE'] = $manager->agency_telephone;
			}
		}
		else if (!empty($enquiry_email))
		{
			$this->data['MANAGEREMAIL']    = $enquiry_email;
			$this->data['MANAGERNAME']     = $this->agency->name;
			$this->data['AGENCYEMAIL']     = $enquiry_email;
			$this->data['AGENCYNAME']      = $this->agency->name;
			$this->data['AGENCYTELEPHONE'] = $this->agency->telephone;
		}
		else
		{
			$this->data['MANAGEREMAIL']    = KrMethods::getCfg('mailfrom');
			$this->data['MANAGERNAME']     = $this->agency->name;
			$this->data['AGENCYEMAIL']     = KrMethods::getCfg('mailfrom');
			$this->data['AGENCYNAME']      = $this->agency->name;
			$this->data['AGENCYTELEPHONE'] = $this->agency->telephone;
		}

		$this->manager_email = $this->data['MANAGEREMAIL'];
		$this->manager_name  = $this->data['MANAGERNAME'];
		$this->agency_email  = $this->data['AGENCYEMAIL'];
		$this->agency_name   = $this->data['AGENCYNAME'];
	}

	/**
	 * Set the email property data.
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	protected function setPropertyData(): void
	{
		$this->data['PROPERTYNAME'] = '';
		$this->owner_email          = '';
		$this->owner_name           = '';

		if ($this->property_id)
		{
			$this->property = KrFactory::getAdminModel('property')->getItem($this->property_id);
			if (!empty($this->property))
			{
				$this->data['PROPERTYNAME'] = $this->property->property_name;
				$this->owner_email          = $this->property->property_email;
				$this->owner_name           = $this->property->property_name;
			}
		}
	}
}