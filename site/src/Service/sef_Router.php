<?php
/**
 * @package         Joomla.Site
 * @subpackage      com_tags
 * @copyright   (C) 2013 Open Source Matters, Inc. <https://www.joomla.org>
 * @license         GNU General Public License version 2 or later; see LICENSE.txt
 */

namespace HighlandVision\Component\Knowres\Site\Service;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Translations;
use Joomla\CMS\Component\Router\RouterBase;

use function array_pop;
use function count;
use function implode;
use function is_numeric;
use function str_replace;
use function strtolower;

/**
 * Routing class for com_knowres
 *
 * @since  4.0.0
 */
class sefRouter extends RouterBase
{
	/**
	 * Build the route for the com_knowres component
	 *
	 * @param  array  $query  An array of URL arguments
	 *
	 * @throws Exception
	 * @since  4.0.0
	 * @return array  The URL arguments to use to assemble the subsequent URL.
	 */
	public function build(&$query): array
	{
		$segments = [];

		if (isset($query['view'])) {
			switch ($query['view']) {
				case 'contact':
					$segments[] = KrMethods::plain('COM_KNOWRES_SEND_AN_ENQUIRY');
					if (isset($query['id']) && $query['id']) {
						$item       = KrFactory::getAdminModel('property')->getItem($query['id']);
						$segments[] = $item->property_name;
//						unset($query['id']);
					}
					break;
				case 'confirm':
					if (isset($query['type']) && $query['type'] == 'payment') {
						$segments[] = KrMethods::plain('COM_KNOWRES_MAKE_A_PAYMENT');
//						unset($query['type']);
					}
					else {
						$segments[] = KrMethods::plain('COM_KNOWRES_MAKE_A_RESERVATION');
					}
					break;
				case 'property':
					if (!empty($query['id'])) {
						$segments = $this->setProperty($query['id']);
					}
					break;
				case 'properties':
					$segments = $this->setProperties($query);
					break;
				case 'reviews':
					$segments = $this->setReviews($query);
					break;
			}
		}

		$total = count($segments);
		for ($i = 0; $i < $total; $i++) {
			$segments[$i] = strtolower(str_replace(' ', '-', $segments[$i]));
		}

		return $segments;
	}

	/**
	 * Parse the segments of a URL for com_knowres.
	 *
	 * @param  array  &$segments  The segments of the URL to parse.
	 *
	 * @since   4.0.0
	 * @return  array  The URL attributes to be used by the application.
	 */
	public function parse(&$segments): array
	{
		$vars = [];

		$count = count($segments);
		if ($count) {
			$count--;
			$segment = array_pop($segments);
			if (is_numeric($segment)) {
				$vars['id'] = $segment;
			}
			else {
				$count--;
				$vars['task'] = array_pop($segments) . '.' . $segment;
			}
		}

		if ($count) {
			$vars['task'] = implode('.', $segments);
		}

		return $vars;
	}

	/**
	 * Check for multiple regions
	 *
	 * @param  array  $query
	 *
	 * @throws Exception
	 * @since  5.0.0
	 * @return int
	 */
	protected function checkMultiRegion(array $query): int
	{
		$tmp = KrMethods::inputArray('region_id');

		return count($tmp);
	}

	/**
	 * Set property segments
	 *
	 * @param  array  $query  URL Arguements.
	 *
	 * @throws Exception
	 * @since  5.0.0
	 * @return array
	 */
	protected function setProperties(array $query): array
	{
		$segments     = [];
		$Translations = new Translations();
		$params       = KrMethods::getParams();

		$multi = $this->checkMultiRegion($query);
		if ($multi == 1) {
			$region_id = KrMethods::inputArray('region_id');
		}
		if (!$region_id) {
			if (!$category_id && !$layout) {
				$region_id = $params->get('default_region');
			}
		}

		if ($multi > 1) {
			$segments[] = KrMethods::plain('COM_KNOWRES_SEARCH');
		}
		else if ($region_id) {
			$segments[] = $Translations->getText('region', $region_id[0]);
		}
		else if ($category_id) {
			$segments[] = $Translations->getText('category', $category_id);
		}

		if (empty($segments)) {
			$segments[] = $params->get('seo_search') ? $params->get('seo_search') : $alias;
		}

//		unset($query['id']);
//		unset($query['arrivaldsp']);
//		unset($query['departuredsp']);
//		unset($query['ItemId']);
//		unset($query['view']);

		return $segments;
	}

	/**
	 * Set property segments
	 *
	 * @param  int  $property_id  ID of property
	 *
	 * @throws Exception
	 * @since  5.0.0
	 * @return array
	 */
	protected function setProperty(int $property_id): array
	{
		$segments     = [];
		$seo_property = (int)KrMethods::getParams()->get('seo_property', 1);

		$item   = KrFactory::getAdminModel('property')->getItem($property_id);
		$name   = $item->property_name;
		$area   = $item->property_area;
		$region = $item->region_name;
		$type   = $item->type_abbreviation;

		switch ($seo_property) {
			case 1:
				$segments[] = $region . '-' . $area . '-' . $type;
				$segments[] = $name;
				break;
			case 2:
				$segments[] = $region;
				$segments[] = $area . '-' . $type;
				$segments[] = $name;
				break;
			case 3:
				$segments[] = $region;
				$segments[] = $area;
				$segments[] = $type;
				$segments[] = $name;
				break;
			case 4:
				$segments[] = $name . '-' . $area;
				break;
			case 5:
				$segments[] = $type;
				$segments[] = $name;
				break;
			default:
				$segments[] = $area;
				$segments[] = $type;
				$segments[] = $name;
				break;
		}

		return $segments;
	}

	/**
	 * Set review segments
	 *
	 * @param  int  $property_id  ID of property
	 *
	 * @throws Exception
	 * @since  5.0.0
	 * @return array
	 */
	protected function setReviews(int $property_id): array
	{
		$segments     = [];
		$seo_property = (int) KrMethods::getParams->get('seo_property', 1);

		if ($property_id) {
			$item   = KrFactory::getAdminModel('property')->getItem($property_id);
			$name   = $item->property_name;
			$area   = $item->property_area;
			$region = $item->region_name;
			$type   = $item->type_abbreviation;

			switch ($seo_property) {
				case 1:
					$segments[] = $region . '-' . $area . '-' . $type;
					$segments[] = $name;
					break;
				case 2:
					$segments[] = $region;
					$segments[] = $area . '-' . $type;
					$segments[] = $name;
					break;
				default:
					$segments[] = $region;
					$segments[] = $area;
					$segments[] = $type;
					break;
			}

			$segments[] = $property_name;
			$segments[] = strtolower(KrMethods::plain('COM_KNOWRES_REVIEWS_TITLE'));
		}

		return $segments;
	}
}