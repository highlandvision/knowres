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
use HighlandVision\KR\Utility;
use Joomla\CMS\HTML\HTMLHelper;

/** @var HighlandVision\Component\Knowres\Administrator\View\Service\HtmlView $this */
$wa = $this->document->getWebAssetManager();
$wa->useScript('keepalive')
   ->useScript('form.validate');

if ($this->item->type == 'g')
{
	$this->form->setFieldAttribute('currency', 'type', 'listpaymentcurrency');
	$this->form->setFieldAttribute('currency', 'required', 'false');
	$this->form->setFieldAttribute('property_id', 'type', 'listforeignkey');
	$this->form->setFieldAttribute('property_id', 'layout', 'joomla.form.field.list-fancy-select');
}
//TODO-v4.1 Sort out Xero
//if ($this->item->plugin === 'xero' && $this->item->id > 0)
//{
//	$xero = new Xero($this->item->id);
//	$data = $xero->getAccounts(true);
//}
?>

<form action="<?php echo KrMethods::route('index.php?option=com_knowres&layout=edit&id=' . $this->item->id); ?>"
      aria-label="<?php echo $this->form_aria_label; ?>" class="form-validate" id="service-form" method="post"
      name="adminForm">

	<div class="main-card">
		<div class="row">
			<div class="col-xl-9 col-xxl-8">
				<?php echo $this->form->renderFieldset('krdata'); ?>
				<?php echo $this->adhoc->renderFieldset('custom'); ?>
				<!---->
				<!--				<fieldset name="krplugin">-->
				<!--					--><?php //foreach ($this->form->getFieldset('custom') as $field): ?>
				<!--						--><?php //if (isset($this->item->parameters->{$field->__get('name')})): ?>
				<!--							--><?php //$this->form->setValue($field->__get('name'), null, $this->item->parameters->{$field->__get('name')}); ?>
				<!--						--><?php //else: ?>
				<!--							--><?php //echo $this->form->setValue($field->__get('name'), null, $field->__get('default')); ?>
				<!--						--><?php //endif; ?>
				<!---->
				<!--						--><?php //if ($field->__get('name') == 'pricingPolicy' && isset($this->item->parameters->{$field->__get('name')})
				//							&& $this->item->parameters->{$field->__get('name')} === 'GUARANTEED'): ?>
				<!--							--><?php //$this->form->setFieldAttribute($field->__get('name'), 'readonly', 'true'); ?>
				<!--						--><?php //endif; ?>
				<!---->
				<!--						<div class="control-group">-->
				<!--							<div class="control-label">-->
				<?php //echo $this->form->getLabel($field->__get('name')); ?><!--</div>-->
				<!--							<div class="controls">-->
				<?php //echo $this->form->getInput($field->__get('name')); ?><!--</div>-->
				<!--						</div>-->
				<!--					--><?php //endforeach; ?>
				<!--				</fieldset>-->
				<!---->
				<!--				--><?php //if ($this->item->plugin == "xero") : ?>
				<!--				<div class="row">-->
				<!--					<div class="col-lg-6">-->
				<!--						<fieldset name="mapaccounts">-->
				<!--							<legend>-->
				<?php //echo KrMethods::plain('COM_KNOWRES_XERO_MAP_ACCOUNTS'); ?><!--</legend>-->
				<!--							--><?php //foreach ($this->form->getFieldset('mapaccounts') as $field): ?>
				<!--								--><?php //if ($field->__get('hidden')) : ?>
				<!--									--><?php //echo $field->__get('input'); ?>
				<!--								--><?php //else: ?>
				<!--									<div class="control-group">-->
				<!--										<div class="control-label">-->
				<!--											--><?php //echo $field->__get('label'); ?>
				<!--										</div>-->
				<!--										--><?php
				//										if (isset($this->item->parameters->{$field->__get('name')}))
				//										{
				//											$field->__set($field->__get('name'), $this->item->parameters->{$field->__get('name')});
				//										}
				//										?>
				<!--										<div class="controls">-->
				<?php //echo $field->__get('input'); ?><!--</div>-->
				<!--									</div>-->
				<!--								--><?php //endif; ?>
				<!--							--><?php //endforeach; ?>
				<!--						</fieldset>-->
				<!--					</div>-->
				<!--					<div class="col-lg-6">-->
				<!--						<fieldset name="mapbanks">-->
				<!--							<legend>-->
				<?php //echo KrMethods::plain('COM_KNOWRES_XERO_MAP_BANKS'); ?><!--</legend>-->
				<!--							--><?php //foreach ($this->form->getFieldset('mapbanks') as $field): ?>
				<!--								--><?php //if ($field->__get('hidden')): ?>
				<!--									--><?php //echo $field->__get('input'); ?>
				<!--								--><?php //else : ?>
				<!--									<div class="control-group">-->
				<!--										<div class="control-label">-->
				<!--											--><?php //echo $field->__get('label'); ?>
				<!--										</div>-->
				<!--										--><?php
				//										if (isset($this->item->parameters->{$field->__get('name')}))
				//										{
				//											$field->__set('value', $this->item->parameters->{$field->__get('name')});
				//										}
				//										?>
				<!--										<div class="controls">-->
				<!--											--><?php //echo $field->__get('input'); ?>
				<!--										</div>-->
				<!--									</div>-->
				<!--								--><?php //endif; ?>
				<!--							--><?php //endforeach; ?>
				<!--						</fieldset>-->
				<!--					</div>-->
				<!--				</div>-->
				<!--				<div class="row">-->
				<!--					<div class="col-lg-6">-->
				<!--						<fieldset name="maptracking">-->
				<!--							<legend>-->
				<!--								--><?php //echo KrMethods::plain('COM_KNOWRES_XERO_MAP_TRACKING'); ?>
				<!--							</legend>-->
				<!--							--><?php //foreach ($this->form->getFieldset('maptracking') as $field): ?>
				<!--								--><?php //if ($field->__get('type') === 'Note') : ?>
				<!--									<div>--><?php //echo $field->__get('label'); ?><!--</div>-->
				<!--								--><?php //else : ?>
				<!--									--><?php //if (isset($this->item->parameters->{$field->__get('name')})): ?>
				<!--										--><?php //$field->__set('value', Utility::encodeJson($this->item->parameters->{$field->__get('name')})); ?>
				<!--									--><?php //endif; ?>
				<!--									--><?php //echo $field->__get('input'); ?>
				<!--								--><?php //endif; ?>
				<!--							--><?php //endforeach; ?>
				<!--						</fieldset>-->
				<!--					</div>-->
				<!--				</div>-->
				<!--				--><?php //endif; ?>
			</div>
			<div class="col-xl-3 offset-xxl-1">
				<?php echo KrMethods::render('joomla.edit.global', $this); ?>
			</div>
		</div>
	</div>

	<?php echo HTMLHelper::_('form.token'); ?>
	<input type="hidden" name="jform[id]" value="<?php echo $this->item->id; ?>">

	<?php if ($this->item->id): ?>
		<input type="hidden" name="jform[plugin]" value="<?php echo $this->item->plugin; ?>">
		<input type="hidden" name="jform[type]" value="<?php echo $this->item->type; ?>">
	<?php else: ?>
		<input type="hidden" name="jform[plugin]" value="<?php echo $this->adhoc->getFieldAttribute('plugin', 'default'); ?>">
		<input type="hidden" name="jform[type]" value="<?php echo $this->adhoc->getFieldAttribute('type', 'default'); ?>">
	<?php endif; ?>

	<input type="hidden" name="jform[parameters]"
	       value="<?php echo Utility::encodeJson($this->item->parameters); ?>">
	<input type="hidden" name="existing"
	       value="<?php echo htmlentities(Utility::encodeJson($this->item->parameters)); ?>">
	<input type="hidden" name="task" value=''>
</form>