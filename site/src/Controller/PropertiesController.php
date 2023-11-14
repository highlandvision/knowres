<?php
/**
 * @package     Know Reservations
 * @subpackage  Site Controller
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Site\Controller;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Logger;
use HighlandVision\KR\Media;
use HighlandVision\KR\Session as KrSession;
use HighlandVision\KR\SiteHelper;
use HighlandVision\KR\Utility;
use JetBrains\PhpStorm\NoReturn;
use Joomla\CMS\Cache\Cache;
use Joomla\CMS\MVC\Controller\BaseController;
use Joomla\CMS\Response\JsonResponse;

use function array_push;
use function array_unique;
use function count;
use function header;
use function http_build_query;
use function in_array;
use function is_countable;
use function jexit;
use function json_encode;
use function trim;

/**
 * Properties list controller class.
 *
 * @since  1.0.0
 */
class PropertiesController extends BaseController
{
	/**
	 * Ajax add / remove favorite
	 *
	 * @throws Exception
	 * @since        1.0.0
	 * @noinspection PhpUnused
	 */
	#[NoReturn] public function favourite(): void
	{
		$searchSession = new KrSession\Search();
		$searchData    = $searchSession->getData();
		$favs          = $searchData->favs;
		$property_id   = KrMethods::inputInt('property_id');

		if ($property_id) {
			if (in_array($property_id, $favs)) {
				foreach ($favs as $k => $id) {
					if ($id == $property_id) {
						unset($favs[$k]);
					}
				}
			}
			else {
				$favs[] = (string) $property_id;
			}
		}

		$searchData->favs = $favs;
		$searchSession->setData($searchData);

		echo new JsonResponse([]);
		jexit();
	}

	/**
	 * Ajax request to get markers for the Google map
	 * if pid is set then solo map for property page
	 * otherwise search page map
	 *
	 * @throws Exception
	 * @since        3.2.0
	 * @noinspection PhpUnused
	 */
	public function mapdata(): void
	{
		$pid                 = $this->input->getInt('pid', 0);
		$display_map_markers = false;
		if ($pid && (int) KrMethods::getParams()->get('property_map_markers', 0)) {
			$display_map_markers = true;
		}
		else if (!$pid && (int) KrMethods::getParams()->get('search_map_markers', 0)) {
			$display_map_markers = true;
		}

		$property_markers = [];
		$map_markers      = [];
		$filter_ids       = [];

		$searchSession = new KrSession\Search();
		$searchData    = $searchSession->getData();

		try {
			if ($pid) {
				$item      = KrFactory::getAdminModel('property')->getItem($pid);
				$region_id = $item->region_id;

				if ((float) $item->lat && (float) $item->lng) {
					$property_markers[] = $this->setMarker($item, 'solo');
				}
			}
			else {
				$region_id = $searchData->region_id;
				$items     = KrFactory::getListSiteModel('properties')->mapMarkers($searchData->baseIds);
				foreach ($items as $item) {
					if ((float) $item->lat && (float) $item->lng) {
						$property_markers[] = $this->setMarker($item);
					}
				}

				$filter_ids = $this->setFilters($searchData);
			}

			if ($display_map_markers) {
				$map_markers = $this->setMapMarkers($region_id);
			}

			$wrapper                    = [];
			$wrapper['propertyMarkers'] = $property_markers;
			$wrapper['filterIds']       = $filter_ids;
			$wrapper['mapMarkers']      = $map_markers;
			$wrapper['type']            = $pid ? '' : 'cluster';
			$wrapper['color']           = KrMethods::getParams()->get('map_markers_color', 'red');

			echo new JsonResponse($wrapper);
			jexit();
		} catch (Exception $e) {
			Logger::logMe($e->getMessage(), 'error');
			echo new JsonResponse(null, KrMethods::plain('COM_KNOWRES_TRY_LATER'), true);
		}

		jexit();
	}

	/**
	 * Ajax set default view for map modal
	 *
	 * @throws Exception
	 * @since        2.2.0
	 * @noinspection PhpUnused
	 */
	#[NoReturn] public function mapsession(): void
	{
		$searchSession         = new KrSession\Search();
		$searchData            = $searchSession->getData();
		$searchData->map_modal = KrMethods::inputInt('map_modal');
		$searchSession->setData($searchData);

		echo true;

		jexit();
	}

