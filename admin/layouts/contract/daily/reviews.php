<?php
/**
 * @package     Know Reservations
 * @subpackage  Admin Layout
 * @copyright   2021 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */
/** @noinspection PhpUnhandledExceptionInspection */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;

extract($displayData);
/**
 * Layout variables
 *
 * @var array $lines The approval data.
 */
?>

<div class="table-responsive">
	<table class="table table-sm">
		<thead>
		<tr>
			<th scope="col" style="width:12%"><?php echo KrMethods::plain('COM_KNOWRES_TAG'); ?></th>
			<th scope="col" style="width:18%"><?php echo KrMethods::plain('COM_KNOWRES_PROPERTY'); ?></th>
			<th scope="col" style="width:70%"><?php echo KrMethods::plain('COM_KNOWRES_REVIEWS_TITLE'); ?></th>
		</tr>
		</thead>
		<tbody>
		<?php foreach ($lines as $l): ?>
			<?php $link = KrMethods::route('index.php?option=com_knowres&task=review.edit&id=' . $l->id); ?>
			<tr>
				<th scope="col"><a href="<?php echo $link; ?>"><?php echo $l->tag; ?></a></th>
				<td><?php echo $l->property_name; ?></td>
				<td><?php echo $l->title; ?></td>
			</tr>
		<?php endforeach; ?>
		</tbody>
	</table>
</div>