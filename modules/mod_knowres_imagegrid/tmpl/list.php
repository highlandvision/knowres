<?php
/**
 * @package    Know Reservations
 * @subpackage Admin Controllers
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;

$wa = $app->getDocument()->getWebAssetManager();
$wa->getRegistry()->addExtensionRegistryFile('com_knowres');
$wa->useScript('com_knowres.site-modules');

$textbg    = $params->get('textbg');
$textbold  = $params->get('textbold');
$textcolor = $params->get('textcolor');
$textsize  = $params->get('textsize') . 'px';
$small_cc  = $params->get('small-column-count');
$medium_cc = $params->get('medium-column-count');
$large_cc  = $params->get('large-column-count');

$pstyle = '';
$pclass = [];
if ($textbold) {
	$pclass[] = 'strong';
}
if ($textcolor) {
	$pstyle .= 'color:' . $textcolor . ';';
}
if ($textsize) {
	$pstyle .= 'font-size:' . $textsize . ';';
}
if (!empty($textbg)) {
	$pstyle .= 'background-color:' . $textbg . ';';
}
?>

<div class="kr-imagegrid list">
	<ul>
		<?php foreach ($items as $d): ?>
			<li>
				<?php $link = ''; ?>
				<?php if (!empty($d['link'])): ?>
					<?php $link = $d['link']; ?>
					<?php $external = ''; ?>
				<?php elseif (!empty($d['url'])): ?>
					<?php $link = $d['url']; ?>
					<?php $external = 'target="_blank"'; ?>
				<?php endif; ?>

				<?php if ($link): ?>
				<a href="<?php echo $link; ?>" <?php echo $external; ?>
				   title="<?php echo KrMethods::plain('MOD_KNOWRES_IMAGEGRID_CLICK_TO_VIEW'); ?>">
					<?php endif; ?>

					<?php if ($d['text']): ?>
						<?php echo $d['text']; ?>
					<?php endif; ?>

					<?php if ($link): ?>
				</a>
			<?php endif; ?>
			</li>
		<?php endforeach; ?>
	</ul>
</div>