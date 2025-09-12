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
use HighlandVision\KR\Utility;

if (empty($this->lines['cancelled']))
{
	return;
}
?>

<div class="card kr-daily">
	<div class="card-header">
		<a class="showbefore" data-bs-toggle="collapse" href="#panel-cancelled" role="button"
		   aria-expanded="true" aria-controls="panel-cancelled">
			<?php echo Utility::getBookingStatus(99); ?>
		</a>
	</div>
	<div class="collapse show" id="panel-cancelled">
		<div class="card-body">
			<?php echo KrMethods::render('contract.daily.contract', ['lines' => $this->lines['cancelled']]); ?>
		</div>
	</div>
</div>