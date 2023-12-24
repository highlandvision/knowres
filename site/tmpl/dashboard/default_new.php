<?php
/**
 * @package    Know Reservations
 * @subpackage Library
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */
/** @noinspection PhpUnhandledExceptionInspection */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\SiteHelper;

$guestformlink  = SiteHelper::buildDashboardLink($this->item, 'guestform');
$overview_modal = 'kr-overview-modal-' . $this->item->id;
$overview_url = KrMethods::route('index.php?option=com_knowres&view=dashboard&format=statement&key=' . $this->item->id,
	false);
?>

<div class="stacked button-group">
	<a href="<?php echo $guestformlink; ?>" class="button alert">
		<?php echo KrMethods::plain('COM_KNOWRES_DASHBOARD_PAY_DEPOSIT'); ?>
	</a>
	<a class="button" data-open="<?php echo $overview_modal; ?>">
		<?php echo KrMethods::plain('COM_KNOWRES_DASHBOARD_VIEW_CONTRACT'); ?>
	</a>
</div>

<div id="<?php echo $overview_modal; ?>" class="reveal kr-modal-with-rows kr-ajax-modal"
     data-ajaxurl="<?php echo $overview_url; ?>" data-v-offset="20" data-reveal>
</div>