<?php
/**
 * @package     Know Reservations
 * @subpackage  Site Layout
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */
/** @noinspection PhpUnhandledExceptionInspection */

use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\TickTock;
use HighlandVision\KR\Utility;
use Joomla\CMS\Object\CMSObject;

defined('_JEXEC') or die;

extract($displayData);
/**
 * Layout variables
 *
 * @var CMSObject $contract Contract data.
 * @var CMSObject $guest    Guest data.
 * @var CMSObject $property Property data.
 * @var CMSObject $agency   Agency data.
 */
?>

<table style="width:100%;border:none;">
	<tr style="padding:5px;">
		<td style="vertical-align:top;">
			<div>
				<strong><?php echo KrMethods::plain('COM_KNOWRES_PDF_INVOICE_FROM'); ?></strong>
				<?php echo $agency->name; ?><br>
				<?php echo $agency->street; ?><br>
				<?php echo $agency->town; ?><br>
				<?php echo $agency->region_name . ' ' . $agency->postcode; ?><br>
				<?php echo $agency->country_name; ?><br>
				<?php echo KrMethods::sprintf('COM_KNOWRES_PDF_INVOICE_TELEPHONE', $agency->telephone); ?>
				<br>
				<?php echo KrMethods::sprintf('COM_KNOWRES_PDF_INVOICE_EMAIL', $contract->agency_email); ?>
			</div>

			<div>
				<strong><?php echo KrMethods::plain('COM_KNOWRES_PDF_INVOICE_BOOKING_INFORMATION'); ?></strong><br>
				<?php echo KrMethods::sprintf('COM_KNOWRES_PDF_INVOICE_REFERENCE', $contract->tag); ?><br>
				<?php echo KrMethods::sprintf('COM_KNOWRES_PDF_INVOICE_PROPERTY',
					$contract->property_name); ?>
				<br>
				<?php echo $property->property_street; ?><br>
				<?php echo $property->town_name . ' ' . $property->property_postcode; ?><br>
				<?php echo $property->region_name; ?><br>
				<?php echo $property->country_name; ?>
			</div>
		</td>
		<td>
			<div>
				<strong><?php echo KrMethods::plain('COM_KNOWRES_PDF_INVOICE_TO'); ?></strong>
				<?php echo $guest->firstname . ' ' . $guest->surname; ?><br>
				<?php echo Utility::formatAddress($guest->address1, $guest->address2,
					$guest->postcode, $guest->town, $guest->region_name, $guest->country_name,
					'<br>'); ?>
				<br>
				<?php echo KrMethods::sprintf('COM_KNOWRES_PDF_INVOICE_TELEPHONE',
					Utility::formatPhoneNumber($guest->mobile, $guest->mobile_country_id)); ?>
				<br>
				<?php echo KrMethods::sprintf('COM_KNOWRES_PDF_INVOICE_EMAIL', $guest->email); ?><br>
			</div>

			<div>
				<?php echo KrMethods::sprintf('COM_KNOWRES_PDF_INVOICE_ARRIVAL',
					TickTock::displayDate($contract->arrival)); ?><br>
				<?php echo KrMethods::sprintf('COM_KNOWRES_PDF_INVOICE_DEPARTURE',
					TickTock::displayDate($contract->departure)); ?><br>
				<?php echo KrMethods::sprintf('COM_KNOWRES_PDF_INVOICE_NIGHTS',
					TickTock::differenceDays($contract->arrival, $contract->departure)); ?><br>
				<?php echo KrMethods::sprintf('COM_KNOWRES_PDF_INVOICE_GUESTS', $contract->guests); ?><br>
				<?php if ((float) $property->security_amount > 0) : ?>
					<?php echo KrMethods::sprintf('COM_KNOWRES_PDF_INVOICE_SECURITY_DEPOSIT',
						Utility::displayValue($property->security_amount, $contract->currency)); ?>
				<?php endif; ?>
			</div>
		</td>
	</tr>
</table>