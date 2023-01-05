<?php
/**
 * @package     Know Reservations
 * @subpackage  Site Controller
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */
/** @noinspection PhpUnhandledExceptionInspection */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;
use Joomla\CMS\HTML\HTMLHelper;
?>

<form action="<?php echo KrMethods::route('index.php?option=com_knowres&task=service.wireint'); ?>"
      method="post" id="kr-form-gateway" class="form-validate">
	<div class="row">
		<br>
		<div class="small-12 medium-10 medium-offset-1 large-8 large-offset-2 columns text-center">
			<h4><?php echo $this->paymentData->note; ?></h4>
		</div>
		<br><br>
		<div class="small-12 medium-8 medium-offset-2 columns text-center">
			<div class="callout small">
				<h4><?php echo $this->paymentData->gateway_description; ?></h4>
			</div>
			<p class="smaller">
				<?php echo KrMethods::plain('COM_KNOWRES_CONFIRM_OFFLINE'); ?>
			</p>
			<br><br>
			<button type="submit" class="button validate">
				<?php echo KrMethods::plain('COM_KNOWRES_CONFIRM'); ?>
			</button>
			<a id="custom-reveal-close" class="button clear small"
			   title="<?php echo KrMethods::plain('JCANCEL'); ?>" data-close>
				<?php echo KrMethods::plain('COM_KNOWRES_OR_CANCEL'); ?>
			</a>
		</div>
	</div>
	<?php echo HTMLHelper::_('form.token'); ?>
	<input type="hidden" name="service_id" value="<?php echo $this->service_id; ?>">
</form>

<button class="close-button" data-close aria-label="Close modal" type="button">
	<span aria-hidden="true">&times;</span>
</button>
