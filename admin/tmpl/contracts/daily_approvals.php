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

if (empty($this->lines['approvals']))
{
	return;
}
?>

<div class="card kr-daily">
	<div class="card-header">
		<a class="showbefore" data-bs-toggle="collapse" href="#panel-approvals" role="button"
		   aria-expanded="true" aria-controls="panel-approvals">
			<?php echo KrMethods::plain('COM_KNOWRES_CONTRACTS_APPROVALS'); ?>
		</a>
	</div>
	<div class="collapse show" id="panel-approvals">
		<div class="card-body">
			<?php echo KrMethods::render('contract.daily.approvals', ['lines' => $this->lines['approvals']]); ?>
		</div>
	</div>
</div>