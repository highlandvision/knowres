<?php
/**
 * @package     KR
 * @subpackage  Site layout
 * @copyright   Copyright (C) 2018 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

use HighlandVision\KR\Framework\KrMethods;

extract($displayData);
/**
 * Layout variables
 *
 * @var array $data  The values.
 * @var array $value Guest type values.
 */

$count = 0;
?>

<?php if (is_countable($data) && count($data)): ?>
	<fieldset class="fieldset">
		<legend><i class="fa fa-male" aria-hidden="true"></i> <i class="fa fa-female" aria-hidden="true"></i>
			<i class="fa fa-child" aria-hidden="true"></i> <?php echo KrMethods::plain('COM_KNOWRES_ENQURIY_PARTY'); ?>
		</legend>

		<div class="grid-x grid-margin-x">
			<?php foreach ($data as $d) : ?>
				<?php if ($d->type && (int) $d->max): ?>
					<?php
					$min      = 1;
					$default  = $value[$count]->number ?? 2;
					$max      = (int) $d->max;
					$class    = "required";
					$required = true;

					if ($count)
					{
						$min      = 0;
						$default  = $value[$count]->number ?? 0;
						$class    = "";
						$required = false;
					}

					$id       = "guest_types_" . strtolower($d->type);
					$id_label = "guest_types_" . strtolower($d->type) . '_lbl';
					?>

					<div class="small-3 cell">
						<div class="form-floating-label has-value">
							<input type="number" id="<?php echo $id; ?>" name="guest_types[]"
							       value="<?php echo $default; ?>" class="<?php echo $class; ?>"
							       max="<?php echo $max; ?>" step="1" min="<?php echo $min; ?>" required=""
							       aria-required="true">
							<label style="white-space:nowrap;" id="<?php echo $id_label; ?>" for="<?php echo $id; ?>"
							       class="<?php echo $class; ?>"><?php echo $d->type; ?>
							</label>
						</div>
					</div>

					<?php $count++; ?>
				<?php endif; ?>
			<?php endforeach; ?>
		</div>
	</fieldset>
<?php endif; ?>