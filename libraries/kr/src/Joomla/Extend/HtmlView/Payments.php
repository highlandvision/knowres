<?php
/**
 * @package     KR
 * @subpackage  Admin views
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

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

/**
 * Contract toolbars
 *
 * @since 4.0.0
 */
class Payments extends KrHtmlView
{
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
	 * Add the custom toolbar for payments
	 *
	 * @param  Toolbar  $Toolbar  Current toolbar
	 * @param  string   $name     Name of view
	 *
	 * @throws Exception
	 * @since  2.0.0
	 */
	public function addToolbar(Toolbar $Toolbar, string $name): Toolbar
	{
		if (!in_array($name, $this->related) && $this->item->departure >= $this->today && !$this->item->cancelled)
		{
			if ($this->allow_edit && $this->canDo->get('core.edit'))
			{
				$link = KrMethods::route('index.php?option=com_knowres&task=contract.edit&id=' . $this->item->id);
				$Toolbar->linkButton('contract', 'JTOOLBAR_EDIT')
				        ->icon('fas fa-edit knowres')
				        ->url($link);

				$title = KrMethods::plain('COM_KNOWRES_CONTRACT_QUICK_EDIT');
				$html  = KrMethods::render('toolbar.contract.quickedit', ['title' => $title]);
				$Toolbar->customButton('quickedit')
				        ->html($html);
			}
		}

		if ($this->item->departure >= $this->today && !$this->item->cancelled)
		{
			if ($this->allow_cancel)
			{
				$text = KrMethods::plain('COM_KNOWRES_JS_CONFIRM');
				/** @noinspection PhpParamsInspection */
				$Toolbar->standardButton('cancel')
				        ->icon('fas fa-thumbs-down knowres')
				        ->onclick("return confirm('" . $text
					        . "')?Knowres.submitform('contract.trash', document.getElementById('contract-form')):'';")
				        ->text('JTOOLBAR_CANCEL');
			}
		}

		if ($this->params->get('delete_contracts', 0) && $this->access_level == 40)
		{
			$text = KrMethods::plain('COM_KNOWRES_CONTRACT_DELETE_CONFIRM');
			/** @noinspection PhpParamsInspection */
			$Toolbar->standardButton('delete')
			        ->icon('fas fa-exclamation-triangle knowres')
			        ->onclick("return confirm('" . $text
				        . "')?Knowres.submitform('contract.delete', document.getElementById('contract-form')):'';")
			        ->text('JTOOLBAR_DELETE');
		}

		if ($this->allow_edit && $this->access_level > 10 && !$this->item->black_booking)
		{
			if (!$this->item->cancelled)
			{
				$title = KrMethods::plain('COM_KNOWRES_CONTRACT_SEND_EMAIL');
				$html  = KrMethods::render('toolbar.contract.trigger', ['title' => $title]);
				$Toolbar->customButton('trigger')->html($html);
			}
			else if ($this->item->departure > $this->today)
			{
				$title = KrMethods::plain('COM_KNOWRES_CONTRACTS_RESURRECT');
				$html  = KrMethods::render('toolbar.contract.resurrect', ['title' => $title]);
				$Toolbar->customButton('resurrect')->html($html);
			}
		}

		if (!$this->params->get('create_user', 0) && $this->access_level == 40)
		{
			$hash = Cryptor::setHash(0, $this->item->guest_id, $this->item->qkey);
			$key  = Cryptor::encrypt($hash);
			$link = KrMethods::route(KrMethods::getRoot()
				. 'index.php?option=com_knowres&task=dashboard.request&key=' . $key);

			$Toolbar->linkButton('guestdashboard', 'COM_KNOWRES_PROPERTYDASHBOARD_TITLE')
			        ->buttonClass('btn btn-primary')
			        ->icon('fas fa-user knowres')
			        ->target('_blank')
			        ->url($link);
		}

		$link = KrMethods::route('index.php?option=com_knowres&task=property.calendar&property_id='
			. $this->item->property_id);
		$Toolbar->linkButton('calendar', 'COM_KNOWRES_TITLE_PROPERTY_CALENDAR')
		        ->icon('fas fa-calendar knowres')
		        ->url($link);

		$Toolbar = $this->addConfigToolbar($Toolbar);
		$Toolbar = $this->addQuickLinksToolbar($Toolbar);
		$Toolbar = $this->addBackLink($Toolbar);

		$link = KrMethods::route('index.php?option=com_knowres&view=contracts');
		$Toolbar->linkButton('close', 'JTOOLBAR_CLOSE')
		        ->buttonClass('btn btn-danger')
		        ->icon('fas fa-times knowres')
		        ->url($link);

		if ($this->canDo->get('core.admin'))
		{
			ToolbarHelper::preferences('com_knowres');
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
		$Toolbar = Toolbar::getInstance();

		if ($this->access_level > 10)
		{
			$link = KrMethods::route('index.php?option=com_knowres&view=ownerpayments');
			$Toolbar->linkButton('owner-payments', 'COM_KNOWRES_OWNERPAYMENTS_TITLE')
			        ->url($link)
			        ->icon('fas fa-house-user knowres');

			if ($this->access_level == 40)
			{
				$link = KrMethods::route('index.php?option=com_knowres&view=exchangerates');
				$Toolbar->linkButton('exchangerates', 'COM_KNOWRES_EXCHANGERATES_TITLE')
				        ->url($link)
				        ->icon('fas fa-exchange-alt knowres');
			}

			$link = KrMethods::route('index.php?option=com_knowres&view=export&layout=payments');
			$Toolbar->linkButton('export-payments-csv', 'COM_KNOWRES_EXPORT_TITLE_PAYMENTS')
			        ->url($link)
			        ->icon('fas fa-file-csv knowres');
		}

		$Toolbar = $this->addConfigToolbar($Toolbar);
		$Toolbar = $this->addQuickLinksToolbar($Toolbar);

		if ($this->canDo->get('core.admin'))
		{
			$Toolbar->preferences('com_knowres');
		}

		return $Toolbar;
	}
}