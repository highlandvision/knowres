<?php
/**
 * @package     Know Reservations
 * @subpackage  Site Layout
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
 * @var string $invoice   Invoice download link.
 * @var string $voucher   Voucher download  link.
 * @var string $guestdata Guest data download link.
 * @var array  $pdfs      PDF download links.
 */
?>

<?php if ($invoice || $voucher || $guestdata || count($pdfs)): ?>
	<div class="callout small accent">
		<p><?php echo strtoupper(KrMethods::plain('COM_KNOWRES_YOUR_DOCUMENTS')); ?></p>

		<ul class="download">
			<?php if ($invoice): ?>
				<li>
					<i class='fa-solid fa-2x fa-file-pdf red'></i>
					<?php echo $invoice; ?>
				</li>
			<?php endif; ?>
			<?php if ($voucher): ?>
				<li>
					<i class='fa-solid fa-2x fa-file-pdf red'></i>
					<?php echo $voucher; ?>
				</li>
			<?php endif; ?>
			<?php if ($guestdata): ?>
				<li>
					<i class='fa-solid fa-2x fa-file-pdf red'></i>
					<?php echo $guestdata; ?>
				</li>
			<?php endif; ?>
			<?php if (count($pdfs)): ?>
				<?php foreach ($pdfs as $d) : ?>
					<li>
						<i class='fa-solid fa-2x fa-file-pdf red'></i>
						<?php echo $d; ?>
					</li>
				<?php endforeach; ?>
			<?php endif; ?>
		</ul>
	</div>
<?php endif; ?>