	/**
	 * Returns the options for the typeahead search
	 *
	 * @throws Exception
	 * @since   1.0.0
	 */
	#[NoReturn] public function options(): void
	{
		$options = [];

		$type  = KrMethods::inputString('type', 'prefetch', 'get');
		$query = KrMethods::inputString('query', '', 'get');
		if ($type == 'prefetch') {
			$regions = KrFactory::getListModel('regions')->getDistinctRegions();
			foreach ($regions as $r) {
				$Itemid = SiteHelper::getItemId('com_knowres', 'properties', ['region_id' => $r->region_id]);

				$link =
					KrMethods::route('index.php?option=com_knowres&view=properties&Itemid=' .
					                 $Itemid .
					                 '&region_id=' .
					                 $r->region_id,
					                 false);

				$options[] =
					['icon'   => 'fas fa-map-marker-alt',
					 'name'   => $r->name,
					 'link'   => $link,
					 'region' => KrMethods::plain('COM_KNOWRES_REGION')
					];
			}
		}
		else {
			$properties = KrFactory::getListModel('properties')->getAutosearch($query);
			foreach ($properties as $p) {
				$options[] =
					['icon'   => 'fas fa-home',
					 'name'   => $p->property_name,
					 'link'   => SiteHelper::buildPropertyLink($p->id),
					 'region' => $p->region_name
					];
			}
		}

		header('Content-Type: application/json');
		echo json_encode($options);
		jexit();
	}

	/**
	 * Ajax request when search map refreshes to send current proprties in list
	 *
	 * @throws Exception
	 * @since        3.3.0
	 * @noinspection PhpUnused
	 */
	public function refreshmap(): void
	{
		try {
			$searchSession = new KrSession\Search();
			$searchData    = $searchSession->getData();
			$filter_ids    = $this->setFilters($searchData);

			$wrapper              = [];
			$wrapper['filterIds'] = $filter_ids;

			echo new JsonResponse($wrapper);
		} catch (Exception) {
			Logger::logMe($e->getMessage(), 'error');
			echo new JsonResponse(null, KrMethods::plain('COM_KNOWRES_TRY_LATER'), true);
		}

		jexit();
	}

	/**
	 * Sets up the redirect for the search html view
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	#[NoReturn] public function search(): void
	{
		$region_id = KrMethods::inputArray('region_id');
		if (count($region_id) == 1 && (int) $region_id[0] == 0) {
			$region_id[0] = KrMethods::getParams()->get('default_region');
		}
		$a = [];
		foreach ($region_id as $id) {
			$a[] = $id;
		}

		$input                  = [];
		$input['Itemid']        = SiteHelper::getItemId('com_knowres', 'properties');
		$input['region_id']     = $a;
		$input['property_area'] = KrMethods::inputString('property_area');
		$input['town']          = KrMethods::inputString('town');
		$input['arrival']       = KrMethods::inputString('arrival');
		$input['departure']     = KrMethods::inputString('departure');
		$input['type_id']       = KrMethods::inputInt('type_id');
		$input['category_id']   = KrMethods::inputInt('category_id');
		$input['feature_id']    = KrMethods::inputInt('feature_id');
		$input['bedrooms']      = KrMethods::inputInt('bedrooms');
		$input['flexible']      = KrMethods::inputInt('flexible');
		$input['guests']        = KrMethods::inputInt('guests', 2);
		$input['adults']        = KrMethods::inputInt('adults', 2);
		$input['child_ages']    = KrMethods::inputArray('child_ages');
		$input['children']      = KrMethods::inputInt('children');

		foreach ($input as $k => $v) {
			if (empty($v)) {
				unset($input[$k]);
			}
		}

		$route = KrMethods::route('index.php?option=com_knowres&view=properties&' .
		                          urlencode(trim(http_build_query($input))));

		KrMethods::redirect($route);
	}

	/**
	 * Set model for individual filters
	 *
	 * @param  mixed    $model   Property model
	 * @param  ?array   $filter  Filter options
	 * @param  ?string  $name    Filter name
	 *
	 * @since  3.3.0
	 * @return mixed
	 */
	protected function setAFilter(mixed $model, ?array $filter, ?string $name): mixed
	{
		$tmp = [];
		if (is_countable($filter)) {
			foreach ($filter as $k => $f) {
				if ($f[2]) {
					$tmp[] = $k;
				}
			}
		}

		if (is_countable($tmp) && count($tmp)) {
			$model->setState($name, $tmp);
		}

		return $model;
	}

