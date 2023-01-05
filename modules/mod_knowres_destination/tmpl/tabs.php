<?php
/**
 * @package    Know Reservations
 * @subpackage Site module
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */
/** @noinspection PhpUnhandledExceptionInspection */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\SiteHelper;
use Joomla\CMS\HTML\HTMLHelper;

$Itemid = SiteHelper::getItemId('com_knowres', 'properties', ['region_id' => $params->get('region_id')]);
$link   = KrMethods::route('index.php?option=com_knowres&view=properties&Itemid=' . $Itemid . '&region_id='
	. $params->get('region_id'));
$text   = KrMethods::sprintf('MOD_KNOWRES_DESTINATION_VIEW_PROPERTIES', $destination) . ' >>';

$id     = 'kr-destination-tabs-' . $params->get('region_id');
$panel1 = '#panel1-' . $params->get('region_id');
$panel2 = '#panel2-' . $params->get('region_id');
$panel3 = '#panel3-' . $params->get('region_id');
$panel4 = '#panel4-' . $params->get('region_id');
$panel5 = '#panel5-' . $params->get('region_id');
$tab1   = 'panel1-' . $params->get('region_id');
$tab2   = 'panel2-' . $params->get('region_id');
$tab3   = 'panel3-' . $params->get('region_id');
$tab4   = 'panel4-' . $params->get('region_id');
$tab5   = 'panel5-' . $params->get('region_id');
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
				<?php echo $params->get('heading1'); ?>
			</a>
		</li>
		<li class="tabs-title">
			<a href="<?php echo $panel3; ?>">
				<?php echo $params->get('heading2'); ?>
			</a>
		</li>
		<li class=" tabs-title">
			<a href="<?php echo $panel4; ?>">
				<?php echo $params->get('heading3'); ?>
			</a>
		</li>
		<li class="tabs-title">
			<a href="<?php echo $panel5; ?>">
				<?php echo $params->get('heading4'); ?>
			</a>
		</li>
	</ul>

	<div class="kr-destinations tabs-content" data-tabs-content="<?php echo $id; ?>">
		<div class="tabs-panel is-active image" id="<?php echo $tab1; ?>">
			<?php
			$options = [
				'src'    => $params->get('image'),
				'alt'    => $destination,
				'class'  => 'responsive',
				'width'  => $params->get('width'),
				'height' => $params->get('height')
			];
			echo KrMethods::render('joomla.html.image', $options);
			?>
		</div>
		<div class="tabs-panel" id="<?php echo $tab2; ?>">
			<?php echo $params->get('text1'); ?>
		</div>
		<div class="tabs-panel" id="<?php echo $tab3; ?>">
			<?php echo $params->get('text2'); ?>
		</div>
		<div class="tabs-panel" id="<?php echo $tab4; ?>">
			<?php echo $params->get('text3'); ?>
		</div>
		<div class="tabs-panel" id="<?php echo $tab5; ?>">
			<?php echo $params->get('text4'); ?>
		</div>
	</div>

	<a class="button large gray expanded" title="<?php echo $text; ?>" href="<?php echo $link; ?>">
		<?php echo $text; ?>
	</a>
</div>