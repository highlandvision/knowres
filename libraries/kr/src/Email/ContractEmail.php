<?php
/**
 * @package    Knowres
 * @subpackage Library
 * @copyright  Copyright (c) 2020, Highland Vision. All rights reserved.
 * @license    GNU General Public License version 2 or later; see LICENSE
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\KR\Email;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Email;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Media;
use HighlandVision\KR\SiteHelper;
use HighlandVision\KR\TickTock;
use HighlandVision\KR\Utility;
use RuntimeException;

use function array_unique;
use function count;
use function explode;
use function implode;
use function in_array;
use function ltrim;
use function rtrim;
use function str_replace;
use function stripslashes;
use function strtolower;
use function trim;

/**
 * Send emails for contracts.
 *
 * @since 1.0.0
 */
class ContractEmail extends Email
{
	/** @var mixed Agent Db item */
	protected mixed $agent;
	/** @var string The caretaker email */
	protected string $caretaker_email = '';
	/** @var object Contract item */
	protected object $contract;
	/** @var int ID of contract */
	protected int $contract_id = 0;
	/** @var array Contract fees */
	protected array $fees;
	/** @var object Guest Db item */
	protected object $guest;
	/** @var object Manager Db item */
	protected object $manager;
	/** @var array Contract notes */
	protected array $notes;
	/** @var object Owner Db item */
	protected object $owner;
	/** @var float Payment amount */
	protected float $payment_amount = 0;
	/** @var string Payment currency */
	protected string $payment_currency = '';
	/** @var array Contract payments */
	protected array $payments;
	/** @var int Payment method via Service */
	protected int $service_id = 0;

	/**
	 * /**
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
	 * Send emails as required for contract
	 *
	 * @param  int     $contract_id       ID of contract
	 * @param  float   $payment_amount    Amount of payment
	 * @param  string  $payment_currency  Currency of payment
	 * @param  int     $service_id        ID of service
	 *
	 * @throws Exception
	 * @since  3.3.0
	 */
	public function sendTheEmails(int $contract_id, float $payment_amount = 0.00, string $payment_currency = '',
		int $service_id = 0)
	{
		$this->contract_id      = $contract_id;
		$this->payment_amount   = $payment_amount;
		$this->payment_currency = $payment_currency;
		$this->service_id       = $service_id;
		$this->gatherData();
	}

