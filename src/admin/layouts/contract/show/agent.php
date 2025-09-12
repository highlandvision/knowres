<?php
/**
 * @package     Know Reservations
 * @subpackage  Admin Layout
 * @copyright   2021 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Utility;

extract($displayData);
/**
 * Layout variables
 *
 * @var false|object $contract    The contract item.
 * @var string       $foreign_key The service reference.
 */
?>

<div class="row">
	<div class="col-4">
		<?php echo KrMethods::plain('COM_KNOWRES_CONTRACTS_AGENT_ID'); ?>
	</div>
	<div class="col-8">
		<?php echo $contract->agent_name; ?>
	</div>
</div>

<?php if ($contract->agent_reference): ?>
	<div class="row">
		<div class="col-4">
			<?php echo KrMethods::plain('COM_KNOWRES_CONTRACTS_AGENT_REFERENCE'); ?>
		</div>
		<div class="col-8">
			<?php echo $contract->agent_reference; ?>
		</div>
	</div>
<?php endif; ?>

<?php if ($contract->agent_value): ?>
	<div class="row">
		<div class="col-4">
			<?php echo KrMethods::plain('COM_KNOWRES_CONTRACTS_AGENT_VALUE'); ?>
		</div>
		<div class="col-8">
			<?php echo Utility::displayValue($contract->agent_value, $contract->currency); ?>
		</div>
	</div>
<?php endif; ?>

<div class="row">
	<div class="col-4">
		<?php echo KrMethods::plain('COM_KNOWRES_CONTRACTS_AGENT_COMMISSION'); ?>
	</div>
	<div class="col-8">
		<?php echo Utility::displayValue($contract->agent_commission, $contract->currency); ?>
	</div>
</div>

<?php if (!empty($contract->service_id)): ?>
	<div class="row">
		<div class="col-4">
			<?php echo '----------'; ?>
		</div>
		<div class="col-8">
			<?php echo '----------'; ?>
		</div>
		<div class="col-4">
			<?php echo KrMethods::plain('COM_KNOWRES_CONTRACTS_SERVICE_ID'); ?>
		</div>
		<div class="col-8">
			<?php echo $contract->service_name; ?>
		</div>
	</div>
<?php endif; ?>

<?php if ($foreign_key): ?>
	<div class="row">
		<div class="col-4">
			<?php echo KrMethods::plain('COM_KNOWRES_CONTRACTS_SERVICE_REFERENCE'); ?>
		</div>
		<div class="col-8">
			<?php echo $foreign_key; ?>
		</div>
	</div>
<?php endif; ?>

<?php if ((float) $contract->channel_commission > 0): ?>
	<div class="row">
		<div class="col-4">
			<?php echo KrMethods::plain('COM_KNOWRES_CONTRACTS_CHANNEL_COMMISSION'); ?>
		</div>
		<div class="col-8">
			<?php echo Utility::displayValue($contract->channel_commission, $contract->currency); ?>
		</div>
	</div>
<?php endif; ?>
