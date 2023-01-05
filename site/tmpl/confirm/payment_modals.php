<?php
/**
 * @package     Know Reservations
 * @subpackage  Site Controller
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */
/** @noinspection PhpUnhandledExceptionInspection */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;

$termsurl = KrMethods::route('index.php?option=com_knowres&task=property.terms&id=' . $this->property->id, false);
?>

<div id="errorModal" class="tiny reveal" data-reveal>
	<button class="close-button" data-close aria-label="Close modal" type="button">
		<span aria-hidden="true">&times;</span>
	</button>
	<p><?php echo KrMethods::plain('COM_KNOWRES_PAYMENT_ERROR'); ?></p>
</div>

<div id="kr-terms-modal" class="reveal small kr-ajax-modal" data-reveal data-v-offset="0"
     data-ajaxurl="<?php echo $termsurl; ?>"></div>
<div id="kr-gateway-modal" class="reveal small" data-reveal data-v-offset="50"></div>
<div id="ajaxModal" class="reveal small" data-reveal></div>