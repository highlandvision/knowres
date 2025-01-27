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

<div class="modal" id="cloneModal" aria-labelledby="clone-modal-label">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<h3 class="modal-title" id="clone-modal-label">
					<?php echo KrMethods::sprintf('COM_KNOWRES_PROPERTY_CLONE_WITHNAME', $this->item->property_name); ?>
				</h3>
				<button type="button" class="btn-close text-end" data-bs-dismiss="modal"></button>
			</div>

			<div class="modal-body">
				<form action="<?php echo KrMethods::route('index.php?option=com_knowres&task=property.cloner'); ?>"
				      class="form-validate" id="kr-property-clone-form" method="post" name="adminForm">
					<div id="newdata">
						<div class="row">
							<div class="col">
								<fieldset name="krdata">
									<br>
									<?php echo $this->formclone->renderFieldset('krdata'); ?>
								</fieldset>
								<fieldset name="kroptions">
									<?php echo KrMethods::plain('COM_KNOWRES_PROPERTY_CLONE_OPTIONS'); ?>
									<br><br>
									<?php echo $this->formclone->renderFieldset('kroptions'); ?>
								</fieldset>
							</div>
						</div>
					</div>

					<input type="hidden" name="jform[id]" value="<?php echo $this->item->id; ?>">
					<input type="hidden" name="jform[property_name]" value="<?php echo $this->item->property_name; ?>">
					<?php echo HTMLHelper::_('form.token'); ?>
				</form>
			</div>
			<div class="modal-footer">
				<button class="btn btn-primary" form="kr-property-clone-form" type="submit">
					<?php echo KrMethods::plain('COM_KNOWRES_PROPERTY_CLONE'); ?>
				</button>
				<button class="btn btn-danger" type="button" data-bs-dismiss="modal">
					<?php echo KrMethods::plain('JTOOLBAR_CANCEL'); ?>
				</button>
			</div>
		</div>
	</div>
</div>