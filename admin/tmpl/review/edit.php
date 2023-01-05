<?php
/**
 * @package     KR
 * @subpackage  Admin views
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */
/** @noinspection PhpUnhandledExceptionInspection */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;
use Joomla\CMS\HTML\HTMLHelper;

/** @var HighlandVision\Component\Knowres\Administrator\View\Review\HtmlView $this */

$wa = $this->document->getWebAssetManager();
$wa->useScript('keepalive')
   ->useScript('form.validate');
?>

<form action="<?php echo KrMethods::route('index.php?option=com_knowres&layout=edit&id=' . (int) $this->item->id); ?>"
      aria-label="<?php echo $this->form_aria_label; ?>" class="form-validate" id="review-form" method="post"
      name="adminForm">

	<div class="main-card">
		<div class="row">
			<div class="col-xl-9 col-xxl-8">
				<div class="row">
					<div class="col">
						<?php echo $this->form->renderField('contract_id'); ?>
					</div>
					<div class="col">
						<?php echo $this->form->renderField('review_date'); ?>
					</div>
				</div>

				<?php echo $this->form->renderField('title'); ?>
				<?php echo $this->form->renderField('review'); ?>

				<div class="row">
					<div class="col">
						<?php echo $this->form->renderField('guest_name'); ?>
					</div>
					<div class="col">
						<?php echo $this->form->renderField('guest_location'); ?>
					</div>
				</div>

				<div class="row">
					<div class="col">
						<?php echo $this->form->renderField('rating'); ?>
					</div>
					<div class="col">
						<?php echo $this->form->renderField('held'); ?>
					</div>
					<div class="col">
						<?php echo $this->form->renderField('approved'); ?>
					</div>
				</div>

				<?php if ($this->params->get('review_ratings')) : ?>
					<?php $this->form->setFieldAttribute('rating1', 'label', $this->params->get('review_rating1')); ?>
					<?php $this->form->setFieldAttribute('rating2', 'label', $this->params->get('review_rating2')); ?>
					<?php $this->form->setFieldAttribute('rating3', 'label', $this->params->get('review_rating3')); ?>
					<?php $this->form->setFieldAttribute('rating4', 'label', $this->params->get('review_rating4')); ?>
					<?php $this->form->setFieldAttribute('rating5', 'label', $this->params->get('review_rating5')); ?>
					<?php $this->form->setFieldAttribute('rating6', 'label', $this->params->get('review_rating6')); ?>

					<div class="row">
						<div class="col">
							<?php echo $this->form->renderField('rating1'); ?>
						</div>
						<div class="col">
							<?php echo $this->form->renderField('rating2'); ?>
						</div>
						<div class="col">
							<?php echo $this->form->renderField('rating3'); ?>
						</div>
					</div>
					<div class="row">
						<div class="col">
							<?php echo $this->form->renderField('rating4'); ?>
						</div>
						<div class="col">
							<?php echo $this->form->renderField('rating5'); ?>
						</div>
						<div class="col">
							<?php echo $this->form->renderField('rating6'); ?>
						</div>
					</div>
				<?php else : ?>
					<input type="hidden" name="jform[rating1]" value="<?php echo $this->item->rating1; ?>" />
					<input type="hidden" name="jform[rating2]" value="<?php echo $this->item->rating2; ?>" />
					<input type="hidden" name="jform[rating3]" value="<?php echo $this->item->rating3; ?>" />
					<input type="hidden" name="jform[rating4]" value="<?php echo $this->item->rating4; ?>" />
					<input type="hidden" name="jform[rating5]" value="<?php echo $this->item->rating5; ?>" />
					<input type="hidden" name="jform[rating6]" value="<?php echo $this->item->rating6; ?>" />
				<?php endif; ?>
			</div>
			<div class="col-xl-3 offset-xxl-1">
				<?php echo KrMethods::render('joomla.edit.global', $this); ?>
			</div>
		</div>
	</div>

	<input type="hidden" name="task" value="">
	<?php echo HTMLHelper::_('form.token'); ?>
</form>