	/**
	 * Set the property filters for map search
	 *
	 * @param  object  $data  KR Search session
	 *
	 * @since  3.2.0
	 * @return mixed
	 */
	protected function setFilters(object $data): mixed
	{
		$model = KrFactory::getListSiteModel('properties');
		$model->setState('filter.id', $data->baseIds);

		// Prices can't be filtered by the db so if price filters exist
		// compare against the generated search prices and
		// reduce the base property filter sent to the search
		$uids = [];
		foreach ($data->baseIds as $p) {
			foreach ($data->filterPrice as $k => $f) {
				if ($f[2]) {
					$price = $data->rateNet[$p];
					if ((int) $price >= (int) $k && (int) $price <= (int) $f[0]) {
						$uids[] = $p;
					}
				}
			}
		}

		// If search by price has reduced the base search then
		// set this as the base filter
		if (count($uids)) {
			$uids = array_unique($uids);
			$model->setState('filter.id', $uids);
		}

		$model = $this->setAFilter($model, $data->filterArea, 'filter.property_area');
		$model = $this->setAFilter($model, $data->filterBedrooms, 'filter.bedrooms');
		$model = $this->setAFilter($model, $data->filterBook, 'filter.booking_type');
		$model = $this->setAFilter($model, $data->filterCategory, 'filter.category');
		$model = $this->setAFilter($model, $data->filterFeature, 'filter.feature');
		$model = $this->setAFilter($model, $data->filterPets, 'filter.pets');
		$model = $this->setAFilter($model, $data->filterType, 'filter.type_id');

		return $model->currentlyDisplayed();
	}

	/**
	 * Find and set the map markers
	 *
	 * @param  array  $region_id  ID of region
	 *
	 * @throws Exception
	 * @since  3.3.0
	 * @return array
	 */
	protected function setMapMarkers(array $region_id): array
	{
		$markers = [];

		// set 90 day cache for markers
		$cache_options =
			['cachebase'    => JPATH_ADMINISTRATOR . '/cache',
			 'lifetime'     => 129600,
			 'caching'      => true,
			 'defaultgroup' => 'com_knowres_map'
			];

		$cache = KrMethods::getCache($cache_options);
		foreach ($region_id as $id) {
			$cache_markers = $cache->get($id);
			if ($cache_markers) {
				$count = array_push($markers, Utility::decodeJson($cache_markers));
			}
			else {
				$count = array_push($markers, $this->getMapMarkers($id, $cache));
			}
		}

		return $markers;
	}

	/**
	 * Set solo map marker
	 *
	 * @param  object  $item  DB Property object
	 * @param  string  $type  Map type 'solo' or 'multi'
	 *
	 * @throws Exception
	 * @since  3.3.0
	 * @return array
	 */
	protected function setMarker(object $item, string $type = 'multi'): array
	{
		$tmp            = [];
		$tmp['lat']     = (float) $item->lat;
		$tmp['lng']     = (float) $item->lng;
		$tmp['boxinfo'] = $item->id;
		$tmp['icon']    = KrMethods::getRoot() . KrMethods::route('images/krmap/property.png');
		$tmp['id']      = 'kr-property-' . $item->id;
		$tmp['pid']     = $item->id;

		if ($type === 'solo') {
			$tmp['title'] = $item->property_name;
			$tmp['html']  = $item->property_name;
			$tmp['link']  = '';
		}
		else {
			$tmp['html'] = '<div style="color:#fefefe;padding:0.3rem;font-size:1rem;line-height:1;">' .
				$item->property_name . '</div>';
		}

		return $tmp;
	}

	/**
	 * Get map markers for region
	 *
	 * @param  int    $region_id  ID of region
	 * @param  Cache  $cache      Cache instance
	 *
	 * @throws Exception
	 * @since  4.3.0
	 * @return array
	 */
	private function getMapMarkers(int $region_id, Cache $cache): array
	{
		$map_markers = [];
		$markers     = KrFactory::getListModel('mapmarkers')->getAll($region_id);
		foreach ($markers as $m) {
			if ($m->lat && $m->lng) {
				$image   = Media\Images::getMarkerImageLink($m->id);
				$content =
					KrMethods::render('properties.mapmarker',
					                  ['image' => $image,
					                   'name'  => $m->name,
					                   'text'  => $m->description
					                  ]);

				$tmp            = [];
				$tmp['lat']     = trim($m->lat);
				$tmp['lng']     = trim($m->lng);
				$tmp['title']   = trim($m->mapcategory_name);
				$tmp['html']    = $content;
				$tmp['icon']    = KrMethods::getRoot() . KrMethods::route($m->mapcategory_mapicon);
				$tmp['boxinfo'] = '';
				$map_markers[]  = $tmp;
			}
		}

		if (is_countable($map_markers) && count($map_markers)) {
			$cache->store(Utility::encodeJson($map_markers), $region_id);
		}

		return $map_markers;
	}
}