<?php
/**
 * @package     Know Reservations
 * @subpackage  Site Layouts
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */
/** @noinspection PhpUnhandledExceptionInspection */

use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\TickTock;
use HighlandVision\KR\Utility;

extract($displayData);
/**
 * Layout variables
 *
 * @var int    $agency_id  ID of agency.
 * @var string $body_bg    Body background color.
 * @var string $content_bg Content background color.
 * @var string $font       Font name.
 * @var string $font_color Font color.
 * @var int    $font_size  Font size.
 */

//Override
$color = '#818181';

$company = '';
$contact = '';
if ($agency_id)
{
	$agency = KrFactory::getAdminModel('agency')->getItem($agency_id);
	if (!empty($agency->id))
	{
		$company = $agency->name;
		$address = Utility::formatAddress(
			$agency->street,
			'',
			$agency->postcode,
			$agency->town,
			$agency->region_id,
			$agency->country_id,
			', '
		);
		$contact = $agency->name . ' ' . $address . ' ' . $agency->telephone;
	}
}

$payby = KrMethods::plain('COM_KNOWRES_PAY_BY');
$url   = KrMethods::getRoot();
$visa  = $url . 'media/com_knowres/images/credit_cards/visa_48.png';
$mc    = $url . 'media/com_knowres/images/credit_cards/mastercard_48.png';
$amex  = $url . 'media/com_knowres/images/credit_cards/amex_48.png';
?>

<table style="border:none;border-collapse:collapse;">
	<tr>
		<td class="footer" style="text-align:center;font-family:<?php echo $font; ?>;color:<?php echo $color; ?>;font-size:11px;padding:5px 20px 10px 20px;">
			<p style="font-family:<?php echo $font; ?>;color:<?php echo $color; ?>;">
				<?php echo KrMethods::sprintf('COM_KNOWRES_EMAIL_DISCLAIMER', $company); ?>
			</p>
		</td>
	</tr>
	<tr>
		<td class="footer" style="text-align:center;font-family:<?php echo $font; ?>;color:<?php echo $color; ?>;font-size:11px;margin: 0 auto;padding:5px 20px 20px 20px;">
			<?php if ($contact) : ?>
				<?php echo $contact; ?><br>
			<?php endif; ?>
			<?php echo '&copy; ' . TickTock::getDate('now', 'Y') . ' All rights reserved'; ?>
		</td>
	</tr>
	<tr>
		<td class="footer" style="text-align:center;color:<?php echo $color; ?>;padding:5px 20px 5px 20px;">
			<img src="<?php echo $visa; ?>"
			     width="32" height="26" alt="<?php echo $payby; ?> Visa">
			<img src="<?php echo $mc; ?>"
			     width="32" height="26" alt="<?php echo $payby; ?> Mastercard">
			<img src="<?php echo $amex; ?>"
			     width="32" height="26" alt="<?php echo $payby; ?> American Express">
		</td>
	</tr>
</table>