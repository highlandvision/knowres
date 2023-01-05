<?php
/**
 * @package     KR
 * @subpackage  Admin views
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

/** @noinspection PhpUnhandledExceptionInspection */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Media;
use HighlandVision\KR\TickTock;
use HighlandVision\KR\Translations;
use HighlandVision\KR\Utility;
use Joomla\CMS\HTML\HTMLHelper;

$Translations = new Translations();
$region_name  = $Translations->getText('region', $this->item->region_id);
$country_name = $Translations->getText('country', $this->item->country_id);
$image        = Media\Images::getPropertyImageName($this->item->id);

$sleeps = $this->item->sleeps;
if ((int) $this->item->sleeps_extra > 0)
{
	$sleeps .= ' + ' . $this->item->sleeps_extra;
}

$edit        = KrMethods::route('index.php?option=com_knowres&task=property.edit&id=' . $this->item->id);
$changerates = KrMethods::route('index.php?option=com_knowres&task=propertysettings.solo&property_id=' . $this->item->id
	. '#rates');
?>

<?php if (isset($this->item->checked_out) && $this->item->checked_out
	&& ($this->item->checked_out != KrMethods::getUser()->id)) : ?>
	<div class="row">
		<div class="col">
			<h3 style="color:red;">
				<?php echo KrMethods::sprintf('COM_KNOWRES_PROPERTYDASHBOARD_CHECKOUT',
					KrMethods::getUser($this->item->checked_out)->name,
					TickTock::displayTS($this->item->checked_out_time),
					KrMethods::route('index.php?option=com_knowres&task=property.checkin&id=' . $this->item->id)
				);
				?>
			</h3>
			<br>
		</div>
	</div>
<?php endif; ?>

