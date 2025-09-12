<?php
/**
 * @package         Joomla.Site
 * @subpackage      Layout
 * @copyright   (C) 2018 Open Source Matters, Inc. <https://www.joomla.org>
 * @license         GNU General Public License version 2 or later; see LICENSE.txt
 */

defined('_JEXEC') or die;

use HighlandVision\KR\TickTock;

extract($displayData);
/**
 * Layout variables
 * -----------------
 *
 * @var   string  $autocomplete   Autocomplete attribute for the field.
 * @var   boolean $autofocus      Is autofocus enabled?
 * @var   string  $class          Classes for the input.
 * @var   string  $description    Description of the field.
 * @var   boolean $disabled       Is this field disabled?
 * @var   string  $group          Group the field belongs to. <fields> section in form XML.
 * @var   boolean $hidden         Is this field hidden in the form?
 * @var   string  $hint           Placeholder for the field.
 * @var   string  $id             DOM id of the field.
 * @var   string  $label          Label of the field.
 * @var   string  $labelclass     Classes to apply to the label.
 * @var   boolean $multiple       Does this field support multiple values?
 * @var   string  $name           Name of the input field.
 * @var   string  $onchange       Onchange attribute for the field.
 * @var   string  $onclick        Onclick attribute for the field.
 * @var   string  $pattern        Pattern (Reg Ex) of value of the form field.
 * @var   boolean $readonly       Is this field read only?
 * @var   boolean $repeat         Allows extensions to duplicate elements.
 * @var   boolean $required       Is this field required?
 * @var   integer $size           Size attribute of the input.
 * @var   boolean $spellcheck     Spellcheck state for the form field.
 * @var   string  $validate       Validation rules to apply.
 * @var   string  $value          Value attribute of the field.
 * @var   array   $checkedOptions Options that will be set as checked.
 * @var   boolean $hasValue       Has this field a value assigned?
 * @var   array   $options        Options available for this field.
 * @var   array   $inputType      Options available for this field.
 * @var   string  $accept         File types that are accepted.
 * @var   string  $dataAttribute  Miscellaneous data attributes preprocessed for HTML output
 * @var   array   $dataAttributes Miscellaneous data attribute for eg, data-*.
 * @var   string  $dirname        The directory name
 * @var   string  $addonBefore    The text to use in a bootstrap input group prepend
 * @var   string  $addonAfter     The text to use in a bootstrap input group append
 */

$name_input      = substr($name, 0, -1) . '_dsp]';
$id_input        = $id . '_dsp';
$addonBeforeHtml = '<span class="kr-filter-datepicker input-group-text">' . $addonBefore . '</span>';
?>

<?php if (!empty($addonBefore) || !empty($addonAfter)) : ?>
	<div class="input-group">
<?php endif; ?>

<span class="visually-hidden">
	<label id="<?php echo $id_input . '-lbl'; ?>" for="<?php echo $id_input; ?>">
		<?php echo $label; ?>
	</label>
</span>

<?php if (!empty($addonBefore)) : ?>
	<?php echo $addonBeforeHtml; ?>
<?php endif; ?>

<input type="text" class="form-control uicalendar <?php echo $class; ?>" name="<?php echo $name_input; ?>"
       id="<?php echo $id_input; ?>" value="<?php echo TickTock::getDate($value, 'j M Y'); ?>" <?php echo $dataAttribute; ?>>
<input type="hidden" id="<?php echo $id; ?>" name="<?php echo $name; ?>" value="<?php echo TickTock::getDate($value); ?>">

<?php if (!empty($addonBefore) || !empty($addonAfter)) : ?>
	</div>
<?php endif; ?>