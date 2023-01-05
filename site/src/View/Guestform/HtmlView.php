<?php
/**
 * @package    Know Reservations
 * @subpackage Site View
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Site\View\GuestForm;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\Component\Knowres\Site\Model\GuestModel;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Joomla\Extend\HtmlView as KrHtmlView;
use HighlandVision\KR\Session as KrSession;
use HighlandVision\KR\SiteHelper;
use HighlandVision\KR\Translations;
use Joomla\CMS\Factory;

/**
 * Edit guest data
 *
 * @since 2.5.0
 */
class HtmlView extends KrHtmlView\Site
{
	/** @var int ID of contract */
	public int $contract_id = 0;
	/** @var string GDPR text */
	public string $gdpr = '';
	/** @var bool Show referral input */
	public bool $show_referral = true;

	/**
	 * Display the view
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

		try
		{
			list($guest_id, $contract_id) = SiteHelper::validateDashboardSession();
			if (!$contract_id)
			{
				SiteHelper::badUser();
			}
		}
		catch (Exception)
		{
			SiteHelper::badUser();
		}

		$contract = KrFactory::getAdminModel('contract')->getItem($contract_id);
		if (!$contract->id || $contract->guest_id != $guest_id)
		{
			SiteHelper::badUser();
		}

		if ($contract->agency_id)
		{
			$Translations = new Translations();
			$this->gdpr   = $Translations->getText('agency', $contract->agency_id, 'gdpr_statement');
		}

		$this->settings = KrFactory::getListModel('propertysettings')->getPropertysettings($contract->property_id);

		/** @var GuestModel $model */
		$model      = KrFactory::getSiteModel('guest');
		$this->item = $model->getItem($guest_id);
		SiteHelper::checkLocks($this->item, $model);

		$this->form  = $model->getForm();
		$this->state = $model->getState();
		$this->state->set('guestform.id', $guest_id);
		$this->form->bind($this->item);
		$this->form_aria_label = KrMethods::plain('COM_KNOWRES_DASHBOARD_EDIT_GUEST');

		$this->params        = KrMethods::getParams();
		$referrals           = KrFactory::getListModel('referrals')->getItems();
		$this->show_referral = (bool) count($referrals);

		$userSession = new KrSession\User();
		$userData    = $userSession->getData();
		if (!$userData->db_guest_update)
		{
			$this->contract_id = $contract->id;

			$paymentSession = new KrSession\Payment();
			$paymentData    = $paymentSession->resetData();
			if ($this->contract_id)
			{
				$paymentData->contract_id      = $this->contract_id;
				$paymentData->property_id      = $contract->property_id;
				$paymentData->guest_id         = $guest_id;
				$paymentData->agency_id        = $contract->agency_id;
				$paymentData->booking_currency = $contract->currency;
			}

			$paymentSession->setData($paymentData);
		}
		else
		{
			$this->contract_id = 0;
		}

		$this->meta_title       = KrMethods::plain('COM_KNOWRES_TITLE_DASHBOARD_GUEST');
		$this->meta_description = KrMethods::plain('COM_KNOWRES_TITLE_DASHBOARD_GUEST');
		$this->prepareDocument();

		parent::display($tpl);
	}

	/**
	 * Prepares the document
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	protected function prepareDocument()
	{
		$this->prepareDefaultDocument($this->meta_title, $this->meta_description);
		$this->setMyPathway();
	}

	/**
	 * Set the pathway for the guest update
	 *
	 * @throws Exception
	 * @since   3.3.0
	 */
	protected function setMyPathway()
	{
		$pathway = Factory::getApplication()->getPathway();
		$pathway->setPathway([]);

		$pathway = HtmlView::dashboardPathway($pathway);
		$pathway->addItem(KrMethods::plain('COM_KNOWRES_TITLE_DASHBOARD_GUEST'));
	}
}