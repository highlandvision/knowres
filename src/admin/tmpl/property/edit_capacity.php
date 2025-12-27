<?php
/**
 * @package     KR
 * @subpackage  Admin views
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

/** @var HighlandVision\Component\Knowres\Administrator\View\Property\HtmlView $this */

// phpcs:disable PSR1.Files.SideEffects
defined('_JEXEC') or die;
// phpcs:enable PSR1.Files.SideEffects
?>

<div class="row">
    <div class="col-lg-8">
        <?php echo $this->form->renderFieldset('capacity'); ?>
    </div>
</div>