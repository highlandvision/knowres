<?php
/**
 * @package     KR
 * @subpackage  Admin views
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Administrator\View\Contractnote;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\Component\Knowres\Administrator\Model\ContractnoteModel;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Joomla\Extend\HtmlView as KrHtmlView;
use HighlandVision\KR\Utility;
use Joomla\CMS\Toolbar\ToolbarHelper;

use function strtolower;

/**
 * Contract note edit view
 *
 * @since 1.0.0
 */
class HtmlView extends KrHtmlView
{
	/** @var false|object Contract row. */
	public false|object $contract;

	/**
	 * Display the view
	 *
	 * @param  null  $tpl  Default template.
	 *
	 * @throws Exception
	 * @since  1.0.0
	 * @return void
	 */
	public function display($tpl = null): void
	{
		$contract_id = KrMethods::getUserState('com_knowres.current.contract_id', 0);
		if (empty($contract_id))
		{
			Utility::goto('contracts');
		}
		$this->contract = KrFactory::getAdminModel('contract')->getItem($contract_id);
		if (empty($this->contract->id))
		{
			Utility::goto('contracts');
		}

		/** @var ContractnoteModel $model */
		$model       = $this->getModel();
		$this->form  = $model->getForm();
		$this->item  = $model->getItem();
		$this->state = $model->getState();

		$this->checkVersions();
		$this->checkErrors();

		$this->form_name = KrMethods::plain('COM_KNOWRES_CONTRACTFEE_TITLE');
		$this->getFormAriaLabel();
		ToolbarHelper::title($this->form_name, 'fa-solid fa-sticky-note knowres');
		$this->addFormToolbar(strtolower($this->getName()));

		parent::display($tpl);
	}
}