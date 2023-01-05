<?php
/**
 * @package    Know Reservations
 * @subpackage Admin Layout
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;
use Joomla\CMS\Form\Form;

$params          = KrMethods::getParams();
$surname2        = $params->get('guestdata_second_surname', 0);
$sex             = $params->get('guestdata_sex', 1);
$age             = $params->get('guestdata_age', 1);
$document        = $params->get('guestdata_document', 1);
$document_fields = ['document_nat', 'document_type', 'document_id', 'document_issue'];

extract($displayData);
/**
 * Layout variables
 * -----------------
 *
 * @var   Form   $form   Adhoc guest info form
 * @var   array  $values Massaged form value fields
 * @var   string $group  Json Group name
 */

$count = 1;
?>

<?php foreach ($values as $k => $v): ?>
	<div class="row">
		<div class="small-8 columns">
			<div style="font-size:24px;">
				<?php echo $count . '. ' . $v['name']; ?>
			</div>
		</div>
		<div class="small-4 columns text-right">
			<button type="button" class="button" tabindex="-1" style="margin-bottom:0.7rem;"
			        data-toggle="guest_<?php echo $count; ?>">
				<?php echo KrMethods::plain('COM_KNOWRES_SHOW_HIDE'); ?>
			</button>
		</div>
	</div>

	<div id="guest_<?php echo $count; ?>" class="callout small" data-toggler="hideme">
		<div class="row" id="<?php echo $group . $k; ?>">
			<!-- Loop each fieldset - one fieldset per form item so each column can have a width-->
			<?php foreach ($form->getFieldsets() as $fieldset) : ?>
				<?php $hidden = ""; ?>
				<?php if (!$surname2 && $fieldset->name == "surname2"): ?>
					<?php $hidden = "hidden"; ?>
				<?php endif; ?>
				<?php if (!$sex && $fieldset->name == "sex"): ?>
					<?php $hidden = "hidden"; ?>
				<?php endif; ?>
				<?php if (!$age && $fieldset->name == "dob"): ?>
					<?php $hidden = "hidden"; ?>
				<?php endif; ?>
				<?php if (!$document && in_array($fieldset->name, $document_fields)): ?>
					<?php $hidden = "hidden"; ?>
				<?php endif; ?>

				<div class="<?php echo $fieldset->class; ?>" <?php echo $hidden; ?>>
					<?php foreach ($form->getFieldset($fieldset->name) as $field) : ?>
						<?php $name = $field->__get('name'); ?>
						<?php $field_name = $group . '[' . $k . ']' . '[' . $field->__get('name') . ']'; ?>
						<?php $field->__set('name', $field_name); ?>
						<?php $field->__set('id', $name . $k); ?>
						<?php $field->__set('value', $v[$name]); ?>
						<?php echo $field->renderField(); ?>
					<?php endforeach; ?>
				</div>
			<?php endforeach; ?>
		</div>
	</div>
	<?php $count++; ?>
<?php endforeach; ?>