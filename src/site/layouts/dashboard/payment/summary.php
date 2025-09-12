<?php
/**
 * @package    Know Reservations
 * @subpackage Admin Layout
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

defined('_JEXEC') or die;

extract($displayData);
/**
 * Layout variables
 *
 * @var array $data Payment summary data.
 */

$data = $displayData['data'];
?>

<table class="kr-dashboard-summary stack unstriped hover">
	<tbody>
	<?php foreach ($data as $d) : ?>
		<tr>
			<td class="left"><?php echo $d['left']; ?></td>
			<td class="mid"><?php echo $d['mid']; ?></td>
			<td class="right"><?php echo $d['right']; ?></td>
		</tr>
	<?php endforeach; ?>
	</tbody>
</table>