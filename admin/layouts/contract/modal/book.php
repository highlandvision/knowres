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
use Joomla\CMS\Form\Form;
use Joomla\CMS\HTML\HTMLHelper;

extract($displayData);
/**
 * Layout variables
 *
 * @var bool      $allow_block Allow block
 * @var bool      $allow_book  Allow booking
 * @var string    $arrival     Arrival date
 * @var string    $departure   Departure date
 * @var Form|null $form        Block form
 * @var int       $property_id ID of property
 */
?>

<div class="modal-header">
	<h3 class="modal-title" id="kr-contract-modal-book-label">
		<?php echo KrMethods::plain('COM_KNOWRES_PROPERTY_CALENDAR_MODAL'); ?>
	</h3>
	<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
</div>
<div class="modal-body">
	<div class="row">
		<div class="col">
			<?php if (!is_null($form)): ?>
				<br>
				<form action="<?php echo KrMethods::route('index.php?option=com_knowres&layout=edit'); ?>"
				      class="form-validate" id="adminForm" method="post" name="adminForm">

					<fieldset name="krdata">
						<?php echo $form->renderFieldset('krdata'); ?>
					</fieldset>

					<input type="hidden" name="action" value="block">
					<input type="hidden" name="jform[arrival]" id="arrival" value="<?php echo $arrival; ?>">
					<input type="hidden" name="jform[departure]" id="departure" value="<?php echo $departure; ?>">
					<input type="hidden" name="jform[id]" value="0">
					<input type="hidden" name="jform[property_id]" value="<?php echo $property_id; ?>">
					<input type="hidden" name="jform[black_booking]" value="1">
					<input type="hidden" name="task" id="task" value="">
					<?php echo HTMLHelper::_('form.token'); ?>
				</form>
			<?php endif; ?>
		</div>
	</div>
</div>
<div class="modal-footer">
	<?php if ($allow_block): ?>
		<button class="btn btn-primary" onclick="Knowres.submitform('contract.save')" type="button">
			<?php echo KrMethods::plain('COM_KNOWRES_PROPERTY_CALENDAR_MODAL_ADD_BLOCK') ?>
		</button>
	<?php endif; ?>
	<?php if ($allow_book): ?>
		<?php $link = KrMethods::route('index.php?option=com_knowres&view=contract&task=edit&layout=manager'); ?>
		<a class="btn btn-primary" id="newreservation" href="<?php echo $link; ?>">
			<?php echo KrMethods::plain('COM_KNOWRES_PROPERTY_CALENDAR_LINK'); ?>
		</a>
	<?php endif; ?>
	<button class="btn btn-danger" type="button" data-bs-dismiss="modal">
		<?php echo KrMethods::plain('JTOOLBAR_CLOSE'); ?>
	</button>
</div>