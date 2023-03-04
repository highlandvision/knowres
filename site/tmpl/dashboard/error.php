<?php
/**
 * @package     Know Reservations
 * @subpackage  Library
 * @copyright   2019 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

defined('_JEXEC') or die;

use Highlandvision\KR\Framework\KrMethods;
?>

<div class="row">
	<button class="close-button" data-close aria-label="Close modal" type="button">
		<span aria-hidden="true">&times;</span>
	</button>
</div><br>
<div class="row">
	<div class="small-12 columns text-center">
		<h5><?php echo KrMethods::plain('COM_KNOWRES_ERROR_FATAL'); ?></h5>
	</div>
</div>