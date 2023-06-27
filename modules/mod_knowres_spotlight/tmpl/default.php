<?php
/**
 * @package    Know Reservations
 * @subpackage Site module
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

use HighlandVision\KR\Framework\KrMethods;

defined('_JEXEC') or die;

$class = match ($count) {
	1 => 'small-up-1',
	2 => 'small-up-1 medium-up-2',
	default => 'small-up-1 medium-up-3 large-up-3'
};

$textalign     = $params->get('textalign');
$textbg        = $params->get('textbg');
$textbold      = $params->get('textbold');
$textcolor     = $params->get('textcolor');
$textsize      = $params->get('textsize') . 'px';
$verticalalign = $params->get('verticalalign');

$pclass[] = $textalign;
$pclass[] = $verticalalign;
$pstyle   = '';

if ($textbg) {
	$pstyle   .= 'background:' . $textbg . ';';
	$pclass[] = 'withbg';
}
if ($textbold) {
	$pclass[] = 'strong';
}
if ($textcolor) {
	$pstyle .= 'color:' . $textcolor . ';';
}
if ($textsize) {
	$pstyle .= 'font-size:' . $textsize;
}
?>

<div class="kr-spotlight">
    <div class="row <?php echo $class; ?>">
		<?php foreach ($data as $d): ?>
            <div class="column column-block text-center">
				<?php if ($d['link']): ?>
                <a href="<?php echo KrMethods::route('index.php?Itemid=' . $d['link']); ?>"
                   title="<?php echo $d['text']; ?>">
					<?php endif; ?>

					<?php
					$options = ['src'    => $d['image'],
					            'alt'    => $d['text'],
					            'class'  => 'responsive',
					            'width'  => $params->get('width'),
					            'height' => $params->get('height')
					];
					echo KrMethods::render('joomla.html.image', $options);
					?>

					<?php if ($d['text']): ?>
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