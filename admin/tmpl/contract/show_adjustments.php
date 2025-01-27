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

if ($this->access_level > 10): ?>
	<div class="card kr-card">
		<div class="card-header">
			<a class="showbefore collapsed" data-bs-toggle="collapse" href="#panel-collapse-adjustments"
			   role="button" aria-expanded="false" aria-controls="panel-collapse-rates">
				<?php echo KrMethods::plain('COM_KNOWRES_CONTRACT_ADJUSTMENTS_PANEL'); ?>
			</a>
		</div>
		<div class="collapse" id="panel-collapse-adjustments">
			<div class="card-body">
				<?php echo KrMethods::render('contract.show.adjustments',
					['contract' => $this->item]
				);
				?>
			</div>
		</div>
	</div>
<?php endif; ?>