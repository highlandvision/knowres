<?php
/**
 * @package     Know Reservations
 * @subpackage  Site Layout
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;

$KRparams = KrMethods::getParams();

extract($displayData);
/**
 * Layout variables
 *
 * @var array $regions Regions data.
 */
?>

<?php $columns = count($regions); ?>
<?php $count = 0; ?>
<div class="dropdown-pane" id="kr-searchregion-drop" data-dropdown>
	<div class="row">
		<?php foreach ($regions as $k => $v): ?>
			<?php $count++; ?>
			<?php $end = ''; ?>
			<?php if ($count == $columns): ?>
				<?php $end = 'end'; ?>
			<?php endif; ?>
			<div class="small-12 large-2 columns small-uncollapse <?php echo $end; ?>">
				<h6><?php echo $k; ?></h6>
				<?php foreach ($v as $id => $r): ?>
					<a href="#" onclick="moduleSearch.setregion(<?php echo $id; ?>);">
						<?php echo $r; ?>
					</a><br>
				<?php endforeach; ?>
			</div>
		<?php endforeach; ?>
	</div>
</div>