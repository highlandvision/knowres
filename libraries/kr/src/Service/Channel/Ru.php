<?php
/**
 * @package     Know Reservations
 * @subpackage  Site Controller
 * @copyright   Copyright (c) 2020, Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\KR\Service\Channel;

defined('_JEXEC') or die;

use DOMDocument;
use Exception;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Service\Channel;
use JetBrains\PhpStorm\NoReturn;
use RuntimeException;
use SimpleXMLElement;

use function curl_close;
use function curl_errno;
use function dom_import_simplexml;
use function htmlentities;
use function implode;
use function str_replace;
use function trim;

/**
 * Service channel for Rentals United
 *
 * @since  3.3.1
 */
class Ru extends Channel
{
	/** @var int Maximum nights to calculate */
	protected int $advance_bookings = 365;
	/** @var int Additional fees cleaning */
	protected int $cleaning_fee_type = 41;
	/** @var array Properties linked to RU */
	protected array $properties;
	/** @var array Additional fees tax types */
	protected array $tax_fee_types = ['LOCAL' => 1, 'VAT' => 2, 'TOURIST' => 3, 'CITY' => 4];

	/**
	 * Constructor
	 *
	 * @param   int  $test  1 for testing
	 *
	 * @throws Exception
	 * @since  2.3.0
	 */
	public function __construct(int $test = 0)
	{
		parent::__construct(KrFactory::getListModel('services')::checkForSingleService(true, 'ru'), $test);

		$this->cache_options = ['cachebase'    => JPATH_ADMINISTRATOR . '/cache',
		                        'lifetime'     => 108000,
		                        'caching'      => true,
		                        'defaultgroup' => 'com_knowres_service_ru'];
		$this->cache         = KrMethods::getCache($this->cache_options);
	}

	/**
	 * Send data via Curl
	 *
	 * @throws Exception
	 * @since  2.2.0
	 * @return SimpleXMLElement
	 */
	public function sendCurlRequest(): SimpleXMLElement
	{
		$this->response = '';

		if ($this->request)
		{
			usleep(300000);

			$ch = curl_init();
			curl_setopt($ch, CURLOPT_URL, $this->parameters->url);
			curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/xml', 'Expect:'));
			curl_setopt($ch, CURLOPT_POST, 1);
			curl_setopt($ch, CURLOPT_POSTFIELDS, trim($this->request));
			curl_setopt($ch, CURLINFO_HEADER_OUT, true);
			curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 120);
			curl_setopt($ch, CURLOPT_COOKIEJAR, $this->cookie_file);
			curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
			curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
			curl_setopt($ch, CURLOPT_HEADER, false);
			curl_setopt($ch, CURLOPT_TIMEOUT, 300);
			curl_setopt($ch, CURLOPT_FRESH_CONNECT, true);

			$this->response = curl_exec($ch);
			$http_status    = curl_getinfo($ch, CURLINFO_HTTP_CODE);

			$errno = curl_errno($ch);
			curl_close($ch);

			if ($http_status != 200)
			{
				throw new Exception('CURL Services Failure HTTP Status error ' . $http_status);
			}
			else if ($errno > 0)
			{
				if ($errno == 28)
				{
					throw new Exception('CURL Timeout: Job aborted');
				}
				else
				{
					throw new Exception('CURL Services Failure ' . $errno);
				}
			}
			else
			{
				$xml    = iconv(mb_detect_encoding($this->response), 'utf-8', $this->response);
				$simple = new SimpleXMLElement($xml);

				if (!isset($simple->Status['ID']) && $simple->Status != 'Success')
				{
					throw new Exception('RU did not return Status. Error: ' . $simple->__toString());
				}
				else if (!isset($simple->Status['ID']))
				{
					throw new Exception('RU did not return Status. Error: ' . $simple->__toString());
				}
				else if ((int) $simple->Status['ID'])
				{
					$this->checkNotifs($simple);

					throw new RuntimeException('RU returned error status');
				}
			}

			return $simple;
		}

