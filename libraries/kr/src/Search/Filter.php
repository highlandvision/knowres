<?php
/**
 * @package    Know Reservations
 * @subpackage Site View
 * @copyright  2023 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\KR\Search;

use Exception;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Translations;
use HighlandVision\KR\Utility;
use Joomla\Registry\Registry;
use RuntimeException;
use stdClass;

use function array_key_exists;
use function array_pop;
use function ceil;
use function in_array;
use function ksort;
use function min;
use function sort;
use function strcmp;
use function strnatcmp;
use function trim;
use function uasort;

/**
 * Set property search filters
 *
 * @since  4.3.0
 */
class Filter
{
	/** @var stdClass Search session data. */
	public stdClass $data;
	/** @var Translations Translations object. */
	protected Translations $Translations;
	/** @var array Category names */
	protected array $categories = [];
	/** @var array Feature names */
	protected array $features = [];
	/** @var int Value set for properties with no rate. */
	protected int $highval = 9999999;
	/** @var array Property rows */
	protected array $items = [];
	/** @var Registry KR paramaters. */
	private Registry $params;

	/**
	 * Constructor
	 *
	 * @throws Exception
	 * @since  3.3.1
	 */
	public function __construct($params, $Translations)
	{
		$this->params       = $params;
		$this->Translations = $Translations;
	}

	/**
	 * Compare values
	 *
	 * @param  array  $a  Value 1
	 * @param  array  $b  Value 2
	 *
	 * @since  1.0.0
	 * @return int
	 */
	public static function cmp(array $a, array $b): int
	{
		if (isset($a[3]) && isset($b[3])) {
			return strcmp($a[3], $b[3]);
		}

		return 0;
	}

	/**
	 * Compare values
	 *
	 * @param  array  $a  Value 1
	 * @param  array  $b  Value 2
	 *
	 * @since  1.0.0
	 * @return int
	 */
	public static function cmpnat(array $a, array $b): int
	{
		if (isset($a[3]) && isset($b[3])) {
			return strnatcmp($a[3], $b[3]);
		}

		return 0;
	}

	/**
	 * Set the base filters as per base property results and input fields
	 *
	 * @param  array     $items  Base property items.
	 * @param  stdClass  $data   Search session data.
	 *
	 * @throws RuntimeException
	 * @since  1.0.0
	 */
	public function setFilters(array $items, stdClass $data): stdClass
	{
		if ($this->params->get('filter_price')) {
			$this->setPriceRanges($data->rateNet, $data->currency);
		}

		$filter_area     = [];
		$filter_bedrooms = [];
		$filter_book     = [];
		$filter_category = [];
		$filter_feature  = [];
		$filter_pets     = [];
		$filter_price    = [];
		$filter_type     = [];

		if ($this->params->get('filter')) {
			$max_bedrooms = $this->params->get('search_maxbedrooms', 6);

			foreach ($baseItems as $item) {
				if (!in_array($item->id, $data->baseIds)) {
					continue;
				}

				$filter_area     = $this->setFilterArea($item, $filter_area);
				$filter_bedrooms = $this->setFilterBedrooms($item, $filter_bedrooms, $max_bedrooms);
				$filter_book     = $this->setFilterBook($item, $filter_book);
				$filter_category = $this->setFilterCategory($item, $filter_category);
				$filter_pets     = $this->setFilterPets($item, $filter_pets);
				$filter_feature  = $this->setFilterFeature($item, $filter_feature);
				$filter_price    = $this->setFilterPrice($item, $filter_price, $data->rateNet);
				$filter_type     = $this->setFilterType($item, $filter_type);
			}

			if ($this->params->get('filter_area') && $data->area && $data->area != '') {
				$filter_area = Search::checkSelection($filter_area, $data->area, false);
			}
			if ($this->params->get('filter_bedrooms') && $data->bedrooms) {
				$filter_bedrooms = Search::checkSelection($filter_bedrooms, $data->bedrooms, false);
			}
			if ($this->params->get('filter_category') && $data->category_id) {
				$filter_category = Search::checkSelection($filter_category, $data->category_id, false);
			}
			if ($this->params->get('filter_pets') && $data->pets) {
				$filter_pets = Search::checkSelection($filter_pets, $data->pets, false);
			}
			if ($this->params->get('filter_property_feature') && $data->feature_id) {
				$filter_feature = Search::checkSelection($filter_feature, $data->feature_id, false);
			}
			if ($this->params->get('filter_type') && $data->type_id) {
				$filter_type = Search::checkSelection($filter_type, $data->type_id, false);
			}

			ksort($filter_area);
			ksort($filter_bedrooms);
			uasort($filter_category, ['HighlandVision\KR\Search\Filter', 'cmp']);
			uasort($filter_feature, ['HighlandVision\KR\Search\Filter', 'cmp']);
			ksort($filter_pets);
			ksort($filter_price);
			uasort($filter_type, ['HighlandVision\KR\Search\Filter', 'cmpnat']);
		}

		$data->filterArea     = $filter_area;
		$data->filterBedrooms = $filter_bedrooms;
		$data->filterBook     = $filter_book;
		$data->filterCategory = $filter_category;
		$data->filterFeature  = $filter_feature;
		$data->filterPets     = $filter_pets;
		$data->filterPrice    = $filter_price;
		$data->filterType     = $filter_type;

		return $data;
	}

