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

$texthorizontalalign = $params->get('texthorizontalalign');
$textcolor           = $params->get('textcolor');
$textbg              = $params->get('textbg');
$textverticalalign   = $params->get('textverticalalign');
$textbold            = $params->get('textbold');
$textshadow          = $params->get('textshadow') . 'px';
$textsize            = $params->get('textsize') . 'px';
$textoverlay         = $params->get('textoverlay');
$small_cc            = $params->get('small-column-count');
$medium_cc           = $params->get('medium-column-count');
$large_cc            = $params->get('large-column-count');

$pstyle   = '';
$pclass[] = $texthorizontalalign;
$pclass[] = $textverticalalign;
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
	$pstyle .= 'background-color:rgba(0,0,0,0.25);';
}
if ($textshadow) {
	$pstyle .= 'text-shadow:1px 1px 2px #0a0a0a';
}
?>

<style>
    .kr-imagegrid .gitem {
        flex: <?php echo '1 1 ' . $small_cc; ?>;
        @media screen and (min-width: 640px) {
            flex: <?php echo '1 1 ' . $medium_cc; ?>;
        }
        @media screen and (min-width: 1024px) {
            flex: <?php echo '1 1 ' .  $large_cc; ?>;
        }
    }
</style>

<div class="kr-imagegrid">
	<?php foreach ($data as $d): ?>
		<?php $link = ''; ?>
		<?php if (!empty($d['link'])): ?>
			<?php $link = $d['link']; ?>
			<?php $external = ''; ?>
		<?php elseif (!empty($d['url'])): ?>
			<?php $link = $d['url']; ?>
			<?php $external = 'target="_blank"'; ?>
		<?php endif; ?>

		<div class="gitem">
			<?php if ($link): ?>
				<a href="<?php echo $link; ?>" <?php echo $external; ?>
			        title="<?php echo KrMethods::plain('MOD_KNOWRES_IMAGEGRID_CLICK_TO_VIEW'); ?>">
			<?php endif; ?>

			<?php $options = ['src'    => $d['image'],
			                  'alt'    => $d['text'],
			                  'class'  => 'th responsive',
			                  'width'  => '100%',
			                  'height' => 'auto'
			];
			?>
			<?php echo KrMethods::render('joomla.html.image', $options); ?>

			<?php if ($textoverlay && $d['text']): ?>
				<p class="<?php echo implode(' ', $pclass); ?>" style="<?php echo $pstyle; ?>">
					<?php echo $d['text']; ?>
				</p>
			<?php endif; ?>

			<?php if ($link): ?>
				<?php echo '</a>'; ?>
			<?php endif; ?>
		</div>
	<?php endforeach; ?>
</div>