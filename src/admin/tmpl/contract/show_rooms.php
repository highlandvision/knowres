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

<?php if ($this->item->guest_types || $this->item->rooms) : ?>
	<?php if ($this->access_level > 10 || ($this->access_level == 10 && $this->params->get('show_summary'))): ?>
		<div class="card kr-card">
			<div class="card-header">
				<a class="showbefore collapsed" data-bs-toggle="collapse" href="#panel-collapse-rooms"
				   role="button" aria-expanded="false" aria-controls="panel-collapse-ROOMS">
					<?php echo KrMethods::plain('COM_KNOWRES_ROOMS'); ?>
				</a>
			</div>
			<div class="collapse" id="panel-collapse-rooms">
				<div class="card-body">
					<?php echo KrMethods::render('contract.show.rooms', ['contract' => $this->item]); ?>
				</div>
			</div>
		</div>
	<?php endif; ?>
<?php endif; ?>