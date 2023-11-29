<?php
/**
 * @package     KR
 * @subpackage  Admin views
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Administrator\View\Contract;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\Component\Knowres\Administrator\Model\ContractModel;
use HighlandVision\Component\Knowres\Administrator\Model\CouponModel;
use HighlandVision\Component\Knowres\Administrator\Model\GuestModel;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Joomla\Extend\HtmlView as KrHtmlView;
use HighlandVision\KR\Session as KrSession;
use HighlandVision\KR\TickTock;
use HighlandVision\KR\Utility;
use Joomla\CMS\Component\ComponentHelper;
use Joomla\CMS\Factory;
use Joomla\CMS\Form\Form;
use Joomla\CMS\Toolbar\Toolbar;
use Joomla\CMS\Toolbar\ToolbarHelper;
use Joomla\Utilities\ArrayHelper;
use stdClass;

/**
 * Contract edit view
 *
 * @since 1.0.0
 */
class HtmlView extends KrHtmlView\Contract
{
	/** @var bool Agent reservation. */
	public bool $agent = false;
	/** @var string Arrival date. */
	public string $arrival = '';
	/** @var stdClass Contract session data */
	protected stdClass $contractData;
	/** @var string Coupon code. */
	public string $coupon_code = '';
	/** @var string Departure date. */
	public string $departure = '';
	/** @var int  #Decimal places for currency. */
	public int $dp = 2;
	/** @var ?string  Return view. */
	public ?string $gobackto = '';
	/** @var object Guest row. */
	public object $guest;
	/** @var ?Form Guest form. */
	public ?Form $guestForm = null;
	/** @var string Nights. */
	public string $nights = '';
	/** @var object Property row. */
	public object $property;
	/** @var array Property settings. */
	public array $settings = [];
	/** @var bool Show coupon input. */
	public bool $show_coupon = false;

	/**
	 * Display the view
	 *
	 * @param  string  $tpl  Template name
	 *
	 * @throws Exception
	 * @since  1.0.0
	 * @return void
	 */
	public function display($tpl = null): void
	{
		/** @var ContractModel $model */
		$model       = $this->getModel();
		$this->form  = $model->getForm();
		$this->item  = $model->getItem();
		$this->state = $model->getState();

		$this->task    = KrMethods::inputString('task', 'manager', 'get');
		$this->params  = KrMethods::getParams();
		$this->maxdate = TickTock::modifyDays($this->today, $this->params->get('advanceBookingsLimit', 365));
		$this->setLayoutValue();

		$userSession        = new KrSession\User();
		$userData           = $userSession->getData();
		$this->access_level = $userData->access_level;

		if ($this->item->id)
		{
			$this->isEdit();
		}
		else
		{
			$contractSession    = new KrSession\Contract();
			$this->contractData = $contractSession->resetData();

			if (empty($userData->cr_property_id))
			{
				Utility::goto('properties');
			}
			$this->property_id = $userData->cr_property_id;
			$this->arrival     = KrMethods::inputString('arrival', '');
			$this->departure   = KrMethods::inputString('departure', '');
			if (!$this->arrival)
			{
				$this->arrival   = KrMethods::inputString('arrival', '', 'get');
				$this->departure = KrMethods::inputString('departure', '', 'get');
			}
			KrMethods::setUserState('com_knowres.preedit.contract', null);
			KrMethods::setUserState('com_knowres.edit.guest.data', null);
		}

		$this->property     = KrFactory::getAdminModel('property')->getItem($this->property_id);
		$this->settings     = KrFactory::getListModel('propertysettings')->getPropertysettings($this->property_id);
		$this->dp           = KrFactory::getListModel('currencies')->getDp($this->settings['currency']);
		$this->arrival_bd   = TickTock::displayDate($this->arrival, 'j M Y');
		$this->departure_bd = TickTock::displayDate($this->departure, 'j M Y');

		$userData->cr_property_id   = $this->property_id;
		$userData->cr_property_name = $this->property->property_name;
		$userData->cr_country_id    = $this->property->country_id;
		$userData->cr_region_id     = $this->property->region_id;
		$userData->cr_town_id       = $this->property->town_id;

		$this->checkOwnerAccess();

		if ($this->getLayout() == 'manager')
		{
			if (!is_null(KrFactory::getListModel('coupons')->getValidCoupons($this->property_id)))
			{
				$this->show_coupon = true;
			}

			/** @var GuestModel $guestModel */
			$guestModel = KrFactory::getAdminModel('guest');
			if ($this->item->id)
			{
				$this->guest = $guestModel->getItem($this->item->guest_id);
				KrMethods::setUserState('com_knowres.edit.guest.data', ArrayHelper::fromObject($this->guest));

				if ($this->item->coupon_id)
				{
					/** @var CouponModel $couponModel */
					$couponModel       = KrFactory::getAdminModel('coupon')->getItem($this->item->coupon_id);
					$this->coupon_code = $couponModel->coupon_code;
				}
			}

			$this->guestForm = $guestModel->getForm([], true, 'guest', $this->property_id);
		}

		$userSession->setData($userData);

		$this->checkVersions();
		$this->checkErrors();

		$this->form_name = KrMethods::plain('COM_KNOWRES_CONTRACT_TITLE');
		$this->getFormAriaLabel();
		$this->setPageTitle();
		$this->addFormToolbar(strtolower($this->getName()));

		parent::display($tpl);
	}

