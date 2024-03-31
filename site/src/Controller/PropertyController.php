<?php
/**
 * @package    Know Reservations
 * @subpackage Site Controller
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Site\Controller;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\Component\Knowres\Site\View\Property\GeriatricView;
use HighlandVision\Component\Knowres\Site\View\Property\MapInfoWindowView;
use HighlandVision\Component\Knowres\Site\View\Property\QuoteView;
use HighlandVision\Component\Knowres\Site\View\Property\TermsView;
use HighlandVision\KR\Calendar;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Hub;
use HighlandVision\KR\Logger;
use HighlandVision\KR\Media\Pdf\Property\Terms;
use HighlandVision\KR\PropertyIcs;
use HighlandVision\KR\Session as KrSession;
use HighlandVision\KR\SiteHelper;
use HighlandVision\KR\TickTock;
use HighlandVision\KR\Utility;
use JetBrains\PhpStorm\NoReturn;
use Joomla\CMS\MVC\Controller\BaseController;
use Joomla\CMS\Response\JsonResponse;
use RuntimeException;
use UnexpectedValueException;

use function jexit;

/**
 * Property controller class.
 *
 * @since 1.0.0
 */
class PropertyController extends BaseController
{
	/**
	 * Ajax display geriatric calendar using property.js
	 *
	 * @throws Exception
	 * @since  3.3.0
	 * @return void
	 * @noinspection PhpUnused
	 */
	#[NoReturn] public function geriatric(): void
	{
		KrMethods::loadLanguage();

		/** @var GeriatricView $view */
		$view     = $this->getView('property', 'geriatric');
		$id       = KrMethods::inputInt('pid');
		$params   = KrMethods::getParams();
		$settings = KrFactory::getListModel('propertysettings')->getPropertysettings($id, 'mindaysbeforearrival');

		$view->months_to_show = $params->get('calendar_months', 12);
		$view->start          = TickTock::modifyDays('now', $settings['mindaysbeforearrival']);
		$view->year           = (int) TickTock::parseString($view->start, 'Y');
		$view->month          = (int) TickTock::parseString($view->start, 'm');
		$view->startday_dow   = (int) $params->get('calendar_startday');
		$view->yesterday_dow  = $view->startday_dow > 0 ? $view->startday_dow - 1 : 6;
		$last_sunday          = TickTock::parseString('last Sunday');
		$view->startday_name  = strtolower(TickTock::modifyDays($last_sunday, $view->startday_dow, '+', 'l'));
		$view->yesterday_name = strtolower(TickTock::modifyDays($last_sunday, $view->yesterday_dow, '+', 'l'));

		$final           = TickTock::modifyMonths($view->start, $view->months_to_show + 1);
		$Calendar        = new Calendar\Geriatric($id, $view->start, $final);
		$view->blocked   = $Calendar->getBlockedDates();
		$view->confirmed = $Calendar->getConfirmedDates();
		$view->weekly    = $Calendar->getWeekly();
		$view->display();
	}

	/**
	 * Generates an ics file for property
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	#[NoReturn] public function ics(): void
	{
		$id = KrMethods::inputInt('id');
		if (!$id) {
			exit('Invalid request');
		}

		$action = KrMethods::inputString('action', '');
		$custom = KrMethods::inputString('custom', '');

		$property = KrFactory::getAdminModel('property')->getItem($id);
		if (!$property->id || $property->state != 1) {
			exit('Invalid property');
		}

		$propertyIcs = new PropertyIcs($property->id, $property->property_name, $custom);
		$propertyIcs->createIcs($action);

		jexit();
	}

	/**
	 * Ajax - display properties map infowindow
	 *
	 * @throws Exception
	 * @since  1.0.0
	 * @return void
	 * @noinspection PhpUnused
	 */
	#[NoReturn] public function mapinfowindow(): void
	{
		KrMethods::loadLanguage();
		$searchSession = new KrSession\Search();
		$searchData    = $searchSession->getData();

		/** @var MapInfoWindowView $view */
		$view                 = $this->getView('property', 'mapinfowindow');
		$id                   = KrMethods::inputInt('id');
		$view->item           = KrFactory::getAdminModel('property')->getItem($id);
		$view->net            = $searchData->rateNet;
		$view->discount       = $searchData->rateDiscount;
		$view->byAvailability = $searchData->byAvailability;
		$view->currency       = $searchData->currency;
		$view->images         = KrFactory::getListModel('images')->forDisplay($id);
		$view->params         = KrMethods::getParams();
		$view->link           = SiteHelper::buildPropertyLink($id);

		if (KrMethods::getParams()->get('review_ratings', 0)) {
			$view->ratings = KrFactory::getListModel('reviews')->getAvgReview($id);
		}

		$view->display();
	}

