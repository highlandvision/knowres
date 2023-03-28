<?php
/**
 * @package    Know Reservations
 * @subpackage Site View
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file LICENSE.txt for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Site\View\Property;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Joomla\Extend\HtmlView as KrHtmlView;
use HighlandVision\KR\Session as KrSession;
use HighlandVision\KR\SiteHelper;
use HighlandVision\KR\TickTock;
use HighlandVision\KR\Translations;
use HighlandVision\KR\Utility;
use Joomla\CMS\Factory;
use stdClass;

use function count;
use function is_countable;

/**
 * Property view
 *
 * @since 1.0.0
 */
class HtmlView extends KrHtmlView\Site
{
	/** @var string Arrival date. */
	public string $arrival = '';
	/** @var array Alternatives for this property. */
	public array $alternatives = [];
	/** @var string Backlink to search results. */
	public string $backlink = '';
	/** @var array Bedtypes for this property */
	public array $bedtypes = [];
	/** @var int Property booking type. */
	public int $booking_type = 0;
	/** @var array Currency setting for all properties. */
	public array $currencies = [];
	/** @var string Departure date. */
	public string $departure = '';
	/** @var array Features for this property. */
	public array $features = [];
	/** @var int Guest count. */
	public int $guests = 0;
	/** @var array Images for this property. */
	public array $images = [];
	/** @var int Pagination limit. */
	public int $list_limit = 0;
	/** @var int Map zoom setting or this property. */
	public int $map_zoom = 0;
	/** @var string Latest arrival date. */
	public string $max_date = '';
	/** @var string Earliest arrival date. */
	public string $min_date = '';
	/** @var string Modules text from loadposition. */
	public string $modules = '';
	/** @var bool True if more than list limit reviews. */
	public bool $more_reviews = false;
	/** @var array Net markup setting for all properties. */
	public array $net_markup = [];
	/** @var array Net rates setting for all properties. */
	public array $net_rates = [];
	/** @var stdClass Review ratings. */
	public stdClass $ratings;
	/** @var array Reviews. */
	public array $reviews = [];
	/** @var array Rooms amnd spaces data for this property. */
	public array $roomsandspaces = [];
	/** @var array Review scores. */
	public array $scores = [];
	/** @var stdClass Entered search data from session. */
	public stdClass $searchData;
	/** @var array All settings for property. */
	public array $settings = [];
	/** @var Translations Translations object. */
	public Translations $Translations;
	/** @var array Units linked to this property. */
	public array $units = [];
	/** @var array Weekly setting for all properties. */
	public array $weekly = [];

	/**
	 * Display the view
	 *
	 * @param  null  $tpl  Default template.
	 *
	 * @throws Exception
	 * @since  1.0.0
	 * @return void
	 */
	public function display($tpl = null): void
	{
		$id = KrMethods::inputInt('id', 0, 'get');
		if (!$id)
		{
			Utility::goto('properties');
		}

		$this->state  = $this->get('state');
		$this->params = KrMethods::getParams();
		$this->item   = KrFactory::getAdminModel('property')->getItem($id);
		if (empty($this->item->id) || ($this->_layout != 'preview' && $this->item->state != 1))
		{
			$this->redirectToSearch();
		}
		if ($this->item->private && $this->_layout != 'preview')
		{
			$this->redirectToSearch();
		}

		$this->today        = TickTock::getDate('now', 'Y-m-d', $this->item->timezone);
		$this->Translations = new Translations();
		$searchSession      = new KrSession\Search();
		$this->searchData   = $searchSession->getData();

		if (is_countable($this->searchData->baseIds) && count($this->searchData->baseIds))
		{
			$Itemid = SiteHelper::getItemId('com_knowres', 'properties', [
				'layout'    => 'search',
				'region_id' => $this->item->region_id
			]);

			$this->backlink = KrMethods::route('index.php?option=com_knowres&view=properties&Itemid=' . $Itemid
				. '&region_id=' . $this->item->region_id . '&retain=1');
		}

		$this->setDisplayData();
		$this->setReviewData();
		$this->quoteData();

		$this->modules          = KrMethods::loadInternal('{loadposition propertyview}');
		$this->Itemid           = SiteHelper::getItemId('com_knowres', 'property', ['id' => 0]);
		$this->meta_title       = $this->item->property_name . ' | ' . $this->item->region_name . ' | '
			. $this->item->type_name;
		$this->meta_description = KrMethods::sprintf('COM_KNOWRES_SEO_DSC_PROPERTY', $this->item->property_name,
			$this->item->tagline ?? '', $this->item->type_name, $this->item->property_area, $this->item->region_name);

		if (!$this->params->get('property_meta', 1))
		{
			if ($this->item->meta_title)
			{
				$this->meta_title = $this->item->meta_title;
			}
			if ($this->item->meta_description)
			{
				$this->meta_description = $this->item->meta_description;
			}
		}

		$this->prepareDocument();

		$errors = $this->get('Errors');
		if (is_countable($errors) && count($errors))
		{
			throw new Exception(implode("\n", $errors));
		}

		parent::display($tpl);
	}

