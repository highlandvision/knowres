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

use function count;

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
	/** @var bool True if favourites requested but none saved */
	protected bool $nofavs = false;
	/** @var array Saved favourites */
	protected array $saved;

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
		$this->saved  = SiteHelper::getFavourites();

		$searchSession = new KrSession\Search();
		$searchData    = $searchSession->getData();
		if (!is_countable($searchData->baseIds) || !count($searchData->baseIds)) {
			$this->items      = [];
			$this->modules    = KrMethods::loadInternal('{loadposition propertiesview}');
			$this->pagination = $this->get('pagination');
			$this->Itemid     = SiteHelper::getItemId('com_knowres', 'property', ['id' => 0]);

			parent::display($tpl);
		}

		$this->Response = new Response($searchData);

		$field = KrMethods::inputString('field', '');
		$value = KrMethods::inputString('value', '');
		if ($value == 'favs' && !count($this->saved)) {
			$this->nofavs = true;
			$field        = 'view';
			$value        = $this->params->get('default_view', 'list');
		}
		elseif ($value == 'favs') {
			$this->favs = true;
			$fids       = [];
			foreach ($this->saved as $s) {
				$fids[] = $s;
			}

			$this->state->set('filter.id', $fids);
			//TODO-v4.3 display favourites on map only when displayed in list
			$this->items              = $this->get('items');
			$this->Response->searchData->view = 'favs';
		}
		else {
			if ($value == 'initial') {
				$value = $this->params->get('default_view', 'list');
			}
			else if ($field == 'view' && !$value) {
				$value = $this->Response->data->view;
				if (!$value) {
					$value = $this->params->get('default_view', 'list');
				}
			}

			$this->Response->getAjaxData($field, $value);
			$searchSession->setData($this->Response->searchData);
			$this->state->set('filter.id', $this->Response->searchData->baseIds);

			// Prices are a bit different as can't be filtered by the db
			// if price filters exist compare against the generated search prices and
			// reduce the base property filter sent to the search
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
				$uids = array_unique($uids);
				$this->state->set('filter.id', $uids);
			}

			$filter = [];
			foreach ($this->Response->searchData->filterRegion as $k => $f) {
				if ($f[2]) {
					$filter[] = $k;
				}
			}
			if (count($filter)) {
				$this->state->set('filter.region', $filter);
			}

			$filter = [];
			foreach ($this->Response->searchData->filterArea as $k => $f) {
				if ($f[2]) {
					$filter[] = $k;
				}
			}
			if (count($filter)) {
				$this->state->set('filter.area', $filter);
			}

			$last   = array_key_last($this->Response->searchData->filterBedrooms);
			$filter = [];
			foreach ($this->Response->searchData->filterBedrooms as $k => $f) {
				if ($f[2]) {
					if ($k == $last) {
						for ($i = 0; $i < 10; $i++) {
							$filter[] = $k + $i;
						}
					}
					else {
						$filter[] = $k;
					}
				}
			}
			if (is_countable($filter) && count($filter)) {
				$this->state->set('filter.bedrooms', $filter);
			}

			$filter = [];
			foreach ($this->Response->searchData->filterBook as $k => $f) {
				if ($f[2]) {
					$filter[] = $k;
				}
			}
			if (count($filter)) {
				$this->state->set('filter.booking_type', $filter);
			}

			$filter = [];
			foreach ($this->Response->searchData->filterCategory as $k => $f) {
				if ($f[2]) {
					$filter[] = $k;
				}
			}
			if (count($filter)) {
				$this->state->set('filter.category', $filter);
			}

			$filter = [];
			foreach ($this->Response->searchData->filterFeature as $k => $f) {
				if ($f[2]) {
					$filter[] = $k;
				}
			}
			if (count($filter)) {
				$this->state->set('filter.feature', $filter);
			}

			$filter = [];
			foreach ($this->Response->searchData->filterPets as $k => $f) {
				if ($f[2]) {
					$filter[] = $k;
				}
			}
			if (count($filter)) {
				$this->state->set('filter.pets', $filter);
			}

			$filter = [];
			foreach ($this->Response->searchData->filterType as $k => $f) {
				if ($f[2]) {
					$filter[] = $k;
				}
			}
			if (count($filter)) {
				$this->state->set('filter.type_id', $filter);
			}

			$this->state->set('filter.state', 1);
			$this->state->set('filter.approved', 1);
			$this->state->set('filter.private', 0);
			$this->state->set('list.start', $this->Response->searchData->start);
			$this->state->set('list.ordercustom', $this->Response->searchData->ordercustom);
			$this->state->set('list.ordering', $this->Response->searchData->ordering);
			$this->state->set('list.direction', $this->Response->searchData->direction);
			$this->state->set('list.limit', $this->params->get('list_limit'));

			$this->items = $this->get('items');
			$result      = $this->get('countitems');
			$this->Response->countAjaxFilters($result[0], $result[1], $result[2], $result[3], $result[4], $result[5],
				$result[6], $result[7], $result[8]);
		}

		$this->modules    = KrMethods::loadInternal('{loadposition propertiesview}');
		$this->order      =
			$this->Response->searchData->order != '' ? $this->Response->searchData->order : $this->params->get('order_default');
		$this->pagination = $this->get('pagination');
		$this->Itemid     = SiteHelper::getItemId('com_knowres', 'property', ['id' => 0]);

		parent::display($tpl);
	}
}