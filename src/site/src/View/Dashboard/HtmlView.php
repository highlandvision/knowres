<?php
/**
 * @package    Know Reservations
 * @subpackage Site View
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

/** @noinspection PhpPossiblePolymorphicInvocationInspection */

namespace HighlandVision\Component\Knowres\Site\View\Dashboard;

use Exception;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Joomla\Extend\HtmlView as KrHtmlView;
use HighlandVision\KR\Session as KrSession;
use HighlandVision\KR\SiteHelper;
use Joomla\CMS\Factory;

// phpcs:disable PSR1.Files.SideEffects
defined('_JEXEC') or die;
// phpcs:enable PSR1.Files.SideEffects

/**
 * Guest dashboard
 *
 * @since  2.5.0
 */
class HtmlView extends KrHtmlView\Site
{
    /** @var string GDPR text */
    public string $firstname = '';
    /** @var object Guest row. */
    public object $guest;

    /**
     * Display the view
     *
     * @param   null  $tpl  Default template.
     *
     * @return void
     * @throws Exception
     * @since  1.0.0
     */
    public function display($tpl = null): void
    {
        SiteHelper::checkUser();

        $userSession = new KrSession\User();
        $userData    = $userSession->getData();

        if (!$userData->db_guest_id) {
            SiteHelper::badUser();
        }

        $this->guest = KrFactory::getAdminModel('guest')->getItem($userData->db_guest_id);
        if (!$this->guest->id) {
            SiteHelper::badUser();
        }

        $this->firstname = $this->guest->firstname;
        $this->params    = KrMethods::getParams();

        [$this->items, $stubs] = SiteHelper::setGuestContracts($userData->db_guest_id);
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