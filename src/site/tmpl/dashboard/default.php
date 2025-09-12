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
use HighlandVision\KR\TickTock;
use HighlandVision\KR\Utility;

$wa = $this->document->getWebAssetManager();
$wa->useScript('com_knowres.site')
   ->useScript('form.validate')
   ->useScript('keepalive');
?>

<div id="kr-dashboard-reservations">
	<?php echo $this->loadTemplate('head'); ?>

	<?php for ($i = 0; $i < 2; $i++): ?>
		<?php $first = true; ?>
		<?php foreach ($this->items as $this->item) : ?>
			<?php if ($i == 1 && $this->item->departure >= TickTock::getDate()): ?>
				<?php continue; ?>
			<?php elseif ($i == 0 && $this->item->departure < TickTock::getDate()): ?>
				<?php continue; ?>
			<?php endif; ?>

			<?php if ($first): ?>
				<h2>
					<?php if ($i == 1): ?>
						<?php echo KrMethods::plain('COM_KNOWRES_YOUR_PREVIOUS'); ?>
					<?php else: ?>
						<?php echo KrMethods::plain('COM_KNOWRES_YOUR_RESERVATIONS'); ?>
					<?php endif; ?>
				</h2>
				<?php $first = false; ?>
			<?php endif; ?>

			<?php $this->item->child_ages = Utility::decodeJson(is_null($this->item->child_ages) ? '[]'
				                                                    : $this->item->child_ages,
			                                                    true); ?>
			<?php
			$invoice   = SiteHelper::getInvoice($this->item);
			$guestdata = SiteHelper::getGuestdata($this->item);
			$voucher   = SiteHelper::getVoucher($this->params, $this->item);
			$pdfs      = SiteHelper::getPdfs($this->item);
			?>

			<div class="callout medium">
				<div class="grid-x grid-margin-x">
					<div class="small-12 medium-8 cell">
						<?php echo KrMethods::render('dashboard.header', ['contract' => $this->item,
						                                                  'times'    => true
						]); ?>
					</div>
					<div class="small-12 medium-4 cell">
						<?php if ($this->item->booking_status > 1): ?>
							<?php echo $this->loadTemplate('confirmed'); ?>
						<?php else: ?>
							<?php echo $this->loadTemplate('new'); ?>
						<?php endif; ?>
						<div>
							<?php echo KrMethods::render('dashboard.downloads', [
								'invoice'   => $invoice,
								'guestdata' => $guestdata,
								'voucher'   => $voucher,
								'pdfs'      => $pdfs,
								'key'       => $this->item->id
							]); ?>
						</div>
					</div>
				</div>
			</div>
		<?php endforeach; ?>
	<?php endfor; ?>

	<br>
	<?php echo $this->loadTemplate('footer'); ?>
</div>