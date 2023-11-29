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
use HighlandVision\KR\TickTock;
use Joomla\CMS\Helper\ModuleHelper;

$wa = $app->getDocument()->getWebAssetManager();
$wa->getRegistry()->addExtensionRegistryFile('com_knowres');
$wa->useScript('com_knowres.site-modules');

$action       = 'index.php?option=com_knowres&task=properties.search';
$show_regions = $params->get('show_regions', 0);
$show_guests  = $params->get('show_guests', 0);
?>

<div class="grid-container">
	<div class="grid-x grid-margin-x">
		<div class="small-12 medium-4 large-12 cell">
			<div class="kr-search <?php echo $params->get('hero-position'); ?>">
				<form action="<?php echo $action; ?>" method="post" name="search-default">
					<div class="grid-x grid-margin-x">
						<?php if (!empty($params->get('search_text', '') && $params->get('show_regions') < 1)): ?>
							<div class="small-12 medium-12 large-3 cell">
								<h3><?php echo $params->get('search_text'); ?></h3>
							</div>
						<?php endif; ?>
						<?php if ($show_regions): ?>
							<div class="small-12 medium-12 large-3 cell">
								<?php echo $form->renderField('region_id',
							                              null,
							                              $show_regions < 1 ? $initial->region_id :
								                              KrMethods::plain('MOD_KNOWRES_SEARCH_LOCATION'),
							                              ['regions'      => $regions,
							                               'show_regions' => $show_regions
							                              ]); ?>
							</div>
						<?php endif; ?>
						<?php if ($params->get('show_datepickers', 1)): ?>
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
							                              ['adults'            => $initial->adults,
							                               'children'          => $initial->children,
							                               'child_ages'        => $initial->child_ages ?: [],
							                               'max'               => KrMethods::getParams()
							                                                               ->get('search_maxguests',
							                                                                     16),
							                               'sleeps_infant_max' => 0,
							                               'sleeps_infant_age' => 0
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

					<?php $collapse = ''; ?>
					<?php if ($show_guests): ?>
						<?php require ModuleHelper::getLayoutPath('mod_knowres_search', '_partypane'); ?>
					<?php endif; ?>
					<?php if ($show_regions == 1): ?>
						<?php require ModuleHelper::getLayoutPath('mod_knowres_search', '_regionpane'); ?>
					<?php elseif ($show_regions == 2): ?>
						<?php require ModuleHelper::getLayoutPath('mod_knowres_search', '_regionspane'); ?>
					<?php endif; ?>
				</form>
			</div>
		</div>
	</div>
</div>