<div class="row">
	<div class="col-12 col-md-4 col-lg-2">
		<?php echo HTMLHelper::_('image', Media\Images::getImagePath($this->item->id, 'solo', $image),
			$this->item->property_name, ['class' => "img-fluid"]); ?>
	</div>
	<div class="col-12 col-md-8 col-lg-4">
		<h3><?php echo $this->item->property_name; ?></h3>
		<h5 style="font-weight:normal;">
			<?php echo $this->item->property_area . ', ' . $region_name . ', ' . $country_name; ?>
		</h5>
		<?php if (!empty($this->owner->id)) : ?>
			<dl class="row">
				<dt class="col-12 col-md-3">
					<?php echo KrMethods::plain('COM_KNOWRES_OWNER') . ":"; ?>
				</dt>
				<dd class="col-12 col-md-9">
					<?php echo $this->owner->name; ?>
					<?php if ($this->access_level > 10) : ?>
						<span class="smaller">
						<a style="text-decoration:underline;font-size:86%;" href="<?php echo $edit; ?>">
							<?php echo KrMethods::plain('COM_KNOWRES_CHANGE'); ?>
						</a>
					</span>
					<?php endif; ?>
				</dd>

				<?php if ($this->owner->email): ?>
					<dt class="col-12 col-md-3">
						<?php echo KrMethods::plain('COM_KNOWRES_EMAIL') . ":"; ?>
					</dt>
					<dd class="col-12 col-md-9">
						<a href="mailto:<?php echo $this->owner->email; ?>">
							<?php echo $this->owner->email; ?>
						</a>&nbsp;
					</dd>
				<?php endif; ?>

				<?php if ($this->owner->mobile): ?>
					<?php $mobile = Utility::formatPhoneNumber($this->owner->mobile,
						$this->owner->mobile_country_id); ?>
					<dt class="col-12 col-md-3">
						<?php echo KrMethods::plain('COM_KNOWRES_OWNERS_MOBILE') . ":"; ?>
					</dt>
					<dd class="col-12 col-md-9">
						<a href="tel:<?php echo $mobile; ?>">
							<?php echo $mobile; ?>
						</a>
					</dd>
				<?php endif; ?>
			</dl>
		<?php endif; ?>
	</div>
	<div class="col-12 col-lg-6">
		<dl class="row">
			<dt class="col-12 col-md-3">
				<?php echo KrMethods::plain('COM_KNOWRES_PROPERTIES_BOOKING_TYPE') . ":"; ?>
			</dt>
			<dd class="col-12 col-md-9">
				<?php echo KrFactory::getAdminModel('property')::bookingTypeText((int) $this->item->booking_type); ?>
				<?php if ($this->access_level > 10) : ?>
					<span class="smaller">
						<a style="text-decoration:underline;font-size:86%;" href="<?php echo $edit; ?>">
							<?php echo KrMethods::plain('COM_KNOWRES_CHANGE'); ?>
						</a>
					</span>
				<?php endif; ?>
			</dd>

			<dt class="col-12 col-md-3">
				<?php echo KrMethods::plain('JSTATUS') . ":"; ?>
			</dt>
			<dd class="col-12 col-md-9">
				<?php echo match ($this->item->state)
				{
					1 => KrMethods::plain('JPUBLISHED'),
					0 => KrMethods::plain('JUNPUBLISHED'),
					2 => KrMethods::plain('JARCHIVED'),
					-2 => KrMethods::plain('JTRASHED')
				};
				?>
			</dd>

			<dt class="col-12 col-md-3">
				<?php echo KrMethods::plain('COM_KNOWRES_PROPERTY_LEGEND_NOTIFICATIONS') . ":"; ?>
			</dt>
			<dd class="col-12 col-md-9">
				<?php echo str_replace(',', '<br>', $this->item->property_email); ?>
			</dd>

			<dt class="col-12 col-md-3">
				<?php echo KrMethods::plain('Details') . ":"; ?>
			</dt>
			<dd class="col-12 col-md-9">
				<?php
				echo KrMethods::plain('COM_KNOWRES_PROPERTIES_SLEEPS') . ': ' . $sleeps . ' ';
				echo KrMethods::plain('COM_KNOWRES_PROPERTIES_BEDROOMS') . ': ' . $this->item->bedrooms . ' ';
				echo KrMethods::plain('COM_KNOWRES_PROPERTIES_BATHROOMS') . ': ' . $this->item->bathrooms . ' ';
				echo KrMethods::plain('COM_KNOWRES_PROPERTIES_WC') . ': ' . $this->item->wc;
				?>
			</dd>

			<dt class="col-12 col-md-3">
				<?php echo KrMethods::plain('COM_KNOWRES_RATES_TITLE') . ':'; ?>
			</dt>
			<dd class="col-12 col-md-9">
				<?php echo $this->settings['currency'] . ' '; ?>
				<?php if ($this->settings['beyond_rates']): ?>
					<?php echo KrMethods::plain('COM_KNOWRES_PROPERTYSETTINGS_RATE_BEYOND'); ?>
				<?php elseif ($this->settings['managed_rates']): ?>
					<?php echo KrMethods::plain('COM_KNOWRES_PROPERTYSETTINGS_RATE_MANAGER'); ?>
				<?php elseif ($this->settings['net_rates']): ?>
					<?php echo KrMethods::plain('COM_KNOWRES_PROPERTYSETTINGS_RATE_NET'); ?>
				<?php else: ?>
					<?php echo KrMethods::plain('COM_KNOWRES_STANDARD_RATES'); ?>
				<?php endif; ?>
				<?php if ($this->access_level == 40): ?>
					<span class="smaller">
						<a style="text-decoration:underline;font-size:86%;" href="<?php echo $changerates; ?>">
							<?php echo KrMethods::plain('COM_KNOWRES_CHANGE'); ?>
						</a>
					</span>
				<?php endif; ?>
			</dd>

			<?php if ($this->settings['cluster']
				&& ($this->settings['managed_rates'] || $this->settings['beyond_rates'])): ?>
				<dt class="col-xs-3">
					<?php echo KrMethods::plain('COM_KNOWRES_CURRENCY'); ?>
				</dt>
				<dd class="col-xs-9">
					<?php echo ', ' . KrMethods::plain('COM_KNOWRES_CLUSTER_TITLE') . ' '
						. $Translations->getText('cluster',
							$this->settings['cluster']); ?>
				</dd>
			<?php endif; ?>
		</dl>
	</div>
</div>
