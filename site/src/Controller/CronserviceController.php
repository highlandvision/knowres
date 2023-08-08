<?php

/**
 * @package     Know Reservations
 * @subpackage  Site Controller
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

/** @noinspection PhpUnused */

namespace HighlandVision\Component\Knowres\Site\Controller;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\Beyond\Rates;
use HighlandVision\Factura\Factura;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Service\Ical;
use HighlandVision\KR\Session as KrSession;
use HighlandVision\KR\TickTock;
use HighlandVision\KR\Utility;
use HighlandVision\Ru\Manager as RuManager;
use HighlandVision\VintageTravel\VintageTravel;
use HighlandVision\Vrbo\Manager as VrboManager;
use JetBrains\PhpStorm\NoReturn;
use Joomla\CMS\MVC\Controller\BaseController;
use RuntimeException;
use stdClass;

use function class_exists;
use function count;
use function jexit;
use function method_exists;

//TODO-v4.3 Reinstate Xero II
//use HighlandVision\XERO\Xero\Payments;
//use XeroPHP\Exception as XeroPHPException;
//use XeroPHP\Remote\Exception\NotFoundException;

/**
 * Cron service controller tasks initiated by cron or external link
 *
 * @since 1.0.0
 */
class CronserviceController extends BaseController
{
	/** @var int Indicates that test is being run */
	protected int $test;

	/**
	 * Beyond pull lstings and rates
	 *
	 * @throws RuntimeException
	 * @throws Exception
	 * @since  2.4.0
	 */
	#[NoReturn] public function beyondpullrates(): void
	{
		$this->checkSecret();

		$PullRates = new Rates\PullRates($this->test);
		$PullRates->pullRates();

		jexit();
	}

	/**
	 * Beyond push rate updates
	 *
	 * @throws Exception
	 * @throws RuntimeException
	 * @since  2.4.0
	 */
	#[NoReturn] public function beyondpushrates(): void
	{
		$this->checkSecret();

		$PushRates = new Rates\PushRates($this->test);
		if (method_exists($PushRates, 'processQueue')) {
			$queue = KrFactory::getListModel('servicequeues')->getQueueByServiceMethod($i->id, 'updateListing');
			if (is_countable($queue) && count($queue)) {
				foreach ($queue as $q) {
					//TODO-v4.3 Pass all queues to class
					$PushRates->processQueue($q);

					$actioned             = new stdClass();
					$actioned->id         = $q->id;
					$actioned->actioned   = 1;
					$actioned->updated_at = TickTock::getTS();
					KrFactory::update('service_queue', $actioned);
				}
			}
		}

		jexit();
	}

	/**
	 * Process channel availability queue
	 *
	 * @throws RuntimeException
	 * @throws Exception
	 * @since  1.2.2
	 */
	#[NoReturn] public function channelavailability(): void
	{
		$this->checkSecret();

		$services = $this->getServicesByType('c');
		foreach ($services as $s) {
			$class = match ($s->plugin) {
				'ru' => 'HighlandVision\Ru\Manager\Availability',
				'vrbo' => 'HighlandVision\Vrbo\Manager\Availability'
			};

			if (class_exists($class) && method_exists($class, 'processQueue')) {
				$queue =
					KrFactory::getListModel('servicequeues')->getQueueByServiceMethod($s->id, 'updateAvailability');
				if (is_countable($queue) && count($queue)) {
					$Availability = match ($s->plugin) {
						'ru' => new RuManager\Availability($this->test),
						'vrbo' => new VrboManager\Availability($this->test)
					};

					$Availability->processQueue($queue);
					KrMethods::cleanCache('com_knowres_contract');
				}
			}
		}

		jexit();
	}

	/**
	 * Call renamed functions
	 *
	 * @throws RuntimeException
	 * @throws Exception
	 * @since  3.3.1
	 */
	#[NoReturn] public function channelbookings(): void
	{
		self::channelavailability();
	}

	/**
	 * Process channel property queue
	 *
	 * @throws RuntimeException
	 * @throws Exception
	 * @since  1.2.2
	 */
	#[NoReturn] public function channelproperties(): void
	{
		$this->checkSecret();

		$services = self::getServicesByType('c');
		foreach ($services as $s) {
			$class = match ($s->plugin) {
				'ru' => 'HighlandVision\Ru\Manager\Properties',
				'vrbo' => 'HighlandVision\Vrbo\Manager\Properties'
			};

			if (class_exists($class)) {
				if (method_exists($class, 'processNew')) {
					$newbies = KrFactory::getListModel('servicexrefs')->getPropertiesForService($s->id, true);
					if (is_countable($newbies) && count($newbies)) {
						$Properties = match ($s->plugin) {
							'ru' => new RuManager\Properties($this->test),
							'vrbo' => new VrboManager\Properties($this->test)
						};

						foreach ($newbies as $n) {
							$Properties->processNew($n->property_id, $n->id);
						}
					}
				}

				if (method_exists($class, 'processQueue')) {
					$queue =
						KrFactory::getListModel('servicequeues')->getQueueByServiceMethod($s->id, 'updateProperty');
					if (is_countable($queue) && count($queue)) {
						$Properties = match ($s->plugin) {
							'ru' => new RuManager\Properties($this->test),
							'vrbo' => new VrboManager\Properties($this->test)
						};

						$Properties->processQueue($queue);
					}
				}
			}
		}

		jexit();
	}

