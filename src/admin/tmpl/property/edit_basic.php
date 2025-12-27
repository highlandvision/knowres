<?php
/**
 * @package     KR
 * @subpackage  Admin views
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;

// phpcs:disable PSR1.Files.SideEffects
defined('_JEXEC') or die;
// phpcs:enable PSR1.Files.SideEffects

/** @var HighlandVision\Component\Knowres\Administrator\View\Property\HtmlView $this */

if ($this->item->booking_type === 0) {
    $this->form->setFieldAttribute('price_summary', 'type', 'text');
}

if (!empty($this->item->id)) {
    $channels = KrFactory::getListModel('servicexrefs')->getChannels($this->item->id);
    if (empty($channels)) {
        $this->form->setFieldAttribute('channel_name', 'type', 'hidden');
    }
} else {
    $this->form->setFieldAttribute('channel_name', 'type', 'hidden');
}
?>

<div class="row">
    <div class="col-xl-9 col-xxl-8">
        <?php echo $this->form->renderFieldset('basic'); ?>
    </div>
    <div class="col-xl-3 offset-xxl-1">
        <?php echo KrMethods::render('joomla.edit.global', $this); ?>
    </div>
</div>