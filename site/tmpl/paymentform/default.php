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
use Joomla\CMS\HTML\HTMLHelper;

$wa = $this->document->getWebAssetManager();
$wa->useScript('com_knowres.site')
   ->useScript('form.validate')
   ->useScript('keepalive');

$termsurl = KrMethods::route('index.php?option=com_knowres&task=property.terms&id=' . $this->property->id, false);
?>

<div id="kr-payment" class="grid-x grid-margin-x">
	<div class="small-12 medium-10 medium-offset-1 large-8 large-offset-2 cell">
		<h1><?php echo KrMethods::plain('COM_KNOWRES_MAKE_A_PAYMENT'); ?></h1>

		<form action="<?php echo KrMethods::route('index.php?option=com_knowres&task=payment.router'); ?>"
		      class="ajaxform form-validate" id="kr-form-payment" method="post">

			<?php echo KrMethods::render('dashboard.header',
				['contract' => $this->contract,
				 'times'    => false
				]); ?>
			<br>

			<fieldset class="fieldset">
				<?php if ($this->contract->cancelled): ?>
					<div class="callout formbg small">
						<div class="grid-x grid-margin-x">
							<div class="small-12 cell">
								<h4>
									This reservation has been cancelled and payment cannot be taken.
									<br><br>
									If you would like to proceed with the reservation then please contact us.
								</h4>
							</div>
						</div>
					</div>
				<?php else: ?>
					<?php echo $this->loadTemplate('payments'); ?>
					<!--				// TODO-v4.3 Delete related code-->
					<!--					<h4>-->
					<!--						--><?php //echo KrMethods::plain('COM_KNOWRES_ACCOUNT_SUMMARY'); ?>
					<!--					</h4>-->
					<!--					--><?php //echo $this->loadTemplate('summary'); ?>
				<?php endif; ?>
			</fieldset>

			<?php echo HTMLHelper::_('form.token'); ?>
			<input type="hidden" name="id" value="0">
			<input type="hidden" name="jform[id]" value="0">
			<input type="hidden" name="contract_id" value="<?php echo $this->contract->id; ?>">
		</form>
	</div>
</div>

<div id="errorModal" class="reveal tiny" data-reveal>
	<button class="close-button" data-close aria-label="Close modal" type="button">
		<span aria-hidden="true">&times;</span>
	</button>
	<?php echo KrMethods::plain('COM_KNOWRES_PAYMENT_ERROR'); ?>
</div>

<div id="kr-terms-modal" class="reveal small kr-ajax-modal" data-reveal data-v-offset="0"
     data-ajaxurl="<?php echo $termsurl; ?>"></div>
<div id="ajaxModal" class="reveal medium" data-reveal></div>
<div id="kr-gateway-modal" class="reveal small" data-reveal data-v-offset="75"></div>