	/**
	 * Process channel rate queue
	 *
	 * @throws RuntimeException|Exception
	 * @since  1.2.2
	 */
	#[NoReturn] public function channelrates(): void
	{
		$this->checkSecret();

		$services = self::getServicesByType('c');
		foreach ($services as $s) {
			$class = match ($s->plugin) {
				'ru' => 'HighlandVision\Ru\Manager\Rates',
				'vrbo' => 'HighlandVision\Vrbo\Manager\Rates'
			};

			if (class_exists($class) && method_exists($class, 'processQueue')) {
				$queue =
					KrFactory::getListModel('servicequeues')->getQueueByServiceMethod($s->id, 'updatePropertyRates');

				$Rates = match ($s->plugin) {
					'ru' => new RuManager\Rates($this->test),
					'vrbo' => new VrboManager\Rates($this->test)
				};
				$Rates->processQueue($queue);
			}
		}

		jexit();
	}

	/**
	 * Process channel booking sync
	 *
	 * @throws RuntimeException
	 * @throws Exception
	 * @since  1.2.2
	 */
	#[NoReturn] public function channelsync(): void
	{
		$this->checkSecret();

		$services = self::getServicesByType('c');
		foreach ($services as $s) {
			$class = match ($s->plugin) {
				'ru' => 'HighlandVision\Ru\Manager\Sync',
			};

			if (class_exists($class) && method_exists($class, 'doSync')) {
				$Sync = match ($s->plugin) {
					'ru' => new RuManager\Sync($this->test),
				};
				$Sync->doSync();
			}
		}

		jexit();
	}

	/**
	 * Factura update payments
	 *
	 * @throws Exception
	 * @throws RuntimeException
	 * @since  2.2.0
	 */
	#[NoReturn] public function factura(): void
	{
		$this->checkSecret();

		$services = self::getServicesByType('s');
		foreach ($services as $s) {
			if ($s->plugin == 'factura') {
				$Factura = new Factura($s->id, $this->test);
				$Factura->processQueue();
			}
		}

		jexit();
	}

	/**
	 * Import property ical files for all ical services
	 *
	 * @throws Exception
	 * @throws RuntimeException
	 * @since  2.1.0
	 */
	#[NoReturn] public function icalimport(): void
	{
		$this->checkSecret();

		$userSession            = new KrSession\User();
		$userData               = $userSession->getData();
		$userData->access_level = 40;
		$userSession->setData($userData);

		$services = self::getServicesByType('i');
		foreach ($services as $s) {
			$schedule   = 24;
			$parameters = Utility::decodeJson($s->parameters);
			if (isset($parameters->schedule)) {
				$schedule = $parameters->schedule;
			}

			$Ical = new Ical($s->id);
			$Ical->processSchedule($schedule);
		}

		jexit();
	}

	/**
	 * Process RU channel adhoc requests
	 *
	 * @throws RuntimeException
	 * @throws Exception
	 * @since  1.2.2
	 */
	#[NoReturn] public function rua(): void
	{
		$this->checkSecret();
		$method = KrMethods::inputString('method', null, 'get');
		if (!$method) {
			echo "Enter a method in the url";
			jexit();
		}

		$services = $this->getServicesByType('c');
		foreach ($services as $s) {
			if ($s->plugin == 'ru') {
				$class = 'HighlandVision\Ru\Manager';
				if (class_exists($class) && method_exists($class, $method)) {
					$Manager = new RuManager($this->test);
					$data    = $Manager->$method();
				}
			}
		}

		jexit();
	}

	/**
	 * Vintage Travel process API
	 * Add "availonly=1" to url to process availability only
	 *
	 * @throws Exception
	 * @since  3.3.3`
	 */
	#[NoReturn] public function vt(): void
	{
		$this->checkSecret();

		$services = self::getServicesByType('s');
		foreach ($services as $s) {
			if ($s->plugin == 'vt') {
				$VintageTravel = new VintageTravel($s->id, $this->test);
				$VintageTravel->updateApi();
			}
		}

		jexit();
	}

	//	/**
	//	 * Xero cron - update accounts
	//	 *
	//	 * @throws XeroPHPException
	//	 * @throws NotFoundException
	//	 * @throws RuntimeException
	//	 * @throws Exception
	//	 * @since  3.1.0
	//	 */
	//	#[NoReturn] public function xero()
	//	{
	//		$this->checkSecret();
	//
	//		$services = KrFactory::getListModel('services')->getServicesByPlugin('xero');
	//		foreach ($services as $s)
	//		{
	//			//TODO-v4.3 check for cancels xero Phase II
	//			//TODO-v4.3 check for edits xero Phase II
	//
	//			// Process any unactioned payments
	//			$queue = KrFactory::getListModel('contractpayments')->getPaymentQueue($s->agency_id);
	//			if (count($queue))
	//			{
	//				$payments = new Payments($s->id);
	//				$payments->processQueue($queue);
	//			}
	//		}
	//
	//		jexit();
	//	}

	/**
	 * Test that secret is valid
	 *
	 * @throws RuntimeException|Exception
	 * @since  1.0.0
	 */
	private function checkSecret(): void
	{
		$this->test = KrMethods::inputInt('test', 0, 'get');
		$secret     = KrMethods::inputString('secret', '', 'get');

		if (!$this->test && $secret != KrMethods::getCfg('secret')) {
			throw new RuntimeException('Secret does not match');
		}
	}

	/**
	 * Get services by type
	 *
	 * @param  string  $type  Service type
	 *
	 * @throws RuntimeException
	 * @since  1.2.0
	 * @return array
	 */
	private function getServicesByType(string $type): array
	{
		$services = KrFactory::getListModel('services')->getServicesByType($type);
		if (!count($services)) {
			throw new RuntimeException('No services found for type ' . $type);
		}

		return $services;
	}
}