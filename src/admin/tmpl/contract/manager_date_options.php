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

<fieldset>
	<legend><?php echo KrMethods::plain('COM_KNOWRES_LEGEND_CONTRACTS_MANAGER_DAYS'); ?></legend>
	<div class="row">
		<div class="col-md-4">
			<?php echo $this->form->renderField('expiry_days'); ?>
		</div>
		<div class="col-md-4">
			<?php $this->form->setValue('balance_days', '', $this->settings['balance_days']); ?>
			<?php echo $this->form->renderField('balance_days'); ?>
		</div>
		<div class="col-md-4">
			<?php echo $this->form->renderField('net_price'); ?>
		</div>
	</div>
</fieldset>