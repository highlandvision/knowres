<?php
/**
 * Joomla! Content Management System
 *
 * @copyright  Copyright (C) 2005 - 2020 Open Source Matters, Inc. All rights reserved.
 * @license    GNU General Public License version 2 or later; see LICENSE.txt
 */

/** @noinspection PhpPossiblePolymorphicInvocationInspection */

namespace HighlandVision\KR\Joomla\Extend\HtmlView;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Joomla\Extend\HtmlView as KrHtmlView;
use HighlandVision\KR\Model\SiteModel;
use HighlandVision\KR\SiteHelper;
use Joomla\CMS\Factory;
use Joomla\CMS\Pathway\Pathway;
use Joomla\Component\Menus\Administrator\Helper\MenusHelper;
use stdClass;

use function count;

/**
 * Base class for a Joomla View
 * Class holding methods for displaying presentation data.
 *
 * @since  2.5.5
 */
class Site extends KrHtmlView {
	/** @var int Joomla Itemid. */
	public int $Itemid = 0;
	/** @var stdClass Guest data. */
	public stdClass $guestData;
	/** @var string Meta description. */
	public string $meta_description = '';
	/** @var string Meta title. */
	public string $meta_title = '';
	/** @var stdClass Payment data. */
	public stdClass $paymentData;
	/** @var stdClass User data. */
	public stdClass $userData;

	/**
	 * Constructor
	 *
	 * @throws Exception
	 * @since  4.0.0
	 */
	public function __construct()
	{
		parent::__construct();
	}

	/**
	 * Add confirm pathway link
	 *
	 * @param  Pathway  $pathway  Current pathway
	 *
	 * @throws Exception
	 * @since  3.3.0
	 * @return Pathway
	 */
	public static function confirmPathway(Pathway $pathway): Pathway
	{
		$Itemid = SiteHelper::getItemId('com_knowres', 'confirm');
		$pathway->addItem(Krmethods::plain('COM_KNOWRES_MAKE_A_RESERVATION'),
			KrMethods::route('index.php?option=com_knowres&view=confirm&Itemid=' . $Itemid));

		return $pathway;
	}

	/**
	 * Build the breadcrumbs for the dashbaord
	 *
	 * @param  Pathway  $pathway  Current pathway
	 *
	 * @throws Exception
	 * @since  3.3.0
	 * @return Pathway
	 */
	public static function dashboardPathway(Pathway $pathway): Pathway
	{
		$pathway->addItem(KrMethods::plain('COM_KNOWRES_TITLE_DASHBOARD'),
			KrMethods::route('index.php?option=com_knowres&task=dashboard.cancel'));

		return $pathway;
	}

	/**
	 * Build properties part of pathway
	 *
	 * @param  Pathway    $pathway     Current pathway
	 * @param  ?stdClass  $searchData  Session search data
	 *
	 * @throws Exception
	 * @since  3.3.0
	 * @return Pathway
	 */
	public static function propertiesPathway(Pathway $pathway, ?stdClass $searchData = null): Pathway
	{
		if (!empty($searchData) && count($searchData->baseIds)) {
			$region_id = $searchData->region_id ?: KrMethods::getParams()->get('default_region');
			$Itemid    = SiteHelper::getItemId('com_knowres', 'properties');
			$link      = KrMethods::route('index.php?option=com_knowres&view=properties&Itemid=' . $Itemid
			                              . '&region_id=' . $region_id);
			$link      .= '?retain=1';
			$pathway->addItem(KrMethods::plain('COM_KNOWRES_SEARCH_RESULTS'), $link);
		}

		return $pathway;
	}

	/**
	 * Add property pathway
	 *
	 * @param  Pathway   $pathway     Existing pathway instance
	 * @param  stdClass  $searchData  Session search data
	 * @param  object    $property    Property item data
	 *
	 * @throws Exception
	 * @since  5.0.0
	 * @return Pathway
	 */
	public static function propertyPathway(Pathway $pathway, stdClass $searchData, object $property): Pathway
	{
		$pathway->addItem($property->property_name, SiteHelper::buildPropertyLink($property->id));

		return $pathway;
	}

	/**
	 * Add property region pathway
	 *
	 * @param  Pathway  $pathway      Existing pathway instance
	 * @param  int      $region_id    Region ID Of property
	 * @param  string   $region_name  Region name of property
	 *
	 * @throws Exception
	 * @since  5.0.0
	 * @return Pathway
	 */
	public static function propertyRegionPathway(Pathway $pathway, int $region_id, string $region_name): Pathway
	{
		$Itemid = SiteHelper::getItemId('com_knowres', 'properties');
		$link   = KrMethods::route('index.php?option=com_knowres&view=properties' . '&region_id=' . $region_id .
		                           '&Itemid=' . $Itemid);
		$pathway->addItem($region_name, $link);

		return $pathway;
	}

	/**
	 * Set the base item for the pathway
	 *
	 * @throws Exception
	 * @since  3.3.0
	 * @return Pathway
	 */
	public static function setPathwayBase(): Pathway
	{
		$pathway = Factory::getApplication()->getPathway();
		$pathway->setPathway([]);

		$base = KrMethods::getParams()->get('search_breadcrumbs', '');
		if (!$base) {
			return $pathway;
		}

		$langs       = [];
		$tag         = KrMethods::getLanguageTag();
		$def         = KrMethods::getParams('com_languages')->get('site');
		$langs[$def] = $base;

		if ($tag != $def) {
			$associations = MenusHelper::getAssociations($base);
			foreach ($associations as $tag => $Itemid) {
				$langs[$tag] = $Itemid;
			}
		}

		if (isset($langs[$tag])) {
			$link  = KrMethods::route('index.php?Itemid=' . $langs[$tag]);
			$title = Factory::getApplication()->getMenu()->getItem($langs[$tag])->title;
			if (!empty($title) && $link) {
				$pathway->addItem($title, $link);
			}
		}

		return $pathway;
	}

	/**
	 * Prepares the document data
	 *
	 * @param  string  $title        Default page title
	 * @param  string  $description  Default page description
	 *
	 * @throws Exception
	 * @since 3.3.0
	 */
	protected function prepareDefaultDocument(string $title, string $description): void
	{
		$app              = Factory::getApplication();
		$menu_title       = '';
		$menu_description = '';
		$menu_robots      = '';

		if (empty($title) || empty($description)) {
			$menu = $app->getMenu()->getActive();
			if ($menu) {
				$menu_params      = $menu->getParams();
				$menu_title       = $menu_params->get('page_title');
				$menu_description = $menu_params->get('menu-meta_description');
				$menu_robots      = $menu_params->get('robots');
			}
		}

		if (empty($title)) {
			$title = !empty($menu_title) ? $menu_title : $app->get('page_title', $title);
		}
		if ($app->getCfg('sitename_pagetitles', 0) == 1) {
			$title = KrMethods::sprintf('JPAGETITLE', $app->getCfg('sitename'), $title);
		} else if ($app->getCfg('sitename_pagetitles', 0) == 2) {
			$title = KrMethods::sprintf('JPAGETITLE', $title, $app->getCfg('sitename'));
		}
		$this->document->setTitle($title);

		if (empty($description)) {
			$this->document->setDescription(!empty($menu_description) ? $menu_description :
				$app->get('meta_description', $description));
		} else {
			$this->document->setDescription($description);
		}

		$this->document->setMetaData('robots', $menu_robots <> '' ? $menu_robots : $app->get('robots'));
	}
}