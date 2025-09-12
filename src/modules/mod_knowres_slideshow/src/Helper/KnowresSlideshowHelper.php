<?php
/**
 * @package    Know Reservations
 * @subpackage Site module
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Module\KnowresSlideshow\Site\Helper;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Model\SiteModel;
use HighlandVision\KR\SiteHelper;
use HighlandVision\KR\Translations;
use Joomla\Registry\Registry;

/**
 * Helper class for KR Slideshow
 *
 * @since 5.0.0
 */
class KnowresSlideshowHelper
{
	/**
	 * Get the slideshow data for each property
	 *
	 * @throws Exception
	 * @since  5.0.0
	 */
	public static function getSlides(Registry $moduleParams): array
	{
		$properties = [];
		$slides     = [];

		for ($i = 1; $i <= 6; $i++) {
			if ($moduleParams->get('image' . $i) && $moduleParams->get('property' . $i)) {
				$properties[] = $moduleParams->get('property' . $i);
			}
		}

		if (!empty($properties)) {
			$names        = KrFactory::getListSiteModel('properties')->getNames($properties);
			$Translations = new Translations();

			$properties = [];
			foreach ($names as $n) {
				$region_name        = $Translations->getText('region', $n->region_id);
				$country_name       = $Translations->getText('country', $n->country_id);
				$Itemid             = SiteHelper::getItemId('com_knowres', 'property', ['id' => $n->id]);
				$properties[$n->id] = ['property_name' => $n->property_name,
				                       'region_name'   => $region_name,
				                       'country_name'  => $country_name,
				                       'alt'           => $n->property_name . ' ' . $region_name . ' ' . $country_name,
				                       'description'   => $n->property_name . ' ' . $region_name . ' ' . $country_name,
				                       'Itemid'        => $Itemid,

				];
			}
		}

		for ($i = 1; $i <= 6; $i++) {
			if ($moduleParams->get('image' . $i)) {
				if ($moduleParams->get('property' . $i)) {
					$p          = $properties[$moduleParams->get('property' . $i)];
					$slides[$i] = ['image'         => $moduleParams->get('image' . $i),
					               'property_id'   => $moduleParams->get('property' . $i),
					               'property_name' => $p['property_name'],
					               'region_name'   => $p['region_name'],
					               'country_name'  => $p['country_name'],
					               'alt'           => $moduleParams->get('alt' . $i) ? $moduleParams->get('alt' . $i) : $p['alt'],
					               'description'   => $moduleParams->get('description' . $i) ?
						               $moduleParams->get('description' . $i) :
						               $p['description']
					];
				} else {
					$slides[$i] = ['image'         => $moduleParams->get('image' . $i),
					               'property_name' => '',
					               'alt'           => $moduleParams->get('alt' . $i),
					               'description'   => $moduleParams->get('description' . $i),
					];
				}
			}
		}

		return $slides;
	}
}