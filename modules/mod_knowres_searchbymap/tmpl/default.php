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

$link = KrMethods::route('index.php?option=com_knowres&view=properties&region_id=' . $region_id . '&Itemid=' . $Itemid . '&display=map');
?>

<div class="kr-searchby-map">
	<div class="map"></div>
	<a class="button expanded large no-margin-bottom" href="<?php echo $link; ?>">
		<?php echo KrMethods::plain('MOD_KNOWRES_SEARCHBYMAP_BUTTON'); ?>
		<i class='fa-solid fa-search'></i>
	</a>
</div>