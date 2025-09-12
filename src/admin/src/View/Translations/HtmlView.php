<?php
/**
 * @package     KR
 * @subpackage  Admin views
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Administrator\View\Translations;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\Component\Knowres\Administrator\Model\TranslationsModel;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Joomla\Extend\HtmlView as KrHtmlView;
use HighlandVision\KR\Translations;
use Joomla\CMS\Toolbar\ToolbarHelper;

use function defined;
use function in_array;

/**
 * List translations
 *
 * @since   1.0.0
 */
class HtmlView extends KrHtmlView
{
	/** @var Translations Translations object */
	public Translations $Translations;
	/** @var string The form field type */
	public string $orphans = 'FilterItem';

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
		/** @var TranslationsModel $model * */
		$model               = $this->getModel();
		$this->state         = $model->getState();
		$this->items         = $model->getItems();
		$this->pagination    = $model->getPagination();
		$this->filterForm    = $model->getFilterForm();
		$this->activeFilters = $model->getActiveFilters();
		$this->ordering      = in_array('ordering', $model->getFilterFields());
		$this->state->set('list.ordercustom', 'item asc, item_id asc, field asc, language asc');
		$this->form_name    = 'translation';
		$this->orphans      = $this->state->get('filter.orphans');
		$this->Translations = new Translations();

		if (!$this->checkEmpty()) {
			$this->checkErrors();
			ToolbarHelper::title(KrMethods::plain('COM_KNOWRES_TRANSLATIONS_TITLE'), 'tasks knowres');
			$this->addListToolbar($this->get('name'));

			parent::display($tpl);
		}
	}
}