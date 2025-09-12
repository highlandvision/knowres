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
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Joomla\Extend\HtmlView as KrHtmlView;
use HighlandVision\KR\Session as KrSession;
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
	/* @var stdClass Gateway data */
	public stdClass $gateway;
	/* @var array Available payment gateways. */
	public array $gateways = [];
	/* @var stdClass Session guest data. */
	public stdClass $guestData;
	/* @var stdClass Session payment data. */
	public stdClass $paymentData;
	/** @var object Property item */
	public object $property;
	/* @var Translations Translations object */
	protected Translations $Translations;

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
		KrMethods::loadLanguage();
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
	protected function prepareDocument(): void
	{
		$this->document   = Factory::getDocument();
		$meta_title       = KrMethods::plain('COM_KNOWRES_MAKE_A_PAYMENT');
		$meta_description = KrMethods::plain('COM_KNOWRES_PAGE_TITLE');
		$this->prepareDefaultDocument($meta_title, $meta_description);

		$this->setPathway();
	}

	/**
	 * Set the pathway for the payment
	 *
	 * @throws Exception
	 * @since  3.3.0
	 */
	protected function setPathway(): void
	{
		$searchSession = new KrSession\Search();
		$searchData    = $searchSession->getData();

		$pathway = self::setPathwayBase();
		$pathway = self::propertiesPathway($pathway, $searchData);
		$pathway = self::propertyPathway($pathway, $searchData, $this->property);
		$pathway = self::confirmPathway($pathway);

		$pathway->addItem(KrMethods::plain('COM_KNOWRES_MAKE_A_PAYMENT'));
	}
}