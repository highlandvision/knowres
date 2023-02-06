<?php
/**
 * @package     Know Reservations
 * @subpackage  Library
 * @copyright   Copyright (c) 2020, Highland Vision. All rights reserved.
 * @license     See the file LICENSE.txt for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\KR;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Session as KrSession;
use Joomla\Registry\Registry;
use RuntimeException;
use stdClass;

use function array_key_exists;
use function array_keys;
use function array_values;
use function arsort;
use function asort;
use function ceil;
use function count;
use function implode;
use function in_array;
use function strcmp;

/**
 * Site search for properties
 *
 * @since   1.0.0
 */
class Search
{
	/** @var stdClass Search session data. */
	public stdClass $data;
	/** @var int Value set for properties with no rate. */
	protected int $highval = 9999999;
	/** @var array Price ranges. */
	protected array $ranges = [];
	/** @var Registry KR paramaters. */
	private Registry $params;
	/** @var Translations Translations object. */
	protected Translations $Translations;

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
		$this->data         = clone $data;
		$this->params       = KrMethods::getParams();
		$this->Translations = new Translations();
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
	private static function cmp(array $a, array $b): int
	{
		if (isset($a[3]) && isset($b[3]))
		{
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
	private static function cmpnat(array $a, array $b): int
	{
		if (isset($a[3]) && isset($b[3]))
		{
			return strnatcmp($a[3], $b[3]);
		}

		return 0;
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
		array $totalCategory = [],
		array $idPrice = []): void
	{
		if ($this->params->get('filter_area'))
		{
			$this->data->filterArea = $this->presetFilterCount($this->data->filterArea, $totalArea);
		}

		if ($this->params->get('filter_bedrooms'))
		{
			$this->data->filterBedrooms = $this->zeroFilterCount($this->data->filterBedrooms);
			$max_bedrooms               = $this->params->get('search_maxbedrooms', 6);
			foreach ($totalBedrooms as $t)
			{
				if ($t->id >= $max_bedrooms)
				{
					$this->data->filterBedrooms = $this->setFilterCount($this->data->filterBedrooms, $max_bedrooms,
						$t->total);
				}
				else
				{
					$this->data->filterBedrooms = $this->setFilterCount($this->data->filterBedrooms, (int) $t->id,
						$t->total);
				}
			}
		}

		if ($this->params->get('filter_book'))
		{
			$this->data->filterBook = $this->presetFilterCount($this->data->filterBook, $totalBook);
		}

		if ($this->params->get('filter_price'))
		{
			$this->data->filterPrice = $this->zeroFilterCount($this->data->filterPrice);
			foreach ($idPrice as $t)
			{
				if (isset($this->data->rateNet[$t->id]))
				{
					$price                   = $this->data->rateNet[$t->id];
					$this->data->filterPrice = $this->setFilterPriceCount($this->data->filterPrice, $price);
				}
			}
		}

		if ($this->params->get('filter_category'))
		{
			$this->data->filterCategory = $this->zeroFilterCount($this->data->filterCategory);
			foreach ($totalCategory as $t)
			{
				$this->data->filterCategory = $this->setFilterCount($this->data->filterCategory, (int) $t[0], $t[1]);
			}
		}

		if ($this->params->get('filter_property_feature'))
		{
			$this->data->filterFeature = $this->zeroFilterCount($this->data->filterFeature);
			foreach ($totalFeature as $t)
			{
				$this->data->filterFeature = $this->setFilterCount($this->data->filterFeature, (int) $t[0], $t[1]);
			}
		}

		if ($this->params->get('filter_type'))
		{
			$this->data->filterType = $this->presetFilterCount($this->data->filterType, $totalType);
		}

		if ($this->params->get('filter_town'))
		{
			$this->data->filterTown = $this->presetFilterCount($this->data->filterTown, $totalTown);
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
		if (is_countable($baseItems) && count($baseItems))
		{
			$this->data->baseIds = array_column($baseItems, 'id');
			$this->setCurrency();

			$this->checkGuestData($baseItems);
			if (!count($this->data->baseIds))
			{
				return;
			}

			if ($this->data->byAvailability)
			{
				$this->setActualRates();
			}
			else
			{
				$this->setMinRates();
			}

			if (count($this->data->baseIds))
			{
				$this->setBaseFilters($baseItems);
			}

			$this->setView();
		}
	}

	/**
	 * Get ajax request data
	 *
	 * @param  string  $field       Input type field
	 * @param  string  $value       Input value field
	 *
	 * @throws Exception
	 * @since        1.0.0
	 * @noinspection PhpStatementHasEmptyBodyInspection
	 */
	public function getAjaxData(string $field, string $value): void
	{
		if ($field == 'view' && $this->data->limitstart > 0)
		{
			$this->data->start      = $this->data->limitstart;
			$this->data->limitstart = 0;
		}

		if ($field == 'page')
		{
			$this->data->start = $value;
		}
		else if ($field == 'order')
		{
			// Ordering requested
			// Set pagination to beginning
			$this->data->start = 0;

			if ($value == '01' || $value == '02')
			{
				$this->data->ordercustom = '';
				$this->data->ordering    = 'ordering';
				$this->data->direction   = $value == '01' ? 'asc' : 'desc';
			}
			else if ($value == '11' || $value == '12')
			{
				$this->data->ordercustom = '';
				$this->data->ordering    = 'property_name';
				$this->data->direction   = $value == '11' ? 'asc' : 'desc';
			}
			else if ($value == '21' || $value == '22')
			{
				$this->data->ordercustom = $value == '21' ? 'sleeps asc, allsleeps asc' : 'sleeps desc, allsleeps desc';
				$this->data->ordering    = '';
				$this->data->direction   = '';
			}
			else if ($value == '31' || $value == '32')
			{
				$this->data->ordercustom = '';
				$this->data->ordering    = 'bedrooms';
				$this->data->direction   = $value == '31' ? 'asc' : 'desc';
			}
			else if ($value == '41' || $value == '42')
			{
				$value == '41' ? asort($this->data->rateNet) : arsort($this->data->rateNet);
				$ids                     = array_keys($this->data->rateNet);
				$ids                     = array_values($ids);
				$ids                     = implode(',', $ids);
				$this->data->ordercustom = "field ( a.id, " . $ids . ")";
				$this->data->ordering    = '';
				$this->data->direction   = '';
			}
			else if ($value == '51' || $value == '52')
			{
				$this->data->ordercustom = '';
				$this->data->ordering    = 'property_area';
				$this->data->direction   = $value == '51' ? 'asc' : 'desc';
			}
			else if ($value == '61' || $value == '62')
			{
				$this->data->ordercustom = '';
				$this->data->ordering    = 'rating';
				$this->data->direction   = $value == '61' ? 'asc' : 'desc';
			}

			$this->data->order = $value;
		}
		else if ($field === 'view')
		{
			//Toggle from map to view
			$this->data->view = $value;
		}
		else if ($field === 'currency')
		{
			// TODO-v4.1 Pricing by currency
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
		else
		{
			if ($field === 'clear' || $field === 'toggle')
			{
				$filterArea     = $this->clearFilter($this->data->filterArea);
				$filterBedrooms = $this->clearFilter($this->data->filterBedrooms);
				$filterBook     = $this->clearFilter($this->data->filterBook);
				$filterCategory = $this->clearFilter($this->data->filterCategory);
				$filterFeature  = $this->clearFilter($this->data->filterFeature);
				$filterPrice    = $this->clearFilter($this->data->filterPrice);
				$filterTown     = $this->clearFilter($this->data->filterTown);
				$filterType     = $this->clearFilter($this->data->filterType);
			}
			else
			{
				$filterArea     = $this->data->filterArea;
				$filterBedrooms = $this->data->filterBedrooms;
				$filterBook     = $this->data->filterBook;
				$filterCategory = $this->data->filterCategory;
				$filterFeature  = $this->data->filterFeature;
				$filterPrice    = $this->data->filterPrice;
				$filterTown     = $this->data->filterTown;
				$filterType     = $this->data->filterType;

				if ($field == 'area')
				{
					$filterArea = $this->checkSelection($filterArea, $value);
				}
				else if ($field == 'bedrooms')
				{
					$filterBedrooms = $this->checkSelection($filterBedrooms, $value);
				}
				else if ($field == 'book')
				{
					$filterBook = $this->checkSelection($filterBook, $value);
				}
				else if ($field == 'category')
				{
					$filterCategory = $this->checkSelection($filterCategory, $value);
				}
				else if ($field == 'feature')
				{
					$filterFeature = $this->checkSelection($filterFeature, $value);
				}
				else if ($field == 'price')
				{
					$filterPrice = $this->checkSelection($filterPrice, $value);
				}
				// TODO-v4.1 Filter by rating
				// elseif ($field == 'rating')
				// {
				//     $filterRating = $this->checkSelection($filterRating, $value);
				// }
				else if ($field == 'type')
				{
					$filterType = $this->checkSelection($filterType, $value);
				}
				else if ($field == 'town')
				{
					$filterTown = $this->checkSelection($filterTown, $value);
				}
			}

			$this->data->filterBedrooms = $filterBedrooms;
			$this->data->filterBook     = $filterBook;
			$this->data->filterCategory = $filterCategory;
			$this->data->filterFeature  = $filterFeature;
			$this->data->filterPrice    = $filterPrice;
			$this->data->filterType     = $filterType;
			$this->data->filterTown     = $filterTown;
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
		foreach ($this->data->baseIds as $id)
		{
			try
			{
				$Calendar = new Calendar\Search($id, $this->data->arrival, $this->data->departure, $rates[$id] ?? []);
				if ($Calendar->checkSearchDates())
				{
					$valid[] = $id;
				}
			}
			catch (Exception)
			{
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
	private function checkGuestData(array $items): void
	{
		$valid = [];

		foreach ($items as $item)
		{
			if (!in_array($item->id, $this->data->baseIds))
			{
				continue;
			}

			$free = $this->setFreeGuests($item);
			if ($this->data->guests > $item->sleeps + $item->sleeps_extra + $free)
			{
				continue;
			}

			if ($this->data->children > 0 && is_countable($this->data->child_ages))
			{
				if (count($this->data->child_ages) > 0 && count($this->data->child_ages) < $this->data->children)
				{
					continue;
				}
			}

			$valid[] = $item->id;
		}

		$this->data->baseIds = $valid;
	}

	/**
	 * Set number of free guests - children under free infants age
	 *
	 * @param  stdClass  $item  Property item details
	 *
	 * @since  4.0.0
	 * @return int
	 */
	protected function setFreeGuests(stdClass $item): int
	{
		if (!$item->sleeps_infant_max)
		{
			return 0;
		}

		$free = 0;
		foreach ($this->data->child_ages as $age)
		{
			if ($age <= $item->sleeps_infant_age && $free < $item->sleeps_infant_max)
			{
				$free++;
			}
		}

		return $free;
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
	private function checkSelection(array $selected, mixed $value, bool $reset = true): array
	{
		$checked = 0;
		if (isset($selected[$value][2]))
		{
			$checked = $selected[$value][2];
		}
		$selected[$value][2] = $checked ? 0 : 1;

		if ($reset)
		{
			foreach ($selected as $k => $v)
			{
				if (!isset($v[1]) || !$v[1])
				{
					$selected[$k][2] = 0;
				}
			}
		}

		return $selected;
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
		foreach ($selected as $k => $v)
		{
			$selected[$k][1] = 0;
			$selected[$k][2] = 0;
		}

		return $selected;
	}

	/**
	 * Get the categories with names
	 *
	 * @since  1.0.0
	 * @return array
	 */
	private function getCategoryNames(): array
	{
		$categories = [];

		$items = KrFactory::getListModel('categories')->getAllCategories();
		foreach ($items as $i)
		{
			$categories[$i->id] = $this->Translations->getText('category', $i->id);
		}

		return $categories;
	}

	/**
	 * Get the feature names
	 *
	 * @since  1.0.0
	 * @return array
	 */
	private function getFeatureNames(): array
	{
		$features = [];

		$results = KrFactory::getListModel('propertyfeatures')->getFeatureNames();
		foreach ($results as $r)
		{
			$features[$r->id] = $this->Translations->getText('propertyfeature', $r->id);
		}

		return $features;
	}

	/**
	 * Calculates the ranges for the price filter.
	 *
	 * @since  1.2.2
	 */
	private function getPriceRanges(): void
	{
		$ranges = [];
		$prices = $this->data->rateNet;
		sort($prices);
		$highest = 0;
		$lowest  = 0;

		foreach ($prices as $p)
		{
			if ($p != $this->highval)
			{
				$lowest = ceil($p / 10) * 10;
			}

			break;
		}

		$num_properties = 0;
		foreach ($prices as $p)
		{
			if ($p != $this->highval)
			{
				$num_properties++;
				$highest = $p;
			}
			else
			{
				break;
			}
		}

		$highest = ceil($highest / 10) * 10;

		// Calculate the increment
		$spread = $highest - $lowest;
		$levels = 5;
		if ($spread < 30 || $num_properties < 3)
		{
			$levels = 2;
		}
		else if ($spread < 40 || $num_properties < 4)
		{
			$levels = 3;
		}
		else if ($spread < 50 || $num_properties < 5)
		{
			$levels = 4;
		}

		$increment = $spread / $levels;
		$increment = ceil($increment / 10) * 10;

		$ranges[$lowest] = KrMethods::sprintf('COM_KNOWRES_SEARCH_UP_TO',
			Utility::displayValue($lowest, $this->data->currency, false));

		for ($i = 1; $i < $levels - 1; $i++)
		{
			$key          = $lowest + $increment * $i;
			$ranges[$key] = KrMethods::sprintf('COM_KNOWRES_SEARCH_UP_TO',
				Utility::displayValue($key, $this->data->currency, false));
		}

		$ranges[$highest] = KrMethods::sprintf('COM_KNOWRES_SEARCH_UP_TO',
			Utility::displayValue($highest, $this->data->currency, false));

		$highest = array_pop($prices);
		if ($highest == $this->highval)
		{
			$ranges[$this->highval] = KrMethods::plain('COM_KNOWRES_SEARCH_REQUEST');
		}

		$low = 0;
		foreach ($ranges as $k => $r)
		{
			if ($k == $this->highval)
			{
				$text = KrMethods::plain('COM_KNOWRES_SEARCH_REQUEST');
			}
			else
			{
				$text = Utility::displayValue($low, $this->data->currency, false);
				$text .= ' - ';
				$text .= Utility::displayValue($k, $this->data->currency, false);
			}

			$this->ranges[$low] = array(
				'low'  => $low,
				'high' => $k,
				'text' => $text
			);

			$low = $k + 1;
		}
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

		foreach ($this->ranges as $v)
		{
			if ($price >= (int) $v['low'] && $price <= (int) $v['high'])
			{
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
	 * @since      3.3.0
	 * @return array
	 */
	private function presetFilterCount(array $saved, array $new): array
	{
		$saved = $this->zeroFilterCount($saved);
		foreach ($new as $t)
		{
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
		$rates = $this->setForProperty(KrFactory::getListModel('rates')
		                                        ->getRatesForProperty($this->data->baseIds,
			                                        $this->data->arrival, $this->data->departure));
		$this->checkCalendarData($rates);
		if (!count($this->data->baseIds))
		{
			return;
		}

		$discounts   = $this->setForProperty(KrFactory::getListModel('discounts')
		                                              ->getDiscounts($this->data->baseIds));
		$extras      = $this->setForProperty(KrFactory::getListModel('extras')
		                                              ->getPricingExtras($this->data->baseIds, true));
		$ratemarkups = $this->setForProperty(KrFactory::getListModel('ratemarkups')
		                                              ->getMarkups($this->data->baseIds));
		$seasons     = KrFactory::getListModel('seasons')->getSeasons();

		$contractSession = new KrSession\Contract;
		foreach ($this->data->baseIds as $property_id)
		{
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

			$computations = [
				'base',
				'dow',
				'seasons',
				'shortstay',
				'longstay',
				'discount',
				'ratemarkup',
				'tax',
				'extras',
			];
			$Hub->compute($computations, true);

			$contract_total = $Hub->getValue('contract_total');
			$discount       = $Hub->getValue('discount');
			if (!$contract_total)
			{
				$this->data->rateNet[$property_id]      = $this->highval;
				$this->data->rateDiscount[$property_id] = 0;
			}
			else
			{
				$this->data->rateNet[$property_id]      = $contract_total;
				$this->data->rateDiscount[$property_id] = $discount;
			}

			$this->data->currency = $Hub->getValue('currency');
		}

		$contractSession->resetData();
	}

	/**
	 * Set the base filters as per base property results and input fields
	 *
	 * @param  array  $baseItems  Base property items
	 *
	 * @since  1.0.0
	 */
	private function setBaseFilters(array $baseItems): void
	{
		if ($this->params->get('filter_price'))
		{
			$this->getPriceRanges();
		}

		$filterBedrooms = [];
		$filterBook     = [];
		$filterCategory = [];
		$filterFeature  = [];
		$filterPrice    = [];
		$filterType     = [];
		$filterTown     = [];
		$filterArea     = [];
		$max_bedrooms   = $this->params->get('search_maxbedrooms', 6);

		if ($this->params->get('filter'))
		{
			$allCategories = $this->getCategoryNames();
			$allFeatures   = $this->getFeatureNames();

			foreach ($baseItems as $item)
			{
				if (!in_array($item->id, $this->data->baseIds))
				{
					continue;
				}

				if ($this->params->get('filter_area'))
				{
					$filter_this = $item->property_area;
					if (!array_key_exists($filter_this, $filterArea))
					{
						$filterArea[$filter_this] = [$filter_this, 0, 0, $filter_this];
					}
				}

				if ($this->params->get('filter_bedrooms'))
				{
					$filter_this = min($item->bedrooms, $max_bedrooms);
					if (!array_key_exists($filter_this, $filterBedrooms))
					{
						if ($filter_this == $max_bedrooms)
						{
							$text = KrMethods::plural('COM_KNOWRES_BEDROOMS_COUNT', $max_bedrooms . '+');
						}
						else
						{
							$text = KrMethods::plural('COM_KNOWRES_BEDROOMS_COUNT', $item->bedrooms);
						}
						$filterBedrooms[$filter_this] = [$filter_this, 0, 0, $text];
					}
				}

				if ($this->params->get('filter_book'))
				{
					if ($item->booking_type && isset($this->data->rateNet[$item->id])
						&& $this->data->rateNet[$item->id] < $this->highval)
					{
						$filter_this = $item->booking_type;
						if (!array_key_exists($filter_this, $filterBook))
						{
							if ($filter_this == 2)
							{
								$filterBook[$filter_this] = [$filter_this, 0, 0,
								                             KrMethods::plain('COM_KNOWRES_FILTER_BOOK')];
							}
							else
							{
								$filterBook[$filter_this] = [$filter_this, 0, 0,
								                             KrMethods::plain('COM_KNOWRES_FILTER_PAY')];
							}
						}
					}
				}

				if ($this->params->get('filter_category', 0))
				{
					$filter_this   = $item->categories;
					$filter_values = Utility::decodeJson(trim($filter_this), true);
					foreach ($filter_values as $c)
					{
						if ($c)
						{
							if (!array_key_exists($c, $filterCategory) && isset($allCategories[$c]))
							{
								$filterCategory[$c] = [$c, 0, 0, $allCategories[$c]];
							}
						}
					}
				}

				if ($this->params->get('filter_property_feature', 0))
				{
					$filter_this   = $item->property_features;
					$filter_values = Utility::decodeJson(trim($filter_this), true);
					foreach ($filter_values as $c)
					{
						if ($c)
						{
							if (!array_key_exists($c, $filterFeature) && isset($allFeatures[$c]))
							{
								$filterFeature[$c] = [$c, 0, 0, $allFeatures[$c]];
							}
						}
					}
				}

				if ($this->params->get('filter_price'))
				{
					if (isset($this->data->rateNet[$item->id]))
					{
						$filter_this = $this->getPriceSlot($this->data->rateNet[$item->id]);
						if (!array_key_exists($filter_this, $filterPrice))
						{
							$filterPrice[$filter_this] = [$this->ranges[$filter_this]['high'], 0, 0,
							                              $this->ranges[$filter_this]['text']];
						}
					}
				}

				if ($this->params->get('filter_type'))
				{
					$filter_this = $item->type_id;
					if (!array_key_exists($filter_this, $filterType))
					{
						$abbr                     = $this->Translations->getText('type', $item->type_id);
						$filterType[$filter_this] = [$filter_this, 0, 0, $abbr];
					}
				}

				if ($this->params->get('filter_town'))
				{
					$filter_this = $item->property_town;
					if (!array_key_exists($filter_this, $filterTown))
					{
						$filterTown[$filter_this] = [$filter_this, 0, 0, $filter_this];
					}
				}
			}

			if ($this->params->get('filter_area') && $this->data->area && $this->data->area != '')
			{
				$filterArea = $this->checkSelection($filterArea, $this->data->area, false);
			}
			if ($this->params->get('filter_bedrooms') && $this->data->bedrooms)
			{
				$filterBedrooms = $this->checkSelection($filterBedrooms, $this->data->bedrooms, false);
			}
			if ($this->params->get('filter_category') && $this->data->category_id)
			{
				$filterCategory = $this->checkSelection($filterCategory, $this->data->category_id, false);
			}
			if ($this->params->get('filter_property_feature') && $this->data->feature_id)
			{
				$filterFeature = $this->checkSelection($filterFeature, $this->data->feature_id, false);
			}
			if ($this->params->get('filter_type') && $this->data->type_id)
			{
				$filterType = $this->checkSelection($filterType, $this->data->type_id, false);
			}
			if ($this->params->get('filter_town') && $this->data->town && $this->data->town != '')
			{
				$filterTown = $this->checkSelection($filterTown, $this->data->town, false);
			}

			ksort($filterBedrooms);
			uasort($filterCategory, [
				'HighlandVision\KR\Search',
				'cmp'
			]);
			uasort($filterFeature, [
				'HighlandVision\KR\Search',
				'cmp'
			]);
			uasort($filterType, [
				'HighlandVision\KR\Search',
				'cmpnat'
			]);
			ksort($filterTown);
			ksort($filterArea);
			ksort($filterPrice);
		}

		$this->data->filterBedrooms = $filterBedrooms;
		$this->data->filterBook     = $filterBook;
		$this->data->filterCategory = $filterCategory;
		$this->data->filterFeature  = $filterFeature;
		$this->data->filterPrice    = $filterPrice;
		$this->data->filterType     = $filterType;
		$this->data->filterTown     = $filterTown;
		$this->data->filterArea     = $filterArea;
	}

	/**
	 * Set the currency for the search from a property
	 * as all properties in the search have the same currency
	 *
	 * @since 3.3.0
	 */
	private function setCurrency(): void
	{
		$settings             = KrFactory::getListModel('propertysettings')
		                                 ->getPropertysettings($this->data->baseIds[0], 'currency');
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
		foreach ($selected as $k => $v)
		{
			if ($k == $id)
			{
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
		foreach ($selected as $k => $v)
		{
			if ($price >= (int) $k && $price <= (int) $v[0])
			{
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
		foreach ($db_rows as $r)
		{
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
		if (!empty($this->data->arrival))
		{
			if (!empty($this->data->departure))
			{
				$this->data->nights = TickTock::differenceDays($this->data->arrival, $this->data->departure);
			}
			else
			{
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
		if (!empty($this->data->order))
		{
			return;
		}

		$default               = $this->params->get('order_default', '01');
		$this->data->direction = 'asc';

		switch ($default)
		{
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
		foreach ($this->data->baseIds as $p)
		{
			$prices[$p] = $this->highval;
		}

		$rates = KrFactory::getListModel('rates')->getMinRates($this->data->baseIds, TickTock::getDate(), 1);
		if (is_countable($rates) && count($rates))
		{
			$net_rates  = KrFactory::getListModel('propertysettings')->getOneSetting('net_rates');
			$net_markup = KrFactory::getListModel('propertysettings')->getOneSetting('net_markup');

			foreach ($rates as $r)
			{
				$net = array_key_exists($r->property_id, $net_rates) ? $net_rates[$r->property_id] : $net_rates[0];
				if ($net)
				{
					$markup = $net_markup[$r->property_id] ?? $net_markup[0];
					$prices[$r->property_id]
					        = KrFactory::getAdminModel('ratemarkup')::getGrossRate((float) $r->minrate,
						$markup);
				}
				else
				{
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
		if (!$view)
		{
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
		if ($this->data->region_id <= 0)
		{
			$this->data->region_id = $this->params->get('default_region');
		}

		$region = KrFactory::getAdminModel('region')->getItem($this->data->region_id);
		if (!$region->id || $region->state != 1)
		{
			$this->data->region_id = $this->params->get('default_region');
			$region                = KrFactory::getAdminModel('region')->getItem($this->data->region_id);
			if (!$region->id)
			{
				throw new RuntimeException('Region not found for Region ID ' . $this->data->region_id);
			}
		}

		$this->data->region_name  = $this->Translations->getText('region', $region->id);
		$this->data->country_name = $this->Translations->getText('country', $region->country_id);
		$this->data->map_zoom     = $region->map_zoom;
		$this->data->map_zoom_max = $region->map_zoom_max;
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
		foreach ($selected as $k => $v)
		{
			$selected[$k][1] = 0;
		}

		return $selected;
	}
}