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

extract($displayData);
/**
 * Layout variables
 *
 * @var false|object $contract The contract item.
 * @var float        $balance  Current balnce.
 */
?>

<?php if ($contract->booking_status == 39): ?>
	<div class="row">
		<div class="col-12">
			<?php echo KrMethods::sprintf('COM_KNOWRES_CONTRACTPAYMENTS_PAID_ON_ARRIVAL',
				Utility::displayValue($balance, $contract->currency)); ?>
		</div>
	</div>
<?php endif; ?>