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
	 * @param  ?int     $Itemid   Item ID of search page
	 *
	 * @throws Exception
	 * @since  3.3.0
	 * @return Pathway
	 */
	public static function confirmPathway(Pathway $pathway, ?int $Itemid): Pathway
	{
		$pathway->addItem(Krmethods::plain('COM_KNOWRES_CONFIRM_TITLE'),
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
	 * Build properties / property pathway
	 *
	 * @param  Pathway  $pathway      Current pathway
	 * @param  ?int     $region_id    ID of search region
	 * @param  ?string  $region_name  Name of seach region
	 * @param  int      $Itemid       Memu item id for search region page for multi region sites
	 *
	 * @throws Exception
	 * @since  3.3.0
	 * @return Pathway
	 */
	public static function propertiesPathway(Pathway $pathway, ?int $region_id = 0, ?string $region_name = null,
		int $Itemid = 0): Pathway
	{
		$pathway = self::setPathwayBase($pathway);
		if ($Itemid) {
			$pathway->addItem($region_name, KrMethods::route('index.php?option=com_knowres&view=properties&Itemid=' .
			                                                 $Itemid .
			                                                 '&region_id=' .
			                                                 $region_id));
		}

		return $pathway;
	}

	/**
	 * Add property pathway
	 *
	 * @param  Pathway  $pathway  Existing pathway instance
	 * @param  int      $id       ID of property
	 * @param  string   $name     Name of property
	 *
	 * @throws Exception
	 * @since  3.3.0
	 * @return Pathway
	 */
	public static function propertyPathway(Pathway $pathway, int $id, string $name): Pathway
	{
		$pathway->addItem($name, SiteHelper::buildPropertyLink($id));

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
			                 $Itemid .
			                 '&region_id=' .
			                 $region_id .
			                 '&retain=1');
		$pathway->addItem(KrMethods::plain('COM_KNOWRES_SEARCH_RESULTS'), $backlink);

		return $pathway;
	}

	/**
	 * Set pathway base
	 *
	 * @param  Pathway  $pathway  Current pathway
	 *
	 * @throws Exception
	 * @since  3.3.0
	 * @return Pathway
	 */
	public static function setPathwayBase(Pathway $pathway): Pathway
	{
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
			$link = KrMethods::route('index.php?Itemid=' . $langs[$tag]);
			if (isset (Factory::getApplication()->getMenu()->getItem($langs[$tag])->title)) {
				$title = Factory::getApplication()->getMenu()->getItem($langs[$tag])->title;
				if ($link && $title) {
					$pathway->addItem($title, $link);
				}
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