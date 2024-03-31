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

		<h3 class="header"><?php echo $r->name; ?></h3>
		<?php if ($r->description && $r->name != $r->description): ?>
			<?php echo '<p>' . $r->description . '</p>'; ?>
		<?php endif; ?>
		<?php $data = Utility::decodeJson($r->features); ?>
		<?php $string = ''; ?>
		<?php foreach ($data as $d): ?>
			<?php $string .= $Translations->getText('propertyfeature', $d->id); ?>
			<?php if ($d->count > 1): ?>
				<?php $string .= ' x ' . $d->count . ', '; ?>
			<?php else: ?>
				<?php $string .= ', '; ?>
			<?php endif; ?>
		<?php endforeach; ?>
		<?php $string = rtrim($string, ', '); ?>
		<?php echo '<div class="amenities">' . $string . '</div>' ?>
	<?php endforeach; ?>
<?php endif; ?>