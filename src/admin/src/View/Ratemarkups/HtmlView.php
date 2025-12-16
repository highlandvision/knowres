<?php
/**
 * @package     KR
 * @subpackage  Admin views
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Administrator\View\Ratemarkups;

use Exception;
use HighlandVision\Component\Knowres\Administrator\Model\RatemarkupsModel;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Joomla\Extend\HtmlView as KrHtmlView;
use Joomla\CMS\Toolbar\ToolbarHelper;

use function in_array;

// phpcs:disable PSR1.Files.SideEffects
defined('_JEXEC') or die;
// phpcs:enable PSR1.Files.SideEffects

/**
 * List rate markups
 *
 * @since 1.0.0
 */
class HtmlView extends KrHtmlView\Property
{
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
        /** @var RatemarkupsModel $model * */
        $model = $this->getModel();
        $model->setUseExceptions(true);
        $this->getUserSessionData();

        $this->state = $model->getState();
        $this->state->set('filter.property_id', $this->property_id);
        $this->items         = $model->getItems();
        $this->pagination    = $model->getPagination();
        $this->filterForm    = $model->getFilterForm();
        $this->activeFilters = $model->getActiveFilters();
        $this->ordering      = in_array('ordering', $model->getFilterFields());
        $this->form_name     = 'ratemarkup';

        $this->checkErrors();
        $title = KrMethods::plain('COM_KNOWRES_RATEMARKUPS_TITLE') . ' - ' . $this->property_name;
        ToolbarHelper::title($title, 'tasks knowres');
        $this->addListToolbar($model->getName());
        if ($model->getIsEmptyState()) {
            $this->setLayout('emptystate');
        }

        parent::display($tpl);
    }
}