<?php
/**
 * @package     KR
 * @subpackage  Admin views
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;
?>

<?php if (!isset($this->channels) || !count($this->channels)): ?>
	<?php echo KrMethods::plain('COM_KNOWRES_NO_DATA_FOUND'); ?>
<?php else: ?>
	<?php foreach ($this->channels as $x) : ?>
		<div class="row">
			<div class="col-md-3">
				<?php echo $x->name; ?>
			</div>
			<div class="col-md-3">
				<?php echo !$x->foreign_key ? KrMethods::plain('COM_KNOWRES_NEW') : $x->foreign_key; ?>
			</div>
			<div class="col-md-2">
				<a href="<?php echo KrMethods::route("index.php?option=com_knowres&task=servicexref.edit&id=$x->id"); ?>">
					<i class='fa-solid fa-edit'></i> <?php echo KrMethods::plain('COM_KNOWRES_EDIT'); ?>
				</a>
			</div>
			<div class="col-md-2">
				<a href="<?php echo KrMethods::route("index.php?option=com_knowres&view=servicequeues&filter[property_id]="
					. $this->item->id . "&filter[service_id]=$x->service_id"); ?>">
					<i class='fa-solid fa-fast-forward'></i> <?php echo KrMethods::plain('COM_KNOWRES_QUEUE'); ?>
				</a>
			</div>
			<div class="col-md-2">
				<a href="<?php echo KrMethods::route("index.php?option=com_knowres&view=servicelogs&filter[property_id]="
					. $this->item->id . "&filter[service_id]=$x->service_id"); ?>">
					<i class='fa-solid fa-eye'></i> <?php echo KrMethods::plain('COM_KNOWRES_LOG'); ?>
				</a>
			</div>
		</div>
	<?php endforeach; ?>
<?php endif; ?>

<div class="row">
	<div class="col-sm-12">
		<a href="<?php echo KrMethods::route("index.php?option=com_knowres&task=servicexref.edit"); ?>">
			<i class='fa-solid fa-plus-square'></i> <?php echo KrMethods::plain('COM_KNOWRES_ADD'); ?>
		</a>
	</div>
</div>