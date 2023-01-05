<?php
/**
 * @package     Know Reservations
 * @subpackage  Site Controller
 * @copyright   Copyright (c) 2020, Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\KR\Service;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\Component\Knowres\Administrator\Model\ServicequeueModel;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Service;
use HighlandVision\KR\Utility;
use InvalidArgumentException;
use RuntimeException;

/**
 * Service Beyond pricing
 *
 * @since 2.4.0
 */
class Beyond extends Service
{
	/** @var array Locally connected Beyond properties */
	protected array $xrefs = [];

	/**
	 * @param   int  $test  1 for testing
	 *
	 * @throws Exception
	 * @throws Exception
	 * @throws Exception
	 * @since  2.4.0
	 */
	public function __construct(int $test = 0)
	{
		parent::__construct(KrFactory::getListModel('services')::checkForSingleService(true, 'beyond'), $test);

		$this->setXrefs();
	}

	/**
	 * Update beyond for min / base rate update
	 *
	 * @param   int  $property_id  ID of property
	 *
	 * @throws Exception
	 * @since  2.4.0
	 */
	public static function settingRateUpdate(int $property_id)
	{
		$services = KrFactory::getListModel('services')->getServicesByPlugin('beyond');
		foreach ($services as $i)
		{
			$result = KrFactory::getListModel('serviceXrefs')->getServiceProperty($i->id, $property_id);
			if (is_countable($result))
			{
				foreach ($result as $r)
				{
					ServicequeueModel::insertQueue($r, 'updateListing');
				}
			}
		}
	}

	/**
	 * Push data to Beyond via Curl
	 *
	 * @param   mixed  $request  API data
	 * @param ?string  $param    Parameter for method
	 *
	 * @throws InvalidArgumentException
	 * @since  2.4.0
	 * @return mixed
	 */
	protected function sendCurlRequest(mixed $request = null, ?string $param = ''): mixed
	{
		if (!$this->method)
		{
			throw new InvalidArgumentException('Method not set for Curl Request');
		}

		usleep(30000);

		$url = $this->parameters->url . $this->method;
		if (!empty($param))
		{
			$url .= '/' . $param;
		}

		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_HTTPHEADER, array(
			"Accept: application/json",
			"Content-Type: application/json",
			"Token:" . $this->parameters->apikey
		));

		if (!is_null($request))
		{
			curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'POST');
			curl_setopt($ch, CURLOPT_POSTFIELDS, $request);
			$this->request = $request;
		}
		else
		{
			curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET');
			$this->request = '';
		}

		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_ENCODING, '');
		curl_setopt($ch, CURLOPT_MAXREDIRS, 10);
		curl_setopt($ch, CURLOPT_TIMEOUT, 30);
		curl_setopt($ch, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_1);
		curl_setopt($ch, CURLINFO_HEADER_OUT, true);
		curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 2);
		curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
		curl_setopt($ch, CURLOPT_COOKIEFILE, $this->cookie_file);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
		$this->response = curl_exec($ch);

		$http_status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
		if ($http_status != 200)
		{
			throw new RuntimeException('CURL Services Failure HTTP Status error ' . $http_status);
		}
		if (curl_errno($ch))
		{
			throw new RuntimeException('CURL Services Failure ' . curl_errno($ch));
		}
		if (!$this->response)
		{
			throw new RuntimeException(KrMethods::plain('Response data not received from Beyond'));
		}

		$data = Utility::decodeJson($this->response);
		if (isset($data->status) && $data->status != 'ok')
		{
			throw new RuntimeException(KrMethods::plain('Unsuccessful response from Beyond') . $data->status);
		}

		curl_close($ch);

		return $data;
	}

	/**
	 * Get all the property Xrefs for this channel
	 *
	 * @throws RuntimeException
	 * @since  2.4.0
	 */
	protected
	function setXrefs()
	{
		$properties = KrFactory::getListModel('servicexrefs')->getPropertiesForService($this->service_id);
		foreach ($properties as $p)
		{
			$this->xrefs[$p->property_id] = $p->foreign_key;
		}
	}
}