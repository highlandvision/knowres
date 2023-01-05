<?php
/**
 * @package         KR
 * @subpackage      Admin views
 * @copyright       2020 Highland Vision. All rights reserved.
 * @license         See the file "LICENSE.txt" for the full license governing this code.
 * @author          Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Administrator\View\Region;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\Component\Knowres\Administrator\Model\RegionModel;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Joomla\Extend\HtmlView as KrHtmlView;
use HighlandVision\KR\Media;
use Joomla\CMS\Toolbar\ToolbarHelper;

use function defined;
use function strtolower;

/**
 * View to edit a region.
 *
 * @since 1.0.0
 */
class HtmlView extends KrHtmlView
{
	/**
	 * Display the view
	 *
	 * @param   string  $tpl  The name of the template file to parse; automatically searches through the template paths.
	 *
	 * @throws Exception
	 * @since  1.0.0
	 * @return void
	 */
	public function display($tpl = null): void
	{
		/** @var RegionModel $model */
		$model       = $this->getModel();
		$this->form  = $model->getForm();
		$this->item  = $model->getItem();
		$this->state = $model->getState();
		$this->lines = Media\Pdf::listPdfs('regions', $this->item->id);

		$this->checkVersions();
		$this->checkErrors();

		$this->form_name = KrMethods::plain('COM_KNOWRES_REGION_TITLE');
		$this->getFormAriaLabel();
		ToolbarHelper::title($this->form_name, 'flag knowres');
		$this->addFormToolbar(strtolower($this->getName()));

		parent::display($tpl);
	}
}