	/**
	 * Get the categories with names
	 *
	 * @throws RuntimeException
	 * @since  1.0.0
	 * @return array
	 */
	private function getCategoryNames(): array
	{
		$categories = [];

		$items = KrFactory::getListModel('categories')->getAllCategories();
		foreach ($items as $i) {
			$categories[$i->id] = $this->Translations->getText('category', $i->id);
		}

		return $categories;
	}

	/**
	 * Get the feature names
	 *
	 * @throws RuntimeException
	 * @since  1.0.0
	 * @return array
	 */
	private function getFeatureNames(): array
	{
		$features = [];

		$results = KrFactory::getListModel('propertyfeatures')->getFeatureNames();
		foreach ($results as $r) {
			$features[$r->id] = $this->Translations->getText('propertyfeature', $r->id);
		}

		return $features;
	}

	/**
	 * Calculates the slot for the property price
	 *
	 * @param  int  $price  Property price
	 *
	 * @since  1.2.2
	 * @return string
	 */
	private function getPriceSlot(int $price): string
	{
		$key = '';
		foreach ($this->ranges as $v) {
			if ($price >= (int) $v['low'] && $price <= (int) $v['high']) {
				$key = $v['low'];
				break;
			}
		}

		return $key;
	}

	/**
	 * Set area filter
	 *
	 * @param  mixed  $item    Property data
	 * @param  array  $filter  Area filter
	 *
	 * @since  4.3.0
	 * @return array
	 */
	private function setFilterArea(mixed $item, array $filter): array
	{
		if ($this->params->get('filter_area')) {
			$filter_this = $item->region_id . '%' . $item->property_area;
			if (!array_key_exists($filter_this, $filter)) {
				$filter[$filter_this] = [$filter_this,
				                         0,
				                         0,
				                         $item->property_area
				];
			}
		}

		return $filter;
	}

	/**
	 * Set bedrooms filter
	 *
	 * @param  mixed  $item    Property data
	 * @param  array  $filter  Bedrooms filter
	 * @param  int    $max     Max bedrooms in filter
	 *
	 * @since  4.3.0
	 * @return array
	 */
	private function setFilterBedrooms(mixed $item, array $filter, int $max): array
	{
		if ($this->params->get('filter_bedrooms')) {
			$filter_this = min($item->bedrooms, $max);
			if (!array_key_exists($filter_this, $filter)) {
				if ($filter_this == $max) {
					$text = KrMethods::plural('COM_KNOWRES_BEDROOMS_COUNT', $max . '+');
				}
				else {
					$text = KrMethods::plural('COM_KNOWRES_BEDROOMS_COUNT', $item->bedrooms);
				}
				$filterBedrooms[$filter_this] = [$filter_this,
				                                 0,
				                                 0,
				                                 $text
				];
			}
		}

		return $filter;
	}

	/**
	 * Set book type filter
	 *
	 * @param  mixed  $item    Property data.
	 * @param  array  $filter  Book filter.
	 * @param  array  $rates   Search rates.
	 *
	 * @since  4.3.0
	 * @return array
	 */
	private function setFilterBook(mixed $item, array $filter, array $rates): array
	{
		if ($this->params->get('filter_book')) {
			if ($item->booking_type && isset($rates[$item->id]) && $rated[$item->id] < $this->highval) {
				$filter_this = $item->booking_type;
				if (!array_key_exists($filter_this, $filter)) {
					$text = $filter_this == 2 ? KrMethods::plain('COM_KNOWRES_FILTER_BOOK') :
						KrMethods::plain('COM_KNOWRES_ON_REQUEST');

					$filter[$filter_this] = [$filter_this, 0, 0, $text];
				}
			}
		}

		return $filter;
	}

	/**
	 * Set category filter
	 *
	 * @param  mixed  $item    Property data
	 * @param  array  $filter  Category filter
	 *
	 * @since  4.3.0
	 * @return array
	 */
	private function setFilterCategory(mixed $item, array $filter): array
	{
		if ($this->params->get('filter_category', 0)) {

			if (empty($this->categories)) {
				$this->categories = $this->getCategoryNames();
			}

			$filter_values = Utility::decodeJson(trim($item->categories), true);
			foreach ($filter_values as $c) {
				if ($c) {
					if (!array_key_exists($c, $filter) && isset($this->categories[$c])) {
						$filter[$c] = [$c, 0, 0, $all[$c]];
					}
				}
			}
		}

		return $filter;
	}

