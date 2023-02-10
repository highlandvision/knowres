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
use HighlandVision\KR\Search;
use HighlandVision\KR\Session as KrSession;
use HighlandVision\KR\SiteHelper;
use HighlandVision\KR\TickTock;
use HighlandVision\KR\Utility;
use JetBrains\PhpStorm\NoReturn;
use Joomla\CMS\Factory;
use Joomla\Registry\Registry;
use RuntimeException;
use stdClass;

use function substr;

/**
 * View properties
 *
 * @since 1.0.0
 */
class HtmlView extends KrHtmlView\Site
{
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
	/** @var Registry KR parameters */
	public Registry $params;
	/** @var bool True if property search */
	protected bool $property_search = false;
	/** @var Search Site search */
	protected Search $Search;

	/**
	 * Display the view
	 *
	 * @param  null  $tpl  Default template.
	 *
	 * @throws Exception
	 * @since  1.0.0
	 * @return void
	 * @noinspection PhpLoopNeverIteratesInspection
	 */
	#[NoReturn] public function display($tpl = null): void
	{
		/** @var PropertiesModel $model */
		$model        = $this->getModel();
		$this->state  = $model->getState();
		$this->params = KrMethods::getParams();
		$layout       = KrMethods::inputString('layout', 'default', 'get');

		while (true)
		{
			$this->category_id = KrMethods::inputInt('category_id', 0, 'get');
			if ($this->category_id)
			{
				/** @var CategoryModel $category */
				$category = KrFactory::getAdminModel('category')->getItem($this->category_id);
				if (!$category->id)
				{
					throw new RuntimeException('Category not found for Category ID ' . $this->category_id);
				}

				$this->header         = KrMethods::sprintf('COM_KNOWRES_BROWSE_CATEGORY', $category->name);
				$this->category_blurb = $category->blurb;
			}

			if ($this->category_id && $layout === 'category')
			{
				$this->items            = KrFactory::getListSiteModel('properties')->getByCategory($this->category_id);
				$this->meta_title       = KrMethods::sprintf('COM_KNOWRES_BROWSE_CATEGORY', $category->name);
				$this->meta_description = KrMethods::sprintf('COM_KNOWRES_BROWSE_CATEGORY_DSC',
					$category->name);
				$this->setLayout('category');

				break;
			}

			if ($layout === 'new')
			{
				$this->items            = KrFactory::getListSiteModel('properties')->getNew();
				$this->meta_title       = KrMethods::plain('COM_KNOWRES_BROWSE_NEW_VILLAS');
				$this->meta_description = KrMethods::plain('COM_KNOWRES_BROWSE_NEW_VILLAS_DSC');
				$this->setLayout('new');

				break;
			}

			if ($layout === 'discount')
			{
				$this->items            = KrFactory::getListSiteModel('properties')->getDiscount();
				$this->currencies       = KrFactory::getListModel('propertysettings')->getOneSetting('currency');
				$this->meta_title       = KrMethods::plain('COM_KNOWRES_BROWSE_DISCOUNTS');
				$this->meta_description = KrMethods::plain('COM_KNOWRES_BROWSE_DISCOUNTS_DSC');
				$this->setLayout('discount');

				break;
			}

			// The real deal!
			$this->property_search = true;
			$retain                = KrMethods::inputInt('retain', 0, 'get');
			if ($retain == 2)
			{
				KrMethods::message(KrMethods::plain('COM_KNOWRES_EXPIRED_SESSION'));
				$retain = 1;
			}

			$searchSession = new KrSession\Search();
			$searchData    = $searchSession->getData();

			// Either retain is not set or no base properties so
			// reset the search session data and start again
			$new = false;
			if (!$retain || !count($searchData->baseIds))
			{
				$order       = $searchData->order;
				$ordering    = $searchData->ordering;
				$direction   = $searchData->direction;
				$ordercustom = $searchData->ordercustom;

				$searchData              = $searchSession->resetData();
				$searchData->order       = $order;
				$searchData->ordering    = $ordering;
				$searchData->direction   = $direction;
				$searchData->ordercustom = $ordercustom;

				$searchSession->setData($searchData);
				$searchData = $this->setInput($searchData);

				$today = TickTock::getDate();
				if (!empty($searchData->arrival) && !empty($searchData->departure))
				{
					if ($searchData->arrival < $today || $searchData->departure < $today
						|| $searchData->departure <= $searchData->arrival)
					{
						$searchData = $searchSession->resetData();
						SiteHelper::redirectHome();
					}
				}

				$new = true;
			}

			$this->Search = new Search($searchData);
			if ($new)
			{
				$this->Search->doBaseSearch();
			}

			$this->header           = $this->Search->data->region_name . ', ' . KrMethods::getCfg('sitename');
			$this->meta_title       = KrMethods::sprintf('COM_KNOWRES_SEO_TITLE_PROPERTIES',
				$this->Search->data->region_name, $this->Search->data->country_name);
			$this->meta_description = KrMethods::sprintf('COM_KNOWRES_SEO_DSC_PROPERTIES',
				$this->Search->data->region_name, $this->Search->data->country_name);

			if ($this->params->get('search_grid', 0))
			{
				$this->layouts['grid'] = true;
			}
			if ($this->params->get('search_list', 0))
			{
				$this->layouts['list'] = true;
			}
			if ($this->params->get('search_solo', 0))
			{
				$this->layouts['solo'] = true;
			}
			if ($this->params->get('search_thumb', 0))
			{
				$this->layouts['thumb'] = true;
			}

			$searchSession->setData($this->Search->data);

			break;
		}

		$errors = $this->get('errors');
		if (is_countable($errors) && count($errors))
		{
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
	protected function prepareDocument()
	{
		$this->prepareDefaultDocument($this->meta_title, $this->meta_description);
		if ($this->property_search)
		{
			$this->setCanonical();
			$this->setPathway();
		}
	}

	/**
	 * Get request search data and store in session
	 *
	 * @param  stdClass  $searchData  Session search data
	 *
	 * @throws Exception
	 * @since  1.0.0
	 * @return stdClass
	 */
	protected function setInput(stdClass $searchData): stdClass
	{
		$searchData->region_id     = KrMethods::inputInt('region_id', $this->params->get('default_region'), 'get');
		$searchData->property_area = KrMethods::inputString('property_area', '', 'get');
		$searchData->town          = KrMethods::inputString('town', '', 'get');
		$searchData->arrival       = KrMethods::inputString('arrival', '', 'get');
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
	}

	/**
	 * Set the pathway for the search
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	protected function setPathway()
	{
		$pathway = Factory::getApplication()->getPathway();

		$pathway = self::propertiesPathway($pathway, $this->Search->data->region_id,
			$this->Search->data->region_name);

		$pathway->addItem(KrMethods::plain('COM_KNOWRES_SEARCH_RESULTS'));
	}

	/**
	 * Set the canonical URL for the search.
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	protected function setCanonical()
	{
		$Itemid = SiteHelper::getItemId('com_knowres', 'properties', ['region_id' => $this->Search->data->region_id]);
		$link   = 'index.php?option=com_knowres&view=properties&region_id=' . $this->Search->data->region_id
			. '&Itemid=' . $Itemid;

		if ($this->category_id)
		{
			$link .= '&category_id=' . $this->category_id;
		}

		$canonical_url = substr(KrMethods::route($link, false), 1);
		$this->document->addHeadLink(KrMethods::getRoot() . $canonical_url, 'canonical');
	}
}