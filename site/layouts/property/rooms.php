<?php
/**
 * @package     Know Reservations
 * @subpackage  Layout
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

use HighlandVision\KR\Translations;
use HighlandVision\KR\Utility;

defined('_JEXEC') or die;

extract($displayData);
/**
 * Layout variables
 *
 * @var array $rooms Rooms and spaces data.
 */

$Translations = new Translations();
?>

<?php if (count($rooms)): ?>
	<?php foreach ($rooms as $r): ?>
		<?php if (!$r->generic) : ?>
			<?php continue; ?>
		<?php endif; ?>

		<h6><?php echo $r->name; ?></h6>
		<?php $data = Utility::decodeJson($r->features); ?>
		<?php $string = ''; ?>
		<div class="amenity room grid-x grid-margin-x small-up-2 large-up-3">
			<?php foreach ($data as $d): ?>
				<div class="cell">
					<p>
						<?php $string = $Translations->getText('propertyfeature', $d->id); ?>
						<?php if ($d->count > 1): ?>
							<?php $string .= ' x ' . $d->count; ?>
						<?php endif; ?>
						<?php echo $string; ?>
					</p>
				</div>
			<?php endforeach; ?>
		</div>
	<?php endforeach; ?>
<?php endif; ?>