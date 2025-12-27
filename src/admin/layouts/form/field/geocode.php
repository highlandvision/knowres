<?php
/**
 * @package         Joomla.Site
 * @subpackage      Layout
 * @copyright   (C) 2018 Open Source Matters, Inc. <https://www.joomla.org>
 * @license         GNU General Public License version 2 or later; see LICENSE.txt
 */

use HighlandVision\KR\Framework\KrMethods;

// phpcs:disable PSR1.Files.SideEffects
defined('_JEXEC') || die;
// phpcs:enable PSR1.Files.SideEffects

extract($displayData);
/**
 * Layout variables
 * -----------------
 *
 * @var   string $label Group label
 * @var   string $f1    Field 1
 * @var   string $f2    Field 2
 * @var   string $lat   Latitude
 * @var   string $lng   Longitude
 * @var   string $zoom  Zoom
 */
?>

<div class="control-group">
    <div class="control-label">
        <?php echo $label; ?>
    </div>
    <div class="controls">
        <div class="row">
            <a href="#" id="geocodeAddress">
                <?php echo KrMethods::plain('COM_KNOWRES_GEOCODE_ADDRESS'); ?>
            </a>
            <p><?php echo KrMethods::plain('COM_KNOWRES_GEOCODE_ADDRESS_INSTRUCTIONS'); ?></p>
            <div class="col-xl-6">
                <?php echo $f1; ?>
            </div>
            <div class="col-xl-6">
                <?php echo $f2; ?>
            </div>
        </div>
        <div class="row">
            <div id="mapdrag" data-lat="<?php echo $lat; ?>" data-lng="<?php echo $lng; ?>"
                 data-maxzoom="<?php echo $zoom; ?>" data-zoom="<?php echo $zoom; ?>">
            </div>
        </div>
    </div>
</div>