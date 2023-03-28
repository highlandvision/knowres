<?php
/**
 * @package     Know Reservations
 * @subpackage  Site Layout
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

/** @noinspection PhpUnhandledExceptionInspection */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Media;
use HighlandVision\KR\TickTock;
use HighlandVision\KR\Utility;

extract($displayData);
/**
 * Layout variables
 *
 * @var false|object $contract Contract Item.
 * @var bool         $times    Truw to display times.
 */

if (!isset($times))
{
	$times = true;
}
$params = KrMethods::getParams();
$image  = Media\Images::getPropertyImageName($contract->property_id);
?>

<div class="row">
	<div class="small-12 columns">
		<h2 class="h4 color-dark no-margin-bottom">
			<?php echo $contract->property_name; ?>
			<?php echo trim($contract->property_area); ?>,&nbsp;
			<?php echo $contract->country_name; ?>
		</h2>
		<br>
	</div>
</div>
<div class="row">
	<div class="small-12 medium-6 columns">
		<?php
		$options = [
			'src'    => Media\Images::getImagePath($contract->property_id, 'solo', $image),
			'alt'    => $contract->property_name,
			'class'  => 'th responsive',
			'width'  => $params->get('max_property_width'),
			'height' => $params->get('max_property_height')
		];
		echo KrMethods::render('joomla.html.image', $options);
		?>
	</div>
	<div class="small-12 medium-6 columns">
		<dl class="fancylist" style="margin-bottom:0;">
			<div>
				<dt><?php echo KrMethods::plain('COM_KNOWRES_REFERENCE'); ?></dt>
				<dd><?php echo $contract->tag; ?></dd>
			</div>
			<div>
				<dt><?php echo KrMethods::plain('COM_KNOWRES_RESERVATION_TOTAL'); ?></dt>
				<dd><?php echo Utility::displayValue($contract->contract_total, $contract->currency); ?></dd>
			</div>
			<div>
				<dt><?php echo KrMethods::plain('COM_KNOWRES_STATUS'); ?></dt>
				<dd><?php echo Utility::getBookingStatus($contract->booking_status); ?></dd>
			</div>
			<div>
				<dt><?php echo KrMethods::plain('COM_KNOWRES_ARRIVAL'); ?></dt>
				<dd><?php echo TickTock::displayDate($contract->arrival, 'D j M Y'); ?>
					<?php if ($times): ?>
						<?php echo ' ' . KrMethods::sprintf('COM_KNOWRES_ARRIVAL_FROM', $contract->checkin_time); ?>
					<?php endif; ?>
				</dd>
			</div>
			<div>
				<dt><?php echo KrMethods::plain('COM_KNOWRES_DEPARTURE'); ?></dt>
				<dd><?php echo TickTock::displayDate($contract->departure, 'D j M Y'); ?>
					<?php if ($times): ?>
						<?php echo ' ' . KrMethods::sprintf('COM_KNOWRES_DEPARTURE_BY', $contract->checkout_time); ?>
					<?php endif; ?>
				</dd>
			</div>
			<div>
				<dt><?php echo KrMethods::plain('COM_KNOWRES_NIGHTS'); ?></dt>
				<dd><?php echo TickTock::differenceDays($contract->arrival, $contract->departure); ?></dd>
			</div>
			<div>
				<dt><?php echo KrMethods::plain('COM_KNOWRES_GUESTS'); ?></dt>
				<dd><?php echo $contract->guests; ?></dd>
			</div>
			<div>
				<dt><?php echo KrMethods::plain('COM_KNOWRES_ADULTS'); ?></dt>
				<dd><?php echo $contract->adults; ?></dd>
			</div>
			<?php if ($contract->children > 0): ?>
			<div>
				<dt><?php echo KrMethods::plain('COM_KNOWRES_CHILDREN'); ?></dt>
				<dd><?php echo $contract->children; ?></dd>
			</div>
			<div>
				<dt><?php echo KrMethods::plain('COM_KNOWRES_CHILD_AGES'); ?></dt>
				<dd>
					<?php echo implode(',', Utility::decodeJson($contract->child_ages, true)); ?>
				</dd>
			</div>
			<?php endif; ?>
			<?php if ($contract->agent_id) : ?>
				<p class="smaller">
					<i><?php echo KrMethods::sprintf('COM_KNOWRES_DASHBOARD_AGENT', $contract->agent_name); ?></i>
				</p>
			<?php endif; ?>
		</dl>
	</div>
</div>