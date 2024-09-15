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
			<h5 class="red"><?php echo KrMethods::plain('COM_KNOWRES_CONFIRM_BOOK_ENTER'); ?></h5>
		</div>
	</div>

	<div class="grid-x grid-margin-x">
		<div class="small-12 medium-7 large-8 cell">
			<form action="<?php echo $action; ?>" class="form-validate" id="kr-form-confirm" method="post">
				<?php echo $this->loadTemplate('coupon'); ?>
				<?php echo $this->loadTemplate('extras'); ?>
				<?php echo $this->loadTemplate('guest'); ?>

				<?php $gdpr =
					$this->Translations->getText('agency', $this->contractData->agency_id, 'gdpr_statement'); ?>
				<?php if (!empty($gdpr)): ?>
					<div class="callout small success">
						<div class="smaller">
							<?php echo $gdpr; ?>
						</div>
					</div>
				<?php endif; ?>

				<button class="button expanded large primary" type="submit">
					<?php echo KrMethods::plain('COM_KNOWRES_SELECT_PAY_METHOD'); ?>
				</button>

				<?php echo HTMLHelper::_('form.token'); ?>
				<input type="hidden" name="jform[guest_id]" value="0">
				<input type="hidden" name="jform[validate]" value="1">
				<input type="hidden" name="jform[property_id]" value="<?php echo $this->contractData->property_id; ?>">
				<input type="hidden" name="jform[arrival]" value="<?php echo $this->contractData->arrival; ?>">
				<input type="hidden" name="jform[room_total]" value="<?php echo $this->contractData->room_total; ?>">
				<input type="hidden" name="task" id="mytask" value="confirm.payment"/>
			</form>
		</div>
		<div class="small-12 medium-5 large-4 cell">
			<?php echo $this->loadTemplate('ajaxed'); ?>
			<?php echo HTMLHelper::_('image',
				$this->pimage,
				$this->property->property_name,
				['width' => $this->params->get('max_property_width', 100)]);
			?>

			<br><br>
			<div class="text-center">
				<?php echo KrMethods::loadInternal('{loadposition propertyview}'); ?>
			</div>
		</div>
	</div>
</div>