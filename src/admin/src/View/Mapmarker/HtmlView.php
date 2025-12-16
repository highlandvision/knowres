<?php
/**
 * @package     KR
 * @subpackage  Admin views
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Administrator\View\Mapmarker;

use Exception;
use HighlandVision\Component\Knowres\Administrator\Model\MapmarkerModel;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Joomla\Extend\HtmlView as KrHtmlView;
use Joomla\CMS\Toolbar\ToolbarHelper;

use function defined;
use function is_null;
use function strtolower;

// phpcs:disable PSR1.Files.SideEffects
defined('_JEXEC') or die;
// phpcs:enable PSR1.Files.SideEffects

/**
 * Edit a map marker
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
        /** @var MapmarkerModel $model */
        $model = $this->getModel();
        $model->setUseExceptions(true);
        $this->form  = $model->getForm();
        $this->item  = $model->getItem();
        $this->state = $model->getState();

        $this->params = KrMethods::getParams();
        $this->lat    = $this->item->lat;
        $this->lng    = $this->item->lng;
        $this->zoom   = $this->params->get('default_zoom', 10);
        if (is_null($this->lat)) {
            $this->lat = $this->params->get('default_lat');
            $this->lng = $this->params->get('default_lng');
        }

        $this->checkVersions();
        $this->checkErrors();

        $this->form_name = KrMethods::plain('COM_KNOWRES_MAPMARKER_TITLE');
        $this->getFormAriaLabel();
        ToolbarHelper::title($this->form_name, 'fa-solid fa-pin knowres');
        $this->addFormToolbar(strtolower($this->getName()));

        parent::display($tpl);
    }
}