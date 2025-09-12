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

extract($displayData);
/**
 * Layout variables
 *
 * @var false|object $guestdata Guestdata row.
 */
?>

<div class="row mt-2">
	<div class="col-12 fw500">
		<?php echo KrMethods::plain('COM_KNOWRES_CONTRACTGUESTDATA_SECTION_EMERGENCY'); ?>
	</div>
	<div class="col-4">
		<?php echo KrMethods::plain('COM_KNOWRES_NAME'); ?>
	</div>
	<div class="col-8">
		<?php echo $guestdata->c_name; ?>
	</div>
	<div class="col-4">
		<?php echo KrMethods::plain('COM_KNOWRES_CONTRACTGUESTDATA_CONTACT_PHONE_LBL'); ?>
	</div>
	<div class="col-8">
		<?php echo $guestdata->c_phone; ?>
	</div>
	<div class="col-4">
		<?php echo KrMethods::plain('COM_KNOWRES_CONTRACTGUESTDATA_CONTACT_EMAIL_LBL'); ?>
	</div>
	<div class="col-8">
		<?php echo $guestdata->c_email; ?>
	</div>
</div>