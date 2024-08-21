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
use HighlandVision\KR\Translations;
use HighlandVision\KR\Utility;
use Joomla\CMS\HTML\HTMLHelper;

extract($displayData);
/**
 * Layout variables
 *
 * @var array  $extras      Extra rows
 * @var array  $data        The values.
 * @var int    $property_id ID of property.
 * @var string $currency    Contract currency.
 */

//Tax is inclusive for extras so override default setting
$prices_inclusive = 1;
$all              = [];
$Translations     = new Translations();

foreach ($extras as $extra) {
	if ($extra->mandatory) {
		continue;
	}

	switch ($extra->model) {
		case '1': // Per week
			$text = KrMethods::plain('COM_KNOWRES_EXTRA_MODEL_PERWEEK');
			break;
		case '2': // per days
			$text = KrMethods::plain('COM_KNOWRES_EXTRA_MODEL_PERDAY');
			break;
		case '3': // per booking
			$text = KrMethods::plain('COM_KNOWRES_EXTRA_MODEL_PERBOOKING');
			break;
		case '4': // per person per booking
			$text = KrMethods::plain('COM_KNOWRES_EXTRA_MODEL_PERPERSONPERBOOKING');
			break;
		case '5': // per person per day
			$text = KrMethods::plain('COM_KNOWRES_EXTRA_MODEL_PERPERSONPERDAY');
			break;
		case '11': // % of accommodation charge
			$text = KrMethods::plain('COM_KNOWRES_EXTRA_MODEL_PERBOOKINGPC');
			break;
		case '12': // % of daily accommodation charge
			$text = KrMethods::plain('COM_KNOWRES_EXTRA_MODEL_PERDAYPC');
			break;

			break;
	}

	$one['name']        = $Translations->getText('extra', $extra->id);
	$one['description'] = '';
	$description        = $Translations->getText('extra', $extra->id, 'description');
	if (!empty($description) && $description != $one['name']) {
		$one['description'] = $description;
	}

	if ($extra->model < 11) {
		if ((int) $extra->price == 0) {
			$one['price'] = '';
			if (!str_contains($one['name'], '(Payable Locally)')) {
				$one['price'] = KrMethods::plain('COM_KNOWRES_FREE');
			}
		} else {
			$price        = Utility::displayValue($extra->price, $currency) . ' ' . $text;
			$one['price'] = $price;
		}
	} else {
		$one['price'] = $extra->percentage . $text;
	}

	$values    = [];
	$default   = 1;
	$values[0] = KrMethods::plain('JSELECT');
	$default   = 0;

	if (is_array($data) && array_key_exists($extra->id, $data)) {
		$default = $data[$extra->id]['quantity'];
	}

	for ($i = 1; $i <= $extra->max_quantity; $i++) {
		$values[$i] = $i;
	}

	$options = [];
	foreach ($values as $key => $value) {
		$options[] = HTMLHelper::_('select.option', (string) $key, (string) $value);
	}

	$id              = 'extraquantity' . $extra->id;
	$one['dropdown'] = HTMLHelper::_('select.genericlist',
		$options,
		'extra_quantities[]',
		'class="kr-calculate kr-extra-select"',
		'value',
		'text',
		$default,
		$id);

	$one['hidden'] = '<input type="hidden" name="extra_ids[]" value="' . $extra->id . '">';
	$all[]         = $one;
}

if (is_countable($all) && !count($all)) {
	return;
}
?>

<fieldset class="fieldset">
	<legend><?php echo KrMethods::plain('COM_KNOWRES_CONFIRM_EXTRAS_LBL'); ?></legend>
	<div class="callout small">
		<?php foreach ($all as $a) : ?>
			<div class="grid-x grid-margin-x extras">
				<div class="small-12 medium-3 cell">
					<?php echo $a['dropdown'] . $a['hidden']; ?>
				</div>
				<div class="price small-12 medium-9 cell">
					<?php echo $a['name']; ?>
					<?php if (!empty($a['description'])): ?>
						<i class='fa-solid fa-info-circle has-tip' data-position="right" data-alignment="center"
						   data-tooltip title="<?php echo $a['description']; ?>">
						</i>
					<?php endif; ?>
					<br>
					<?php echo $a['price']; ?>
				</div>
			</div>
		<?php endforeach; ?>
	</div>
</fieldset>