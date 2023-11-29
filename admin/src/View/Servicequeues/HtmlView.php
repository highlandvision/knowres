<?php
/**
 * @package     KR
 * @subpackage  Admin views
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Administrator\View\Servicequeues;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\Component\Knowres\Administrator\Model\ServicequeuesModel;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Joomla\Extend\HtmlView as KrHtmlView;
use Joomla\CMS\Toolbar\Toolbar;
use Joomla\CMS\Toolbar\ToolbarHelper;

use function defined;
use function in_array;

/**
 * List service queue.
 *
 * @since 1.0.0
 */
class HtmlView extends KrHtmlView
{
	/**
	 * Display the view
	 *
	 * @param  ?string  $tpl  A template file to load. [optional]
	 *
	 * @throws  Exception
	 * @since   1.0.0
	 * @return  void
	 */
	public function display($tpl = null): void
	{
		/** @var ServicequeuesModel $model * */
		$model               = $this->getModel();
		$this->items         = $model->getItems();
		$this->pagination    = $model->getPagination();
		$this->state         = $model->getState();
		$this->filterForm    = $model->getFilterForm();
		$this->activeFilters = $model->getActiveFilters();
		$this->ordering      = in_array('ordering', $model->getFilterFields());
		$this->form_name     = 'servicequeue';

		$this->checkErrors();
		ToolbarHelper::title(KrMethods::plain('COM_KNOWRES_SERVICEQUEUES_TITLE'), 'tasks knowres');
		$this->addListToolbar($this->get('name'));

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
		$Toolbar->confirmButton('resend')
		        ->icon('fa-solid fa-redo')
		        ->listCheck(true)
		        ->task('servicequeues.resend')
		        ->text('COM_KNOWRES_RESEND');

		return $this->addServicesDropdown($Toolbar);
	}
}