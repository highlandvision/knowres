<?php
/**
 * @package    Know Reservations
 * @subpackage Site View
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

/** @noinspection PhpPossiblePolymorphicInvocationInspection */

namespace HighlandVision\Component\Knowres\Site\View\Properties;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\Component\Knowres\Administrator\Model\PropertiesModel;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Joomla\Extend\HtmlView as KrHtmlView;
use HighlandVision\KR\Search\Search;
use HighlandVision\KR\Session as KrSession;
use HighlandVision\KR\SiteHelper;
use HighlandVision\KR\TickTock;
use HighlandVision\KR\Utility;
use JetBrains\PhpStorm\NoReturn;
use Joomla\Registry\Registry;
use stdClass;

use function count;
use function implode;

/**
 * View properties
 *
 * @since 1.0.0
 */
class HtmlView extends KrHtmlView\Site
{
	/** @var Registry KR parameters */
	public Registry $params;
	/** @var Search Site search */
	protected Search $Search;
	/** @var string Category Blurb */
	protected string $blurb = '';
	/** @var int Category ID */
	protected int $category_id = 0;
	/** @var array Property currencies */
	protected array $currencies = [];
	/** @var int Default region */
	protected int $default_region = 0;
	/** @var string Page header */
	protected string $header = '';
	/** @var array Allowable page layouts */
	protected array $layouts = [];
	/** @var bool True if property search */
	protected bool $property_search = false;

	/**
	 * Display the view
	 *
	 * @param  null  $tpl  Default template.
	 *
	 * @throws Exception
	 * @since  1.0.0
	 * @return void
	 */
	#[NoReturn] public function display($tpl = null): void
	{
		/** @var PropertiesModel $model */
		$model                = $this->getModel();
		$this->state          = $model->getState();
		$this->params         = KrMethods::getParams();
		$layout               = KrMethods::inputString('layout', 'default');
		$today                = TickTock::getDate();
		$description          = false;
		$this->default_region = $this->params->get('default_region', 0);

		$searchSession = new KrSession\Search();
		$searchData    = $searchSession->getData();

		$retain = KrMethods::inputInt('retain');
		if ($retain == 2) {
			KrMethods::message(KrMethods::plain('COM_KNOWRES_EXPIRED_SESSION'));
			$retain = 1;
		}

		$new = false;
		if (!$retain || !count($searchData->baseIds)) {
			$searchData = $searchSession->resetData();
			$new        = true;
		}

		if ($new) {
			$this->property_search = true;

			if ($layout == 'category') {
				$this->category_id = KrMethods::inputInt('category_id');
				if (!$this->category_id) {
					$searchData = $searchSession->resetData();
					SiteHelper::redirectHome();
				}
				/** @var CategoryModel $category */
				$category                = KrFactory::getAdminModel('category')->getItem($this->category_id);
				$searchData->layout      = $layout;
				$searchData->category_id = $this->category_id;
				$description             = KrMethods::sprintf('COM_KNOWRES_VIEW_BROWSE', $category->name);
				$this->blurb             = $category->blurb;
				$this->meta_title        = KrMethods::sprintf('COM_KNOWRES_BROWSE_CATEGORY', $category->name);
				$this->meta_description  = KrMethods::sprintf('COM_KNOWRES_BROWSE_CATEGORY_DSC', $category->name);
			} elseif ($layout === 'new') {
				$searchData->layout     = $layout;
				$description            = KrMethods::plain('COM_KNOWRES_BROWSE_NEW_VILLAS');
				$this->meta_title       = KrMethods::plain('COM_KNOWRES_BROWSE_NEW_VILLAS');
				$this->meta_description = KrMethods::plain('COM_KNOWRES_BROWSE_NEW_VILLAS_DSC');
			} elseif ($layout === 'discount') {
				$searchData->layout     = $layout;
				$description            = KrMethods::plain('COM_KNOWRES_BROWSE_DISCOUNTS');
				$this->meta_title       = KrMethods::plain('COM_KNOWRES_BROWSE_DISCOUNTS');
				$this->meta_description = KrMethods::plain('COM_KNOWRES_BROWSE_DISCOUNTS_DSC');
			} else {
				// From search module!
				$searchData = $this->setInput($searchData, $searchSession);
				if (!empty($searchData->arrival) && !empty($searchData->departure)) {
					if ($searchData->arrival < $today || $searchData->departure < $today
						|| $searchData->departure <= $searchData->arrival) {
						$searchData = $searchSession->resetData();
						SiteHelper::redirectHome();
					}
				}
			}
		}

		$searchData->favs = SiteHelper::getFavourites();
		$this->Search     = new Search($searchData);
		if ($new) {
			$this->Search->doBaseSearch();
		}

		if (!$description) {
			$description = $this->setSearchDescription();
		}

//		$this->header =	KrMethods::sprintf('COM_KNOWRES_SEARCH_HEADER', $description, count($this->Search->searchData->baseIds));
		$this->header = KrMethods::sprintf('COM_KNOWRES_SEARCH_HEADER_X', $description);

		if ($this->params->get('search_list', 0)) {
			$this->layouts['list'] = true;
		}
		//TODO-v43 Tidy up thumb view
		if ($this->params->get('search_thumb', 0)) {
			$this->layouts['thumb'] = true;
		}

		$this->Search->searchData->description = $description;
		$searchSession->setData($this->Search->searchData);

		$errors = $this->get('errors');
		if (is_countable($errors) && count($errors)) {
			throw new Exception(implode("\n", $errors));
		}

		$this->prepareDocument();

		parent::display($tpl);
	}

