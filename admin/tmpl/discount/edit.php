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

/** @var HighlandVision\Component\Knowres\Administrator\View\Discount\HtmlView $this */

$wa = $this->document->getWebAssetManager();
$wa->useScript('keepalive')
   ->useScript('form.validate');
?>

<form action="<?php echo KrMethods::route('index.php?option=com_knowres&layout=edit&id=' . (int) $this->item->id); ?>"
      aria-label="<?php echo $this->form_aria_label; ?>" class="form-validate" id="discount-form" method="post"
      name="adminForm">

	<div class="main-card">
		<div class="row">
			<div class="col-xl-9 col-xxl-8">
				<?php echo $this->form->renderFieldset('krdata'); ?>

				<?php if ((int) $this->item->model == 0): ?>
					<?php $this->form->setValue('days_from', '', $this->item->param1); ?>
					<?php $this->form->setValue('days_to', '', $this->item->param2); ?>
				<?php else: ?>
					<?php $this->form->setValue('date_from', '', $this->item->param1); ?>
					<?php $this->form->setValue('date_to', '', $this->item->param2); ?>
				<?php endif; ?>

				<?php echo $this->form->renderField('model'); ?>
				<?php echo KrMethods::render('form.field.inline.duo', [
					'label' => '',
					'f1'    => $this->form->renderField('date_from'),
					'f2'    => $this->form->renderField('date_to')
				]);
				?>
				<?php echo KrMethods::render('form.field.inline.duo', [
					'label' => '',
					'f1'    => $this->form->renderField('days_from'),
					'f2'    => $this->form->renderField('days_to')
				]);
				?>
			</div>
			<div class="col-xl-3 offset-xxl-1">
				<?php echo KrMethods::render('joomla.edit.global', $this); ?>
			</div>
		</div>

		<input type="hidden" name="jform[property_id]" value="<?php echo $this->property_id; ?>">
		<input type="hidden" name="task" value="">
		<?php echo HTMLHelper::_('form.token'); ?>
	</div>
</form>