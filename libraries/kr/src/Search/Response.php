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
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Translations;
use Joomla\Registry\Registry;
use stdClass;

use function array_keys;
use function array_values;
use function arsort;
use function asort;
use function count;
use function implode;

/**
 * Site search for properties
 *
 * @since 4.3.0
 */
class Response
{
	/** @var stdClass Search session data. */
	public stdClass $searchData;
	/** @var Translations Translations object. */
	protected Translations $Translations;
	/** @var Registry KR paramaters. */
	private Registry $params;

	/**
	 * Initialize
	 *
	 * @param  stdClass  $data  Search session data.
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	public function __construct(stdClass $data)
	{
		$this->searchData   = $data;
		$this->params       = KrMethods::getParams();
		$this->Translations = new Translations();
	}

	/**
	 * Set count for the displayed filters
	 *
	 * @param  array  $totalRegions
	 * @param  array  $totalAreas
	 * @param  array  $totalBedrooms
	 * @param  array  $totalBook
	 * @param  array  $totalCategory
	 * @param  array  $totalFeature
	 * @param  array  $totalPets
	 * @param  array  $totalPrice
	 * @param  array  $totalTypes
	 *
	 * @since 1.0.0
	 */
	public function countAjaxFilters(array $totalRegions = [],
	                                 array $totalAreas = [],
	                                 array $totalBedrooms = [],
	                                 array $totalBook = [],
	                                 array $totalCategory = [],
	                                 array $totalFeature = [],
	                                 array $totalPets = [],
	                                 array $totalPrice = [],
	                                 array $totalTypes = []): void
	{
		if ($this->params->get('filter_area') && count($this->searchData->region_id) > 1) {
			$this->presetFilterCount($this->searchData->filterRegion, $totalRegions);
		}

		if ($this->params->get('filter_area') && (count($this->searchData->region_id) == 1 ||
				$this->regionIsSelected($this->searchData->filterRegion))) {
			$this->presetFilterCount($this->searchData->filterArea, $totalAreas);
		}

		if ($this->params->get('filter_bedrooms')) {
			$this->zeroFilterCount($this->searchData->filterBedrooms);
			$max_bedrooms = $this->params->get('search_maxbedrooms', 6);
			foreach ($totalBedrooms as $t) {
				if ($t->id >= $max_bedrooms) {
					$this->setFilterCount($this->searchData->filterBedrooms, $max_bedrooms, $t->total);
				}
				else {
					$this->setFilterCount($this->searchData->filterBedrooms, (int) $t->id, $t->total);
				}
			}
		}

		if ($this->params->get('filter_book')) {
			$this->presetFilterCount($this->searchData->filterBook, $totalBook);
		}

		if ($this->params->get('filter_category')) {
			$this->zeroFilterCount($this->searchData->filterCategory);
			foreach ($totalCategory as $t) {
				$this->setFilterCount($this->searchData->filterCategory, (int) $t[0], $t[1]);
			}
		}

		if ($this->params->get('filter_property_feature')) {
			$this->zeroFilterCount($this->searchData->filterFeature);
			foreach ($totalFeature as $t) {
				$this->setFilterCount($this->searchData->filterFeature, (int) $t[0], $t[1]);
			}
		}

		if ($this->params->get('filter_pets')) {
			$this->presetFilterCount($this->searchData->filterPets, $totalPets);
		}

		if ($this->params->get('filter_price')) {
//			$this->zeroFilterCount($this->searchData->filterPrice);
			foreach ($totalPrice as $t) {
				if (isset($this->searchData->rateNet[$t->id])) {
					$this->setFilterPriceCount($this->searchData->filterPrice, $this->searchData->rateNet[$t->id]);
				}
			}
		}

		if ($this->params->get('filter_type')) {
			$this->presetFilterCount($this->searchData->filterType, $totalTypes);
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
		if ($field == 'view' && $this->searchData->limitstart > 0) {
			$this->searchData->start      = $this->searchData->limitstart;
			$this->searchData->limitstart = 0;
		}

		if ($field == 'page') {
			$this->searchData->start = $value;
		}
		else if ($field == 'order') {
			$this->setOrder($value);
		}
		else if ($field === 'view') {
			// Toggle from map to view
			$this->searchData->view = $value;
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
				$this->clearFilter($this->searchData->filterRegion);
				$this->clearFilter($this->searchData->filterArea);
				$this->clearFilter($this->searchData->filterBedrooms);
				$this->clearFilter($this->searchData->filterBook);
				$this->clearFilter($this->searchData->filterCategory);
				$this->clearFilter($this->searchData->filterFeature);
				$this->clearFilter($this->searchData->filterPets);
				$this->clearFilter($this->searchData->filterPrice);
				$this->clearFilter($this->searchData->filterType);
			}
			else {
				$this->searchData->field = $field;
				if ($field == 'region') {
					$this->checkSelection($this->searchData->filterRegion, $value, false);
				}
				if ($field == 'area') {
					$this->checkSelection($this->searchData->filterArea, $value, false);
				}
				else if ($field == 'bedrooms') {
					$this->checkSelection($this->searchData->filterBedrooms, $value, false);
				}
				else if ($field == 'book') {
					$this->checkSelection($this->searchData->filterBook, $value, false);
				}
				else if ($field == 'category') {
					$this->checkSelection($this->searchData->filterCategory, $value, false);
				}
				else if ($field == 'feature') {
					$this->checkSelection($this->searchData->filterFeature, $value, false);
				}
				else if ($field == 'pets') {
					$this->checkSelection($this->searchData->filterPets, $value, false);
				}
				else if ($field == 'price') {
					$this->checkSelection($this->searchData->filterPrice, $value, false);
				}
				else if ($field == 'type') {
					$this->checkSelection($this->searchData->filterType, $value, false);
				}
			}
		}
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
		$selected[$value][2] = $checked ? 0 : 1;

		if ($reset) {
			foreach ($selected as $k => $v) {
				if (!isset($v[1]) || !$v[1]) {
					$selected[$k][2] = 0;
				}
			}
		}
	}

