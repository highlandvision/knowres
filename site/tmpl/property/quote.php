<?php
/**
 * @package    Know Reservations
 * @subpackage Site View
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
use Joomla\CMS\HTML\HTMLHelper;

?>

<?php if (!empty($this->error)): ?>
	<h4 class="error-message">
		<?php echo $this->error; ?>
		<br><br>
	</h4>
<?php else: ?>
	<?php
	$currency   = $this->quote->getValue('currency');
	$price      = Utility::displayValue($this->quote->getValue('contract_total'), $currency);
	$price_text = KrMethods::plain('COM_KNOWRES_QUOTE_TOTAL');

	$discount = $this->quote->getValue('discount');
	if (!empty($discount)) {
		$discount = Utility::displayValue($this->quote->getValue('discount'), $currency);
		$total    = $this->quote->getValue('contract_total') + $this->quote->getValue('discount');
		$full     = Utility::displayValue($total, $currency);
	}

	$deposit = Utility::displayValue($this->quote->getValue('deposit'), $currency);
	if ($this->quote->getValue('booking_type') == 2) {
		$deposit_text = KrMethods::plain('COM_KNOWRES_CONFIRM_BOOK_DEPOSIT_DUE');
	} else {
		$deposit_text = KrMethods::plain('COM_KNOWRES_CONFIRM_REQUEST_DEPOSIT_DUE');
	}

	$Itemid = SiteHelper::getItemId('com_knowres', 'confirm', ['layout' => 'html']);
	$action = KrMethods::route('index.php?option=com_knowres&view=confirm&Itemid=' . $Itemid);
	?>

	<form action="<?php echo $action; ?>" method="post" id="kr-form-prebook">
		<div class="grid-x grid-margin-x">
			<div class="small-12 cell">
				<h4 class="no-margin-bottom"><?php echo $price_text; ?></h4>
				<p class="total-price big no-margin-bottom">
					<?php echo $price; ?>
				</p>

				<?php if (!empty($discount)): ?>
					<p class="discount no-margin-bottom">
						<i class='fa-solid fa-cut fa-1x'>&nbsp;</i>
						<?php echo KrMethods::plain('COM_KNOWRES_QUOTE_DISCOUNT_TEXT1'); ?>
						<del><?php echo $full; ?></del>
					</p>
				<?php endif; ?>

				<?php if (!empty($deposit)): ?>
					<div class="deposit">
						<h6>
							<i class='fa-solid fa-credit-card fa-1x'>&nbsp;</i><?php echo $deposit_text; ?>
						</h6>
						<p class="bigger"><?php echo $deposit; ?></p>
					</div>
				<?php endif; ?>

				<div class="booknow">
					<button class="button expanded large" type="submit">
						<?php echo KrFactory::getAdminModel('property')::bookingTypeText(
							$this->quote->getValue('booking_type')); ?>
					</button>
				</div>
			</div>
			<div class="small-12 cell">
				<div class="booking-summary text-center">
					<p>
						<?php echo KrMethods::plain('COM_KNOWRES_ARRIVAL') . ': '; ?>
						<span class="color-primary">
							<?php echo TickTock::displayDate($this->quote->getValue('arrival'), 'D, j F Y'); ?>
						</span>
						<br>
						<?php echo KrMethods::plain('COM_KNOWRES_DEPARTURE') . ': '; ?>
						<span class="color-primary">
							<?php echo TickTock::displayDate($this->quote->getValue('departure'), 'D, j F Y'); ?>
						</span>
						<br>
						<?php echo KrMethods::plain('COM_KNOWRES_GUESTS') . ': '; ?>
						<?php if (KrMethods::getParams()->get('search_adult_age', 0)): ?>
							<span class="color-primary">
								<?php echo KrMethods::plural('COM_KNOWRES_CONFIRM_ADULTS',
									$this->quote->getValue('adults')); ?>
								<?php if ($this->quote->getValue('children')): ?>
									<?php echo KrMethods::plural('COM_KNOWRES_CONFIRM_CHILDREN',
										$this->quote->getValue('children'),
										Utility::displayAges($this->quote->getValue('child_ages'))); ?>
								<?php endif; ?>
							</span>
						<?php else: ?>
							<span class="color-primary">
								<?php echo KrMethods::plural('COM_KNOWRES_CONFIRM_GUESTS',
									$this->quote->getValue('adults')); ?>
							</span>
						<?php endif; ?>
					</p>
				</div>
			</div>
		</div>
		<?php echo HTMLHelper::_('form.token'); ?>
	</form>
<?php endif; ?>