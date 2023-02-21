<?php
/**
 * @package    Know Reservations
 * @subpackage Site Controllers
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Site\Controller;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Logger;
use HighlandVision\KR\Service\Gateway;
use HighlandVision\KR\Session as KrSession;
use Joomla\CMS\MVC\Controller\FormController;
use Joomla\CMS\Response\JsonResponse;
use RuntimeException;

use function jexit;

/**
 * Payment form controller class
 *
 * @since 2.5.0
 */
class PaymentController extends FormController
{
	/**
	 * Route payment request to gateway
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	public function router()
	{
		$this->checkToken();

		try
		{
			$paymentSession = new KrSession\Payment();
			$paymentData    = $paymentSession->getData();
			if (!$paymentData->contract_id)
			{
				$paymentSession->resetData();
				throw new RuntimeException('Session was not active');
			}

			// Bit convoluted .......
			// Plugincc = plugin + currency
			// Service = service + plugincc
			$plugincc     = KrMethods::inputString('plugincc', '');
			$gateway_name = substr($plugincc, 0, -3);
			$service      = 'service' . $plugincc;
			$service_id   = KrMethods::inputInt($service);
			$contract_id  = KrMethods::inputInt('contract_id');

			if ($contract_id !== (int) $paymentData->contract_id)
			{
				$paymentSession->resetData();
				throw new RuntimeException("Contract ID = $contract_id and Payment Contract ID = $paymentData->contract_id do not match");
			}

			$class       = Gateway::setGatewayClass($gateway_name);
			$Gateway     = new $class($service_id, $paymentData);
			$paymentData = $Gateway->setOutputData();
			$paymentSession->setData($paymentData);

			/* @var HighlandVision\Component\Knowres\Site\View\Gateway\HtmlView $view **/
			$view               = $this->getView('gateway', 'html', 'site');
			$view->gateway_name = $gateway_name;
			$view->payment_type = $paymentData->payment_type;
			$view->service_id   = $service_id;
			$view->paymentData  = $paymentData;
			$view->display();
		}
		catch (Exception $e)
		{
			Logger::logMe($e->getMessage(), 'error');
			echo new JsonResponse(null, KrMethods::plain('COM_KNOWRES_ERROR_FATAL'), true);
			jexit();
		}
	}
}