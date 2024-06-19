<?php
/**
 * @package    Know Reservations
 * @subpackage Site module
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Module\KnowresFeatured\Site\Helper;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Media;
use HighlandVision\KR\Model\SiteModel;
use HighlandVision\KR\SiteHelper;
use HighlandVision\KR\Translations;
use HighlandVision\KR\Utility;

/**
 * Helper class for KR featured
 *
 * @since 5.0.0
 */
class KnowresFeaturedHelper
{
	/**
	 * Get module title, either entered as param or module title
	 *
	 * @param  ?string  $title  Module title
	 *
	 * @since  5.0.0
	 * @return ?string
	 */
	public static function getMyTitle(?string $title): ?string
	{
		if (empty($title)) {
			return $module->title;
		} else {
			return $title;
		}
	}

	/**
	 * Get display data for a property
	 *
	 * @param  int           $id            Property ID
	 * @param  mixed         $item          Property item
	 * @param  mixed         $currencies    Currencies
	 * @param  mixed         $net_rates     Net rates
	 * @param  mixed         $net_markup    Net rates markup
	 * @param  Translations  $Translations  KR Translations
	 *
	 * @throws Exception
	 * @since  5.0.0
	 * @return array
	 */
	public static function getPropertyData(int   $id, mixed $item, mixed $currencies, mixed $net_rates,
	                                       mixed $net_markup, Translations $Translations): array
	{
		$pdata                  = [];
		$pdata['id']            = $item->id;
		$pdata['bedrooms']      = $item->bedrooms;
		$pdata['currency']      = !empty($currencies[$id]) ? $currencies[$id] : $currencies[0];
		$pdata['image']         = Media\Images::getPropertyImageName($id);
		$pdata['markup']        = !empty($net_markup[$id]) ? $net_markup[$id] : $net_markup[0];
		$pdata['maxrate']       = $item->maxrate;
		$pdata['minrate']       = $item->minrate;
		$pdata['netrate']       = !empty($net_rates[$id]) ? $net_rates[$id] : $net_rates[0];
		$pdata['plink']         = SiteHelper::buildPropertyLink($id);
		$pdata['property_area'] = $item->property_area;
		$pdata['property_name'] = $item->property_name;
		$pdata['sleeps']        = $item->sleeps + $item->sleeps_extra;
		$pdata['summary']       = $item->price_summary;
		$pdata['text']          = Utility::cutString($Translations->getText('property', $id, 'p1'), 180);

		return $pdata;
	}
}