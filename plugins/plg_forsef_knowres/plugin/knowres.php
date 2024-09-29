<?php
/**
 * @package     Know Reservations
 * @subpackage  4sef
 * @copyright   2022 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

namespace Weeblr\Forsef\Platform\Extensions;

defined('_JEXEC') || defined('WBLIB_EXEC') || die;

use Exception;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Translations;
use Joomla\CMS\Factory;
use Joomla\CMS\Uri;
use RuntimeException;
use stdClass;

use function count;
use function defined;

/**
 * Sample plugin to build URL for a com_sample component.
 * - Drop the "com_" at the start from the component to name the class
 * - Below are only the most important methods. For more advanced logic,
 * - Be sure to check the built-in plugins in /plugins/system/forsef/platform/extensions
 */
class Knowres extends Base
{
	/**
	 * Stores factory instance.
	 *
	 * @param  string  $option   Extension this applies to, in com_xxx format.
	 * @param  array   $options  Can inject custom factory and platform.
	 */
	public function __construct($option, $options = [])
	{
		parent::__construct($option, $options);
	}

	/**
	 * Builds the SEF URL for a non-sef.
	 *
	 * @param  Uri\Uri  $uriToBuild
	 * @param  Uri\Uri  $platformUri
	 * @param  Uri\Uri  $originalUri
	 *
	 * @throws Exception
	 * @return ?array
	 */
	public function build($uriToBuild, $platformUri, $originalUri): ?array
	{
		$sefSegments = parent::build($uriToBuild, $platformUri, $originalUri);

		if ($uriToBuild->getVar('format') == 'raw') {
			return [];
		}

		if ($uriToBuild->getVar('retain') == 1) {
			return [];
		}

		Factory::getLanguage()->load('com_knowres', JPATH_SITE . '/components/com_knowres');
		$Translations = new Translations();
		$params       = KrMethods::getParams();

		$view        = $uriToBuild->getVar('view');
		$area        = $uriToBuild->getVar('property_area');
		$category_id = $uriToBuild->getVar('category_id');
		$feature_id  = $uriToBuild->getVar('feature_id');
		$id          = $uriToBuild->getVar('id', 0);
		$Itemid      = $uriToBuild->getVar('Itemid');
		$alias       = $this->setAlias($Itemid);
		$layout      = $uriToBuild->getVar('layout');
		$property_id = $uriToBuild->getVar('property_id', 0);
		$region_id   = $uriToBuild->getVar('region_id', 0);
		$search      = $uriToBuild->getVar('search', 0);
		$solo_region = '';
		$task        = $uriToBuild->getVar('task');
		$type_id     = $uriToBuild->getVar('type_id');

		$delvar = true;
		switch ($view) {
			case 'contact':
				$sefSegments[] = KrMethods::plain('COM_KNOWRES_SEND_AN_ENQUIRY');
				break;
			case 'property':
				if ($id) {
					$pdata = $this->getPropertyData($id);
					switch ($params->get('seo_property', 1)) {
						case 1:
							$sefSegments[] = $pdata->region . '-' . $pdata->area . '-' . $pdata->type;
							$sefSegments[] = $pdata->name;
							break;
						case 2:
							$sefSegments[] = $pdata->region;
							$sefSegments[] = $pdata->area . '-' . $pdata->type;
							$sefSegments[] = $pdata->name;
							break;
						case 3:
							$sefSegments[] = $pdata->region;
							$sefSegments[] = $pdata->area;
							$sefSegments[] = $pdata->type;
							$sefSegments[] = $pdata->name;
							break;
						case 4:
							$sefSegments[] = $pdata->name . '-' . $pdata->area;
							break;
						case 5:
							$sefSegments[] = $pdata->type;
							$sefSegments[] = $pdata->name;
							break;
						default:
							throw new RuntimeException('Invalid value received for KR params seo-property');
					}
				}
				break;
			case 'reviews':
				if ($property_id) {
					$pdata = $this->getPropertyData($property_id);
					switch ($params->get('seo_property', 1)) {
						case 1:
							$sefSegments[] = $pdata->region . '-' . $pdata->area . '-' . $pdata->type;
							break;
						case 2:
							$sefSegments[] = $pdata->region;
							$sefSegments[] = $pdata->area . '-' . $pdata->type;
							break;
						default:
							$sefSegments[] = $pdata->region;
							$sefSegments[] = $pdata->area;
							$sefSegments[] = $pdata->type;
					}

					$sefSegments[] = $pdata->name;
					$sefSegments[] = 'reviews';
				}
				break;
			case 'properties':
				$Translations = new Translations;
				if ($region_id) {
					if ($params->get('seo_search_country', 0)) {
						$item = KrFactory::getAdminModel('region')->getItem($region_id);
						$sefSegments[] = $Translations->getText('region', $region_id) . '-' . $item->country_name;
					} else {
						$sefSegments[] = $Translations->getText('region', $region_id);
					}
				} elseif ($category_id) {
					$sefSegments[] = $Translations->getText('category', $category_id);
				} elseif ($layout) {
					$sefSegments[] = $alias;
				}

				if (empty($sefSegments)) {
					$sefSegments[] = $params->get('seo_search') ? $params->get('seo_search') : $alias;
				}

				if ($area) {
					$sefSegments[] = $area;
				}
				if ($type_id) {
					$sefSegments[] = $Translations->getText('type', $type_id);
				}
				if ($feature_id) {
					$abbv          = $Translations->getText('propertyfeature', $feature_id, 'abbreviation');
					$sefSegments[] = $abbv . '-' . $feature_id;
				}

				break;
			default:
				if (!$view || !$alias) {
					$dosef = false;
				} else {
					$sefSegments[] = $alias;
					$platformUri->delvar('view');
				}
		}

		if (!count($sefSegments) && !empty($alias)) {
			$sefSegments[] = $alias;
		}

		if (count($sefSegments)) {
			$platformUri->delvar('arrival');
			$platformUri->delvar('arrivaldsp');
			$platformUri->delvar('bedrooms');
			$platformUri->delvar('category_id');
			$platformUri->delvar('day');
			$platformUri->delvar('departure');
			$platformUri->delvar('departuredsp');
			$platformUri->delvar('feature_id');
			$platformUri->delvar('flexible');
			$platformUri->delvar('guests');
			$platformUri->delvar('id');
			$platformUri->delvar('Itemid');
			$platformUri->delvar('lang');
			$platformUri->delvar('layout');
			$platformUri->delvar('limit');
			$platformUri->delvar('limitstart');
			$platformUri->delvar('month');
			$platformUri->delvar('nights');
			$platformUri->delvar('option');
			$platformUri->delvar('property_area');
			$platformUri->delvar('property_id');
			$platformUri->delvar('region_id');
			$platformUri->delvar('retain');
			$platformUri->delvar('search');
			$platformUri->delvar('task');
			$platformUri->delvar('type_id');
			$platformUri->delvar('view');
		}

		return $sefSegments;
	}

