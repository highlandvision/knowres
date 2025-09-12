<?php
/**
 * @package     Know Reservations
 * @subpackage  Library
 * @copyright   2019 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;
?>

<div class="grid-x grid-margin-x">
	<button class="close-button" data-close aria-label="Close modal" type="button">
		<span aria-hidden="true">&times;</span>
	</button>
</div><br>
<div class="grid-x grid-margin-x">
	<div class="small-12 cell text-center">
		<h5><?php echo KrMethods::plain('COM_KNOWRES_ERROR_FATAL'); ?></h5>
	</div>
</div>