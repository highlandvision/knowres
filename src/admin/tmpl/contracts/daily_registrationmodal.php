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

<div class="modal" id="registrationModal" aria-labelledby="registration-modal-label">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<h3 class="modal-title" id="registration-modal-label">
					<?php echo KrMethods::sprintf('COM_KNOWRES_CONFIG_ADMIN_DOWNLOAD_REGISTRATION'); ?>
				</h3>
				<button type="button" class="btn-close text-end" data-bs-dismiss="modal"></button>
			</div>

			<div class="modal-body">
				<form action="<?php echo KrMethods::route('index.php?option=com_knowres&format=txt'); ?>"
				      class="form-validate" id="kr-registration-export-form" method="post" name="adminForm">
					<div class="row">
						<div class="col">
							<br>
							<fieldset name="krdata">
								<?php echo $this->registrationform->renderFieldset('krdata'); ?>
							</fieldset>
						</div>
					</div>
					<?php echo HTMLHelper::_('form.token'); ?>
					<input type="hidden" name="task" value="export.doregistration">
				</form>
			</div>
			<div class="modal-footer">
				<button class="btn btn-primary" form="kr-registration-export-form" type="submit">
					<?php echo KrMethods::plain('COM_KNOWRES_DOWNLOAD'); ?>
				</button>
				<button class="btn btn-danger" type="button" data-bs-dismiss="modal">
					<?php echo KrMethods::plain('JTOOLBAR_CANCEL'); ?>
				</button>
			</div>
		</div>
	</div>
</div>