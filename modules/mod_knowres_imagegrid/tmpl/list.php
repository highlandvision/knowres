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

$textalign     = $params->get('textalign');
$textcolor     = $params->get('textcolor');
$textbg        = $params->get('textbg');
$verticalalign = $params->get('verticalalign');
$textbold      = $params->get('textbold');
$textsize      = $params->get('textsize') . 'px';
$textoverlay   = $params->get('textoverlay');

$pstyle = '';
$pclass = [];
$pstyle .= 'text-align:' . $textalign . ';';
if ($textalign == 'center')
{
	$pclass[] = 'center';
}
if ($textbold)
{
	$pclass[] = 'strong';
}
if ($textoverlay)
{
	$pclass[] = 'overlay';
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
if (!empty($verticalalign))
{
	$pclass[] = $verticalalign;
}
?>

<div class="kr-imagegrid list">
	<ul>
		<?php foreach ($data as $d): ?>
			<li>
				<?php if ($d['link']): ?>
				    <a href="<?php echo KrMethods::route('index.php?Itemid=' . $d['link']); ?>"
				        title="<?php echo $d['text']; ?>">
				<?php endif; ?>

				<?php if ($d['text']): ?>
					<?php echo $d['text']; ?>
				<?php endif; ?>

				<?php if ($d['link']): ?>
				    </a>
			    <?php endif; ?>
			</li>
		<?php endforeach; ?>
	</ul>
</div>