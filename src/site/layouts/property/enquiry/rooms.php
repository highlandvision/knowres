<?php
/**
 * @package     KR
 * @subpackage  <Enter sub package>
 * @copyright   Copyright (C) 2018 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Translations;

extract($displayData);
/**
 * Layout variables
 *
 * @var array $rooms Available rooms.
 * @var array $value Field value.
 */

$Translations = new Translations();
$count        = 0;
?>

<?php if (count($data)): ?>
	<fieldset class="fieldset">
		<legend>
			<i class="fa fa-bed" aria-hidden="true"></i> <?php echo KrMethods::plain('COM_KNOWRES_ENQURIY_ROOMS'); ?>
		</legend>

		<?php foreach ($data as $d): ?>
			<?php if ((int) $d->room_id && (int) $d->sleeps): ?>
				<?php $id = 'rooms_' . $d->room_id; ?>
				<?php $default = $value[$count]->number ?? 0; ?>

				<div class="grid-x grid-margin-x">
					<div class="small-12 cell">
						<div class="form-floating-label has-value">
							<input type="number" id="<?php echo $id; ?>" name="rooms[]" style="width:4rem;"
							       value="<?php echo $default; ?>" max="<?php echo $d->maxsell; ?>" step="1" min="0"
							       required="" aria-required="true">
							<label for="<?php echo $id; ?>">
								<?php echo $Translations->getText('room', $d->room_id); ?>
								(<?php echo KrMethods::plain('COM_KNOWRES_SLEEPS') . ' ' . $d->sleeps; ?>)
							</label>
						</div>
					</div>
				</div>
				<?php $count++; ?>
			<?php endif; ?>
		<?php endforeach; ?>
	</fieldset>
<?php endif; ?>