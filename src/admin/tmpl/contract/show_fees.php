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
?>

<?php if ($this->access_level > 10 || ($this->access_level == 10 && $this->params->get('show_fees'))): ?>
	<div class="card kr-card">
		<div class="card-header">
			<a class="showbefore collapsed" data-bs-toggle="collapse" href="#panel-collapse-fees" role="button"
			   aria-expanded="false" aria-controls="panel-collapse-fees">
				<?php echo KrMethods::plain('COM_KNOWRES_CONTRACTFEES_TITLE'); ?>
			</a>
			<?php if ($this->access_level > 10): ?>
				<span class="float-end">
					<a href="<?php echo KrMethods::route('index.php?option=com_knowres&task=contractfee.edit&layout=edit',
						false); ?>">
						<i class='fa-solid fa-plus-square'></i>
						<?php echo KrMethods::plain('COM_KNOWRES_ADD'); ?>
					</a>
				</span>
			<?php endif; ?>
		</div>
		<div class="collapse" id="panel-collapse-fees">
			<div class="card-body">
				<?php echo KrMethods::render('contract.show.fees',
					['contract' => $this->item,
					 'fees'     => $this->fees
					]);
				?>
			</div>
		</div>
	</div>
<?php endif; ?>