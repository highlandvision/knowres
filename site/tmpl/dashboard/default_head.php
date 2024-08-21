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
if ($this->guest->id) {
	foreach ($this->items as $i) {
		$guestformlink = SiteHelper::buildDashboardLink($i, 'guestupdate');
	}
}
?>

<div class="grid-x grid-margin-x" data-equalizer data-equalize-on="medium">
	<div class="small-12 medium-8 cell">
		<div class="callout success" data-equalizer-watch>
			<h5><?php echo KrMethods::plain('COM_KNOWRES_WELCOME') . ' ' . $this->firstname; ?></h5>
			<p><?php echo KrMethods::plain('COM_KNOWRES_DASHBOARD_WELCOME'); ?></p>
		</div>
	</div>
	<div class="small-12 medium-4 cell">
		<div class="callout success" data-equalizer-watch>
			<div class="grid-x grid-margin-x">
				<div class="small-6 cell">
					<h5><?php echo KrMethods::plain('COM_KNOWRES_YOUR_DETAILS'); ?></h5>
				</div>
				<?php if ($guestformlink): ?>
					<div class="small-6 cell text-right">
						<a class="guestformlink button small" href="<?php echo $guestformlink; ?>"
						   title="<?php echo KrMethods::plain('COM_KNOWRES_DASHBOARD_UPDATE_ITEM'); ?>">
							&nbsp;<i style="color:#fefefe;" class="fa-solid fa-user-edit"></i>
						</a>
					</div>
				<?php endif; ?>
			</div>

			<?php echo $this->loadTemplate('guest'); ?>
		</div>
	</div>
</div>