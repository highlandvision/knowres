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

$class = match ($count)
{
	1 => 'small-up-1',
	2 => 'small-up-1 medium-up-2',
	default => 'small-up-1 medium-up-3 large-up-3'
};

$textalign     = $params->get('textalign');
$textcolor     = $params->get('textcolor');
$textbg        = $params->get('textbg');
$verticalalign = $params->get('verticalalign');
$textbold      = $params->get('textbold');

$pstyle   = '';
$pclass   = [];
$pclass[] = match ($params->get('textalign'))
{
	'center' => 'center',
	'left' => 'left'
};
if ($params->get('textbold'))
{
	$pclass[] = 'strong';
}
if ($params->get('textcolor'))
{
	$pstyle .= 'color:' . $params->get('textcolor') . ';';
}
if ($params->get('textbg'))
{
	$pstyle   .= 'background:' . $params->get('textbg') . ';';
	$pclass[] = 'withbg';
}
$pclass[] = match ($params->get('verticalalign'))
{
	'top' => 'top',
	'middle' => 'middle',
	'bottom' => 'bottom'
};
?>

<div class="kr-spotlight">
	<div class="row <?php echo $class; ?>">
		<?php foreach ($data as $d): ?>
			<div class="column column-block text-center">
				<?php if ($d['link']): ?>
				<a href="<?php echo (string) KrMethods::route('index.php?Itemid=' . $d['link']); ?>"
				   title="<?php echo $d['text']; ?>">
					<?php endif; ?>

					<?php
					$options = [
						'src'    => $d['image'],
						'alt'    => $d['text'],
						'class'  => 'responsive',
						'width'  => $params->get('width'),
						'height' => $params->get('height')
					];
					echo KrMethods::render('joomla.html.image', $options);
					?>

					<?php if ($d['text']): ?>
						<p class="<?php echo implode(" ", $pclass); ?>" style="<?php echo $pstyle; ?>">
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