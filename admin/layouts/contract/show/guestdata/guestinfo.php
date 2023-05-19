<?php
/**
 * @package    Know Reservations
 * @subpackage Admin Layout
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

/** @noinspection PhpUnhandledExceptionInspection */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\TickTock;
use HighlandVision\KR\Translations;

extract($displayData);
/**
 * Layout variables
 *
 * @var false|object $guestdata Guestdata row.
 */

$params    = KrMethods::getParams();
$guestinfo = $guestdata->guestinfo;
$count     = 1;
?>

	<div class="row mt-2">
		<div class="col-4 fw500">
			<small><?php echo KrMethods::plain('COM_KNOWRES_NAME'); ?></small>
		</div>

		<?php if ($params->get('guestdata_age', 0)): ?>
			<div class="col-4 fw500">
				<small>
					<?php echo KrMethods::plain('COM_KNOWRES_CONTRACTGUESTDATA_DOB_LBL'); ?>
				</small>
			</div>
		<?php endif; ?>

		<?php if ($params->get('guestdata_sex', 0)): ?>
			<div class="col-4 fw500">
				<small>
					<?php echo KrMethods::plain('COM_KNOWRES_CONTRACTGUESTDATA_SEX_LBL'); ?>
				</small>
			</div>
		<?php endif; ?>
	</div>

<?php if ($params->get('guestdata_document', 0)) : ?>
	<div class="row">
		<div class="col-4 fw500">
			<small>
				<?php echo KrMethods::plain('COM_KNOWRES_CONTRACTGUESTDATA_DOCUMENT_COUNTRY_LBL'); ?>
			</small>
		</div>
		<div class="col-4 fw500">
			<small>
				<?php echo KrMethods::plain('COM_KNOWRES_CONTRACTGUESTDATA_DOCUMENT_LBL'); ?>
			</small>
		</div>
		<div class="col-4 fw500">
			<small>
				<?php echo KrMethods::plain('COM_KNOWRES_CONTRACTGUESTDATA_DOCUMENT_DOI_LBL') . '/'
				           . KrMethods::plain('COM_KNOWRES_CONTRACTGUESTDATA_DOCUMENT_DOE_LBL'); ?>
			</small>
		</div>
	</div>
<?php endif; ?>

	<hr style="margin: 5px 0;">

<?php foreach ($guestinfo as $g) : ?>
	<?php if (!$g->name): ?>
		<?php continue; ?>
	<?php endif; ?>

	<div class="row">
		<div class="col-4">
			<?php echo $g->name . ' ' . $g->surname1 . ' ' . $g->surname2; ?>
		</div>

		<?php if ($params->get('guestdata_age', 0)): ?>
			<div class="col-4">
				<?php echo TickTock::displayDate($g->dob, 'd-M-Y'); ?>
			</div>
		<?php endif; ?>

		<?php if ($params->get('guestdata_sex', 0)): ?>
			<div class="col-4">
				<?php echo KrFactory::getAdminModel('contractguestdata')::getSex($g->sex); ?>
			</div>
		<?php endif; ?>
	</div>

	<?php if ($params->get('guestdata_document', 0) && $g->document_id) : ?>
		<div class="row">
			<div class="col-4">
				<?php if ($g->document_nat): ?>
					<?php echo Translations::getCountryName($g->document_nat); ?>
				<?php endif; ?>
			</div>
			<div class="col-4">
				<span class="icon-info-circle" aria-hidden="true" tabindex="0"></span>
				<div role="tooltip" id="<?php echo 'tip-' . $count; ?>">
					<?php echo KrFactory::getAdminModel('contractguestdata')::getDocumentType($g->document_type); ?>
				</div>
				<?php echo $g->document_id; ?>
			</div>
			<div class="col-4">
				<?php if ($g->document_issue): ?>
					<?php echo TickTock::displayDate($g->document_issue, 'M-Y'); ?>
				<?php endif; ?>
				<?php if ($g->document_expiry): ?>
					<?php echo ' / ' . TickTock::displayDate($g->document_expiry, 'M-Y'); ?>
				<?php endif; ?>
			</div>
		</div>
	<?php endif; ?>
	<?php echo '<hr style="margin:5px 0;">'; ?>
	<?php $count++; ?>
<?php endforeach; ?>