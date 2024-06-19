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

$id     = 'kr-destination-tabs-' . $region_id;
$panel1 = '#panel1-' . $region_id;
$panel2 = '#panel2-' . $region_id;
$panel3 = '#panel3-' . $region_id;
$panel4 = '#panel4-' . $region_id;
$panel5 = '#panel5-' . $region_id;
$tab1   = 'panel1-' . $region_id;
$tab2   = 'panel2-' . $region_id;
$tab3   = 'panel3-' . $region_id;
$tab4   = 'panel4-' . $region_id;
$tab5   = 'panel5-' . $region_id;
?>

<div class="kr-destination-detail">
	<ul id="<?php echo $id; ?>" class="kr-destinations tabs" data-tabs>
		<li class="tabs-title is-active">
			<a href="<?php echo $panel1; ?>">
				<strong><?php echo strtoupper($destination); ?></strong>
			</a>
		</li>
		<li class="tabs-title">
			<a href="<?php echo $panel2; ?>">
				<?php echo $heading1; ?>
			</a>
		</li>
		<li class="tabs-title">
			<a href="<?php echo $panel3; ?>">
				<?php echo $heading2; ?>
			</a>
		</li>
		<li class=" tabs-title">
			<a href="<?php echo $panel4; ?>">
				<?php echo $heading3; ?>
			</a>
		</li>
		<li class="tabs-title">
			<a href="<?php echo $panel5; ?>">
				<?php echo $heading4; ?>
			</a>
		</li>
	</ul>

	<div class="kr-destinations tabs-content" data-tabs-content="<?php echo $id; ?>">
		<div class="tabs-panel is-active image" id="<?php echo $tab1; ?>">
			<?php echo KrMethods::render('joomla.html.image', $options); ?>
		</div>
		<div class="tabs-panel" id="<?php echo $tab2; ?>">
			<?php echo $text1; ?>
		</div>
		<div class="tabs-panel" id="<?php echo $tab3; ?>">
			<?php echo $text2; ?>
		</div>
		<div class="tabs-panel" id="<?php echo $tab4; ?>">
			<?php echo $text3; ?>
		</div>
		<div class="tabs-panel" id="<?php echo $tab5; ?>">
			<?php echo $text4; ?>
		</div>
	</div>

	<a class="button large gray expanded" title="<?php echo $text; ?>" href="<?php echo $link; ?>">
		<?php echo $textplus; ?>
	</a>
</div>