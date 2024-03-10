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
	 * @param  null  $tpl  Default template.
	 *
	 * @throws Exception
	 * @since  1.0.0
	 * @return void
	 */
	public function display($tpl = null): void
	{
		$this->property_id = KrMethods::inputInt('id');
		if ($this->property_id) {
			$property = KrFactory::getAdminModel('property')->getItem($this->property_id);
			if (empty($property->id)) {
				SiteHelper::redirectSearch();
			}

			$this->property_name = $property->property_name;
			$this->region_name   = $property->region_name;
			$this->region_id     = $property->region_id;
		}

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
	protected function prepareDocument(): void
	{
		$this->prepareDefaultDocument($this->meta_title, $this->meta_description);
		$this->setPathway();
	}

	/**
	 * Set the pathway for the enquiry
	 *
	 * @throws Exception
	 * @since 3.3.0
	 */
	protected function setPathway(): void
	{
		$searchSession = new KrSession\Search();
		$searchData    = $searchSession->getData();

		$pathway = self::setPathwayBase();
		$pathway = self::propertiesPathway($pathway, $searchData);

		if (!empty($this->property_name)) {
			$pathway->addItem($this->property_name);
		}

		$pathway->addItem(KrMethods::plain('COM_KNOWRES_CONTACT_TITLE'));
	}
}