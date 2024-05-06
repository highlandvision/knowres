<?php
/**
 * @package    Know Reservations
 * @subpackage Site template
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

/** @noinspection PhpUnhandledExceptionInspection */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\SiteHelper;
use HighlandVision\KR\TickTock;
use HighlandVision\KR\Utility;

$paymentTotal = KrFactory::getListModel('contractpayments')->getPaymentTotal($this->item->id);
$feeTotal     = KrFactory::getListModel('contractfees')->getTotalForContract($this->item->id);

$balance_to_pay  = false;
$balance_due_now = false;
$balance         = round($this->item->contract_total + $feeTotal - $paymentTotal, 2);
if ($this->item->booking_status != 5 && $this->item->booking_status != 39 & $balance > 0)
{
	$balance_to_pay = true;
	$sevenb4        = TickTock::modifyDays($this->item->balance_date, 7, '-');
	if ($this->item->booking_status == 40 || $sevenb4 <= TickTock::getDate())
	{
		$balance_due_now = true;
	}
}
$this->key = $this->item->id;

$guestformlink             = SiteHelper::buildDashboardLink($this->item, 'guestform');
$paymentformlink           = SiteHelper::buildDashboardLink($this->item, 'paymentform');
$contractguestdataformlink = SiteHelper::buildDashboardLink($this->item, 'contractguestdataform');

$overview_modal = 'kr-overview-modal-' . $this->item->id;
$overview_url   = 'index.php?option=com_knowres&view=dashboard&format=statement&key=' . $this->item->id;

if ($this->item->guestdata_id > 0)
{
	$guestdata_modal = 'kr-guestdata-modal-' . $this->item->id;
	$guestdata_url   = KrMethods::route('index.php?option=com_knowres&view=dashboard&format=guestdata&key='
		. $this->key);
}
?>

<div class="stacked button-group">
	<?php if ($balance_to_pay) : ?>
		<?php $class = $balance_due_now ? "button alert" : "button"; ?>
		<a href="<?php echo $paymentformlink; ?>" class="<?php echo $class ?>">
			<?php echo KrMethods::sprintf('COM_KNOWRES_DASHBOARD_PAY_BALANCE',
				Utility::displayValue($balance, $this->item->currency)); ?>
		</a>
	<?php endif; ?>

	<a class="button" data-open="<?php echo $overview_modal; ?>">
		<?php echo KrMethods::plain('COM_KNOWRES_DASHBOARD_VIEW_CONTRACT'); ?>
	</a>

	<?php if ((int) $this->item->guestdata_id > 0) : ?>
		<a class="button" href="<?php echo $contractguestdataformlink; ?>">
			<?php echo KrMethods::plain('COM_KNOWRES_DASHBOARD_EDIT_CONTRACTGUESTDATA'); ?>
		</a>
	<?php else: ?>
		<a class="button alert" href="<?php echo $contractguestdataformlink; ?>">
			<?php echo KrMethods::plain('COM_KNOWRES_DASHBOARD_ADD_CONTRACTGUESTDATA'); ?>
		</a>
	<?php endif; ?>

	<?php $link = SiteHelper::getDirections($this->params, $this->item); ?>
	<?php if (!empty($link)) : ?>
		<a class="button secondary" title="<?php echo KrMethods::plain('COM_KNOWRES_PLAN_ROUTE_VIA'); ?>"
		   href="<?php echo $link; ?>" target="_blank">
			<?php echo KrMethods::plain('COM_KNOWRES_PLAN_ROUTE'); ?> <i class='fa-solid fa-external-link-alt'></i>
		</a>
	<?php endif; ?>
</div>

<div id="<?php echo $overview_modal; ?>" class="reveal kr-modal-with-rows kr-ajax-modal"
     data-ajaxurl="<?php echo $overview_url; ?>" data-v-offset="20" data-reveal>
</div>