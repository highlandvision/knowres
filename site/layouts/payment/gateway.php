<?php
/**
 * @package    Know Reservations
 * @subpackage Admin Layout
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Utility;

extract($displayData);
/**
 * Layout variables
 *
 * @var string $plugincc   PLugin / currency.
 * @var string $checked    Checked radio.
 * @var string $label      Plugin label.
 * @var float  $amount     Payment amount.
 * @var string $currency   Payment currency.
 * @var float  $surcharge  Payment surcharge.
 * @var string $service    Service name.
 * @var int    $service_id ID of service.
 */
?>

<div class="callout formbg small">
	<!--suppress HtmlFormInputWithoutLabel -->
	<input type="radio" class="radioover gateway" name="plugincc" id="<?php echo $plugincc; ?>"
	       value="<?php echo $plugincc; ?>" <?php echo $checked; ?>>
	<label class="radiolabel" for="<?php echo $plugincc ?>">
		<?php echo Utility::displayValue($amount, $currency); ?>
		-
		<?php echo $label . ' (' . $currency . ')'; ?>
	</label>
	<?php if ($surcharge > 0): ?>
		<div class="gateway-surcharge">
			<p class="vsmall">
				<?php echo KrMethods::sprintf('COM_KNOWRES_PAYMENT_SURCHARGE_ADDED',
					Utility::displayValue($surcharge, $currency)); ?>
			</p>
		</div>
	<?php endif; ?>

	<input type="hidden" name="<?php echo $service; ?>" value="<?php echo $service_id; ?>">
</div>