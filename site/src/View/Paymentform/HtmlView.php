<?php /** @noinspection PhpPossiblePolymorphicInvocationInspection */

/**
 * @package    Know Reservations
 * @subpackage Site View
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Site\View\PaymentForm;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Joomla\Extend\HtmlView as KrHtmlView;
use HighlandVision\KR\Logger;
use HighlandVision\KR\Payments\PrePayment;
use HighlandVision\KR\Session as KrSession;
use HighlandVision\KR\SiteHelper;
use HighlandVision\KR\TickTock;
use HighlandVision\KR\Translations;
use HighlandVision\KR\Utility;
use Joomla\CMS\Factory;
use RuntimeException;

/**
 * Dashboard guest payment form
 *
 * @since 2.5.0
 */
class HtmlView extends KrHtmlView\Site
{
	/** @var float Payment value */
	protected float $payment_total = 0;
	/** @var float Confirmed payment value */
	protected float $payment_confirmed = 0;
	/** @var Translations Tranlsations object */
	protected Translations $Translations;

	/**
	 * Display the form
	 *
	 * @param   null  $tpl  Default template.
	 *
	 * @throws Exception
	 * @since  2.5.0
	 * @return void
	 */
	public function display($tpl = null): void
	{
		SiteHelper::checkUser();

		$this->today = TickTock::getDate();
		$userSession = new KrSession\User();
		$userData    = $userSession->getData();
		$guest_id    = $userData->db_guest_id;
		$contract_id = $userData->db_contract_id;

		if (!$guest_id || !$contract_id)
		{
			SiteHelper::redirectDashboard();
		}

		try
		{
			$this->params        = KrMethods::getParams();
			$this->Translations  = new Translations();
			$this->state         = $this->get('state');
			$this->contract      = KrFactory::getAdminModel('contract')->getItem($contract_id);
			$this->property      = KrFactory::getAdminModel('property')->getItem($this->contract->property_id);
			$this->contract_fees = KrFactory::getListModel('contractfees')->getForContract($contract_id);
			$this->fee_total     = KrFactory::getListModel('contractfees')->getTotalForContract($contract_id);
			$this->payments      = KrFactory::getListModel('contractpayments')->getForContract($contract_id);
			$totals              = KrFactory::getListModel('contractpayments')->getTotals($contract_id);
			if (isset($totals->total))
			{
				$this->payment_total     = (float) $totals->total;
				$this->payment_confirmed = (float) $totals->confirmed;
			}
			$this->balance = Utility::roundValue($this->contract->contract_total + $this->fee_total -
				$this->payment_confirmed, $this->contract->currency);

			$prePayment        = new PrePayment();
			$this->paymentData = $prePayment->constructExisting($this->contract, $this->balance);
			$this->gateways    = $this->paymentData->gateways;
		}
		catch (RuntimeException $e)
		{
			Logger::logMe($e->getMessage());
			KrMethods::message($e->getMessage(), 'warning');
			SiteHelper::redirectDashboard();
		}
		catch (Exception $e)
		{
			Logger::logMe($e->getMessage());
			KrMethods::message(KrMethods::plain('COM_KNOWRES_ERROR_FATAL'), 'error');
			SiteHelper::redirectDashboard();
		}

		$this->meta_title       = KrMethods::plain('COM_KNOWRES_PAY_NOW');
		$this->meta_description = KrMethods::plain('COM_KNOWRES_PAY_NOW');
		$this->prepareDocument();

		parent::display($tpl);
	}

	/**
	 * Prepare the document
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	protected function prepareDocument(): void
	{
		$this->prepareDefaultDocument($this->meta_title, $this->meta_description);
		$this->setMyPathway();
	}

	/**
	 * Set the pathway for the dashboard payment
	 *
	 * @throws Exception
	 * @since  3.3.0
	 */
	protected function setMyPathway(): void
	{
		$pathway = Factory::getApplication()->getPathway();
		$pathway->setPathway([]);

		$pathway = HtmlView::dashboardPathway($pathway);
		$pathway->addItem(KrMethods::plain('COM_KNOWRES_PAY_NOW'));
	}
}