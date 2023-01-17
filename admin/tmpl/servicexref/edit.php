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

use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use Joomla\CMS\HTML\HTMLHelper;

/** @var HighlandVision\Component\Knowres\Administrator\View\Servicexref\HtmlView $this */

$service = KrFactory::getAdminModel('service')->getItem($this->item->service_id);

$wa = $this->document->getWebAssetManager();
$wa->useScript('keepalive')
   ->useScript('form.validate');
?>

<form action="<?php echo KrMethods::route('index.php?option=com_knowres&layout=edit&id=' . (int) $this->item->id); ?>"
      aria-label="<?php echo $this->form_aria_label; ?>" class="form-validate" id="tax-form" method="post"
      name="adminForm">

	<div class="main-card">
		<div class="row">
			<div class="col-xl-9 col-xxl-8">
				<?php echo $this->form->renderField('service_id'); ?>

				<?php if (!(int) $this->item->contract_id && !(int) $this->item->guest_id
					&& !(int) $this->item->owner_id) : ?>
					<?php $this->form->setFieldAttribute('property_id', 'required', true); ?>
					<?php echo $this->form->renderField('property_id'); ?>
					<?php if ($service->plugin == 'vrbo' || $service->plugin == 'ru'): ?>
						<?php $this->form->setFieldAttribute('sell', 'required', true); ?>
						<?php echo $this->form->renderField('sell'); ?>
					<?php endif; ?>
				<?php endif; ?>
				<?php if ((int) $this->item->contract_id) : ?>
					<?php $this->form->setFieldAttribute('contract_id', 'required', true); ?>
					<?php echo $this->form->renderField('contract_id'); ?>
				<?php endif; ?>
				<?php if ((int) $this->item->guest_id) : ?>
					<?php $this->form->setFieldAttribute('guest_id', 'required', true); ?>
					<?php echo $this->form->renderField('guest_id'); ?>
				<?php endif; ?>
				<?php if ((int) $this->item->owner_id) : ?>
					<?php $this->form->setFieldAttribute('owner_id', 'required', true); ?>
					<?php echo $this->form->renderField('owner_id'); ?>
				<?php endif; ?>
				<!--					--><?php //if ((int) $this->item->payment_id) : ?>
				<!--						--><?php //echo $this->form->renderField('payment_id'); ?>
				<!--					--><?php //endif; ?>

				<?php echo $this->form->renderField('foreign_key'); ?>
				<?php echo $this->form->renderFieldset('krhidden'); ?>
			</div>
			<div class="col-xl-3 offset-xxl-1">
				<?php echo KrMethods::render('joomla.edit.global', $this); ?>
			</div>
		</div>
	</div>

	<input type="hidden" name="task" value="">
	<input type="hidden" name="old_sell" value="<?php echo $this->form->getValue('sell'); ?>">
	<?php echo HTMLHelper::_('form.token'); ?>
</form>