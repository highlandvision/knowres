<?php
/**
 * @package     Know Reservations
 * @subpackage  Site Layouts
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */
/** @noinspection PhpUnhandledExceptionInspection */

use HighlandVision\KR\Framework\KrMethods;

$src = KrMethods::getRoot() . 'images/branding/email_logo.png';
?>

<a href="<?php KrMethods::getRoot(); ?>" style="text-decoration:underline;">
	<img alt="<?php echo KrMethods::getCfg('sitename'); ?>" src="<?php echo $src; ?>" width="280" height="78"
	     style="border:none;-ms-interpolation-mode:bicubic;max-width:100%;display:block;">
</a>