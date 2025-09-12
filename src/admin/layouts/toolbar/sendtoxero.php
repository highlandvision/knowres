<?php
/**
 * @package    Know Reservations
 * @subpackage Admin Layout
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;
use Joomla\CMS\HTML\HTMLHelper;

HTMLHelper::_('behavior.core');

$title   = $displayData['title'];
$message = KrMethods::plain('COM_KNOWRES_CONTRACT_XERO_SELECT');
$message = addslashes($message);
$confirm = KrMethods::plain('COM_KNOWRES_CONTRACT_XERO_CONFIRM');
$confirm = addslashes($confirm);
?>

<button onclick='
	if (document.adminForm.boxchecked.value === "0") {
	alert("<?php echo $message; ?>");
	return false;
	}
	let result = confirm( "<?php echo $confirm; ?>");
	if (result)
	Joomla.submitform("contract.batchxero");
	else
	return false;
	'
        class="btn btn-small">
	<i class="icon-flash" title="<?php echo $title; ?>"></i>
	<?php echo $title; ?>
</button>