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

<?php if (is_countable($quote->taxes) && count($quote->taxes)): ?>
	<div>
		<?php echo KrMethods::plain('COM_KNOWRES_CONTRACTS_TAX'); ?>
	</div>

	<?php foreach ($quote->taxes as $k => $v) : ?>
		<?php $type = $v['type'] ?? ''; ?>
		<?php $value = $v['value'] ?? 0; ?>
		<?php $value = Utility::displayValue($value, $quote->currency); ?>
		<?php $calc = $v['calc'] ?? ''; ?>
		<?php $id = $v['id'] ?? 0; ?>
		<?php $pc = $v['pc'] ?? 0; ?>
		<?php $name = $Translations->getText('taxrate', $id); ?>
		<?php if (!empty($v['base_id'])): ?>
			<?php $name .= ' on ' . $Translations->getText('taxrate', $v['base_id']); ?>
		<?php endif; ?>

		<?php if ($type == 1): ?>
			<div class="row infolist">
				<div class="col-6">
					<?php echo $name; ?>
				</div>
				<div class="col-3 text-end">
					<?php echo $value; ?>
				</div>
			</div>
		<?php elseif ($type == 2): ?>
			<div class="row infolist">
				<div class="col-10">
					<?php echo KrMethods::sprintf('COM_KNOWRES_CONTRACT_TAX_TYPE_INCLUDED', $name, $value); ?>
				</div>
			</div>
		<?php elseif ($type == 3): ?>
			<div class="row infolist">
				<div class="col-10">
					<?php echo KrMethods::sprintf('COM_KNOWRES_CONTRACT_TAX_TYPE_ARRIVAL', $name, $value); ?>
				</div>
			</div>
		<?php endif; ?>
	<?php endforeach; ?>
	<div class="row">
		<div class="col">
			<?php echo KrMethods::plain('COM_KNOWRES_CONTRACT_TAX_TOTAL_LBL'); ?>
		</div>
		<div class="col text-end">
			<?php echo Utility::displayValue($quote->tax_total, $quote->currency, $quote->decimals); ?>
		</div>
	</div>
	<hr>
<?php endif; ?>