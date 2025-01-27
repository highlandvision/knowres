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

<div class="card kr-card">
	<div class="card-header">
		<a class="showbefore" data-bs-toggle="collapse" href="#panel-collapse-statement" role="button"
		   aria-expanded="true" aria-controls="panel-collapse-summary">
			<?php echo KrMethods::plain('COM_KNOWRES_SUMMARY'); ?>
		</a>
	</div>
	<div class="collapse show" id="panel-collapse-statement">
		<div class="card-body">
			<?php echo KrMethods::render('contract.show.summary',
				['item'        => $this->item,
				 'fees'        => $this->fees,
				 'payments'    => $this->payments,
				 'audience'    => $this->audience,
				 'balance'     => $this->balance,
				 'balance_all' => $this->balance_all,
				 'notes'       => $this->notes
				]
			);
			?>
		</div>
	</div>
</div>