<?php
/**
 * @package     Know Reservations
 * @subpackage  Library
 * @copyright   Copyright (c) 2020, Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\KR;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Email\HelpScoutEmailService;
use HighlandVision\KR\Email\JoomlaEmailService;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use InvalidArgumentException;
use Joomla\CMS\Factory;
use Joomla\Registry\Registry;
use RuntimeException;

use function count;
use function is_dir;
use function str_replace;

/**
 * Class KnowresEmailHelper
 *
 * @since 1.0.0
 */
abstract class Email
{
	/** @var ?object Agency data */
	protected ?object $agency;
	/** @var string Agency email */
	protected string $agency_email = '';
	/** @var string Agency name */
	protected string $agency_name = '';
	/** @var array|null Email attachments */
	protected ?array $attachments = [];
	/** @var array|null Blind carbon copy */
	protected ?array $bcc = [];
	/** @var mixed Body background */
	protected mixed $body_bg = '';
	/** @var mixed Button background */
	protected mixed $button_bg = '';
	/** @var array|null  Carbon copy */
	protected ?array $cc = [];
	/** @var mixed Content background */
	protected mixed $content_bg = '';
	/** @var array Values for the placeholder data */
	protected array $data = [];
	/** @var mixed Email Font */
	protected mixed $font = '';
	/** @var mixed Email font color */
	protected mixed $font_color = '#313131';
	/** @var mixed Email font highlight color */
	protected mixed $font_primary = '#212121';
	/** @var mixed Font size */
	protected mixed $font_size = '16';
	/** @var string Mail from name |(config) */
	protected string $fromname = '';
	/** @var string The guest email */
	protected string $guest_email = '';
	/** @var bool TRUE for Helpscout email */
	protected bool $helpscout = false;
	/** @var string Mail from (config) */
	protected string $mailfrom = '';
	/** @var mixed Manager email */
	protected mixed $manager_email = '';
	/** @var string Manager namey */
	protected string $manager_name = '';
	/** @var string Email body */
	protected string $output_message = '';
	/** @var string Email subject */
	protected string $output_subject = '';
	/** @var Registry KR params */
	protected Registry $params;
	/** @var object|false Property data */
	protected object|false $property;
	/** @var int ID of property */
	protected int $property_id = 0;
	/** @var string|null Reply to name */
	protected ?string $reply_name = '';
	/** @var string|null  Reply email */
	protected ?string $reply_to = '';
	/** @var string  Table styles */
	protected string $table_style = '';
	/** @var bool  Testing indicator */
	protected bool $testing = false;
	/** @var string Today as Y--m-d */
	protected string $today = '';
	/** @var Translations Translations */
	protected Translations $Translations;
	/** @var string The email trigger */
	protected string $trigger = '';
	/** @var int ID of trigger */
	protected int $trigger_id = 0;

	/**
	 * Constructor initialise
	 *
	 * @param  string  $trigger  Email trigger
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	public function __construct(string $trigger)
	{
		if (!$trigger)
		{
			throw new InvalidArgumentException(
				KrMethods::sprintf(
					'COM_KNOWRES_THROW_MISSING_PARAMETER', 'trigger'
				)
			);
		}

		Factory::getLanguage()->load('com_knowres', JPATH_ADMINISTRATOR . '/components/com_knowres');
		Factory::getLanguage()->load('com_knowres', JPATH_SITE . '/components/com_knowres');

		$this->trigger      = $trigger;
		$this->params       = KrMethods::getParams();
		$this->mailfrom     = KrMethods::getCfg('mailfrom');
		$this->fromname     = KrMethods::getCfg('fromname');
		$this->today        = TickTock::getDate();
		$this->Translations = new Translations();
		$this->body_bg      = $this->params->get('email_body_bg', $this->body_bg);
		$this->content_bg   = $this->params->get('email_content_bg', $this->content_bg);
		$this->button_bg    = $this->params->get('email_button_bg', $this->button_bg);
		$this->font         = $this->params->get('email_font', $this->font);
		$this->font_size    = $this->params->get('email_font_size', $this->font_size) . 'px';
		$this->font_color   = $this->params->get('email_font_color', $this->font_color);
		$this->font_primary = $this->params->get('email_font_primary', $this->font_primary);

		$this->table_style = 'font-family:' . $this->font . ';';
		$this->table_style .= 'mso-line-height-rule:exactly;line-height:120%;padding:0;margin:0;border:none;';
		$this->table_style .= 'font-size:' . $this->font_size . ';';
		$this->table_style .= 'color:' . $this->font_color . ';';
	}

	/**
	 * Return string
	 *
	 * @since  1.0.0
	 * @return string
	 */
	public function __toString(): string
	{
		return $this->output_message;
	}

	/**
	 * Returns email message
	 *
	 * @since 1.0.0
	 * @return string
	 */
	public function getOutputMessage(): string
	{
		return $this->output_message;
	}

	/**
	 * Returns email subject
	 *
	 * @since 1.0.0
	 * @return string
	 */
	public function getOutputSubject(): string
	{
		return $this->output_subject;
	}

	/**
	 * Get email template
	 *
	 * @param  int  $template_id  ID of template
	 *
	 * @throws Exception
	 * @since  4.0.0
	 * @return object
	 */
	protected function getTemplate(int $template_id): object
	{
		if (!$template_id)
		{
			throw new RuntimeException('Email template_id is not set');
		}

		$template = KrFactory::getAdminModel('emailtemplate')->getItem($template_id);
		if (!$template)
		{
			throw new RuntimeException('Email template not found for ID ' . $template_id);
		}

		return $template;
	}

