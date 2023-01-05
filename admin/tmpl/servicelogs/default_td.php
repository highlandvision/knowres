<?php
/**
 * @package    Know Reservations
 * @subpackage Admin templates
 * @copyright  2021 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */
/** @noinspection PhpUnhandledExceptionInspection */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\TickTock;
use Joomla\CMS\HTML\HTMLHelper;

$params = KrMethods::getParams();
?>

<?php foreach ($this->items as $i => $this->item): ?>
	<tr class="row<?php echo $i % 2; ?>">
		<td class="text-center">
			<?php echo HTMLHelper::_('grid.id', $i, $this->item->id); ?>
		</td>
		<td>
			<button class="btn btn-primary btn-sm kr-modal-trigger" type="button" data-task="servicelogs.modal"
			        data-id="<?php echo $this->item->id; ?>" data-bs-target="#kr-ajax-modal" data-bs-toggle="modal"
			        onclick="return false;">
				<span class="fas fa-eye" aria-hidden="true"></span>
			</button>
		</td>
		<td>
			<?php echo $this->item->service_name; ?>
		</td>
		<td class="d-none d-md-table-cell">
			<?php echo $this->item->method; ?>
		</td>
		<td class="text-center d-none d-md-table-cell">
			<?php echo $this->item->success ? KrMethods::plain('JYES') : KrMethods::plain('JNO'); ?>
		</td>
		<td class="d-none d-md-table-cell">
			<?php echo $this->item->property_name; ?>
		</td>
		<td class="d-none d-md-table-cell">
			<?php if ($this->item->contract_id && $this->item->contract_tag): ?>
				<a href="<?php echo KrMethods::route('index.php?option=com_knowres&task=contract.show&id='
					. (int) $this->item->contract_id); ?>">
					<?php echo $this->item->contract_tag; ?>
				</a>
			<?php endif; ?>
		</td>
		<td class="text-center d-none d-md-table-cell">
			<?php echo $this->item->queue_id ?: ''; ?>
		</td>
		<td class="d-none d-md-table-cell">
			<?php echo TickTock::displayTS($this->item->created_at); ?>
		</td>
		<td class="d-none d-md-table-cell">
			<?php echo (int) $this->item->id; ?>
		</td>
	</tr>
<?php endforeach; ?>