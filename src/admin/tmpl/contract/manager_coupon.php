<?php
/**
 * @package     KR
 * @subpackage  Admin views
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

use HighlandVision\KR\Framework\KrMethods;

defined('_JEXEC') or die;
?>

<?php if ($this->show_coupon): ?>
	<fieldset>
		<legend><?php echo KrMethods::plain('COM_KNOWRES_CONTRACT_COUPON_LBL'); ?></legend>
		<div class="row">
			<div class="col-4">
				<?php echo $this->form->renderField('coupon_code'); ?>
			</div>
			<div class="col-4">
				<button type="button" class="btn btn-secondary kr-calculate">
					<?php echo KrMethods::plain('COM_KNOWRES_CONTRACT_COUPON_APPLY'); ?>
				</button>
			</div>
		</div>
		<div class="row">
			<div class="col">
				<div class="red info" id="coupon_response"></div>
			</div>
		</div>
	</fieldset>
<?php endif; ?>