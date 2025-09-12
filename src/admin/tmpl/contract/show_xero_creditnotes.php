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
?>

<?php if (count($this->creditnotes)): ?>
	<div class="row-fluid">
		<div class="span12 strong">
			<?php echo KrMethods::plain('COM_KNOWRES_CONTRACT_XERO_CN'); ?>
		</div>
	</div>

	<?php foreach ($this->creditnotes as $k => $i): ?>
		<div class="row-fluid">
			<div class="span3">
				<?php echo $k; ?>
			</div>
			<div class="span2">
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
<?php endif; ?>
