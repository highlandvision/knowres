<?php
/**
 * @package     Know Reservations
 * @subpackage  Site Layout
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

use HighlandVision\KR\Framework\KrMethods;
use Joomla\CMS\Object\CMSObject;

defined('_JEXEC') or die;

extract($displayData);
/**
 * Layout variables
 *
 * @var CMSObject $contract Contract Item.
 */

?>

<table style="width:100%;border:none;">
	<tr>
		<td style="width:40%;"><?php echo KrMethods::plain('COM_KNOWRES_PDF_INVOICE_GUEST_AUTHORISATION'); ?></td>
		<td style="width:10%;">&nbsp;</td>
		<td style="width:50%;"><?php echo KrMethods::plain('COM_KNOWRES_PDF_INVOICE_PAYMENTS_RECEIVED'); ?></td>
	</tr>
	<tr>
		<td style="font-size:x-small;">
			<?php echo KrMethods::plain('COM_KNOWRES_PDF_INVOICE_DAMAGES'); ?>
			<br>
		</td>
		<td style="font-size:x-small;">&nbsp;</td>
		<td style="font-size:x-small;">
			<?php echo KrMethods::sprintf('COM_KNOWRES_PDF_INVOICE_PAID', $contract->agency_name); ?>
		</td>
	</tr>
	<tr>
		<td style="width:40%;"><?php echo KrMethods::plain('COM_KNOWRES_PDF_INVOICE_DATE'); ?></td>
		<td style="width:10%;">&nbsp;</td>
		<td style="width:50%;"><?php echo KrMethods::plain('COM_KNOWRES_PDF_INVOICE_MANAGER'); ?></td>
	</tr>
	<tr>
		<td style="border-top:1px solid #999999;"></td>
		<td>&nbsp;</td>
		<td style="border-top:1px solid #999999;"></td>
	</tr>
	<tr>
		<td colspan="3" style="height:20px;">&nbsp;</td>
	</tr>
	<tr>
		<td><?php echo KrMethods::plain('COM_KNOWRES_PDF_INVOICE_SIGNATURE'); ?></td>
		<td>&nbsp;</td>
		<td><?php echo KrMethods::plain('COM_KNOWRES_PDF_INVOICE_SIGNATURE'); ?></td>
	</tr>
	<tr>
		<td style="border-top:1px solid #999999;"></td>
		<td>&nbsp;</td>
		<td style="border-top:1px solid #999999;"></td>
	</tr>
</table>