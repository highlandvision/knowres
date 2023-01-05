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

<input type="hidden" name="jform[arrival]" id="arrival" value="<?php echo $this->arrival; ?>">
<input type="hidden" name="jform[departure]" id="departure" value="<?php echo $this->departure; ?>">
<input type="hidden" name="jform[id]" value="0">
<input type="hidden" name="jform[owner_id]" value="<?php echo $this->property->owner_id; ?>">
<input type="hidden" name="jform[property_id]" value="<?php echo $this->property_id; ?>">
<input type="hidden" name="jform[type]" value="agent">
<input type="hidden" name="task" id="task" value="contract.agent">
<input type="hidden" name="action" value="manager">