	/**
	 * Prepares the document
	 *
	 * @throws Exception
	 * @since  3.3.0
	 */
	protected function prepareDocument(): void
	{
		$this->prepareDefaultDocument($this->meta_title, $this->meta_description);
		if ($this->property_search) {
			$this->setCanonical();
			$this->setPathway();
		}
	}

	/**
	 * Set the canonical URL for the search.
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	#[NoReturn] protected function setCanonical(): void
	{
		$Itemid        = SiteHelper::getItemId('com_knowres', 'properties', ['region_id' => $this->default_region]);
		$link          =
			'index.php?option=com_knowres&view=properties&region_id=' . $this->default_region . '&Itemid=' .
			$Itemid;
		$canonical_url = KrMethods::route($link);
		$this->document->addHeadLink(KrMethods::getRoot() . $canonical_url, 'canonical');
	}

	/**
	 * Get request search data and store in session
	 *
	 * @param  stdClass          $searchData     Session search data
	 * @param  KrSession\Search  $searchSession  Search session
	 *
	 * @throws Exception
	 * @since  1.0.0
	 * @return stdClass
	 */
	protected function setInput(stdClass $searchData, KrSession\Search $searchSession): stdClass
	{
		try {
			$searchData->area      = KrMethods::inputString('area');
			$searchData->region_id = KrMethods::inputInt('region_id', $this->default_region);
			$searchData->arrival   = KrMethods::inputString('arrival', '');
			Utility::validateInputDate($searchData->arrival);
			$searchData->departure = KrMethods::inputString('departure', '');
			Utility::validateInputDate($searchData->departure);
			$searchData->type_id     = KrMethods::inputInt('type_id');
			$searchData->category_id = KrMethods::inputInt('category_id');
			$searchData->feature_id  = KrMethods::inputInt('feature_id');
			$searchData->bedrooms    = KrMethods::inputInt('bedrooms');
			$searchData->flexible    = KrMethods::inputInt('flexible');
			$searchData->guests      = KrMethods::inputInt('guests', 2);
			$searchData->adults      = KrMethods::inputInt('adults', 2);
			$searchData->children    = KrMethods::inputInt('children');
			$searchData->child_ages  = KrMethods::inputArray('child_ages');
			$searchData->limitstart  = KrMethods::inputint('limitstart');

			return $searchData;
		} catch (Exception $e) {
			$searchData = $searchSession->resetData();
			SiteHelper::redirectHome();
		}
	}

	/**
	 * Set the pathway for the search
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	protected function setPathway(): void
	{
		$pathway = self::setPathwayBase();
		$pathway->addItem(KrMethods::plain('COM_KNOWRES_SEARCH_RESULTS'));
	}

	/**
	 * Set the descriptions for the search module search
	 *
	 * @throws Exception
	 * @since  4.3.0
	 * @return string
	 */
	protected function setSearchDescription(): string
	{
		$description            = $this->Search->searchData->region_name . ', ' . KrMethods::getCfg('sitename');
		$this->meta_title       = KrMethods::sprintf('COM_KNOWRES_SEO_TITLE_PROPERTIES',
		                                             $this->Search->data->region_name,
		                                             $this->Search->data->country_name);
		$this->meta_description = KrMethods::sprintf('COM_KNOWRES_SEO_DESCRIPTION_PROPERTIES',
		                                             $this->Search->data->region_name,
		                                             $this->Search->data->country_name);

		return $description;
	}
}