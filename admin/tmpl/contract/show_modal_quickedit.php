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
use HighlandVision\KR\Session as KnowresSession;
use Joomla\CMS\HTML\HTMLHelper;

$contractSession = new KnowresSession\Contract();
$contractSession->resetData();
$contractSession->updateData($this->item);
?>

<div class="modal" id="quickModal" aria-labelledby="quickModalLabel">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<h3 class="modal-title" id="quickModalLabel">
					<?php echo KrMethods::plain('COM_KNOWRES_CONTRACT_QUICK_EDIT'); ?>
				</h3>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
			</div>
			<div class="modal-body">
				<form action="<?php echo KrMethods::route('index.php?option=com_knowres&id=' . (int) $this->item->id); ?>"
					class="form-validate" id="kr-contract-quick-form" method="post" name="adminForm">
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

					<?php echo HTMLHelper::_('form.token'); ?>
					<input type="hidden" name="jform[id]" value="<?php echo $this->item->id; ?>">
					<input type="hidden" name="task" value="contract.quick">
				</form>
			</div>

			<div class="modal-footer">
				<button class="btn btn-primary" type="button"
				        onclick="Knowres.submitform('contract.quick', document.getElementById('kr-contract-quick-form'), true);">
					<?php echo KrMethods::plain('COM_KNOWRES_UPDATE'); ?>
				</button>
				<button class="btn btn-danger" type="button" data-bs-dismiss="modal">
					<?php echo KrMethods::plain('JTOOLBAR_CANCEL'); ?>
				</button>
			</div>
		</div>
	</div>
</div>