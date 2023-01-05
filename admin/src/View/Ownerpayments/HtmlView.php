<?php
/**
 * @package     KR
 * @subpackage  Admin views
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Administrator\View\Ownerpayments;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\Component\Knowres\Administrator\Model\OwnerpaymentsModel;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Joomla\Extend\HtmlView as KrHtmlView;
use Joomla\CMS\Toolbar\Toolbar;
use Joomla\CMS\Toolbar\ToolbarHelper;

use function defined;
use function in_array;

/**
 * List Owner payments
 *
 * @since 3.3.1
 */
class HtmlView extends KrHtmlView
{
	/**
	 * Display the view
	 *
	 * @param  ?string  $tpl  A template file to load. [optional]
	 *
	 * @throws Exception
	 * @since  3.3.1
	 * @return void
	 */
	public function display($tpl = null): void
	{
		/** @var OwnerpaymentsModel $model * */
		$model               = $this->getModel();
		$this->state         = $model->getState();
		$this->items         = $model->getItems();
		$this->pagination    = $model->getPagination();
		$this->filterForm    = $model->getFilterForm();
		$this->activeFilters = $model->getActiveFilters();
		$this->ordering      = in_array('ordering', $model->getFilterFields());
		$this->form_name     = 'ownerpayment';

		$this->checkErrors();
		ToolbarHelper::title(KrMethods::plain('COM_KNOWRES_OWNERPAYMENTS_TITLE'), 'tasks knowres');
		$this->addListToolbar($this->get('name'));
		KrMethods::setUserState('com_knowres.gobackto', 'view=ownerpayments');

		parent::display($tpl);
	}

	/**
	 * Add any custom toolbar links
	 *
	 * @param   Toolbar  $Toolbar  Current toolbar instance
	 *
	 * @throws Exception
	 * @since  4.0.0
	 * @return Toolbar
	 */
	protected function addCustomToolbar(Toolbar $Toolbar): Toolbar
	{
		$link = KrMethods::route('index.php?option=com_knowres&view=export&layout=ownerpayments');
		$Toolbar->linkButton('export-payments-csv', 'COM_KNOWRES_EXPORT_TITLE_OWNERPAYMENTS')
		        ->url($link)
		        ->icon('fas fa-file-csv knowres');

		return $Toolbar;
	}
}