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
use Joomla\CMS\HTML\HTMLHelper;
?>

<div class="modal" id="triggerModal" aria-labelledby="triggerModalLabel">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<form action="<?php echo KrMethods::route('index.php?option=com_knowres&task=contract.trigger'); ?>"
			      class="form-validate" id="kr-contract-trigger-form" method="post" name="adminForm">
				<div class="modal-header">
					<h3 class="modal-title" id="triggerModalLabel">
						<?php echo KrMethods::plain('COM_KNOWRES_CONTRACT_SEND_EMAIL'); ?>
					</h3>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>

				<div class="modal-body">
					<div class="row">
						<div class="col">
							<br>
							<?php echo $this->formtrigger->renderfieldset('krdata'); ?>
						</div>
					</div>
				</div>

				<div class="modal-footer">
					<button class="btn btn-primary" onclick="Joomla.submitbutton('contract.trigger');">
						<?php echo KrMethods::plain('COM_KNOWRES_CONTRACT_SEND_EMAIL'); ?>
					</button>
					<button class="btn btn-danger" type="button" data-bs-dismiss="modal">
						<?php echo KrMethods::plain('JTOOLBAR_CANCEL'); ?>
					</button>
				</div>

				<?php echo HTMLHelper::_('form.token'); ?>
				<input type="hidden" name="id" value="<?php echo $this->item->id; ?>">
				<input type="hidden" name="task" value="contract.trigger">
			</form>
		</div>
	</div>
</div>