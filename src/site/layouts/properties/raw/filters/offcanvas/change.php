<?php
/**
 * @package    Know Reservations
 * @subpackage Site View
 * @copyright  2023 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

if ($data->field != $field) {
	$active = '';
	$none   = 'style="display:none;"';
	foreach ($filter_data as $k => $v) {
		if ($v[2]) {
			$active = 'active';
			$none   = '';
			break;
		}
	}
}
else {
	$active = 'active';
	$none   = '';
}


if ($data->field != $field): ?>
	<?php $active = ''; ?>
	<?php $none = 'style="display:none;"'; ?>
	<?php foreach ($data as $k => $v): ?>
		<?php if ($v[2]): ?>
			<?php $active = 'active'; ?>
			<?php $none = ''; ?>
			<?php break; ?>
		<?php endif; ?>
	<?php endforeach; ?>
<?php else: ?>
	<?php $active = 'active'; ?>
	<?php $none = ''; ?>
<?php endif; ?>
