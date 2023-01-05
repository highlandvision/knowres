<?php
/**
 * @package     KR
 * @subpackage  Admin views
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;
?>

<ul class="kr-arrival-means menu icons expanded align-center icon-left">
	<li id="air" class="amitem">
		<a>
			<i class="fas fa-plane fa-1x" aria-hidden="true"></i>
			<span class="hide-for-small-only">
				<?php echo KrMethods::plain('COM_KNOWRES_CONTRACTGUESTDATAFORM_AIR'); ?>
			</span>
		</a>
	</li>
	<li id="train" class="amitem">
		<a>
			<i class="fas fa-train fa-1x" aria-hidden="true"></i>
			<span class="hide-for-small-only">
				<?php echo KrMethods::plain('COM_KNOWRES_CONTRACTGUESTDATAFORM_TRAIN'); ?>
			</span>
		</a>
	</li>
	<li id="auto" class="amitem">
		<a>
			<i class="fas fa-car fa-1x" aria-hidden="true"></i>
			<span class="hide-for-small-only">
				<?php echo KrMethods::plain('COM_KNOWRES_CONTRACTGUESTDATAFORM_AUTO'); ?>
			</span>
		</a>
	</li>
	<li id="other" class="amitem">
		<a>
			<i class="fas fa-exclamation fa-1x" aria-hidden="true"></i>
			<span class="hide-for-small-only">
				<?php echo KrMethods::plain('COM_KNOWRES_CONTRACTGUESTDATAFORM_OTHER'); ?>
			</span>
		</a>
	</li>
</ul>