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

use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\TickTock;
use HighlandVision\KR\Utility;

extract($displayData);
/**
 * Layout variables
 *
 * @var false|object $item   The contract item.
 * @var array|bool   $notes  The contract notes.
 * @var bool         $system True for system notes.
 */
?>

<?php if (is_countable($notes)): ?>
	<?php foreach ($notes as $n) : ?>
		<?php if ($system && ($n->note_type !== '["3"]')): ?>
			<?php continue; ?>
		<?php elseif (!$system && ($n->note_type == '["3"]')): ?>
			<?php continue; ?>
		<?php endif; ?>

		<div class="row summary">
			<div class="col-4">
				<?php $n->created_at = is_null($n->created_at) ? $item->created_at : $n->created_at; ?>
				<?php if ($n->updated_by_name) : ?>
					<i class='fa-solid fa-user-edit grey'></i> <strong><?php echo $n->updated_by_name; ?></strong><br>
					<?php echo TickTock::displayTS($n->updated_at) . '<br>'; ?>
				<?php elseif ($n->created_by_name) : ?>
					<i class='fa-solid fa-user grey'></i> <strong><?php echo $n->created_by_name; ?></strong><br>
					<?php echo TickTock::displayTS($n->created_at); ?>
				<?php elseif ($item->guest_name && $n->note_type !== '["3"]') : ?>
					<i class='fa-solid fa-globe grey'></i> <strong><?php echo $item->guest_name; ?></strong><br>
					<?php echo TickTock::displayTS($n->created_at); ?>
				<?php else : ?>
					<i class='fa-solid fa-robot grey'></i>
					<strong><?php echo KrMethods::plain('COM_KNOWRES_AUTO'); ?></strong><br>
					<?php echo TickTock::displayTS($n->created_at); ?>
				<?php endif; ?>
			</div>
			<div class="col-8">
				<b>
					<?php echo KrFactory::getAdminModel('contractnote')::contractNoteTypes(Utility::decodeJson($n->note_type,
						true)); ?>
				</b>
				<br>
				<?php echo nl2br($n->note); ?>
			</div>
		</div>
		<hr>
	<?php endforeach; ?>
<?php endif; ?>

<?php if ($system): ?>
	<!--Display system creation-note-->
	<div class="row summary">
		<div class="col-4">
			<?php if ($item->created_by_name): ?>
				<i class='fa-solid fa-plus grey'></i> <strong><?php echo $item->created_by_name; ?></strong><br>
			<?php elseif ($item->service_name): ?>
				<i class='fa-solid fa-plus grey'></i> <strong><?php echo $item->service_name; ?></strong><br>
			<?php elseif ($item->guest_name) : ?>
				<i class='fa-solid fa-plus grey'></i> <strong><?php echo $item->guest_name; ?></strong><br>
			<?php endif; ?>
			<?php echo TickTock::displayTS($item->created_at); ?>
		</div>
		<div class="col-8">
			<b><?php echo KrMethods::plain('COM_KNOWRES_SYSTEM'); ?></b><br>
			<?php if ($item->created_by_name) : ?>
				<?php echo KrMethods::sprintf("COM_KNOWRES_CREATED_BY_LBL_PLUS", "manager"); ?>
			<?php elseif ($item->service_name): ?>
				<?php echo KrMethods::sprintf("COM_KNOWRES_CREATED_BY_LBL_PLUS", "channel"); ?>
			<?php elseif ($item->guest_name) : ?>
				<?php echo KrMethods::sprintf("COM_KNOWRES_CREATED_BY_LBL_PLUS", "guest"); ?>
			<?php else: ?>
				<?php echo KrMethods::sprintf("COM_KNOWRES_CREATED_BY_LBL_PLUS", "system"); ?>
			<?php endif; ?>
		</div>
	</div>
<?php endif; ?>