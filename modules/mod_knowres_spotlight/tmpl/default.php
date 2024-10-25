<?php
/**
 * @package    Know Reservations
 * @subpackage Site module
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

use Joomla\CMS\Helper\ModuleHelper;

defined('_JEXEC') or die;

$wa = $app->getDocument()->getWebAssetManager();
$wa->getRegistry()->addExtensionRegistryFile('com_knowres');
$wa->useScript('com_knowres.site-modules');

$textbg    = $params->get('textbg');
$textbold  = $params->get('textbold');
$textcolor = $params->get('textcolor');
$textsize  = $params->get('textsize') . 'px';
$height    = $params->get('height') . 'px';
$count     = count($images);

$pstyle   = '';
$pclass[] = $params->get('horizontal');
if ($textbg) {
	$pstyle .= 'position:absolute;';
	$pstyle .= 'background:' . $textbg . ';';
	$pclass[] = 'withbg';
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
		foreach ($images as $d) {
			echo match ($count) {
				3       => '<div class="small-12 medium-4 cell" style="position:relative;">',
				2       => '<div class="small-12 medium-6 cell" style="position:relative;">',
				default => '<div class="small-12 cell" style="position:relative;">',
			};

			if (count($images) - 1 == $num) {
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