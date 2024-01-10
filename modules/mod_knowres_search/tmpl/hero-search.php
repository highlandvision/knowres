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
use Highlandvision\KR\Model\SiteModel;
use HighlandVision\KR\TickTock;
use Joomla\CMS\Helper\ModuleHelper;

$wa = $app->getDocument()->getWebAssetManager();
$wa->getRegistry()->addExtensionRegistryFile('com_knowres');
$wa->useScript('com_knowres.site-modules');

$form         = KrFactory::getAdhocForm('mod_knowres_search', 'mod_knowres_search.xml', 'module', null);
$show_regions = $params->get('show_regions');
?>

<div class="grid-container">
	<div class="grid-x grid-margin-x">
		<div class="small-12 medium-4 large-12 cell">
			<div class="kr-search slider">
				<form action="<?php echo KrMethods::route('index.php?option=com_knowres&task=properties.search'); ?>"
					method="post" name="search-default">
					<div class="grid-x grid-margin-x">
						<?php if (!empty($search_text) && $show_regions < 1): ?>
							<div class="small-12 medium-12 large-3 cell">
								<h3><?php echo $search_text; ?></h3>
							</div>
						<?php endif; ?>
						<?php if ($show_regions): ?>
							<div class="small-12 medium-12 large-3 cell">
								<?php echo $options; ?>
							</div>
						<?php endif; ?>
						<?php if ($show_datepickers): ?>
							<div class="small-12 medium-12 large-2 cell">
								<?php echo $form->renderField('arrivaldsp',
								                              null,
								                              TickTock::getDate((string) $initial->arrival,
								                                                'j M Y')); ?>
							</div>
							<div class="small-12 medium-12 large-2 cell">
								<?php echo $form->renderField('departuredsp',
								                              null,
								                              TickTock::getDate((string) $initial->departure,
								                                                'j M Y')); ?>
							</div>
							<input type="hidden" id="arrival" name="arrival" value="">
							<input type="hidden" id="departure" name="departure" value="">
						<?php endif; ?>
						<?php if ($show_guests): ?>
						<div class="small-12 medium-12 large-3 cell">
							<?php echo $form->renderField('guests',
							                              null,
							                              $initial->guests,
							                              ['format'     => $show_guests,
							                               'adults'     => $initial->adults,
							                               'children'   => $initial->children,
							                               'child_ages' => $initial->child_ages ?: [],
							                               'max'        => $max_guests
							                              ]); ?>
						</div>
						<?php endif; ?>
						<div class="small-12 medium-12 large-2 cell">
							<button type="submit" class="button expanded">
								<?php echo KrMethods::plain('MOD_KNOWRES_SEARCH_BUTTON'); ?>
								&nbsp;&nbsp;<i class='fa-solid fa-search'></i>
							</button>
						</div>
					</div>

					<?php if ($show_regions == 1): ?>
						<?php require ModuleHelper::getLayoutPath('mod_knowres_search', '_regionpane'); ?>
					<?php endif; ?>
					<?php if ($show_guests): ?>
						<?php require ModuleHelper::getLayoutPath('mod_knowres_search', '_partypane'); ?>
					<?php endif; ?>
				</form>
			</div>
		</div>
	</div>
</div>

<script>
    function setregion(id) {
        let element = document.getElementById('region_id');
        element.value = id;
        element.click();
    }
</script>