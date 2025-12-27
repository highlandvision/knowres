<?php
/**
 * @package     Know Reservations
 * @subpackage  Admin Layout
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

use HighlandVision\KR\Utility;

// phpcs:disable PSR1.Files.SideEffects
defined('_JEXEC') || die;
// phpcs:enable PSR1.Files.SideEffects

extract($displayData);
/**
 * Layout variables
 *
 * @var false|object $quote The quote data.
 */
?>

<?php if (is_countable($quote->adjustments) && count($quote->adjustments)): ?>
    <?php foreach ($quote->adjustments as $k => $v) : ?>
        <div class="row infolist">
            <div class="col-3">
                <?php echo ucfirst($k); ?>
            </div>
            <div class="col-6">
                <?php if ($v['pc']): ?>
                    <?php echo
                        Utility::displayValue($v['calc'], $quote->currency, $quote->decimals) . ' @ ' . $v['pc']
                        . ' &#8773; ' . Utility::displayValue($v['value'], $quote->currency, $quote->decimals);
                    ?>
                <?php elseif ($v['calc']): ?>
                    <?php echo
                    Utility::displayValue($v['calc'], $quote->currency, $quote->decimals);
                    ?>
                <?php else: ?>
                    <?php echo $v['value']; ?>
                <?php endif; ?>
            </div>
        </div>
    <?php endforeach; ?>
<?php endif; ?>
