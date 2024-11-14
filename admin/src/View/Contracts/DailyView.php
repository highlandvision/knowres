<?php
/**
 * @package     KR
 * @subpackage  Admin views
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

/** @noinspection PhpUnused */

namespace HighlandVision\Component\Knowres\Administrator\View\Contracts;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\Component\Knowres\Administrator\Model\ContractsModel;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Joomla\Extend\HtmlView as KrHtmlView;
use HighlandVision\KR\Session as KrSession;
use HighlandVision\KR\TickTock;
use JetBrains\PhpStorm\NoReturn;
use Joomla\CMS\Form\Form;
use Joomla\CMS\Toolbar\Toolbar;
use Joomla\CMS\Toolbar\ToolbarHelper;
use stdClass;

use function defined;
use function is_null;
use function ucfirst;

/**
 * Daily contracts overview
 *
 * @since 1.0.0
 */
class DailyView extends KrHtmlView
{
	/** @var array New payments. */
	public array $payments = [];
	/** @var array New properties requiring approval. */
	public array $approvals = [];
	/** @var array New owner payments. */
	public array $ownerpayments = [];
	/** @var bool True to show registration download. */
	public bool $registration = false;
	/** @var Form Guest modal registration form. */
	public Form $registrationform;
	/** @var array Review requiring approval. */
	public array $reviews = [];
	/** @var array Line data. */
	public array $lines = [];

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
		$this->setLayout('daily');

		/** @var ContractsModel $model * */
		$model        = KrFactory::getListModel('contracts');
		$this->state  = $model->getState();
		$this->items  = $model->getOverview();
		$this->params = KrMethods::getParams();
		$this->getActions();
		$userSession        = new KrSession\User();
		$this->access_level = $userSession->getAccessLevel();
		if ($this->access_level == 40) {
			$this->approvals     = KrFactory::getListModel('properties')->getForApproval();
			$this->reviews       = KrFactory::getListModel('reviews')->getReviewsForApproval();
			$this->payments      = KrFactory::getListModel('contractpayments')->getOverview();
			$this->ownerpayments = KrFactory::getListModel('ownerpayments')->getOverview();
		}

		$this->setLines();
		if ($this->params->get('download_registration', 0)) {
			$this->registration     = true;
			$this->registrationform = KrFactory::getAdhocForm('export_registration', 'export_registration.xml');
		}

		$this->checkErrors();
		KrMethods::setUserState('com_knowres.gobackto', 'task=contracts.daily');

		ToolbarHelper::title(KrMethods::plain('COM_KNOWRES_CONTRACTS_DAILY_TITLE'), 'tasks knowres');
		$this->addToolbar();
		KrMethods::setUserState('com_knowres.gobackto', 'task=contracts.daily');

		parent::display($tpl);
	}

	/**
	 * Add the page title and toolbar
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	protected function addToolbar(): void
	{
		$Toolbar = Toolbar::getInstance();

		if (!empty($this->registration)) {
			$title = KrMethods::plain('COM_KNOWRES_CONFIG_ADMIN_DOWNLOAD_REGISTRATION');
			$html  = KrMethods::render('toolbar.contract.registration', ['title' => $title]);
			$Toolbar->customButton('guestregistration')
			        ->html($html);
		}

		/* @var Toolbar\LinkButton $Toolbar * */
		$Toolbar->linkButton('refresh')
		        ->icon('fa-solid fa-redo knowres')
		        ->text('COM_KNOWRES_REFRESH')
		        ->url(KrMethods::route('index.php?option=com_knowres&task=contracts.daily'));

		$Toolbar = $this->addConfigToolbar($Toolbar);
		$Toolbar = $this->addQuickLinksToolbar($Toolbar);
		$Toolbar = $this->addBackLink($Toolbar);

		/* @var Toolbar\LinkButton $Toolbar * */
		$Toolbar->linkButton('close')
		        ->icon('fa-solid fa-times knowres')
		        ->text('JTOOLBAR_CLOSE')
		        ->url(KrMethods::route('index.php?option=com_knowres&task=gantt.cancel'));

		if ($this->canDo->get('core.admin')) {
			ToolbarHelper::preferences('com_knowres');
		}
	}

	/**
	 * Set the section / line data for output
	 *
	 * @throws Exception
	 * @since  4.0.0
	 */
	#[NoReturn] protected function setLines(): void
	{
		foreach ($this->items as $c) {
			$line = $this->setLine($c);

			if (!$c->booking_status) {
				$this->lines['enquiry'][] = $line;
			} else if ($c->booking_status == 1 && (int) $c->on_request) {
				$this->lines['requests'][] = $line;
			} else if ($c->booking_status == 1 && !(int) $c->on_request) {
				$this->lines['option'][] = $line;
			} else if ($c->booking_status == 5) {
				$this->lines['duedeposit'][] = $line;
			} else if ($c->booking_status == 30) {
				$this->lines['overduebalance'][] = $line;
			} else if ($c->booking_status == 35) {
				$this->lines['duebalance'][] = $line;
			} else if ($c->booking_status == 99) {
				$this->lines['cancelled'][] = $line;
			} else if ($c->arrival == $this->today) {
				$this->lines['arrivals'][] = $line;
			} else if ($c->departure == $this->today) {
				$this->lines['departures'][] = $line;
			} else {
				$this->lines['new'][] = $line;
			}
		}
	}

	/**
	 * Set one line of data from contract
	 *
	 * @param  stdClass  $c  Contract data
	 *
	 * @throws Exception
	 * @since  4.0.0
	 * @return array
	 */
	protected function setLine(stdClass $c): array
	{
		$line                   = [];
		$line['id']             = $c->id;
		$line['service_id']     = $c->service_id;
		$line['property_id']    = $c->property_id;
		$line['arrival']        = TickTock::displayDate($c->arrival, 'dMy');
		$line['departure']      = TickTock::displayDate($c->departure, 'dMy');
		$line['contract_total'] = $c->contract_total;
		$line['agent_name']     = '';
		if (!is_null($c->agent_name)) {
			$line['agent_name'] = $c->agent_name;
		}
		if ($c->guest_id > 0) {
			$name              = ucfirst($c->firstname) . " " . ucfirst($c->surname);
			$line['guestname'] = $name;
		}
		if ((int) $c->on_request) {
			$expires         = TickTock::modifyHours($c->created_at, $c->on_request);
			$line['expires'] = TickTock::displayTs($expires);
		} else {
			$line['expires'] = TickTock::displayDate($c->expiry_date, 'dMy');
		}
		$line['balancedate']    = TickTock::displayDate($c->balance_date, 'dMy');
		$line['customer_ref']   = $c->customer_ref;
		$line['currency']       = $c->currency;
		$line['booking_status'] = $c->booking_status;

		$link        = KrMethods::route('index.php?option=com_knowres&task=contract.show&id=' . $c->id);
		$line['tag'] = '<a href="' . $link . '">' . $c->tag . '</a>';

		$link                  = KrMethods::route('index.php?option=com_knowres&task=property.dashboard&id='
		                                          . $c->property_id);
		$line['property_name'] = '<a href="' . $link . '">' . $c->property_name . '</a>';

		return $line;
	}
}