<?php
/**
 * @package     KR
 * @subpackage  Admin views
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */
/** @noinspection PhpUnhandledExceptionInspection */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\TickTock;
use Joomla\CMS\Factory;

$guest_edit = KrMethods::route('index.php?option=com_knowres&task=guest.edit&id=' . $this->item->guest_id, false);
KrMethods::setUserState('com_knowres.gobackto', 'task=contract.show&id=' . $this->item->id);
?>

<?php if (!$this->item->black_booking) : ?>
	<?php if ($this->access_level > 10 || ($this->access_level == 10 && $this->params->get('show_guest'))): ?>
		<div class="card kr-card">
			<div class="card-header">
				<a class="showbefore" data-bs-toggle="collapse" href="#panel-collapse-guest" role="button"
				   aria-expanded="true" aria-controls="panel-collapse-guest">
					<?php echo KrMethods::plain('COM_KNOWRES_GUEST_DETAILS'); ?>
				</a>
				<?php if (!is_null($this->guest->checked_out) || !is_null($this->guest->checked_out_time)): ?>
					<?php $name = Factory::getUser($this->guest->checked_out)->name ?: KrMethods::plain('COM_KNOWRES_GUEST'); ?>
					<?php $when = TickTock::displayTS($this->guest->checked_out_time); ?>
					<a class="float-end" href="javascript:void(0);" aria-labelledby="guest-checkin-desc" title=""
					   onclick="return Knowres.submitform('guest.checkin', document.getElementById('contract-checkin'));">
						<i class="fas fa-lock"></i> <?php echo KrMethods::plain('JTOOLBAR_CHECKIN'); ?>
					</a>
					<div id="guest-checkin-desc" role="tooltip">
						<?php echo $name; ?><br><?php echo $when; ?>
					</div>
				<?php else: ?>
					<?php if ($this->access_level > 10): ?>
						<div class="float-end">
							<a href="<?php echo $guest_edit; ?>">
								<i class="fas fa-edit"></i> <?php echo KrMethods::plain('COM_KNOWRES_EDIT'); ?>
							</a>
						</div>
					<?php endif; ?>
				<?php endif; ?>
			</div>
			<div class="collapse show" id="panel-collapse-guest">
				<div class="card-body">
					<?php echo KrMethods::render('contract.show.guest',
						['contract' => $this->item,
						 'guest' => $this->guest,
						 'document_id' => $this->params->get('guestdata_document', 0)
						]
					);
					?>
				</div>
			</div>
		</div>
	<?php endif; ?>
<?php endif; ?>