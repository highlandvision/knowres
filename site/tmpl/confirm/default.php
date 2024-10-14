<?php
/**
 * @package     Know Reservations
 * @subpackage  Site Controller
 * @copyright   2021 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */
/** @noinspection PhpPossiblePolymorphicInvocationInspection */
/** @noinspection PhpUnhandledExceptionInspection */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\SiteHelper;
use Joomla\CMS\Factory;
use Joomla\CMS\HTML\HTMLHelper;

$wa = Factory::getApplication()->getDocument()->getWebAssetManager();
$wa->useScript('com_knowres.site')
	->useScript('form.validate')
	->useScript('keepalive');

$gdpr   = $this->Translations->getText('agency', $this->contractData->agency_id, 'gdpr_statement');
$Itemid = SiteHelper::getItemId('com_knowres', 'confirm', ['layout' => 'payment']);
$action = KrMethods::route('index.php?option=com_knowres&view=confirm&layout=payment&Itemid=' . $Itemid);
?>

<div id="kr-confirm">
	<div class="grid-x grid-margin-x">
		<div class="small-12 cell">
			<?php if ($this->property->booking_type == 2) : ?>
				<h1><?php echo KrMethods::sprintf('COM_KNOWRES_CONFIRM_BOOK_YOUR_RESERVATION',
						$this->property->property_name); ?></h1>
			<?php else: ?>
				<h1><?php echo KrMethods::sprintf('COM_KNOWRES_CONFIRM_REQUEST_YOUR_RESERVATION',
						$this->property->property_name); ?></h1>
			<?php endif; ?>
		</div>
	</div>

	<form action="<?php echo $action; ?>" class="form-validate" id="kr-form-confirm" method="post">
		<div class="grid-x grid-margin-x">
			<div class="small-12 medium-7 large-8 cell">
				<?php echo $this->loadTemplate('coupon'); ?>
				<?php echo $this->loadTemplate('extras'); ?>
				<?php echo $this->loadTemplate('guest'); ?>
				<?php if (!empty($gdpr)): ?>
					<div class="callout small success">
						<div class="smaller">
							<?php echo $gdpr; ?>
						</div>
					</div>
				<?php endif; ?>
			</div>
			<div class="medium-5 large-4 cell show-for-medium">
				<?php echo KrMethods::loadInternal('{loadposition propertyview}'); ?>
			</div>
		</div>

		<div class="grid-x grid-margin-x align-bottom">
			<div class="small-12 medium-4 large-4 cell">
				<?php echo $this->loadTemplate('ajaxed'); ?>
			</div>
			<div class="medium-3 large-4 cell">
				<div class="show-for-medium">
					<?php echo HTMLHelper::_('image',
						$this->pimage,
						$this->property->property_name,
						['width' => $this->params->get('max_property_width', 100)]);
					?>
					<br><br><br>
				</div>
				<button class="button expanded large primary align-bottom" type="submit">
					<?php echo KrMethods::plain('COM_KNOWRES_CONFIRM_REQUEST_PAYMENT'); ?>
				</button>
			</div>
		</div>

		<div class="small-12 cell hide-for-medium">
			<?php if (!empty($gdpr)): ?>
				<div class="callout small success">
					<div class="smaller">
						<?php echo $gdpr; ?>
					</div>
				</div>
			<?php endif; ?>
		</div>

		<?php echo HTMLHelper::_('form.token'); ?>
		<input type="hidden" name="jform[guest_id]" value="0">
		<input type="hidden" name="jform[validate]" value="1">
		<input type="hidden" name="jform[property_id]" value="<?php echo $this->contractData->property_id; ?>">
		<input type="hidden" name="jform[arrival]" value="<?php echo $this->contractData->arrival; ?>">
		<input type="hidden" name="jform[room_total]" value="<?php echo $this->contractData->room_total; ?>">
		<input type="hidden" name="task" id="mytask" value="confirm.payment"/>
	</form>
</div>