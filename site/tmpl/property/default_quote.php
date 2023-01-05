<?php
/**
 * @package    Know Reservations
 * @subpackage Site View
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\TickTock;
use Joomla\CMS\HTML\HTMLHelper;
?>

<div class="kr-quote no-margin-bottom" style="margin-top:0;">
	<h3 class="h2 kr-quote-heading">
		<?php echo KrMethods::plain('COM_KNOWRES_QUOTE_GET'); ?>
	</h3>
	<p class="help">
		<?php echo KrMethods::plain('COM_KNOWRES_QUOTE_INSTRUCTIONS'); ?>
	</p>

	<form action="#" method="post" id="kr-quote-form">
		<div class="row">
			<div class="small-12 columns">
				<?php echo $this->form->renderField('qarrivaldsp', null,
					TickTock::getDate($this->arrival, 'j M Y')); ?>
			</div>
			<div class="small-12 columns">
				<?php echo $this->form->renderField('qdeparturedsp', null,
					TickTock::getDate($this->departure, 'j M Y')); ?>
			</div>
			<div class="small-12 columns">
				<?php echo $this->form->renderField('guests', null, $this->searchData->guests,
					['adults' => $this->searchData->adults, 'children' => $this->searchData->children]); ?>
			</div>
		</div>

		<!--		TODO-V4.1 reinstate-->
		<!--		--><?php //echo KrMethods::render('property.partysize', ['defaults' => $this->searchData, 'item' => $this->item]); ?>

		<?php echo HTMLHelper::_('form.token'); ?>
		<input type="hidden" name="option" value="com_knowres">
		<input type="hidden" name="property_id" value="<?php echo $this->item->id; ?>">
		<input type="hidden" name="arrival" id="qarrival" value="<?php echo $this->arrival; ?>">
		<input type="hidden" name="departure" id="qdeparture" value="<?php echo $this->departure; ?>">
		<input type="hidden" name="booking_type" value="<?php echo $this->item->booking_type; ?>">
		<input type="hidden" name="display_calendar" value="<?php echo $this->item->booking_type; ?>">
	</form>
</div>

<div id="kr-bookmodule" class="text-center"></div>