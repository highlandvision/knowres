<?php
/**
 * @package    Know Reservations
 * @subpackage Site module
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\SiteHelper;
use HighlandVision\KR\Translations;
use Joomla\CMS\Helper\ModuleHelper;

defined('_JEXEC') or die;

$wa = $app->getDocument()->getWebAssetManager();
$wa->getRegistry()->addExtensionRegistryFile('com_knowres');
$wa->useScript('com_knowres.modules');

$Translations = new Translations();
$regions      = [];

$results = KrFactory::getListModel('regions')->getAllRegions(true);
if (count($results))
{
	foreach ($results as $r)
	{
		$regions[$r->id] = $Translations->getText('region', $r->id);
	}
}

$data = [];
for ($i = 1; $i <= 6; $i++)
{
	if ($params->get('image' . $i) && $params->get('region' . $i) != -1)
	{
		$data[$i] = array(
			'image'  => $params->get('image' . $i),
			'id'     => $params->get('region' . $i),
			'name'   => $regions[$params->get('region' . $i)],
			'Itemid' => SiteHelper::getItemId("com_knowres", "properties",
				['region_id' => $params->get('region' . $i)])
		);
	}
}

$moduleclass_sfx = htmlspecialchars($params->get('moduleclass_sfx'));
require ModuleHelper::getLayoutPath('mod_knowres_regions', $params->get('layout', 'default'));