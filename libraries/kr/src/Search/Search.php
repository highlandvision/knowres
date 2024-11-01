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
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Hub;
use HighlandVision\KR\Session as KrSession;
use HighlandVision\KR\SiteHelper;
use HighlandVision\KR\TickTock;
use HighlandVision\KR\Translations;
use Joomla\Registry\Registry;
use RuntimeException;
use stdClass;

use function array_key_exists;
use function asort;
use function count;
use function in_array;
use function max;
use function min;

/**
 * Site search for properties
 *
 * @since   1.0.0
 */
class Search
{
	/* @var Filter Search filters */
	public Filter $Filter;
	/* @var Response Output ajax data */
	public Response $Response;
	/** @var stdClass Search session data. */
	public stdClass $searchData;
	/** @var Translations Translations object. */
	protected Translations $Translations;
	/** @var int Value set for properties with no rate. */
	protected int $highval = 9999999;
	/** @var array Price ranges. */
	protected array $ranges = [];
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
		$this->searchData   = clone $data;
		$this->params       = KrMethods::getParams();
		$this->Translations = new Translations();
		$this->Filter       = new Filter($this->params, $this->Translations);
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

		$this->searchData->baseIds = [];
		$baseItems                 = KrFactory::getListSiteModel('properties')->getBaseItems($this->searchData);
		if (is_countable($baseItems) && count($baseItems)) {
			$this->searchData->baseIds = array_column($baseItems, 'id');
			$this->setCurrency();
			$this->checkGuestNumbers($baseItems);

			if (!count($this->searchData->baseIds)) {
				return;
			}

			if ($this->searchData->byAvailability && !empty($this->searchData->layout)) {
				$this->searchData->byAvailability = 0;
			}

			if ($this->searchData->byAvailability) {
				$this->setActualRates();
			} else {
				$this->setMinRates();
			}

			if (count($this->searchData->baseIds)) {
				$this->searchData = $this->Filter->setFilters($baseItems, $this->searchData);
			}

			$this->setBar();
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
		foreach ($this->searchData->baseIds as $id) {
			try {
				$Calendar =
					new Calendar\Search($id,
						$this->searchData->arrival,
						$this->searchData->departure,
						$rates[$id] ?? []);
				if ($Calendar->checkSearchDates()) {
					$valid[] = $id;
				}
			} catch (Exception) {
				continue;
			}
		}

		$this->searchData->baseIds = $valid;
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
			if (!in_array($item->id, $this->searchData->baseIds)) {
				continue;
			}

			$free = SiteHelper::setFreeGuests($item->sleeps_infant_max,
					$item->sleeps_infant_age,
					$this->searchData->child_ages);

			$guests = !empty($this->searchData->guests) ?
				$this->searchData->guests : $this->searchData->adults + $this->searchData->children;

			if ($guests > $item->sleeps + $item->sleeps_extra + $free) {
				if ($this->searchData->guests > $item->sleeps + $item->sleeps_extra) {
					continue;
				}
			}

			if ($this->searchData->children > 0 && is_countable($this->searchData->child_ages)) {
				if (count($this->searchData->child_ages) > 0 &&
				    count($this->searchData->child_ages) < $this->searchData->children) {
					continue;
				}
			}

			$valid[] = $item->id;
		}

