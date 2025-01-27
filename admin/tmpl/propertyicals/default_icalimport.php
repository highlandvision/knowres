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

<div class="modal" id="icalimportModal" aria-labelledby="icalimportModalLabel">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<h2 class="modal-title" id="icalimportModalLabel">
					<?php echo KrMethods::plain('COM_KNOWRES_PROPERTYICALS_IMPORT'); ?>
				</h2>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
			</div>
			<div class="modal-body">
				<form action="<?php echo KrMethods::route('index.php?option=com_knowres&task=propertyical.import'); ?>"
				      enctype="multipart/form-data" method="post" name="kr-ical-import-form">
					<div class="row">
						<div class="col">
							<label for="formFile" class="form-label">
								<?php echo KrMethods::plain('COM_KNOWRES_PROPERTYICALS_IMPORT_CHOOSE'); ?>
							</label>
							<input accept=".ics" class="form-control" id="formFile" name="jform[files][file]"
							       type="file">
						</div>
					</div>

					<div class="modal-footer">
						<button class="btn btn-primary" type="submit">
							<?php echo KrMethods::plain('COM_KNOWRES_PROPERTYICALS_IMPORT'); ?>
						</button>
						<button type="button" class="btn btn-danger" data-bs-dismiss="modal">
							<?php echo KrMethods::plain('JTOOLBAR_CLOSE'); ?>
						</button>
					</div>

					<input type="hidden" name="property_id" value="<?php echo $this->property_id; ?>">
					<?php echo HTMLHelper::_('form.token'); ?>
				</form>
			</div>
		</div>
	</div>
</div>