	/**
	 * Clear the filter count and selected filters
	 *
	 * @param  array  $selected  Selected filters (pass by reference)
	 *
	 * @since  1.0.0
	 */
	private function clearFilter(array &$selected): void
	{
		foreach ($selected as $k => $v) {
			$selected[$k][1] = 0;
			$selected[$k][2] = 0;
		}
	}

	/**
	 * Clear and reset the filter data
	 *
	 * @param  array  $saved  Saved filter (by reference)
	 * @param  array  $new    New filters
	 *
	 * @since  3.3.0
	 */
	private function presetFilterCount(array &$saved, array $new): void
	{
		$this->zeroFilterCount($saved);
		foreach ($new as $t) {
			$this->setFilterCount($saved, $t->id, $t->total);
		}
	}

	/**
	 * Check if any region is selected
	 *
	 * @param  array  $selected  Selected regions
	 *
	 * @since  4.3.0
	 * @return bool
	 */
	private function regionIsSelected(array $selected): bool
	{
		return isset($selected[$value][2]);
	}

	/**
	 * Increase the filter count if a matching record is found
	 *
	 * @param  array  $selected  Current counts and selections (by reference)
	 * @param  mixed  $id        Current item
	 * @param  int    $value     Value to increment
	 *
	 * @since  1.0.0
	 */
	private function setFilterCount(array &$selected, mixed $id, int $value): void
	{
		foreach ($selected as $k => $v) {
			if ($k == $id) {
				$selected[$k][1] += $value;
			}
		}
	}

	/**
	 * Increase the filter count for prices if a record is found
	 *
	 * @param  array  $selected  Current counts and selections (by reference)
	 * @param  int    $price     Price of current item
	 *
	 * @since  1.2.2
	 */
	private function setFilterPriceCount(array &$selected, int $price): void
	{
		foreach ($selected as $k => $v) {
			if ($price >= (int) $k && $price <= (int) $v[0]) {
				$selected[$k][1]++;
				break;
			}
		}
	}

	/**
	 * Set property ordering
	 *
	 * @param  int  $order  Property order
	 *
	 * @since  4.3.0
	 */
	private function setOrder(int $order): void
	{
		$this->searchData->start = 0;

		if ($order == '01' || $order == '02') {
			$this->searchData->ordercustom = '';
			$this->searchData->ordering    = 'ordering';
			$this->searchData->direction   = $order == '01' ? 'asc' : 'desc';
		}
		else if ($order == '11' || $order == '12') {
			$this->searchData->ordercustom = '';
			$this->searchData->ordering    = 'property_name';
			$this->searchData->direction   = $order == '11' ? 'asc' : 'desc';
		}
		else if ($order == '21' || $order == '22') {
			$this->searchData->ordercustom =
				$order == '21' ? 'sleeps asc, allsleeps asc' : 'sleeps desc, allsleeps desc';
			$this->searchData->ordering    = '';
			$this->searchData->direction   = '';
		}
		else if ($order == '31' || $order == '32') {
			$this->searchData->ordercustom = '';
			$this->searchData->ordering    = 'bedrooms';
			$this->searchData->direction   = $order == '31' ? 'asc' : 'desc';
		}
		else if ($order == '41' || $order == '42') {
			$order == '41' ? asort($this->searchData->rateNet) : arsort($this->searchData->rateNet);
			$ids                           = array_keys($this->searchData->rateNet);
			$ids                           = array_values($ids);
			$ids                           = implode(',', $ids);
			$this->searchData->ordercustom = "field ( a.id, " . $ids . ")";
			$this->searchData->ordering    = '';
			$this->searchData->direction   = '';
		}
		else if ($order == '51' || $order == '52') {
			$this->searchData->ordercustom = '';
			$this->searchData->ordering    = 'property_area';
			$this->searchData->direction   = $order == '51' ? 'asc' : 'desc';
		}
		else if ($order == '61' || $order == '62') {
			$this->searchData->ordercustom = '';
			$this->searchData->ordering    = 'rating';
			$this->searchData->direction   = $order == '61' ? 'asc' : 'desc';
		}

		$this->searchData->order = $order;
	}

	/**
	 * Zeroise the filter count
	 *
	 * @param  array  $selected  Selected items (by reference)
	 *
	 * @since  1.0.0
	 */
	private function zeroFilterCount(array &$selected): void
	{
		foreach ($selected as $k => $v) {
			$selected[$k][1] = 0;
		}
	}
}