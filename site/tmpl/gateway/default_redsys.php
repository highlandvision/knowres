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
?>

<form method="post" id="submitonload" name="gateway_form" action="<?php echo $this->paymentData->url; ?>">
	<input type="hidden" name="charset" value="utf-8">
	<input type="hidden" name="Ds_SignatureVersion" value="HMAC_SHA256_V1">
	<input type="hidden" name="Ds_MerchantParameters"
	       value="<?php echo $this->paymentData->merchantParameters; ?>">
	<input type="hidden" name="Ds_Signature"
	       value="<?php echo $this->paymentData->merchantSignature; ?>">

	<br><br>
	<div class="grid-x grid-margin-x">
		<div class="small-12 medium-8 medium-offset-2 cell">
			<h4 class="text-center">
				<?php echo KrMethods::plain('COM_KNOWRES_PAYMENT_REDIRECT'); ?>
				<br><br>
				<button class="button" type="submit">
					<?php echo KrMethods::plain('COM_KNOWRES_PAYMENT_REDIRECT_CLICK'); ?>
				</button>
			</h4>
		</div>
	</div>
</form>
<script>
	document.getElementById('submitonload').submit();
</script>