	/**
	 * Add the page title and default toolbar for form view.
	 *
	 * @param  string  $name  Name of the form
	 *
	 * @throws Exception
	 * @since  4.0.0
	 * @return Toolbar
	 */
	protected function addFormToolbar(string $name): Toolbar
	{
		Factory::getApplication()->input->set('hidemainmenu', true);

		$Toolbar = Toolbar::getInstance();
		$isNew   = ($this->item->id == 0);

		$checkedOut = false;
		if (!empty($this->item->checked_out))
		{
			$checkedOut = !($this->item->checked_out == 0 || $this->item->checked_out == KrMethods::getUser()->id);
		}

		if ($isNew && $this->canDo->get('core.create'))
		{
			if ($this->getLayout() == 'block')
			{
				/** @noinspection PhpParamsInspection */
				$Toolbar->standardButton('save')
				        ->icon('fa-solid fa-thumbs-down knowres')
				        ->onclick("Knowres.submitform('contract.save', document.getElementById('contract-form'));")
				        ->text('COM_KNOWRES_TOOLBAR_SAVE');
			}
			else
			{
				/** @noinspection PhpParamsInspection */
				$Toolbar->standardButton('save')
				        ->icon('fa-solid fa-thumbs-down knowres')
				        ->onclick("Knowres.submitform('contract.save', document.getElementById('contract-form'));")
				        ->text('COM_KNOWRES_TOOLBAR_SAVE_SHOW');
			}
		}

		if (!$isNew && !$checkedOut && $this->canDo->get('core.edit'))
		{
			/** @noinspection PhpParamsInspection */
			$Toolbar->standardButton('save')
			        ->icon('fa-solid fa-thumbs-down knowres')
			        ->onclick("Knowres.submitform('contract.save', document.getElementById('contract-form'));")
			        ->text('JTOOLBAR_SAVE');

			if (ComponentHelper::isEnabled('com_contenthistory') && $this->state->params->get('save_history', 0)
				&& $this->canDo->get('core.edit'))
			{
				$Toolbar->versions('com_knowres.' . $name, $this->item->id);
			}
		}

		/** @noinspection PhpParamsInspection */
		$Toolbar->standardButton('cancel')
		        ->icon('fa-solid fa-times knowres')
		        ->onclick("Knowres.submitform('contract.cancel', document.getElementById('contract-form'));")
		        ->text('JTOOLBAR_CANCEL');

		return $Toolbar;
	}

	/**
	 * Check owner access
	 *
	 * @since  1.0.0
	 * @return bool
	 */
	protected function checkOwner(): bool
	{
		if ($this->getLayout() == 'agent')
		{
			return false;
		}
		else if ($this->item->id)
		{
			if ($this->getLayout() == 'block' && !$this->params->get('block_edit'))
			{
				return false;
			}
			else if ($this->getLayout() == 'manager' && !$this->params->get('contract_edit'))
			{
				return false;
			}
		}
		else
		{
			if ($this->getLayout() == 'block' && !$this->params->get('block_add'))
			{
				return false;
			}
			else if ($this->getLayout() == 'manager' && !$this->params->get('contract_add'))
			{
				return false;
			}
		}

		return true;
	}

	/**
	 * Check owner access and redirect if not allowed
	 *
	 * @throws Exception
	 * @since  3.3.0
	 */
	protected function checkOwnerAccess()
	{
		if ($this->access_level == 10 && !$this->checkOwner())
		{
			if ($this->item->id)
			{
				KrMethods::redirect(KrMethods::route('index.php?option=com_knowres&task=contract.show&id='
					. $this->item->id,
					false));
			}
			else
			{
				KrMethods::redirect(KrMethods::route('index.php?option=com_knowres&view=properties', false));
			}
		}
	}

