<?php
/**
 * @package     Know Reservations
 * @subpackage  Site Layout
 * @copyright   2018 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Translations;
use HighlandVision\KR\Utility;
use Joomla\Registry\Registry;

extract($displayData);
/**
 * Layout variables
 *
 * @var false|object $item         Property item.
 * @var Registry     $params       KR params.
 * @var string       $plink        Property link.
 * @var array        $key_features Key (filter) property features.
 * @var Translations $Translations Translations object.
 */
?>

<h3><?php echo $item->property_name; ?></h3>
<div class="geo">
	<?php echo Translations::getCountryName($item->country_id) . ','; ?>
	<?php echo $item->region_name . ','; ?>
	<?php echo strtoupper($item->property_area); ?>
</div>
<div class="info">
	<?php echo KrMethods::plain('COM_KNOWRES_SLEEPS'); ?>
	<?php echo $item->sleeps; ?>
	<?php if ($item->sleeps_extra): ?>
		+ <?php echo $item->sleeps_extra; ?>
	<?php endif; ?>
	<?php echo ' | '; ?>
	<?php echo KrMethods::plain('COM_KNOWRES_BEDROOMS'); ?>
	<?php echo $item->bedrooms; ?>
	<?php echo ' | '; ?>
	<?php echo KrMethods::plain('COM_KNOWRES_BATHROOMS'); ?>
	<?php echo $item->bathrooms; ?>
	<?php echo ' | '; ?>
	<?php if (!$item->pets): ?>
		<?php echo KrMethods::plain('COM_KNOWRES_NO_PETS'); ?>
	<?php else: ?>
		<?php echo KrMethods::plain('COM_KNOWRES_PETS'); ?>
		<?php echo $item->pets; ?>
	<?php endif; ?>
</div>
<div class="amenities">
	<?php $pf = Utility::decodeJson($item->property_features, true); ?>
	<?php foreach ($pf as $f): ?>
		<?php if (isset($key_features[(int) $f])): ?>
			<span class="badge">
				<?php echo $key_features[$f]; ?>
			</span>
		<?php endif; ?>
	<?php endforeach; ?>
</div>