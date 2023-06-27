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

$pclass[] = $textverticalalign;
if ($textbold) {
	$pclass[] = 'strong';
}
$pstyle = 'text-align:' . $texthorizontalalign . ';';
if ($textcolor) {
	$pstyle .= 'color:' . $textcolor . ';';
}
if ($textsize) {
	$pstyle .= 'font-size:' . $textsize . ';';
}
if (!empty($textbg)) {
	$pstyle   .= 'background:' . $textbg . ';';
	$pclass[] = "withbg";
}
?>

<style>
    .kr-imagegrid .gitem {
        flex: 1 1 <?php echo $small_cc; ?>;
    }
    @media screen and (min-width: 40em) {
        .kr-imagegrid .gitem {
            flex: 1 1 <?php echo $medium_cc; ?>;
        }
    }
    @media screen and (min-width: 64em) {
        .kr-imagegrid .gitem {
            flex: 1 1 <?php echo $large_cc; ?>;
        }
    }
</style>

<div class="row">
    <div class="column kr-imagegrid">
		<?php foreach ($data as $d): ?>
            <div class="gitem">
				<?php if ($d['link']): ?>
                    <a href="<?php echo KrMethods::route('index.php?Itemid=' . $d['link']); ?>"
                        title="<?php echo KrMethods::plain('MOD_KNOWRES_IMAGEGRID_CLICK_TO_VIEW'); ?>">
				<?php endif; ?>

				<?php
					list($width, $height) = getimagesize($d['image']);
					$options = ['src'    => $d['image'],
					            'alt'    => $d['name'],
					            'class'  => 'th responsive',
					            'width'  => $width,
					            'height' => $height
					];
					echo KrMethods::render('joomla.html.image', $options);
				?>

                <?php if ($textoverlay && $d['text']): ?>
                    <p class="<?php echo implode(' ', $pclass); ?>" style="<?php echo $pstyle; ?>">
						<?php echo $d['text']; ?>
                    </p>
				<?php endif; ?>

				<?php if ($d['link']): ?>
                    </a>
			    <?php endif; ?>
            </div>
		<?php endforeach; ?>
    </div>
</div>