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
use HighlandVision\KR\Translations;
use Joomla\CMS\Helper\ModuleHelper;

$app->bootComponent('com_knowres')->getMVCFactory()->createModel('Slideshow', 'Site', ['ignore_request' => true]);

$wa = $app->getDocument()->getWebAssetManager();
$wa->getRegistry()->addExtensionRegistryFile('com_knowres');
$wa->useScript('com_knowres.modules');

$properties = [];
for ($i = 1; $i <= 6; $i++)
{
	if ($params->get('image' . $i) && $params->get('property' . $i))
	{
		$properties[] = $params->get('property' . $i);
	}
}

$names        = KrFactory::getListSiteModel('properties')->getNames($properties);
$Translations = new Translations();

$properties = [];
foreach ($names as $n)
{
	$properties[$n->id] = [
		'property_name' => $n->property_name,
		'region_name'   => $Translations->getText('region', $n->region_id),
		'country_name'  => $Translations->getText('country', $n->country_id)
	];
}

$data = [];
for ($i = 1; $i <= 6; $i++)
{
	if ($params->get('image' . $i))
	{
		if ($params->get('property' . $i))
		{
			$p        = $properties[$params->get('property' . $i)];
			$data[$i] = [
				'image'         => $params->get('image' . $i),
				'property_id'   => $params->get('property' . $i),
				'property_name' => $p['property_name'],
				'region_name'   => $p['region_name'],
				'country_name'  => $p['country_name']
			];
		}
		else
		{
			$data[$i] = [
				'image'         => $params->get('image' . $i),
				'property_name' => $params->get('image' . $i)
			];
		}
	}
}

$moduleclass_sfx = htmlspecialchars($params->get('moduleclass_sfx'));
require ModuleHelper::getLayoutPath('mod_knowres_slideshow', $params->get('layout', 'default'));