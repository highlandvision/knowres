<?php
/**
 * @package     KR
 * @subpackage  Admin views
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Media;
use Joomla\CMS\HTML\HTMLHelper;

/** @var HighlandVision\Component\Knowres\Administrator\View\Region\HtmlView $this */

$wa = $this->document->getWebAssetManager();
$wa->useScript('keepalive')
   ->useScript('form.validate');
?>

<?php echo HTMLHelper::_('uitab.startTabSet', 'myTab',
	['active' => 'basics', 'recall' => true, 'breakpoint' => 768]); ?>
<?php echo HTMLHelper::_('uitab.addTab', 'myTab', KrMethods::plain('COM_KNOWRES_REGION'),
	KrMethods::plain('COM_KNOWRES_REGION')); ?>

	<form action="<?php echo KrMethods::route('index.php?option=com_knowres&layout=edit&id='
		. (int) $this->item->id); ?>"
	      aria-label="<?php echo $this->form_aria_label; ?>" class="form-validate" id="region-form" method="post"
	      name="adminForm">

		<div class="main-card">
			<div class="row">
				<div class="col-xl-9 col-xxl-8">
					<?php echo $this->form->renderFieldset('krdata'); ?>
				</div>
				<div class="col-xl-3 offset-xxl-1">
					<?php echo KrMethods::render('joomla.edit.global', $this); ?>
				</div>
			</div>
		</div>

		<input type="hidden" name="task" value="">
		<?php echo HTMLHelper::_('form.token'); ?>
	</form>
<?php echo HTMLHelper::_('uitab.endTab'); ?>

<?php if ($this->item->id): ?>
	<?php echo HTMLHelper::_('uitab.addTab', 'myTab', 'updfs', KrMethods::plain('COM_KNOWRES_UPLOAD_PDF')); ?>
	<h4><?php echo KrMethods::sprintf('COM_KNOWRES_PDF_UPLOAD', KrMethods::plain('COM_KNOWRES_REGION')); ?></h4>
	<br>
	<form action="<?php echo KrMethods::route('index.php?option=com_knowres&task=region.uploadpdf'); ?>"
	      method="post" class="row g-2" enctype="multipart/form-data" id="form-uploadpdf">
		<div class="col-auto">
			<label for="formFile" class="visually-hidden form-label">
				<?php echo KrMethods::plain('Upload'); ?>
			</label>
			<input class="form-control" type="file" size="50" name="uploadpdf">
		</div>
		<div class="col-auto">
			<button type="submit" class="btn btn-primary">
				<?php echo KrMethods::plain('COM_KNOWRES_UPLOAD_PDF'); ?>
			</button>
		</div>

		<input type="hidden" name="task" value="region.uploadpdf">
		<input type="hidden" name="id" value="<?php echo $this->item->id; ?>">
		<?php echo HTMLHelper::_('form.token'); ?>
	</form>
	<?php echo HTMLHelper::_('uitab.endTab'); ?>
<?php endif; ?>

<?php if (count($this->lines)): ?>
	<?php echo HTMLHelper::_('uitab.addTab', 'myTab', 'dpdfs', KrMethods::plain('COM_KNOWRES_DELETE_PDF')); ?>
	<?php $count = 0; ?>
	<h4><?php echo KrMethods::plain('COM_KNOWRES_PDF_DELETE'); ?></h4>
	<form action="<?php echo KrMethods::route('index.php?option=com_knowres&task=region.delpdf'); ?>"
	      id="form-delpdf" class="w-50" method="post">
		<?php foreach ($this->lines as $line): ?>
			<?php
			$filename = Media::getFileName($line) . '.' . Media::getFileExtension($line);
			$count++;
			$id = 'file' . $count;
			?>
			<div class="form-check" style="margin-bottom:5px;">
				<input class="form-check-input" type="checkbox" name="pdf[]" value="<?php echo $filename; ?>"
				       id="<?php echo $id; ?>"
				<label class="form-check-label" for="<?php echo $id; ?>">
					<?php echo $filename; ?>
				</label>
			</div>
		<?php endforeach; ?>
		<br>
		<button type="submit" class="btn btn-primary">
			<?php echo KrMethods::plain('COM_KNOWRES_DELETE'); ?>
		</button>
		<input type="hidden" name="task" value="region.delpdf">
		<input type="hidden" name="id" value="<?php echo $this->item->id; ?>">
		<?php echo HTMLHelper::_('form.token'); ?>
	</form>
	<?php echo HTMLHelper::_('uitab.endTab'); ?>
<?php endif; ?>

<?php echo HTMLHelper::_('uitab.endTabSet'); ?>