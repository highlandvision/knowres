<?php
/**
 * @package    Know Reservations
 * @subpackage Site View
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

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
use Joomla\CMS\Factory;
use Joomla\Registry\Registry;
use stdClass;

use function array_slice;
use function array_values;
use function count;
use function end;
use function implode;
use function substr;

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
	/** @var string Category blurb */
	protected string $category_blurb = '';
	/** @var int Category ID */
	protected int $category_id = 0;
	/** @var array Property currencies */
	protected array $currencies = [];
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
	 * @since        1.0.0
	 * @return void
	 */
	#[NoReturn] public function display($tpl = null): void
	{
		/** @var PropertiesModel $model */
		$model        = $this->getModel();
		$this->state  = $model->getState();
		$this->params = KrMethods::getParams();
		$layout       = KrMethods::inputString('layout', 'default', 'get');
		$today        = TickTock::getDate();
		$header       = false;

		$searchSession = new KrSession\Search();
		$searchData    = $searchSession->getData();

		$retain = KrMethods::inputInt('retain', 0, 'get');
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
				$this->category_id = KrMethods::inputInt('category_id', 0, 'get');
				if (!$this->category_id) {
					$searchData = $searchSession->resetData();
					SiteHelper::redirectHome();
				}

				/** @var CategoryModel $category */
				$category                = KrFactory::getAdminModel('category')->getItem($this->category_id);
				$searchData->layout      = $layout;
				$searchData->category_id = $this->category_id;
				$header                  = $category->name;
				$this->meta_title        = KrMethods::sprintf('COM_KNOWRES_BROWSE_CATEGORY', $category->name);
				$this->meta_description  = KrMethods::sprintf('COM_KNOWRES_BROWSE_CATEGORY_DSC', $category->name);
			}
			else if ($layout === 'new') {
				$searchData->layout     = $layout;
				$header                 = KrMethods::plain('COM_KNOWRES_BROWSE_DISCOUNTS');
				$this->meta_title       = KrMethods::plain('COM_KNOWRES_BROWSE_NEW_VILLAS');
				$this->meta_description = KrMethods::plain('COM_KNOWRES_BROWSE_NEW_VILLAS_DSC');
			}
			else if ($layout === 'discount') {
				$searchData->layout     = $layout;
				$header                 = KrMethods::plain('COM_KNOWRES_BROWSE_DISCOUNTS');
				$this->meta_title       = KrMethods::plain('COM_KNOWRES_BROWSE_DISCOUNTS');
				$this->meta_description = KrMethods::plain('COM_KNOWRES_BROWSE_DISCOUNTS_DSC');
			}
			else {
				// Input from search module!
				$searchData = $this->setInput($searchData, $searchSession);

				if (!empty($searchData->arrival) && !empty($searchData->departure)) {
					if ($searchData->arrival < $today ||
						$searchData->departure < $today ||
						$searchData->departure <= $searchData->arrival) {
						$searchData = $searchSession->resetData();
						SiteHelper::redirectHome();
					}
				}
			}
		}

		$this->Search = new Search($searchData);
		if ($new) {
			$this->Search->doBaseSearch();
		}

		if (!$header) {
			$names = array_values($this->Search->data->region_name);
			if (count($names) > 1) {
				$header = implode(', ', array_slice($names, 0, -1)) . ' & ' . end($names);
			}
			else {
				$header = $names[0];
			}
			$this->meta_title       = KrMethods::sprintf('COM_KNOWRES_SEO_TITLE_PROPERTIES',
			                                             $this->Search->data->region_name,
			                                             $this->Search->data->country_name);
			$this->meta_description = KrMethods::sprintf('COM_KNOWRES_SEO_DSC_PROPERTIES',
			                                             $this->Search->data->region_name,
			                                             $this->Search->data->country_name);
		}

		$this->header = KrMethods::sprintf('COM_KNOWRES_SEARCH_HEADER', $header, count($this->Search->data->baseIds));

		if ($this->params->get('search_list', 0)) {
			$this->layouts['list'] = true;
		}
		if ($this->params->get('search_solo', 0)) {
			$this->layouts['solo'] = true;
		}

		$searchSession->setData($this->Search->data);

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
	protected function setCanonical(): void
	{
		if (count($this->Search->data->region_id) == 1) {
			$Itemid =
				SiteHelper::getItemId('com_knowres', 'properties', ['region_id' => $this->Search->data->region_id[0]]);
			$link   =
				'index.php?option=com_knowres&view=properties&region_id=' .
				$this->Search->data->region_id[0] .
				'&Itemid=' .
				$Itemid;
		}
		else {
			$default = KrMethods::getParams('default_region');
			$Itemid  = SiteHelper::getItemId('com_knowres', 'properties', ['region_id' => $default]);
			$link    = 'index.php?option=com_knowres&view=properties&region_id=' . $default . '&Itemid=' . $Itemid;
		}

		if ($this->category_id) {
			$link .= '&category_id=' . $this->category_id;
		}

		$canonical_url = substr(KrMethods::route($link, false), 1);
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
			$searchData->region_id = KrMethods::inputArray('region_id', [$this->params->get('default_region')], 'get');
			$searchData->area      = KrMethods::inputString('area', '', 'get');
			$searchData->town      = KrMethods::inputString('town', '', 'get');
			$searchData->arrival   = KrMethods::inputString('arrival', '', 'get');
			Utility::validateInputDate($searchData->arrival);
			$searchData->departure = KrMethods::inputString('departure', '', 'get');
			Utility::validateInputDate($searchData->departure);
			$searchData->type_id     = KrMethods::inputInt('type_id', 0, 'get');
			$searchData->category_id = KrMethods::inputInt('category_id', 0, 'get');
			$searchData->feature_id  = KrMethods::inputInt('feature_id', 0, 'get');
			$searchData->bedrooms    = KrMethods::inputInt('bedrooms', 0, 'get');
			$searchData->flexible    = KrMethods::inputInt('flexible', 0, 'get');
			$searchData->guests      = KrMethods::inputInt('guests', 2, 'get');
			$searchData->adults      = KrMethods::inputInt('adults', 2, 'get');
			$searchData->children    = KrMethods::inputInt('children', 0, 'get');
			$searchData->child_ages  = KrMethods::inputArray('child_ages', [], 'get');
			$searchData->limitstart  = KrMethods::inputint('limitstart', 0, 'get');

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
		$pathway = Factory::getApplication()->getPathway();
		if (count($this->Search->data->region_id) == 1) {
			foreach ($this->Search->data->region_id as $k => $v) {
				$pathway = self::propertiesPathway($pathway, $k, $v);
			}

			$pathway->addItem(KrMethods::plain('COM_KNOWRES_SEARCH_RESULTS'));
		}
	}
}