<?php
/**
 * @package     Know Reservations
 * @subpackage  Library
 * @copyright   Copyright (c) 2020, Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\KR;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\Component\Knowres\Administrator\Model\ServiceModel;
use HighlandVision\Component\Knowres\Administrator\Model\ServicequeueModel;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use InvalidArgumentException;
use JetBrains\PhpStorm\Pure;
use Joomla\CMS\Cache\Cache;
use Joomla\Registry\Registry;
use RuntimeException;
use stdClass;

use function count;
use function implode;
use function str_repeat;
use function trim;

use const JPATH_ROOT;
use const LIBXML_ERR_ERROR;
use const LIBXML_ERR_FATAL;
use const LIBXML_ERR_WARNING;

/**
 * Service base
 *
 * @since  1.2.2
 */
abstract class Service
{
	/** @var Cache object */
	protected Cache $cache;
	/** @var  bool Cache storage type */
	protected bool $cache_json = true;
	/** @var  array Override cache options */
	protected array $cache_options = [];
	/** @var  object Existing contract item */
	protected object $contract;
	/** @var  int ID of current contract */
	protected int $contract_id = 0;
	/** @var ?object Contract guest data */
	protected ?object $contractguestdata = null;
	/** @var  string Path to cookie file */
	protected string $cookie_file = JPATH_ROOT . '/cookie.txt';
	/** @var  string Service currency */
	protected string $currency = '';
	/** @var  string Error display message */
	protected string $error_to_display = '';
	/** @var ?object Exception to be logged */
	protected ?object $exception = null;
	/** @var  string Foreign key */
	protected string $foreign_key = '';
	/** @var string Foreign key guest */
	protected string $foreign_key_guest = '';
	/** @var string Foreign key owner */
	protected string $foreign_key_owner = '';
	/** @var ?object Guest item */
	protected ?object $guest = null;
	/** @var  array Logging messages */
	protected array $messages = [];
	/** @var  string API method */
	protected string $method = '';
	/** @var ?object Owner item */
	protected ?object $owner = null;
	/** @var ?object Service parameters */
	protected ?object $parameters = null;
	/** @var  Registry KR parameters */
	protected Registry $params;
	/** @var ?object Property item */
	protected ?object $property = null;
	/** @var  int ID of property */
	protected int $property_id = 0;
	/** @var  int ID of Queue */
	protected int $queue_id = 0;
	/** @var  array Processed queue ids to be updated */
	protected array $queue_ids = [];
	/** @var  string Reply to email */
	protected string $reply_to = '';
	/** @var  mixed API request */
	protected mixed $request = '';
	/** @var  mixed API response */
	protected mixed $response = '';
	/** @var  object Service row */
	protected object $service;
	/** @var  int ID of service */
	protected int $service_id = 0;
	/** @var array Property settings */
	protected array $settings = [];
	/** @var  string Email subject */
	protected string $subject = '';
	/** @var  int Testing indicator */
	protected int $test = 0;
	/** @var  string Today Y-m-d */
	protected string $today = '';

	/**
	 * Initialize
	 *
	 * @param  int  $service_id  ID of service
	 * @param  int  $test        1 for testing
	 *
	 * @throws Exception
	 * @since   1.2.2
	 */
	public function __construct(int $service_id, int $test = 0)
	{
		$this->setService($service_id);
		$this->test   = $test;
		$this->today  = TickTock::getDate();
		$this->params = KrMethods::getParams();
	}

	/**
	 * Get installed services
	 *
	 * @throws Exception
	 * @since  4.0.0
	 * @return array
	 */
	public static function getServices(): array
	{
		// 0 - service type
		// 1 - 0 = free, 1 = paid, 2 = proprietary
		// 2 - 0 not installed, 1 installed
		// TODO-v4.1 Reinstate Xero
		$services = [
			'ical'          => ['i', 0, 0],
			'ru'            => ['c', 1, 0],
			'vrbo'          => ['c', 2, 0],
			'wire'          => ['g', 0, 0],
			'check'         => ['g', 0, 0],
			'paypal'        => ['g', 0, 0],
			'stripe'        => ['g', 0, 0],
			'exchange'      => ['s', 0, 0],
			'factura'       => ['s', 2, 0],
			'helpscout'     => ['s', 1, 0],
			'vintagetravel' => ['s', 2, 0],
			'mailchimp'     => ['s', 0, 0]
		];

		foreach ($services as $plugin => $data)
		{
			$list = KrFactory::getListModel('services')->getServicesByPlugin($plugin);
			if (is_countable($list) && count($list))
			{
				$services[$plugin][2] = 1;
			}
		}

		return $services;
	}

