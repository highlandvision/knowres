<?php
/**
 * @package     KR
 * @subpackage  Admin views
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Administrator\View\Translations;

use Exception;
use HighlandVision\Component\Knowres\Administrator\Model\TranslationsModel;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Joomla\Extend\HtmlView as KrHtmlView;
use HighlandVision\KR\Translations;
use Joomla\CMS\Toolbar\ToolbarHelper;

use function in_array;

// phpcs:disable PSR1.Files.SideEffects
defined('_JEXEC') or die;
// phpcs:enable PSR1.Files.SideEffects

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
     * @param   string  $tpl  A template file to load. [optional]
     *
     * @return  void
     * @throws  Exception
     * @since   1.0.0
     */
    public function display($tpl = null): void
    {
        /** @var TranslationsModel $model * */
        $model = $this->getModel();
        $model->setUseExceptions(true);

        $this->state         = $model->getState();
        $this->items         = $model->getItems();
        $this->pagination    = $model->getPagination();
        $this->filterForm    = $model->getFilterForm();
        $this->activeFilters = $model->getActiveFilters();
        $this->ordering      = in_array('ordering', $model->getFilterFields());
        $this->form_name     = 'translation';

        $this->checkErrors();
        ToolbarHelper::title(KrMethods::plain('COM_KNOWRES_TRANSLATIONS_TITLE'), 'tasks knowres');
        $this->addListToolbar($model->getName());
        if ($model->getIsEmptyState()) {
            $this->setLayout('emptystate');
        }

        $this->state->set('list.ordercustom', 'item asc, item_id asc, field asc, language asc');
        $this->orphans      = $this->state->get('filter.orphans');
        $this->Translations = new Translations();

        parent::display($tpl);
    }
}