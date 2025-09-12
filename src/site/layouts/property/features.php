<?php
/**
 * @package     Know Reservations
 * @subpackage  Layout
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

defined('_JEXEC') or die;

extract($displayData);
/**
 * Layout variables
 *
 * @var array $features Property features.
 */
?>

<?php if (count($features)): ?>
	<div class="amenity grid-x grid-margin-x small-up-2 large-up-3">
		<?php foreach ($features as $f): ?>
			<div class="cell">
				<p><?php echo $f->name; ?></p>
			</div>
		<?php endforeach; ?>
	</div>
<?php endif; ?>