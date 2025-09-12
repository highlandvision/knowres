<?php
/**
 * @package    Know Reservations
 * @subpackage Site Controller
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Site\Controller;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Session as KrSession;
use Joomla\CMS\MVC\Controller\BaseController;

/**
 * Reservation success controller
 *
 * @since 1.0.0
 */
class SuccessController extends BaseController
{
	/**
	 * Display confirmation page for online reservations
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	public function success(): void
	{
		$userSession  = new KrSession\User();
		$userData     = $userSession->getData();
		$contract_id  = !empty($userData->pr_contract_id) ? $userData->pr_contract_id : 0;
		$payment_type = !empty($userData->pr_payment_type) ? $userData->pr_payment_type : '';

		if (empty($contract_id)) {
			KrMethods::message(KrMethods::plain('COM_KNOWRES_ERROR_FATAL_CONFIRM'));
			KrMethods::redirect(KrMethods::route(KrMethods::getRoot()));
		}

		$contract = KrFactory::getAdminModel('contract')->getItem($contract_id);

		KrMethods::cleanCache('com_knowres_contracts');
		$contractSession = new KrSession\Contract();
		$contractSession->resetData();

		/* @var HighlandVision\Component\Knowres\Site\View\Success\HtmlView $view * */
		$view                = $this->getView('success', 'html');
		$view->contract_id   = $contract->id;
		$view->contract_tag  = $contract->tag;
		$view->on_request    = $payment_type == 'OBR';
		$view->property_name = $contract->property_name;
		$view->display();
	}
}