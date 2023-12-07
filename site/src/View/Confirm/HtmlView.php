<?php
/**
 * @package    Know Reservations
 * @subpackage Admin View
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Site\View\Confirm;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\Component\Knowres\Administrator\Model\ContractModel;
use HighlandVision\Component\Knowres\Site\Model\GuestModel;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Joomla\Extend\HtmlView as KrHtmlView;
use HighlandVision\KR\Media\Images;
use HighlandVision\KR\Session as KrSession;
use HighlandVision\KR\SiteHelper;
use HighlandVision\KR\Translations;
use JetBrains\PhpStorm\NoReturn;
use Joomla\CMS\Factory;
use Joomla\CMS\Form\Form;
use stdClass;

/**
 * Reservation confirm
 *
 * @since   1.0.0
 */
class HtmlView extends KrHtmlView\Site
{
	/** @var Form Guest Form */
	public Form $guestForm;
	/** @var stdClass Contract session data */
	public stdClass $contractData;
	/** @var KrSession\Contract Contract session */
	public KrSession\Contract $contractSession;
	/** @var string Path to property image */
	public string $pimage;
	/** @var object|bool Property item */
	public object|bool $property;
	/** @var array Property settings */
	public array $settings;
	/** @var Translations Translations object */
	public Translations $Translations;

	/**
	 * Display the form
	 *
	 * @param  null  $tpl  Default template.
	 *
	 * @throws Exception
	 * @since  1.0.0
	 * @return void
	 */
	#[NoReturn] public function display($tpl = null): void
	{
		$this->contractSession = new KrSession\Contract();
		$this->contractData    = $this->contractSession->getData();
		$guestSession          = new KrSession\Guest();
		$guestData             = $guestSession->getData();
		$this->checkSession();

		/** @var ContractModel $model */
		$model      = KrFactory::getAdminModel('contract');
		$this->form = KrFactory::getAdhocForm('confirm', 'confirm.xml', 'site');

		$this->item         = $model->getItem();
		$this->state        = $model->getState();
		$this->params       = KrMethods::getParams();
		$this->Translations = new Translations();

		if (is_null(KrMethods::getUserState('com_knowres.edit.confirm.data')))
		{
			KrMethods::setUserState('com_knowres.edit.confirm.data', $this->contractData);
		}
		if (is_null(KrMethods::getUserState('com_knowres.edit.guest.data')))
		{
			KrMethods::setUserState('com_knowres.edit.guest.data', $guestData);
		}

		/** @var GuestModel $guestModel */
		$guestModel      = KrFactory::getSiteModel('guest');
		$this->guestForm = $guestModel->getForm([], false, 'guest', $this->contractData->property_id);
		$this->guestForm->bind($guestData);
		$this->property         = KrFactory::getAdminModel('property')->getItem($this->contractData->property_id);
		$this->settings         = KrFactory::getListModel('propertysettings')
		                                   ->getPropertysettings($this->contractData->property_id);
		$this->pimage           = Images::getImagePath($this->property->id, 'solo',
			Images::getPropertyImageName($this->property->id));
		$this->meta_title       = KrMethods::plain('COM_KNOWRES_CONFIRM_TITLE');
		$this->meta_description = KrMethods::plain('COM_KNOWRES_PAGE_TITLE');
		$this->prepareDocument();

		parent::display($tpl);
	}

	/**
	 * Check the session data is valid
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	protected function checkSession(): void
	{
		if (!$this->contractData->contract_total)
		{
			$this->contractSession->resetData();
			SiteHelper::expiredSession();
		}

		if (!KrFactory::getListModel('contracts')
		              ->isPropertyAvailable($this->contractData->property_id, $this->contractData->arrival,
			              $this->contractData->departure))
		{
			$this->contractSession->resetData();
			SiteHelper::expiredSession($jform['property_id']);
		}

		if (!$this->contractData->property_id
			|| !$this->contractData->arrival
			|| !$this->contractData->departure
			|| !$this->contractData->guests
			|| !(float) $this->contractData->room_total)
		{
			$this->contractSession->resetData();
			SiteHelper::expiredSession($this->contractData->property_id);
		}
	}

	/**
	 * Prepares the document
	 *
	 * @throws Exception
	 * @since   1.0.0
	 */
	protected function prepareDocument(): void
	{
		$this->prepareDefaultDocument($this->meta_title, $this->meta_description);
		$this->setPathway();
	}

	/**
	 * Set the pathway for the confirmation
	 *
	 * @throws Exception
	 * @since  3.3.0
	 */
	protected function setPathway(): void
	{
		$searchSession      = new KrSession\Search();
		$searchData   = $searchSession->getData();

		$pathway = self::setPathwayBase();
		$pathway = self::propertiesPathway($pathway, $searchData);
		$pathway = self::propertyPathway($pathway, $searchData, $this->property);

		$pathway->addItem(KrMethods::plain('COM_KNOWRES_CONFIRM_TITLE'));
	}
}