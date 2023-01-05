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
use Joomla\CMS\Object\CMSObject;

extract($displayData);
/**
 * Layout variables
 *
 * @var CMSObject $contract  Contract data.
 * @var CMSObject $guest     Guest data.
 * @var CMSObject $property  Property data.
 * @var CMSObject $agency    Agency data.
 * @var array     $fees      Contract fees.
 * @var array     $payments  Contract payments.
 * @var bool      $dashboard True for dashbaord request.
 */
?>

<table style="width:100%;border:none;border-collapse:collapse;">
	<tr>
		<td>
			<?php echo KrMethods::render('pdf.contract.invoice.header',
				['contract' => $contract, 'guest' => $guest, 'property' => $property, 'agency' => $agency]); ?>
			<br><br>

			<?php echo KrMethods::render('pdf.contract.invoice.detail',
				['contract' => $contract, 'agency' => $agency]); ?>

			<br><br>

			<table
				style="padding:5px;width:100%;border:1px solid #666;border-collapse:collapse;background-color:#d3f0f3;">
				<tr>
					<td colspan="2">
						<?php echo KrMethods::plain('COM_KNOWRES_PDF_INVOICE_DSC'); ?>
					</td>
					<td style="text-align:right;">
						<?php echo KrMethods::plain('COM_KNOWRES_PDF_INVOICE_TOTAL'); ?>
					</td>
				</tr>
				<tr>
					<td colspan="3" style="background-color:#fefefe;">
						<?php echo KrMethods::render('pdf.contract.invoice.summary',
							['contract' => $contract, 'fees' => $fees, 'payments' => $payments]); ?>
					</td>
				</tr>
			</table>

			<?php if (!$dashboard): ?>
				<br><br><br>
				<?php echo KrMethods::render('pdf.contract.invoice.signatures',
					['contract' => $contract]); ?>
			<?php endif; ?>
		</td>
	</tr>
</table>