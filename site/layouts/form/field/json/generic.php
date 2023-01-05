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
 * @var   Form   $form   Json Form instance
 * @var   string $group  Group name
 * @var   array  $values Form field values
 */
?>

	<!-- Loop each set of values set up in Field-->
<?php foreach ($values as $k => $v): ?>
	<div class="row" id="<?php echo $group . $k; ?>">
		<!-- Loop each fieldset - one fieldset per form item so each column can have a width-->
		<?php $count = 0; ?>
		<?php foreach ($form->getFieldsets() as $fieldset) : ?>
			<div class="<?php echo $fieldset->class; ?>">
				<?php foreach ($form->getFieldset($fieldset->name) as $field) : ?>
					<?php $name = $group . '[' . $k . ']' . '[' . $field->__get('name') . ']'; ?>
					<?php $field->__set('name', $name); ?>
					<?php $field->__set('id', $field->__get('name') . $k); ?>
					<?php $field->setValue($v[$count]); ?>
					<?php echo $field->renderField(); ?>
					<?php $count++; ?>
				<?php endforeach; ?>
			</div>
		<?php endforeach; ?>
	</div>
<?php endforeach; ?>