<?php
/**
 * @package     KR
 * @subpackage  Admin views
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Administrator\View\Gantt;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Joomla\Extend\HtmlView as KrHtmlView;
use HighlandVision\KR\Session as KrSession;
use HighlandVision\KR\Utility;
use JetBrains\PhpStorm\NoReturn;

/**
 * Show contract details in modal.
 *
 * @since 1.0.0
 */
class ShowModalView extends KrHtmlView\Contract
{
	/** @var string The viewing level */
	public string $audience;
	/** @var float Contract balance */
	protected float $balance = 0;
	/** @var float Contract balance less pending payments */
	protected float $balance_all = 0;
	/** @var array|bool Contract notes. */
	public array|bool $contract_notes;
	/** @var mixed Fees list */
	public array $fees;
	/** @var false|object Guest data. */
	public false|object $guest;
	/** @var false|object Contract guest data. */
	public false|object $guestdata;
	/** @var int ID of contract. */
	public int $id = 0;
	/** @var float Value of payments. */
	public float $payment = 0;
	/** @var mixed Payments */
	public mixed $payments;

	/**
	 * Display the view
	 *
	 * @param  ?string  $tpl  A template file to load. [optional]
	 *
	 * @throws Exception
	 * @since  1.0.0
	 * @return void
	 */
	#[NoReturn] public function display($tpl = null): void
	{
		$this->item = KrFactory::getAdminModel('contract')->getItem($this->id);
		if (empty($this->item->id))
		{
			Utility::goto('contracts');
		}

		$this->getActions();
		$userSession        = new KrSession\User();
		$this->access_level = $userSession->getAccessLevel();
		$this->audience     = $this->access_level > 10 ? 'manager' : 'owner';
		$this->setCustomActions();

		$this->contract_notes = KrFactory::getListModel('contractnotes')->getForContract($this->item->id);
		if ($this->item->black_booking)
		{
			$layout = 'blockmodal';
		}
		else
		{
			$layout          = 'modalbook';
			$this->guest     = KrFactory::getAdminModel('guest')->getItem($this->item->guest_id);
			$this->guestdata = false;
			if ($this->item->guestdata_id)
			{
				$this->guestdata = KrFactory::getAdminModel('contractguestdata')->getItem($this->item->guestdata_id);
			}
			$this->payments = KrFactory::getListModel('contractpayments')->getForContract($this->item->id);
			$this->fees     = KrFactory::getListModel('contractfees')->getForContract($this->item->id);
			[$this->balance, $this->balance_all]
				= KrFactory::getAdminModel('contractpayment')::setBalances($this->item, $this->payments,
				$this->fees);
			$this->payment = KrFactory::getListModel('contractpayments')->getPaymentTotal($this->item->id);
		}

		KrMethods::setUserState('com_knowres.current.contract_id', $this->item->id);

		$this->setLayout($layout);
		echo $this->loadTemplate($tpl);

		jexit();
	}
}