<?php
/**
 * @package     KR
 * @subpackage  Admin views
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 * @version     3.3.1
 */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\TickTock;
use Joomla\CMS\Session\Session;

$wa = $this->document->getWebAssetManager();
$wa->useScript('keepalive')
   ->useScript('form.validate')
   ->useScript('com_knowres.admin-gantt')
   ->useStyle('com_knowres.admin-gantt');

$departure = TickTock::getDate();
$value     = TickTock::getDate('now', 'd M Y');
$picker    = $departure;
?>

<div id="filter-bar" class="btn-toolbar kr-gantt-toolbar" role="toolbar"
     aria-label="<?php echo KrMethods::plain("JTOOLBAR"); ?>">
	<div>
		<input aria-label="<?php echo KrMethods::plain('COM_KNOWRES_FROM'); ?>"
		       class="form-control uicalendar input-mini" data-avail="" id="ganttpicker" name="filter-departure-dsp"
		       type="text" value="<?php echo $value; ?>">
	</div>
	<input id="ganttpicker1" name="filter_departure" type="hidden" value="<?php echo $picker; ?>">
	<button aria-label="Backward" class="btn btn-secondary btn-sm ganttchange" data-direction="left" type="button">
		<i class="fas fa-lg fa-hand-point-left"></i>
	</button>
	<button aria-label="Forward" class="btn btn-secondary btn-sm ganttchange" data-direction="right" type="button">
		<i class="fas fa-lg fa-hand-point-right"></i>
	</button>
	<div class="input-group mb-3">
		<input aria-label="<?php echo KrMethods::plain('COM_KNOWRES_GANTT_SEARCH') ?>"
		       class="form-control typeahead shadow-none"
		       placeholder="<?php echo KrMethods::plain('COM_KNOWRES_GANTT_SEARCH') ?>"
		       type="text">
		<span class="input-group-text" style="padding:0 0.5rem;height:40px;">
            <i class="fas fa-search"></i>
		</span>
	</div>
	<div id="ganttselections"></div>
</div>
<br>
<div class="clearfix"></div>
<div class="fn-gantt-loader">
	<div class="fn-gantt-loader-spinner">Please wait....</div>
</div>

<div class="kr-gantt">
</div>

<div aria-hidden="true" aria-labelledby="kr-gantt-modal-show-label" class="modal draggable fade"
     id="kr-gantt-modal-show" tabindex="-1">
	<div class="modal-dialog modal-lg modal-dialog-scrollable">
		<div class="modal-content">
		</div>
	</div>
</div>

<div aria-hidden="true" aria-labelledby="kr-gantt-modal-book-label" class="modal draggable fade"
     id="kr-gantt-modal-book" tabindex="-1">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
		</div>
	</div>
</div>

<?php echo '<input id="token" type="hidden" name="' . Session::getFormToken() . '" value="1">'; ?>