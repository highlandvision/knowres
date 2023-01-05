<?php
/**
 * @package    Know Reservations
 * @subpackage Site Model
 * @copyright  2017 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

use HighlandVision\KR\Translations;
use Joomla\CMS\HTML\HTMLHelper;

extract($displayData);
/**
 * Layout variables
 *
 * @var array  $data  Extras data.
 * @var string $value Extra value.
 */

$Translations = new Translations();
$yesno        = [];
$yesno        = HTMLHelper::_('select.option', 0, JText::_('JNO'));
$yesno        = HTMLHelper::_('select.option', 1, JText::_('JYES'));
?>

<?php if (is_countable($data) && count($data)): ?>
	<fieldset class="extras">
		<legend><i class="fa fa-shopping-basket" aria-hidden="true"></i> <?php echo JText::_(
				'COM_KNOWRES_ENQURIY_EXTRAS'); ?></legend>

		<?php foreach ($data as $item) : ?>
			<?php
			$name        = $Translations->getText('extra', $item->id);
			$description = $Translations->getText('extra', $item->id, 'description');
			$id          = "extraquantity_" . $item->id;

			// Quantity select
			$min     = 0;
			$default = $value[$item->id]['quantity'] ?? 0;
			if ($item->mandatory)
			{
				$min     = 1;
				$default = $value[$item->id]['quantity'] ?? 1;
			}

			$hidden = '<input type="hidden" name="extraid[]" value="' . $item->id . '">';
			?>

			<div class="grid-x grid-margin-x">
				<div class="small-10 cell">
					<div class="form-floating-label has-value">
						<?php if ($item->max_quantity == 1): ?>
							<label class="extraslabel" for="<?php echo $id; ?>">
								<?php echo $name; ?>
								<?php if ($item->description) : ?>
									(<?php echo $item->description; ?>)
								<?php endif; ?>
							</label>
							<?php echo HTMLHelper::_('select.genericlist', $yesno, 'extraquantity[]',
								'style="width:60px;"', 'value', 'text', 0, $id); ?>
						<?php else: ?>
							<input type="number" id="<?php echo $id; ?>" style="width:4rem;" name="extraquantity[]"
							       value="<?php echo $default; ?>" max="<?php echo $item->max_quantity; ?>" step="1"
							       min="<?php echo $min; ?>" required="" aria-required="true">
							<label for="<?php echo $id; ?>">
								<?php echo $name; ?>
								<?php if ($item->description) : ?>
									(<?php echo $item->description; ?>)
								<?php endif; ?>
							</label>
						<?php endif; ?>
						<?php echo $hidden; ?>
					</div>
				</div>
			</div>
		<?php endforeach; ?>
	</fieldset>
<?php endif; ?>