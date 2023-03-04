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

use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\TickTock;
use Joomla\CMS\Factory;
?>

<?php if ($this->access_level > 10 || ($this->access_level == 10 && $this->params->get('show_arrival'))): ?>
	<div class="card kr-card">
		<div class="card-header">
			<?php $guestdata = KrFactory::getAdminModel('contractguestdata')->getItem($this->item->guestdata_id); ?>
			<a class="showbefore collapsed" data-bs-toggle="collapse" href="#panel-collapse-guestdata" role="button"
			   aria-expanded="false" aria-controls="panel-collapse-guest">
				<?php echo KrMethods::plain('COM_KNOWRES_CONTRACTGUESTDATA_TITLE'); ?>
			</a>
			<?php if (!is_null($guestdata->checked_out_time) && $guestdata->checked_out != KrMethods::getUser()->id): ?>
				<?php
				$name = Factory::getUser($guestdata->checked_out)->name ?: KrMethods::plain('COM_KNOWRES_GUEST');
				$when = TickTock::displayTS($guestdata->checked_out_time);
				?>
				<a class="float-end" href="javascript:void(0);" aria-labelledby="guestdata-checkin-desc" title=""
				   onclick="return Knowres.submitform('contractguestdata.checkin', document.getElementById('contract-checkin'));">
					<i class="fas fa-lock"></i> <?php echo KrMethods::plain('JTOOLBAR_CHECKIN'); ?>
				</a>
				<div id="guestdata-checkin-desc" role="tooltip">
					<?php echo $name; ?><br><?php echo $when; ?>
				</div>
			<?php else: ?>
				<?php if ($this->access_level > 10): ?>
					<div class="float-end">
						<a href="<?php echo KrMethods::route('index.php?option=com_knowres&task=contractguestdata.edit&id='
							. $this->item->guestdata_id, false); ?>">
							<i class="fas fa-edit"></i> <?php echo KrMethods::plain('COM_KNOWRES_EDIT'); ?>
						</a>
					</div>
				<?php endif; ?>
			<?php endif; ?>
		</div>
		<div class="collapse" id="panel-collapse-guestdata">
			<div class="card-body">
				<?php echo KrMethods::render('contract.show.guestdata',
					['contract'     => $this->item,
					 'fees'         => $this->fees,
					 'guest'        => $this->guest,
					 'guestdata'    => $guestdata,
					 'property'     => KrFactory::getAdminModel('property')->getItem($this->item->property_id),
					 'balance'      => $this->balance,
					 'balance_all'  => $this->balance_all,
					 'access_level' => $this->access_level,
					]
				);
				?>
			</div>
		</div>
	</div>
<?php endif; ?>