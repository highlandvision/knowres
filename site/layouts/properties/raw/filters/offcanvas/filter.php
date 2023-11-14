<?php
/**
 * @package    Know Reservations
 * @subpackage Site View
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */
/** @noinspection PhpUnhandledExceptionInspection */

defined('_JEXEC') or die;

extract($displayData);
/**
 * Layout variables
 *
 * @var string $action Requested action.
 * @var array  $data   Filter data [0 => Filter value, 2 => Selected, 3 => Display value].
 * @var string $name   Heading
 */

if (empty($data)) {
	return;
}

$active = '';
$none   = 'style="display:none;"';
foreach ($data as $k => $v) {
	if ($v[2]) {
		$active = 'active';
		$none   = '';
		break;
	}
}
?>

<ul class="filter-sort-list">
	<li class="head button <?php echo $active; ?>"><?php echo $name; ?></li>
	<?php foreach ($data as $k => $v) : ?>
		<?php $id = str_replace(' ', '-', $action); ?>
		<?php $id .= ':' . $k; ?>
		<li class="checkbox" <?php echo $none; ?>>
			<?php if ($v[2]) : ?>
				<input type="checkbox" class="checkover getResponseSearch" name="<?php echo $action; ?>"
				       checked="checked" id="<?php echo $id; ?>" data-action="<?php echo $action; ?>"
				       data-action-value="<?php echo $k; ?>">
				<label class="checklabel" for="<?php echo $id; ?>">
					<?php echo $v[3]; ?> (<?php echo $v[1]; ?>)
				</label>
			<?php elseif ($v[1]) : ?>
				<input type="checkbox" class="checkover getResponseSearch" name="<?php echo $action; ?>"
				       id="<?php echo $id; ?>" data-action="<?php echo $action; ?>"
				       data-action-value="<?php echo $k; ?>">
				<label class="checklabel" for="<?php echo $id; ?>">
					<?php echo $v[3]; ?> (<?php echo $v[1]; ?>)
				</label>
			<?php else: ?>
				<input type="checkbox" class="checkover" disabled name="<?php echo $action ?>"
				       id="<?php echo $id; ?>">
				<label class="checklabel disabled" for="<?php echo $id; ?>">
					<?php echo $v[3]; ?> (<?php echo $v[1]; ?>)
				</label>
			<?php endif; ?>
		</li>
	<?php endforeach; ?>
</ul>