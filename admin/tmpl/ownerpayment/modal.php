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
use Joomla\CMS\HTML\HTMLHelper;

$this->form->setFieldAttribute('amount', 'addonAfter', $this->item->currency);
?>

<div class="modal-header">
	<h3 class="modal-title" id="kr-ownerpayment-modal-title">
		<?php echo KrMethods::plain('COM_KNOWRES_OWNERPAYMENT_TITLE'); ?>
	</h3>
	<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
</div>
<div class="modal-body">
	<form action="<?php echo KrMethods::route('index.php?option=com_knowres&layout=edit&id='
		. (int) $this->item->id); ?>" class="form-validate" id="kr-ownerpayment-form" method="post" name="adminForm">
		<div class="row">
			<div class="col">
				<br>
				<fieldset>
					<?php echo $this->form->renderFieldset('krdata'); ?>
				</fieldset>
			</div>
		</div>

		<?php echo HTMLHelper::_('form.token'); ?>
		<input type="hidden" name="task" value="ownerpayment.save">
	</form>
</div>
<div class="modal-footer">
	<button class="btn btn-primary" form="kr-ownerpayment-form" type="submit">
		<?php echo KrMethods::plain('COM_KNOWRES_UPDATE'); ?>
	</button>
	<button class="btn btn-danger" type="button" data-bs-dismiss="modal">
		<?php echo KrMethods::plain('JTOOLBAR_CANCEL'); ?>
	</button>
</div>