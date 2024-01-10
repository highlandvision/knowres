<?php
/**
 * @package    Know Reservations
 * @subpackage Site module
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\TickTock;
use Joomla\CMS\Helper\ModuleHelper;

$wa = $app->getDocument()->getWebAssetManager();
$wa->getRegistry()->addExtensionRegistryFile('com_knowres');
$wa->useScript('com_knowres.site-modules');

$form         = KrFactory::getAdhocForm('mod_knowres_search', 'mod_knowres_search.xml', 'module', null);
$show_regions = $params->get('show_regions');
?>

<div class="kr-search sidebar">
	<div class="grid-x grid-margin-x">
		<div class="small-12 cell">
			<form action="<?php echo KrMethods::route('index.php?option=com_knowres&task=properties.search'); ?>"
			      class="kr-search sidebar vertical" method="post" name="search-default">
				<?php if ($show_regions): ?>
					<div class="small-12 medium-12 large-3 cell">
						<?php echo $options; ?>
					</div>
				<?php endif; ?>
				<?php if ($show_datepickers): ?>
					<?php echo $form->renderField('arrivaldsp', null,
					                              TickTock::getDate((string) $initial->arrival, 'j M Y')); ?>
					<?php echo $form->renderField('departuredsp', null,
					                              TickTock::getDate((string) $initial->departure, 'j M Y')); ?>
					<input type="hidden" id="arrival" name="arrival">
					<input type="hidden" id="departure" name="departure">
				<?php endif; ?>
				<?php if ($show_guests): ?>
					<?php echo $form->renderField('guests', null, $initial->guests,
					                              ['format'     => $show_guests,
					                               'adults'     => $initial->adults,
					                               'children'   => $initial->children,
					                               'child_ages' => $initial->child_ages ?: [],
					                               'max'        => $max_guests
					                              ]);
					?>
				<?php endif; ?>
				<?php if ($show_flexible): ?>
					<?php echo $form->renderField('flexible', null, $initial->flexible); ?>
				<?php endif; ?>

				<button type="submit" class="button expanded large no-margin-bottom">
					<?php echo KrMethods::plain("MOD_KNOWRES_SEARCH_BUTTON"); ?>
					&nbsp;&nbsp;<i class='fa-solid fa-search'></i>
				</button>

				<?php if ($show_guests): ?>
					<?php require ModuleHelper::getLayoutPath('mod_knowres_search', '_partypane'); ?>
				<?php endif; ?>
			</form>
		</div>
	</div>
</div>