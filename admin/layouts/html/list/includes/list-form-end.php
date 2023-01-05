<?php
/**
 * @package     KR
 * @subpackage  <Enter sub package>
 * @copyright   Copyright (C) 2021 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

use Joomla\CMS\HTML\HTMLHelper;
?>

<?php echo $this->pagination->getListFooter(); ?>

<input type="hidden" name="task" value="">
<input type="hidden" name="boxchecked" value="0">
<?php echo HTMLHelper::_('form.token'); ?>
</div>
</div>
</div>
</form>