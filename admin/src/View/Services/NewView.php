<?php
/**
 * @package     KR
 * @subpackage  Admin views
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Administrator\View\Services;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Joomla\Extend\HtmlView as KrHtmlView;
use HighlandVision\KR\Service;
use Joomla\CMS\Toolbar\Toolbar;
use Joomla\CMS\Toolbar\ToolbarHelper;

use function defined;

/**
 * Display services for new selection
 *
 * @since 1.0.0
 */
class NewView extends KrHtmlView
{
	/** @var  array All services */
	public array $all = [];
	/** @var  array Installed services */
	public array $installed = [];

	/**
	 * Display the view
	 *
	 * @param  ?string  $tpl  A template file to load. [optional]
	 *
	 * @throws Exception
	 * @since  1.0.0
	 * @return void
	 */
	public function display($tpl = null): void
	{
		$this->setLayout('new');
		$this->installed = Service::getServices();

		ToolbarHelper::title(KrMethods::plain('COM_KNOWRES_SERVICE_ADD'), 'tasks knowres');
		$Toolbar = Toolbar::getInstance();
		$this->addCustomToolbar($Toolbar);

		parent::display($tpl);
	}

	/**
	 * Add the toolbar.
	 *
	 * @param  Toolbar  $Toolbar  Current toolbar
	 *
	 * @throws Exception
	 * @since  4.0.0
	 * @return Toolbar
	 */
	protected function addCustomToolbar(Toolbar $Toolbar): Toolbar
	{
		$link = KrMethods::route('index.php?option=com_knowres&view=services');
		/** @noinspection PhpPossiblePolymorphicInvocationInspection */
		$Toolbar->linkButton('back', 'JTOOLBAR_BACK')
		        ->buttonClass('btn')
		        ->icon('fa-solid fa-fast-backward knowres')
		        ->url($link);

		return $Toolbar;
	}
}