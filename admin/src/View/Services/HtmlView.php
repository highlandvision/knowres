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
use HighlandVision\Component\Knowres\Administrator\Model\ServicesModel;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Joomla\Extend\HtmlView as KrHtmlView;
use Joomla\CMS\Toolbar\Toolbar;
use Joomla\CMS\Toolbar\ToolbarHelper;

use function defined;
use function in_array;

/**
 * List services
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
		/** @var ServicesModel $model * */
		$model               = $this->getModel();
		$this->state         = $model->getState();
		$this->items         = $model->getItems();
		$this->pagination    = $model->getPagination();
		$this->filterForm    = $model->getFilterForm();
		$this->activeFilters = $model->getActiveFilters();
		$this->ordering      = in_array('ordering', $model->getFilterFields());
		$this->form_name     = 'service';

		if (!$this->checkEmpty())
		{
			$this->checkErrors();
			ToolbarHelper::title(KrMethods::plain('COM_KNOWRES_SERVICES_TITLE'), 'tasks knowres');
			$this->addListToolbar($this->get('name'));

			parent::display($tpl);
		}
	}

	/**
	 * Add the toolbar.
	 *
	 * @param   Toolbar  $Toolbar  Current toolbar
	 *
	 * @throws Exception
	 * @since  4.0.0
	 * @return Toolbar
	 */
	protected function addCustomToolbar(Toolbar $Toolbar): Toolbar
	{
		return $this->addServicesDropdown($Toolbar);
	}
}