<?php
/**
 * @package     Know Reservations
 * @subpackage  Site Controller
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;
use Joomla\CMS\HTML\HTMLHelper;
?>

<button class="close-button" data-close aria-label="Close modal" type="button">
	<span aria-hidden="true">&times;</span>
</button>
<br>
<form action="<?php echo KrMethods::route('index.php?option=com_knowres&task=service.check'); ?>" method="post"
      id="kr-form-gateway" class="form-validate">

	<div class="grid-x grid-margin-x">
		<div class="small-12 medium-8 medium-offset-2 cell">
			<div class="text-center">
				<h4><?php echo $this->paymentData->note; ?></h4>
			</div>
			<br><br>
			<div>
				<h5><?php echo $this->paymentData->gateway_name; ?></h5>
				<div class="callout small">
					<p><?php echo nl2br($this->paymentData->gateway_description); ?>
				</div>
				<p class="smaller">
					<?php echo KrMethods::plain('COM_KNOWRES_CONFIRM_OFFLINE'); ?>
				</p>
				<br><br>
			</div>
			<div>
				<button aria-label="<?php echo KrMethods::plain('COM_KNOWRES_CONFIRM'); ?>" class="button validate"
				        type="submit">
					<?php echo KrMethods::plain('COM_KNOWRES_CONFIRM'); ?>
				</button>
				<a aria-label="<?php echo KrMethods::plain('COM_KNOWRES_OR_CANCEL'); ?>" class="button clear"
				   id="custom-reveal-close" title="<?php echo KrMethods::plain('JCANCEL'); ?>" data-close>
					<?php echo KrMethods::plain('COM_KNOWRES_OR_CANCEL'); ?>
				</a>
			</div>
		</div>
	</div>

	<?php echo HTMLHelper::_('form.token'); ?>
	<input type="hidden" name="service_id" value="<?php echo $this->service_id; ?>">
</form>
