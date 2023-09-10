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

$action = KrMethods::getRoot() . 'index.php?option=com_knowres&task=properties.search';
?>

<form action="<?php echo $action; ?>" class="kr-search sidebar vertical" method="post" name="search-default">
	<div class="row">
		<div class="small-12 columns">
			<?php if ($params->get('show_regions', 1)): ?>
				<?php echo $form->renderField('region_id', null, $initial->region_id,
					['regions' => $regions]); ?>
			<?php endif; ?>
			<?php if ($params->get('show_datepickers', 1)): ?>
				<?php echo $form->getInput('arrivaldsp', null,
					TickTock::getDate((string) $initial->arrival, 'j M Y')); ?>
				<?php echo $form->getInput('departuredsp', null,
					TickTock::getDate((string) $initial->departure, 'j M Y')); ?>
				<input type="hidden" id="arrival" name="arrival">
				<input type="hidden" id="departure" name="departure">
			<?php endif; ?>
			<?php if ($params->get('show_guests', 1)): ?>
				<?php echo $form->renderField('guests', null, $initial->guests, [
					'adults'            => $initial->adults,
					'children'          => $initial->children,
					'child_ages'        => $initial->child_ages ?: [],
					'max'               => KrMethods::getParams()->get('search_maxguests', 16),
					'sleeps_infant_max' => 0,
					'sleeps_infant_age' => 0,
				]);
				require ModuleHelper::getLayoutPath('mod_knowres_search', '_partypane');
				?>
			<?php endif; ?>
			<?php if ($params->get('show_flexible', 1)): ?>
				<div class="small-12 columns">
					<?php echo $form->renderField('flexible', null, $initial->flexible); ?>
				</div>
			<?php endif; ?>

			<button type="submit" class="button expanded large no-margin-bottom">
				<?php echo KrMethods::plain("MOD_KNOWRES_SEARCH_BUTTON"); ?>&nbsp;&nbsp;<i class="fas fa-search"></i>
			</button>
		</div>
	</div>
</form>