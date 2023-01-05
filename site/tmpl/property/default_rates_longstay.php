<?php
/**
 * @package    Know Reservations
 * @subpackage Site View
 * @copyright  2020 Best Holiday Homes. All rights reserved.
 * @license    See the file LICENSE.txt for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;
?>

<?php
if ($this->settings['longstay_days1'] == 0 && $this->settings['longstay_days2'] == 0
	&& $this->settings['longstay_days3'] == 0)
{
	return;
}
?>

<h6 style="margin-bottom:0;"><?php echo KrMethods::plain('COM_KNOWRES_PRICING_LONG_STAY'); ?></h6>
<ul>
	<?php if ($this->settings['longstay_days1'] > 0): ?>
		<?php $pc = abs($this->settings['longstay_percentage1'] - 100) . "%"; ?>
		<li>
			<?php echo KrMethods::sprintf('COM_KNOWRES_PRICING_LONG_STAY_PC', $this->settings['longstay_days1'] + 1,
				$pc); ?>
		</li>
	<?php endif; ?>

	<?php if ($this->settings['longstay_days2'] > 0): ?>
		<?php $pc = abs($this->settings['longstay_percentage2'] - 100) . "%"; ?>
		<li>
			<?php echo KrMethods::sprintf('COM_KNOWRES_PRICING_LONG_STAY_PC', $this->settings['longstay_days2'] + 1,
				$pc); ?>
		</li>
	<?php endif; ?>

	<?php if ($this->settings['longstay_days3'] > 0): ?>
		<?php $pc = abs($this->settings['longstay_percentage2'] - 100) . '%'; ?>
		<li>
			<?php echo KrMethods::sprintf('COM_KNOWRES_PRICING_LONG_STAY_PC', $this->settings['longstay_days3'] + 1,
				$pc); ?>
		</li>
	<?php endif; ?>
</ul>