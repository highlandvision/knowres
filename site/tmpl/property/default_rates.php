<?php
/**
 * @package    Know Reservations
 * @subpackage Site Controller
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */
/** @noinspection PhpUnhandledExceptionInspection */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;

if (isset($this->item->p16) && $this->item->p16)
{
	echo $this->item->p16;

	return;
}

$this->rates = KrFactory::getListModel('rates')->getRatesForProperty($this->item->id, $this->today);
?>

	<h3 class="color-primary">
		<?php if ((int) $this->settings['tariffChargesStoredWeeklyYesNo']) : ?>
			<?php echo KrMethods::plain('COM_KNOWRES_PRICING_WEEKLY'); ?>
		<?php else: ?>
			<?php echo KrMethods::plain('COM_KNOWRES_PRICING_DAILY'); ?>
		<?php endif; ?>
	</h3>

	<div class="callout small italic" style="font-size:13px;">
		<?php echo KrMethods::plain('COM_KNOWRES_PRICING_DISCLAIMER'); ?>
	</div>

<?php if ($this->settings ['managed_rates']): ?>
	<?php echo $this->loadTemplate('rates_managed'); ?>
<?php else: ?>
	<?php echo $this->loadTemplate('rates_nonmanaged'); ?>
<?php endif; ?>

<?php echo $this->loadTemplate('rates_shortstay'); ?>
<?php echo $this->loadTemplate('rates_longstay'); ?>