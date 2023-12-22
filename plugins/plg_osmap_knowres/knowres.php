<?php

/**
 * @package     Know Reservations
 * @subpackage  Osmap
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

defined('_JEXEC') or die();

use Alledia\OSMap\Factory;
use Alledia\OSMap\Plugin\Base;
use Alledia\OSMap\Plugin\ContentInterface;
use Alledia\OSMap\Sitemap\Collector;
use Alledia\OSMap\Sitemap\Item;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\SiteHelper;
use HighlandVision\KR\Translations;
use Joomla\Registry\Registry;
use Joomla\Utilities\ArrayHelper;

/**
 * Displays sitemap for KR properties
 */
class PlgOSMapKnowres extends Base implements ContentInterface
{
	/** @var ?PlgOSMapKnowres */
	private static ?PlgOSMapKnowres $instance = null;

	/**
	 * Returns the unique instance of the plugin
	 *
	 * @return PlgOSMapKnowres
	 * @noinspection PhpMissingReturnTypeInspection
	 */
	public static function getInstance()
	{
		if (empty(static::$instance))
		{
			$dispatcher       = Factory::getDispatcher();
			static::$instance = new self($dispatcher);
		}

		return static::$instance;
	}

	/**
	 * Returns the element of the component which this plugin supports.
	 *
	 * @return string
	 */
	public function getComponentElement(): string
	{
		return 'com_knowres';
	}

	/**
	 * This function is called before the Sitemap menu item is displayed.
	 *
	 * @param   Item      $node    Sitemap collector
	 * @param   Registry  $params  Plugin params
	 *
	 * @throws Exception
	 * @since  4.0.0
	 * @return bool
	 */
	public static function prepareMenuItem($node, $params): bool
	{
		static::checkMemory();

		$linkQuery = parse_url($node->link);
		if (!isset($linkQuery['query']))
		{
			return false;
		}

		parse_str(html_entity_decode($linkQuery['query']), $linkVars);

		$option = ArrayHelper::getValue($linkVars, 'option', '');
		if ($option != 'com_knowres')
		{
			return false;
		}

		$view = ArrayHelper::getValue($linkVars, 'view', '');
		if ($view != 'properties')
		{
			return false;
		}

		$layout = ArrayHelper::getValue($linkVars, 'layout', '');
		if ($layout == '' || $layout == 'search' || $layout == 'category')
		{
			return true;
		}

		return false;
	}

	/**
	 * This function is called before the Sitemap menu item is displayed.
	 *
	 * @param   Collector  $collector  Sitemap collector
	 * @param   Item       $parent     Parent menu item
	 * @param   Registry   $params     Plugin params
	 *
	 * @throws Exception
	 * @since  4.0.0
	 */
	public static function getTree($collector, $parent, $params): void
	{
		$priority   = $params->get('priority', $parent->priority);
		$changefreq = $params->get('changefreq', $parent->changefreq);
		if ($priority == '-1')
		{
			$priority = $parent->priority;
		}
		if ($changefreq == '-1')
		{
			$changefreq = $parent->changefreq;
		}

		$params['priority']   = $priority;
		$params['changefreq'] = $changefreq;

		$linkQuery = parse_url($parent->link);
		if (!isset($linkQuery['query']))
		{
			return;
		}

		parse_str(html_entity_decode($linkQuery['query']), $linkVars);
		$layout = ArrayHelper::getValue($linkVars, 'layout', '');

		if (empty($layout))
		{
			self::processTreeProperties($collector, $parent, $params);
		}
		else if ($layout == 'search')
		{
			self::processTreeRegions($collector, $parent, $params);
		}
	}