	/**
	 * Set category filter
	 *
	 * @param  mixed  $item    Property data
	 * @param  array  $filter  Feature filter
	 *
	 * @since  4.3.0
	 * @return array
	 */
	private function setFilterFeature(mixed $item, array $filter): array
	{
		if ($this->params->get('filter_property_feature', 0)) {

			if (empty($this->features)) {
				$this->features = $this->getFeatureNames();
			}

			$filter_values = Utility::decodeJson(trim($item->property_features), true);
			foreach ($filter_values as $c) {
				if ($c) {
					if (!array_key_exists($c, $filter) && isset($features[$c])) {
						$filter[$c] = [$c, 0, 0, $all[$c]];
					}
				}
			}
		}

		return $filter;
	}

	/**
	 * Set pets filter
	 *
	 * @param  mixed  $item    Property data
	 * @param  array  $filter  Pets filter
	 *
	 * @since  4.3.0
	 * @return array
	 */
	private function setFilterPets(mixed $item, array $filter): array
	{
		if ($this->params->get('filter_pets')) {
			$filter_this = $item->pets;
			if (!array_key_exists($filter_this, $filter_pets)) {
				if ($filter_this == 0) {
					$text = KrMethods::plain('COM_KNOWRES_NO_PETS');
				}
				else {
					$text = KrMethods::plural('COM_KNOWRES_PETS_COUNT', $item->pets);
				}

				$filter_pets[$filter_this] = [$filter_this, 0, 0, $text];
			}
		}

		return $filter;
	}

	/**
	 * Set price filter
	 *
	 * @param  mixed  $item    Property data.
	 * @param  array  $filter  Price filter.
	 * @param  array  $rates   Search rates.
	 *
	 * @since  4.3.0
	 * @return array
	 */
	private function setFilterPrice(mixed $item, array $filter, array $rates): array
	{
		if ($this->params->get('filter_price')) {
			if (isset($rates[$item->id])) {
				$filter_this = $this->getPriceSlot($rates[$item->id]);
				if (!array_key_exists($filter_this, $filter)) {
					$filter[$filter_this] =
						[$this->ranges[$filter_this]['high'], 0, 0, $this->ranges[$filter_this]['text']];
				}
			}
		}

		return $filter;
	}

	/**
	 * Set type filter
	 *
	 * @param  mixed  $item    Property data
	 * @param  array  $filter  Type filter
	 *
	 * @since  4.3.0
	 * @return array
	 */
	private function setFilterType(mixed $item, array $filter): array
	{
		if ($this->params->get('filter_type')) {
			$filter_this = $item->type_id;
			if (!array_key_exists($filter_this, $filter)) {
				$filter[$filter_this] = [$filter_this,
				                         0,
				                         0,
				                         $this->Translations->getText('type', $item->type_id)
				];
			}
		}

		return $filter;
	}

	/**
	 * Calculates the ranges for the price filter.
	 *
	 * @param  array   $rates     Search rates
	 * @param  string  $currency  Rate currency
	 *
	 * @since  1.2.2
	 */
	private function setPriceRanges(array $rates, string $currency): void
	{
		$ranges  = [];
		$highest = 0;
		$lowest  = 0;

		sort($rates);
		foreach ($rates as $r) {
			if ($r != $this->highval) {
				$lowest = ceil($r / 10) * 10;
			}

			break;
		}

		$num_properties = 0;
		foreach ($rates as $p) {
			if ($p != $this->highval) {
				$num_properties++;
				$highest = $p;
			}
			else {
				break;
			}
		}

		$highest = ceil($highest / 10) * 10;

		// Calculate the increment
		$spread = $highest - $lowest;
		$levels = 5;
		if ($spread < 30 || $num_properties < 3) {
			$levels = 2;
		}
		else if ($spread < 40 || $num_properties < 4) {
			$levels = 3;
		}
		else if ($spread < 50 || $num_properties < 5) {
			$levels = 4;
		}

		$increment = $spread / $levels;
		$increment = ceil($increment / 10) * 10;

		$ranges[$lowest] =
			KrMethods::sprintf('COM_KNOWRES_SEARCH_UP_TO', Utility::displayValue($lowest, $currency, false));

		for ($i = 1; $i < $levels - 1; $i++) {
			$key          = $lowest + $increment * $i;
			$ranges[$key] =
				KrMethods::sprintf('COM_KNOWRES_SEARCH_UP_TO', Utility::displayValue($key, $currency, false));
		}

		$ranges[$highest] =
			KrMethods::sprintf('COM_KNOWRES_SEARCH_UP_TO', Utility::displayValue($highest, $currency, false));

		$highest = array_pop($rates);
		if ($highest == $this->highval) {
			$ranges[$this->highval] = KrMethods::plain('COM_KNOWRES_SEARCH_REQUEST');
		}

		$low = 0;
		foreach ($ranges as $k => $r) {
			if ($k == $this->highval) {
				$text = KrMethods::plain('COM_KNOWRES_SEARCH_REQUEST');
			}
			else {
				$text = Utility::displayValue($low, $currency, false);
				$text .= ' - ';
				$text .= Utility::displayValue($k, $currency, false);
			}

			$this->ranges[$low] = ['low' => $low, 'high' => $k, 'text' => $text];
			$low                = $k + 1;
		}
	}
}