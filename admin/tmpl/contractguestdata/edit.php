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
use Joomla\CMS\HTML\HTMLHelper;

/** @var HighlandVision\Component\Knowres\Administrator\View\Contractguestdata\HtmlView $this */

$wa = $this->document->getWebAssetManager();
$wa->useScript('keepalive')
   ->useScript('form.validate')
   ->useScript('com_knowres.admin-guestdata')
   ->useStyle('com_knowres.admin-guestdata');
?>

<form action="<?php echo KrMethods::route('index.php?option=com_knowres&layout=edit&id=' . (int) $this->item->id); ?>"
      class="form-validate" id="contractguestdata-form" method="post" name="adminForm">
	<?php
	echo HTMLHelper::_('uitab.startTabSet', 'kr-guestdataTabs',
		['active' => 'partysize', 'recall' => true, 'breakpoint' => 768]);
	echo HTMLHelper::_('uitab.addTab', 'kr-guestdataTabs', 'kr-partydetails',
		KrMethods::plain('COM_KNOWRES_CONTRACTGUESTDATA_TAB_PARTYINFO'));
	echo $this->loadTemplate('guestinfo');
	echo HTMLHelper::_('uitab.endTab');
	echo HTMLHelper::_('uitab.addTab', 'kr-guestdataTabs', 'kr-arrivalinfo',
		KrMethods::plain('COM_KNOWRES_CONTRACTGUESTDATA_TAB_ARRIVALINFO'));
	echo $this->loadTemplate('arrivalinfo');
	echo HTMLHelper::_('uitab.endTab');
	echo HTMLHelper::_('uitab.addTab', 'kr-guestdataTabs', 'kr-options',
		KrMethods::plain('COM_KNOWRES_CONTRACTGUESTDATA_TAB_OPTIONS'));
	echo $this->loadTemplate('options');
	echo HTMLHelper::_('uitab.endTab');
	echo HTMLHelper::_('uitab.endTabSet');
	?>

	<input type="hidden" name="jform[contract_id]" value="<?php echo $this->contract->id; ?>">
	<input type="hidden" name="jform[guest_id]" value="<?php echo $this->contract->guest_id; ?>">
	<input type="hidden" name="task" value="">
	<?php echo HTMLHelper::_('form.token'); ?>
</form>