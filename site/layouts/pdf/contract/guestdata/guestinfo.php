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

use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\TickTock;
use HighlandVision\KR\Translations;
use HighlandVision\KR\Utility;
use Joomla\CMS\Object\CMSObject;

extract($displayData);
/**
 * Layout variables
 *
 * @var CMSObject $guestinfo Guest info.
 */

if (is_array($guestinfo))
{
	$guestinfo = Utility::arrayToObject($guestinfo);
}

$params = KrMethods::getParams();
$count  = 0;
?>

<table style="width:100%;border:none;border-collapse:collapse;">
	<tr style="font-size:92%;color:#999;">
		<td>
			<?php echo KrMethods::plain('COM_KNOWRES_NAME'); ?>
		</td>
		<td>
			<?php if ($params->get('guestdata_age', 0)) : ?>
				<?php echo KrMethods::plain('COM_KNOWRES_CONTRACTGUESTDATAFORM_DOB_LBL'); ?>
			<?php endif; ?>
		</td>
		<td>
			<?php if ($params->get('guestdata_sex', 0)) : ?>
				<?php echo KrMethods::plain('COM_KNOWRES_CONTRACTGUESTDATAFORM_SEX_LBL'); ?>
			<?php endif; ?>
		</td>
		<td></td>
	</tr>
	<?php if ($params->get('guestdata_document', 0)) : ?>
		<tr style="font-size:92%;color:#999;">
			<td>
				<?php echo KrMethods::plain('COM_KNOWRES_CONTRACTGUESTDATAFORM_DOCUMENT_TYPE_LBL'); ?>
			</td>
			<td>
				<?php echo KrMethods::plain('COM_KNOWRES_CONTRACTGUESTDATAFORM_DOCUMENT_NUMBER_LBL'); ?>
			</td>
			<td>
				<?php echo KrMethods::plain('COM_KNOWRES_CONTRACTGUESTDATAFORM_DOCUMENT_COUNTRY_LBL'); ?>
			</td>
			<td>
				<?php echo KrMethods::plain('COM_KNOWRES_CONTRACTGUESTDATAFORM_DOCUMENT_DOI_LBL'); ?>
			</td>
		</tr>
	<?php endif; ?>

	<?php foreach ($guestinfo as $g) : ?>
		<?php if (!$g->name): ?>
			<?php continue; ?>
		<?php endif; ?>
		<tr style="font-size:92%;color:#999;">
			<td colspan="4" height="5">-----------------------------</td>
		</tr>
		<tr>
			<td>
				<?php echo $g->name . ' ' . $g->surname1 . ' ' . $g->surname2; ?>
			</td>
			<td>
				<?php if ($params->get('guestdata_age', 0)): ?>
					<?php echo TickTock::displayDate($g->dob); ?>
				<?php endif; ?>
			</td>
			<td>
				<?php if ($params->get('guestdata_sex', 0)): ?>
					<?php echo KrFactory::getAdminModel('contractguestdata')::getSex($g->sex); ?>
				<?php endif; ?>
			</td>
			<td></td>
		</tr>
		<?php if ($params->get('guestdata_document', 0) && $g->document_nat) : ?>
			<tr>
				<td>
					<?php if ($g->document_type): ?>
						<?php echo KrFactory::getAdminModel('contractguestdata')->getDocumentType($g->document_type); ?>
					<?php endif; ?>
				</td>
				<td>
					<?php if ($g->document_id): ?>
						<?php echo $g->document_id; ?>
					<?php endif; ?>
				</td>
				<td>
					<?php echo Translations::getCountryName($g->document_nat); ?>
				</td>
				<td>
					<?php if ($g->document_issue): ?>
						<?php echo TickTock::displayDate($g->document_issue); ?>
					<?php endif; ?>
				</td>
			</tr>
		<?php endif; ?>
		<?php $count++; ?>
	<?php endforeach; ?>
</table>