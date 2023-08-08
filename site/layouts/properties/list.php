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
use HighlandVision\KR\SiteHelper;
use HighlandVision\KR\TickTock;
use HighlandVision\KR\Translations;

extract($displayData);
/**
 * Layout variables
 *
 * @var array  $items          Properties
 * @var mixed  $params         KR params.
 * @var string $currency       Default currency.
 * @var bool   $favicon        Property is favourite.
 * @var bool   $saved          Property is favourite.
 * @var string $view           Selected view.
 * @var bool   $byAvailability Search by availability.
 * @var array  $net            Net rates.
 * @var array  $discount       Discount value.
 * @var array  $rating         Review value.
 */

$Translations = new Translations();
$weekly       = KrFactory::getListModel('propertysettings')->getOneSetting('tariffChargesStoredWeeklyYesNo');
$new          = $params->get('search_new', 0);
if ($new) {
	$created = TickTock::modifyMonths('now', $new, '-');
}
?>
<br><br>
<div class="kr-property">
	<div class="row">
		<?php foreach ($items as $item) : ?>
			<div class="small-12 medium-6 columns slider">
				<?php $plink = SiteHelper::buildPropertyLink($item->id); ?>
				<?php $id = 'kr-property-' . $item->id; ?>
				<div id="<?php echo $id; ?>" class="<?php echo $view; ?>">
					<div class="card">
						<?php if ($item->imagefilename) : ?>
							<div class="slideshow">
								<?php echo KrMethods::render('properties.slideshow', ['item'         => $item,
								                                                      'params'       => $params,
								                                                      'plink'        => $plink,
								                                                      'Translations' => $Translations
								]); ?>
								<?php if ($favicon): ?>
									<?php echo KrMethods::render('properties.favicon', ['item'  => $item,
									                                                    'saved' => $saved,
									                                                    'view'  => $view
									]); ?>
								<?php endif; ?>
								<?php if ($new && $item->created_at >= $created): ?>
									<?php echo KrMethods::render('properties.badge'); ?>
								<?php endif; ?>
								<div class="pricing">
									<?php echo KrMethods::render('properties.pricing',
									                             ['item'           => $item,
									                              'currency'       => $currency,
									                              'byAvailability' => $byAvailability,
									                              'net'            => $net[$item->id] ?? 0,
									                              'discount'       => $discount[$item->id] ?? 0,
									                              'weekly'         => $weekly[$item->id] ?? $weekly[0],
									                              'plink'          => $plink
									                             ]);
									?>
								</div>
							</div>
						<?php endif; ?>
						<div class="card-section">
							<a href="<?php echo $plink; ?>" style="cursor:pointer" title="<?php echo $item->property_name; ?>">
								<div class="row">
									<div class="medium-10 columns">
										<h2 class="h4">
											<?php echo $item->property_name; ?>
										</h2>
										<div class="info">
											<div class="location">
												<?php echo Translations::getCountryName($item->country_id) .  ' / ' .
													$item->region_name . ' / ' .
													Translations::getTownName($item->town_id) . ' / ' .
													$item->property_area; ?>
											</div>
											<div class="size">
												<?php echo KrMethods::plain('COM_KNOWRES_SLEEPS'); ?>
												<?php echo $item->sleeps; ?>
												<?php if ($item->sleeps_extra): ?>
													+ <?php echo $item->sleeps_extra; ?>
												<?php endif; ?>
												<?php echo ' / '; ?>
												<?php echo KrMethods::plain('COM_KNOWRES_BEDROOMS'); ?>
												<?php echo $item->bedrooms; ?>
												<?php echo ' / '; ?>
												<?php echo KrMethods::plain('COM_KNOWRES_BATHROOMS'); ?>
												<?php echo $item->bathrooms; ?>
												<?php echo ' / '; ?>
												<?php echo KrMethods::plain('COM_KNOWRES_PETS'); ?>
												<?php echo $item->pets; ?>
											</div>
										</div>
									</div>
									<div class="medium-2 columns">
										<?php if ($item->avgrating > 0): ?>
											<div class="rating">
												<div>
													<p><?php echo $item->avgrating; ?>&nbsp
														<i class="fas fa-star"></i></p>
												</div>
											</div>
										<?php endif; ?>
									</div>
								</div>
							</a>
						</div>
					</div>
				</div>
			</div>
		<?php endforeach; ?>
	</div>
</div>