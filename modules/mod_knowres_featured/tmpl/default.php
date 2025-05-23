<?php
/**
 * @package    Know Reservations
 * @subpackage Site module
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

defined('_JEXEC') or die;

use HighlandVision\KR\Currency;
use HighlandVision\KR\Framework\KrMethods;
use Joomla\CMS\Helper\ModuleHelper;

$wa = $app->getDocument()->getWebAssetManager();
$wa->getRegistry()->addExtensionRegistryFile('com_knowres');
$wa->useScript('com_knowres.site-modules');

$Currency = new Currency();
?>

<div class="grid-x">
	<div class="small-10 cell">
		<h3>
			<?php if (!$title): ?>
				<?php echo KrMethods::plain('MOD_KNOWRES_FEATURED_FEATURED'); ?>
				<span class="color-custom">
					<?php echo KrMethods::plain('MOD_KNOWRES_FEATURED_VILLAS'); ?>
				</span>
				<?php echo KrMethods::plain('MOD_KNOWRES_FEATURED_BEST'); ?>
				<span class="color-custom">
					<?php echo KrMethods::plain('MOD_KNOWRES_FEATURED_QUALITY'); ?>
				</span>
			<?php else: ?>
				<?php echo $title; ?>
			<?php endif; ?>
		</h3>
	</div>
	<div class="small-2 cell">
		<div class="kr-double-arrows"></div>
	</div>
</div>

<div class="grid-x kr-featured kr-slick" data-slidestoshow="<?php echo $slidestoshow; ?>">
		<?php foreach ($items as $item): ?>
		<?php require ModuleHelper::getLayoutPath('mod_knowres_featured', $params->get('layout', 'default') . '_item'); ?>
	<?php endforeach; ?>
</div>