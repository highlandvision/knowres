<?php
/**
 * @package         Joomla.Site
 * @subpackage      Layout
 * @copyright   (C) 2019 Open Source Matters, Inc. <https://www.joomla.org>
 * @license         GNU General Public License version 2 or later; see LICENSE.txt
 */

defined('_JEXEC') or die;

use Joomla\CMS\Form\Field\CheckboxField;

extract($displayData);

/**
 * Layout variables
 * -----------------
 * @var   string        $autocomplete   Autocomplete attribute for the field.
 * @var   boolean       $autofocus      Is autofocus enabled?
 * @var   string        $class          Classes for the input.
 * @var   string|null   $description    Description of the field.
 * @var   boolean       $disabled       Is this field disabled?
 * @var   CheckboxField $field          The form field object.
 * @var   string|null   $group          Group the field belongs to. <fields> section in form XML.
 * @var   boolean       $hidden         Is this field hidden in the form?
 * @var   string        $hint           Placeholder for the field.
 * @var   string        $id             DOM id of the field.
 * @var   string        $label          Label of the field.
 * @var   string        $labelclass     Classes to apply to the label.
 * @var   boolean       $multiple       Does this field support multiple values?
 * @var   string        $name           Name of the input field.
 * @var   string        $onchange       Onchange attribute for the field.
 * @var   string        $onclick        Onclick attribute for the field.
 * @var   string        $pattern        Pattern (Reg Ex) of value of the form field.
 * @var   string        $validationtext The validation text of invalid value of the form field.
 * @var   boolean       $readonly       Is this field read only?
 * @var   boolean       $repeat         Allows extensions to duplicate elements.
 * @var   boolean       $required       Is this field required?
 * @var   integer       $size           Size attribute of the input.
 * @var   boolean       $spellcheck     Spellcheck state for the form field.
 * @var   string        $validate       Validation rules to apply.
 * @var   string        $value          Value attribute of the field.
 * @var   boolean       $checked        Whether the checkbox should be checked.
 * @var   string        $dataAttribute  Miscellaneous data attributes preprocessed for HTML output
 * @var   array         $dataAttributes Miscellaneous data attribute for eg, data-*.
 */

// Initialize some field attributes.
$class     = $class ? ' ' . $class : '';
$disabled  = $disabled ? ' disabled' : '';
$required  = $required ? ' required' : '';
$autofocus = $autofocus ? ' autofocus' : '';
$checked   = $checked ? ' checked' : '';

// Initialize JavaScript field attributes.
$onclick  = $onclick ? ' onclick="' . $onclick . '"' : '';
$onchange = $onchange ? ' onchange="' . $onchange . '"' : '';
?>

<div class="control-group" style="margin-left:5px;">
	<input type="checkbox" name="<?php echo $name; ?>" id="<?php echo $id; ?>"
	       class="<?php echo trim($class); ?>" value="<?php echo htmlspecialchars($value, ENT_QUOTES); ?>"
		<?php echo $checked . $disabled . $onclick . $onchange . $required . $autofocus . $dataAttribute; ?>>
	<label class="checklabel" for="<?php echo $id; ?>">
		<?php echo $label; ?>
	</label>
</div>