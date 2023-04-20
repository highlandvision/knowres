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
$dob             = $params->get('guestdata_age', 1);
$document        = $params->get('guestdata_document', 1);
$document_fields = ['document_nat', 'document_type', 'document_id', 'document_issue', 'document_expiry'];

extract($displayData);
/**
 * Layout variables
 * -----------------
 *
 * @var   Form   $form   Adhoc guest info form
 * @var   array  $values Massaged form value fields
 * @var   string $group  Json Group name
 */

$g = 0;
?>

<?php foreach ($values as $k => $v): ?>
	<?php $bg = $g % 2 > 0 ? '#fefefe' : '#f1f1f1'; ?>
	<?php $g++; ?>
	<div class="row" style="background:<?php echo $bg;?>;padding-top:1rem;" id="<?php echo $group . $k; ?>">
		<!-- Loop each fieldset - one fieldset per form item so each column can have a width-->
		<?php foreach ($form->getFieldsets() as $fieldset) : ?>
			<?php $hidden = ""; ?>
			<?php if (!$surname2 && $fieldset->name == "surname2"): ?>
				<?php $hidden = "hidden"; ?>
			<?php endif; ?>
			<?php if (!$sex && $fieldset->name == "sex"): ?>
				<?php $hidden = "hidden"; ?>
			<?php endif; ?>
			<?php if (!$dob && $fieldset->name == "dob"): ?>
				<?php $hidden = "hidden"; ?>
			<?php endif; ?>
			<?php if (!$document && in_array($fieldset->name, $document_fields)): ?>
				<?php $hidden = "hidden"; ?>
			<?php endif; ?>

			<div class="<?php echo $fieldset->class; ?>" <?php echo $hidden; ?>>
				<?php foreach ($form->getFieldset($fieldset->name) as $field) : ?>
					<?php $name = $field->__get('name'); ?>
					<?php if ($name == 'name'): ?>
						<span class="float-start" style="width:24px;padding-top:8px;font-size:24px;">
							<?php echo ($k + 1) . '.'; ?>
						</span>
					<?php else: ?>
						<span class="float-start" style="width:24px;padding-top:8px;font-size:24px;">
							<?php echo ''; ?>
						</span>
					<?php endif; ?>

					<?php $field_name = $group . '[' . $k . ']' . '[' . $field->__get('name') . ']'; ?>
					<?php $field->__set('name', $field_name); ?>
					<?php $field->__set('id', $name . $k); ?>
					<?php $field->__set('value', $v[$name]); ?>
					<?php echo $field->renderField(); ?>
				<?php endforeach; ?>
			</div>
		<?php endforeach; ?>
	</div>
<?php endforeach; ?>