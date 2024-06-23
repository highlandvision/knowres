<?php
/**
 * @package     KR
 * @subpackage  Admin views
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Administrator\View\Propertyicals;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\Component\Knowres\Administrator\Model\PropertyicalsModel;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Joomla\Extend\HtmlView as KrHtmlView;
use Joomla\CMS\Toolbar\Toolbar;
use Joomla\CMS\Toolbar\ToolbarHelper;

use function defined;
use function in_array;

/**
 * List property icals
 *
 * @since 1.0.0
 */
class HtmlView extends KrHtmlView\Property
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
		$this->getUserSessionData();

		/** @var PropertyicalsModel $model * */
		$model       = $this->getModel();
		$this->state = $model->getState();
		$this->state->set('filter.property_id', $this->property_id);
		$this->items         = $model->getItems();
		$this->pagination    = $model->getPagination();
		$this->filterForm    = $model->getFilterForm();
		$this->activeFilters = $model->getActiveFilters();
		$this->ordering      = in_array('ordering', $model->getFilterFields());
		$this->form_name     = 'propertyical';

		if (!$this->checkEmpty())
		{
			$this->checkErrors();
			ToolbarHelper::title(KrMethods::plain('COM_KNOWRES_PROPERTYICALS_TITLE'), 'tasks knowres');
			$this->addListToolbar($this->get('name'));

			parent::display($tpl);
		}
	}

	/**
	 * Add custom toolbar
	 *
	 * @param  Toolbar  $Toolbar  Joomla toolbar
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	/** @noinspection PhpPossiblePolymorphicInvocationInspection */
	protected function addCustomToolbar(Toolbar $Toolbar): Toolbar
	{
		$dropdown = $Toolbar->dropdownButton('propertyical-manage-group')
		                    ->text('COM_KNOWRES_PROPERTYICALS_MANAGE')
		                    ->toggleSplit(false)
		                    ->icon('fa-solid fa-user')
		                    ->buttonClass('btn btn-action');

		$ChildToolbar = $dropdown->getChildToolbar();

		if ($this->canDo->get('core.delete', 'com_knowres'))
		{
			$ChildToolbar->confirmButton('kr-icals-purge')
			             ->buttonClass('btn btn-danger')
			             ->icon('icon-trash')
			             ->listCheck(true)
			             ->message('COM_KNOWRES_ARE_YOU_SURE')
			             ->task('propertyicals.purge')
			             ->text('COM_KNOWRES_PROPERTYICALS_DELETE');
		}

		if ($this->canDo->get('core.edit', 'com_knowres'))
		{
			$ChildToolbar->popupButton('icalexport')
			             ->text('COM_KNOWRES_PROPERTYICALS_EXPORT')
			             ->selector('icalexportModal')
			             ->icon('icon-download')
			             ->listCheck(false);

			$ChildToolbar->confirmButton('kr-icals-import')
			             ->icon('icon-upload')
			             ->listCheck(true)
			             ->message('COM_KNOWRES_ARE_YOU_SURE')
			             ->task('propertyicals.import')
			             ->text('COM_KNOWRES_PROPERTYICALS_IMPORT');
		}

		return $Toolbar;
	}
}