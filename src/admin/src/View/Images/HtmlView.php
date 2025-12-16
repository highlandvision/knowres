<?php
/**
 * @package     KR
 * @subpackage  Admin views
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Administrator\View\Images;

use Exception;
use HighlandVision\Component\Knowres\Administrator\Model\ImagesModel;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Joomla\Extend\HtmlView as KrHtmlView;
use Joomla\CMS\Toolbar\Toolbar;
use Joomla\CMS\Toolbar\ToolbarHelper;

use function count;
use function in_array;

// phpcs:disable PSR1.Files.SideEffects
defined('_JEXEC') or die;
// phpcs:enable PSR1.Files.SideEffects

/**
 * List slidshow images
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
     * @return void
     * @throws Exception
     * @since  1.0.0
     */
    public function display($tpl = null): void
    {
        /** @var ImagesModel $model * */
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
        $this->form_name     = 'image';

        $this->checkErrors();
        $title = KrMethods::plain('COM_KNOWRES_IMAGES_TITLE') . ' - ' . $this->property_name;
        ToolbarHelper::title($title, 'tasks knowres');
        $this->addListToolbar($model->getName());
        if ($model->getIsEmptyState()) {
            $this->setLayout('emptystate');
        }

        parent::display($tpl);
    }

    /**
     * Add actions toolbar for list
     *
     * @param   Toolbar  $Toolbar  Toolbar instance
     * @param   string   $name     List name
     *
     * @return Toolbar
     * @since  4.0.0
     */
    protected function addChildActionsToolbar(Toolbar $Toolbar, string $name): Toolbar
    {
        $dropdown = $Toolbar->dropdownButton('status-group')
            ->text('JTOOLBAR_CHANGE_STATUS')
            ->toggleSplit(false)
            ->icon('icon-ellipsis-h')
            ->buttonClass('btn btn-action')
            ->listCheck(true);

        $ChildToolbar = $dropdown->getChildToolbar();

        if ($this->canDo->get('core.edit.state')) {
            if (isset($this->items[0]->state)) {
                $ChildToolbar->publish($name . '.publish')
                    ->listCheck(true);
                $ChildToolbar->unpublish($name . '.unpublish')
                    ->listCheck(true);
            }
        }

        if ($this->canDo->get('core.delete')) {
            $ChildToolbar->delete($name . '.delete')
                ->message('JGLOBAL_CONFIRM_DELETE')
                ->listCheck(true);
        }

        return $Toolbar;
    }

    /**
     * Add custom view toolbar items
     *
     * @param   Toolbar  $Toolbar  Toolbar instance
     *
     * @since 4.0.0
     */
    protected function addCustomToolbar(Toolbar $Toolbar): Toolbar
    {
        if (count($this->items) > 1) {
            if ($this->canDo->get('core.create', 'com_knowres') && $this->canDo->get('core.edit', 'com_knowres')) {
                $Toolbar->popupButton('order')
                    ->text('COM_KNOWRES_ORDER')
                    ->selector('orderModal')
                    ->icon('icon-tree-2')
                    ->listCheck(false);
            }
        }

        return $Toolbar;
    }
}