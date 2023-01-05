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
use HighlandVision\KR\TickTock;
use Joomla\CMS\Factory;
use Joomla\CMS\HTML\HTMLHelper;

/** @var HighlandVision\Component\Knowres\Administrator\View\Property\CalendarView $this */

/** @var \Joomla\CMS\WebAsset\WebAssetManager $wa */
$wa = Factory::getApplication()->getDocument()->getWebAssetManager();
$wa->useScript('keepalive')
   ->useScript('bootstrap.dropdown')
   ->useScript('com_knowres.admin-geriatric')
   ->useStyle('com_knowres.admin-geriatric');
?>

<div class="main-card">
	<div class="row">
		<div class="col-lg-12">
			<h4 class="h5" style="font-weight:400;">
				<?php echo KrMethods::plain('COM_KNOWRES_PROPERTY_CALENDAR_INSTRUCTIONS'); ?>
			</h4>
			<br>
			<div id="kr-property-calendar" data-property_id="<?php echo $this->item->id; ?>">
				<?php for ($m = 0; $m <= $this->monthsToShow; $m++) : ?>
					<?php echo $this->loadTemplate('month'); ?>
					<?php $this->startDate = TickTock::modifyMonths($this->startDate); ?>
					<?php $this->startMonth = TickTock::getDate($this->startDate, 'Y-m'); ?>
				<?php endfor; ?>
			</div>
		</div>
	</div>
</div>

<div aria-hidden="true" aria-labelledby="kr-contract-modal-book-label" class="modal draggable fade"
     id="kr-contract-modal-book" tabindex="-1">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
		</div>
	</div>
</div>
<div aria-hidden="true" aria-labelledby="kr-calendar-modal-show-label" class="modal draggable fade"
     id="kr-calendar-modal-show" tabindex="-1">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
		</div>
	</div>
</div>

<form action="<?php echo KrMethods::route('index.php?option=com_knowres'); ?>" id="adminForm" method="post"
      name="adminForm">
	<input type="hidden" name="task" value="">
	<?php echo HTMLHelper::_('form.token'); ?>
</form>