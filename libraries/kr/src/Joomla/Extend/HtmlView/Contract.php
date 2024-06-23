<?php
/**
 * @package     KR
 * @subpackage  Admin views
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */
/** @noinspection PhpPossiblePolymorphicInvocationInspection */

namespace HighlandVision\KR\Joomla\Extend\HtmlView;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Cryptor;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Joomla\Extend\HtmlView as KrHtmlView;
use Joomla\CMS\Toolbar\Toolbar;
use Joomla\CMS\Toolbar\ToolbarHelper;

use function defined;
use function in_array;
use function is_null;

/**
 * Contract toolbars
 *
 * @since 4.0.0
 */
class Contract extends KrHtmlView
{
	/** @var array Contract related views */
	public array $related
		= ['agencies', 'agents', 'emailactions', 'emailtemplates', 'emailtriggers', 'guests', 'referrals'];

	/**
	 * Constructor
	 *
	 * @throws Exception
	 * @since  4.0.0
	 */
	public function __construct()
	{
		parent::__construct();
	}

	/**
	 * Add related property data.
	 *
	 * @param  Toolbar  $Toolbar  Current toolbar.
	 * @param  string   $name     Name of view
	 *
	 * @throws Exception
	 * @since  4.0.0
	 * @return Toolbar
	 */
	public function addRelated(Toolbar $Toolbar, string $name): Toolbar
	{
		$dropdown     = $Toolbar->dropdownButton('contract-edit-group')
		                        ->text('COM_KNOWRES_TOOLBAR_CONTRACTS_DATA')
		                        ->toggleSplit(false)
		                        ->icon('fa-solid fa-network-wired')
		                        ->buttonClass('btn btn-action');
		$ChildToolbar = $dropdown->getChildToolbar();

		if ($name !== 'agencies')
		{
			$link = KrMethods::route('index.php?option=com_knowres&view=agencies');
			$ChildToolbar->linkButton('agencies', 'COM_KNOWRES_AGENCIES_TITLE')
			             ->icon('fa-solid fa-users knowres')
			             ->url($link);
		}

		if ($name !== 'agents')
		{
			$link = KrMethods::route('index.php?option=com_knowres&view=agents');
			$ChildToolbar->linkButton('agents', 'COM_KNOWRES_AGENTS_TITLE')
			             ->icon('fa-solid fa-headphones knowres')
			             ->url($link);
		}

		if ($name !== 'emailactions')
		{
			$link = KrMethods::route('index.php?option=com_knowres&view=emailactions');
			$ChildToolbar->linkButton('emailactions', 'COM_KNOWRES_EMAILACTIONS_TITLE')
			             ->icon('fa-solid fa-at knowres')
			             ->url($link);
		}

		if ($name !== 'emailtemplates')
		{
			$link = KrMethods::route('index.php?option=com_knowres&view=emailtemplates');
			$ChildToolbar->linkButton('emailtemplates', 'COM_KNOWRES_EMAILTEMPLATES_TITLE')
			             ->icon('fa-solid fa-envelope knowres')
			             ->url($link);
		}

		if ($name !== 'emailtriggers')
		{
			$link = KrMethods::route('index.php?option=com_knowres&view=emailtriggers');
			$ChildToolbar->linkButton('emailtriggers', 'COM_KNOWRES_EMAILTRIGGERS_TITLE')
			             ->icon('fa-solid fa-mail-bulk knowres')
			             ->url($link);
		}

		if ($name !== 'guests')
		{
			$link = KrMethods::route('index.php?option=com_knowres&view=guests');
			$ChildToolbar->linkButton('guests', 'COM_KNOWRES_GUESTS_TITLE')
			             ->icon('fa-solid fa-user knowres')
			             ->url($link);
		}

		if ($name !== 'referrals')
		{
			$link = KrMethods::route('index.php?option=com_knowres&view=referrals');
			$ChildToolbar->linkButton('referrals', 'COM_KNOWRES_REFERRALS_TITLE')
			             ->icon('fa-solid fa-eye knowres')
			             ->url($link);
		}

		return $Toolbar;
	}

