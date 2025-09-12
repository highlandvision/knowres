<?php
/**
 * @package     Know Reservations
 * @subpackage  Admin Layout
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Translations;
use HighlandVision\KR\Utility;

extract($displayData);
/**
 * Layout variables
 *
 * @var object $quote The quote data.
 */

$Translations = new Translations();
?>

<?php if (is_countable($quote->extras) && count($quote->extras)): ?>
	<div>
		<?php echo KrMethods::plain('COM_KNOWRES_EXTRAS_TITLE'); ?>
	</div>

	<?php foreach ($quote->extras as $k => $v) : ?>
		<?php $name = $Translations->getText('extra', $k); ?>
		<?php $quantity = $v['quantity']; ?>
		<?php $value = $v['value']; ?>
		<?php if ($quantity > 1): ?>
			<?php $name .= " x " . $quantity; ?>
		<?php endif; ?>

		<div class="row infolist">
			<div class="col-6">
				<?php echo $name; ?>
			</div>
			<div class="col-3 text-end">
				<?php echo Utility::displayValue($value, $quote->currency, $quote->decimals); ?>
			</div>
		</div>
	<?php endforeach; ?>
	<div class="row">
		<div class="col">
			<?php echo KrMethods::plain('COM_KNOWRES_CONTRACTS_EXTRAS_TOTAL'); ?>
		</div>
		<div class="col text-end">
			<?php echo Utility::displayValue($quote->extra_total, $quote->currency, $quote->decimals); ?>
		</div>
	</div>
	<hr>
<?php endif; ?>
