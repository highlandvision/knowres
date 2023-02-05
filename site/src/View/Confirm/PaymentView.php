<?php
/**
 * @package    Know Reservations
 * @subpackage Site View
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Site\View\Confirm;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Joomla\Extend\HtmlView as KrHtmlView;
use HighlandVision\KR\Logger;
use HighlandVision\KR\Payments\PrePayment;
use HighlandVision\KR\Session as KrSession;
use HighlandVision\KR\SiteHelper;
use HighlandVision\KR\Translations;
use Joomla\CMS\Factory;
use stdClass;

/**
 * Make a payment
 *
 * @since 1.0.0
 */
class PaymentView extends KrHtmlView\Site
{
	/* @var string Address details. */
	public string $address;
	/* @var stdClass Session contract data. */
	public stdClass $contractData;
	/* @var array Available payment gateways. */
	public array $gateways = [];
	/* @var stdClass Gateway data */
	public stdClass $gateway;
	/* @var stdClass Session guest data. */
	public stdClass $guestData;
	/* @var stdClass Session payment data. */
	public stdClass $paymentData;
	/* @var Translations Translations object */
	protected Translations $Translations;
	/** @var object Property item */
	public object $property;

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
		$this->Translations = new Translations();

		$this->prepareDocument();

		$this->setLayout('payment');
		parent::display($tpl);
	}

	/**
	 * Prepares the document
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	protected function prepareDocument()
	{
		$meta_title       = KrMethods::plain('COM_KNOWRES_PAY_NOW');
		$meta_description = KrMethods::plain('COM_KNOWRES_PAGE_TITLE');
		$this->prepareDefaultDocument($meta_title, $meta_description);
		$this->setMyPathway();
	}

	/**
	 * Set the pathway for the payment
	 *
	 * @throws Exception
	 * @since  3.3.0
	 */
	protected function setMyPathway()
	{
		$pathway = Factory::getApplication()->getPathway();
		$pathway->setPathway([]);

		$Itemid  = SiteHelper::getRegionItemid($this->property->region_id);
		$pathway = self::propertiesPathway($pathway, $this->property->region_id, $this->property->region_name,
			$Itemid);

		$searchSession = new KrSession\Search();
		$searchData    = $searchSession->getData();
		if (count($searchData->baseIds))
		{
			$Itemid = SiteHelper::getItemId('com_knowres', 'properties', [
				'layout'    => 'search',
				'region_id' => $this->property->region_id
			]);

			$pathway = self::searchPathway($pathway, $this->property->region_id, $Itemid);
		}

		$pathway = self::propertyPathway($pathway, $this->property->id, $this->property->property_name);

		$Itemid  = SiteHelper::getItemId('com_knowres', 'confirm');
		$pathway = self::confirmPathway($pathway, $Itemid);

		$pathway->addItem(KrMethods::plain('COM_KNOWRES_PAY_NOW'));
	}
}