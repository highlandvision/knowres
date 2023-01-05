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

$foreign_key = '';
?>

<?php if ($this->item->agent_id) : ?>
	<?php if ($this->access_level > 10 || ($this->access_level == 10 && $this->params->get('show_summary'))): ?>
		<?php if ($this->item->service_id): ?>
			<?php $foreign_key = KrFactory::getListModel('servicexrefs')
			                              ->getForeignKeyForContract($this->item->service_id,
				                              $this->item->id, $this->item->cancelled); ?>
		<?php endif; ?>

		<div class="card kr-card">
			<div class="card-header">
				<a class="showbefore collapsed" data-bs-toggle="collapse" href="#panel-collapse-agent"
				   role="button" aria-expanded="false"
				   aria-controls="panel-collapse-agent">
					<?php echo KrMethods::plain('COM_KNOWRES_LEGEND_CONTRACTS_AGENT'); ?>
				</a>
			</div>
			<div class="collapse" id="panel-collapse-agent">
				<div class="card-body">
					<?php echo KrMethods::render('contract.show.agent',
						['contract'    => $this->item,
						 'foreign_key' => $foreign_key
						]);
					?>
				</div>
			</div>
		</div>
	<?php endif; ?>
<?php endif; ?>