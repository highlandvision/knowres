<?php
/**
 * @package     Know Reservations
 * @subpackage  Admin Layout
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

defined('_JEXEC') or die;

use Joomla\CMS\Form\Form;

extract($displayData);
/**
 * Layout variables
 *
 * @var Form   $form       Extras form.
 * @var string $group      Group name
 * @var array  $values     Form field values.
 * @var array  $attributes Form field attributes.
 */
?>

<?php foreach ($values as $k => $v): ?>
	<div class="row" id="<?php echo $group . $k; ?>">
		<?php foreach ($form->getFieldsets() as $fieldset) : ?>
			<div class="<?php echo $fieldset->class; ?>">
				<?php foreach ($form->getFieldset($fieldset->name) as $field) : ?>
					<?php $name = $field->__get('name'); ?>
					<?php $field_name = $group . '_' . $field->__get('name') . '[]'; ?>
					<?php $field->__set('name', $field_name); ?>
					<?php $field->__set('id', $field->__get('name') . $k); ?>
					<?php if ($name == 'quantity'): ?>
						<?php $field->setValue($v); ?>
					<?php else: ?>
						<?php $field->setValue($k); ?>
					<?php endif; ?>
					<?php $att = $attributes[$k]; ?>
					<?php foreach ($att as $t => $a): ?>
						<?php if ($t == 'description'): ?>
							<?php $field->__set('description', $a); ?>
						<?php else: ?>
							<?php $form->setFieldAttribute($name, $t, $a); ?>
						<?php endif; ?>
					<?php endforeach; ?>
					<?php echo $field->renderField(); ?>
				<?php endforeach; ?>
			</div>
		<?php endforeach; ?>
	</div>
<?php endforeach; ?>