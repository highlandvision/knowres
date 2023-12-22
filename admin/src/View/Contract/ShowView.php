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
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Joomla\Extend\HtmlView as KrHtmlView;
use HighlandVision\KR\TickTock;
use HighlandVision\KR\Utility;
use Joomla\CMS\Factory;
use Joomla\CMS\Form\Form;
use Joomla\CMS\Toolbar\Toolbar;
use Joomla\CMS\Toolbar\ToolbarHelper;
use Joomla\Registry\Registry;
use RuntimeException;

/**
 * Contract show view
 *
 * @since 1.0.0
 */
class ShowView extends KrHtmlView\Contract
{
	/** @var string The viewing level */
	public string $audience;
	/** @var mixed Fees list */
	public array $fees;
	/** @var false|object Guest row */
	public false|object $guest;
	/** @var Form Email trigger form */
	public Form $formtrigger;
	/** @var ContractModel Model contract */
	public ContractModel $model;
	/** @var array Contract notes */
	public array $notes;
	/** @var Registry KR params */
	public Registry $params;
	/** @var mixed Payments */
	public mixed $payments;
	/** @var int Xero service ID */
	public int $xero = 0;
	/** @var float Contract balance */
	protected float $balance = 0;
	/** @var float Contract balance less pending payments */
	protected float $balance_all = 0;

	/**
	 * Display the view
	 *
	 * @param  ?string  $tpl  A template file to load. [optional]
	 *
	 * @throws Exception
	 * @since  1.0.0
	 * @return void
	 */
	public function display($tpl = null): void
	{
		$this->setLayout('show');
		$this->getUserSessionData(false);
		$this->getActions();
		$this->params = KrMethods::getParams();

		$model       = new ContractModel();
		$this->form  = $model->getForm();
		$this->item  = $model->getItem();
		$this->state = $model->getState();

		$this->audience = $this->access_level > 10 ? 'manager' : 'owner';
		if ($this->item->guest_id)
		{
			$this->guest = KrFactory::getAdminModel('guest')->getItem($this->item->guest_id);
		}
		$this->notes    = KrFactory::getListModel('contractnotes')->getForContract($this->item->id);
		$this->payments = KrFactory::getListModel('contractpayments')->getForContract($this->item->id);
		$this->fees     = KrFactory::getListModel('contractfees')->getForContract($this->item->id);
		[$this->balance, $this->balance_all]
			= KrFactory::getAdminModel('contractpayment')::setBalances($this->item, $this->payments,
			$this->fees);

		if ($this->access_level > 10 && !$this->item->black_booking)
		{
			$this->formtrigger = KrFactory::getAdhocForm('trigger', 'contract_modal_trigger.xml');
		}

		$this->checkErrors();
		$this->setXero();

		KrMethods::setUserState('com_knowres.current.contract_id', $this->item->id);
		Factory::getApplication()->input->set('hidemainmenu', true);
		$this->setTitle();
		$Toolbar = Toolbar::getInstance();
		$this->addToolbar($Toolbar, 'show');
		KrMethods::setUserState('com_knowres.gobackto', 'task=contract.show&id=' . $this->item->id);

		parent::display($tpl);
	}

	/**
	 * Set page title
	 *
	 * @throws Exception
	 * @since  3.2.0
	 */
	protected function setTitle(): void
	{
		if (!$this->item->black_booking)
		{
			$title[] = $this->item->tag;
			$title[] = $this->item->property_name;
			$title[] = TickTock::displayDate($this->item->arrival, 'dMy') . ' - '
				. TickTock::displayDate($this->item->departure, 'dMy');
			$title[] = $this->item->guest_name;
			$title[] = $this->item->guests . ' ' . KrMethods::plain('COM_KNOWRES_GUESTS_TITLE');
			$title[] = Utility::getBookingStatus($this->item->booking_status, true);

			if ($this->item->booking_status < 10)
			{
				if ($this->item->on_request)
				{
					$expiry  = TickTock::modifyHours($this->item->created_at, $this->item->on_request);
					$title[] = KrMethods::sprintf('COM_KNOWRES_CONTRACTS_EXPIRES_ON', TickTock::displayTs($expiry));
				}
				else
				{
					$title[] = KrMethods::sprintf('COM_KNOWRES_CONTRACTS_EXPIRES_ON',
						TickTock::displayDate($this->item->expiry_date, 'dMy'));
				}
			}
			else if ($this->item->booking_status < 39)
			{
				$title[] = KrMethods::sprintf('COM_KNOWRES_CONTRACTS_BALANCE_ON',
					TickTock::displayDate($this->item->balance_date, 'dMy'));
			}
		}
		else
		{
			$title[] = KrMethods::plain('COM_KNOWRES_CONTRACT_BLOCK_TITLE');
			$title[] = $this->item->property_name;
			$title[] = TickTock::displayDate($this->item->arrival, 'dMy') . ' to '
				. TickTock::displayDate($this->item->departure, 'dMy');
			$title[] = TickTock::differenceDays($this->item->arrival,
					$this->item->departure) . ' ' . KrMethods::plain('COM_KNOWRES_NIGHTS');
			if ($this->item->cancelled)
			{
				$title[] = KrMethods::plain('COM_KNOWRES_CONTRACT_CANCELLED_LBL');
			}
		}

		ToolbarHelper::title(implode(" | ", $title), 'briefcase');
	}

	/**
	 * Set Xero ID (if enabled)
	 *
	 * @throws Exception
	 * @since  4.0.0
	 */
	protected function setXero(): void
	{
		$xero = KrFactory::getListModel('services')->getServicesByPlugin('xero');
		if (is_countable($xero))
		{
			if (count($xero) > 1)
			{
				throw new RuntimeException('Multiple Xero services found - please fix');
			}
			foreach ($xero as $x)
			{
				$this->xero = $x->id;
			}
		}
	}
}