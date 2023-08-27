<?php
/**
 * @package     Know Reservations
 * @subpackage  Site Layout
 * @copyright   2018 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */
/** @noinspection PhpUnhandledExceptionInspection */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Translations;
use Joomla\Registry\Registry;

extract($displayData);
/**
 * Layout variables
 *
 * @var false|object $item         Property item.
 * @var Registry     $params       KR params.
 * @var string       $plink        Property link.
 * @var bool         $one_region   True if single region site.
 * @var array        $key_features Key (filter) property features.
 * @var Translations $Translations Translations object.
 */
?>

<h2 class="h5">
	<?php echo $item->property_name; ?>
</h2>
<div class="info small">
	<?php echo strtoupper($item->property_area); ?>
	<?php if (!$one_region) : ?>
		<?php echo ' / '; ?>
		<?php echo $item->region_name . ' / '; ?>
		<?php echo Translations::getCountryName($item->country_id); ?>
	<?php endif; ?>
	<br>
	<?php echo KrMethods::plain('COM_KNOWRES_SLEEPS'); ?>
	<?php echo $item->sleeps; ?>
	<?php if ($item->sleeps_extra): ?>
		+ <?php echo $item->sleeps_extra; ?>
	<?php endif; ?>
	<?php echo ' / '; ?>
	<?php echo KrMethods::plain('COM_KNOWRES_BEDROOMS'); ?>
	<?php echo $item->bedrooms; ?>
	<?php echo ' / '; ?>
	<?php echo KrMethods::plain('COM_KNOWRES_BATHROOMS'); ?>
	<?php echo $item->bathrooms; ?>
	<?php echo ' / '; ?>
	<?php if (!$item->pets): ?>
		<?php echo KrMethods::plain('COM_KNOWRES_NO_PETS'); ?>
	<?php else: ?>
		<?php echo KrMethods::plain('COM_KNOWRES_PETS'); ?>
		<?php echo $item->pets; ?>
	<?php endif; ?>
</div>