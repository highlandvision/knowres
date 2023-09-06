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
	 * Check if a region is selected
	 *
	 * @param  array  $regions    Selected regions
	 * @param  int    $region_id  ID of region to check
	 *
	 * @since  4.3.0
	 * @return bool
	 */
	// TODO v4.3 Delete if OK
//	private static function regionIsSelected(array $regions, int $region_id): bool
//	{
//		foreach ($regions as $id => $values) {
//			if ($id == $region_id) {
//				return $values[2];
//			}
//		}
//	}

	/**
	 * Set count for the displayed filters
	 *
	 * @param  array  $totalAreas     Areas
	 * @param  array  $totalBedrooms  Bedrooms
	 * @param  array  $totalBook      Booking type
	 * @param  array  $totalCategory  Categories
	 * @param  array  $totalFeature   Features
	 * @param  array  $totalPets      Pets
	 * @param  array  $totalPrice     Prices
	 * @param  array  $totalTypes     Property types
	 *
	 * @since 1.0.0
	 */
	public function countAjaxFilters(array $totalAreas = [],
	                                 array $totalBedrooms = [],
	                                 array $totalBook = [],
	                                 array $totalCategory = [],
	                                 array $totalFeature = [],
	                                 array $totalPets = [],
	                                 array $totalPrice = [],
	                                 array $totalTypes = []): void
	{
		if ($this->params->get('filter_area')) {
			$this->presetFilterCountArea($this->searchData->filterArea, $totalAreas);
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
			//TODO v4.3 Test price filter
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
				match ($field) {
					'property_area' => $this->checkSelection($this->searchData->filterArea, $value, false),
					'bedrooms'      => $this->checkSelection($this->searchData->filterBedrooms, $value, false),
					'book'          => $this->checkSelection($this->searchData->filterBook, $value, false),
					'category'      => $this->checkSelection($this->searchData->filterCategory, $value, false),
					'feature'       => $this->checkSelection($this->searchData->filterFeature, $value, false),
					'pets'          => $this->checkSelection($this->searchData->filterPets, $value, false),
					'price'         => $this->checkSelection($this->searchData->filterPrice, $value, false),
					'type'          => $this->checkSelection($this->searchData->filterType, $value, false)
				};
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
	 * Clear and reset the filter data for area allowing check for selected region
	 *
	 * @param  array  $saved  Saved filter (by reference)
	 * @param  array  $new    New filters
	 *
	 * @since  3.3.0
	 */
	private function presetFilterCountArea(array &$saved, array $new): void
	{
		foreach ($new as $k => $v) {
			$saved[$k][1] = $v[1];
		}
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
			$this->searchData->ordercustom = '';
			$this->searchData->ordering    = '';
			$this->searchData->direction   = '';
		$this->searchData->order       = $order;

		switch ($order) {
			case '01':
				$this->searchData->ordering  = 'ordering';
				$this->searchData->direction = 'asc';
				break;
			case '02':
				$this->searchData->ordering  = 'ordering';
				$this->searchData->direction = 'desc';
				break;
			case '11':
				$this->searchData->ordering  = 'property_name';
				$this->searchData->direction = 'asc';
				break;
			case '12':
				$this->searchData->ordering  = 'property_name';
				$this->searchData->direction = 'desc';
				break;
			case '21':
				$this->searchData->ordercustom = 'sleeps asc, allsleeps asc';
				break;
			case '22':
				$this->searchData->ordercustom = 'sleeps desc, allsleeps desc';
				break;
			case '31':
			$this->searchData->ordering    = 'bedrooms';
				$this->searchData->direction = 'asc';
				break;
			case '32':
				$this->searchData->ordering  = 'bedrooms';
				$this->searchData->direction = 'desc';
				break;
			case '41':
				asort($this->searchData->rateNet);
				$ids                           = implode(',', array_values(array_keys($this->searchData->rateNet)));
				$this->searchData->ordercustom = "field ( a.id, " . $ids . ")";
				break;
			case '42':
				arsort($this->searchData->rateNet);
				$ids                           = implode(',', array_values(array_keys($this->searchData->rateNet)));
			$this->searchData->ordercustom = "field ( a.id, " . $ids . ")";
				break;
			case '51':
				$this->searchData->ordering  = 'property_area';
				$this->searchData->direction = 'asc';
				break;
			case '52':
			$this->searchData->ordering    = 'property_area';
				$this->searchData->direction = 'desc';
				break;
			case '61':
			$this->searchData->ordering    = 'rating';
				$this->searchData->direction = 'asc';
				break;
			case '62':
				$this->searchData->ordering  = 'rating';
				$this->searchData->direction = 'desc';
		}
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