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

if (empty($this->lines['new']))
{
	return;
}
?>

<div class="card kr-daily">
	<div class="card-header">
		<a class="showbefore" data-bs-toggle="collapse" href="#panel-new" role="button"
		   aria-expanded="true" aria-controls="panel-new">
			<?php echo KrMethods::plain('COM_KNOWRES_CONTRACTS_DAILY_OVERVIEW_NEW_TITLE'); ?>
		</a>
	</div>
	<div class="collapse show" id="panel-new">
		<div class="card-body">
			<?php echo KrMethods::render('contract.daily.contract', ['lines' => $this->lines['new']]); ?>
		</div>
	</div>
</div>