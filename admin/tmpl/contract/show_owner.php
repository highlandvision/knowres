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
?>

<?php if ($this->access_level > 10 || ($this->access_level == 10 && $this->params->get('show_owner'))): ?>
	<div class="card kr-card">
		<div class="card-header">
			<a class="showbefore collapsed" data-bs-toggle="collapse" href="#panel-collapse-owner"
			   role="button" aria-expanded="false"
			   aria-controls="panel-collapse-owner">
				<?php echo KrMethods::plain('COM_KNOWRES_OWNER'); ?>
			</a>
		</div>
		<div class="collapse" id="panel-collapse-owner">
			<div class="card-body">
				<?php echo KrMethods::render('contract.show.owner',
					['contract' => $this->item]
				);
				?>
			</div>
		</div>
	</div>
<?php endif; ?>