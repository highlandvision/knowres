<?php
/**
 * @package     KR
 * @subpackage  Admin views
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Administrator\View\Emailtemplate;

use Exception;
use HighlandVision\Component\Knowres\Administrator\Model\EmailtemplateModel;
use HighlandVision\KR\Email\TemplateEmail;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Joomla\Extend\HtmlView as KrHtmlView;
use Joomla\CMS\Toolbar\ToolbarHelper;

use function defined;
use function strtolower;

// phpcs:disable PSR1.Files.SideEffects
defined('_JEXEC') or die;
// phpcs:enable PSR1.Files.SideEffects

/**
 * Edit Emailtemplate view
 *
 * @since 1.0.0
 */
class HtmlView extends KrHtmlView
{
    /**
     * Display the view
     *
     * @param   string  $tpl
     *
     * @return void
     * @throws Exception
     * @since  1.0.0
     */
    public function display($tpl = null): void
    {
        /** @var EmailtemplateModel $model */
        $model = $this->getModel();
        $model->setUseExceptions(true);
        $this->form  = $model->getForm();
        $this->item  = $model->getItem();
        $this->state = $model->getState();

        $this->checkVersions();
        $this->checkErrors();

        $this->params            = KrMethods::getParams();
        $this->reservation_tags  = TemplateEmail::getReservationTags();
        $this->request_tags      = TemplateEmail::getRequestTags();
        $this->registration_tags = [];
        if ($this->params['create_user']) {
            $this->registration_tags = TemplateEmail::getRegistrationTags();
        }

        $this->form_name = KrMethods::plain('COM_KNOWRES_EMAILTEMPLATE_TITLE');
        $this->getFormAriaLabel();
        ToolbarHelper::title($this->form_name, 'fa-solid fa-envelope knowres');
        $this->addFormToolbar(strtolower($this->getName()));

        parent::display($tpl);
    }
}