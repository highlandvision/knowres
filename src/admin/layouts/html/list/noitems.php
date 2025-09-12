<?php
/**
 * @package     KR
 * @subpackage  Admin Layouts
 * @copyright   Copyright (C) 2021 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

use HighlandVision\KR\Framework\KrMethods;
?>

<div class="alert alert-info">
	<span class="icon-info-circle" aria-hidden="true"></span>
	<span class="visually-hidden">
		<?php echo KrMethods::plain('INFO'); ?>
	</span>
	<?php echo KrMethods::plain('JGLOBAL_NO_MATCHING_RESULTS'); ?>
</div>