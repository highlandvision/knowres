<?php
/**
 * @package     KR
 * @subpackage  Admin Layouts
 * @copyright   Copyright (C) 2021 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;

extract($displayData);
/**
 * Layout variables
 *
 * @var false|object $contract     The contract item.
 * @var false|object $guest        The contract guest.
 * @var false|object $guestdata    The conract guest data.
 * @var false|object $property     The conract property data.
 * @var float        $balance      Current confirmed balance.
 * @var float        $balance_all  Current balance less unconfirmed payments.
 * @var bool         $access_level Access level of user.
 */

$params = KrMethods::getParams();
?>

<div class="row">
	<div class="col-12">
		<?php if (empty($guestdata->id)): ?>
			<?php echo KrMethods::plain('COM_KNOWRES_CONTRACTGUESTDATA_PENDING'); ?>
			<?php return; ?>
		<?php endif; ?>
	</div>
</div>

<?php echo KrMethods::render('contract.show.guestdata.boa', ['contract' => $contract, 'balance' => $balance]); ?>
<?php echo KrMethods::render('contract.show.guestdata.guestinfo', ['guestdata' => $guestdata]); ?>
<?php echo KrMethods::render('contract.show.guestdata.arrival', ['guestdata' => $guestdata]); ?>
<?php echo KrMethods::render('contract.show.guestdata.departure', ['guestdata' => $guestdata]); ?>

<?php if ($access_level > 10 || ($access_level == 10 && $params->get('show_emergency'))): ?>
	<?php echo KrMethods::render('contract.show.guestdata.emergency', ['guestdata' => $guestdata]); ?>
<?php endif; ?>

<?php $options = KrFactory::getListModel('propertyoptions')
                          ->getPropertyOptionsForProperty($contract->property_id); ?>
<?php if (is_countable($options) && count($options)): ?>
	<?php echo KrMethods::render('contract.show.guestdata.options',
		['guestdata' => $guestdata, 'options' => $options]); ?>
	<br>
<?php endif; ?>

<?php if ($guestdata->preferences) : ?>
	<div class="fw500"><?php echo KrMethods::plain('COM_KNOWRES_CONTRACTGUESTDATA_PREFERENCES_LBL'); ?></div>
	<?php echo nl2br($guestdata->preferences); ?>
<?php endif; ?>