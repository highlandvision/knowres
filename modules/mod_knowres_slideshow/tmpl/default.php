<?php
/**
 * @package    Know Reservations
 * @subpackage Site module
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

/** @noinspection PhpUnhandledExceptionInspection */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\SiteHelper;
?>

<div class="kr-slideshow">
	<?php foreach ($data as $d): ?>
		<div>
			<?php $options = ['src'         => $d['image'],
			                  'alt'         => $d['alt'],
			                  'description' => $d['description'],
			                  'class'       => 'responsive',
			]; ?>
			<?php echo KrMethods::render('joomla.html.image', $options); ?>

			<?php if (!empty($d['property_id'])): ?>
				<?php $Itemid = SiteHelper::getItemId('com_knowres', 'property', ['id' => (int) $d['property_id']]); ?>
				<div class="caption">
					<?php $plink = KrMethods::route('index.php?option=com_knowres&view=property&Itemid=' . $Itemid . '&id=' . (int) $d['property_id']); ?>
					<?php $text = $d['property_name'] . '<br> ' . $d['region_name'] . ', ' . $d['country_name']; ?>
					<a href="<?php echo $plink; ?>"><?php echo $text; ?></a>
				</div>
			<?php endif; ?>
		</div>
	<?php endforeach; ?>
</div>