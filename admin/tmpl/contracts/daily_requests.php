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

if (empty($this->lines['requests']))
{
	return;
}
?>

<div class="card kr-daily">
	<div class="card-header">
		<a class="showbefore" data-bs-toggle="collapse" href="#panel-requests" role="button"
		   aria-expanded="true" aria-controls="panel-requests">
			<?php echo KrMethods::plain('COM_KNOWRES_CONTRACTS_DAILY_OVERVIEW_REQUESTS_TITLE'); ?>
		</a>
	</div>
	<div class="collapse show" id="panel-requests">
		<div class="card-body">
			<?php echo KrMethods::render('contract.daily.requests', ['lines' => $this->lines['requests']]); ?>
		</div>
	</div>
</div>