<?php
/**
 * @package    Know Reservations
 * @subpackage Site Views
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */
/** @noinspection PhpUnhandledExceptionInspection */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\SiteHelper;

$guestformlink = false;
if ($this->guest->id)
{
	foreach ($this->items as $i)
	{
		$guestformlink = SiteHelper::buildDashboardLink($i, 'guestupdate');
	}
}
?>

<div class="row" data-equalizer data-equalize-on="medium">
	<div class="small-12 medium-7 columns">
		<div class="callout success" data-equalizer-watch>
			<h5><?php echo KrMethods::plain('COM_KNOWRES_WELCOME') . ' ' . $this->firstname; ?></h5>
			<p><?php echo KrMethods::plain('COM_KNOWRES_DASHBOARD_WELCOME'); ?></p>
		</div>
	</div>
	<div class="small-12 medium-4 medium-offset-1 columns">
		<div class="callout success" data-equalizer-watch>
			<div class="row">
				<div class="small-6 columns">
					<h5><?php echo KrMethods::plain('COM_KNOWRES_YOUR_DETAILS'); ?></h5>
				</div>
				<?php if ($guestformlink): ?>
					<div class="small-6 columns text-right">
						<a class="button small" style="margin-bottom:0;" href="<?php echo $guestformlink; ?>">
							<?php echo KrMethods::plain('COM_KNOWRES_DASHBOARD_UPDATE_ITEM'); ?>
							&nbsp;<i style="color:#fefefe;" class="fas fa-user-edit"></i>
						</a>
					</div>
				<?php endif; ?>
			</div>

			<?php echo $this->loadTemplate('guest'); ?>
		</div>
	</div>
</div>