<?php
/**
 * @package     KR
 * @subpackage  <Enter sub package>
 * @copyright   Copyright (C) 2021 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */
/** @noinspection PhpUnhandledExceptionInspection */

use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\TickTock;
use HighlandVision\KR\Utility;
use Joomla\CMS\Object\CMSObject;

extract($displayData);
/**
 * Layout variables
 *
 * @var CMSObject $contract The contract item.
 * @var mixed     $fees     Contract fees.
 * @var mixed     $payments Contract payments
 * @var float     $balance  Outstanding balance
 */

$balance_amount = Utility::roundValue($contract->contract_total - $contract->deposit, $contract->currency);
?>

<?php if ($contract->deposit > 0): ?>
	<div class="row">
		<div class="col-3">
			<?php if ($balance_amount > 0): ?>
				<?php echo KrMethods::plain('COM_KNOWRES_DEPOSIT'); ?>
			<?php else: ?>
				<?php echo KrMethods::plain('COM_KNOWRES_FULL_PAYMENT'); ?>
			<?php endif; ?>
		</div>
		<div class="col-6">
			<?php if ($contract->booking_status == 1): ?>
				<?php echo KrMethods::plain('COM_KNOWRES_DUE_NOW'); ?>
			<?php endif; ?>
		</div>
		<div class="col-3 text-end">
			<?php echo Utility::displayValue($contract->deposit, $contract->currency); ?>
		</div>
	</div>
<?php elseif ($contract->agent_id > 0): ?>
	<div class="row">
		<div class="col-4">
			<?php echo KrMethods::sprintf('COM_KNOWRES_DEPOSIT_PAID_AGENT', $contract->agent->name); ?>
		</div>
	</div>
<?php endif; ?>

<?php if ($balance_amount > 0): ?>
	<?php
	$due = '';
	if (!$contract->balance_days)
	{
		$due = KrMethods::plain('COM_KNOWRES_BALANCE_ARRIVAL');
	}
	else if ($contract->balance_date > TickTock::getDate())
	{
		$due = KrMethods::sprintf('COM_KNOWRES_DUE_BY', TickTock::displayDate($contract->balance_date));
	}
	else if ($contract->balance_date <= TickTock::getDate())
	{
		$due = KrMethods::plain('COM_KNOWRES_DUE_NOW');
	}
	?>

	<div class="row">
		<div class="col-3">
			<?php echo KrMethods::plain('COM_KNOWRES_BALANCE'); ?>
		</div>
		<div class="col-6">
			<?php echo $due; ?>
		</div>
		<div class="col-3 text-end">
			<?php echo Utility::displayValue($balance_amount, $contract->currency); ?>
		</div>
	</div>
<?php endif; ?>