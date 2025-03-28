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
 * @var string $text     Header text.
 * @var float  $value    Payment value.
 * @var string $date     Payment date.
 * @var string $right    Right text.
 * @var string $due      Payment due date.
 * @var string $currency Payment currency.
 */
?>

<div class="grid-x grid-margin-x payment-info">
	<div class="small-7 cell" style="border-right:1px solid #ccc;">
		<h4 class="vsmall-margin-bottom">
			<?php echo $text . ' ' . Utility::displayValue($value, $currency); ?>
		</h4>
		<p class="no-margin-bottom">
			<?php echo $date; ?>
		</p>
	</div>
	<div class="small-5 cell">
		<?php if (!$due): ?>
			<h4>
				<?php echo $right; ?>
			</h4>
		<?php else: ?>
			<a class="button" id="showgateways">
				<?php echo KrMethods::plain('COM_KNOWRES_PAYMENT_OPTIONS'); ?>
			</a>
		<?php endif; ?>
	</div>
</div>