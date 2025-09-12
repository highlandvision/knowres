<?php
/**
 * @package     KR
 * @subpackage  Admin views
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;

$extras = KrFactory::getListModel('extras')->getByProperty($this->property_id);
if (!count($extras))
{
	return;
}
?>

<fieldset>
	<legend><?php echo KrMethods::plain('COM_KNOWRES_CONTRACT_EXTRAS_LBL'); ?></legend>
	<?php echo $this->form->renderField('extras'); ?>
</fieldset>

