<?php
/**
 * @package     Know Reservations
 * @subpackage  Admin Layout
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

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
//TODO-v4.1 Test the plural and sprintf for children at the bottom
?>

<?php echo KrMethods::plain('COM_KNOWRES_ARRIVAL'); ?>
<?php echo ' ' . TickTock::displayDate($data->arrival, 'D j F Y'); ?>
	<br>
<?php echo KrMethods::plain('COM_KNOWRES_DEPARTURE'); ?>
<?php echo ' ' . TickTock::displayDate($data->departure, 'D j F Y'); ?>
	<br>
<?php echo KrMethods::sprintf('COM_KNOWRES_CONFIRM_NIGHTS', $nights); ?>
<?php if (empty($data->adults)): ?>
	<?php echo KrMethods::plural('COM_KNOWRES_CONFIRM_GUESTS', $data->guests); ?>
<?php endif; ?>
<?php if (!empty($data->adults)): ?>
	<br>
	<?php echo KrMethods::plural('COM_KNOWRES_CONFIRM_ADULTS', $data->adults); ?>
<?php endif; ?>
<?php if (!empty($data->children)): ?>
	<br>
	<?php echo KrMethods::plural('COM_KNOWRES_CONFIRM_CHILDREN', $data->children,
		Utility::displayAges($data->child_ages)); ?>
<?php endif; ?>