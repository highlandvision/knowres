<?php
/**
 * @package    Know Reservations
 * @subpackage Site module
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;

$wa = $app->getDocument()->getWebAssetManager();
$wa->getRegistry()->addExtensionRegistryFile('com_knowres');
$wa->useScript('com_knowres.site-modules');
?>

<div class="kr-searchby-map">
	<div class="map"></div>
	<a class="button expanded large no-margin-bottom" href="<?php echo $link; ?>">
		<?php echo KrMethods::plain('MOD_KNOWRES_SEARCHBYMAP_BUTTON'); ?>
		<i class='fa-solid fa-search'></i>
	</a>
</div>