	/**
	 * Knowres properties support
	 *
	 * @param   Collector  $collector  Collector object
	 * @param   Item       $menuItem   Menu Item object
	 * @param   object     $params     Joomla Registry
	 *
	 * @throws Exception
	 */
	private static function processTreeProperties(Collector $collector, Item $menuItem, object $params): void
	{
		static::checkMemory();

		$db    = KrFactory::getDatabase();
		$query = $db->getQuery(true);

		$query->select($db->qn(['id',
		                        'property_name',
		                        'created_at',
		                        'updated_at']));
		$query->from($db->qn('#__knowres_property'))
		      ->where($db->qn('state') . '=1')
		      ->order($db->qn('property_name'));

		$db->setQuery($query);
		$rows = $db->loadObjectList();
		if (empty($rows))
		{
			return;
		}

		$Itemid       = SiteHelper::getItemId('com_knowres', 'property');
		$Translations = new Translations();

		$collector->changeLevel(1);

		foreach ($rows as $row)
		{
			$node             = new stdclass;
			$node->id         = $row->id;
			$node->pid        = $row->id;
			$node->uid        = $menuItem->uid . 'p' . $row->id;
			$node->browserNav = $menuItem->browserNav;
			$node->name       = $row->property_name;

			if (empty($row->updated_at) || $row->updated_at == '0000-00-00 00:00:00')
			{
				$node->modified = $row->created_at;
			}
			else
			{
				$node->modified = $row->updated_at;
			}
			$node->priority   = $params['priority'];
			$node->changefreq = $params['changefreq'];

			$link       = 'index.php?option=com_knowres&Itemid=' . $Itemid . '&view=property&id=' . $row->id;
			$node->link = KrMethods::getRoot() . KrMethods::route($link);

			if ($params->get('add_images', 1))
			{
				$max          = $params->get('max_images', 5);
				$node->images = [];

				$data   = KrFactory::getListModel('images')->getForSiteMap($row->id, $max);
				$images = [];
				foreach ($data as $i)
				{
					$title = $Translations->getText('image', $i->id, 'alt-text');
					if (empty($title))
					{
						$title = $Translations->getText('image', $i->id, 'description');
					}
					if (empty($title))
					{
						$title = $row->property_name . ' ' . $i->id;
					}
					$images[] = (object) [
						'src'   => KrMethods::getRoot() . 'images/krgallery/' . $row->id . '/' . $i->filename,
						'title' => $title
					];
				}

				if (!empty($images))
				{
					$node->images = array_merge(
						$node->images,
						$images
					);
				}
			}

			$collector->printNode($node);
		}

		$collector->changeLevel(-1);
	}

	/**
	 * KR regions
	 *
	 * @param   Collector  $collector  Collector object
	 * @param   Item       $menuItem   Menu Item object
	 * @param   object     $params     Joomla Registry
	 *
	 * @throws Exception
	 */
	private static function processTreeRegions(Collector $collector, Item $menuItem, object $params): void
	{
		//TODO v4 Put this into a menu item
		static::checkMemory();

		//		$collector->changeLevel(1);

		$rows = KrFactory::getListModel('regions')->getDistinctRegions();
		if (empty($rows))
		{
			return;
		}

		foreach ($rows as $row)
		{
			$Itemid           = SiteHelper::getItemId('com_knowres', 'properties', ['region_id' => $row->region_id]);
			$node             = new stdclass;
			$node->id         = $row->region_id;
			$node->uid        = $menuItem->uid . 'r' . $row->region_id;
			$node->browserNav = $menuItem->browserNav;
			$node->name       = $row->name;

			if (empty($row->updated_at) || $row->updated_at == '0000-00-00 00:00:00')
			{
				$node->modified = $row->created_at;
			}
			else
			{
				$node->modified = $row->updated_at;
			}
			$node->priority   = $params['priority'];
			$node->changefreq = $params['changefreq'];

			$link       = 'index.php?option=com_knowres&Itemid=' . $Itemid . '&view=properties&region_id='
				. $row->region_id;
			$node->link = KrMethods::getRoot() . KrMethods::route($link);

			$collector->printNode($node);
		}

		//		$collector->changeLevel(-1);
	}
}