<?php
/**
 * @package     KR
 * @subpackage  Admin Layouts
 * @copyright   Copyright (C) 2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

extract($displayData);
/**
 * Layout variables
 *
 * @var string $button_bg Button background color.
 * @var string $font      Font name.
 * @var string $link      Button link.
 * @var string $text      Button text.
 */
?>

<table style="border:none;border-collapse:collapse;width:100%;">
	<tr>
		<td>
			<table style="border:none;border-collapse:collapse;">
				<tr>
					<td style="text-align:center;background-color:<?php echo $button_bg; ?>;border-radius:10px;
						font-family:<?php echo $font; ?>;">
						<a href="<?php echo $link; ?>"
						   style="border:1px solid <?php echo $button_bg; ?>;border-radius:10px;color:#fefefe;
							   display:inline-block;font-weight:600;font-family:<?php echo $font; ?>;font-size:16px;
							   padding:8px 16px 8px 16px;text-align:center;text-decoration:none;">
							<?php echo $text; ?>
						</a>
					</td>
				</tr>
			</table>
		</td>
	</tr>
</table>