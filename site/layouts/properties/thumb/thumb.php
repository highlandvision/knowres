<?php
/**
 * @package    Know Reservations
 * @subpackage Site Layout
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */
/** @noinspection PhpUnhandledExceptionInspection */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Media;
use HighlandVision\KR\SiteHelper;
use HighlandVision\KR\TickTock;
use HighlandVision\KR\Translations;
use Joomla\CMS\HTML\HTMLHelper;

extract($displayData);
/**
 * Layout variables
 *
 * @var array  $items          Properties
 * @var mixed  $params         KR params.
 * @var string $currency       Default currency.
 * @var array  $favs           Favourite properties.
 * @var string $bar            Selected menu bar.
 * @var bool   $byAvailability Search by availability.
 * @var array  $net            Net rates.
 * @var array  $discount       Discount value.
 * @var array  $rating         Review value.
 * @var array  $key_features   Features assigned for filtering
 */

$Translations = new Translations();

$weekly  = KrFactory::getListModel('propertysettings')->getOneSetting('tariffChargesStoredWeeklyYesNo');
$new     = $params->get('search_new', 0);
$created = $new ? TickTock::modifyMonths('now', $new, '-') : false;
$total   = count($items);
$count   = 0;
?>

<div class="grid-x grid-margin-x large-margin-collapse" id="kr-thumb">
	<div class="large-4 show-for-large cell">
		<div id="pinfo" class="pinfo">
			<p><?php echo KrMethods::plain('COM_KNOWRES_VIEW_THUMB_DEFAULT1'); ?></p>
			<p><?php echo KrMethods::plain('COM_KNOWRES_VIEW_THUMB_DEFAULT2'); ?></p>
			<p><?php echo KrMethods::plain('COM_KNOWRES_VIEW_THUMB_DEFAULT3'); ?></p>
		</div>
	</div>
	<div class="small-12 large-8 cell thumbs">
		<?php foreach ($items as $item) : ?>
			<?php $plink = SiteHelper::buildPropertyLink($item->id); ?>
			<?php $image = Media\Images::getPropertyImageName($item->id); ?>
			<a href="<?php echo $plink; ?>" data-id="<?php echo $item->id; ?>" class="container">
				<?php echo HTMLHelper::_('image', Media\Images::getImagePath($item->id, 'solo', $image),
				                         $item->property_name, [
					                         'width'  => $params->get('max_property_width'),
					                         'height' => $params->get('max_property_height')
				                         ]);
				?>
			</a>
			<div class="hideme">
				<div class="thumboverview<?php echo $item->id; ?>">
					<h3 class="h4"><?php echo $item->property_name; ?></h3>
					<?php echo $Translations->getText('property', $item->id, 'p2'); ?>
				</div>
			</div>
		<?php endforeach; ?>
	</div>
</div>