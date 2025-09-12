<?php
/**
 * @package     KR
 * @subpackage  Admin views
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;

$paid = 0;
?>

<?php if ($this->access_level > 10 || ($this->access_level == 10 && $this->params->get('show_payments'))): ?>
	<div class="card kr-card">
		<div class="card-header">
			<a class="showbefore collapsed" data-bs-toggle="collapse" href="#panel-collapse-payments" role="button"
			   aria-expanded="false" aria-controls="panel-collapse-summary">
				<?php echo KrMethods::plain('COM_KNOWRES_CONTRACTPAYMENTS_TITLE'); ?>
			</a>
			<?php if ($this->access_level > 10): ?>
				<span class="float-end">
					<a href="<?php echo KrMethods::route('index.php?option=com_knowres&task=contractpayment.edit&layout=edit',
						false); ?>">
						<i class='fa-solid fa-plus-square'></i>
						<?php echo KrMethods::plain('COM_KNOWRES_ADD'); ?>
					</a>
				</span>
			<?php endif; ?>
		</div>
		<div class="collapse" id="panel-collapse-payments">
			<div class="card-body">
				<?php echo KrMethods::render('contract.show.payments',
					['contract' => $this->item,
					 'payments' => $this->payments,
					]);
				?>
			</div>
		</div>
	</div>
<?php endif; ?>