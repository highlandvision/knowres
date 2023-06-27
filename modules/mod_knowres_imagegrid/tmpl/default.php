<?php
/**
 * @package    Know Reservations
 * @subpackage Admin Controllers
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

use HighlandVision\KR\Framework\KrMethods;

defined('_JEXEC') or die;

if ($count == 1)
{
	$class = "small-block-grid-1";
}
else if ($count == 2)
{
	$class = "small-block-grid-2 medium-block-grid-2";
}
else
{
	$class = "small-block-grid-3 medium-block-grid-3";
}

$textalign     = $params->get('textalign');
$textcolor     = $params->get('textcolor');
$textbg        = $params->get('textbg');
$verticalalign = $params->get('verticalalign');
$textbold      = $params->get('textbold');

if ($params->get('textsize', ""))
{
	$textsize = $params->get('textsize') . "px";
}
else
{
	$textsize = "";
}

$textoverlay = $params->get('textoverlay');

$pstyle = "";
$pclass = [];
$pstyle .= 'text-align:' . $textalign . ';';

if ($textalign == "center")
{
	$pclass[] = "center";
}
if ($textbold)
{
	$pclass[] = "strong";
}
if ($textoverlay)
{
	$pclass[] = "overlay";
}
if ($textcolor)
{
	$pstyle .= 'color:' . $textcolor . ';';
}
if ($textsize)
{
	$pstyle .= 'font-size:' . $textsize . ';';
}
if ($textbg)
{
	$pstyle   .= 'background:' . $textbg . ';';
	$pclass[] = "withbg";
}
if ($verticalalign == "top")
{
	$pclass[] = "top";
}
else if ($verticalalign == "middle")
{
	$pclass[] = "middle";
}
else if ($verticalalign == "bottom")
{
	$pclass[] = "bottom";
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