	/**
	 * Get service type escription
	 *
	 * @param  string  $type
	 *
	 * @since  4.0.0
	 * @return string
	 */
	public static function getType(string $type): string
	{
		return match ($type)
		{
			'c' => KrMethods::plain('COM_KNOWRES_SERVICE_TYPE_CHANNEL'),
			'g' => KrMethods::plain('COM_KNOWRES_SERVICE_TYPE_GATEWAY'),
			'i' => KrMethods::plain('COM_KNOWRES_SERVICE_TYPE_ICAL'),
			's' => KrMethods::plain('COM_KNOWRES_SERVICE_TYPE_SERVICE')
		};
	}

	/**
	 * Return guest display error
	 *
	 * @since 1.2.2
	 * @return string
	 */
	public function getErrorToDisplay(): string
	{
		if ($this->error_to_display)
		{
			return $this->error_to_display;
		}
		else
		{
			return KrMethods::plain('COM_KNOWRES_ERROR_FATAL');
		}
	}

	/**
	 * Logger service request and response
	 *
	 * @param  bool  $success  Logger success or failure
	 * @param  bool  $email    Set true for email notification
	 *
	 * @throws Exception
	 * @since 1.2.2
	 */
	protected function addLog(bool $success, bool $email = false): void
	{
		$error = $this->getErrorMessage($success);

		$log              = new stdClass();
		$log->id          = 0;
		$log->success     = (int) $success;
		$log->service_id  = $this->service_id;
		$log->queue_id    = $this->queue_id;
		$log->contract_id = $this->contract_id;
		$log->property_id = $this->property_id;
		$log->foreign_key = $this->foreign_key;
		$log->method      = $this->method;
		$log->errors      = $error;
		$log->request     = $this->request;
		$log->response    = $this->response;
		$log->subject     = $this->subject;
		$log->reply_to    = $this->reply_to;
		$log->created_at  = TickTock::getTS();
		$log_id           = KrFactory::insert('service_log', $log);

		if ($this->exception || $email)
		{
			$subject = "Attention: Alert from " . KrMethods::getCfg('sitename');
			$body    = 'An exception has occurred. Please see the details below.';
			$body    .= ' Full details of the error can be found in Service Logs for ID ' . $log_id;
			$body    .= "<br>";
			$body    .= $error;

			$to = KrMethods::getParams()->get('alert_email', '');
			if (empty($to))
			{
				$to = KrMethods::getCfg('mailfrom');
			}
			KrMethods::sendEmail(KrMethods::getCfg('mailfrom'), KrMethods::getCfg('fromname'), $to, $subject, $body);
		}

		$this->messages  = [];
		$this->exception = null;
	}

	/**
	 * Check if cache exists for method
	 *
	 * @param $method
	 *
	 * @since  2.2.0
	 * @return mixed
	 */
	protected function checkCache($method): mixed
	{
		if ($this->cache_json)
		{
			$data = Utility::decodeJson($this->cache->get($method), true);
		}
		else
		{
			$data = $this->cache->get($method);
		}

		return $data ?: false;
	}

	/**
	 * Display any errors found in xml string
	 *
	 * @param  object  $error  XML error data
	 * @param  string  $xml    XML string
	 *
	 * @since  4.0.0
	 * @return string
	 */
	public function displayXmlError(object $error, string $xml): string
	{
		$return[] = $xml[$error->line - 1];
		$return[] = str_repeat('-', $error->column);

		switch ($error->level)
		{
			case LIBXML_ERR_WARNING:
				$return[] = "Warning $error->code: ";
				break;
			case LIBXML_ERR_ERROR:
				$return[] = "Error $error->code: ";
				break;
			case LIBXML_ERR_FATAL:
				$return[] = "Fatal Error $error->code: ";
				break;
		}

		$return[] = trim($error->message) . 'Line: ' . $error->line . "Column: " . $error->column;

		if ($error->file)
		{
			$return[] = "File: $error->file";
		}

		return implode('<br>', $return);
	}

	/**
	 * Format errors for log
	 * Exception message if not success
	 * Notification messages if success
	 *
	 * @param  bool  $success  True or false
	 *
	 * @since   3.3.0
	 * @return string
	 */
	#[Pure] protected function getErrorMessage(bool $success): string
	{
		if (is_a($this->exception, 'Exception') || is_subclass_of($this->exception, 'Exception'))
		{
			$text = 'ERROR:' . $this->exception->getMessage() . '<br>';
		}
		else
		{
			$text = $success ? '' : 'ERROR:<br>';
		}

		if (is_countable($this->messages) && count($this->messages))
		{
			$text .= implode('<br>', $this->messages);
		}

		return $text;
	}

