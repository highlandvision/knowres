<?php
/**
 * @package     KR
 * @subpackage  Admin views
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Administrator\View\Ownerpayment;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\Component\Knowres\Administrator\Model\OwnerpaymentModel;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Joomla\Extend\HtmlView as KrHtmlView;
use JetBrains\PhpStorm\NoReturn;

/**
 * Owner payment form modal
 *
 * @since 3.3.1
 */
class ModalView extends KrHtmlView
{
	/**
	 * Display the view via ajax
	 *
	 * @param  ?string  $tpl  A template file to load. [optional]
	 *
	 * @throws Exception
	 * @since  3.3.4
	 * @return void
	 */
	#[NoReturn] public function display($tpl = null): void
	{
		$id = KrMethods::inputInt('id');
		if (empty($id))
		{
			jexit();
		}

		/** @var OwnerpaymentModel $model */
		$model      = KrFactory::getAdminModel('ownerpayment');
		$this->item = $model->getItem($id);
		if (empty($this->item->id))
		{
			jexit();
		}
		$this->form  = $model->getForm();
		$this->state = $model->getState();

		KrMethods::setUserState('com_knowres.edit.ownerpayment.data', $this->item);

		$this->setLayout('modal');
		echo $this->loadTemplate($tpl);

		jexit();
	}
}