<?php
/**
 * @package     KR
 * @subpackage  Admin views
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

defined('_JEXEC') or die;
?>

<div class="alert alert-secondary" role="alert">
	<h6>Indicate for each of the items below if:</h6>
	<p> a) they are to be charged for reservations from this agent and</p>
	<p>b) if they are already included in the total notified by the agent.</p>
	<p>If they are to be charged and are not included in the agent total then they will be
	   added to the agent total and thus increase the reservation total by the amount of the items.</p>
	<p>If they are to be charged but are already included in the agent total then the reservation total will not be
	   increased.</p>
</div>