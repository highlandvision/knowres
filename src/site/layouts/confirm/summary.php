<?php
/**
 * @package     Know Reservations
 * @subpackage  Admin Layout
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */
/** @noinspection PhpUnhandledExceptionInspection */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\TickTock;
use HighlandVision\KR\Utility;

extract($displayData);
/**
 * Layout variables
 *
 * @var stdClass $data Contract session data.
 */

$nights = TickTock::differenceDays($data->arrival, $data->departure);
?>

<p class="small">
	<?php echo KrMethods::plain('COM_KNOWRES_ARRIVAL'); ?>
	<?php echo ' ' . TickTock::displayDate($data->arrival, 'D j F Y'); ?>
		<br>
	<?php echo KrMethods::plain('COM_KNOWRES_DEPARTURE'); ?>
	<?php echo ' ' . TickTock::displayDate($data->departure, 'D j F Y'); ?>
		<br>
	<?php echo KrMethods::sprintf('COM_KNOWRES_CONFIRM_NIGHTS', $nights); ?>
	<?php if (KrMethods::getParams()->get('search_adult_age', 0)): ?>
		<br>
		<?php echo KrMethods::plural('COM_KNOWRES_CONFIRM_ADULTS', $data->adults); ?>
		<?php if ($data->children): ?>
			<br>
			<?php echo KrMethods::plural('COM_KNOWRES_CONFIRM_CHILDREN',
				$data->children, Utility::displayAges($data->child_ages)); ?>
		<?php endif; ?>
	<?php else: ?>
		<?php echo KrMethods::plural('COM_KNOWRES_CONFIRM_GUESTS', $data->adults); ?>
	<?php endif; ?>
</p>