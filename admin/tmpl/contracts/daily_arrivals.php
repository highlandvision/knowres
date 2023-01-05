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

if (empty($this->lines['arrivals']))
{
	return;
}
?>

<div class="card kr-daily">
	<div class="card-header">
		<a class="showbefore" data-bs-toggle="collapse" href="#panel-arrivals" role="button"
		   aria-expanded="true" aria-controls="panel-arrivals">
			<?php echo KrMethods::plain('COM_KNOWRES_CONTRACTS_ARRIVALS'); ?>
		</a>
	</div>
	<div class="collapse show" id="panel-arrivals">
		<div class="card-body">
			<?php echo KrMethods::render('contract.daily.arrivals', ['lines' => $this->lines['arrivals']]); ?>
		</div>
	</div>
</div>