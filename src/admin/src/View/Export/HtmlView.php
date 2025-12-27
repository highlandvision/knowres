<?php
/**
 * @package     KR
 * @subpackage  Admin views
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Administrator\View\Export;

use Exception;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Joomla\Extend\HtmlView as KrHtmlView;
use Joomla\CMS\Factory;
use Joomla\CMS\Toolbar\Toolbar;
use Joomla\CMS\Toolbar\ToolbarHelper;

// phpcs:disable PSR1.Files.SideEffects
defined('_JEXEC') or die;
// phpcs:enable PSR1.Files.SideEffects

/**
 * Export options
 *
 * @since 1.0.0
 */
class HtmlView extends KrHtmlView
{
    /**
     * Display the view
     *
     * @param   null  $tpl  The default template name
     *
     * @return void
     * @throws Exception
     * @since  1.0.0
     */
    public function display($tpl = null): void
    {
        $this->state = $this->get('state');

        $layout = $this->getLayout();
        if ($layout == 'balances') {
            $this->form = KrFactory::getAdhocForm('balances', 'export_balances.xml');
            $title      = KrMethods::plain('COM_KNOWRES_EXPORT_TITLE_BALANCES');
        } elseif ($layout == 'contracts') {
            $this->form = KrFactory::getAdhocForm('contracts', 'export_contracts.xml');
            $title      = KrMethods::plain('COM_KNOWRES_EXPORT_TITLE_CONTRACTS');
        } elseif ($layout == 'ownerpayments') {
            $this->form = KrFactory::getAdhocForm('ownerpayments', 'export_ownerpayments.xml');
            $title      = KrMethods::plain('COM_KNOWRES_EXPORT_TITLE_OWNERPAYMENTS');
        } elseif ($layout == 'payments') {
            $this->form = KrFactory::getAdhocForm('payments', 'export_payments.xml');
            $title      = KrMethods::plain('COM_KNOWRES_EXPORT_TITLE_PAYMENTS');
        }

        $this->checkErrors();

        $this->form_name       = $this->form->getName();
        $this->form_aria_label = $title . ' ' . $this->form_name;
        ToolbarHelper::title($title, 'fa-solid fa-download knowres');
        $Toolbar = Toolbar::getInstance();
        $this->addCustomToolbar($Toolbar);
        Factory::getApplication()->input->set('hidemainmenu', true);

        parent::display($tpl);
    }

    /**
     * Add the toolbar.
     *
     * @param   Toolbar  $Toolbar  Current toolbar
     *
     * @return Toolbar
     * @since  4.0.0
     */
    protected function addCustomToolbar(Toolbar $Toolbar): Toolbar
    {
        $layout = $this->getLayout();
        if ($layout == 'balances') {
            ToolbarHelper::custom('export.dobalances', 'download.png', 'download_f2.png', 'COM_KNOWRES_DOWNLOAD', false,
            );
        } elseif ($layout == 'contracts') {
            ToolbarHelper::custom('export.docontracts', 'download.png', 'download_f2.png', 'COM_KNOWRES_DOWNLOAD',
                false,
            );
        } elseif ($layout == 'ownerpayments') {
            ToolbarHelper::custom('export.doownerpayments', 'download.png', 'download_f2.png', 'COM_KNOWRES_DOWNLOAD',
                false,
            );
        } elseif ($layout == 'payments') {
            ToolbarHelper::custom('export.dopayments', 'download.png', 'download_f2.png', 'COM_KNOWRES_DOWNLOAD', false,
            );
        }

        ToolbarHelper::cancel('export.cancel', 'JTOOLBAR_CLOSE');

        return $Toolbar;
    }
}