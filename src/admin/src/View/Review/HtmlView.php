<?php
/**
 * @package     KR
 * @subpackage  Admin views
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Administrator\View\Review;

use Exception;
use HighlandVision\Component\Knowres\Administrator\Model\ReviewModel;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Joomla\Extend\HtmlView as KrHtmlView;
use Joomla\CMS\Router\Route;
use Joomla\CMS\Toolbar\ToolbarHelper;

use function defined;
use function strtolower;

// phpcs:disable PSR1.Files.SideEffects
defined('_JEXEC') or die;
// phpcs:enable PSR1.Files.SideEffects

/**
 * Edit a review
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
        /** @var ReviewModel $model */
        $model = $this->getModel();
        $model->setUseExceptions(true);
        $this->form  = $model->getForm();
        $this->item  = $model->getItem();
        $this->state = $model->getState();

        if (isset($this->item->id)) {
            $this->property_id   = $this->item->property_id;
            $this->property_name = $this->item->property_name;
        }

        if (!$this->property_id) {
            KrMethods::redirect(Route::_('index.php?option=com_knowres&view=properties', false));
        }

        $this->checkVersions();
        $this->checkErrors();

        $this->form_name = KrMethods::plain('COM_KNOWRES_REVIEW_TITLE');
        $this->getFormAriaLabel();
        ToolbarHelper::title($this->form_name . ' - ' . $this->property_name, 'fa-solid fa-comment knowres');
        $this->addFormToolbar(strtolower($this->getName()));

        parent::display($tpl);
    }
}