	/**
	 * Set edit data
	 *
	 * @throws Exception
	 * @since  3.3.0
	 */
	protected function isEdit()
	{
		$this->property_id = $this->item->property_id;
		$this->arrival     = $this->item->arrival;
		$this->departure   = $this->item->departure;
		$this->guests      = $this->item->guests;
		$this->nights      = TickTock::differenceDays($this->arrival, $this->departure);

		$old                = [];
		$old['property_id'] = $this->item->property_id;
		$old['arrival']     = $this->item->arrival;
		$old['departure']   = $this->item->departure;
		$old['tag']         = $this->item->tag;
		KrMethods::setUserState('com_knowres.preedit.contract', $old);

		$this->setSessionData();
	}

	/**
	 * Set info for agent, manager or black booking
	 * Layout is already set for new
	 * Agent edit goes through manager
	 *
	 * @throws Exception
	 * @since  3.2.0
	 * @return void
	 */
	protected function setLayoutValue(): void
	{
		if ($this->task == 'agent')
		{
			$this->agent = true;
		}

		if ($this->item->id)
		{
			if ($this->item->black_booking)
			{
				$this->setLayout('block');
			}
			else
			{
				$this->setLayout('manager');
			}
		}
		else
		{
			$this->setLayout(KrMethods::inputString('layout', '', 'get'));
		}
	}

	/**
	 * Set page title
	 *
	 * @throws Exception
	 * @since 2.4.0
	 * @since 1.0.0
	 */
	protected function setPageTitle()
	{
		$this->property_name = '';
		if (empty($this->item->id))
		{
			if ($this->task == 'agent')
			{
				ToolbarHelper::title(KrMethods::plain('COM_KNOWRES_CONTRACT_AGENT_TITLE') . ' - '
					. $this->property->property_name, 'fa-headphones');
			}
			else if ($this->getLayout() == 'manager')
			{
				ToolbarHelper::title(KrMethods::plain('COM_KNOWRES_CONTRACT_MANAGER_TITLE') . ' - '
					. $this->property->property_name, 'fa-home');
			}
			else if ($this->getLayout() == 'block')
			{
				ToolbarHelper::title(KrMethods::plain('COM_KNOWRES_CONTRACT_BLOCK_TITLE') . ' - '
					. $this->property->property_name, 'fa-lock');
			}
		}
		else
		{
			if (!$this->item->black_booking)
			{
				$title[] = KrMethods::plain('COM_KNOWRES_EDIT');
				$title[] = $this->item->tag;
				$title[] = $this->item->property_name;
				$title[] = TickTock::displayDate($this->item->arrival) . ' - '
					. TickTock::displayDate($this->item->departure);
				$title[] = TickTock::differenceDays($this->item->arrival, $this->item->departure) . ' '
					. KrMethods::plain('COM_KNOWRES_NIGHTS');
				$title[] = $this->item->guest_name;
				$title[] = $this->item->guests . ' ' . KrMethods::plain('COM_KNOWRES_GUESTS_TITLE');
				$title[] = Utility::getBookingStatus($this->item->booking_status);
			}
			else
			{
				$title[] = KrMethods::plain('COM_KNOWRES_EDIT') . ' '
					. KrMethods::plain('COM_KNOWRES_CONTRACT_BLOCK_TITLE');
				$title[] = $this->item->property_name;
				$title[] = TickTock::displayDate($this->item->arrival) . ' to '
					. TickTock::displayDate($this->item->departure);
				$title[] = TickTock::differenceDays($this->item->arrival, $this->item->departure) . ' '
					. KrMethods::plain('COM_KNOWRES_NIGHTS');
			}

			ToolbarHelper::title(implode(' - ', $title), 'fa-solid fa-briefcase knowres');
		}
	}

	/**
	 * Set session data for contract edit
	 *
	 * @throws Exception
	 * @since  3.3.0
	 */
	protected function setSessionData()
	{
		$contractSession    = new KrSession\Contract();
		$this->contractData = $contractSession->resetData();

		foreach ($this->item as $key => $value)
		{
			if (property_exists($this->contractData, $key))
			{
				$this->contractData->$key = $value;
			}
		}

		$contractSession->setData($this->contractData);
	}
}