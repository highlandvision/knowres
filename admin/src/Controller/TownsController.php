<?php
/**
 * @package    Know Reservations
 * @subpackage Admin Controllers
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Administrator\Controller;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use Joomla\CMS\MVC\Controller\AdminController;
use Joomla\CMS\MVC\Model\BaseDatabaseModel;
use Joomla\CMS\Response\JsonResponse;

use function array_keys;
use function array_values;
use function jexit;

/**
 * Towns controller list class.
 *
 * @since 1.0.0
 */
class TownsController extends AdminController
{
	/**
	 * Return json data for remotechained
	 *
	 * @since 1.0.0
	 */
	public function chained()
	{
		try
		{
			$region_id     = $this->input->getInt('region_id', 0);
			$allowProperty = $this->input->getBool('allow_property', false);
			$required      = $this->input->getBool('required', true);

			$data = [];
			if (!$required)
			{
				$data[0] = KrMethods::plain('COM_KNOWRES_ALL');
			}

			if ($region_id)
			{
				$items = KrFactory::getListModel('towns')->getByRegion($region_id, $allowProperty);
				foreach ($items as $i)
				{
					$data[$i->id] = $i->name;
				}
			}

			$wrapper      = [];
			$wrapper['k'] = array_keys($data);
			$wrapper['v'] = array_values($data);

			echo new JsonResponse($wrapper);
			jexit();
		}
		catch (Exception)
		{
			echo new JsonResponse(null, KrMethods::plain('COM_KNOWRES_ERROR_TRY_AGAIN'), true);
			jexit();
		}
	}

	/**
	 * Proxy for getModel.
	 *
	 * @param   string  $name    Model name
	 * @param   string  $prefix  Model prefix administrator or site (defaults to administrator)
	 * @param   array   $config  Config options
	 *
	 * @since  1.6
	 * @return bool|BaseDatabaseModel
	 */
	public function getModel($name = 'town', $prefix = 'Administrator',
		$config = ['ignore_request' => true]): BaseDatabaseModel|bool
	{
		return parent::getModel($name, $prefix, $config);
	}

	//	/**
	//	 * Load the towns for a country from geonames
	//	 *
	//	 * @throws Exception
	//	 * @since  1.0.0
	//	 */
	//	public function import()
	//	{
	//		$country_iso = KrMethods::inputString('country_iso', '', 'get');
	//		$country_id  = KrMethods::inputInt('country_id', 0, 'get');
	//		if (!$country_iso || !$country_id)
	//		{
	//			return;
	//		}
	//
	//		$badParams  = false;
	//		$clearTable = true;
	//		$file       = JPATH_SITE . '/media/com_knowres/import/' . $country_iso . '.txt';
	//
	//		try
	//		{
	//			if (!file_exists($file))
	//			{
	//				throw new Exception ('File does not exist: ' . $file);
	//			}
	//
	//			$handle = fopen($file, 'r');
	//			if (!$handle)
	//			{
	//				throw new Exception('Failed to open file for reading: ' . $file);
	//			}
	//
	//			// Clear table
	//			echo 'Deleting all towns for country...';
	//			$db         = Factory::getDatabase();
	//			$query      = $db->getQuery(true);
	//			$conditions = [$db->qn('country_id') . '=' . $country_id];
	//			$query->delete($db->qn('#__knowres_town'));
	//			$query->where($conditions);
	//			$db->setQuery($query);
	//			$result = $db->query();
	//
	//			// Do the import
	//			$startTime = microtime(true);
	//			echo 'Importing:';
	//			$i = 0;
	//
	//			$line = fgets($handle);
	//			while ($line)
	//			{
	//				$i++;
	//				$line        = str_replace("\n", "", $line);
	//				$fieldValues = explode("\t", $line);
	//
	//				if (!is_countable($fieldValues) || count($fieldValues) != 19)
	//				{
	//					echo "ERROR in line $i: Invalid field count";
	//					continue;
	//				}
	//
	//				if ($fieldValues[7] == "PPLA" || $fieldValues[7] == "PPLA2" || $fieldValues[7] == "PPLA3")
	//				{
	//					$admincode = $fieldValues[10];
	//
	//					$db    = Factory::getDatabase();
	//					$query = $db->getQuery(true);
	//
	//					// Get the region name
	//					if ((int) $admincode)
	//					{
	//						$query->select($db->qn('id'))
	//						      ->from($db->qn('#__knowres_region'))
	//						      ->where($db->qn('country_id') . '=' . $country_id)
	//						      ->where($db->qn('code') . '=' . (int) $admincode)
	//						      ->setLimit(1);
	//
	//						$db->setQuery($query);
	//						$region_id = $db->loadResult();
	//					}
	//					else
	//					{
	//						$region_id = 0;
	//					}
	//
	//					// This array is the fieldname to value mapping. Change the key if you are using different
	//					// field names in your table from those provided by geonames
	//					$fields             = new stdClass;
	//					$fields->name       = $fieldValues[1];
	//					$fields->name_ascii = $fieldValues[2];
	//					$fields->lat        = $fieldValues[4];
	//					$fields->lng        = $fieldValues[5];
	//					$fields->country_id = $country_id;
	//					$fields->region_id  = (int) $region_id;
	//					$fields->timezone   = $fieldValues[17];
	//					$fields->currency   = "EUR";
	//					$fields->state      = 1;
	//					$fields->created_at = TickTock::getTs();
	//
	//					$result = Factory::getDatabase()->insertObject('#__knowres_town', $fields);
	//				}
	//			}
	//
	//			fclose($handle);
	//		}
	//		catch (Exception $e)
	//		{
	//			echo "Error: {$e->getMessage()}\n";
	//		}
	//	}
}