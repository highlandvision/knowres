<?php
/**
 * @package         Joomla.Site
 * @subpackage      Layout
 * @copyright   (C) 2018 Open Source Matters, Inc. <https://www.joomla.org>
 * @license         GNU General Public License version 2 or later; see LICENSE.txt
 */

defined('_JEXEC') or die;

use Joomla\CMS\Form\Form;

extract($displayData);
/**
 * Layout variables
 * -----------------
 *
 * @var   array  $allbedtypes Bed types list
 * @var   Form   $form        Json Form instance
 * @var   string $group       Group name (bed_types)
 * @var   array  $values      Form field values
 */

$count = 0;
?>

	<!-- Loop each set of values set up in Field-->
<?php foreach ($values as $k => $v): ?>
	<div class="row" id="<?php echo $group . $k; ?>">
		<!-- Loop each fieldset - one fieldset per form item so each column can have a width class-->
		<?php $count = 0; ?>
		<?php foreach ($form->getFieldsets() as $fieldset) : ?>
			<?php if ($fieldset->name == 'f1' || $fieldset->name == 'f2'): ?>
				<div class="<?php echo $fieldset->class; ?>">
					<?php foreach ($form->getFieldset($fieldset->name) as $field) : ?>
						<?php $name = $group . '[' . $k . ']' . '[' . $field->__get('name') . ']'; ?>
						<?php $field->__set('name', $name); ?>
						<?php $field->__set('id', $field->__get('name') . $k); ?>
						<?php if ($fieldset->name == 'f1'): ?>
							<?php $field->setValue($v[0]); ?>
						<?php else: ?>
							<?php $field->setValue($v[1]); ?>
						<?php endif; ?>
						<?php echo $field->renderField(); ?>
					<?php endforeach; ?>
				</div>
			<?php else: ?>
				<?php foreach ($form->getFieldset($fieldset->name) as $field) : ?>
					<?php $bedcount = 0; ?>
					<?php foreach ($allbedtypes as $b): ?>
						<div class="<?php echo $fieldset->class; ?>">
							<?php if (isset($v[2][$b->id])): ?>
								<?php $bedtype = $group . '[' . $k . ']' . '[bed_types][' . $b->id . '][bed_number]' . $v[2][$b->id]; ?>
								<?php $fieldXml = new SimpleXMLElement('<field></field>'); ?>
								<?php $fieldXml->addAttribute('name', $bedtype); ?>
								<?php $fieldXml->addAttribute('hiddenLabel', 'true'); ?>
								<?php $fieldXml->addAttribute('label', $b->name); ?>
								<?php $fieldXml->addAttribute('description', $b->name); ?>
								<?php $fieldXml->addAttribute('type', 'number'); ?>
								<?php $fieldXml->addAttribute('min', '0'); ?>
								<?php $fieldXml->addAttribute('max', '10'); ?>
								<?php $form->setField($fieldXml, null, true, $group); ?>
								<?php $form->setValue($bedtype, null, $v[2][$b->id]); ?>
								<?php echo $form->renderField($bedtype); ?>
								<?php $bedcount++; ?>
							<?php endif; ?>
						</div>
					<?php endforeach; ?>
				<?php endforeach; ?>
			<?php endif; ?>
		<?php endforeach; ?>
	</div>
	<?php $count++; ?>
<?php endforeach; ?>