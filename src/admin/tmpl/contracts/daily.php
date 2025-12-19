<?php

/**
 * @package     KR
 * @subpackage  Admin views
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;
use Joomla\CMS\Factory;

$wa = Factory::getDocument()->getWebAssetManager();
$wa->useScript('keepalive')
   ->useScript('bootstrap.modal');

if (is_countable($this->lines) && count($this->lines)): ?>
    <div class="accordion">
        <div class="row no-gutters">
            <div class="col">
                <?php
                echo $this->loadTemplate('requests');
                echo $this->loadTemplate('payments');
                echo $this->loadTemplate('option');
                echo $this->loadTemplate('new');
                echo $this->loadTemplate('duedeposit');
                echo $this->loadTemplate('overduebalance');
                echo $this->loadTemplate('duebalance');
                echo $this->loadTemplate('cancelled');
                echo $this->loadTemplate('arrivals');
                echo $this->loadTemplate('departures');
                echo $this->loadTemplate('ownerpayments');
                echo $this->loadTemplate('reviews');
                echo $this->loadTemplate('approvals');
                if ($this->registration) {
                    echo $this->loadTemplate('registrationmodal');
                }
                ?>
            </div>
        </div>
    </div>

    <?php return; ?>
<?php endif; ?>

<div class="main-card" style="padding:1rem;">
    <div class="row">
        <h2>
            <?php echo KrMethods::plain('COM_KNOWRES_CONTRACTS_OVERVIEW_EMPTY'); ?>
        </h2>
    </div>
</div>