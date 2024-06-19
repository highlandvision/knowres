<?php
/**
 * @package    Know Reservations
 * @subpackage Site module
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;

$wa = $app->getDocument()->getWebAssetManager();
$wa->getRegistry()->addExtensionRegistryFile('com_knowres');
$wa->useScript('com_knowres.site-modules');
?>

<div class="kr-destinations">
	<div class="grid-x grid-margin-x">
		<div class="small-12 cell">
			<a href="<?php echo $link; ?>">
				<?php echo KrMethods::render('joomla.html.image', $options); ?>
				<h2 class="h4">
					<?php echo $text; ?>
				</h2>
			</a>

			<h4><?php echo $heading1; ?></h4>
			<?php echo $text1; ?>

			<h4><?php echo $heading2; ?></h4>
			<?php echo $text2; ?>

			<h4><?php echo $heading3; ?></h4>
			<?php echo $text3; ?>

			<h4><?php echo $heading4; ?></h4>
			<?php echo $text4; ?>
		</div>
	</div>
</div>