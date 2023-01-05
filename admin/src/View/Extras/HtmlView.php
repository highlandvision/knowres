<?php
/**
 * @package     KR
 * @subpackage  Admin views
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Administrator\View\Extras;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\Component\Knowres\Administrator\Model\ExtrasModel;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Joomla\Extend\HtmlView as KrHtmlView;
use Joomla\CMS\Toolbar\ToolbarHelper;

use function defined;
use function in_array;

/**
 * List Extras view
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

		/** @var ExtrasModel $model * */
		$model       = $this->getModel();
		$this->state = $model->getState();
		$this->state->set('filter.property_id', $this->property_id);
		$this->items         = $model->getItems();
		$this->pagination    = $model->getPagination();
		$this->filterForm    = $model->getFilterForm();
		$this->activeFilters = $model->getActiveFilters();
		$this->ordering      = in_array('ordering', $model->getFilterFields());
		$this->form_name     = 'extra';

		if (!$this->checkEmpty())
		{
			$this->checkErrors();
			$title = KrMethods::plain('COM_KNOWRES_EXTRAS_TITLE') . ' - ' . $this->property_name;
			ToolbarHelper::title($title);
			$this->addListToolbar($this->get('name'));

			parent::display($tpl);
		}
	}
}