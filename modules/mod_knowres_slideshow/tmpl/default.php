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

if ($params->get('layout', 'default') == 'default') {
	/** @noinspection PhpPossiblePolymorphicInvocationInspection */
	$app->bootComponent('com_knowres')->getMVCFactory()->createModel('Slideshow', 'Site', ['ignore_request' => true]);
}

$heights = explode("|", $params->get('height'));
$wa = $app->getDocument()->getWebAssetManager();
$wa->getRegistry()->addExtensionRegistryFile('com_knowres');
$wa->useScript('com_knowres.site-modules');
?>

<div class="show-for-small hide-for-medium">
	<?php $bgcolor = $params->get('bgcolor'); ?>
	<div style="background:<?php echo $bgcolor; ?>;height:<?php echo $heights[0] . 'px'; ?>"></div>
</div>
<div class="show-for-medium hide-for-large">
	<?php foreach ($slides as $s): ?>
		<?php $options = ['src'         => $s['image'],
		                  'alt'         => $s['alt'],
		                  'description' => $s['description'],
		                  'style'       => 'height:' . $heights[1]  . 'px'
		]; ?>
		<?php echo KrMethods::render('joomla.html.image', $options); ?>
		<?php break; ?>
	<?php endforeach; ?>
</div>
<div class="show-for-large">
	<div class="kr-slideshow kr-slick" style="height:<?php echo $height; ?>">
		<?php foreach ($slides as $s): ?>
			<div>
				<?php $options = ['src'         => $s['image'],
				                  'alt'         => $s['alt'],
				                  'description' => $s['description'],
				                  'class'       => 'responsive',
				                  'style'       => 'height:' . $heights[2]  . 'px'
				]; ?>
				<?php echo KrMethods::render('joomla.html.image', $options); ?>
				<?php if (!empty($s['property_id'])): ?>
					<?php $Itemid =
						SiteHelper::getItemId('com_knowres', 'property', ['id' => (int) $s['property_id']]); ?>
					<div class="caption">
						<?php $plink =
							KrMethods::route('index.php?option=com_knowres&view=property&Itemid=' .
							                 $Itemid .
							                 '&id=' .
							                 (int) $s['property_id']); ?>
						<?php $text = $s['property_name'] . ' ' . $s['region_name'] . ', ' . $s['country_name']; ?>
						<a href="<?php echo $plink; ?>"><?php echo $text; ?></a>
					</div>
				<?php else: ?>
					<?php if ($s['description']): ?>
						<div class="caption">
							<?php $text = $s['description']; ?>
							<?php echo $text; ?>
						</div>
					<?php endif; ?>
				<?php endif; ?>
			</div>
		<?php endforeach; ?>
	</div>
</div>