<?php
/**
 * @package     Know Reservations
 * @subpackage  Site Layouts
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

use HighlandVision\KR\Framework\KrMethods;

$params = KrMethods::getParams();
$Itemid = $params->get('link_cancellation', '0');
if (!$params->get('email_affiliates', 0) || !$Itemid) {
	return;
}

extract($displayData);
/**
 * Layout variables
 *
 * @var string $body_bg    Body background color.
 * @var string $button_bg  Button bacjground color.
 * @var string $content_bg Content background color.
 * @var string $font       Font name.
 * @var string $font_color Font color.
 * @var int    $font_size  Font size.
 */

// Override font color
$font_color      = "#fefefe";
$terms           = KrMethods::route(KrMethods::getRoot() . 'index.php?Itemid=' . $Itemid);
$travelinsurance = $params->get('link_travelinsurance', '');
$carhire         = $params->get('link_carhire', '');
$flights         = $params->get('link_flights', '');
$count           = 1;
$width           = '100%';
if (!empty($travelinsurance)) {
	$count++;
}
if (!empty($carhire)) {
	$count++;
}
if (!empty($flights)) {
	$count++;
}
if ($count == 2) {
	$width = '50%';
}
else if ($count == 3) {
	$width = '33.3%';
}
else if ($count == 4) {
	$width = '25%';
}
?>
<!--Keep width attribute -->
<!--suppress HtmlDeprecatedAttribute -->
<table class="affiliates" width="100%" style="border:none;border-collapse:collapse;width:100%!important;text-align:center!important;padding:16px 16px 16px 16px;background-color:<?php echo $button_bg; ?>">
	<tr style="text-align:center">
		<?php if ($terms): ?>
			<td class="stack"
			    style="text-align:center!important;color:<?php echo $font_color; ?>;width:<?php echo $width; ?>;font-family:<?php echo $font; ?>;font-size:14px;padding:15px 0 15px 0;">
				<a href="<?php echo $terms; ?>"
				   style="font-size:14px;padding:15px 0 15px 0;color:<?php echo $font_color; ?>;"
				   title="<?php echo KrMethods::plain('COM_KNOWRES_EMAIL_TERMS'); ?>">
					<?php echo KrMethods::plain('COM_KNOWRES_EMAIL_TERMS'); ?>
				</a>
			</td>
		<?php endif; ?>
		<?php if ($travelinsurance): ?>
			<td class="stack" style="text-align:center;width:<?php echo $width; ?>;font-family:<?php echo $font; ?>;">
				<a href="<?php echo $travelinsurance; ?>"
				   style="text-align:center;font-size:14px;padding:15px 0 15px 0;color:<?php echo $font_color; ?>;"
				   title="<?php echo KrMethods::plain('COM_KNOWRES_TRAVEL_INSURANCE'); ?>">
					<?php echo KrMethods::plain('COM_KNOWRES_EMAIL_AFFILIATE_TRAVEL_INSURANCE'); ?>
				</a>
			</td>
		<?php endif; ?>
		<?php if ($carhire): ?>
			<td style="text-align:center;width:<?php echo $width; ?>;font-family:<?php echo $font; ?>;color:<?php echo $font_color; ?>;font-size:14px;padding:15px 0 15px 0;">
				<a href="<?php echo $carhire; ?>"
				   style="text-align:center;font-size:14px;padding:15px 0 15px 0;color:<?php echo $font_color; ?>;"
				   title="<?php echo KrMethods::plain('COM_KNOWRES_CAR_HIRE'); ?>">
					<?php echo KrMethods::plain('COM_KNOWRES_EMAIL_AFFILIATE_CAR_HIRE'); ?>
				</a>
			</td>
		<?php endif; ?>
		<?php if ($flights): ?>
			<td class="stack"
			    style="text-align:center;width:<?php echo $width; ?>;font-family:<?php echo $font; ?>;color:<?php echo $font_color; ?>;font-size:14px;padding:15px 0 15px 0;">
				<a href="<?php echo $flights; ?>"
				   style="font-size:14px;padding:15px 0 15px 0;color:<?php echo $font_color; ?>;"
				   title="<?php echo KrMethods::plain('COM_KNOWRES_FLIGHTS'); ?>">
					<?php echo KrMethods::plain('COM_KNOWRES_EMAIL_AFFILIATE_FLIGHT'); ?>
				</a>
			</td>
		<?php endif; ?>
	</tr>
</table>