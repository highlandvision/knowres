<?php
/**
 * @package    Know Reservations
 * @subpackage Admin Layout
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

defined('_JEXEC') or die;

extract($displayData);
/**
 * Layout variables
 *
 * @var string $label Terms label.
 * @var string $name  Terms name.
 */

$checked = '';
?>

<div class="small">
	<input type="checkbox" class="checkover" name="<?php echo $name; ?>" id="<?php echo $name; ?>" <?php echo $checked; ?>>
	<label class="checklabel vsmall" for="<?php echo $name; ?>">
		<?php echo $label; ?>
	</label>
</div>