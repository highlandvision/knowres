<?php
/**
 * @package     KR
 * @subpackage  Admin views
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\TickTock;
use HighlandVision\KR\Translations;

// phpcs:disable PSR1.Files.SideEffects
defined('_JEXEC') or die;
// phpcs:enable PSR1.Files.SideEffects
?>

<?php if (!count($this->upcoming)) : ?>
    <?php echo KrMethods::plain('COM_KNOWRES_NO_DATA_FOUND'); ?>
<?php endif; ?>

<?php foreach ($this->upcoming as $l) : ?>
    <div class="row-fluid">
        <div class="span12" style="padding-left:6px;">
            <i class='fa-solid fa-long-arrow-alt-right' aria-hidden="true"></i>
            <a href="<?php echo KrMethods::route('index.php?option=com_knowres&task=contract.show&id=' . $l->id); ?>">
                <?php echo KrMethods::sprintf('COM_KNOWRES_PROPERTYDASHBOARD_CONTRACTS_TEXT',
                        TickTock::displayDate($l->arrival, 'd M Y'), TickTock::differenceDays($l->arrival, $l->departure),
                        $l->firstname . ' ' . $l->surname, Translations::getCountryName($l->country_id)
                ); ?>
            </a>
        </div>
    </div>
<?php endforeach; ?>