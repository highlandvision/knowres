<?php
/**
 * @package    Know Reservations
 * @subpackage Site module
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Module\KnowresSpotlight\Site\Helper;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Model\SiteModel;
use HighlandVision\KR\SiteHelper;
use Joomla\Registry\Registry;

/**
 * Helper class for KR spotlight
 *
 * @since 5.0.0
 */
class KnowresSpotlightHelper
{
	/**
	 * Get spotlight images
	 *
	 * @param  Registry $params  Module parameters
     *
	 * @throws Exception
	 * @since  5.0.0
	 * @return array
	 */
	public static function getImages(Registry $params): array
	{
		$count = 0;
		$images = [];
		for ($i = 1; $i <= 3; $i++) {
			if ($params->get('image' . $i)) {
				$count++;

				$category_id = $params->get('category_id' . $i);
				$layout      = $params->get('layout' . $i);
				$link        = $params->get('link' . $i);

				$option        = '';
				if ($category_id <> -1) {
					$Itemid = SiteHelper::getItemId('com_knowres', 'properties',
					                                ['layout' => 'category', 'category_id' => $category_id],
					                                ['layout' => 'category']);
					$option   = KrMethods::route('index.php?option=com_knowres&view=properties&layout=category&category_id=' .
						                 $category_id . '&Itemid=' . $Itemid);
				} elseif ($layout <> -1) {
					$Itemid = SiteHelper::getItemId('com_knowres', 'properties', ['layout' => $layout]);
					$option   = KrMethods::route('index.php?option=com_knowres&view=properties&layout=' . $layout
					                           . '&Itemid=' . $Itemid);
				} elseif ($link <> -1) {
					$option   = KrMethods::route('index.php?Itemid=' . $link);
				}

				if (empty($option)) {
					continue;
				}

				$images[$i] = ['image' => $params->get('image' . $i),
				             'text'  => $params->get('text' . $i),
				             'link'  => $option
				];
			}
		}

		return $images;
	}
}