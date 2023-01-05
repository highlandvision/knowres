<?php
/**
 * @package     KR
 * @subpackage  Admin views
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Administrator\View\Media;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\Component\Knowres\Administrator\Model\PropertyModel;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Joomla\Extend\HtmlView as KrHtmlView;
use Joomla\CMS\Factory;
use Joomla\CMS\Toolbar\Toolbar;
use Joomla\CMS\Toolbar\ToolbarHelper;

/**
 * Edit the media data for a property
 *
 * @since 1.0.0
 */
class HtmlView extends KrHtmlView\Property
{
	/**
	 * Display the view
	 *
	 * @param  ?string  $tpl  A template file to load. [optional]
	 *
	 * @throws Exception
	 * @since  1.0.0
	 * @return void
	 */
	public function display($tpl = null): void
	{
		$this->getUserSessionData();

		/** @var PropertyModel $model */
		$model      = KrFactory::getAdminModel('property');
		$this->form = $model->getForm();
		$this->item = $model->getItem($this->property_id);
		$this->form->bind($this->item);
		$this->state = $model->getState();

		Factory::getApplication()->input->set('hidemainmenu', true);
		$title = KrMethods::plain('COM_KNOWRES_TITLE_PROPERTY_MEDIA') . ' - ' . $this->item->property_name;
		ToolbarHelper::title($title, 'fas fa-image knowres');
		$Toolbar = Toolbar::getInstance();
		$this->addToolbar($Toolbar, 'media');

		parent::display($tpl);
	}
}