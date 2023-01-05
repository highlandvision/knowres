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

<input type="hidden" name="jform[arrival]" id="arrival" class="kr-calculate" value="<?php echo $this->arrival; ?>">
<input type="hidden" name="jform[departure]" id="departure" class="kr-calculate" value="<?php echo $this->departure; ?>">
<input type="hidden" name="jform[id]" value="<?php echo $this->item->id; ?>">
<input type="hidden" name="jform[property_id]" value="<?php echo $this->property_id; ?>">
<input type="hidden" name="jform[guest_id]" id="guest_id" value="<?php echo $this->item->guest_id; ?>">
<input type="hidden" name="task" id="task" value="contract.manager">
<input type="hidden" name="action" value="manager">