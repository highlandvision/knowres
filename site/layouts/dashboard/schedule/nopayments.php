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
	<div class="row summary">
		<div class="small-3 columns">
			<?php if ($balance_amount > 0): ?>
				<?php echo KrMethods::plain('COM_KNOWRES_DEPOSIT'); ?>
			<?php else: ?>
				<?php echo KrMethods::plain('COM_KNOWRES_FULL_PAYMENT'); ?>
			<?php endif; ?>
		</div>
		<div class="small-6 columns">
			<?php if ($contract->booking_status == 1): ?>
				<?php echo KrMethods::plain('COM_KNOWRES_DUE_NOW'); ?>
			<?php endif; ?>
		</div>
		<div class="small-3 columns text-right">
			<?php echo Utility::displayValue($contract->deposit, $contract->currency); ?>
		</div>
	</div>
<?php elseif ($contract->agent_id > 0): ?>
	<div class="row summary">
		<div class="small-4 columns">
			<?php echo KrMethods::sprintf('COM_KNOWRES_DEPOSIT_PAID_AGENT', $contract->agent->name); ?>
		</div>
	</div>
<?php endif; ?>

<?php if ($balance_amount > 0): ?>
	<?php
	$due = '';
	if (!$contract->balance_days)
	{
		$due = KrMethods::plain('COM_KNOWRES_PAYABLE_ON_ARRIVAL');
	}
	else if ($contract->balance_date > TickTock::getDate() && $contract->booking_status <= 10)
	{
		$due = KrMethods::sprintf('COM_KNOWRES_DUE_BY', TickTock::displayDate($contract->balance_date));
	}
	else if ($contract->balance_date <= date('Y-m-d'))
	{
		$due = KrMethods::plain('COM_KNOWRES_DUE_NOW');
	}
	?>

	<div class="row summary">
		<div class="small-3 columns">
			<?php echo KrMethods::plain('COM_KNOWRES_BALANCE'); ?>
		</div>
		<div class="small-6 columns">
			<?php echo $due; ?>
		</div>
		<div class="small-3 columns text-right">
			<?php echo Utility::displayValue($balance_amount, $contract->currency); ?>
		</div>
	</div>
<?php endif; ?>