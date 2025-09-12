<?php
/**
 * @package    Know Reservations
 * @subpackage Site View
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Site\View\Gateway;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Joomla\Extend\HtmlView as KrHtmlView;
use Joomla\CMS\Response\JsonResponse;

/**
 * Make a payment
 *
 * @since 1.0.0
 */
class HtmlView extends KrHtmlView\Site
{
	/** @var string Selected gateway name */
	public string $gateway_name = '';
	/** @var string Payment code type e.g. deposit, balance etc */
	public string $payment_type = '';
	/** @var int ID of service */
	public int $service_id = 0;

	/**
	 * Display the payment form.
	 *
	 * @param  null  $tpl  Default template.
	 *
	 * @throws Exception
	 * @since  1.0.0
	 * @return void
	 */
	public function display($tpl = null): void
	{
		try {
			if (!$this->gateway_name || !$this->service_id || !$this->payment_type) {
				throw new Exception('One or more of Gateway, Service ID or Payment Type are empty');
			}

			$wrapper         = [];
			$wrapper['html'] = $this->loadTemplate($tpl);

			echo new JsonResponse($wrapper);
		} catch (Exception) {
			echo new JsonResponse(null, KrMethods::plain('COM_KNOWRES_TRY_LATER'), true);
		}

		jexit();
	}
}