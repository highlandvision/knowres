<?php /** @noinspection PhpPossiblePolymorphicInvocationInspection */

/**
 * @package    Know Reservations
 * @subpackage Site View
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Site\View\Dashboard;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Joomla\Extend\HtmlView as KrHtmlView;
use HighlandVision\KR\Session as KrSession;
use HighlandVision\KR\SiteHelper;
use Joomla\CMS\Factory;

/**
 * Guest dashboard
 *
 * @since  2.5.0
 */
class HtmlView extends KrHtmlView\Site
{
	/**
	 * Display the view
	 *
	 * @param   null  $tpl  Default template.
	 *
	 * @throws Exception
	 * @since  1.0.0
	 * @return void
	 */
	public function display($tpl = null): void
	{
		SiteHelper::checkUser();

		$userSession = new KrSession\User();
		$userData    = $userSession->getData();

		if (!$userData->db_guest_id)
		{
			SiteHelper::badUser();
		}

		$this->guest = KrFactory::getAdminModel('guest')->getItem($userData->db_guest_id);
		if (!$this->guest->id)
		{
			SiteHelper::badUser();
		}

		$this->firstname = $this->guest->firstname;
		$this->params    = KrMethods::getParams();

		list ($this->items, $stubs) = SiteHelper::setGuestContracts($userData->db_guest_id);
		$userData->db_contracts   = $stubs;
		$userData->db_contract_id = 0;
		$userSession->setData($userData);

		$this->meta_title       = KrMethods::plain('COM_KNOWRES_TITLE_DASHBOARD');
		$this->meta_description = KrMethods::plain('COM_KNOWRES_TITLE_DASHBOARD_DSC');
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
	 * Set the pathway for the confirmation
	 *
	 * @throws Exception
	 * @since  3.3.0
	 */
	protected function setMyPathway(): void
	{
		$pathway = Factory::getApplication()->getPathway();
		$pathway->setPathway([]);

		$pathway->addItem(KrMethods::plain('COM_KNOWRES_TITLE_DASHBOARD'));
	}
}