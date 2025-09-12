<?php
/**
 * @package     Know Reservations
 * @subpackage  Admin Layout
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Utility;

extract($displayData);
/**
 * Layout variables
 *
 * @var object $quote The quote data.
 */
?>

<?php if (is_countable($quote->discounts) && count($quote->discounts)): ?>
	<?php if (count($quote->discounts) > 1): ?>
		<div class="row infolist">
			<div class="col-10">
				<?php echo KrMethods::plain('COM_KNOWRES_CONTRACTS_DISCOUNTS'); ?>
			</div>
		</div>
	<?php endif; ?>

	<?php foreach ($quote->discounts as $k => $v) : ?>
		<div class="row infolist">
			<div class="col-10">
				<?php echo ucfirst($k); ?>
				<?php if ($v['pc']): ?>
					<?php if ($v['base']): ?>
						<?php echo
							Utility::displayValue($v['base'], $quote->currency, $quote->decimals) . ' @ ' . $v['pc']
							. ' &#8773; ' . Utility::displayValue($v['value'], $quote->currency, $quote->decimals);
						?>
					<?php else: ?>
						<?php echo
							Utility::displayValue($v['calc'], $quote->currency, $quote->decimals) . ' @ ' . $v['pc']
							. ' &#8773; ' . Utility::displayValue($v['value'], $quote->currency, $quote->decimals);
						?>
					<?php endif; ?>
				<?php else: ?>
					<?php echo
					Utility::displayValue($v['value'], $quote->currency, $quote->decimals);
					?>
				<?php endif; ?>
			</div>
		</div>
	<?php endforeach; ?>
<?php endif; ?>