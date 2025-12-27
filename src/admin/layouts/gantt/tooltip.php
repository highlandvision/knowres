<?php
/**
 * @package     KR
 * @subpackage  Admin views
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

use HighlandVision\KR\TickTock;
use HighlandVision\KR\Utility;

// phpcs:disable PSR1.Files.SideEffects
defined('_JEXEC') || die;
// phpcs:enable PSR1.Files.SideEffects

extract($displayData);
/**
 * Layout variables
 *
 * @var object $data Tooltip data from contract.
 */
?>

<div>
    <i class='fa-solid fa-lg fa-mobile-alt'>&nbsp;</i>
    <span><?php echo Utility::formatPhoneNumber($data->mobile, $data->mobile_country_id); ?></span>
</div>
<?php if ($data->email): ?>
    <div>
        <i class='fa-solid fa-envelope'>&nbsp;</i>
        <span><?php echo $data->email; ?></span>
    </div>
<?php endif; ?>
<div>
    <i class='fa-solid fa-lg fa-calendar-alt'>&nbsp;</i>
    <?php echo TickTock::displayDate($data->arrival) . ' - ' . TickTock::displayDate($data->departure); ?>
</div>