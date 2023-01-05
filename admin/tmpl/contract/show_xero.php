<?php
/**
 * @package     KR
 * @subpackage  Admin views
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */
/** @noinspection PhpUnhandledExceptionInspection */

use HighlandVision\KR\Framework\KrMethods;
use Xero\API\XeroInterface\Payments;

defined('_JEXEC') or die;

$this->payments = new Payments($this->xero);
$result         = $this->payments->getInvoices($this->item);

if ($result)
{
	$this->guestinvoices = $result[0];
	$this->creditnotes   = $result[1];
	$this->ownerinvoices = $result[2];
}
?>

<div class="modal-header">
	<h3><?php echo KrMethods::plain('COM_KNOWRES_CONTRACT_XERO_ACCOUNTS'); ?></h3>
</div>

<div class="modal-body">
	<div class="row">
		<div class="col">
			<?php if (!$result): ?><?php echo KrMethods::plain('COM_KNOWRES_ERROR_FATAL'); ?><?php elseif (!count($this->guestinvoices)
				&& !count($this->creditnotes)
				&& !count($this->ownerinvoices)): ?><?php echo KrMethods::plain('COM_KNOWRES_CONTRACT_XERO_INVOICE_NONE'); ?><?php else: ?><?php echo $this->loadTemplate('guestinvoices'); ?><?php echo $this->loadTemplate('creditnotes'); ?><?php echo $this->loadTemplate('ownerinvoices'); ?><?php endif; ?>
		</div>
	</div>
</div>