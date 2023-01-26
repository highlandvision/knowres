<?php
/**
 * @package    Know Reservations
 * @subpackage Site View
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

/** @noinspection PhpUnhandledExceptionInspection */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;
use Joomla\CMS\HTML\HTMLHelper;
?>

<?php echo KrMethods::render('property.features', ['features' => $this->features]); ?>

<?php if (is_countable($this->bedtypes) && count($this->bedtypes)): ?>
	<?php $data = $this->item->bed_types; ?>
	<?php if (is_countable($data) && count($data)): ?>
		<?php foreach ($data as $d) : ?>
			<?php $text = 'COM_KNOWRES_ROOMTYPE_' . $d['room_id']; ?>

			<div class="aroom">
				<?php $bed_types = !empty($d['bed_types']) ? $d['bed_types'] : []; ?>
				<?php $first = true; ?>

				<?php foreach ($this->bedtypes as $b) : ?>
					<?php $bed_number = isset($bed_types[$b->id]) ? $bed_types[$b->id]['bed_number'] : 0; ?>
					<?php for ($n = 0; $n < $bed_number; $n++) : ?>
						<?php if ($first) : ?>
							<?php if (!$d['room_number']) : ?>
								<h5><?php echo KrMethods::plain($text); ?></h5>
							<?php else : ?>
								<h5><?php echo KrMethods::plain($text) . ' ' . $d['room_number']; ?></h5>
							<?php endif; ?>

							<?php $first = false; ?>
						<?php endif; ?>

						<div class="abed">
							<?php list($width, $height) = getimagesize($b->bedicon); ?>
							<?php echo HTMLHelper::_('image', $b->bedicon, $b->name, [
								'title'  => $b->name,
								'width'  => $width,
								'height' => $height
							]); ?>
							<br>
							<?php echo $b->name; ?>
						</div>
					<?php endfor; ?>
				<?php endforeach; ?>
			</div>
		<?php endforeach; ?>
		<div style="clear:both;"></div>
	<?php endif; ?>
<?php endif; ?>

<!--  Layout & Floorplan -->
<?php if ($this->item->p5): ?>
	<h4><?php echo $this->item->hp5 ?></h4>
	<p><?php echo $this->item->p5; ?></p>
<?php endif; ?>

<!--  Exterior -->
<?php if ($this->item->p6): ?>
	<h4><?php echo $this->item->hp6 ?></h4>
	<p><?php echo $this->item->p6; ?></p>
<?php endif; ?>

<!--  Sports & Activities -->
<?php if ($this->item->p9): ?>
	<h4><?php echo $this->item->hp9; ?></h4>
	<p><?php echo $this->item->p9 ?></p>
<?php endif; ?>

<!--  Suitability -->
<?php if ($this->item->p7): ?>
	<h4><?php echo $this->item->hp7; ?></h4>
	<p><?php echo $this->item->p7; ?></p>
<?php endif; ?>

<!--  Notes & Extras -->
<?php if ($this->item->p8): ?>
	<h4><?php echo $this->item->hp8; ?></h4>
	<p><?php echo $this->item->p8; ?></p>
<?php endif; ?>

