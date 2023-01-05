<?php
/**
 * @package     Know Reservations
 * @subpackage  Site Layout
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */
/** @noinspection PhpUnhandledExceptionInspection */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\TickTock;
use Joomla\CMS\Object\CMSObject;

extract($displayData);
/**
 * Layout variables
 *
 * @var CMSObject $contract Contract Item.
 * @var CMSObject $agency   Agency Item.
 */
?>

<table style="padding:3px 5px;width:100%;border:none;background-color:#d3f0f3;">
	<tr>
		<td>
			<?php echo KrMethods::plain('COM_KNOWRES_PDF_INVOICE_NUMBER'); ?>
		</td>
		<td style="text-align:right;">
			<?php echo $contract->id . '-' . $contract->tag; ?>
		</td>
	</tr>
	<tr>
		<td>
			<?php echo KrMethods::plain('COM_KNOWRES_PDF_INVOICE_ISSUE_DATE'); ?>
		</td>
		<td style="text-align:right;">
			<?php echo TickTock::displayDate($contract->created_at); ?>
		</td>
	</tr>
	<tr>
		<td>
			<?php echo KrMethods::plain('COM_KNOWRES_PDF_INVOICE_DUE_DATE'); ?>
		</td>
		<td style="text-align:right;">
			<?php echo TickTock::displayDate($contract->arrival); ?>
		</td>
	</tr>
	<?php if ($agency->tax_code) : ?>
		<tr>
			<td>
				<?php echo KrMethods::plain('COM_KNOWRES_PDF_INVOICE_TAX_CODE'); ?>
			</td>
			<td style="text-align:right;">
				<?php echo $agency->tax_code; ?>
			</td>
		</tr>
	<?php endif; ?>
	<?php if ($agency->company_number) : ?>
		<tr>
			<td>
				<?php echo KrMethods::plain('COM_KNOWRES_PDF_INVOICE_COMPANY_NUMBER'); ?>
			</td>
			<td style="text-align:right;">
				<?php echo $agency->company_number; ?>
			</td>
		</tr>
	<?php endif; ?>
</table>