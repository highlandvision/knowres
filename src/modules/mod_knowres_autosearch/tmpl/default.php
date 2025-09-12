<?php
/**
 * @since      3.3.0
 * @subpackage Site module
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 * @package    Know Reservations
 */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;

$wa  = $app->getDocument()->getWebAssetManager();
$wa->getRegistry()->addExtensionRegistryFile('com_knowres');
$wa->useScript('com_knowres.site-modules');

$lang = KrMethods::getLanguage();
$lang->load('mod_knowres_autosearch', '/modules/mod_knowres_autosearch');
?>

<?php
$absolute = $params->get('absolute');
$top      = $params->get('top') . 'px;';
$left     = $params->get('left') . 'px;';
$right    = $params->get('right') . 'px;';

$pstyle = '';
if ($absolute) {
	$pstyle .= 'position:absolute;';
	$pstyle .= 'top:' . $top;
	if ($params->get('left')) {
		$pstyle .= 'left:' . $left;
	}
	if ($params->get('right')) {
		$pstyle .= 'right:' . $right;
	}
}
?>

<div id="kr-autosearch-wrapper" style="<?php echo $pstyle; ?>">
	<div class="input-group">
		<label class="input-group-label" for="kr-autosearch">
			<i class="fa-solid fa-lg fa-magnifying-glass"></i>
		</label>
		<input class="kr-autosearch input-group-field" id="kr-autosearch"
		       placeholder="<?php echo KrMethods::plain('MOD_KNOWRES_AUTOSEARCH_PLACEHOLDER'); ?>" type="text">
	</div>
</div>