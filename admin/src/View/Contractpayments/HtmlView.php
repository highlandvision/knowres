<?php
/**
 * @package     KR
 * @subpackage  Admin views
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Administrator\View\Contractpayments;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\Component\Knowres\Administrator\Model\ContractpaymentsModel;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Joomla\Extend\HtmlView as KrHtmlView;
use HighlandVision\KR\Session as KrSession;
use Joomla\CMS\Toolbar\ToolbarHelper;

use function defined;
use function in_array;

/**
 * List Contract payments
 *
 * @since 3.0.0
 */
class HtmlView extends KrHtmlView\Payments
{
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
		/** @var ContractpaymentsModel $model * */
		$model               = $this->getModel();
		$this->state         = $model->getState();
		$this->items         = $model->getItems();
		$this->pagination    = $model->getPagination();
		$this->filterForm    = $model->getFilterForm();
		$this->activeFilters = $model->getActiveFilters();
		$this->ordering      = in_array('ordering', $model->getFilterFields());
		$this->form_name     = 'contractpayment';
		$this->allow_edit    = false;

		if (!$this->checkEmpty())
		{
			$this->checkErrors();

			$userSession        = new KrSession\User();
			$this->access_level = $userSession->getAccessLevel();

			ToolbarHelper::title(KrMethods::plain('COM_KNOWRES_CONTRACTPAYMENTS_TITLE'), 'tasks knowres');
			$this->addListToolbar($this->get('name'));
			KrMethods::setUserState('com_knowres.gobackto', 'view=contractpayments');

			parent::display($tpl);
		}
	}
}