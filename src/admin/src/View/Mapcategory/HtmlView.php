<?php
/**
 * @package     KR
 * @subpackage  Admin views
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Administrator\View\MapCategory;

use Exception;
use HighlandVision\Component\Knowres\Administrator\Model\MapcategoryModel;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Joomla\Extend\HtmlView as KrHtmlView;
use Joomla\CMS\Toolbar\ToolbarHelper;

use function defined;
use function strtolower;

// phpcs:disable PSR1.Files.SideEffects
defined('_JEXEC') or die;
// phpcs:enable PSR1.Files.SideEffects

/**
 * Edit a map category
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
        /** @var MapcategoryModel $model */
        $model = $this->getModel();
        $model->setUseExceptions(true);
        $this->form  = $model->getForm();
        $this->item  = $model->getItem();
        $this->state = $model->getState();

        $this->checkVersions();
        $this->checkErrors();

        ToolbarHelper::title(KrMethods::plain('COM_KNOWRES_MAPCATEGORY_TITLE'), 'fa-solid fa-layer-group knowres');
        $this->addFormToolbar(strtolower($this->getName()));
        $this->getFormAriaLabel();

        parent::display($tpl);
    }
}