	/**
	 * Get the contract and associated items and set placeholder data
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	public function setData()
	{
		$this->contract = KrFactory::getAdminModel('contract')->getItem($this->contract_id);
		if (empty($this->contract->id))
		{
			throw new RuntimeException('Contract not found for ID ' . $this->contract_id);
		}

		$this->property = KrFactory::getAdminModel('property')->getItem($this->contract->property_id);
		if (empty($this->property->id))
		{
			throw new RuntimeException('Property not found for ID ' . $this->contract->property_id);
		}

		$this->guest = KrFactory::getAdminModel('guest')->getItem($this->contract->guest_id);
		if (empty($this->guest->id))
		{
			throw new RuntimeException('Guest not found for ID ' . $this->contract->guest_id);
		}

		if (!empty($this->contract->agency_id))
		{
			$this->agency = KrFactory::getAdminModel('agency')->getItem($this->contract->agency_id);
			if (empty($this->agency->id))
			{
				throw new RuntimeException('Agency not found for ID ' . $this->contract->agency_id);
			}
		}

		$this->payments = KrFactory::getListModel('contractpayments')->getForContract($this->contract_id);
		$this->fees     = KrFactory::getListModel('contractfees')->getForContract($this->contract_id);
		$this->notes    = KrFactory::getListModel('contractnotes')->getForContract($this->contract_id);
		$this->manager  = KrFactory::getAdminModel('manager')->getItem($this->contract->manager_id);
		if ($this->contract->agent_id)
		{
			$this->agent = KrFactory::getAdminModel('agent')->getItem($this->contract->agent_id);
		}
		if ($this->property->owner_id)
		{
			$this->owner = KrFactory::getAdminModel('owner')->getItem($this->property->owner_id);
		}

		$this->formatData();
	}

	/**
	 * Check for and add any auto generated email pdf attachments
	 *
	 * @param  array  $pdfs  Array of auto attachments
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	protected function addAutoAttachment(array $pdfs): void
	{
		foreach ($pdfs as $t)
		{
			if ($t == 'voucher')
			{
				$voucher             = new Media\Pdf\Contract\Voucher('email', $this->contract_id);
				$this->attachments[] = $voucher->getPdf();
			}
			else if ($t == 'guestdata' && $this->contract->guestdata_id)
			{
				$guestdata           = new Media\Pdf\Contract\Guestdata('email', $this->contract_id);
				$this->attachments[] = $guestdata->getPdf();
			}
		}
	}

	/**
	 * Check for and add any uploaded email attachments
	 *
	 * @param  array  $pdfs  Uploaded attachments
	 *
	 * @since 1.0.0
	 */
	protected function addUploadedAttachment(array $pdfs): void
	{
		$matches = [];

		foreach ($pdfs as $t)
		{
			if ($t == 'propertys')
			{
				$matches['propertys'] = $this->contract->property_id;
			}
			else if ($t == 'regions')
			{
				$matches['regions'] = $this->property->region_id;
			}
			else if ($t == 'towns')
			{
				$matches['towns'] = strtolower(str_replace(' ', '-', $this->property->town_name));
			}
			else if ($t == 'types')
			{
				$matches['types'] = $this->property->type_id;
			}
			else if ($t == 'contracts')
			{
				$matches['contracts'] = $this->contract->tag;
			}
		}

		$matches = array_unique($matches);
		foreach ($matches as $type => $id)
		{
			$pdfs = Media\Pdf::listPdfs($type, $id);
			if (count($pdfs) > 0)
			{
				foreach ($pdfs as $pdf)
				{
					$this->attachments[] = $pdf;
				}
			}
		}
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

				if ($e->trigger_cron == 'arrival')
				{
					$actual_date = $this->contract->arrival;
				}
				else if ($e->trigger_cron == 'departure')
				{
					$actual_date = $this->contract->departure;
				}
				else if ($e->trigger_cron == 'expiry_date')
				{
					$actual_date = $this->contract->expiry_date;
				}
				else if ($e->trigger_cron == 'balance_date')
				{
					$actual_date = $this->contract->balance_date;
				}

				if ($due_date < $actual_date)
				{
					continue;
				}

				$values = Utility::decodeJson($e->booking_status, true);
				if (!in_array($this->contract->booking_status, $values))
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

		$this->attachments = null;
		$this->addUploadedAttachment($template->pdf_uploaded);
		$this->addAutoAttachment($template->pdf_auto);

		$this->output_message = $this->makePretty($send_guest);
	}

	/**
	 * Delete any attachments from server
	 *
	 * @since 3.3.0
	 */
	protected function deleteAttachments()
	{
		if (is_array($this->attachments))
		{
			$rootPath = Utility::getPath('root');
			$folder   = basename($rootPath);

			foreach ($this->attachments as $file)
			{
				$parts  = pathinfo($file);
				$levels = explode('/', $parts['dirname']);
				if ($levels[count($levels) - 1] == $folder)
				{
					unlink($file);
				}
			}
		}
	}

