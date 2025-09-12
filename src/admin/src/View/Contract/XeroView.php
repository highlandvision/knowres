<?php
/**
 * @package     KR
 * @subpackage  Admin views
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Joomla\Extend\HtmlView as KrHtmlView;
use JetBrains\PhpStorm\NoReturn;

/**
 * Edit service log
 *
 * @since 1.0.0
 */
class XeroView extends KrHtmlView
{
	/**
	 * Display the view
	 *
	 * @param   null  $tpl
	 *
	 * @throws Exception
	 * @since  1.0.0
	 * @return void
	 */
	#[NoReturn] public function display($tpl = null): void
	{
		$this->setLayout('xero');

		$this->state = $this->get('state');
		$contract_id = (int) KrMethods::getUserState('com_knowres.current.contract_id', 0);
		$this->item  = KrFactory::getAdminModel('contract')->getItem($contract_id);
		$this->xero  = KrFactory::getListModel('services')::checkForSingleService(false, 'xero');

		parent::display($tpl);
		jexit();
	}
}