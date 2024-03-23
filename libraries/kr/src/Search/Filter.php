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
use function count;
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
 * @since  5.0.0
 */
class Filter
{
	/** @var stdClass Search session data. */
	public stdClass $searchData;
	/** @var Translations Translations object. */
	protected Translations $Translations;
	/** @var array Category names */
	protected array $categories = [];
	/** @var array Feature names */
	protected array $features = [];
	/** @var int Value set for properties with no rate. */
	protected int $highval = 9999999;
	/** @var Registry KR paramaters. */
	private Registry $params;
	/** @var array Price ranges. */
	private array $ranges = [];

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
		$this->searchData = $data;
		if ($this->params->get('filter_price')) {
			$this->setPriceRanges($this->searchData->rateNet, $this->searchData->currency);
		}

		$show_country = false;
		if ($this->params->get('filter_area')) {
			$distinct = KrFactory::getListModel('regions')->getDistinctRegions();
			if (count($distinct) > 1) {
				$cname = '';
				foreach ($distinct as $r) {
					if (empty($cname)) {
						$cname = $r->country_name;
					} else {
						if ($cname != $r->country_name) {
							$show_country = true;
							break;
						}
					}
				}
			}
		}

		$this->searchData->filterArea     = [];
		$this->searchData->filterBedrooms = [];
		$this->searchData->filterBook     = [];
		$this->searchData->filterCategory = [];
		$this->searchData->filterFeature  = [];
		$this->searchData->filterPets     = [];
		$this->searchData->filterPrice    = [];
		$this->searchData->filterType     = [];

		if ($this->params->get('filter')) {
			foreach ($items as $item) {
				if (!in_array($item->id, $this->searchData->baseIds)) {
					continue;
				}

				$this->setFilterArea($item, $show_country);
				$this->setFilterBedrooms($item, $this->params->get('search_maxbedrooms', 6));
				$this->setFilterBook($item);
				$this->setFilterCategory($item);
				$this->setFilterFeature($item);
				$this->setFilterPets($item);
				$this->setFilterPrice($item);
				$this->setFilterType($item);
			}

			if ($this->params->get('filter_area') && $this->searchData->property_area) {
				$this->checkSelection($this->searchData->filterArea, $this->searchData->property_area, false);
			}
			if ($this->params->get('filter_bedrooms') && $this->searchData->bedrooms) {
				$this->checkSelection($this->searchData->filterBedrooms, $this->searchData->bedrooms, false);
			}
			if ($this->params->get('filter_category') && $this->searchData->category_id) {
				$this->checkSelection($this->searchData->filterCategory, $this->searchData->category_id, false);
			}
			if ($this->params->get('filter_property_feature') && $this->searchData->feature_id) {
				$this->checkSelection($this->searchData->filterFeature, $this->searchData->feature_id, false);
			}
			if ($this->params->get('filter_pets') && $this->searchData->pets) {
				$this->checkSelection($this->searchData->filterPets, $this->searchData->pets, false);
			}
			if ($this->params->get('filter_type') && $data->type_id) {
				$this->checkSelection($this->searchData->filterType, $data->type_id, false);
			}

			uasort($this->searchData->filterArea, ['HighlandVision\KR\Search\Filter', 'cmp']);
			ksort($this->searchData->filterBedrooms);
			uasort($this->searchData->filterCategory, ['HighlandVision\KR\Search\Filter', 'cmp']);
			uasort($this->searchData->filterFeature, ['HighlandVision\KR\Search\Filter', 'cmp']);
			ksort($this->searchData->filterPets);
			ksort($this->searchData->filterPrice);
			uasort($this->searchData->filterType, ['HighlandVision\KR\Search\Filter', 'cmpnat']);
		}

