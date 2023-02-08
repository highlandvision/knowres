<?php
/**
 * @package    Know Reservations
 * @subpackage Site module
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Media;
use HighlandVision\KR\SiteHelper;
use HighlandVision\KR\Translations;
use HighlandVision\KR\Utility;
use Joomla\CMS\Helper\ModuleHelper;

$wa = $app->getDocument()->getWebAssetManager();
$wa->getRegistry()->addExtensionRegistryFile('com_knowres');
$wa->useScript('com_knowres.site-modules');

$Translations = new Translations();

$properties = [];
for ($i = 1; $i <= 10; $i++)
{
	if ($params->get('property' . $i))
	{
		$properties[] = $params->get('property' . $i);
	}
}
if (!count($properties))
{
	return;
}

$slidestoshow = $params->get('slidestoshow', '3');
$title        = $params->get('title', '');
$price        = $params->get('price', true);
$items        = KrFactory::getListSiteModel('properties')->getMinMaxRates($properties);
$currencies   = KrFactory::getListModel('propertysettings')->getOneSetting('currency');
$net_rates    = KrFactory::getListModel('propertysettings')->getOneSetting('net_rates');
$net_markup   = KrFactory::getListModel('propertysettings')->getOneSetting('net_markup');
$saved        = SiteHelper::getFavourites();

$data = [];
foreach ($properties as $p)
{
	$item = false;
	foreach ($items as $item)
	{
		if ($item->id == $p)
		{
			break;
		}
	}

	if (empty($item))
	{
		continue;
	}

	$data[$p]['bedrooms']      = $item->bedrooms;
	$data[$p]['currency']      = !empty($currencies[$p]) ? $currencies[$p] : $currencies[0];
	$data[$p]['image']         = Media\Images::getPropertyImageName($p);
	$data[$p]['markup']        = !empty($net_markup[$p]) ? $net_markup[$p] : $net_markup[0];
	$data[$p]['maxrate']       = $item->maxrate;
	$data[$p]['minrate']       = $item->minrate;
	$data[$p]['netrate']       = !empty($net_rates[$p]) ? $net_rates[$p] : $net_rates[0];
	$data[$p]['plink']         = SiteHelper::buildPropertyLink($p);
	$data[$p]['property_area'] = $item->property_area;
	$data[$p]['property_name'] = $item->property_name;
	$data[$p]['sleeps']        = $item->sleeps + $item->sleeps_extra;
	$data[$p]['summary']       = $item->price_summary;
	$data[$p]['text']          = Utility::cutString($Translations->getText('property', $p, 'p1'), 180);
}

$moduleclass_sfx = htmlspecialchars($params->get('moduleclass_sfx'));
require ModuleHelper::getLayoutPath('mod_knowres_featured', $params->get('layout', 'default'));