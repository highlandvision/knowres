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
use HighlandVision\KR\TickTock;
use HighlandVision\KR\Utility;
?>

<?php if (count($this->ownerinvoices)): ?>
	<div class="row-fluid">
		<div class="span12 strong">
			<?php echo KrMethods::plain('COM_KNOWRES_CONTRACT_XERO_OWNERS'); ?>
		</div>
	</div>

	<?php foreach ($this->ownerinvoices as $k => $duedate): ?>
		<?php foreach ($duedate as $due => $i): ?>
			<div class="row-fluid">
				<div class="span3">
					<?php echo $k; ?>
				</div>
				<div class="span2">
					<?php echo TickTock::displayDate($i['duedate']); ?>
				</div>
				<div class="span1">
					<?php echo $i['status']; ?>
				</div>
				<div class="span2 text-right">
					<?php echo Utility::displayValue($i['total'], $this->item->currency); ?>
				</div>
				<div class="span2 text-right">
					<?php echo Utility::displayValue($i['amountDue'], $this->item->currency); ?>
				</div>
				<div class="span2 text-right">
				</div>
			</div>
		<?php endforeach; ?>
	<?php endforeach; ?>
<?php endif; ?>