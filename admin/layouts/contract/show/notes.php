<?php
/**
 * @package     KR
 * @subpackage  Admin layouts
 * @copyright   Copyright (C) 2021 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

/** @noinspection PhpUnhandledExceptionInspection */

use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\TickTock;
use Joomla\CMS\Session\Session;

extract($displayData);
/**
 * Layout variables
 *
 * @var false|object $contract   The contract item.
 * @var array        $notes      The contract notes.
 * @var bool         $allow_edit User allowed an edit.
 */

$confirm = KrMethods::plain('COM_KNOWRES_JS_CONFIRM');
?>

<?php foreach ($notes as $n) : ?>
	<div class="row">
		<div class="col-4">
			<?php if ($n->updated_by_name) : ?>
				<i class="fas fa-xs fa-user-edit grey"></i> <?php echo $n->updated_by_name; ?>
			<?php elseif ($n->created_by_name) : ?>
				<i class="fas fa-xs fa-user grey"></i> <?php echo $n->created_by_name; ?>
			<?php elseif ($contract->guest_name && $n->note_type !== '["3"]') : ?>
				<i class="fas fa-xs fa-globe grey"></i> <?php echo $contract->guest_name; ?>
			<?php else: ?>
				<i class="fas fa-xs fa-robot grey"></i> Auto
			<?php endif; ?>
		</div>
		<div class="col-4">
			<b><?php echo KrFactory::getAdminModel('contractnote')::contractNoteTypes($n->note_type); ?></b>
		</div>
		<div class="col-4 text-end">
			<?php if ($allow_edit) : ?>
				<div class="text-end">
					<?php if ($n->note_type != '["3"]') : ?>
						<a href="<?php echo KrMethods::route('index.php?option=com_knowres&task=contractnote.edit&id='
							. $n->id, false); ?>">
							<i class="fas fa-edit"></i> <?php echo KrMethods::plain('COM_KNOWRES_EDIT'); ?>
						</a>&nbsp;&nbsp;

						<?php $href = KrMethods::route('index.php?option=com_knowres&task=contractnotes.delete&cid='
							. $n->id . '&' . Session::getFormToken() . '=1'); ?>

						<a onclick="return confirm('<?php echo $confirm; ?>')" href="<?php echo $href; ?>">
							<i class="fas fa-times-circle"></i>
							<?php echo KrMethods::plain('COM_KNOWRES_DELETE'); ?>
						</a>
					<?php endif; ?>
				</div>
			<?php endif; ?>
		</div>
	</div>
	<div class="row">
		<div class="col-4">
			<?php
			$n->created_at = $n->created_at == '0000-00-00 00:00:00' ? $contract->created_at : $n->created_at;
			?>
			<?php if ($n->updated_by_name) : ?>
				<?php echo TickTock::displayTS($n->updated_at); ?>
			<?php elseif ($n->created_by_name) : ?>
				<?php echo TickTock::displayTS($n->created_at); ?>
			<?php elseif ($contract->guest_name && $n->note_type !== '["3"]') : ?>
				<?php echo TickTock::displayTS($n->created_at); ?>
			<?php else: ?>
				<?php echo TickTock::displayTS($n->created_at); ?>
			<?php endif; ?>
		</div>
		<div class="col-8">
			<?php echo nl2br($n->note); ?>
		</div>
	</div>
	<hr>
<?php endforeach; ?>

<!--System creation-note-->
<div class="row">
	<div class="col-4">
		<?php if ($contract->created_by_name): ?>
			<i class="fas fa-xs fa-user grey"></i> <?php echo $contract->created_by_name; ?>
		<?php elseif ($contract->service_name): ?>
			<i class="fas fa-xs fa-headphones grey"></i> <?php echo $contract->service_name; ?>
		<?php elseif ($contract->guest_name) : ?>
			<i class="fas fa-xs fa-globe grey"></i> <?php echo $contract->guest_name; ?>
		<?php endif; ?>
		<br>
		<?php echo TickTock::displayTS($contract->created_at); ?>
	</div>
	<div class="col-8">
		<b><?php echo "System"; ?></b><br>
		<?php if ($contract->created_by_name) : ?>
			<?php echo KrMethods::sprintf("COM_KNOWRES_CREATED_BY_LBL_PLUS", "manager"); ?>
		<?php elseif ($contract->service_name): ?>
			<?php echo KrMethods::sprintf("COM_KNOWRES_CREATED_BY_LBL_PLUS", "channel"); ?>
		<?php elseif ($contract->guest_name) : ?>
			<?php echo KrMethods::sprintf("COM_KNOWRES_CREATED_BY_LBL_PLUS", "guest"); ?>
		<?php else: ?>
			<?php echo KrMethods::sprintf("COM_KNOWRES_CREATED_BY_LBL_PLUS", "system"); ?>
		<?php endif; ?>
	</div>
</div>