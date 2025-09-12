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

<div class="modal" id="switchModal" aria-labelledby="switchModalLabel">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<h3 class="modal-title" id="switchModalLabel">
					<?php echo KrMethods::plain('COM_KNOWRES_PROPERTY_SWITCH_TITLE'); ?>
				</h3>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
			</div>

			<div class="modal-body">
				<div class="row">
					<div class="col">
						<br>
						<?php echo $this->formswitch->renderField('property_name'); ?>
						<br>
					</div>
				</div>
			</div>
			<div class="modal-footer">
			</div>
		</div>
	</div>
</div>