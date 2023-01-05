<?php
/**
 * @package    Know Reservations
 * @subpackage Site View
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Site\View\Contractguestdataform;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\Component\Knowres\Site\Model\ContractguestdataModel;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Joomla\Extend\HtmlView as KrHtmlView;
use HighlandVision\KR\SiteHelper;
use Joomla\CMS\Factory;
use Joomla\CMS\Object\CMSObject;
use RuntimeException;

/**
 * Edit contract guest data (arrival details)
 *
 * @since 2.5.0
 */
class HtmlView extends KrHtmlView\Site
{
	/** @var CMSObject Contract item. */
	public CMSObject $contract;
	/** @var CMSObject Property item. */
	public CMSObject $property;

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
		}
		catch (Exception)
		{
			KrMethods::message(KrMethods::plain('COM_KNOWRES_ERROR_FATAL'));
			SiteHelper::redirectDashboard();
		}

		try
		{
			$this->contract = KrFactory::getAdminModel('contract')->getItem($contract_id);
			if (empty($this->contract->id) || $this->contract->guest_id != $guest_id)
			{
				throw new RuntimeException('Contract not found for ID = ' . $contract_id);
			}
			$this->property = KrFactory::getAdminModel('property')->getItem($this->contract->property_id);
		}
		catch (Exception)
		{
			SiteHelper::redirectDashboard();
		}

		/** @var ContractguestdataModel $model */
		$model      = KrFactory::getSiteModel('contractguestdata');
		$this->item = $model->getItem($this->contract->guestdata_id);
		if (!empty($this->item->id))
		{
			SiteHelper::checkLocks($this->item, $model);
		}

		$this->form = KrFactory::getAdhocForm('contractguestdata', 'contractguestdata.xml', 'site');
		$this->form->bind($this->item);
		if (empty($this->item->id))
		{
			$this->form->setValue('contract_id', null, $contract_id);
		}

		$this->state           = $model->getState();
		$this->params          = KrMethods::getParams();
		$this->form_aria_label = KrMethods::plain('COM_KNOWRES_DASHBOARD_EDIT_CONTRACTGUESTDATA');

		$this->meta_title       = KrMethods::plain('COM_KNOWRES_TITLE_DASHBOARD_CONTRACTGUESTDATA');
		$this->meta_description = KrMethods::plain('COM_KNOWRES_TITLE_DASHBOARD_CONTRACTGUESTDATA');
		$this->prepareDocument();

		parent::display($tpl);
	}

	/**
	 * Prepares the document
	 *
	 * @throws Exception
	 * @since   1.0.0
	 */
	protected function prepareDocument()
	{
		$this->prepareDefaultDocument($this->meta_title, $this->meta_description);
		$this->setMyPathway();
	}

	/**
	 * Set the pathway
	 *
	 * @throws Exception
	 * @since  3.3.0
	 */
	protected function setPathway()
	{
		$pathway = Factory::getApplication()->getPathway();
		$pathway->setMyPathway([]);

		$pathway = HtmlView::dashboardPathway($pathway);
		$pathway->addItem(KrMethods::plain('COM_KNOWRES_TITLE_DASHBOARD_CONTRACTGUESTDATA'));
	}
}