		throw new RuntimeException('RU no data was setup to send via CURL');
	}

	/**
	 * Add autehntcation details to request
	 *
	 * @param   SimpleXMLElement  $xml  Current build
	 *
	 * @since  3.3.1
	 * @return SimpleXMLElement
	 */
	protected function addAuthentication(SimpleXMLElement $xml): SimpleXMLElement
	{
		$authenticationXml = $xml->addChild('Authentication');
		$authenticationXml->addChild('UserName', $this->parameters->username);
		$authenticationXml->addChild('Password', $this->parameters->password);

		return $xml;
	}

	/**
	 * Checks for any error notification in xml response.
	 * These can indicate success messages but with some individual errors for
	 * availability ranges that are set for service log messages
	 *
	 * @param   SimpleXMLElement  $simple
	 *
	 * @since  3.4.0
	 */
	protected function checkNotifs(SimpleXmlElement $simple)
	{
		$this->messages[] = 'ERROR ' . $simple->Status['ID'] . ' ' . $simple->Status;

		if (isset($simple->Notifs->Notif))
		{
			foreach ($simple->Notifs->Notif as $notif)
			{
				$text   = [];
				$text[] = 'Status: ' . $notif['StatusID'];
				if (isset($notif['DateFrom']))
				{
					$text[] = 'DateFrom: ' . $notif['DateFrom'];
				}
				if (isset($notif['DateTo']))
				{
					$text[] = 'DateTo: ' . $notif['DateTo'];
				}
				$text[]           = 'Message: ' . $notif;
				$this->messages[] = implode(' ', $text);
			}
		}
	}

	/**
	 * Convert RU country to our country using country name
	 * Not the best but will have to do!
	 *
	 * @param   int  $location  ID of location
	 *
	 * @throws Exception
	 * @since  2.2.0
	 * @return int
	 */
	protected function convertCountry(int $location): int
	{
		$name = $this->getLocationName($location);
		if ($name)
		{
			$countries = KrFactory::getListModel('countries')->getAll();
			if ($countries)
			{
				foreach ($countries as $c)
				{
					if ($c->name == $name)
					{
						return $c->id;
					}
				}
			}
		}

		return 0;
	}

	/**
	 * Get the RU location name for a given RU locationID
	 *
	 * @param   int  $locationID  RU Location id
	 *
	 * @throws Exception
	 * @since   2.2.0
	 * @return string
	 */
	protected function getLocationName(int $locationID): string
	{
		$name = '';
		if (!$locationID)
		{
			return $name;
		}

		$method   = $this->method;
		$request  = $this->request;
		$response = $this->response;

		$xml = new SimpleXMLElement('<Pull_GetLocationDetails_RQ></Pull_GetLocationDetails_RQ>');
		$xml = $this->addAuthentication($xml);
		$xml->addChild('LocationID', $locationID);
		$simple = $this->sendXml($xml, 'Pull_GetLocationDetails_RQ');
		foreach ($simple->Locations->Location as $location)
		{
			if ((int) $location['LocationTypeID'] == 2)
			{
				$name = (string) $location[0];
				break;
			}
		}

		$this->method   = $method;
		$this->request  = $request;
		$this->response = $response;

		return $name;
	}

	//	/**
	//	 * Convert country name to RU locationID
	//	 *
	//	 * @param  string  $country  Country name
	//	 *
	//	 * @throws Exception
	//	 * @since   2.2.0
	//	 * @return int
	//	 */
	//	protected function convertCountryName(string $country): int
	//	{
	//		//TODO-v4.1 Is used after all RU changes?
	//		$data        = $this->pullCountries();
	//		$location_id = array_search($country, $data);
	//		if ($location_id !== false)
	//		{
	//			return $location_id;
	//		}
	//		else
	//		{
	//			return 0;
	//		}
	//	}

	/**
	 * Get the RU location type for a given RU location
	 *
	 * @param   int  $location  Location id as returned by getLocationByCoordinates
	 *
	 * @throws Exception
	 * @since   2.2.0
	 * @return int
	 */
	protected function getLocationType(int $location): int
	{
		$type = 0;
		if (!$location)
		{
			return $type;
		}

		$xml = new SimpleXMLElement('<Pull_GetLocationDetails_RQ></Pull_GetLocationDetails_RQ>');
		$xml = $this->addAuthentication($xml);
		$xml->addChild('LocationID', $location);
		$simple = $this->sendXml($xml, 'Pull_GetLocationDetails_RQ');
		foreach ($simple->Locations->Location as $location)
		{
			if ((int) $location['LocationID'] == $location)
			{
				$type = (int) $location['LocationTypeID'];
				break;
			}
		}

		return $type;
	}

	/**
	 * Write to error log when LNM fails.
	 *
	 * @param   string  $message  Error message
	 * @param   string  $file     File wehre error occurred
	 * @param   int     $line     Line where erro occurred
	 *
	 * @throws Exception
	 * @since  3.3.0
	 */
	#[NoReturn] protected function sendNokBookingResponse(string $message = '', string $file = '', int $line = 0): void
	{
		$this->messages[] = $message;
		if ($file)
		{
			$this->messages[] = $file . ' @ ' . $line;
		}

		$this->addLog(false);

		jexit();
	}

	/**
	 * Format and send xml
	 *
	 * @param   SimpleXMLElement  $xml     Xml node
	 * @param   string            $method  Methods to be used
	 *
	 * @throws Exception
	 * @since  3.3.0
	 * @return SimpleXMLElement
	 */
	protected function sendXml(SimpleXMLElement $xml, string $method): SimpleXMLElement
	{
		if (!$this->test)
		{
			$dom                                    = dom_import_simplexml($xml);
			$dom->ownerDocument->preserveWhiteSpace = false;
			$dom->ownerDocument->formatOutput       = true;

			$this->request = $dom->ownerDocument->saveXML($dom->ownerDocument->documentElement);
			$this->method  = $method;

			return $this->sendCurlRequest();
		}
		else
		{
			$dom                     = new DOMDocument;
			$dom->preserveWhiteSpace = false;
			$dom->loadXML($xml->asXml());
			$dom->formatOutput = true;
			$output            = str_replace('<?xml version="1.0"?>', '', $dom->saveXML());
			echo '<pre>' . htmlentities($output) . '</pre>';

			return $xml;
		}
	}

	/**
	 * Set node attributes.
	 *
	 * @param   SimpleXMLElement  $node  XML node
	 *
	 * @since  3.3.3
	 * @return array
	 */
	protected function setAttributes(SimpleXmlElement $node): array
	{
		$a = [];
		foreach ($node->attributes() as $key => $value)
		{
			$a[$key] = (string) $value[0];
		}

		return $a;
	}
}