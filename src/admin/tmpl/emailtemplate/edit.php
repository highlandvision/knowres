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
use Joomla\CMS\HTML\HTMLHelper;

/** @var HighlandVision\Component\Knowres\Administrator\View\Emailtemplate\HtmlView $this */

$wa = $this->document->getWebAssetManager();
$wa->useScript('keepalive')
   ->useScript('form.validate')
   ->useScript('com_knowres.admin-emails');
?>

<form action="<?php echo KrMethods::route('index.php?option=com_knowres&layout=edit&id=' . (int) $this->item->id); ?>"
      aria-label="<?php echo $this->form_aria_label; ?>" class="form-validate" id="emailtemplate-form" method="post"
      name="adminForm">

	<div class="main-card">
		<div class="row">
			<div class="col-xl-6">
				<fieldset name="krdata">
					<?php echo $this->form->renderFieldset('krdata'); ?>
				</fieldset>
			</div>
			<div class="col-xl-6">
				<fieldset name="krcustom">
					<h5><?php echo KrMethods::plain('COM_KNOWRES_EMAILTEMPLATE_INSTRUCTIONS'); ?></h5>

					<div class="control-group">
						<div class="control-label"><?php echo $this->form->getLabel('switch'); ?></div>
						<div class="controls"><?php echo $this->form->getInput('switch'); ?></div>
					</div>

					<?php if (count($this->reservation_tags)): ?>
						<div id="reservation" class="tags">
							<h3><?php echo KrMethods::plain('COM_KNOWRES_EMAILTEMPLATE_CONTRACT'); ?></h3>
							<?php foreach ($this->reservation_tags as $tag => $text): ?>
								<div class="row">
									<div class="col-lg-8">
										<?php echo $text; ?>
									</div>
									<div class="col-lg-4">
										[<?php echo $tag; ?>]
									</div>
								</div>
							<?php endforeach; ?>
						</div>
					<?php endif; ?>

					<?php if (count($this->request_tags)): ?>
						<div id="request" class="tags hideme">
							<h3><?php echo KrMethods::plain('COM_KNOWRES_EMAILTEMPLATE_REQUEST'); ?></h3>
							<?php foreach ($this->request_tags as $tag => $text): ?>
								<div class="row">
									<div class="col-lg-8">
										<?php echo $text; ?>
									</div>
									<div class="col-lg-4">
										[<?php echo $tag; ?>]
									</div>
								</div>
							<?php endforeach; ?>
						</div>
					<?php endif; ?>

					<?php if (count($this->registration_tags)): ?>
						<div id="registration" class="tags hideme">
							<h3><?php echo KrMethods::plain('COM_KNOWRES_EMAILTEMPLATE_REGISTRATION'); ?></h3>
							<?php foreach ($this->registration_tags as $tag => $text): ?>
								<div class="row">
									<div class="col-lg-8">
										<?php echo $text; ?>
									</div>
									<div class="col-lg-4">
										[<?php echo $tag; ?>]
									</div>
								</div>
							<?php endforeach; ?>
						</div>
					<?php endif; ?>
				</fieldset>
			</div>
		</div>

		<input type="hidden" name="task" value="">
		<?php echo HTMLHelper::_('form.token'); ?>
	</div>
</form>