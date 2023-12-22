<?php
/**
 * @package     Know Reservations
 * @subpackage  Library
 * @copyright   Copyright (c) 2020, Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\KR\Service;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\IcalBlock;
use HighlandVision\KR\Logger;
use HighlandVision\KR\Service;
use HighlandVision\KR\Utility;
use RuntimeException;

use function file_exists;
use function file_get_contents;
use function unlink;

/**
 * Service ical helper
 *
 * @since 1.0.0
 */
class Ical extends Service
{
	/** @var string ics file directory */
	protected string $directory;
	/** @var string Array of valid events */
	protected string $fields;
	/** @var string ics file name */
	protected string $filename;
	/** @var string ics file path */
	protected string $path;

	/**
	 * Initialize
	 *
	 * @param  int  $service_id  ID of service
	 *
	 * @throws Exception
	 * @since 1.0.0
	 */
	public function __construct(int $service_id)
	{
		parent::__construct($service_id);

		$this->directory = Utility::getPath('root') . '/tmp/';
		$this->filename  = 'knowres.ics';
		$this->path      = $this->directory . $this->filename;
	}

	/**
	 * Import manual request from ical page
	 *
	 * @param  int      $ical_id      ID of property ical row
	 * @param  int      $property_id  ID of property
	 * @param  string   $link         Link to ical file to import
	 * @param  ?string  $icsdata      Previous run ical data
	 *
	 * @throws Exception
	 * @since  4.0.0
	 */
	public function processManual(int $ical_id, int $property_id, string $link, ?string $icsdata): void
	{
		try
		{
			$this->method  = 'processManual';
			$this->request = $link;
			$this->readProperty($property_id);
			$this->response = $this->fetchIcal();

			$IcalBlock = new IcalBlock($property_id, $this->directory, $this->filename, $this->service->id, $icsdata);
			$icsdata   = $IcalBlock->import();
			KrFactory::getListModel('propertyicals')->updateLastUpdated($ical_id, $icsdata);
		}
		catch (Exception $e)
		{
			Logger::logMe($e->getMessage());
			KrMethods::message('COM_KNOWRES_ERROR_TRY_AGAIN_CHECK');
		}

		if (file_exists($this->directory . $this->filename))
		{
			unlink($this->directory . $this->filename);
		}
	}

	/**
	 * Import icals as per schedule
	 *
	 * @param  int  $hours  Import schedule e.g. every 1,2 4 ..... 24 hours
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	public function processSchedule(int $hours): void
	{
		$due = KrFactory::getListModel('propertyicals')->getByTime($this->service->id, $hours);
		foreach ($due as $d)
		{
			$this->method      = 'processSchedule';
			$this->request     = $d->link;
			$this->property_id = $d->property_id;

			try
			{
				$this->readProperty($this->property_id);
				$this->response = $this->fetchIcal();

				$IcalBlock      = new IcalBlock($this->property_id, $this->directory, $this->filename,
					$this->service->id, $d->icsdata);
				$icsdata        = $IcalBlock->import();
				$this->messages = $IcalBlock->getMessages();
				KrFactory::getListModel('propertyicals')->updateLastUpdated($d->id, $icsdata);
			}
			catch (Exception $e)
			{
				$this->exception = $e;
				$this->addLog(false);
			}

			if (file_exists($this->directory . $this->filename))
			{
				unlink($this->directory . $this->filename);
			}
		}
	}

	/**
	 * Retrieve ical data from link and save to file
	 *
	 * @throws RuntimeException
	 * @since  3.2.0
	 * @return string
	 */
	protected function fetchIcal(): string
	{
		$fp = fopen($this->path, 'w');

		usleep(10000);

		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $this->request);
		curl_setopt($ch, CURLOPT_FILE, $fp);
		curl_setopt($ch, CURLOPT_HEADER, false);
		curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 30);
		curl_setopt($ch, CURLOPT_TIMEOUT, 30);
		curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
		curl_exec($ch);

		$http_status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
		if ($http_status != 200)
		{
			$error   = [];
			$error[] = 'Error reading calendar from Host site';
			$error[] = 'Service: ' . $this->service->name;
			$error[] = 'Property: ' . $this->property->property_name;
			$error[] = 'CURL Services Failure HTTP Status error ' . $http_status;
			$error[] = 'CURL Services Failure ' . curl_errno($ch);
			$error[] = 'Curl error message ' . curl_error($ch);
			throw new RuntimeException(implode("\r\n", $error));
		}
		else if (curl_errno($ch))
		{
			$error   = [];
			$error[] = 'Error reading calendar from Host site';
			$error[] = 'Service: ' . $this->service->name;
			$error[] = 'Property: ' . $this->property->property_name;
			$error[] = 'CURL Services Failure ' . curl_errno($ch);
			$error[] = 'Curl error message ' . curl_error($ch);
			throw new RuntimeException(implode("\r\n", $error));
		}

		curl_close($ch);
		fclose($fp);

		return file_get_contents($this->path, true);
	}
}