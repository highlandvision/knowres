<?php
/**
 * @package     Know Reservations
 * @subpackage  Layout
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;

extract($displayData);
/**
 * Layout variables
 *
 * @var array $features Property features.
 */
?>

<?php if (count($features)): ?>
	<h4><?php echo KrMethods::plain('COM_KNOWRES_PROPERTY_TAB_FACILITIES'); ?></h4>
	<div class="kr-amenities row small-up-2 medium-up-2 large-up-3">
		<?php foreach ($features as $f): ?>
			<div class="column">
				<i class="fas fa-star"></i> <?php echo $f->name; ?>
			</div>
		<?php endforeach; ?>
	</div>
<?php endif; ?>