	/**
	 * Format all email placeholders into an array
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	protected function formatData()
	{
		$this->data['SITENAME'] = KrMethods::getCfg('sitename');
		$this->data['TODAY']    = TickTock::displayDate(TickTock::getDate());

		$this->setContractData();
		$this->setPropertyData();
		$this->setGuestData();
		$this->setContactData();
		$this->setAgentData();
		$this->setOwner();
		$this->setPaymentData();
		$this->setService();
		$this->setButtons();
		$this->setLinks();

		$this->data['GUESTNOTES'] = $this->setNotes('1');
		$notes                    = $this->setNotes('2');
		$this->data['OWNERNOTES'] = $notes ?: KrMethods::plain('JNO');

		if ($this->agency->id)
		{
			$this->setHelpScout();
		}
	}

	/**
	 * Send guest email
	 *
	 * @param  int  $template_id  ID of email template
	 *
	 * @throws Exception
	 * @since  3.3.0
	 */
	protected function sendEmailGuest(int $template_id)
	{
		$cc = [];
		if ($this->guest->email_2)
		{
			$cc[] = $this->guest->email_2;
		}
		if ($this->guest->email_3)
		{
			$cc[] = $this->guest->email_3;
		}

		if (count($cc))
		{
			$this->cc = $cc;
		}

		$tags   = [];
		$tags[] = $this->contract->tag;
		$tags[] = 'guest';
		$tags[] = $this->property->property_name;

		$this->dispatchEmail($this->guest->email, $this->guest->firstname, $this->guest->surname, $tags);

		$text = KrMethods::sprintf(
			'COM_KNOWRES_CONTRACTNOTE_TEXT_SENT_GUEST', $this->Translations->getText('emailtemplate', $template_id)
		);

		if ($this->trigger <> 'MANUALBOOK')
		{
			KrFactory::getAdminModel('contractnote')::createContractNote($this->contract_id, $text, '3', false);
		}
		else
		{
			KrFactory::getAdminModel('contractnote')::createContractNote($this->contract_id, $text);
		}
	}