	/**
	 * Prepares the document
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	protected function prepareDocument()
	{
		$this->prepareDefaultDocument($this->meta_title, $this->meta_description);
		$this->setMyPathway($this->item->region_id, $this->item->region_name);
	}

	/**
	 * Set review data for property     *
	 *
	 * @throws Exception
	 * @since  4.0.0
	 */
	protected function setReviewData()
	{
		$this->list_limit = $this->params->get('list_limit', 10);
		$this->ratings    = new stdClass();

		$this->reviews = KrFactory::getListModel('reviews')->forDisplay($this->item->id, $this->list_limit + 1);
		if (is_countable($this->reviews) && count($this->reviews))
		{
			if (count($this->reviews) > $this->list_limit)
			{
				$this->more_reviews = true;
			}

			if ($this->params->get('review_ratings', 0))
			{
				$this->ratings  = KrFactory::getListModel('reviews')->getAvgReview($this->item->id);
				$this->scores[] = $this->ratings->avgrating1;
				$this->scores[] = $this->ratings->avgrating2;
				$this->scores[] = $this->ratings->avgrating3;
				$this->scores[] = $this->ratings->avgrating4;
				$this->scores[] = $this->ratings->avgrating5;
				$this->scores[] = $this->ratings->avgrating6;
			}
		}
	}

	/**
	 * Set any alternative or unit properties
	 *
	 * @throws Exception
	 * @since  4.0.0
	 */
	protected function setDisplayData()
	{
		$fields = KrFactory::getListModel('propertyfields')->getAllPropertyFields();
		if (is_countable($this->item->property_alternatives) && count($this->item->property_alternatives))
		{
			$this->alternatives = KrFactory::getListSiteModel('properties')
			                               ->getMinMaxRates($this->item->property_alternatives);
			foreach ($this->alternatives as $a)
			{
				KrFactory::getAdminModel('property')->setPropertyFields($a, $fields);
			}
		}
		if (is_countable($this->item->property_units) && count($this->item->property_units))
		{
			$this->units = KrFactory::getListSiteModel('properties')->getMinMaxRates($this->item->property_units);
			foreach ($this->units as $a)
			{
				KrFactory::getAdminModel('property')->setPropertyFields($a, $fields);
			}
		}

		$this->settings       = KrFactory::getListModel('propertysettings')->getPropertysettings($this->item->id);
		$this->currencies     = KrFactory::getListModel('propertysettings')->getOneSetting('currency');
		$this->net_rates      = KrFactory::getListModel('propertysettings')->getOneSetting('net_rates');
		$this->net_markup     = KrFactory::getListModel('propertysettings')->getOneSetting('net_markup');
		$this->weekly         = KrFactory::getListModel('propertysettings')
		                                 ->getOneSetting('tariffChargesStoredWeeklyYesNo');
		$this->roomsandspaces = KrFactory::getListModel('propertyrooms')->getForProperty($this->item->id);
		$this->images         = KrFactory::getListModel('images')->forDisplay($this->item->id);

		$region = KrFactory::getAdminModel('region')->getItem($this->item->region_id);
		if (!empty($region->id))
		{
			$this->map_zoom = $region->map_zoom;
		}

		if (is_countable($this->item->bed_types) && count($this->item->bed_types))
		{
			$this->bedtypes = KrFactory::getListModel('bedtypes')->getAll();
		}

		$this->features = [];
		foreach ($this->item->property_features as $f)
		{
			$tmp              = new stdClass();
			$tmp->name        = $this->Translations->getText('propertyfeature', (int) $f);
			$this->features[] = $tmp;
		}
	}

