<?php
/**
 * @package     Know Reservations
 * @subpackage  Site View
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file LICENSE.txt for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Site\View\Properties;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Joomla\Extend\HtmlView\Site as KrHtmlView;
use HighlandVision\KR\Search\Response;
use HighlandVision\KR\Session as KrSession;
use HighlandVision\KR\SiteHelper;

use function array_unique;
use function count;
use function explode;

/**
 * Display property search results
 *
 * @since   1.0.0
 */
class RawView extends KrHtmlView
{
	/** @var Response Site search */
	protected Response $Response;
	/** @var bool True if favourites selected */
	protected bool $favs = false;
	/** @var string Modules output */
	protected string $modules;
	/** @var bool True if favourites requested but none selected */
	protected bool $nofavs = false;

	/**
	 * Display the view
	 *
	 * @param  null  $tpl  Default template.
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	public function display($tpl = null): void
	{
		$this->setLayout('raw');
		$this->state  = $this->get('state');
		$this->params = KrMethods::getParams();

		$searchSession = new KrSession\Search();
		$searchData    = $searchSession->getData();
		if (!is_countable($searchData->baseIds) || !count($searchData->baseIds)) {
			$this->items      = [];
			$this->pagination = $this->get('pagination');
			$this->Itemid     = SiteHelper::getItemId('com_knowres', 'property', ['id' => 0]);

			parent::display($tpl);
		}

		$this->Response = new Response($searchData);

		$bar          = KrMethods::inputString('bar', $searchData->bar);
		$action       = KrMethods::inputString('action', '');
		$action_value = KrMethods::inputString('action_value', '');

		$favs = false;
		if ($bar == 'favs' && !count($searchData->favs)) {
			$bar          = $this->params->get('default_view', 'list');
			$this->nofavs = true;
		}

		if ($bar == 'favs' && count($searchData->favs)) {
			$this->setFavs($searchData->favs);
			$favs = true;
		} else {
//			else if ($bar == 'view' && !$value) {
//				$value = $this->Response->data->view;
//				if (!$value) {
//					$value = $this->params->get('default_view', 'list');
//				}
//			}

//			$this->Response->searchData->bar = $bar;

//			if ($bar && !$favs) {
//				if ($this->Response->searchData->limitstart > 0) {
//					$this->Response->searchData->start      = $this->searchData->limitstart;
//					$this->Response->searchData->limitstart = 0;
//				}
//			}

			$this->Response->setSearchData($bar, $action, $action_value);
			$searchSession->setData($this->Response->searchData);
			$this->state->set('filter.id', $this->Response->searchData->baseIds);
			$this->doFiltering();

			$this->state->set('list.start', $this->Response->searchData->start);
			$this->state->set('list.ordercustom', $this->Response->searchData->ordercustom);
			$this->state->set('list.ordering', $this->Response->searchData->ordering);
			$this->state->set('list.direction', $this->Response->searchData->direction);
			$this->state->set('list.limit', $this->params->get('list_limit'));

			$this->items = $this->get('items');
			$result      = $this->get('countitems');
			$this->Response->countAjaxFilters($result[0],
			                                  $result[1],
			                                  $result[2],
			                                  $result[3],
			                                  $result[4],
			                                  $result[5],
			                                  $result[6],
			                                  $result[7]);
		}

		$this->order      = $this->Response->searchData->order != '' ? $this->Response->searchData->order :
			$this->params->get('order_default');
		$this->pagination = $this->get('pagination');
		$this->Itemid     = SiteHelper::getItemId('com_knowres', 'property', ['id' => 0]);

		parent::display($tpl);
	}

	/**
	 * Do property filtering
	 *
	 * @since  4.4.0
	 */
	private function doFiltering(): void
	{
		$this->filterPrice();
		$this->state->set('filter.booking_type', $this->setSelected($this->Response->searchData->filterBook));
		$this->state->set('filter.category', $this->setSelected($this->Response->searchData->filterCategory));
		$this->state->set('filter.feature', $this->setSelected($this->Response->searchData->filterFeature));
		$this->state->set('filter.pets', $this->setSelected($this->Response->searchData->filterPets));
		$this->state->set('filter.type_id', $this->setSelected($this->Response->searchData->filterType));
		$this->filterLocation();
		$this->filterBedrooms();

		$this->state->set('filter.state', 1);
		$this->state->set('filter.approved', 1);
		$this->state->set('filter.private', 0);
	}

	/**
	 * Filter bedrooms
	 *
	 * @since  4.4.0
	 */
	private function filterBedrooms(): void
	{
		$last   = array_key_last($this->Response->searchData->filterBedrooms);
		$filter = [];
		foreach ($this->Response->searchData->filterBedrooms as $k => $f) {
			if ($f[2]) {
				if ($k == $last) {
					for ($i = 0; $i < 10; $i++) {
						$filter[] = $k + $i;
					}
				} else {
					$filter[] = $k;
				}
			}
		}

		$this->state->set('filter.bedrooms', $filter);
	}

	/**
	 * Filter location
	 *
	 * @since  4.4.0
	 */
	private function filterLocation(): void
	{
		$filter0 = [];
		$filter  = [];
		foreach ($this->Response->searchData->filterArea as $k => $f) {
			if ($f[2]) {
				$parts     = explode('^', $k);
				$filter0[] = $parts[0];
				$filter[]  = $parts[1];
			}
		}
		$this->state->set('filter.region_id', $filter0);
		$this->state->set('filter.property_area', $filter);
	}

	/**
	 * Filter prices can't be filtered by the db
	 * If price filters exist compare against the generated search prices and
	 * reduce the base property filter sent to the search
	 *
	 * @since  4.4.0
	 */
	private function filterPrice(): void
	{
		if (is_countable($this->Response->searchData->filterPrice) &&
			count($this->Response->searchData->filterPrice)) {
			$uids = [];
			foreach ($this->Response->searchData->baseIds as $p) {
				foreach ($this->Response->searchData->filterPrice as $k => $f) {
					if ($f[2]) {
						$price = $this->Response->searchData->rateNet[$p];
						if ((int) $price >= (int) $k && (int) $price <= (int) $f[0]) {
							$uids[] = $p;
						}
					}
				}
			}

			// If search by price has reduced the base search then set this as the base filter
			if (count($uids)) {
				$this->state->set('filter.id', array_unique($uids));
			}
		}
	}

	/**
	 * Set the data for favourites display
	 *
	 * @param  array  $favourites  Selected favourite properties
	 *
	 * @since  4.4.0
	 */
	private function setFavs(array $favourites): void
	{
		$this->favs                      = true;
		$this->Response->searchData->bar = 'favs';

		$fids = [];
		foreach ($favourites as $s) {
			$fids[] = $s;
		}

		//TODO-v4.4 display favourites on map only when displayed in list
		$this->state->set('filter.id', $fids);
		$this->items = $this->get('items');
	}

	/**
	 * Set the filter state
	 *
	 * @param  array  $selected  Selected filters
	 *
	 * @since  4.3.0
	 */
	private function setSelected(array $selected): array
	{
		$filter = [];
		foreach ($selected as $k => $f) {
			if ($f[2]) {
				$filter[] = $k;
			}
		}

		return $filter;
	}
}