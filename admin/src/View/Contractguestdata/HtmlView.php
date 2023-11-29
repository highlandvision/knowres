<?php
/**
 * @package     KR
 * @subpackage  Admin views
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Administrator\View\Contractguestdata;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\Component\Knowres\Administrator\Model\ContractguestdataModel;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Joomla\Extend\HtmlView as KrHtmlView;
use HighlandVision\KR\Utility;
use Joomla\CMS\Toolbar\ToolbarHelper;

use function strtolower;

/**
 * Contract guestdata edit view
 *
 * @since 1.0.0
 */
class HtmlView extends KrHtmlView
{
	/** @var false|object Contract item. */
	public false|object $contract;
	/** @var false|object Property item. */
	public false|object $property;

	/**
	 * Display the view
	 *
	 * @param  null  $tpl  Default template
	 *
	 * @throws Exception
	 * @since  1.0.0
	 * @return void
	 */
	public function display($tpl = null): void
	{
		$contract_id = KrMethods::getUserState('com_knowres.current.contract_id', 0);
		if (!$contract_id)
		{
			Utility::goto('contracts');
		}

		$this->contract = KrFactory::getAdminModel('contract')->getItem($contract_id);
		$this->property = KrFactory::getAdminModel('property')->getItem($this->contract->property_id);

		/** @var ContractguestdataModel $model */
		$model      = $this->getModel();
		$this->item = $model->getItem();
		$this->form = $model->getForm();
		if (empty($this->form->getValue('id')))
		{
			$this->form->setValue('contract_id', null, $contract_id);
		}
		$this->state  = $model->getState();
		$this->params = KrMethods::getParams();

		$this->checkVersions();
		$this->checkErrors();

		$this->form_name = KrMethods::plain('COM_KNOWRES_CONTRACTGUESTDATA_TITLE');
		$this->getFormAriaLabel();
		ToolbarHelper::title($this->form_name, 'fa-solid fa-database knowres');
		$this->addFormToolbar(strtolower($this->getName()));

		parent::display($tpl);
	}
}