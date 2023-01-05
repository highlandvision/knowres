<?php
/**
 * @package     KR
 * @subpackage  Admin views
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */
/** @noinspection PhpUnhandledExceptionInspection */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;
?>

<?php if (!isset($this->ownerpayments) || !count($this->ownerpayments)): ?>
	<?php echo KrMethods::plain('COM_KNOWRES_NO_DATA_FOUND'); ?>
<?php else: ?>
	<?php foreach ($this->ownerpayments as $x) : ?>
		<div class="row">
			<div class="col-md-4">
				<?php echo $x->name; ?>
			</div>
			<div class="col-md-3">
				<?php echo $x->plugin; ?>
			</div>
			<div class="col-md-1">
				<?php echo $x->currency; ?>
			</div>
			<div class="col-md-4">
				<a href="<?php echo KrMethods::route("index.php?option=com_knowres&task=service.edit&id=$x->id"); ?>">
					<i class="fas fa-edit"></i> <?php echo KrMethods::plain('COM_KNOWRES_EDIT'); ?>
				</a>
			</div>
		</div>
	<?php endforeach; ?>
<?php endif; ?>

<div class="row-fluid">
	<div class="span3">
		<a href="<?php echo KrMethods::route("index.php?option=com_knowres&view=services&filter[agency_id]=0"); ?>">
			<i class="fas fa-plus-square"></i> <?php echo KrMethods::plain('COM_KNOWRES_ADD'); ?>
		</a>
	</div>
</div>