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

$wa = $app->getDocument()->getWebAssetManager();
$wa->getRegistry()->addExtensionRegistryFile('com_knowres');
$wa->useScript('com_knowres.site-modules');

$action       = '/index.php?option=com_knowres&task=properties.search';
$show_regions = $params->get('show_regions', 0);
$show_guests  = $params->get('show_guests', 0);
$max          = KrMethods::getParams()->get('search_maxguests', 16);
?>

<div class="hide-for-large">
	<form action="<?php echo $action; ?>" method="post" name="search-default">
		<div class="grid-container">
			<div class="grid-x grid-margin-x">
				<?php if ($show_regions): ?>
					<div class="small-12 large-3 cell">
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
					<div class="small-12 large-2 cell">
						<?php echo $form->renderField('arrivaldsp',
						                              null,
						                              TickTock::getDate((string) $initial->arrival,
						                                                'j M Y')); ?>
					</div>
					<div class="small-12 large-2 cell">
						<?php echo $form->renderField('departuredsp',
						                              null,
						                              TickTock::getDate((string) $initial->departure,
						                                                'j M Y')); ?>
					</div>
					<input type="hidden" id="arrival" name="arrival" value="">
					<input type="hidden" id="departure" name="departure" value="">
				<?php endif; ?>
				<?php if ($show_guests): ?>
					<div class="small-12 large-3 cell">
						<?php echo $form->renderField('guests',
						                              null,
						                              $initial->guests,
						                              ['adults'            => $initial->adults,
						                               'children'          => $initial->children,
						                               'child_ages'        => $initial->child_ages ?: [],
						                               'max'               => $max
						                              ]); ?>
					</div>
				<?php endif; ?>
				<div class="small-12 large-2 cell">
					<button type="submit" class="button expanded">
						<?php echo KrMethods::plain('MOD_KNOWRES_SEARCH_BUTTON'); ?>
						&nbsp;&nbsp;<i class='fa-solid fa-search'></i>
					</button>
				</div>
			</div>
		</div>
	</form>
</div>