	/**
	 * Prepares the booking data.
	 *
	 * @throws Exception
	 * @since 1.0.0
	 */
	protected function quoteData()
	{
		$this->form = KrFactory::getAdhocForm('quote', 'quote.xml', 'site', null);

		$contractSession = new KrSession\Contract();
		$contractData    = $contractSession->getData();
		if ($contractData->property_id != $this->item->id)
		{
			$contractData = $contractSession->resetData();
		}

		$this->arrival   = KrMethods::inputString('arrival', '', 'get');
		$this->departure = KrMethods::inputString('departure', '', 'get');
		$this->guests    = KrMethods::inputInt('guests', 2, 'get');
		if ($this->arrival)
		{
			$contractData->arrival   = $this->arrival;
			$contractData->departure = $this->departure;
			$contractData->guests    = $this->guests;
		}
		else if ($contractData->arrival)
		{
			$this->arrival   = $contractData->arrival;
			$this->departure = $contractData->departure;
			$this->guests    = $contractData->guests;
		}
		else if ($this->searchData->arrival)
		{
			$this->arrival   = $this->searchData->arrival;
			$this->departure = $this->searchData->departure;
			$this->guests    = $this->searchData->guests;
		}

		$this->booking_type = $this->item->booking_type;
		if ($this->booking_type)
		{
			$current = KrFactory::getListModel('rates')->getCurrent($this->item->id);
			if (!$current)
			{
				$this->booking_type = 0;
			}
		}
		if ($this->booking_type)
		{
			Factory::getLanguage()->load('mod_knowres_search', JPATH_SITE . '/modules/mod_knowres_search');

			if ($this->arrival && $this->arrival < $this->today && $this->departure)
			{
				$this->arrival = '';
			}

			$this->min_date = TickTock::modifyDays($this->today, (int) $this->settings['mindaysbeforearrival']);
			$this->max_date = TickTock::modifyDays($this->today, (int) $this->settings['advanceBookingsLimit']);
		}
	}

	/**
	 * Redirect to search.
	 *
	 * @throws Exception
	 * @since  3.3.0
	 */
	protected function redirectToSearch()
	{
		$Itemid = SiteHelper::getItemId('com_knowres', 'properties', [
			'layout'    => 'search',
			'region_id' => $this->item->region_id
		]);

		$link = 'index.php?Itemid=' . $Itemid;

		if (isset($this->item->state) && $this->item->state != 1)
		{
			KrMethods::message(KrMethods::plain('COM_KNOWRES_UNPUBLISHED_PROPERTY'));
		}

		KrMethods::redirect(KrMethods::route($link, false));
	}

	/**
	 * Set the pathway for the property
	 *
	 * @param  int     $region_id    ID of property / search region
	 * @param  string  $region_name  Name of property / search region
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	protected function setMyPathway(int $region_id, string $region_name)
	{
		$pathway = Factory::getApplication()->getPathway();
		$pathway->setPathway([]);

		$regions = KrFactory::getListModel('regions')->getAllRegions(true);
		$Itemid  = 0;
		if (is_countable($regions) && count($regions) > 1)
		{
			$Itemid = SiteHelper::getItemId('com_knowres', 'properties',
				['layout' => 'search', 'region_id' => $region_id]);
		}
		$pathway = self::propertiesPathway($pathway, $region_id, $region_name, $Itemid);

		if (count($this->searchData->baseIds))
		{
			$Itemid = SiteHelper::getItemId('com_knowres', 'properties',
				['layout' => 'search', 'region_id' => $region_id]);

			$pathway = self::searchPathway($pathway, $region_id, $Itemid);
		}

		$pathway->addItem($this->item->property_name);
	}
}