<?php
/**
 * @package     Know Reservations
 * @subpackage  Site Layout
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

/** @noinspection PhpUnhandledExceptionInspection */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Media;
use Joomla\CMS\HTML\HTMLHelper;

$KRparams = KrMethods::getParams();

extract($displayData);
/**
 * Layout variables
 *
 * @var int   $id   Property ID.
 * @var array $data Property data.
 */
?>

<div class="small-12 columns" data-equalizer-watch>
	<a href="<?php echo $data['plink']; ?>" class="property text-left" title="<?php echo $data['property_name']; ?>">
		<div class="image-wrapper">
			<?php echo HTMLHelper::_('image', Media\Images::getImagePath($id, 'solo', $data['image']),
				$data['property_name'], [
					'width'  => $KRparams->get('max_property_width'),
					'height' => $KRparams->get('max_property_height')
				]);
			?>
			<?php if ($data['summary']) : ?>
				<?php echo KrMethods::render('modules.featured.pricesummary',
					['minrate'  => $data['minrate'],
					 'maxrate'  => $data['maxrate'],
					 'netrate'  => $data['netrate'],
					 'markup'   => $data['markup'],
					 'summary'  => $data['summary'],
					 'currency' => $data['currency']
					]);
				?>
			<?php endif; ?>
		</div>

		<div class="content gray no-margin-bottom">
			<h4 class="h3"><?php echo $data['property_name']; ?></h4>
			<p>
				<?php echo $data['text']; ?>
			</p>

			<div class="occupancy">
				<i class="fas fa-female fa-lg font-hilite"></i>
				<i class="fas fa-male fa-lg font-hilite"></i>
				<?php echo '&nbsp;' . ($data['sleeps']) . ' ' . KrMethods::plain('MOD_KNOWRES_FEATURED_PERSONS'); ?>
				<?php echo ' | ' . ($data['bedrooms']) . ' ' . KrMethods::plain('MOD_KNOWRES_FEATURED_BEDROOMS'); ?>
			</div>
		</div>
	</a>
</div>