	/**
	 * Ajax - display mobi calendar on property page
	 *
	 * @throws Exception
	 * @since        3.3.0
	 * @noinspection PhpUnused
	 */
	#[NoReturn] public function mobi(): void
	{
		KrMethods::loadLanguage();
		$property_id = KrMethods::inputInt('pid');
		if (!$property_id) {
			SiteHelper::redirectSearch();
		}

		$start    = KrMethods::inputString('start', '');
		$end      = KrMethods::inputString('end', '');
		$Calendar = new Calendar\Quote($property_id, $start, $end);

		$wrapper                 = [];
		$wrapper['availability'] = Utility::encodeJson($Calendar->getAvailability());
		$wrapper['weekly']       = Utility::encodeJson($Calendar->getWeekly());
		$wrapper['minstay']      = Utility::encodeJson($Calendar->getMinStay());
		$wrapper['maxstay']      = Utility::encodeJson($Calendar->getMaxStay());
		$wrapper['changeover']   = Utility::encodeJson($Calendar->getChangeOvers());
		list($wrapper['arrival'], $wrapper['departure']) = $Calendar->getFirstFreeDate();

		echo new JsonResponse($wrapper);
		jexit();
	}

	/**
	 * Calculate price quote.
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	public function quote(): void
	{
		/** @var QuoteView $view */
		KrMethods::loadLanguage();
		$view        = $this->getView('property', 'quote');
		$property_id = KrMethods::inputInt('property_id');
		$arrival     = KrMethods::inputString('arrival');
		$departure   = KrMethods::inputString('departure');

		if (empty($property_id) || empty($arrival) || empty($departure)) {
			jexit();
		}

		$adults     = KrMethods::inputInt('adults');
		$children   = KrMethods::inputInt('children');
		$child_ages = KrMethods::inputArray('child_ages');

		if (!KrFactory::getListModel('contracts')->isPropertyAvailable($property_id, $arrival, $departure)) {
			$view->error = KrMethods::plain('COM_KNOWRES_ERROR_AVAILABILITY_CHANGED');
			$view->display();
		}

		try {
			$contractSession           = new KrSession\Contract();
			$contractData              = $contractSession->getData();
			$contractData->property_id = $property_id;
			$contractData->arrival     = $arrival;
			$contractData->departure   = $departure;
			$contractData->adults      = $adults;
			$contractData->children    = $children;
			$contractData->child_ages  = $child_ages;
			$contractData->guests      = $adults + $children;
			$contractData->tax_total   = 0;
			$contractData->taxes       = [];
			$Hub                       = new Hub($contractData);
		} catch (UnexpectedValueException $e) {
			$view->error = $e->getMessage();
			$view->display();
		} catch (Exception $e) {
			Logger::logme($e->getMessage());
			$view->error = KrMethods::plain('COM_KNOWRES_NO_PRICE');
			$view->display();
		}

		$searchSession          = new KrSession\Search();
		$searchData             = $searchSession->getData();
		$searchData->adults     = $adults;
		$searchData->children   = $children;
		$searchData->child_ages = $child_ages;
		$searchData->guests     = $adults + $children;
		$searchSession->setData($searchData);

		$Hub          = new Hub($contractData);
		$computations = ['base',
		                 'dow',
		                 'seasons',
		                 'shortstay',
		                 'longstay',
		                 'ratemarkup',
		                 'discount',
		                 'tax',
		                 'extras',
		                 'deposit',
		                 'paymentdates',
		];

		try {
			$Hub->compute($computations);
			$gross = $Hub->getValue('room_total_gross');
			if (!$gross) {
				$view->error = KrMethods::plain('COM_KNOWRES_QUOTE_NO_RATES_YET');
				$view->display();
			}

			$contractSession->setData($Hub->getData());

			$view->quote = $Hub;
			$view->error = '';
			$view->display();
		} catch (Exception) {
			$view->error = KrMethods::plain('COM_KNOWRES_QUOTE_NO_RATES_YET');
			$view->display();
		}
	}

	/**
	 * Display property terms
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	public function terms(): void
	{
		$id = KrMethods::inputInt('id');
		if ($id) {
			/** @var TermsView $view */
			$view             = $this->getView('property', 'terms');
			$view->item       = KrFactory::getAdminModel('property')->getItem($id);
			$view->article_id = 0;

			$summary = $this->input->getInt('summary', 0);
			if ($summary) {
				$view->setLayout('terms_summary');
				$view->article_id = $summary;
			}
			else {
				$view->setLayout('terms');
				$params           = KrMethods::getParams();
				$view->article_id = (int) $params->get('id_cancellation', '0');
			}

			if ($view->article_id) {
				$view->article = KrMethods::getArticle($view->article_id);
			}

			$view->display();
		}
	}

	/**
	 * Download property terms PDF
	 *
	 * @throws Exception
	 * @since  3.3.0
	 * @return bool
	 * @noinspection PhpUnused
	 */
	public function termspdf(): bool
	{
		$id = KrMethods::inputInt('id');
		if (!$id) {
			throw new RuntimeException('Property ID not received for PDF download');
		}

		$Terms  = new Terms('download', $id);
		$result = $Terms->getPdf();
		if (!$result) {
			foreach ($errors as $e) {
				KrMethods::message($e);
			}

			return false;
		}

		jexit();
	}
}