<?php
/**
 * @package    Know Reservations
 * @subpackage Site module
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

defined('_JEXEC') or die;

$action = 'index.php';
?>

<form action="<?php echo $action; ?>" method="get" id="kr-goto-property" name="kr-goto-property">
	<input type="hidden" name="option" value="com_knowres">
	<input type="hidden" name="view" value="property">
	<input type="hidden" name="Itemid" value="<?php echo $Itemid; ?>">

	<div class="grid-x grid-margin-x collapse">
		<div class="small-12 cell">
			<?php echo $property_select; ?>
		</div>
	</div>
</form>