	/**
	 * Check for any custom by date emails past their normal due date
	 *
	 * @throws Exception
	 * @since  2.5.0
	 */
	protected function checkCustomByDate(): void
	{
		$emails = KrFactory::getListModel('emailtriggers')->getTriggers('CUSTOMBYDATE');
		if ($emails)
		{
			foreach ($emails as $e)
			{
				if (!$e->days_before || !$e->send_guest)
				{
					continue;
				}

				$due_date = TickTock::modifyDays($this->today, $e->days);
				if ($due_date < $actual_date)
				{
					continue;
				}

				$this->sendEmails($e);
			}
		}
	}

	/**
	 * Build email body and subject
	 *
	 * @param  int   $template_id  ID of template to be used
	 * @param  bool  $send_guest   Indicates a guest email
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	protected function constructEmail(int $template_id, bool $send_guest = false): void
	{
		$template = $this->getTemplate($template_id);

		$this->output_message = $template->blurb;
		$this->output_subject = $template->subject;
		foreach ($this->data as $k => $v)
		{
			$this->output_message = str_replace("[$k]", $v, $this->output_message);
			$this->output_subject = str_replace("[$k]", $v, $this->output_subject);
		}

		$this->attachments    = null;
		$this->output_message = $this->makePretty($send_guest);
	}

	/**
	 * Send via normal email or helpscout
	 *
	 * @param  string   $email_to   Recipient email
	 * @param  ?string  $firstname  Name of recipient
	 * @param  ?string  $surname    Surname of recipient
	 * @param  array    $tags       Email related tags
	 *
	 * @throws Exception
	 * @since  3.2.0
	 */
	protected function dispatchEmail(string $email_to, ?string $firstname = null, ?string $surname = null,
		array $tags = []): void
	{
		$optional                = [];
		$optional['firstname']   = $firstname;
		$optional['surname']     = $surname;
		$optional['tags']        = $tags;
		$optional['cc']          = $this->cc;
		$optional['bcc']         = $this->bcc;
		$optional['attachments'] = $this->attachments;
		$optional['mailfrom']    = $this->mailfrom;
		$optional['fromname']    = $this->fromname;
		$optional['reply_to']    = $this->reply_to;
		$optional['reply_name']  = $this->reply_name;

		try
		{
			if ($this->helpscout)
			{
				HelpScoutEmailService::dispatchEmail($email_to, $this->getOutputSubject(),
					$this->getOutputMessage(), $optional);
			}
			else
			{
				JoomlaEmailService::dispatchEmail($email_to, $this->getOutputSubject(),
					$this->getOutputMessage(), $optional);
			}
		}
		catch (Exception $e)
		{
			Logger::logMe($e->getMessage(), 'alert');
		}
	}

	/**
	 * Gather all data, format emails and send
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	protected function gatherData(): void
	{
		$emails = KrFactory::getListModel('emailtriggers')->getTriggers($this->trigger, $this->trigger_id);
		if (count($emails))
		{
			$this->setData();
			foreach ($emails as $e)
			{
				$this->sendEmails($e);
			}

			if ($this->trigger == 'BOOKCONFIRM' || $this->trigger == 'PAYRECEIPT')
			{
				$this->checkCustomByDate();
			}
		}
	}

	/**
	 * Set the "from" email
	 *
	 * @throws Exception
	 * @since  3.2.0
	 * @return string
	 */
	protected function getFromEmail(): string
	{
		if (empty($this->agency_email))
		{
			return $this->fromemail;
		}

		return $this->agency_email;
	}

	/**
	 * Set the "from" name
	 *
	 * @throws Exception
	 * @since  3.2.0
	 */
	protected function getFromName()
	{
		if (empty($this->agency_name))
		{
			return $this->fromname;
		}

		return $this->agency_name;
	}

	/**
	 * Add headers and footers to the email text
	 *
	 * @param  bool  $send_guest  Send guest email
	 *
	 * @throws Exception
	 * @since  1.0.0
	 * @return string
	 */
	protected function makePretty(bool $send_guest): string
	{
		return KrMethods::render('emails.template', [
			'agency_id'    => $this->agency->id,
			'body_bg'      => $this->body_bg,
			'content_bg'   => $this->content_bg,
			'button_bg'    => $this->button_bg,
			'font'         => $this->font,
			'font_color'   => $this->font_color,
			'font_size'    => $this->font_size,
			'font_primary' => $this->font_primary,
			'affiliates'   => $send_guest,
			'message'      => $this->__toString(),
		]);
	}

	/**
	 * Set the agency
	 *
	 * @param  ?int  $agency_id  ID of agency or empty to use default
	 *
	 * @throws Exception
	 * @since  4.0.0
	 */
	protected function setAgency(?int $agency_id = 0): void
	{
		if (empty($agency_id))
		{
			$agency_id = KrMethods::getParams()->get('default_agency');
			if (!$agency_id)
			{
				throw new RunTimeException('Please set Default agency in KR Options');
			}
		}

		$this->agency = KrFactory::getAdminModel('agency')->getItem($agency_id);
	}

	/**
	 * Check if Helpscout is enabled
	 *
	 * @throws RuntimeException
	 * @since 3.2.0
	 */
	protected function setHelpScout(): void
	{
		$this->helpscout = KrFactory::getListModel('services')::checkForSingleService(false, 'helpscout',
			$this->agency->id);

		if ($this->helpscout && !is_dir(JPATH_LIBRARIES . '/helpscout/src'))
		{
			throw new RunTimeException('Please install Helpscout Library or disable Helpscout Service');
		}
	}
}