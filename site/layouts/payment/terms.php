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
 * @var string $title Page title.
 * @var string $text  Terms text.
 * @var string $label Terms label.
 * @var string $name  Terms name.
 */

$hide    = $text ? '' : 'hide';
$checked = $text ? '' : 'checked="checked"';
?>

<?php if ($text) : ?>
	<div class="callout small <?php echo $hide; ?>">
		<h5><?php echo $title ?></h5>
		<p><?php echo nl2br($text); ?></p>
		<div class="callout formbg small">
			<input type="checkbox" class="checkover" name="<?php echo $name; ?>"
			       id="<?php echo $name; ?>" <?php echo $checked; ?>>
			<label class="checklabel" for="<?php echo $name; ?>">
				<?php echo $label; ?>
			</label>
		</div>
	</div>
<?php endif; ?>
