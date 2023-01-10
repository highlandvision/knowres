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

if (empty($this->lines['departures']))
{
	return;
}
?>

<div class="card kr-daily">
	<div class="card-header">
		<a class="showbefore" data-bs-toggle="collapse" href="#panel-departures" role="button"
		   aria-expanded="true" aria-controls="panel-departures">
			<?php echo KrMethods::plain('COM_KNOWRES_CONTRACTS_DAILY_DEPARTURES'); ?>
		</a>
	</div>
	<div class="collapse show" id="panel-departures">
		<div class="card-body">
			<?php echo KrMethods::render('contract.daily.arrivals', ['lines' => $this->lines['departures']]); ?>
		</div>
	</div>
</div>