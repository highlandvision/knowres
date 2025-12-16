<?php
/**
 * @package     KR
 * @subpackage  Admin views
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Administrator\View\Owner;

use Exception;
use HighlandVision\Component\Knowres\Administrator\Model\OwnerModel;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Joomla\Extend\HtmlView as KrHtmlView;
use Joomla\CMS\Toolbar\ToolbarHelper;

use function defined;
use function strtolower;

// phpcs:disable PSR1.Files.SideEffects
defined('_JEXEC') or die;
// phpcs:enable PSR1.Files.SideEffects

/**
 * Edit Owner view
 *
 * @since 1.0.0
 */
class HtmlView extends KrHtmlView
{
    /**
     * Display the view
     *
     * @param   string  $tpl  Template name
     *
     * @return void
     * @throws Exception
     * @since  1.0.0
     */
    public function display($tpl = null): void
    {
        /** @var OwnerModel $model */
        $model = $this->getModel();
        $model->setUseExceptions(true);
        $this->form  = $model->getForm();
        $this->item  = $model->getItem();
        $this->state = $model->getState();

        $this->checkVersions();
        $this->checkErrors();

        $this->form_name = KrMethods::plain('COM_KNOWRES_OWNER_TITLE');
        $this->getFormAriaLabel();
        ToolbarHelper::title($this->form_name, 'fa-solid fa-house-user knowres');
        $this->addFormToolbar(strtolower($this->getName()));

        parent::display($tpl);
    }
}