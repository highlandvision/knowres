<?php
/**
 * @package    Know Reservations
 * @subpackage Site TemplateEmail
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */
/** @noinspection PhpUnhandledExceptionInspection */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\TickTock;
use Joomla\CMS\HTML\HTMLHelper;

$wa = $this->document->getWebAssetManager();
$wa->useScript('com_knowres.site')
   ->useScript('form.validate')
   ->useScript('keepalive');
?>

<div class="narrower">
	<div class="row">
		<div class="small-12 medium-12 columns">
			<h1><?php echo KrMethods::sprintf('COM_KNOWRES_TITLE_REVIEW_REQUEST', $this->contract->property_name); ?></h1>
		</div>
	</div>

	<div class="row">
		<div class="small-12 medium-10 columns">
			<form action="<?php echo KrMethods::route('index.php?option=com_knowres&task=reviewform.save'); ?>"
			      id="kr-form-review" method="post" class="formbg form-validate">
				<fieldset class="fieldset">
					<div class="callout">
						<div class="row">
							<div class="small-12 columns">
								<h4>
									<?php echo KrMethods::sprintf('COM_KNOWRES_HELLO',
										ucfirst($this->contract->guest_firstname)
										. ' ' . ucfirst($this->contract->guest_surname)); ?>
								</h4>
							</div>
						</div>
						<?php if ($this->params->get('review_instructions')): ?>
							<div class="row">
								<div class="small-12 columns">
									<p><?php echo nl2br($this->params->get('review_instructions')); ?></p>
								</div>
							</div>
						<?php endif; ?>
					</div>
				</fieldset>

				<?php if ($this->params->get('review_text')): ?>
					<fieldset class="fieldset">
						<div class="callout">
							<legend><?php echo KrMethods::plain('COM_KNOWRES_YOUR_REVIEW'); ?></legend>
							<div class="row">
								<?php $this->form->setFieldAttribute('guest_name', 'required', true); ?>
								<?php $this->form->setFieldAttribute('guest_location', 'required', true); ?>
								<div class="small-12 medium-6 columns end">
									<?php echo $this->form->getLabel('guest_name'); ?>
									<?php echo $this->form->getInput('guest_name'); ?>
								</div>
								<div class="small-12 medium-6 columns">
									<?php echo $this->form->getLabel('guest_location'); ?>
									<?php echo $this->form->getInput('guest_location'); ?>
								</div>
							</div>

							<?php if ($this->params->get('review_title')): ?>
								<div class="row">
									<?php $this->form->setFieldAttribute('title', 'required', true); ?>
									<div class="small-12 medium-12 columns">
										<?php echo $this->form->getLabel('title'); ?>
										<?php echo $this->form->getInput('title'); ?>
									</div>
								</div>
							<?php else: ?>
								<input type="hidden" name="jform[title]" value="<?php echo $this->item->title; ?>">
							<?php endif; ?>

							<div class="row">
								<?php $this->form->setFieldAttribute('review', 'required', true); ?>
								<div class="small-12 medium-12 columns">
									<?php echo $this->form->getLabel('review'); ?>
									<?php echo $this->form->getInput('review'); ?>
								</div>
							</div>
						</div>
					</fieldset>
				<?php else: ?>
					<input type="hidden" name="jform[guest_name]" value="<?php echo $this->item->guest_name; ?>">
					<input type="hidden" name="jform[guest_location]"
					       value="<?php echo $this->item->guest_location; ?>">
					<input type="hidden" name="jform[title]" value="<?php echo $this->item->title; ?>">
					<input type="hidden" name="jform[review]" value="<?php echo $this->item->review; ?>">
				<?php endif; ?>

				<?php if ($this->params->get('review_ratings')): ?>
					<fieldset class="fieldset">
						<div class="callout">
							<legend><?php echo KrMethods::plain('COM_KNOWRES_YOUR_RATINGS'); ?></legend>
							<?php
							$this->form->setFieldAttribute('rating1', 'label', $this->params->get('review_rating1'));
							$this->form->setFieldAttribute('rating2', 'label', $this->params->get('review_rating2'));
							$this->form->setFieldAttribute('rating3', 'label', $this->params->get('review_rating3'));
							$this->form->setFieldAttribute('rating4', 'label', $this->params->get('review_rating4'));
							$this->form->setFieldAttribute('rating5', 'label', $this->params->get('review_rating5'));
							$this->form->setFieldAttribute('rating6', 'label', $this->params->get('review_rating6'));
							?>

							<?php if ($this->params->get('review_rating1')): ?>
								<div class="row">
									<div class="small-12 columns end input select kr-ratings">
										<?php echo $this->form->getLabel('rating1'); ?>
										<?php echo $this->form->getInput('rating1'); ?>
									</div>
								</div>
							<?php endif; ?>
							<?php if ($this->params->get('review_rating2')): ?>
								<div class="row">
									<div class="small-12 columns end input select kr-ratings">
										<?php echo $this->form->getLabel('rating2'); ?>
										<?php echo $this->form->getInput('rating2'); ?>
									</div>
								</div>
							<?php endif; ?>
							<?php if ($this->params->get('review_rating3')): ?>
								<div class="row">
									<div class="small-12 columns end input select kr-ratings">
										<?php echo $this->form->getLabel('rating3'); ?>
										<?php echo $this->form->getInput('rating3'); ?>
									</div>
								</div>
							<?php endif; ?>
							<?php if ($this->params->get('review_rating4')): ?>
								<div class="row">
									<div class="small-12 columns end input select kr-ratings">
										<?php echo $this->form->getLabel('rating4'); ?>
										<?php echo $this->form->getInput('rating4'); ?>
									</div>
								</div>
							<?php endif; ?>
							<?php if ($this->params->get('review_rating5')): ?>
								<div class="row">
									<div class="small-12 columns end input select kr-ratings">
										<?php echo $this->form->getLabel('rating5'); ?>
										<?php echo $this->form->getInput('rating5'); ?>
									</div>
								</div>
							<?php endif; ?>
							<?php if ($this->params->get('review_rating6')): ?>
							<div class="row">
								<div class="small-12 columns end input select kr-ratings">
									<?php echo $this->form->getLabel('rating6'); ?>
									<?php echo $this->form->getInput('rating6'); ?>
								</div>
							</div>
						</div>
						<?php endif; ?>
					</fieldset>
				<?php else: ?>
					<input type="hidden" name="jform[rating1]" value="<?php echo $this->item->rating1; ?>">
					<input type="hidden" name="jform[rating2]" value="<?php echo $this->item->rating2; ?>">
					<input type="hidden" name="jform[rating3]" value="<?php echo $this->item->rating3; ?>">
					<input type="hidden" name="jform[rating4]" value="<?php echo $this->item->rating4; ?>">
					<input type="hidden" name="jform[rating5]" value="<?php echo $this->item->rating5; ?>">
					<input type="hidden" name="jform[rating6]" value="<?php echo $this->item->rating6; ?>">
				<?php endif; ?>

				<?php if ($this->params->get('review_disclaimer')): ?>
					<fieldset class="fieldset">
						<div class="row">
							<div class="small-12 columns">
								<p class="smaller">
									<?php echo nl2br($this->params->get('review_disclaimer')); ?>
								</p>
							</div>
						</div>
					</fieldset>
				<?php endif; ?>

				<fieldset class="fieldset">
					<div class="row">
						<div class="small-12 columns text-right">
							<button type="submit" class="button validate">
								<span><?php echo KrMethods::plain('JSUBMIT'); ?></span>
							</button>
						</div>
					</div>
				</fieldset>

				<?php echo HTMLHelper::_('form.token'); ?>
				<input type="hidden" name="id" value="<?php echo (int) $this->item->id; ?>">
				<input type="hidden" name="jform[id]" value="<?php echo (int) $this->item->id; ?>">
				<input type="hidden" name="jform[contract_id]" value="<?php echo $this->contract->id; ?>">
				<input type="hidden" name="jform[property_id]" value="<?php echo $this->contract->property_id; ?>">
				<input type="hidden" name="jform[review_date]" value="<?php echo TickTock::getDate(); ?>">
				<input type="hidden" name="jform[state]" value="0">
			</form>
		</div>
	</div>
</div>