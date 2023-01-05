<?php
/**
 * @package     KR
 * @subpackage  Admin Layouts
 * @copyright   Copyright (C) 2021 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Utility;
use Joomla\CMS\Object\CMSObject;

extract($displayData);
/**
 * Layout variables
 *
 * @var CMSObject $contract The contract item.
 */
?>

<div class="row">
	<div class="col-6">
		<?php echo KrMethods::plain('COM_KNOWRES_CONTRACTS_NET_PRICE'); ?>
	</div>
	<div class="col-3 text-end">
		<?php echo Utility::displayValue($contract->net_price, $contract->currency); ?>
	</div>
</div>