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

/** @var HighlandVision\Component\Knowres\Administrator\View\Contractpayment\HtmlView $this */

$wa = $this->document->getWebAssetManager();
$wa->useScript('keepalive')
   ->useScript('form.validate');

$this->form->setFieldAttribute('base_amount', 'addonBefore', $this->contract->currency);
?>

<form action="<?php echo KrMethods::route('index.php?option=com_knowres&layout=edit&id=' . (int) $this->item->id); ?>"
      aria-label="<?php echo $this->form_aria_label; ?>" class="form-validate" id="payment-form" method="post"
      name="adminForm">

	<div class="main-card">
		<div class="row">
			<div class="col-xl-9 col-xxl-8">
				<?php echo $this->form->renderFieldset('krdata'); ?>
				<?php echo KrMethods::render('form.field.inline.duo', [
					'label' => '',
					'f1'    => $this->form->renderField('currency'),
					'f2'    => $this->form->renderField('amount')
				]);
				?>
				<?php echo KrMethods::render('form.field.inline.duo', [
					'label' => KrMethods::plain('COM_KNOWRES_CONTRACTPAYMENT_FEX_LBL'),
					'f1'    => $this->form->renderField('base_amount'),
					'f2'    => $this->form->renderField('rate')
				]);
				?>

				<?php echo $this->form->renderField('note'); ?>
			</div>
			<div class="col-xl-3 offset-xxl-1">
				<?php echo KrMethods::render('joomla.edit.global', $this); ?>
			</div>
		</div>

		<input type="hidden" name="task" value="">
		<input type="hidden" name="jform[contract_id]" value="<?php echo $this->contract->id; ?>">
		<input type="hidden" name="jform[currency_res]" value="<?php echo $this->contract->currency; ?>">
		<?php echo HTMLHelper::_('form.token'); ?>
	</div>
</form>