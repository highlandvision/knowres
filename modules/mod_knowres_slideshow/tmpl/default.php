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

<div class="show-for-small hide-for-large">
	<?php foreach ($data as $d): ?>
		<?php $options = ['src'         => $d['image'],
		                  'alt'         => $d['alt'],
		                  'description' => $d['description'],
		]; ?>
		<?php echo KrMethods::render('joomla.html.image', $options); ?>
		<?php break; ?>
	<?php endforeach; ?>
</div>
<div class="show-for-large">
	<?php $height = $params->get('height') . 'px'; ?>
	<div class="kr-slideshow kr-slick" style="height:<?php echo $height; ?>">
		<?php foreach ($data as $d): ?>
			<div>
				<?php $options = ['src'         => $d['image'],
				                  'alt'         => $d['alt'],
				                  'description' => $d['description'],
				                  'class'       => 'responsive',
				                  'style'       => 'height:' . $height
				]; ?>
				<?php echo KrMethods::render('joomla.html.image', $options); ?>

				<?php if (!empty($d['property_id'])): ?>
					<?php $Itemid =
						SiteHelper::getItemId('com_knowres', 'property', ['id' => (int) $d['property_id']]); ?>
					<div class="caption">
						<?php $plink =
							KrMethods::route('index.php?option=com_knowres&view=property&Itemid=' .
							                 $Itemid .
							                 '&id=' .
							                 (int) $d['property_id']); ?>
						<?php $text = $d['property_name'] . ' ' . $d['region_name'] . ', ' . $d['country_name']; ?>
						<a href="<?php echo $plink; ?>"><?php echo $text; ?></a>
					</div>
				<?php else: ?>
					<?php if ($d['description']): ?>
						<div class="caption">
							<?php $text = $d['description']; ?>
							<?php echo $text; ?>
						</div>
					<?php endif; ?>
				<?php endif; ?>
			</div>
		<?php endforeach; ?>
	</div>
</div>