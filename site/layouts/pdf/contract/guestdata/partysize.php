<?php
/**
 * @package     Know Reservations
 * @subpackage  Site Layout
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;
use Highlandvision\KR\Model\ContractModel;
use HighlandVision\KR\Utility;

extract($displayData);
/**
 * Layout variables
 *
 * @var false|object $contract   Contract item.
 */
?>

<table style="width:100%;border:none;border-collapse:collapse;">
	<tr>
		<td style="width:25%;">
			<?php echo KrMethods::plain('COM_KNOWRES_GUESTS'); ?>
		</td>
		<td style="width:75%;">
			<?php if ($contract->adults == 1): ?>
				<?php echo KrMethods::sprintf('COM_KNOWRES_CONTRACT_ADULTS_1', $contract->adults); ?>
			<?php elseif ($contract->adults > 1): ?>
				<?php echo KrMethods::sprintf('COM_KNOWRES_CONTRACT_ADULTS', $contract->adults); ?>
			<?php endif; ?>
		</td>
	</tr>
	<?php if ($contract->children > 0): ?>
		<tr>
			<td style="width:25%;"></td>
			<td style="width:75%;">
				<?php if ($contract->children == 1): ?>
					<?php echo KrMethods::sprintf('COM_KNOWRES_CONTRACT_CHILD', $contract->child_ages[0]); ?>
				<?php elseif ($contract->children > 1): ?>
					<?php echo KrMethods::sprintf('COM_KNOWRES_CONTRACT_CHILDREN', $contract->children,
						Utility::displayAges($contract->child_ages)); ?>
				<?php endif; ?>
			</td>
		</tr>
	<?php endif; ?>
</table>