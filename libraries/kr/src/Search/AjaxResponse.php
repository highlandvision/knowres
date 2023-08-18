<?php
/**
 * @package     Know Reservations
 * @subpackage  Library
 * @copyright   Copyright (c) 2020, Highland Vision. All rights reserved.
 * @license     See the file LICENSE.txt for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\KR\Search;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Calendar;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Hub;
use HighlandVision\KR\Session as KrSession;
use HighlandVision\KR\SiteHelper;
use HighlandVision\KR\TickTock;
use HighlandVision\KR\Translations;
use Joomla\Registry\Registry;
use RuntimeException;
use stdClass;

use function array_key_exists;
use function array_keys;
use function array_values;
use function arsort;
use function asort;
use function count;
use function implode;
use function in_array;
use function max;
use function min;

/**
 * Site search for properties
 *
 * @since 4.3.0
 */
class AjaxResponse
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
	 * @since  4.3.0
	 */
	public function __construct($params, $Translations)
	{
		$this->params       = $params;
		$this->Translations = $Translations;
	}

	/**
	 * Check if filter value is selected
	 *
	 * @param  array  $selected  Current counts and selections
	 * @param  mixed  $value     Value to increment
	 * @param  bool   $reset     FALSE will not reset any selected items with zero count
	 *
	 * @since  1.0.0
	 * @return array
	 */
	public static function checkSelection(array $selected, mixed $value, bool $reset = true): array
	{
		$checked = 0;
		if (isset($selected[$value][2])) {
			$checked = $selected[$value][2];
		}
		$selected[$value][2] = $checked ? 0 : 1;

		if ($reset) {
			foreach ($selected as $k => $v) {
				if (!isset($v[1]) || !$v[1]) {
					$selected[$k][2] = 0;
				}
			}
		}

		return $selected;
	}

	/**
	 * Set count for the displayed filters
	 *
	 * @param  array  $totalBedrooms
	 * @param  array  $totalBook
	 * @param  array  $totalFeature
	 * @param  array  $totalType
	 * @param  array  $totalTown
	 * @param  array  $totalArea
	 * @param  array  $totalPets
	 * @param  array  $totalCategory
	 * @param  array  $idPrice
	 *
	 * @since 1.0.0
	 */
	public function countAjaxFilters(array $totalBedrooms = [],
	                                 array $totalBook = [],
	                                 array $totalFeature = [],
	                                 array $totalType = [],
	                                 array $totalTown = [],
	                                 array $totalArea = [],
	                                 array $totalPets = [],
	                                 array $totalCategory = [],
	                                 array $idPrice = []): void
	{
		if ($this->params->get('filter_area')) {
			$this->data->filterArea = $this->presetFilterCount($this->data->filterArea, $totalArea);
		}

		if ($this->params->get('filter_bedrooms')) {
			$this->data->filterBedrooms = $this->zeroFilterCount($this->data->filterBedrooms);
			$max_bedrooms               = $this->params->get('search_maxbedrooms', 6);
			foreach ($totalBedrooms as $t) {
				if ($t->id >= $max_bedrooms) {
					$this->data->filterBedrooms =
						$this->setFilterCount($this->data->filterBedrooms, $max_bedrooms, $t->total);
				}
				else {
					$this->data->filterBedrooms =
						$this->setFilterCount($this->data->filterBedrooms, (int) $t->id, $t->total);
				}
			}
		}

		if ($this->params->get('filter_book')) {
			$this->data->filterBook = $this->presetFilterCount($this->data->filterBook, $totalBook);
		}

		if ($this->params->get('filter_category')) {
			$this->data->filterCategory = $this->zeroFilterCount($this->data->filterCategory);
			foreach ($totalCategory as $t) {
				$this->data->filterCategory = $this->setFilterCount($this->data->filterCategory, (int) $t[0], $t[1]);
			}
		}

		if ($this->params->get('filter_property_feature')) {
			$this->data->filterFeature = $this->zeroFilterCount($this->data->filterFeature);
			foreach ($totalFeature as $t) {
				$this->data->filterFeature = $this->setFilterCount($this->data->filterFeature, (int) $t[0], $t[1]);
			}
		}

		if ($this->params->get('filter_pets')) {
			$this->data->filterPets = $this->presetFilterCount($this->data->filterPets, $totalPets);
		}

		if ($this->params->get('filter_price')) {
			$this->data->filterPrice = $this->zeroFilterCount($this->data->filterPrice);
			foreach ($idPrice as $t) {
				if (isset($this->data->rateNet[$t->id])) {
					$price                   = $this->data->rateNet[$t->id];
					$this->data->filterPrice = $this->setFilterPriceCount($this->data->filterPrice, $price);
				}
			}
		}

		if ($this->params->get('filter_type')) {
			$this->data->filterType = $this->presetFilterCount($this->data->filterType, $totalType);
		}
	}

	/**
	 * Set search data and do base search
	 *
	 * @throws Exception
	 * @since  3.3.0
	 */
	public function doBaseSearch(): void
	{
		$this->validateRegion();
		$this->setInputAvailability();
		$this->setInputOrdering();

		$this->data->baseIds = [];
		$baseItems           = KrFactory::getListSiteModel('properties')->getBaseItems($this->data);
		if (is_countable($baseItems) && count($baseItems)) {
			$this->data->baseIds = array_column($baseItems, 'id');
			$this->setCurrency();
			$this->checkGuestNumbers($baseItems);

			if (!count($this->data->baseIds)) {
				return;
			}

			if ($this->data->byAvailability) {
				$this->setActualRates();
			}
			else {
				$this->setMinRates();
			}

			if (count($this->data->baseIds)) {
				$this->data = $this->Filter->setFilters($baseItems, $this->data);
			}

			$this->setView();
		}
	}

	/**
	 * Get ajax request data
	 *
	 * @param  string  $field  Input type field
	 * @param  string  $value  Input value field
	 *
	 * @throws Exception
	 * @since        1.0.0
	 * @noinspection PhpStatementHasEmptyBodyInspection
	 */
	public function getAjaxData(string $field, string $value): void
	{
		if ($field == 'view' && $this->data->limitstart > 0) {
			$this->data->start      = $this->data->limitstart;
			$this->data->limitstart = 0;
		}

		if ($field == 'page') {
			$this->data->start = $value;
		}
		else if ($field == 'order') {
			// Ordering requested
			// Set pagination to beginning
			$this->data->start = 0;

			if ($value == '01' || $value == '02') {
				$this->data->ordercustom = '';
				$this->data->ordering    = 'ordering';
				$this->data->direction   = $value == '01' ? 'asc' : 'desc';
			}
			else if ($value == '11' || $value == '12') {
				$this->data->ordercustom = '';
				$this->data->ordering    = 'property_name';
				$this->data->direction   = $value == '11' ? 'asc' : 'desc';
			}
			else if ($value == '21' || $value == '22') {
				$this->data->ordercustom = $value == '21' ? 'sleeps asc, allsleeps asc' : 'sleeps desc, allsleeps desc';
				$this->data->ordering    = '';
				$this->data->direction   = '';
			}
			else if ($value == '31' || $value == '32') {
				$this->data->ordercustom = '';
				$this->data->ordering    = 'bedrooms';
				$this->data->direction   = $value == '31' ? 'asc' : 'desc';
			}
			else if ($value == '41' || $value == '42') {
				$value == '41' ? asort($this->data->rateNet) : arsort($this->data->rateNet);
				$ids                     = array_keys($this->data->rateNet);
				$ids                     = array_values($ids);
				$ids                     = implode(',', $ids);
				$this->data->ordercustom = "field ( a.id, " . $ids . ")";
				$this->data->ordering    = '';
				$this->data->direction   = '';
			}
			else if ($value == '51' || $value == '52') {
				$this->data->ordercustom = '';
				$this->data->ordering    = 'property_area';
				$this->data->direction   = $value == '51' ? 'asc' : 'desc';
			}
			else if ($value == '61' || $value == '62') {
				$this->data->ordercustom = '';
				$this->data->ordering    = 'rating';
				$this->data->direction   = $value == '61' ? 'asc' : 'desc';
			}

			$this->data->order = $value;
		}
		else if ($field === 'view') {
			//Toggle from map to view
			$this->data->view = $value;
		}
		else if ($field === 'currency') {
			// TODO-v4.3 Pricing by currency
			// Set currency, get updated dropdown and refresh current page
			//			$currency                                                  = $value;
			//			$tmpBookingHandler->user_settings['current_exchange_rate'] = $currency;
			//
			//			if ( is_null( $tmpBookingHandler->user_settings['current_exchange_rate'] ) )
			//				$tmpBookingHandler->user_settings['current_exchange_rate'] = '';
			//
			//			jr_import( 'jomres_currency_conversion' );
			//			$conversion = new jomres_currency_conversion();
			//
			//			if ( !$conversion->check_currency_code_valid( $tmpBookingHandler->user_settings['current_exchange_rate'] ) )
			//				$tmpBookingHandler->user_settings['current_exchange_rate'] = '';
			//
			//			$componentArgs               = [];
			//			$componentArgs['returnData'] = true;
			//
			//			$cDropdown = $MiniComponents->specificEvent( '06000', 'exchange_rate_conversion_selector', $componentArgs );
			//
			//			$uids           = $filter_results;
			//			$num_properties = count( $uids );
		}
		else {
			if ($field === 'clear' || $field === 'toggle') {
				$filterArea     = $this->clearFilter($this->data->filterArea);
				$filterBedrooms = $this->clearFilter($this->data->filterBedrooms);
				$filterBook     = $this->clearFilter($this->data->filterBook);
				$filterCategory = $this->clearFilter($this->data->filterCategory);
				$filterFeature  = $this->clearFilter($this->data->filterFeature);
				$filterPets     = $this->clearFilter($this->data->filterPets);
				$filterPrice    = $this->clearFilter($this->data->filterPrice);
				$filterType     = $this->clearFilter($this->data->filterType);
			}
			else {
				$filterArea     = $this->data->filterArea;
				$filterBedrooms = $this->data->filterBedrooms;
				$filterBook     = $this->data->filterBook;
				$filterCategory = $this->data->filterCategory;
				$filterFeature  = $this->data->filterFeature;
				$filterPets     = $this->data->filterPets;
				$filterPrice    = $this->data->filterPrice;
				$filterType     = $this->data->filterType;

				if ($field == 'area') {
					$filterArea = self::checkSelection($filterArea, $value);
				}
				else if ($field == 'bedrooms') {
					$filterBedrooms = self::checkSelection($filterBedrooms, $value);
				}
				else if ($field == 'book') {
					$filterBook = self::checkSelection($filterBook, $value);
				}
				else if ($field == 'category') {
					$filterCategory = self::checkSelection($filterCategory, $value);
				}
				else if ($field == 'feature') {
					$filterFeature = self::checkSelection($filterFeature, $value);
				}
				else if ($field == 'pets') {
					$filterPets = self::checkSelection($filterPets, $value);
				}
				else if ($field == 'price') {
					$filterPrice = self::checkSelection($filterPrice, $value);
				}
				else if ($field == 'type') {
					$filterType = self::checkSelection($filterType, $value);
				}
			}

			$this->data->filterBedrooms = $filterBedrooms;
			$this->data->filterBook     = $filterBook;
			$this->data->filterCategory = $filterCategory;
			$this->data->filterFeature  = $filterFeature;
			$this->data->filterPets     = $filterPets;
			$this->data->filterPrice    = $filterPrice;
			$this->data->filterType     = $filterType;
			$this->data->filterArea     = $filterArea;
		}
	}

	/**
	 * Check that all calendar conditions are met
	 *
	 * @param  array  $rates  Rates for properties
	 *
	 * @since  3.3.4
	 */
	private function checkCalendarData(array $rates): void
	{
		$valid = [];
		foreach ($this->data->baseIds as $id) {
			try {
				$Calendar = new Calendar\Search($id, $this->data->arrival, $this->data->departure, $rates[$id] ?? []);
				if ($Calendar->checkSearchDates()) {
					$valid[] = $id;
				}
			} catch (Exception) {
				continue;
			}
		}

		$this->data->baseIds = $valid;
	}

	/**
	 * Check that the number of guests does not exceed the max for a property
	 *
	 * @param  array  $items  Base properties data for search
	 *
	 * @since  4.0.0
	 */
	private function checkGuestNumbers(array $items): void
	{
		$valid = [];

		foreach ($items as $item) {
			if (!in_array($item->id, $this->data->baseIds)) {
				continue;
			}

			$free =
				SiteHelper::setFreeGuests($item->sleeps_infant_max, $item->sleeps_infant_age, $this->data->child_ages);

			if ($this->data->guests > $item->sleeps + $item->sleeps_extra + $free) {
				if ($this->data->guests > $item->sleeps + $item->sleeps_extra) {
					continue;
				}
			}

			if ($this->data->children > 0 && is_countable($this->data->child_ages)) {
				if (count($this->data->child_ages) > 0 && count($this->data->child_ages) < $this->data->children) {
					continue;
				}
			}

			$valid[] = $item->id;
		}

		$this->data->baseIds = $valid;
	}

	/**
	 * Clear the filter count and selected filters
	 *
	 * @param  array  $selected  Selected filters
	 *
	 * @since  1.0.0
	 * @return mixed
	 */
	private function clearFilter(array $selected): array
	{
		foreach ($selected as $k => $v) {
			$selected[$k][1] = 0;
			$selected[$k][2] = 0;
		}

		return $selected;
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
	 * Clear and reset the filter data
	 *
	 * @param  array  $saved  Saved filter
	 * @param  array  $new    New filters
	 *
	 * @since  3.3.0
	 * @return array
	 */
	private function presetFilterCount(array $saved, array $new): array
	{
		$saved = $this->zeroFilterCount($saved);
		foreach ($new as $t) {
			$saved = $this->setFilterCount($saved, $t->id, $t->total);
		}

		return $saved;
	}

	/**
	 * Set the actual rates for selected dates and guests
	 *
	 * @throws RuntimeException
	 * @throws Exception
	 * @since  1.0.0
	 */
	private function setActualRates(): void
	{
		$rates =
			$this->setForProperty(KrFactory::getListModel('rates')
			                               ->getRatesForProperty($this->data->baseIds,
			                                                     $this->data->arrival,
			                                                     $this->data->departure));
		$this->checkCalendarData($rates);
		if (!count($this->data->baseIds)) {
			return;
		}

		$discounts   =
			$this->setForProperty(KrFactory::getListModel('discounts')->getDiscounts($this->data->baseIds));
		$extras      =
			$this->setForProperty(KrFactory::getListModel('extras')->getPricingExtras($this->data->baseIds, true));
		$ratemarkups =
			$this->setForProperty(KrFactory::getListModel('ratemarkups')->getMarkups($this->data->baseIds));
		$seasons     = KrFactory::getListModel('seasons')->getSeasons();

		$contractSession = new KrSession\Contract;
		foreach ($this->data->baseIds as $property_id) {
			$contractData                = $contractSession->resetData();
			$contractData->adjustmentsRq = false;
			$contractData->adults        = $this->data->adults;
			$contractData->arrival       = $this->data->arrival;
			$contractData->children      = $this->data->children;
			$contractData->child_ages    = $this->data->child_ages;
			$contractData->departure     = $this->data->departure;
			$contractData->discountsDb   = $discounts[$property_id] ?? [];
			$contractData->extrasDb      = $extras[$property_id] ?? [];
			$contractData->guests        = $this->data->guests;
			$contractData->property_id   = $property_id;
			$contractData->ratesDb       = $rates[$property_id] ?? [];
			$contractData->ratemarkupsDb = $ratemarkups[$property_id] ?? [];
			$contractData->seasonsDb     = $seasons;
			$Hub                         = new Hub($contractData);

			$computations = ['base',
			                 'dow',
			                 'seasons',
			                 'shortstay',
			                 'longstay',
			                 'ratemarkup',
			                 'discount',
			                 'tax',
			                 'extras',
			];
			$Hub->compute($computations, true);

			$contract_total = $Hub->getValue('contract_total');
			$discount       = $Hub->getValue('discount');
			if (!$contract_total) {
				$this->data->rateNet[$property_id]      = $this->highval;
				$this->data->rateDiscount[$property_id] = 0;
			}
			else {
				$this->data->rateNet[$property_id]      = $contract_total;
				$this->data->rateDiscount[$property_id] = $discount;
			}

			$this->data->currency = $Hub->getValue('currency');
		}

		$contractSession->resetData();
	}

	/**
	 * Set the currency for the search from a property
	 * as all properties in the search have the same currency
	 *
	 * @throws RuntimeException
	 * @since 3.3.0
	 */
	private function setCurrency(): void
	{
		$settings             =
			KrFactory::getListModel('propertysettings')->getPropertysettings($this->data->baseIds[0], 'currency');
		$this->data->currency = $settings['currency'];
	}

	/**
	 * Increase the filter count if a matching record is found
	 *
	 * @param  array  $selected  Current counts and selections
	 * @param  mixed  $id        Current item
	 * @param  int    $value     Value to increment
	 *
	 * @since  1.0.0
	 * @return array
	 */
	private function setFilterCount(array $selected, mixed $id, int $value): array
	{
		foreach ($selected as $k => $v) {
			if ($k == $id) {
				$selected[$k][1] += $value;
			}
		}

		return $selected;
	}

	/**
	 * Increase the filter count for prices if a record is found
	 *
	 * @param  array  $selected  Current counts and selections
	 * @param  int    $price     Price of current item
	 *
	 * @since  1.2.2
	 * @return array
	 */
	private function setFilterPriceCount(array $selected, int $price): array
	{
		foreach ($selected as $k => $v) {
			if ($price >= (int) $k && $price <= (int) $v[0]) {
				$selected[$k][1]++;
				break;
			}
		}

		return $selected;
	}

	/**
	 * Extract database results per property
	 *
	 * @param  array  $db_rows  Database rows
	 *
	 * @since  3.2.0
	 * @return array
	 */
	private function setForProperty(array $db_rows): array
	{
		$rows = [];
		foreach ($db_rows as $r) {
			$rows[$r->property_id][] = $r;
		}

		return $rows;
	}

	/**
	 * Set availability dates from input
	 *
	 * @throws Exception
	 * @since  3.3.0
	 */
	private function setInputAvailability(): void
	{
		if (!empty($this->data->arrival)) {
			if (!empty($this->data->departure)) {
				$this->data->nights = TickTock::differenceDays($this->data->arrival, $this->data->departure);
			}
			else {
				$this->data->departure = TickTock::modifyDays($this->data->arrival, 7);
				$this->data->nights    = 7;
			}

			$this->data->byAvailability = true;
		}
	}

	/**
	 * Set ordering
	 *
	 * @throws Exception
	 * @since  3.3.0
	 */
	private function setInputOrdering(): void
	{
		if (!empty($this->data->order)) {
			return;
		}

		$default               = $this->params->get('order_default', '01');
		$this->data->direction = 'asc';

		switch ($default) {
			case '01':
				$this->data->ordercustom = '';
				$this->data->ordering    = 'a.ordering';
				break;
			case '11':
				$this->data->ordercustom = '';
				$this->data->ordering    = 'property_name';
				break;
			case '21':
				$this->data->ordercustom = 'sleeps asc, allsleeps asc';
				$this->data->ordering    = '';
				break;
			case '31':
				$this->data->ordercustom = '';
				$this->data->ordering    = 'bedrooms';
				break;
			case '51':
				$this->data->ordercustom = '';
				$this->data->ordering    = 'property_area';
				break;
			case '61':
				$this->data->ordercustom = '';
				$this->data->ordering    = 'rating';
				break;
		}
	}

	/**
	 * Set the minimum rates for non-availability searches
	 *
	 * @throws RuntimeException
	 * @throws Exception
	 * @since  2.3.0
	 */
	private function setMinRates(): void
	{
		$prices = [];
		foreach ($this->data->baseIds as $p) {
			$prices[$p] = $this->highval;
		}

		$rates = KrFactory::getListModel('rates')->getMinRates($this->data->baseIds, TickTock::getDate(), 1);
		if (is_countable($rates) && count($rates)) {
			$net_rates  = KrFactory::getListModel('propertysettings')->getOneSetting('net_rates');
			$net_markup = KrFactory::getListModel('propertysettings')->getOneSetting('net_markup');

			foreach ($rates as $r) {
				$net = array_key_exists($r->property_id, $net_rates) ? $net_rates[$r->property_id] : $net_rates[0];
				if ($net) {
					$markup                  = $net_markup[$r->property_id] ?? $net_markup[0];
					$prices[$r->property_id] =
						KrFactory::getAdminModel('ratemarkup')::getGrossRate((float) $r->minrate, $markup);
				}
				else {
					$prices[$r->property_id] = (int) $r->minrate;
				}
			}
		}

		asort($prices);
		$this->data->rateNet      = $prices;
		$this->data->rateDiscount = [];
	}

	/**
	 * Set default view
	 *
	 * @throws Exception
	 * @since  3.3.0
	 */
	private function setView(): void
	{
		$view = $this->data->view;
		if (!$view) {
			$view = $this->params->get('default_view', 'list');
		}

		$this->data->view = $view;
	}

	/**
	 * Validate region
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	private function validateRegion(): void
	{
		if (!count($this->data->region_id) && !$this->data->layout) {
			$id                         = $this->params->get('default_region');
			$this->data->region_id[$id] = $this->Translations->getText('region', $id);
		}

		foreach ($this->data->region_id as $id => $region_name) {
			$region = KrFactory::getAdminModel('region')->getItem($id);
			if (empty($region->id) || $region->state != 1) {
				unset($this->data->region_id[$id]);
				continue;
			}

			$this->data->region_name[$id]  = $region_name;
			$this->data->country_name[$id] = $this->Translations->getText('country', $region->country_id);
			$this->data->map_zoom          = min($region->map_zoom, $this->data->map_zoom);
			$this->data->map_zoom_max      = max($region->map_zoom_max, $this->data->map_zoom_max);
		}
	}

	/**
	 * Zeroise the filter count
	 *
	 * @param  array  $selected  Selected items
	 *
	 * @since  1.0.0
	 * @return array
	 */
	private function zeroFilterCount(array $selected): array
	{
		foreach ($selected as $k => $v) {
			$selected[$k][1] = 0;
		}

		return $selected;
	}
}