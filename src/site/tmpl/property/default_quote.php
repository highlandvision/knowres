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

$max = $this->item->sleeps + $this->item->sleeps_extra + $this->item->sleeps_infant_max;
?>

<div class="small-12 cell">
	<h2 class="heading">
		<?php echo KrMethods::plain('COM_KNOWRES_QUOTE_GET'); ?>
	</h2>
	<p class="help small">
		<?php echo KrMethods::plain('COM_KNOWRES_QUOTE_INSTRUCTIONS'); ?>
	</p>
</div>
<form action="#" method="post" id="kr-quote-form" class="kr-search">
	<div class="grid-x grid-margin-x">
		<div class="small-6 medium-12 cell">
			<?php echo $this->form->renderField('qarrivaldsp',
			                                    null,
			                                    TickTock::getDate($this->arrival, 'j M Y')); ?>
		</div>
		<div class="small-6 medium-12 cell">
			<?php echo $this->form->renderField('qdeparturedsp',
			                                    null,
			                                    TickTock::getDate($this->departure, 'j M Y')); ?>
		</div>
		<div class="small-12 cell">
			<?php echo $this->form->renderField('guests', null, $this->searchData->guests, [
				'adults'     => $this->searchData->adults ?: 2,
				'children'   => $this->searchData->children ?: 0,
				'child_ages' => $this->searchData->child_ages ?: [],
				'max_guests' => $max,
				'infant_max' => $this->item->sleeps_infant_max,
				'infant_age' => $this->item->sleeps_infant_age,
				'fixed'      => true,
			]); ?>

			<?php echo KrMethods::render('property.partypane',
			                             ['adults'     => $this->searchData->adults ?: 2,
			                              'children'   => $this->searchData->children ?: 0,
			                              'child_ages' => $this->searchData->child_ages ?: [],
			                              'max_guests' => $max
			                             ]); ?>
		</div>
	</div>
	<?php echo HTMLHelper::_('form.token'); ?>

	<input type="hidden" name="option" value="com_knowres">
	<input type="hidden" name="property_id" value="<?php echo $this->item->id; ?>">
	<input type="hidden" name="arrival" id="qarrival" value="<?php echo $this->arrival; ?>">
	<input type="hidden" name="departure" id="qdeparture" value="<?php echo $this->departure; ?>">
	<input type="hidden" name="booking_type" value="<?php echo $this->item->booking_type; ?>">
	<input type="hidden" name="display_calendar" value="<?php echo $this->item->booking_type; ?>">
</form>
<div class="small-12 cell">
	<div id="kr-property-book" class="property-book"></div>
</div>