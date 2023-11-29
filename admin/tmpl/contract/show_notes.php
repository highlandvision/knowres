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

<div class="card kr-card">
	<div class="card-header">
		<a class="showbefore collapsed" data-bs-toggle="collapse" href="#panel-collapse-notes" role="button"
		   aria-expanded="false" aria-controls="panel-collapse-notes">
			<?php echo KrMethods::plain('COM_KNOWRES_NOTES'); ?>
		</a>
		<?php if ($this->access_level > 10): ?>
			<span class="float-end">
				<a href="<?php echo KrMethods::route('index.php?option=com_knowres&task=contractnote.edit', false); ?>">
					<i class='fa-solid fa-plus-square'></i>
					<?php echo KrMethods::plain('COM_KNOWRES_ADD'); ?>
				</a>
			</span>
		<?php endif; ?>
	</div>
	<div class="collapse" id="panel-collapse-notes">
		<div class="card-body">
			<?php echo KrMethods::render('contract.show.notes',
				['contract'   => $this->item,
				 'notes'      => $this->notes,
				 'allow_edit' => $this->access_level > 10
				]);
			?>
		</div>
	</div>
</div>