	/**
	 * Add the custom toolbar for contract show
	 *
	 * @param  Toolbar  $Toolbar  Current toolbar
	 * @param  string   $name     Name of view
	 *
	 * @throws Exception
	 * @since  2.0.0
	 */
	public function addToolbar(Toolbar $Toolbar, string $name): Toolbar
	{
		$dropdown     = $Toolbar->dropdownButton('contract-update-group')
		                        ->toggleButtonClass('btn');
		$ChildToolbar = $dropdown->getChildToolbar();

		if (!in_array($name, $this->related) && !$this->item->cancelled)
		{
			if ($this->access_level > 10
				|| $this->checkAccess($this->item->black_booking ? 'block_edit' : 'contract.edit'))
			{
				$link = KrMethods::route('index.php?option=com_knowres&task=contract.edit&id=' . $this->item->id);
				$ChildToolbar->linkButton('edit')
				             ->url($link)
				             ->text('JTOOLBAR_EDIT');

				$title = KrMethods::plain('COM_KNOWRES_CONTRACT_QUICK_EDIT');
				$html  = KrMethods::render('toolbar.contract.quickedit', ['title' => $title]);
				$ChildToolbar->customButton('quickedit')->html($html);
			}
		}

		if ($this->access_level > 10 && !$this->item->black_booking)
		{
			if (!$this->item->cancelled)
			{
				$title = KrMethods::plain('COM_KNOWRES_CONTRACT_SEND_EMAIL');
				$html  = KrMethods::render('toolbar.contract.trigger', ['title' => $title]);
				$ChildToolbar->customButton('trigger')->html($html);
			}
			if ($this->item->cancelled && $this->item->arrival >= $this->today)
			{
				$title = KrMethods::plain('COM_KNOWRES_CONTRACTS_RESURRECT');
				$html  = KrMethods::render('toolbar.contract.resurrect', ['title' => $title]);
				$ChildToolbar->customButton('resurrect')->html($html);
			}
		}

		if (!$this->item->cancelled)
		{
			if ($this->access_level > 10
				|| $this->checkAccess($this->item->black_booking ? 'block_cancel' : 'contract.cancel'))
			{
				$text = KrMethods::plain('COM_KNOWRES_JS_CONFIRM');
				$ChildToolbar->standardButton('cancel')
				             ->icon('fa-solid fa-thumbs-down red knowres')
				             ->onclick("return confirm('" . $text
					             . "')?Knowres.submitform('contract.trash', document.getElementById('contract-form')):'';")
				             ->text('JTOOLBAR_CANCEL');
			}
		}

		if ($this->params->get('delete_contracts', 0) && $this->access_level == 40)
		{
			$text = KrMethods::plain('COM_KNOWRES_CONTRACT_DELETE_CONFIRM');
			$ChildToolbar->standardButton('delete')
			             ->icon('fa-solid fa-exclamation-triangle red knowres')
			             ->onclick("return confirm('" . $text
				             . "')?Knowres.submitform('contract.delete', document.getElementById('contract-form')):'';")
			             ->text('JTOOLBAR_DELETE');
		}

		if ($this->access_level == 40)
		{
			$Toolbar = $this->addRelated($Toolbar, 'show');
		}
		$Toolbar = $this->addPdf($Toolbar);

		$link = KrMethods::route('index.php?option=com_knowres&task=property.calendar&property_id='
			. $this->item->property_id);
		$Toolbar->linkButton('calendar', 'COM_KNOWRES_TITLE_PROPERTY_CALENDAR')
		        ->icon('fa-solid fa-calendar knowres')
		        ->url($link);

//		if (!$this->params->get('create_user', 0) && $this->access_level == 40)
		if ($this->access_level == 40)
		{
			$hash = Cryptor::setHash(0, $this->item->guest_id, $this->item->qkey);
			$key  = Cryptor::encrypt($hash);
			$link = KrMethods::route(KrMethods::getRoot()
				. 'index.php?option=com_knowres&task=dashboard.request&key=' . $key);

			$Toolbar->linkButton('guestdashboard', 'COM_KNOWRES_TITLE_DASHBOARD')
			        ->buttonClass('btn btn-primary')
			        ->icon('fa-solid fa-user knowres')
			        ->target('_blank')
			        ->url($link);
		}

		$Toolbar = $this->addConfigToolbar($Toolbar);
		$Toolbar = $this->addQuickLinksToolbar($Toolbar);
		$Toolbar = $this->addBackLink($Toolbar);

		$link = KrMethods::route('index.php?option=com_knowres&view=contracts');
		$Toolbar->linkButton('close', 'JTOOLBAR_CLOSE')
		        ->buttonClass('btn btn-danger')
		        ->icon('fa-solid fa-times knowres')
		        ->url($link);

		if ($this->canDo->get('core.admin'))
		{
			ToolbarHelper::preferences('com_knowres');
		}

		return $Toolbar;
	}