	/**
	 * Get property settings
	 *
	 * @param  int  $property_id  ID of property
	 *
	 * @throws InvalidArgumentException
	 * @since 1.2.2
	 */
	protected function getSettings(int $property_id): void
	{
		if (!$property_id)
		{
			throw new InvalidArgumentException('Property ID must be non zero');
		}

		$this->settings = KrFactory::getListModel('propertysettings')->getPropertysettings($property_id);
	}

	/**
	 * Read Contract
	 *
	 * @throws RuntimeException
	 * @throws InvalidArgumentException
	 * @throws Exception
	 * @since  1.2.2
	 */
	protected function readContract(): void
	{
		if (!$this->contract_id)
		{
			throw new InvalidArgumentException('Contract ID must be non zero');
		}

		$this->contract = KrFactory::getAdminModel('contract')->getItem($this->contract_id);
		if (!$this->contract->id)
		{
			throw new RuntimeException('Contract not found for id ' . $this->contract_id);
		}
	}

	/**
	 * Read Guest
	 *
	 * @throws RuntimeException|Exception
	 * @since 3.1.0
	 */
	protected function readGuest(): void
	{
		if (!$this->contract->guest_id)
		{
			throw new InvalidArgumentException('Contract Guest ID must be non zero');
		}

		$this->guest = KrFactory::getAdminModel('guest')->getItem($this->contract->guest_id);
		if (!$this->guest->id)
		{
			throw new RuntimeException('Guest not found for ID ' . $this->contract->guest_id);
		}
	}

	/**
	 * Read owner
	 *
	 * @throws RuntimeException|Exception
	 * @since 3.1.0
	 */
	protected function readOwner(): void
	{
		if (!$this->property->owner_id)
		{
			throw new InvalidArgumentException('Property ' . $this->property->property_name
				. ' does not have an owner assigned');
		}

		$this->owner = KrFactory::getAdminModel('owner')->getItem($this->property->owner_id);
		if (!$this->owner->id)
		{
			throw new RuntimeException('Owner not found for property owner id - ' . $this->property->owner_id);
		}
	}

	/**
	 * Read property
	 *
	 * @param  int  $property_id  ID of property
	 *
	 * @throws RuntimeException
	 * @throws InvalidArgumentException|Exception
	 * @since  1.2.2
	 */
	protected function readProperty(int $property_id): void
	{
		if (!$property_id)
		{
			throw new InvalidArgumentException('Property ID must be non zero');
		}

		$this->property = KrFactory::getAdminModel('property')->getItem($property_id);
		if (empty($this->property->id))
		{
			throw new RuntimeException('Property not found for ID ' . $property_id);
		}
	}

	/**
	 * Read service and format service parameters
	 *
	 * @throws Exception
	 * @since  1.2.2
	 */
	protected function readService(): void
	{
		/** @var ServiceModel $model */
		$model         = KrFactory::getAdminModel('service');
		$this->service = $model->getItem($this->service_id);
		if (empty($this->service->id))
		{
			throw new RuntimeException('Service not found for id ' . $this->service_id);
		}

		$this->currency   = $this->service->currency;
		$this->parameters = $this->service->parameters;
	}

	/**
	 * Set contract ID
	 *
	 * @param  int  $contract_id  ID of contract
	 *
	 * @throws InvalidArgumentException
	 * @since 1.2.2
	 */
	protected function setContractId(int $contract_id): void
	{
		if (!is_numeric($contract_id) || !$contract_id)
		{
			throw new InvalidArgumentException('Contract ID should consist of numbers only and should not be zero');
		}

		$this->contract_id = $contract_id;
	}

	/**
	 * Update queue records to actioned
	 *
	 * @throws Exception
	 * @since 3.1.0
	 */
	protected function setQueueActioned(): void
	{
		if (is_countable($this->queue_ids) && count($this->queue_ids))
		{
			ServicequeueModel::setQueueActioned($this->queue_ids);
		}
	}

	/**
	 * Set the service
	 *
	 * @param  int  $service_id  ID of service
	 *
	 * @throws InvalidArgumentException
	 * @throws Exception
	 * @since  1.2.2
	 */
	protected function setService(int $service_id): void
	{
		if (!is_numeric($service_id) || !$service_id)
		{
			throw new InvalidArgumentException('Sorry we are unable to identify you so we cannot process your request');
		}

		$this->service_id = $service_id;
		$this->readService();
	}

	/**
	 * Store cache for method
	 *
	 * @param  array   $data    The data to be stored
	 * @param  string  $method  The method used to store / retrieve the data
	 *
	 * @since 2.2.0
	 */
	protected function storeCache(array $data, string $method): void
	{
		if ($this->cache_json)
		{
			$this->cache->store(Utility::encodeJson($data), $method);
		}
		else
		{
			$this->cache->store($data, $method);
		}
	}
}