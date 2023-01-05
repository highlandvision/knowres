<?php
/**
 * @package     KR
 * @subpackage  Admin views
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Administrator\View\Guest;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\Component\Knowres\Administrator\Model\GuestModel;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Joomla\Extend\HtmlView as KrHtmlView;
use Joomla\CMS\Toolbar\ToolbarHelper;

use function defined;
use function strtolower;

/**
 * Edit guest view
 *
 * @since 1.0.0
 */
class HtmlView extends KrHtmlView
{
	/**
	 * Display the view
	 *
	 * @param   null  $tpl
	 *
	 * @throws Exception
	 * @since  1.0.0
	 * @return void
	 */
	public function display($tpl = null): void
	{
		/** @var GuestModel $model */
		$model       = $this->getModel();
		$this->form  = $model->getForm([], true, false);
		$this->item  = $model->getItem();
		$this->state = $model->getState();

		$this->checkVersions();
		$this->checkErrors();

		$this->form_name = KrMethods::plain('COM_KNOWRES_GUEST');
		$this->getFormAriaLabel();
		ToolbarHelper::title($this->form_name, 'fas fa-user knowres');
		$this->addFormToolbar(strtolower($this->get('name')));

		parent::display($tpl);
	}
}