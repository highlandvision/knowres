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

/** @var HighlandVision\Component\Knowres\Administrator\View\Contract\HtmlView $this */

$wa = $this->document->getWebAssetManager();
$wa->useScript('keepalive')
	->useScript('form.validate')
	->useScript('webcomponent.field-fancy-select')
	->useScript('bootstrap.dropdown')
	->useScript('bootstrap.modal')
	->usePreset('choicesjs')
	->useScript('com_knowres.admin-book')
	->useStyle('com_knowres.admin-book');
?>

	<div id="message"></div>

	<form action="<?php echo KrMethods::route('index.php?option=com_knowres&layout=edit&id=' . (int) $this->item->id); ?>"
	      class="form-validate" id="contract-form" method="post" name="adminForm">

		<div class="main-card">
			<div class="row">
				<div class="col">
					<?php if ($this->item->id): ?>
						<?php echo KrMethods::plain('COM_KNOWRES_CONTRACT_EDIT_EDIT'); ?>
					<?php else: ?>
						<?php echo KrMethods::plain('COM_KNOWRES_CONTRACT_MANAGER_TITLE_DSC'); ?>
					<?php endif; ?>
				</div>
			</div>
			<div class="row">
				<div id="container-datepicker">
					<div id="book-datepicker"></div>
				</div>
			</div>
			<div class="row">
				<div class="col-lg-7">
					<fieldset>
						<div id="jform_ajax_warning" style="display:none;margin-bottom:1rem"></div>
						<?php echo $this->loadTemplate('dates'); ?>
						<?php if (!$this->agent) : ?>
							<div class="hideinitial">
								<?php echo $this->loadTemplate('coupon'); ?>
								<?php echo $this->loadTemplate('extras'); ?>
								<?php echo $this->loadTemplate('date_options'); ?>
								<?php echo $this->loadTemplate('guest'); ?>
								<?php echo $this->loadTemplate('notes'); ?>
							</div>
						<?php else: ?>
							<?php echo $this->loadTemplate('agent_details'); ?>
							<div class="hideinitial">
								<?php echo $this->loadTemplate('date_options'); ?>
								<?php echo $this->loadTemplate('guest'); ?>
								<?php echo $this->loadTemplate('notes'); ?>
							</div>
						<?php endif; ?>
					</fieldset>
				</div>
				<div class="col-lg-5">
					<div class="hideinitial">
						<?php if (!$this->agent) : ?>
							<?php echo $this->loadTemplate('totals'); ?>
						<?php else: ?>
							<?php echo $this->loadTemplate('totals_agent'); ?>
						<?php endif; ?>
					</div>
				</div>
			</div>
		</div>

		<?php if (!$this->agent) : ?>
			<?php echo $this->loadTemplate('hidden'); ?>
		<?php else: ?>
			<?php echo $this->loadTemplate('hidden_agent'); ?>
		<?php endif; ?>

		<?php echo HTMLHelper::_('form.token'); ?>
	</form>

	<div id="kr-manager-book" data-pid="<?php echo $this->property_id; ?>" data-today="<?php echo $this->today; ?>"
	     data-arrival="<?php echo $this->arrival; ?>" data-departure="<?php echo $this->departure; ?>"
	     data-editid="<?php echo $this->item->id; ?>" data-maxdate="<?php echo $this->maxdate; ?>">
	</div>

<?php echo KrMethods::render('contract.modal.error'); ?>