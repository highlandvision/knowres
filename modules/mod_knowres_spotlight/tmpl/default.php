<?php
/**
 * @package    Know Reservations
 * @subpackage Site module
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

use HighlandVision\KR\Framework\KrMethods;
use Joomla\CMS\Helper\ModuleHelper;

defined('_JEXEC') or die;

$textbg    = $params->get('textbg');
$textbold  = $params->get('textbold');
$textcolor = $params->get('textcolor');
$textsize  = $params->get('textsize') . 'px';
$height    = $params->get('height') . 'px';
$count     = count($data);

$pstyle   = '';
$pclass[] = $params->get('horizontal');
if ($textbg) {
	$pstyle .= 'background:' . $textbg . ';';
}
else {
	$pclass[] = 'nobg';
}
if ($textbold) {
	$pclass[] = 'strong';
}
if ($textcolor) {
	$pstyle .= 'color:' . $textcolor . ';';
}
if ($textsize) {
	$pstyle .= 'font-size:' . $textsize . ';';
}
?>

<div class="kr-spotlight grid-x grid-margin-x">
	<?php
		$num = 0;
		foreach ($data as $d) {
			echo match ($count) {
				3       => '<div class="small-12 medium-4 cell">',
				2       => '<div class="small-6 cell">',
				default => '<div class="small-12 cell">',
			};

			if (count($data) - 1 == $num) {
				$pclass[] = 'last';
			}

			$link = '';
			if ($d['link'] != -1) {
				$link     = $d['link'];
				$external = '';
			}

			require ModuleHelper::getLayoutPath('mod_knowres_spotlight', '_item');

			echo '</div>';
			$num++;
		}
	?>
</div>