	/**
	 * Send owner email
	 *
	 * @param  int    $template_id  ID of template
	 * @param  array  $emails       Owner emails
	 *
	 * @throws Exception
	 * @since  3.3.0
	 */
	protected function sendEmailOwner(int $template_id, array $emails)
	{
		$count = 0;
		$cc    = [];

		foreach ($emails as $email)
		{
			if (!$count)
			{
				$owner_email = stripslashes(trim($email));
			}
			else
			{
				$cc[] = stripslashes(trim($email));
			}

			$count++;
		}

		if (count($cc))
		{
			$this->cc = $cc;
		}

		$tags   = [];
		$tags[] = $this->contract->tag;
		$tags[] = 'owner';
		$tags[] = $this->property->property_name;

		$firstname = null;
		$surname   = null;
		if (!empty($this->owner->name))
		{
			$split = explode(' ', $this->owner->name, 2);
			if (isset($split[0]))
			{
				$firstname = $split[0];
			}
			if (isset($split[1]))
			{
				$surname = $split[1];
			}
		}

		$this->dispatchEmail($owner_email, $firstname, $surname, $tags);

		$text = KrMethods::sprintf(
			'COM_KNOWRES_CONTRACTNOTE_TEXT_SENT_OWNER', $this->Translations->getText('emailtemplate', $template_id)
		);

		if ($this->trigger <> 'MANUALBOOKOWNER')
		{
			KrFactory::getAdminModel('contractnote')::createContractNote($this->contract_id, $text, '3', false);
		}
		else
		{
			KrFactory::getAdminModel('contractnote')::createContractNote($this->contract_id, $text);
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
	protected function sendEmails(object $trigger)
	{
		$this->cc         = null;
		$this->bcc        = null;
		$this->reply_to   = $this->manager_email;
		$this->reply_name = $this->manager_name;
		$this->constructEmail($trigger->email_template_id, $trigger->send_guest);

		if ($trigger->send_guest && $this->guest->email)
		{
			$this->sendEmailGuest($trigger->email_template_id);
			$this->cc = null;
		}

		if ($trigger->send_owner && trim($this->property->property_email))
		{
			$emails = explode(',', stripslashes(trim($this->property->property_email)));
			if (is_countable($emails) && count($emails))
			{
				$this->sendEmailOwner($trigger->email_template_id, $emails);
				$this->cc = null;
			}
		}

		if ($trigger->send_caretaker && $this->caretaker_email)
		{
			KrMethods::sendEmail($this->getFromEmail(), $this->getFromName(), $this->caretaker_email,
				$this->output_subject, $this->output_message, 1, $this->cc, $this->bcc, $this->reply_to,
				$this->reply_name, $this->attachments
			);
		}

		if (!$this->helpscout)
		{
			if ($trigger->send_guest || $trigger->send_owner)
			{
				$this->output_subject = 'COPY ' . $this->output_subject;
			}

			if ($trigger->send_agent && $this->agency_email)
			{
				$this->dispatchEmail($this->agency_email);
			}

			if ($trigger->send_admin && $this->mailfrom)
			{
				$this->dispatchEmail($this->mailfrom);
			}
		}

		$this->deleteAttachments();
	}

	/**
	 * Set agency data
	 *
	 * @since 3.3.0
	 */
	protected function setAgentData()
	{
		$this->data['AGENTNAME'] = '';
		$this->data['AGENTTEXT'] = '';
		if ($this->contract->agent_id)
		{
			if ($this->contract->agent_name)
			{
				$this->data['AGENTNAME'] = $this->contract->agent_name;
			}
			if ($this->contract->booking_status > 9)
			{
				$this->data['AGENTTEXT'] = $this->agent->confirmed_email_text;
			}
			else
			{
				$this->data['AGENTTEXT'] = $this->agent->provisional_email_text;
			}
		}
	}

	/**
	 * Set email buttons
	 *
	 * @throws Exception
	 * @since  3.3.0
	 */
	protected function setButtons()
	{
		$link                       = SiteHelper::buildDashboardLink($this->contract, 'reviewform', true);
		$this->data['BUTTONREVIEW'] = KrMethods::render('emails.button',
			['button_bg' => $this->button_bg,
			 'font'      => $this->font,
			 'link'      => $link,
			 'text'      => KrMethods::plain('COM_KNOWRES_EMAIL_BUTTONREVIEW'),
			]);

		// All buttons below go to dashboard only the text is different
		$link                          = SiteHelper::buildDashboardLink($this->contract, null, true);
		$this->data['BUTTONARRIVAL']   = KrMethods::render('emails.button',
			['button_bg' => $this->button_bg,
			 'font'      => $this->font,
			 'link'      => $link,
			 'text'      => KrMethods::plain('COM_KNOWRES_EMAIL_BUTTONARRIVAL'),
			]);
		$this->data['BUTTONBALANCE']   = KrMethods::render('emails.button',
			['button_bg' => $this->button_bg,
			 'font'      => $this->font,
			 'link'      => $link,
			 'text'      => KrMethods::plain('COM_KNOWRES_EMAIL_BUTTONBALANCE'),
			]);
		$this->data['BUTTONCONFIRM']   = KrMethods::render('emails.button',
			['button_bg' => $this->button_bg,
			 'font'      => $this->font,
			 'link'      => $link,
			 'text'      => KrMethods::plain('COM_KNOWRES_EMAIL_BUTTONCONFIRM'),
			]);
		$this->data['BUTTONDASHBOARD'] = KrMethods::render('emails.button',
			['button_bg' => $this->button_bg,
			 'font'      => $this->font,
			 'link'      => $link,
			 'text'      => KrMethods::plain('COM_KNOWRES_EMAIL_BUTTONDASHBOARD'),
			]);
		$this->data['BUTTONMANAGE']    = KrMethods::render('emails.button',
			['button_bg' => $this->button_bg,
			 'font'      => $this->font,
			 'link'      => $link,
			 'text'      => KrMethods::plain('COM_KNOWRES_EMAIL_BUTTONMANAGE'),
			]);
		$this->data['BUTTONPAYNOW']    = KrMethods::render('emails.button',
			['button_bg' => $this->button_bg,
			 'font'      => $this->font,
			 'link'      => $link,
			 'text'      => KrMethods::plain('COM_KNOWRES_EMAIL_BUTTONPAYNOW'),
			]);

		$link                          = KrMethods::route(KrMethods::getRoot()
			. 'administrator/index.php?option=com_knowres&task=contract.show&id=' . $this->contract->id);
		$this->data['BUTTONOWNERLINK'] = KrMethods::render('emails.button',
			['button_bg' => $this->button_bg,
			 'font'      => $this->font,
			 'link'      => $link,
			 'text'      => KrMethods::plain('COM_KNOWRES_EMAIL_BUTTONOWNERLINK'),
			]);
	}

	/**
	 * Set contact details for Manager and Agency
	 *
	 * @throws Exception
	 * @since  4.0.0
	 */
	protected function setContactData(): void
	{
		$manager                       = KrFactory::getAdminModel('manager')->getItem($this->contract->manager_id);
		$this->data['MANAGEREMAIL']    = $manager->email;
		$this->data['MANAGERNAME']     = $manager->name;
		$this->data['AGENCYEMAIL']     = $manager->agency_email;
		$this->data['AGENCYNAME']      = $manager->agency_name;
		$this->data['AGENCYTELEPHONE'] = $manager->agency_telephone;

		$this->manager_email = $this->data['MANAGEREMAIL'];
		$this->manager_name  = $this->data['MANAGERNAME'];
		$this->agency_email  = $this->data['AGENCYEMAIL'];
		$this->agency_name   = $this->data['AGENCYNAME'];
	}

	/**
	 * Set contract fields for email
	 *
	 * @throws Exception
	 * @since  3.3.0
	 */
	protected function setContractData()
	{
		$this->data['ARRIVALDATE'] = TickTock::displayDate($this->contract->arrival);
		$this->data['BALANCEDAYS'] = $this->contract->balance_days;
		$this->data['BALANCEDATE'] = TickTock::displayDate($this->contract->balance_date);

		$balance = 0;
		if ($this->contract->booking_status < 50)
		{
			$balance = KrFactory::getAdminModel('contract')::getBalance($this->contract->contract_total,
				$this->fees, $this->payments);
		}
		$this->data['BOOKINGBALANCE'] = Utility::displayValue($balance, $this->contract->currency);

		$this->data['BOOKINGDATE']     = TickTock::displayDate($this->contract->created_at);
		$this->data['BOOKINGDEPOSIT']  = Utility::displayValue($this->contract->deposit, $this->contract->currency);
		$this->data['BOOKREQUESTHOLD'] = $this->contract->on_request;
		$this->data['BOOKINGSTATUS']   = Utility::getBookingStatus($this->contract->booking_status);
		$this->data['BOOKINGTOTAL']    = Utility::displayValue($this->contract->contract_total,
			$this->contract->currency);

		$this->data['DEPARTUREDATE'] = TickTock::displayDate($this->contract->departure);
		$this->data['EXPIRYDATE']    = TickTock::displayDate($this->contract->expiry_date);
		if ($this->contract->booking_status > 9)
		{
			$this->data['EXPIRYDATE'] = TickTock::displayDate($this->contract->balance_date);
		}
		$this->data['EXPIRYDAYS'] = $this->contract->expiry_days;

		$this->data['GUESTS']      = $this->contract->guests;
		$this->data['NIGHTS']      = TickTock::differenceDays($this->contract->arrival, $this->contract->departure);
		$this->data['PROPERTYUID'] = $this->contract->property_id;
		$this->data['TAG']         = $this->contract->tag;

		if ($this->params->get('property_rooms', 0))
		{
			// Specific to JSA, tags are restricted in TemplateEmail
			$this->data['BOOKINGROOMTYPES'] = KrMethods::render('email.contract.roomtypes', [
				'rooms'        => $this->contract->rooms,
				'Translations' => $this->Translations
			]);
			$this->data['BOOKINGGUESTS']    = KrMethods::render('email.contract.guesttypes', [
				'guests'      => $this->contract->guests,
				'guest_types' => $this->contract->guest_types
			]);
		}
	}

	/**
	 * Set guest data
	 *
	 * @throws Exception
	 * @since  3.3.0
	 */
	protected function setGuestData()
	{
		$this->data['GUESTEMAIL']     = $this->guest->email;
		$this->data['GUESTFIRSTNAME'] = $this->guest->firstname;
		$this->data['GUESTNAME']      = $this->guest->firstname . ' ' . $this->guest->surname;
		$this->data['GUESTMOBILE']    = Utility::formatPhoneNumber($this->guest->mobile,
			$this->guest->mobile_country_id);
	}

	/**
	 * Set email links
	 *
	 * @throws Exception
	 * @since  3.3.0
	 */
	protected function setLinks()
	{
		$query                      = [
			'option' => 'com_knowres',
			'view'   => 'property',
			'Itemid' => SiteHelper::getItemId('com_knowres', 'property'),
			'id'     => $this->property->id
		];
		$this->data['LINKPROPERTY'] = KrMethods::render('html.link',
			['query'    => $query,
			 'external' => true,
			 'text'     => $this->property->property_name,
			 'title'    => $this->property->property_name
			]);

		$this->data['LINKTRAVELINSURANCE'] = KrMethods::render('html.link',
			['query'    => $this->params->get('link_travelinsurance'),
			 'external' => false,
			 'text'     => KrMethods::plain('COM_KNOWRES_HERE'),
			 'title'    => KrMethods::plain('COM_KNOWRES_EMAIL_AFFILIATE_TRAVEL_INSURANCE')
			]);

		$this->data['LINKCARHIRE'] = KrMethods::render('html.link',
			['query'    => $this->params->get('link_carhire'),
			 'external' => false,
			 'text'     => KrMethods::plain('COM_KNOWRES_HERE'),
			 'title'    => KrMethods::plain('COM_KNOWRES_EMAIL_AFFILIATE_CAR_HIRE')
			]);

		if ((int) $this->params->get('link_cancellation', '0'))
		{
			$query                        = [
				'option' => 'com_knowres',
				'Itemid' => (int) $this->params->get('link_cancellation', '0'),
			];
			$this->data['LINKGUESTTERMS'] = KrMethods::render('html.link',
				['query'    => $query,
				 'external' => true,
				 'text'     => KrMethods::plain('COM_KNOWRES_EMAIL_TERMS'),
				 'title'    => ''
				]);
		}

		if ((int) $this->params->get('link_owner_terms', '0'))
		{
			$query                        = [
				'option' => 'com_knowres',
				'Itemid' => (int) $this->params->get('link_owner_terms', '0'),
			];
			$this->data['LINKGUESTTERMS'] = KrMethods::render('html.link',
				['query'    => $query,
				 'external' => true,
				 'text'     => KrMethods::plain('COM_KNOWRES_EMAIL_TERMS'),
				 'title'    => ''
				]);
		}

		if ((int) $this->params->get('link_login', '0'))
		{
			$query                   = [
				'option' => 'com_knowres',
				'Itemid' => (int) $this->params->get('link_login', '0'),
			];
			$this->data['LINKLOGIN'] = KrMethods::render('html.link',
				['query'    => $query,
				 'external' => true,
				 'text'     => KrMethods::plain('COM_KNOWRES_EMAIL_TERMS'),
				 'title'    => ''
				]);
		}
	}

	/**
	 * Format notes for audience
	 *
	 * @param  int  $audience  '1' Guest, '2' Owner
	 *
	 * @since  1.0.0
	 * @return string
	 */
	protected function setNotes(int $audience): string
	{
		$text = [];

		foreach ($this->notes as $n)
		{
			$note_types = Utility::decodeJson($n->note_type, true);
			if (count($note_types) && in_array($audience, $note_types))
			{
				$text[] = nl2br($n->note);
			}
		}

		return implode(' < br><br > ', $text);
	}

	/**
	 * Set owner
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	protected function setOwner()
	{
		if (empty($this->owner->id))
		{
			return;
		}

		$this->data['OWNERNAME']      = $this->owner->name;
		$this->data['OWNERTELEPHONE'] = Utility::formatPhoneNumber($this->owner->mobile,
			$this->owner->mobile_country_id);
	}

	/**
	 * Set payment data
	 *
	 * @throws Exception
	 * @since 3.3.0
	 */
	protected function setPaymentData()
	{
		$this->data['PAYMENTAMOUNT']    = Utility::displayValue($this->payment_amount, $this->payment_currency);
		$this->data['PAYMENTTOTAL']     = Utility::displayValue($this->setPaymentTotal(false),
			$this->contract->currency);
		$this->data['PAYMENTCONFIRMED'] = Utility::displayValue($this->setPaymentTotal(), $this->contract->currency);
	}

	/**
	 * Set Payments total
	 *
	 * @param  bool  $confirmed_only  Set true to only include confirmed payments
	 *
	 * @since 1.0.0
	 */
	protected function setPaymentTotal(bool $confirmed_only = true): float
	{
		$amount = 0;

		if (is_countable($this->payments))
		{
			foreach ($this->payments as $p)
			{
				if (!$confirmed_only || $p->confirmed)
				{
					$amount += $p->base_amount;
				}
			}
		}

		return (float) $amount;
	}

	/**
	 * Set property fields for email
	 *
	 * @throws Exception
	 * @since  3.3.0
	 */
	protected function setPropertyData()
	{
		$this->data['CONTACTNAME']  = $this->property->contact_name;
		$this->data['CONTACTPHONE'] = $this->property->contact_phone;
		$this->data['CONTACTEMAIL'] = $this->property->contact_email;
		$this->data['PROPERTYAKA']  = $this->property->property_aka;
		$this->data['PROPERTYAREA'] = $this->property->property_area;
		if (isset($this->property->catastral))
		{
			$this->data['PROPERTYCATASTRAL'] = $this->property->catastral;
		}
		$this->data['PROPERTYCOUNTRY']  = $this->property->country_name;
		$this->data['PROPERTYNAME']     = $this->property->property_name;
		$this->data['PROPERTYPOSTCODE'] = $this->property->property_postcode;
		$this->data['PROPERTYREGION']   = $this->property->region_name;
		$this->data['PROPERTYTOWN']     = $this->property->town_name;

		$this->caretaker_email        = $this->property->caretaker_email;
		$this->data['SECURITYTEXT']   = $this->property->security_text;
		$this->data['SECURITYAMOUNT'] = Utility::displayValue($this->property->security_amount,
			$this->contract->currency);

		if (isset($this->property->nearest_transport))
		{
			$this->data['NEARESTTRANSPORT'] = $this->property->nearest_transport;
		}
		if (isset($this->property->where_keys))
		{
			$this->data['WHEREKEYS'] = $this->property->where_keys;
		}

		$tmp = strtolower(KrMethods::plain('COM_KNOWRES_FROM')) . ' ' . $this->property->checkin_time;
		if ($this->property->checkin_time_to)
		{
			$tmp .= ' - ' . $this->property->checkin_time_to;
		}
		$this->data['CHECKINTIME']  = $tmp;
		$this->data['CHECKOUTTIME'] = strtolower(KrMethods::plain('COM_KNOWRES_BY')) . ' '
			. $this->property->checkout_time;

		$src                            = KrMethods::getRoot()
			. Media\Images::getPropertyImageLink($this->property->id);
		$this->data['PROPERTYIMAGE']    = '<img src = "' . $src . '" width="280" alt="' . $this->property->property_name
			. '" title = "' . $this->property->property_name . '" > ';
		$this->data['PROPERTYIMAGESRC'] = $src;

		// JSA specific
		$text                            = $this->property->p6;
		$text                            = ltrim($text, '<p>');
		$text                            = rtrim($text, '</p>');
		$this->data['CANCELLATIONTERMS'] = $text;
		// TODO v4.0 Generic for JSA
		//		$this->data['CHECKINOUTTIMES']   = $this->property->p14;

		$tmp = [];
		if ($this->property->property_street)
		{
			$tmp[] = $this->property->property_street;
		}
		if ($this->property->property_postcode)
		{
			$tmp[] = $this->property->property_postcode;
		}
		$this->data['PROPERTYADDRESS']   = count($tmp) ? implode(', ', $tmp) : '';
		$this->data['PROPERTYTELEPHONE'] = $this->property->property_tel;
	}

	/**
	 * Set service (plugin payment) data
	 *
	 * @throws Exception
	 * @since  3.3.0
	 */
	protected function setService()
	{
		if ($this->service_id)
		{
			$this->data['PLUGININSTRUCTIONS'] = '';
			$this->data['PLUGIN']             = '';

			$service = KrFactory::getAdminModel('service')->getItem($this->service_id);
			if ($service->id)
			{
				if (is_object($service->parameters) && isset($service->parameters->description))
				{
					$this->data['PLUGININSTRUCTIONS'] = nl2br($service->parameters->description);
				}
				$this->data['PLUGIN'] = trim($service->name);
			}
		}
	}
}