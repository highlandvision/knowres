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
	<h6>Indicate, via the fields below, if reservations for this agent should be created as confimed or
	    provisional.</h6>
	<p>1. If Agent confirmed is set to Yes then it is assumed that the guest will have paid a deposit to the agent
	   and thus the reservation will be confirmed. The percentage of the deposit should be entered in Deposit paid to
	   agent.
	   A payment will be created, for information purposes only, for the amount that the guest paid the
	   agent.</p>
	<p>2. If Agent confirmed is set to No then a provisional reservations wil be created for this agent.
	   The deposit will be calculated using the standard deposit settings for the booked property unless a value is
	   entered in Deposit override. If the deposit has to be calculated using the agent total rather than the
	   calculated reservation total then set Agent value to Yes.</p>
</div>