		$this->searchData->baseIds = $valid;
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
				->getRatesForProperty($this->searchData->baseIds,
					$this->searchData->arrival,
					$this->searchData->departure));
		$this->checkCalendarData($rates);
		if (!count($this->searchData->baseIds)) {
			return;
		}

		$discounts   =
			$this->setForProperty(KrFactory::getListModel('discounts')->getDiscounts($this->searchData->baseIds));
		$extras      =
			$this->setForProperty(KrFactory::getListModel('extras')
				->getPricingExtras($this->searchData->baseIds, true));
		$ratemarkups =
			$this->setForProperty(KrFactory::getListModel('ratemarkups')->getMarkups($this->searchData->baseIds));
		$seasons     = KrFactory::getListModel('seasons')->getSeasons();

		$contractSession = new KrSession\Contract;
		foreach ($this->searchData->baseIds as $property_id) {
			$contractData                = $contractSession->resetData();
			$contractData->adjustmentsRq = false;
			$contractData->adults        = $this->searchData->adults;
			$contractData->arrival       = $this->searchData->arrival;
			$contractData->children      = $this->searchData->children;
			$contractData->child_ages    = $this->searchData->child_ages;
			$contractData->departure     = $this->searchData->departure;
			$contractData->discountsDb   = $discounts[$property_id] ?? [];
			$contractData->extrasDb      = $extras[$property_id] ?? [];
			$contractData->guests        = $this->searchData->guests;
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
				$this->searchData->rateNet[$property_id]      = $this->highval;
				$this->searchData->rateDiscount[$property_id] = 0;
			} else {
				$this->searchData->rateNet[$property_id]      = $contract_total;
				$this->searchData->rateDiscount[$property_id] = $discount;
			}

			$this->searchData->currency = $Hub->getValue('currency');
		}

		$contractSession->resetData();
	}

	/**
	 * Set default view
	 *
	 * @throws Exception
	 * @since  3.3.0
	 */
	private function setBar(): void
	{
		if (!$this->searchData->bar) {
			$this->searchData->bar = $this->params->get('default_view', 'list');
		}
	}

	/**
	 * Set the currency for the search from a property
	 * as all properties in the search have the same currency
	 *
	 * @throws RuntimeException
	 * @since  3.3.0
	 */
	private function setCurrency(): void
	{
		$settings                   =
			KrFactory::getListModel('propertysettings')->getPropertysettings($this->searchData->baseIds[0], 'currency');
		$this->searchData->currency = $settings['currency'];
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
		if (!empty($this->searchData->arrival)) {
			if (!empty($this->searchData->departure)) {
				$this->searchData->nights =
					TickTock::differenceDays($this->searchData->arrival, $this->searchData->departure);
			} else {
				$this->searchData->departure = TickTock::modifyDays($this->searchData->arrival, 7);
				$this->searchData->nights    = 7;
			}

			$this->searchData->byAvailability = true;
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
		if (!empty($this->searchData->order)) {
			return;
		}

		$default                     = $this->params->get('order_default', '01');
		$this->searchData->direction = 'asc';

		switch ($default) {
			case '01':
				$this->searchData->ordercustom = '';
				$this->searchData->ordering    = 'a.ordering';
				break;
			case '11':
				$this->searchData->ordercustom = '';
				$this->searchData->ordering    = 'property_name';
				break;
			case '21':
				$this->searchData->ordercustom = 'sleeps asc, allsleeps asc';
				$this->searchData->ordering    = '';
				break;
			case '31':
				$this->searchData->ordercustom = '';
				$this->searchData->ordering    = 'bedrooms';
				break;
			case '51':
				$this->searchData->ordercustom = '';
				$this->searchData->ordering    = 'property_area';
				break;
			case '61':
				$this->searchData->ordercustom = '';
				$this->searchData->ordering    = 'rating';
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
		foreach ($this->searchData->baseIds as $p) {
			$prices[$p] = $this->highval;
		}

		$rates = KrFactory::getListModel('rates')->getMinRates($this->searchData->baseIds, TickTock::getDate(), 1);
		if (is_countable($rates) && count($rates)) {
			$net_rates  = KrFactory::getListModel('propertysettings')->getOneSetting('net_rates');
			$net_markup = KrFactory::getListModel('propertysettings')->getOneSetting('net_markup');

			foreach ($rates as $r) {
				$net = array_key_exists($r->property_id, $net_rates) ? $net_rates[$r->property_id] : $net_rates[0];
				if ($net) {
					$markup                  = $net_markup[$r->property_id] ?? $net_markup[0];
					$prices[$r->property_id] =
						KrFactory::getAdminModel('ratemarkup')::getGrossRate((float) $r->minrate, $markup);
				} else {
					$prices[$r->property_id] = (int) $r->minrate;
				}
			}
		}

		asort($prices);
		$this->searchData->rateNet      = $prices;
		$this->searchData->rateDiscount = [];
	}

	/**
	 * Validate region
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	private function validateRegion(): void
	{
		if (!$this->searchData->region_id && !$this->searchData->layout) {
			$this->searchData->region_id = $this->params->get('default_region');
		}

		$region                         = KrFactory::getAdminModel('region')->getItem($this->searchData->region_id);
		$this->searchData->region_name  = $this->Translations->getText('region', $region->id);
		$this->searchData->country_name = $this->Translations->getText('country', $region->country_id);
		$this->searchData->map_zoom     = min($region->map_zoom, $this->searchData->map_zoom);
		$this->searchData->map_zoom_max = min($region->map_zoom_max, $this->searchData->map_zoom_max);
	}
}