<?php
/**
 * @package    Know Reservations
 * @subpackage Library
 * @copyright  Copyright (c) 2020, Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\KR\Service;

defined('_JEXEC') or die;

use DrewM\MailChimp\MailChimp as VendorMailchimp;
use Exception;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Service;
use HighlandVision\KR\TickTock;
use InvalidArgumentException;

use function preg_match;

/**
 * Service subscribe via mailchimp
 *
 * @since 1.0.0
 */
class Mailchimp extends Service
{
	/**  @var string Subscriber email */
	protected string $email = '';
	/**  @var string Subscriber firstname */
	protected string $firstname = '';
	/**  @var string Subscriber name */
	protected string $name = '';
	/** @var string Subscriber surname */
	protected string $surname = '';

	/**
	 * Initialize
	 *
	 * @param  int     $service_id  ID of service
	 * @param  string  $email       Email
	 * @param  string  $name        Subscriber name
	 *
	 * @throws Exception
	 * @since 1.0.0
	 */
	public function __construct(int $service_id, string $email, string $name)
	{
		parent::__construct($service_id);

		$this->setEmail($email);
		$this->setName($name);
	}

	/**
	 * Send subscription
	 *
	 * @throws Exception
	 * @since 1.0.0
	 * @return bool|string
	 */
	public function subscribe(): bool|string
	{
		$VendorMailchimp = new VendorMailchimp($this->parameters->apikey);
		$VendorMailchimp->post('lists/' . $this->parameters->list . '/members', [
			'email_address' => $this->email, 'status' => 'subscribed', 'merge_fields' => $this->mergeFields()
		]);

		if ($VendorMailchimp->success())
		{
			return true;
		}
		else
		{
			$error  = $VendorMailchimp->getLastError();
			$needle = 'is already a list member';
			if (str_contains($error, $needle))
			{
				return true;
			}

			return $error;
		}
	}

	/**
	 * Set merge fields
	 *
	 * @throws Exception
	 * @since  3.3.0
	 * @return array
	 */
	protected function mergeFields(): array
	{
		$merge_fields = [];
		if ($this->parameters->language)
		{
			$merge_fields[$this->parameters->language] = KrMethods::getLanguage()->getTag();
		}
		if ($this->parameters->firstname)
		{
			$merge_fields[$this->parameters->firstname] = $this->firstname;
		}
		if ($this->parameters->surname)
		{
			$merge_fields[$this->parameters->surname] = $this->surname;
		}
		if ($this->parameters->subscribeDate)
		{
			$merge_fields[$this->parameters->subscribeDate] = TickTock::getDate();
		}

		return $merge_fields;
	}

	/**
	 * Validate and set email
	 *
	 * @param  string  $email  Subscriber email
	 *
	 * @throws InvalidArgumentException
	 * @since 1.0.0
	 */
	protected function setEmail(string $email)
	{
		if (!$email)
		{
			throw new InvalidArgumentException(KrMethods::plain('COM_KNOWRES_EMAIL_MISSING'));
		}

		if (!preg_match("/^[_a-z\d-]+(\.[_a-z\d-]+)*@[a-z\d-]+(\.[a-z\d-]+)*$/i", $email))
		{
			throw new InvalidArgumentException(KrMethods::plain('COM_KNOWRES_EMAIL_INVALID'));
		}

		$this->email = $email;
	}

	/**
	 * Set name field and split for first and last
	 *
	 * @param  string  $name  Subscriber name
	 *
	 * @since 1.0.0
	 */
	protected function setName(string $name)
	{
		if (empty($name))
		{
			throw new InvalidArgumentException(KrMethods::plain('COM_KNOWRES_NAME_MISSING'));
		}

		$split = explode(' ', $name);
		foreach ($split as $n)
		{
			if (!$this->firstname)
			{
				$this->firstname = $n;
			}
			else if (!$this->surname)
			{
				$this->surname = $n;
			}
			else
			{
				$this->surname .= ' ' . $n;
			}
		}
	}
}