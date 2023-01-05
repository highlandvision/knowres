<?php
/**
 * @package     KR
 * @subpackage  Admin views
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Utility;
?>

<div class="row">
	<div class="col-12 col-xl-6">
		<div class="row" style="margin:40px 0 0;">
			<div class="col-3 col-xxl-2"></div>
			<div class="col-3 col-xxl-2 text-end">
				<?php echo KrMethods::plain('COM_KNOWRES_MENU_PROPERTY_STATISTICS_BOOKINGS'); ?>
			</div>
			<div class="col-2 text-end">
				<?php echo KrMethods::plain('COM_KNOWRES_MENU_PROPERTY_STATISTICS_DAYS'); ?>
			</div>
			<div class="col-3 col-xxl-2 text-end">
				<?php echo KrMethods::plain('COM_KNOWRES_MENU_PROPERTY_STATISTICS_REVENUE'); ?>
			</div>
			<div class="col-xxl-4">
			</div>
			<?php foreach ($this->period as $type => $value): ?>
				<div class="col-3 col-xxl-2">
					<?php echo $type; ?>
				</div>
				<div class="col-3 col-xxl-2 text-end">
					<?php echo $value[0]; ?>
				</div>
				<div class="col-2 text-end">
					<?php echo $value[1]; ?>
				</div>
				<div class="col-3 col-xxl-2 text-end">
					<?php echo Utility::displayValue($value[2], $this->settings['currency'], false); ?>
				</div>
				<div class="col-xxl-4">
				</div>
			<?php endforeach; ?>
		</div>
	</div>
	<div class="col-6 col-xl-6">
		<div id="<?php echo $this->chartid; ?>" style="width: 400px; height: 300px;"></div>
	</div>
</div>