		return $this->searchData;
	}

	/**
	 * Check if filter value is selected
	 *
	 * @param  array  $selected  Current counts and selections (pass by reference)
	 * @param  mixed  $value     Value to increment
	 * @param  bool   $reset     FALSE will not reset any selected items with zero count
	 *
	 * @since  1.0.0
	 */
	private function checkSelection(array &$selected, mixed $value, bool $reset = true): void
	{
		$checked = 0;
		if (isset($selected[$value][2])) {
			$checked = $selected[$value][2];
		}
		$selected[$value][2] = $checked ? 1 : 0;

		if ($reset) {
			foreach ($selected as $k => $v) {
				if (!isset($v[1]) || !$v[1]) {
					$selected[$k][2] = 0;
				}
			}
		}
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
	 * @param  mixed  $item          Property item.
	 * @param  bool   $show_country  True to display country name.
	 *
	 * @throws RuntimeException
	 * @since  5.0.0
	 */
	private function setFilterArea(mixed $item, bool $show_country): void
	{
		if ($this->params->get('filter_area')) {
			$filter_this = $item->region_id . '^' . $item->property_area;
			if (!array_key_exists($filter_this, $this->searchData->filterArea)) {
				$text = '';
				if ($show_country) {
					$text = $this->Translations->getText('country', $item->country_id) . ', ';
				}

				$text .= $this->Translations->getText('region', $item->region_id) .
					': ' . $item->property_area;
				$this->searchData->filterArea[$filter_this] = [$filter_this, 0, 0, $text];
			}
		}
	}

	/**
	 * Set bedrooms filter
	 *
	 * @param  mixed  $item  Property data
	 * @param  int    $max   Max bedrooms in filter
	 *
	 * @since  5.0.0
	 */
	private function setFilterBedrooms(mixed $item, int $max): void
	{
		if ($this->params->get('filter_bedrooms')) {
			$filter_this = min($item->bedrooms, $max);
			if (!array_key_exists($filter_this, $this->searchData->filterBedrooms)) {
				if ($filter_this == $max) {
					$text = KrMethods::plural('COM_KNOWRES_BEDROOMS_COUNT', $max . '+');
				} else {
					$text = KrMethods::plural('COM_KNOWRES_BEDROOMS_COUNT', $item->bedrooms);
				}
				$this->searchData->filterBedrooms[$filter_this] = [$filter_this, 0, 0, $text];
			}
		}
	}

	/**
	 * Set book type filter
	 *
	 * @param  mixed  $item  Property data.
	 *
	 * @since  5.0.0
	 */
	private function setFilterBook(mixed $item): void
	{
		if ($this->params->get('filter_book')) {
			if ($item->booking_type && isset($this->searchData->rateNet[$item->id]) &&
				$this->searchData->rateNet[$item->id] < $this->highval) {
				$filter_this = $item->booking_type;
				if (!array_key_exists($filter_this, $this->searchData->filterBook)) {
					$text = $filter_this == 2 ? KrMethods::plain('COM_KNOWRES_FILTER_BOOK') :
						KrMethods::plain('COM_KNOWRES_ON_REQUEST');

					$this->searchData->filterBook[$filter_this] = [$filter_this, 0, 0, $text];
				}
			}
		}
	}

	/**
	 * Set category filter
	 *
	 * @param  mixed  $item  Property data
	 *
	 * @throws RuntimeException
	 * @since  5.0.0
	 */
	private function setFilterCategory(mixed $item): void
	{
		if ($this->params->get('filter_category', 0)) {
			if (empty($this->categories)) {
				$this->categories = $this->getCategoryNames();
			}

			$filter_values = Utility::decodeJson(trim($item->categories), true);
			foreach ($filter_values as $c) {
				if ($c) {
					if (!array_key_exists($c, $this->searchData->filterCategory) && isset($this->categories[$c])) {
						$this->searchData->filterCategory[$c] = [$c, 0, 0, $this->categories[$c]];
					}
				}
			}
		}
	}

	/**
	 * Set feature filter
	 *
	 * @param  mixed  $item  Property data
	 *
	 * @throws RuntimeException
	 * @since  5.0.0
	 */
	private function setFilterFeature(mixed $item): void
	{
		if ($this->params->get('filter_property_feature', 0)) {
			if (empty($this->features)) {
				$this->features = $this->getFeatureNames();
			}

			$filter_values = Utility::decodeJson(trim($item->property_features), true);
			foreach ($filter_values as $c) {
				if ($c) {
					if (!array_key_exists($c, $this->searchData->filterFeature) && isset($this->features[$c])) {
						$this->searchData->filterFeature[$c] = [$c, 0, 0, $this->features[$c]];
					}
				}
			}
		}
	}

	/**
	 * Set pets filter
	 *
	 * @param  mixed  $item  Property data
	 *
	 * @since  5.0.0
	 */
	private function setFilterPets(mixed $item): void
	{
		if ($this->params->get('filter_pets')) {
			$filter_this = $item->pets;
			if (!array_key_exists($filter_this, $this->searchData->filterPets)) {
				if ($filter_this == 0) {
					$text = KrMethods::plain('COM_KNOWRES_NO_PETS');
				} else {
					$text = KrMethods::plural('COM_KNOWRES_PETS_COUNT', $item->pets);
				}

				$this->searchData->filterPets[$filter_this] = [$filter_this, 0, 0, $text];
			}
		}
	}

	/**
	 * Set price filter
	 *
	 * @param  mixed  $item  Property data.
	 *
	 * @since  5.0.0
	 */
	private function setFilterPrice(mixed $item): void
	{
		if ($this->params->get('filter_price')) {
			if (isset($this->searchData->rateNet[$item->id])) {
				$filter_this = $this->getPriceSlot($this->searchData->rateNet[$item->id]);
				if (!array_key_exists($filter_this, $this->searchData->filterPrice)) {
					$this->searchData->filterPrice[$filter_this] =
						[$this->ranges[$filter_this]['high'], 0, 0, $this->ranges[$filter_this]['text']];
				}
			}
		}
	}

	/**
	 * Set type filter
	 *
	 * @param  mixed  $item  Property data
	 *
	 * @throws RuntimeException
	 * @since  5.0.0
	 */
	private function setFilterType(mixed $item): void
	{
		if ($this->params->get('filter_type')) {
			$filter_this = $item->type_id;
			if (!array_key_exists($filter_this, $this->searchData->filterType)) {
				$this->searchData->filterType[$filter_this] = [$filter_this,
				                                               0,
				                                               0,
				                                               $this->Translations->getText('type', $item->type_id)
				];
			}
		}
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
		$this->ranges = [];
		$ranges       = [];
		$highest      = 0;
		$lowest       = 0;

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
			} else {
				break;
			}
		}

		$highest = ceil($highest / 10) * 10;

		// Calculate the increment
		$spread = $highest - $lowest;
		$levels = 5;
		if ($spread < 30 || $num_properties < 3) {
			$levels = 2;
		} else if ($spread < 40 || $num_properties < 4) {
			$levels = 3;
		} else if ($spread < 50 || $num_properties < 5) {
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
			} else {
				$text = Utility::displayValue($low, $currency, false);
				$text .= ' - ';
				$text .= Utility::displayValue($k, $currency, false);
			}

			$this->ranges[$low] = ['low' => $low, 'high' => $k, 'text' => $text];
			$low                = $k + 1;
		}
	}
}