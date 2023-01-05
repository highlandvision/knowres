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

<div class="modal" id="icalexportModal" aria-labelledby="icalexportModalLabel">
	<div class="modal-dialog modal-xl">
		<div class="modal-content">
			<div class="modal-header">
				<h2 class="modal-title" id="icalexportModalLabel">
					<?php echo KrMethods::plain('COM_KNOWRES_PROPERTYICALS_EXPORT'); ?>
				</h2>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
			</div>
			<div class="modal-body">
				<div class="row">
					<div class="col">
						<p><?php echo KrMethods::plain('COM_KNOWRES_PROPERTIES_ICS_LINK'); ?></p>
						<p class="lead">
							<?php echo KrMethods::getRoot(); ?>index.php?option=com_knowres&task=property.ics&id=<?php echo $this->property_id; ?>
						</p>
					</div>
				</div>
				<br>
				<div class="row">
					<br><br>
					<div class="col">
						<p><?php echo KrMethods::plain('COM_KNOWRES_PROPERTIES_ICS_DOWNLOAD'); ?></p>
						<p class="lead">
							<?php echo KrMethods::getRoot(); ?>index.php?option=com_knowres&task=property.ics&action=dl&id=<?php echo $this->property_id; ?>
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>