	/**
	 * Participate in building a normalized non-sef URL based on an incoming URI. Query vars values are URL-encoded.
	 * Stripping slugs, sorting vars and possibly other things are taken care globally. Only plugin-specific
	 * vars processing should happen here. For instance, stripping pagination variables if the plugin
	 * handles pagination dynamically.
	 *
	 * @param  array  $vars
	 *
	 * @return array
	 */
	public function buildNormalizedNonSef($vars): array
	{
		return $this->nonSefHelper->stripFeedVars(
			parent::buildNormalizedNonSef($vars)
		);
	}

	/**
	 * Check if URI should to be left non-sef.
	 *
	 * @param  Uri\Uri  $uri
	 *
	 * @throws Exception
	 * @return bool
	 */
	public function shouldLeaveNonSef($uri): bool
	{
		if ($uri->getVar('format') == "raw") {
			return true;
		}

		if ($uri->getVar('task')) {
			return true;
		}

		if (KrMethods::getUser()->id) {
			return true;
		}

		return false;
	}

	/**
	 * Get property fields for property, contact or reviews
	 *
	 * @param  int  $key  Property ID
	 *
	 * @throws Exception
	 * @return object
	 */
	protected function getPropertyData(int $key): object
	{
		$property = KrFactory::getAdminModel('property')->getItem($key);
		if (!$property) {
			throw new RuntimeException('Property ID not found for ID ' . $key);
		}

		$data         = new stdClass();
		$data->name   = $property->property_name;
		$data->area   = $property->property_area;
		$data->region = $property->region_name;
		$data->type   = $property->type_abbreviation;

		return $data;
	}

	/**
	 * Set menu alias
	 *
	 * @param  ?int  $Itemid  ID of menu item
	 *
	 * @throws Exception
	 * @return string
	 */
	protected function setAlias(?int $Itemid): string
	{
		$alias = '';
		if ($Itemid) {
			$alias = $this->menuHelper->getMenuTitle('com_knowres', $Itemid);
		}

		return $alias;
	}
}