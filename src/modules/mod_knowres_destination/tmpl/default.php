<?php
/**
 * @package    Know Reservations
 * @subpackage Site module
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

use HighlandVision\KR\Framework\KrMethods;

// phpcs:disable PSR1.Files.SideEffects
defined('_JEXEC') or die;
// phpcs:enable PSR1.Files.SideEffects

$wa = $app->getDocument()->getWebAssetManager();
$wa->getRegistry()->addExtensionRegistryFile('com_knowres');
$wa->useScript('com_knowres.site-modules');
?>

<div class="kr-destinations">
	<a class="button primary small" href="<?php echo $link; ?>">
		<?php echo $text; ?>
	</a>

	<?php echo KrMethods::render('joomla.html.image', $options); ?>

	<h4><?php echo $heading1; ?></h4>
	<?php echo $text1; ?>

	<h4><?php echo $heading2; ?></h4>
	<?php echo $text2; ?>

	<h4><?php echo $heading3; ?></h4>
	<?php echo $text3; ?>

	<h4><?php echo $heading4; ?></h4>
	<?php echo $text4; ?>
</div>