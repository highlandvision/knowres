<?php
/**
 * @package     KR
 * @subpackage  Admin Layouts
 * @copyright   Copyright (C) 2021 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Utility;

extract($displayData);
/**
 * Layout variables
 *
 * @var false|object $contract The contract item.
 */
?>
<?php foreach ($contract->adjustments as $k => $v): ?>
	<div class="row">
		<div class="col">
			<?php echo ucfirst($k) . ' (' . $v['calc'] . ')'; ?>
		</div>
		<div class="col aligner text-end">
			<?php echo Utility::displayValue($v['value'], $contract->currency); ?>
		</div>
	</div>
<?php endforeach; ?>

<?php foreach ($contract->discounts as $k => $v): ?>
	<div class="row">
		<div class="col">
			<?php echo ucfirst($k) . ' (' . $v['calc'] . ')'; ?>
		</div>
		<div class="col aligner text-end">
			<?php echo Utility::displayValue($v['value'], $contract->currency); ?>
		</div>
	</div>
<?php endforeach; ?>

<?php if ($contract->discount_system > 0 || $contract->deposit_system > 0
	|| $contract->net_price_system > 0): ?>

	<?php if ($contract->discount_system > 0): ?>
		<div class="row">
			<div class="col">
				<?php echo KrMethods::plain('COM_KNOWRES_CONTRACTS_DISCOUNT'); ?>
			</div>
			<div class="col aligner text-end">
				<?php echo Utility::displayValue($contract->discount_system, $contract->currency); ?>
			</div>
		</div>
	<?php endif; ?>

	<?php if ($contract->deposit_system > 0 && $contract->deposit_system <> $contract->deposit): ?>
		<div class="row">
			<div class="col">
				<?php echo KrMethods::plain('COM_KNOWRES_CONTRACTS_DEPOSIT'); ?>
			</div>
			<div class="col aligner text-end">
				<?php echo Utility::displayValue($contract->deposit_system, $contract->currency); ?>
			</div>
		</div>
	<?php endif; ?>

	<?php if ($contract->net_price_system > 0 && $contract->net_price_system <> $contract->net_price): ?>
		<div class="row">
			<div class="col">
				<?php echo KrMethods::plain('COM_KNOWRES_CONTRACTS_NET_PRICE'); ?>
			</div>
			<div class="col aligner text-end">
				<?php echo Utility::displayValue($contract->net_price_system, $contract->currency); ?>
			</div>
		</div>
	<?php endif; ?>
<?php endif; ?>