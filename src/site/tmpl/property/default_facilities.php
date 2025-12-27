<?php
/**
 * @package    Know Reservations
 * @subpackage Site View
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

use HighlandVision\KR\Framework\KrMethods;

// phpcs:disable PSR1.Files.SideEffects
defined('_JEXEC') or die;
// phpcs:enable PSR1.Files.SideEffects
?>

<!--  Text Fields -->
<?php foreach ($this->fields as $pf): ?>
    <?php if (!$pf->special && $pf->id > 1): ?>
        <?php $label = 'hp' . $pf->id; ?>
        <?php $field = 'p' . $pf->id; ?>
        <?php if (!empty(strip_tags($this->item->{$field}))): ?>
            <h3 class="h4 header"><?php echo $this->item->{$label}; ?></h3>
            <div class="section"><?php echo $this->item->{$field}; ?></div>
        <?php endif; ?>
    <?php endif; ?>
<?php endforeach; ?>

<!--  Rooms -->
<?php if (!empty($this->rooms) && count($this->rooms)): ?>
    <h3 class="h4 header"><?php echo KrMethods::plain('COM_KNOWRES_PROPERTY_TAB_ROOMS'); ?></h3>
    <div class="section rooms">
        <?php echo KrMethods::render('property.rooms', ['rooms' => $this->rooms]); ?>
    </div>
<?php endif; ?>

