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