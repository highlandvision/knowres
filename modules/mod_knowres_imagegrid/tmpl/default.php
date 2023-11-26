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
	$pstyle   .= 'background:' . $textbg . ';';
	$pclass[] = 'withbg';
}
if ($texthorizontalalign == "center") {
	$pstyle .= 'text-align:center;';
}
?>

<style>
    .kr-imagegrid .gitem {
        flex: <?php echo '1 1 ' . $small_cc; ?>;
    }
    @media screen and (min-width: 40em) {
        .kr-imagegrid .gitem {
            flex: <?php echo '1 1 ' . $medium_cc; ?>;
        }
    }
    @media screen and (min-width: 64em) {
        .kr-imagegrid .gitem {
            flex: <?php echo '1 1 ' .  $large_cc; ?>;
        }
    }
</style>

<div class="grid-x grid-margin-x">
	<div class="cell kr-imagegrid">
		<?php foreach ($data as $d): ?>
			<?php $link = ''; ?>

			<div class="gitem">
				<?php if ($d['link'] != -1): ?>
					<?php $link = KrMethods::route('index.php?Itemid=' . $d['link']); ?>
					<?php $external = ''; ?>
				<?php elseif (!empty($d['url'])): ?>
					<?php $link = $d['url']; ?>
					<?php $external = 'target="_blank"'; ?>
				<?php endif; ?>

				<?php if ($link): ?>
					<a href="<?php echo $link; ?>" style="cursor:pointer;" <?php echo $external; ?>
				        title="<?php echo KrMethods::plain('MOD_KNOWRES_IMAGEGRID_CLICK_TO_VIEW'); ?>">
				<?php endif; ?>

				<?php $options = ['src'    => $d['image'],
				                  'alt'    => $d['text'],
				                  'class'  => 'th responsive'
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
</div>