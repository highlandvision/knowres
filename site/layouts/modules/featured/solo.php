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

use HighlandVision\KR\Currency;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Media;
use HighlandVision\KR\Utility;
use Joomla\CMS\HTML\HTMLHelper;

$KRparams = KrMethods::getParams();

extract($displayData);
/**
 * Layout variables
 *
 * @var int   $id   Property ID.
 * @var array $data Property data.
 */

$booknow = KrMethods::plain('MOD_KNOWRES_FEATURED_BOOK') . ' ' . KrMethods::plain('MOD_KNOWRES_FEATURED_NOW');
?>

<div class="small-12 columns">
	<a href="<?php echo $data['plink']; ?>" title="<?php echo $data['property_name']; ?>">
		<?php echo HTMLHelper::_('image', Media\Images::getImagePath($id, 'solo', $data['image']),
			$data['property_name'], [
				'width'  => $KRparams->get('max_property_width'),
				'height' => $KRparams->get('max_property_height')
			]);
		?>

		<div class="price">
			<?php if ($data['minrate'] > 0): ?>
				<?php $price = Utility::roundValue($data['minrate'], 0, 1); ?>
				<p class="from"><?php echo strtolower(KrMethods::plain('MOD_KNOWRES_FEATURED_FROM_PRICE')); ?></p>
				<p class="rate"><?php echo Utility::displayValue($price, $data['currency'], false); ?></p>
			<?php elseif ($data['summary']): ?>
				<p class="from"><?php echo strtolower(KrMethods::plain('MOD_KNOWRES_FEATURED_FROM')); ?></p>
				<p class="rate">
					<?php echo Currency::getSimpleValue($data['summary'], $data['currency']); ?>
				</p>
			<?php else: ?>
				<p class="request"><?php echo KrMethods::plain('MOD_KNOWRES_FEATURED_SEARCH_REQUEST'); ?></p>
			<?php endif; ?>
		</div>

		<div class="content">
			<div class="content-left">
				<h4><?php echo $data['property_name']; ?></h4>
				<h5><?php echo $data['bedrooms'] . 'BR / ' . $data['property_area']; ?></h5>
			</div>
			<div class="content-right">
				<p class="button expand large"><?php echo $booknow; ?></p>
			</div>
		</div>
	</a>
</div>
