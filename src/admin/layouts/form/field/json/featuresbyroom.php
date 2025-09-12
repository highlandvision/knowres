<?php
/**
 * @package     KR
 * @subpackage  <Enter sub package>
 * @copyright   Copyright (C) 2021 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

extract($displayData);
/**
 * Layout variables
 * -----------------
 *
 * @var   array $featuresbyroom Features by room
 * @var   array $values         Form field values
 */

$tmp      = [];
$roomtype = "bedroom";
foreach ($values as $v)
{
	$tmp[$v->id] = $v->count;
	$roomtype    = $v->generic;
}
?>

<?php foreach ($featuresbyroom as $k => $u): ?>
	<?php if ($k === $roomtype): ?>
		<div id="<?php echo $k; ?>" class="roomtype">
	<?php else: ?>
		<div id="<?php echo $k; ?>" class="roomtype hideme">
	<?php endif; ?>
	<div class="row g-2 multi">
		<?php foreach ($u as $f): ?>
			<div class="col-6 col-md-4 col-xl-3 col-xxl-2 mb-2">
				<label class="form-label"><?php echo $f['name']; ?>
					<input class="form-control" type="number" min="0" max="20" step="1"
					       name="<?php echo $k . 'count[]'; ?>"
					       value="<?php echo $tmp[$f['id']] ?? 0; ?>" aria-invalid="false">
					<input type="hidden" name="<?php echo $k . 'feature[]'; ?>" value="<?php echo $f['id']; ?>">
				</label>
			</div>
		<?php endforeach; ?>
	</div>
	</div>
<?php endforeach; ?>