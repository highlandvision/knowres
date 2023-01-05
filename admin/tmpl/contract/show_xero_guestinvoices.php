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

use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\TickTock;
use HighlandVision\KR\Utility;

?>

<div class="row-fluid strong">
	<div class="span3">
		<?php echo KrMethods::plain('COM_KNOWRES_CONTRACT_XERO_INVOICE_NUMBER'); ?>
	</div>
	<div class="span2">
		<?php echo KrMethods::plain('COM_KNOWRES_CONTRACT_XERO_INVOICE_DUEDATE'); ?>
	</div>
	<div class="span1">
		<?php echo KrMethods::plain('COM_KNOWRES_CONTRACT_XERO_INVOICE_STATUS'); ?>
	</div>
	<div class="span2 text-right">
		<?php echo KrMethods::plain('COM_KNOWRES_CONTRACT_XERO_INVOICE_TOTAL'); ?>
	</div>
	<div class="span2 text-right">
		<?php echo KrMethods::plain('COM_KNOWRES_CONTRACT_XERO_INVOICE_UNPAID'); ?>
	</div>
	<div class="span2 text-right">
		<?php echo KrMethods::plain('COM_KNOWRES_VIEW'); ?>
	</div>
</div>

<?php if (count($this->guestinvoices)): ?>
	<div class="row-fluid">
		<div class="span12 strong">
			<?php echo KrMethods::plain('COM_KNOWRES_CONTRACT_XERO_INVOICES'); ?>
		</div>
	</div>
	<?php foreach ($this->guestinvoices as $k => $i): ?>
		<div class="row-fluid">
			<div class="span3">
				<?php echo $k; ?>
			</div>
			<div class="span2">
				<?php echo TickTock::displayDate($i['duedate']); ?>
			</div>
			<div class="span1">
				<?php echo $i['status']; ?>
			</div>
			<div class="span2 text-right">
				<?php echo Utility::displayValue($i['total'], $this->item->currency); ?>
			</div>
			<div class="span2 text-right">
				<?php echo Utility::displayValue($i['amountDue'], $this->item->currency); ?>
			</div>
			<div class="span2 text-right">
				<?php if ($i['type'] == "ACCREC" && $i['status'] != "DRAFT"): ?>
					<?php $link = $this->payments->getInvoiceUrl($i['invoiceId']); ?>
					<?php echo '<a href="' . $link . '" target="_blank">' . KrMethods::plain('COM_KNOWRES_VIEW')
						. '</a>'; ?>
				<?php endif; ?>
			</div>
		</div>
	<?php endforeach; ?>
<?php endif; ?>
