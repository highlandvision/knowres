<?php
/**
 * @package    Know Reservations
 * @subpackage Site Controllers
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;
?>

<div id="kr-search-map-modal" class="reveal full" data-reveal data-v-offset="0">
	<div id="kr-search-map-full"></div>
	<div id="kr-infowindow" data-closable></div>
	<div id="kr-search-map-buttons" class="small button-group">
		<a href="#" class="resetmap small button">
			<?php echo KrMethods::plain('COM_KNOWRES_RESET_MAP'); ?>
		</a>
		<a href="#" id="kr-swap-map" class="closemap small button">
			<?php echo KrMethods::plain('COM_KNOWRES_CLOSE_MAP'); ?>
		</a>
	</div>
</div>