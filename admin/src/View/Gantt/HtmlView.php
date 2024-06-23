<?php
/**
 * @package     KR
 * @subpackage  Admin views
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */
/** @noinspection PhpPossiblePolymorphicInvocationInspection */

namespace HighlandVision\Component\Knowres\Administrator\View\Gantt;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Joomla\Extend\HtmlView as KrHtmlView;
use HighlandVision\KR\Session as KrSession;
use Joomla\CMS\Toolbar\Toolbar;
use Joomla\CMS\Toolbar\ToolbarHelper;

/**
 * View gantt reservations calendar
 *
 * @since 1.0.0
 */
class HtmlView extends KrHtmlView
{
	/** @var string Input date html. */
	protected string $date;

	/**
	 * Display the view
	 *
	 * @param   null  $tpl
	 *
	 * @throws Exception
	 * @since  3.2.0
	 * @return void
	 */
	public function display($tpl = null): void
	{
		$this->params       = KrMethods::getParams();
		$userSession        = new KrSession\User();
		$this->access_level = $userSession->getAccessLevel();

		ToolbarHelper::title(KrMethods::plain('COM_KNOWRES_GANTT_TITLE'), 'fa-solid fa-calendar-alt');
		$this->addToolbar();
		KrMethods::setUserState('com_knowres.gobackto', 'view=gantt');

		parent::display($tpl);
	}

	/**
	 * Add the page title and toolbar
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	protected function addToolbar(): void
	{
		$Toolbar = Toolbar::getInstance();
		$Toolbar->linkButton('refresh')
		        ->icon('fa-solid fa-redo knowres')
		        ->text('COM_KNOWRES_REFRESH')
		        ->url(KrMethods::route('index.php?option=com_knowres&view=gantt'));
		$Toolbar->linkButton('contracts')
		        ->icon('fa-solid fa-list knowres')
		        ->text('COM_KNOWRES_CONTRACTS_TITLE')
		        ->url(KrMethods::route('index.php?option=com_knowres&view=contracts'));
		$Toolbar->linkButton('properties')
		        ->icon('fa-solid fa-list knowres')
		        ->text('COM_KNOWRES_PROPERTIES_TITLE')
		        ->url(KrMethods::route('index.php?option=com_knowres&view=properties'));

		$Toolbar = $this->addConfigToolbar($Toolbar);
		$Toolbar = $this->addQuickLinksToolbar($Toolbar);
		$Toolbar = $this->addBackLink($Toolbar);

		$Toolbar->linkButton('close')
		        ->icon('fa-solid fa-times knowres')
		        ->text('JTOOLBAR_CLOSE')
		        ->url(KrMethods::route('index.php?option=com_knowres&task=gantt.cancel'));
	}
}