	/**
	 * Check if pdf toolbar required and add
	 *
	 * @param  Toolbar  $Toolbar  Toolbar instsance
	 *
	 * @since  4.0.0
	 * @return Toolbar
	 */
	protected function addPdf(Toolbar $Toolbar): Toolbar
	{
		/** @noinspection PhpLoopNeverIteratesInspection */
		while (true)
		{
			if (!empty($this->item->guestdata_id) && (int) $this->item->guestdata_id > 0
				&& $this->item->booking_status > 9
				&& !$this->item->black_booking
				&& !$this->item->cancelled)
			{
				break;
			}

			if ($this->item->booking_status >= 39 && !$this->item->black_booking && !$this->item->cancelled)
			{
				break;
			}

			if ($this->item->booking_status > 9 && !$this->item->black_booking && !$this->item->cancelled)
			{
				break;
			}

			return $Toolbar;
		}

		$dropdown     = $Toolbar->dropdownButton('contract-pdf-group')
		                        ->text('COM_KNOWRES_TOOLBAR_PDF')
		                        ->toggleSplit(false)
		                        ->icon('fa-solid fa-file-download knowres')
		                        ->buttonClass('btn btn-action');
		$ChildToolbar = $dropdown->getChildToolbar();

		if (!empty($this->item->guestdata_id) && (int) $this->item->guestdata_id > 0 && $this->item->booking_status > 9
			&& !$this->item->black_booking
			&& !$this->item->cancelled)
		{
			$ChildToolbar->standardButton('guestdata', 'COM_KNOWRES_CONTRACTGUESTDATAS_PDF')
			             ->onclick("Joomla.submitform('contractguestdata.pdf', document.getElementById('contractpdf-form'))")
			             ->icon('fa-solid fa-file-pdf knowres');
		}

		if ($this->item->booking_status >= 39 && !$this->item->black_booking && !$this->item->cancelled)
		{
			$ChildToolbar->standardButton('voucher', 'COM_KNOWRES_CONTRACT_VOUCHER')
			             ->onclick("Joomla.submitform('contract.voucher', document.getElementById('contractpdf-form'))")
			             ->icon('fa-solid fa-file-pdf knowres');
		}

		if ($this->item->booking_status > 9 && !$this->item->black_booking && !$this->item->cancelled)
		{
			$ChildToolbar->standardButton('invoice', 'COM_KNOWRES_CONTRACT_INVOICE_PDF')
			             ->onclick("Joomla.submitform('contract.invoice', document.getElementById('contractpdf-form'))")
			             ->icon('fa-solid fa-file-pdf knowres');
		}

		return $Toolbar;
	}

	/**
	 * Add the default toolbar for list view.
	 *
	 * @param  ?string  $list_name  Name of list model
	 *
	 * @throws Exception
	 * @since  4.0.0
	 * @return Toolbar
	 */
	protected function addListToolbar(?string $list_name = null): Toolbar
	{
		$Toolbar   = Toolbar::getInstance();
		$list_name = is_null($list_name) ? $this->form_name . 's' : $list_name;

		if ($this->access_level == 40 && $list_name != 'contracts')
		{
			$Toolbar->addNew($this->form_name . '.add');
			$Toolbar = $this->addChildActionsToolbar($Toolbar, $list_name);
		}

		if ($this->access_level == 40)
		{
			$Toolbar = $this->addRelated($Toolbar, $list_name);

			if ($list_name != 'contracts')
			{
				$link = KrMethods::route('index.php?option=com_knowres&view=contracts');
				$Toolbar->linkButton('contracts', 'COM_KNOWRES_CONTRACTS_TITLE')
				        ->icon('fa-solid fa-home knowres')
				        ->url($link);
			}
		}

		if ($list_name == 'contracts')
		{
			if ($this->access_level > 10)
			{
				$link = KrMethods::route('index.php?option=com_knowres&view=export&layout=contracts');
				$Toolbar->linkButton('export-contracts-csv', 'COM_KNOWRES_EXPORT_TITLE_CONTRACTS')
				        ->url($link)
				        ->icon('fa-solid fa-file-csv knowres');

				$link = KrMethods::route('index.php?option=com_knowres&view=export&layout=balances');
				$Toolbar->linkButton('export-balances-csv', 'COM_KNOWRES_EXPORT_TITLE_BALANCES')
				        ->url($link)
				        ->icon('fa-solid fa-file-csv knowres');
			}
		}
		else if ($list_name == 'contractpayments')
		{
			$link = KrMethods::route('index.php?option=com_knowres&view=export&layout=payments');
			$Toolbar->linkButton('export-payments-csv', 'COM_KNOWRES_EXPORT_TITLE_PAYMENTS')
			        ->url($link)
			        ->icon('fa-solid fa-file-csv knowres');
		}

		$Toolbar = $this->addConfigToolbar($Toolbar);
		$Toolbar = $this->addQuickLinksToolbar($Toolbar);

		if ($this->canDo->get('core.admin'))
		{
			$Toolbar->preferences('com_knowres');
		}

		return $Toolbar;
	}

	/**
	 * Set custom actions based on params
	 *
	 * @since  4.0.0
	 */
	protected function setCustomActions(): void
	{
		if ($this->access_level == 10)
		{
			if ($this->item->black_booking && !$this->params->get('block_edit'))
			{
				$this->allow_edit = false;
			}
			else if (!$this->item->black_booking && !$this->params->get('contract_edit'))
			{
				$this->allow_edit = false;
			}

			if ($this->item->black_booking && !$this->params->get('block_cancel'))
			{
				$this->allow_cancel = false;
			}
			else if (!$this->item->black_booking && !$this->params->get('contract_cancel'))
			{
				$this->allow_cancel = false;
			}
		}
	}
}