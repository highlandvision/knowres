<?php
/**
 * @package     KR
 * @subpackage  Admin views
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */
/** @noinspection PhpUnhandledExceptionInspection */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;
?>

<div class="modal" id="errorModal" aria-labelledby="errorModalLabel">
	<div class="modal-dialog modal-dialog-centered">
		<div class="modal-content">
			<div class="modal-header">
				<h3 class="red">Error</h3>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
			</div>
			<div class="modal-body">
				<br>
				<p id="errorModalMessage"></p>
			</div>
			<div class="modal-footer">
				<button class="btn btn-danger" type="button" data-bs-dismiss="modal">
					<?php echo KrMethods::plain('JTOOLBAR_CLOSE'); ?>
				</button>
			</div>
		</div>
	</div>
</div>