<?php
/**
 * @package     Know Reservations
 * @subpackage  Site Layouts
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

extract($displayData);
/**
 * Layout variables
 *
 * @var string $body_bg      Body background color.
 * @var string $content_bg   Content background color.
 * @var string $font         Font name.
 * @var string $font_color   Font color.
 * @var string $font_primary Primary font color.
 * @var int    $font_size    Font size.
 */
?>

<style>
	/*RESPONSIVE AND MOBILE FRIENDLY STYLES*/
	@media only screen and (min-width: 600px)  and (max-width: 1200px) {
		table p,
		table ul,
		table ol,
		table td,
		table span,
		table a {
			font: <?php echo $font; ?> !important;
			font-size: <?php echo $font_size; ?> !important;
		}
		strong {
			color: <?php echo $font_primary; ?> !important;
			font: <?php echo $font; ?> !important;
			font-weight:    normal !important;
			font-size:      120% !important;
			padding-bottom: 5px !important;
		}
		table a:hover {
			color: #999 !important;
		}
		td.footer,
		td.footer p,
		td.footer span,
		td.footer a {
			color:     #999999 !important;
			font-size: 12px !important;
			padding:   5px 10px !important;
		}
	}
	/*RESPONSIVE AND MOBILE FRIENDLY STYLES*/
	@media only screen and (max-width: 599px) {
		body, table, td, p, a, li, blockquote {
			-webkit-text-size-adjust: none !important;
		}
		.body {
			background-color: <?php echo $body_bg ;?>;
		}
		table {
			width: 100% !important;
		}
		.responsive-image img {
			height:    auto !important;
			max-width: 100% !important;
			width:     100% !important;
		}
		table h1 {
			font-size:     28px !important;
			margin-bottom: 10px !important;
		}
		table p,
		table ul,
		table ol,
		table td,
		table span,
		table a {
			font-size:   18px !important;
			line-height: 150%;
		}
		table img {
			text-align: center !important;
		}
		table.wrapper {
			background: <?php echo $content_bg; ?> !important;
		}
		table.container {
			padding: 0 !important;
			width:   100% !important;
			background: <?php echo $content_bg; ?> !important;
		}
		table.main {
			border-left-width:  0 !important;
			border-radius:      0 !important;
			border-right-width: 0 !important;
		}
		table td.footer,
		table td.footer p,
		table td.footer span,
		table td.footer a {
			color:     #818181 !important;
			font-size: 14px !important;
			padding:   5px 10px !important;
		}
		table td.stack {
			width:         100% !important;
			display:       block !important;
			text-align:    center !important;
			padding:       8px 0 8px 0 !important;
			font-size:     15px !important;
			border-bottom: 1px solid #fefefe !important;
		}
	}
	/*PRESERVE THESE STYLES IN THE HEAD*/
	@media all {
		.ExternalClass {
			width: 100%;
		}
		.ExternalClass,
		.ExternalClass p,
		.ExternalClass span,
		.ExternalClass font,
		.ExternalClass td,
		.ExternalClass div {
			line-height: 100%;
		}
		.apple-link a {
			color:           inherit !important;
			font-family:     inherit !important;
			font-size:       inherit !important;
			font-weight:     inherit !important;
			line-height:     inherit !important;
			text-decoration: none !important;
		}
		#MessageViewBody a {
			color:           inherit;
			text-decoration: none;
			font-size:       inherit;
			font-family:     inherit;
			font-weight:     inherit;
			line-height:     inherit;
		}
	}
</style>