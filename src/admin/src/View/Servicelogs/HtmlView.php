<?php
/**
 * @package     KR
 * @subpackage  Admin views
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Administrator\View\Servicelogs;

use Exception;
use HighlandVision\Component\Knowres\Administrator\Model\ServicelogsModel;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Joomla\Extend\HtmlView as KrHtmlView;
use Joomla\CMS\Toolbar\Toolbar;
use Joomla\CMS\Toolbar\ToolbarHelper;

use function in_array;

// phpcs:disable PSR1.Files.SideEffects
defined('_JEXEC') or die;
// phpcs:enable PSR1.Files.SideEffects

/**
 * List service logs
 *
 * @since 1.0.0
 */
class HtmlView extends KrHtmlView
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
        /** @var ServicelogsModel $model * */
        $model = $this->getModel();
        $model->setUseExceptions(true);

        $this->state         = $model->getState();
        $this->items         = $model->getItems();
        $this->pagination    = $model->getPagination();
        $this->filterForm    = $model->getFilterForm();
        $this->activeFilters = $model->getActiveFilters();
        $this->ordering      = in_array('ordering', $model->getFilterFields());
        $this->show_state    = in_array('state', $model->getFilterFields());
        $this->form_name     = 'servicelog';
        $this->allow_new     = false;
        $this->allow_edit    = false;

        $this->checkErrors();
        ToolbarHelper::title(KrMethods::plain('COM_KNOWRES_SERVICELOGS_TITLE'), 'tasks knowres');
        $this->addListToolbar($model->getName());
        if ($model->getIsEmptyState()) {
            $this->setLayout('emptystate');
        }

        parent::display($tpl);
    }

    /**
     * Add the default toolbar for list view.
     *
     * @param  ?string  $list_name  Name of list model
     * @param   bool    $new        Fasle to suppress New button
     *
     * @return Toolbar
     * @throws Exception
     * @since  4.0.0
     */
    protected function addListToolbar(?string $list_name = null, bool $new = true): Toolbar
    {
        $Toolbar = Toolbar::getInstance();
        $this->getActions();

        if ($this->canDo->get('core.edit')) {
            $Toolbar->standardButton('resend')
                ->task('servicelogs.resend')
                ->text('COM_KNOWRES_RESEND')
                ->icon('fa-solid fa-redo knowres')
                ->listCheck(true);
        }

        if ($this->canDo->get('core.delete')) {
            $Toolbar->delete('servicelogs.delete')
                ->text('JTOOLBAR_DELETE')
                ->message('JGLOBAL_CONFIRM_DELETE')
                ->listCheck(true);
        }

        $Toolbar = $this->addServicesDropdown($Toolbar);
        $Toolbar = $this->addConfigToolbar($Toolbar);
        $Toolbar = $this->addQuickLinksToolbar($Toolbar);

        if ($this->canDo->get('core.admin')) {
            $Toolbar->preferences('com_knowres');
        }

        return $Toolbar;
    }
}