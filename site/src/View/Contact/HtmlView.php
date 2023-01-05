<?php
/**
 * @package    Know Reservations
 * @subpackage Site View
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Site\View\Contact;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\Component\Knowres\Site\Model\ContactModel;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Joomla\Extend\HtmlView as KrHtmlView;
use HighlandVision\KR\Session as KrSession;
use HighlandVision\KR\SiteHelper;
use Joomla\CMS\Factory;

/**
 * Contact form
 *
 * @since 1.0.0
 */
class HtmlView extends KrHtmlView\Site
{
	/**
	 * Display the form
	 *
	 * @param   null  $tpl  Default template.
	 *
	 * @throws Exception
	 * @since  1.0.0
	 * @return void
	 */
	public function display($tpl = null): void
	{
		$this->property_id = KrMethods::inputInt('id', 0, 'get');
		if ($this->property_id)
		{
			$property = KrFactory::getAdminModel('property')->getItem($this->property_id);
			if (!$property)
			{
				SiteHelper::redirectSearch();
			}

			$this->property_name = $property->property_name;
			$this->region_name   = $property->region_name;
			$this->region_id     = $property->region_id;
		}

		$model      = KrFactory::getAdminModel('contract');
		$this->form = KrFactory::getAdhocForm('contract-form', 'contract.xml');
		$this->item = $model->getItem();

		/** @var ContactModel $model */
		$model      = $this->getModel();
		$this->form = $model->getForm();

		$sitename               = KrMethods::getCfg('sitename');
		$this->meta_title       = KrMethods::sprintf('COM_KNOWRES_CONTACT_TITLE', $sitename);
		$this->meta_description = KrMethods::sprintf('COM_KNOWRES_CONTACT_TITLE_DSC', $sitename);
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
	 * Set the pathway for the property
	 *
	 * @throws Exception
	 * @since 3.3.0
	 */
	protected function setMyPathway()
	{
		$pathway = Factory::getApplication()->getPathway();
		$pathway->setPathway([]);

		$searchSession = new KrSession\Search();
		$searchData    = $searchSession->getData();
		if (count($searchData->baseIds) && $this->property_id)
		{
			$regions = KrFactory::getListModel('regions')->getAllRegions(true);
			$Itemid  = 0;
			if (count($regions) > 1)
			{
				$Itemid = SiteHelper::getItemId('com_knowres', 'properties',
					array('layout'    => 'search',
					      'region_id' => $this->region_id));
			}

			$pathway = HtmlView::propertiesPathway($pathway, $this->region_id, $this->region_name, $Itemid);

			$Itemid  = SiteHelper::getItemId('com_knowres', 'properties', array(
				'layout'    => 'search',
				'region_id' => $this->region_id
			));
			$pathway = self::searchPathway($pathway, $this->region_id, $Itemid);
			$pathway = self::propertyPathway($pathway, $this->property_id, $this->property_name);
		}
		else if ($this->property_id && !is_null($this->property_name))
		{
			$pathway = self::propertyPathway($pathway, $this->property_id, $this->property_name);
		}

		$pathway->addItem(KrMethods::plain('COM_KNOWRES_CONTACT_TITLE'));
	}
}