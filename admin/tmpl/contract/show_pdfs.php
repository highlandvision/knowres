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

$lines = $this->contractDisplay->getContractPdfs();
?>

<?php if ($this->access_level > 10 || ($this->access_level == 10 && $this->params->get('show_upload'))): ?>
	<div class="card kr-card">
		<div class="card-header">
			<a class="showbefore collapsed" data-bs-toggle="collapse" href="#panel-collapse-pdfs"
			   role="button" aria-expanded="false"
			   aria-controls="panel-collapse-pdfs">
				<?php echo KrMethods::plain('COM_KNOWRES_CONTRACT_PDFS'); ?>
			</a>
		</div>
		<div class="collapse" id="panel-collapse-pdfs">
			<div class="card-body">
				<?php echo $this->loadTemplate('pdfs'); ?>
			</div>
		</div>
	</div>
<?php endif; ?>

<div class="row-fluid">
	<div class="span6">
		<h5><?php echo KrMethods::plain('COM_KNOWRES_UPLOAD_PDF'); ?></h5><br>
		<form enctype="multipart/form-data"
		      action="<?php echo KrMethods::route('index.php?option=com_knowres&task=contracts.uploadpdf'); ?>"
		      id="form-uploadpdf" method="post">
			<input type="file" size="50" name="uploadpdf">

			<br><br>
			<div>
				<button type="submit" class="btn btn-primary btn-small">Upload</button>
			</div>

			<input type="hidden" name="task" value="contracts.uploadpdf" />
			<input type="hidden" name="tag" value="<?php echo $this->item->tag; ?>" />
			<?php echo HTMLHelper::_('form.token'); ?>
		</form>
	</div>
	<div class="span6">
		<h5>Existing PDFs</h5><br>
		<form action="<?php echo KrMethods::route('index.php?option=com_knowres&task=contracts.delpdf'); ?>"
		      id="form-delpdf" method="post">
			<?php foreach ($lines as $line): ?>
				<?php $filename = Media::getFileName($line) . '.' . Media::getFileExtension($line); ?>
				<label class="checkbox">
					<input type="checkbox" name="pdf[]" value="<?php echo $filename; ?>">
					<?php echo $filename; ?>
				</label>
			<?php endforeach; ?>

			<div>
				<br>
				<button type="submit" class="btn btn-primary btn-small">Delete Selected</button>
			</div>

			<input type="hidden" name="task" value="contracts.delpdf" />
			<input type="hidden" name="tag" value="<?php echo $this->item->tag; ?>" />
			<?php echo HTMLHelper::_('form.token'); ?>
		</form>
	</div>
</div>