<?php
/**
 * @package    Know Reservations
 * @subpackage Site View
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */
/** @noinspection PhpPossiblePolymorphicInvocationInspection */

namespace HighlandVision\Component\Knowres\Site\View\Success;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Joomla\Extend\HtmlView as KrHtmlView;
use HighlandVision\KR\Session as KrSession;
use Joomla\CMS\Factory;
use Joomla\CMS\Uri\Uri;

/**
 * Confirm payment page
 *
 * @since 1.0.0
 */
class HtmlView extends KrHtmlView\Site
{
	/* @var object Contract item */
	public object $contract;
	/** @var bool True for request booking */
	public bool $request;

	/**
	 * Display the reservation success page
	 *
	 * @param  null  $tpl  Default template.
	 *
	 * @throws Exception
	 * @since  4.0.0
	 * @return void
	 */
	public function display($tpl = null): void
	{
		$userSession = new KrSession\User();
		$userData    = $userSession->getData();

		if (!$userData->pr_contract_id)
		{
			KrMethods::message(KrMethods::plain('COM_KNOWRES_ERROR_FATAL_CONFIRM'));
			KrMethods::redirect(KrMethods::route(Uri::base()));
		}

		$this->contract = KrFactory::getAdminModel('contract')->getItem($userData->pr_contract_id);
		if (empty($this->contract->id))
		{
			KrMethods::message(KrMethods::plain('COM_KNOWRES_ERROR_FATAL_CONFIRM'));
			KrMethods::redirect(KrMethods::route(KrMethods::getRoot()));
		}

		KrMethods::cleanCache('com_knowres_contracts');

		$contractSession = new KrSession\Contract();
		$contractSession->resetData();

		$this->request          = (bool)$this->contract->on_request;
		$this->meta_title       = KrMethods::plain('COM_KNOWRES_TITLE_CONFIRM_SUCCESS');
		$this->meta_description = KrMethods::plain('COM_KNOWRES_PAGE_TITLE');

		$this->prepareDocument();

		parent::display($tpl);
	}

	/**
	 * Prepares the document
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
	 * Set the pathway for the payment
	 *
	 * @throws Exception
	 * @since  3.3.0
	 */
	protected function setMyPathway(): void
	{
		$pathway = Factory::getApplication()->getPathway();
		$pathway->setPathway([]);
		$pathway->addItem(KrMethods::plain('COM_KNOWRES_SUCCESS_CONFIRMED'));
	}
}