<?php
/**
 * @package     KR
 * @subpackage  Admin views
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */
/** @noinspection PhpUnhandledExceptionInspection */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;

if (is_null(KrFactory::getListModel('coupons')->getValidCoupons($this->property->id)))
{
	return;
}
?>

<fieldset class="fieldset">
	<legend><?php echo KrMethods::plain('COM_KNOWRES_CONFIRM_COUPON_LBL'); ?></legend>
	<div class="callout formbg small">
		<div class="row">
			<div class="small-12 medium-8 columns">
				<?php echo $this->form->getInput('coupon_code', null, ''); ?>
			</div>
			<div class="small-12 medium-4 columns">
				<a class="button primary kr-calculate no-margin-bottom" href="#">
					<?php echo KrMethods::plain('COM_KNOWRES_CONFIRM_COUPON_APPLY'); ?>
				</a>
			</div>
			<div class="small-12 columns">
				<span class="red info" id="coupon-response"></span>
			</div>
		</div>
	</div>
</fieldset>