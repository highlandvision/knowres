<?php
/**
 * Joomla! Content Management System
 *
 * @copyright  Copyright (C) 2005 - 2020 Open Source Matters, Inc. All rights reserved.
 * @license    GNU General Public License version 2 or later; see LICENSE.txt
 */

namespace HighlandVision\KR\Joomla\Extend\HtmlView;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Joomla\Extend\HtmlView as KrHtmlView;
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
class Site extends KrHtmlView
{
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
			$Itemid = SiteHelper::getItemId('com_knowres', 'properties', ['layout' => 'search']);
			$link   = KrMethods::route('index.php?Itemid=' . $Itemid . '&retain=1');
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
	 * @since  4.3.0
	 * @return Pathway
	 */
	public static function propertyPathway(Pathway $pathway, stdClass $searchData, object $property): Pathway
	{
		if (empty($searchData->baseIds)) {
			$pathway = self::propertyRegionPathway($pathway, $property->region_id, $property->region_name);
		}
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
	 * @since  4.3.0
	 * @return Pathway
	 */
	public static function propertyRegionPathway(Pathway $pathway, int $region_id, string $region_name): Pathway
	{
		$Itemid = SiteHelper::getItemId('com_knowres', 'properties', ['layout' => 'search', 'region_id' => $region_id]);
		$link   = KrMethods::route('index.php?option=com_knowres&view=properties' .
		                           '&region_id=' . $region_id .
		                           '&Itemid=' . $Itemid);
		$pathway->addItem($region_name, $link);

		return $pathway;
	}

	/**
	 * Add search backlink to pathway
	 *
	 * @param  Pathway  $pathway    Current pathway
	 * @param  ?int     $region_id  ID of search region
	 * @param  ?int     $Itemid     Item ID of search page
	 *
	 * @throws Exception
	 * @since  3.3.0
	 * @return Pathway
	 */
	public static function searchPathway(Pathway $pathway, ?int $region_id, ?int $Itemid): Pathway
	{
		$backlink =
			KrMethods::route('index.php?option=com_knowres&view=properties&Itemid=' .
			                 $Itemid . '&region_id=' . $region_id . '&retain=1');
		$pathway->addItem(KrMethods::plain('COM_KNOWRES_SEARCH_RESULTS'), $backlink);

		return $pathway;
	}

	/**
	 * Set pathway base
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
			$link = KrMethods::route('/index.php?Itemid=' . $langs[$tag]);
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

		$menu = $app->getMenu()->getActive();
		if ($menu) {
			$menu_params      = $menu->getParams();
			$menu_title       = $menu_params->get('page_title');
			$menu_description = $menu_params->get('menu-meta_description');
			$menu_robots      = $menu_params->get('robots');
		}

		$title = $menu_title <> '' ? $menu_title : $app->get('page_title', $title);
		if ($app->getCfg('sitename_pagetitles', 0) == 1) {
			$title = KrMethods::sprintf('JPAGETITLE', $app->getCfg('sitename'), $title);
		}
		else if ($app->getCfg('sitename_pagetitles', 0) == 2) {
			$title = KrMethods::sprintf('JPAGETITLE', $title, $app->getCfg('sitename'));
		}

		$this->document->setTitle($title);
		$this->document->setDescription($menu_description <> '' ? $menu_description :
			                                $app->get('meta_description', $description));
		$this->document->setMetaData('robots', $menu_robots <> '' ? $menu_robots : $app->get('robots'));
	}
}