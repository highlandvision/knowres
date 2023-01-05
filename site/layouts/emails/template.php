<?php
/**
 * @package     Know Reservations
 * @subpackage  Site Layouts
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

/** @noinspection PhpUnhandledExceptionInspection */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;

extract($displayData);
/**
 * Layout variables
 *
 * @var int    $agency_id    ID of agency.
 * @var string $body_bg      Body background color.
 * @var string $button_bg    Button background color.
 * @var string $content_bg   Content background color.
 * @var string $font         Font name.
 * @var string $font_color   Font color.
 * @var string $font_primary Primary font color.
 * @var int    $font_size    Font size.
 * @var string $affiliates   Affiliates text.
 * @var string $message      Text message..
 */
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
	<meta name="viewport"
	      content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0" />
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<title><?php echo KrMethods::getCfg('sitename'); ?></title>

	<?php echo KrMethods::render('emails.style', ['body_bg'      => $body_bg,
	                                              'content_bg'   => $content_bg,
	                                              'font'         => $font,
	                                              'font_color'   => $font_color,
	                                              'font_primary' => $font_primary,
	                                              'font_size'    => $font_size,
	]);
	?>
</head>

<body style="color:<?php echo $font_color; ?>;background-color:<?php echo $body_bg; ?>;font-family:<?php echo $font; ?>;
	font-size:<?php echo $font_size; ?>;mso-line-height-rule:exactly;line-height:120%;margin:0;padding:0;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;">

	<span style="color:transparent;visibility:hidden;display:none;opacity:0;height:0;width:0;font-size:0;">
		<?php echo KrMethods::plain('COM_KNOWRES_EMAIL_PREHEADER'); ?>
	</span>

	<table class="body"
	       style="text-align:left;width:100%;border:none;background-color:<?php echo $body_bg; ?>;border-collapse:separate;mso-table-lspace:0;mso-table-rspace:0;"
	       role="presentation">
		<tr>
			<td>
				<!--CENTERED CONTAINER-->
				<table class="main"
				       style="text-align:left;margin:0 auto 20px auto;background-color:<?php echo $content_bg; ?>;border:none;
					       border-collapse:separate;mso-table-lspace:0;mso-table-rspace:0;width:620px;max-width:620px;"
				       role="presentation">
					<!--HEADER AREA-->
					<tr>
						<td class="wrapper" style="box-sizing:border-box;padding:20px 20px 20px 20px;">
							<?php echo KrMethods::render('emails.header'); ?>
						</td>
					</tr>
					<!--MAIN CONTENT -->
					<tr>
						<td class="wrapper" style="font-family:<?php echo $font; ?>;font-size:<?php echo $font_size; ?>;
							mso-line-height-rule:exactly;line-height:120%;vertical-align:top;box-sizing:border-box;
							padding:0 20px 0 20px;">
							<?php echo $message; ?>
						</td>
					</tr>
					<!--SPACER -->
					<tr>
						<td style="background-color:<?php echo $content_bg; ?>;height:15px;font-size:0;line-height:0;">
							&nbsp;
						</td>
					</tr>
					<!--AFFILIATES -->
					<?php if ($affiliates): ?>
						<tr>
							<td style="background-color:<?php echo $content_bg; ?>;height:15px;font-size:0;line-height:0;">
								&nbsp;
								<?php echo KrMethods::render('emails.affiliates', ['body_bg'    => $body_bg,
								                                                   'button_bg'  => $button_bg,
								                                                   'content_bg' => $content_bg,
								                                                   'font'       => $font,
								                                                   'font_color' => $font_color,
								                                                   'font_size'  => $font_size,
								]); ?>
							</td>
						</tr>
					<?php endif; ?>
					<!--FOOTER -->
					<tr>
						<td class="wrapper" style="background-color:#fefefe;font-family:<?php echo $font; ?>;
							font-size:11px;vertical-align:top;box-sizing:border-box;">
							<?php echo KrMethods::render('emails.footer', ['agency_id'  => $agency_id,
							                                               'body_bg'    => $body_bg,
							                                               'content_bg' => $content_bg,
							                                               'font'       => $font,
							                                               'font_color' => $font_color,
							                                               'font_size'  => $font_size,
							]); ?>
						</td>
					</tr>
				</table>
			</td>
		</tr>
	</table>
</body>
</html>