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
use HighlandVision\KR\Logger;
use HighlandVision\KR\Translations;
use JetBrains\PhpStorm\NoReturn;
use Joomla\CMS\Uri;

use function defined;

/**
 * Sample plugin to build URL for a com_sample component.
 * - Drop the "com_" at the start from the component to name the class
 * - Below are only the most important methods. For more advanced logic,
 * be sure to check the built-in plugins in
 * /plugins/system/forsef/platform/extensions
 */
class Knowres extends Base
{
	/**
	 * Builds the SEF URL for a non-sef.
	 *
	 * @param  Uri\Uri  $uriToBuild
	 * @param  Uri\Uri  $platformUri
	 * @param  Uri\Uri  $originalUri
	 *
	 * @throws Exception
	 * @return array
	 */
	#[NoReturn] public function build($uriToBuild, $platformUri, $originalUri): array
	{
		$sefSegments = [];
		$params      = KrMethods::getParams();

		// Variables required for SEF url.
		$view        = $uriToBuild->getVar('view');
		$Itemid      = $uriToBuild->getVar('Itemid');
		$region_id   = $uriToBuild->getVar('region_id');
		$id          = $uriToBuild->getVar('id');
		$property_id = $uriToBuild->getVar('property_id');
		$category_id = $uriToBuild->getVar('category_id');
		$layout      = $uriToBuild->getVar('layout');

		// Default alias to use as backup
		$alias = '';
		if ($Itemid)
		{
			$menu_item = $this->platform->getMenu()->getItem($Itemid);
			if (!empty($menu_item))
			{
				$alias = $menu_item->alias;
			}
		}

		if (($view == 'property' && !empty($id)) || ($view == 'contact' && !empty($id))
			|| ($view == 'reviews' && !empty($property_id)))
		{
			$seo_property  = $params->get('seo_property');
			$property_name = 'property';
			$area          = 'area';
			$region        = 'region';
			$type          = 'type';

			try
			{
				$key           = $view == 'property' || $view == 'contact' ? $id : $property_id;
				$property      = KrFactory::getAdminModel('property')->getItem($key);
				$property_name = $property->property_name;
				$area          = $property->property_area;
				$region        = $property->region_name;
				$type          = $property->type_abbreviation;
			}
			catch (Exception $e)
			{
				Logger::logMe($e->getMessage());
			}
		}

		switch ($view)
		{
			//			case 'guestform':
			//				$sefSegments[] = KrMethods::plain('COM_KNOWRES_TITLE_DASHBOARD_GUEST');
			//				$platformUri->delvar('view');
			//				break;
			//
			//			case 'contractguestdataform':
			//				$sefSegments[] = KrMethods::plain('COM_KNOWRES_DASHBOARD_ADD_CONTRACTGUESTDATA_SEF');
			//				$platformUri->delvar('view');
			//				break;
			//
			//			case 'reviewform':
			//				$sefSegments[] = KrMethods::plain('COM_KNOWRES_TITLE_REVIEWFORM');
			//				$platformUri->delvar('view');
			//				break;
			//
			//			case 'dashboard':
			//				$sefSegments[] = KrMethods::plain('COM_KNOWRES_TITLE_DASHBOARD');
			//				$platformUri->delvar('view');
			//				break;

			case 'contact':
				$sefSegments[] = KrMethods::plain('COM_KNOWRES_SEND_AN_ENQUIRY');
				$platformUri->delvar('view');

				if ($id)
				{
					$sefSegments[] = $property_name;
					$platformUri->delvar('id');
				}

				break;

			case 'property':
				if ($id)
				{
					if ($seo_property == 1)
					{
						$sefSegments[] = $region . '-' . $area . '-' . $type;
						$sefSegments[] = $property_name;
					}
					else if ($seo_property == 2)
					{
						$sefSegments[] = $region;
						$sefSegments[] = $area . '-' . $type;
						$sefSegments[] = $property_name;
					}
					else if ($seo_property == 3)
					{
						$sefSegments[] = $region;
						$sefSegments[] = $area;
						$sefSegments[] = $type;
						$sefSegments[] = $property_name;
					}
					else if ($seo_property == 4)
					{
						$sefSegments[] = $property_name . '-' . $area;
					}
					else if ($seo_property == 5)
					{
						$sefSegments[] = $type;
						$sefSegments[] = $property_name;
					}

					$platformUri->delvar('view');
					$platformUri->delvar('id');
				}
				break;

			case 'reviews':
				if ($property_id)
				{
					if ($seo_property == 1)
					{
						$sefSegments[] = $region . '-' . $area . '-' . $type;
					}
					else if ($seo_property == 2)
					{
						$sefSegments[] = $region;
						$sefSegments[] = $area . '-' . $type;
					}
					else
					{
						$sefSegments[] = $region;
						$sefSegments[] = $area;
						$sefSegments[] = $type;
					}

					$sefSegments[] = $property_name;
					$sefSegments[] = 'reviews';

					$platformUri->delvar('view');
					$platformUri->delvar('property_id');
				}
				break;

			case 'properties':
				$Translations = new Translations();
				if (!$region_id && !$category_id && !$layout)
				{
					$region_id = $params->get('default_region');
				}

				if ($region_id)
				{
					$sefSegments[] = $Translations->getText('region', $region_id);

					$platformUri->delvar('region_id');
					$platformUri->delvar('arrivaldsp');
					$platformUri->delvar('departuredsp');
				}
				else if ($category_id)
				{
					$sefSegments[] = $Translations->getText('category', $category_id);

					$platformUri->delvar('category_id');
					$platformUri->delvar('layout');
				}
				//				else if ($layout)
				//				{
				//					$sefSegments[] = $layout;
				//					$platformUri->delvar('layout');
				//				}

				if (empty($sefSegments))
				{
					$sefSegments[] = $params->get('seo_search') ? $params->get('seo_search') : $alias;
				}

				$platformUri->delvar('view');
				break;

			default:
				if (!$view || !$alias)
				{
					$dosef = false;
				}
				else
				{
					$sefSegments[] = $alias;
					$platformUri->delvar('view');
				}
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
			parent::buildNormalizedNonSef(
				$vars
			)
		);
	}

	/**
	 * Check if passed URI is for an extension configured to be left non-sef.
	 *
	 * @param  Uri\Uri  $uri
	 *
	 * @throws Exception
	 * @return bool
	 */
	public function shouldLeaveNonSef($uri): bool
	{
		$user = KrMethods::getUser();
		if ($user->id)
		{
			return true;
		}

		$format = $uri->getVar('format');
		if ($format == "raw")
		{
			return true;
		}

		if ($uri->getVar('task'))
		{
			return true;
		}

		return false;
	}
}