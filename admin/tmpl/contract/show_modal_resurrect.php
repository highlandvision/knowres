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
use HighlandVision\KR\Session as KrSession;
use Joomla\CMS\HTML\HTMLHelper;

$contractSession = new KrSession\Contract();
$contractSession->resetData();
$contractSession->updateData($this->item);
?>

<div class="modal" id="resurrectModal" aria-labelledby="resurrectModalLabel">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<form action="<?php echo KrMethods::route('index.php?option=com_knowres&id='
			                                          . (int) $this->item->id); ?>"
			      class="form-validate" id="kr-contract-resurrect-form" method="post" name="adminForm">
				<div class="modal-header">
					<h3 class="modal-title" id="resurrectModalLabel">
						<?php echo KrMethods::plain('COM_KNOWRES_CONTRACT_RESURRECT_RESERVATION'); ?>
					</h3>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>

				<div class="modal-body">
					<div class="row">
						<div class="col">
							<br>
							<fieldset>
								<?php echo $this->form->renderField('booking_status'); ?>
								<?php echo $this->form->renderField('expiry_days'); ?>
								<?php echo $this->form->renderField('balance_days'); ?>
								<?php echo $this->form->renderField('net_price'); ?>
							</fieldset>
						</div>
					</div>
				</div>

				<div class="modal-footer">
					<button class="btn btn-primary" type="button"
					        onclick="Knowres.submitform('contract.resurrect', document.getElementById('kr-contract-resurrect-form'), true);">
						<?php echo KrMethods::plain('COM_KNOWRES_CONTRACTS_RESURRECT'); ?>
					</button>
					<button class="btn btn-danger" type="button" data-bs-dismiss="modal">
						<?php echo KrMethods::plain('JTOOLBAR_CANCEL'); ?>
					</button>
				</div>

				<?php echo HTMLHelper::_('form.token'); ?>
				<input type="hidden" name="jform[id]" value="<?php echo $this->item->id; ?>">
				<input type="hidden" name="jform[cancelled]" value="0">
				<input type="hidden" name="jform[cancelled_timestamp]" value="">
				<input type="hidden" name="task" value="contract.resurrect">
			</form>
		</div>
	</div>
</div>