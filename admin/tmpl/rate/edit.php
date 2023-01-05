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

use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use Joomla\CMS\HTML\HTMLHelper;

/** @var HighlandVision\Component\Knowres\Administrator\View\Rate\HtmlView $this */

$settings = KrFactory::getListModel('propertysettings')->getPropertysettings($this->item->property_id, 'beyond_rates');
if ($settings['beyond_rates'])
{
	$this->form->setFieldAttribute('name', 'required', false);
}

$wa = $this->document->getWebAssetManager();
$wa->useScript('keepalive')
   ->useScript('form.validate');
?>

<form action="<?php echo KrMethods::route('index.php?option=com_knowres&layout=edit&id=' . (int) $this->item->id); ?>"
      aria-label="<?php echo $this->form_aria_label; ?>" class="form-validate" id="rate-form" method="post"
      name="adminForm">

	<div class="main-card">
		<div class="row">
			<div class="col-xl-9 col-xxl-8">
				<?php echo $this->form->renderFieldset('krdata'); ?>
				<div class="control-group">
					<div class="control-label">
					</div>
					<div class="controls">
						<div class="row">
							<div class="col-lg-3">
								<?php echo $this->form->getLabel('min_guests'); ?>
							</div>
							<div class="col-lg-3">
								<?php echo $this->form->getLabel('max_guests'); ?>
							</div>
							<div class="col-lg-3">
								<?php echo $this->form->getLabel('rate'); ?>
							</div>
							<div class="col-lg-3">
								<?php echo $this->form->getLabel('ignore_pppn'); ?>
							</div>
						</div>
					</div>
				</div>
				<div class="control-group">
					<div class="control-label">
						<?php echo KrMethods::plain('COM_KNOWRES_RATE_MORE_GUESTS_LBL'); ?>
					</div>
					<div class="controls">
						<div class="row">
							<div class="col-lg-3">
								<?php echo $this->form->getInput('min_guests'); ?>
							</div>
							<div class="col-lg-3">
								<?php echo $this->form->getInput('max_guests'); ?>
							</div>
							<div class="col-lg-3">
								<?php echo $this->form->getInput('rate'); ?>
							</div>
							<div class="col-lg-3">
								<?php echo $this->form->getInput('ignore_pppn'); ?>
							</div>
						</div>
					</div>
				</div>

				<?php echo $this->form->renderFieldset('krfield'); ?>
				<div class="control-group">
					<div class="control-label">
					</div>
					<div class="controls">
						<?php echo KrMethods::plain('COM_KNOWRES_RATE_MIN_GUESTS_DSC'); ?><br>
						<?php echo KrMethods::plain('COM_KNOWRES_RATE_MAX_GUESTS_DSC'); ?><br>
						<?php echo KrMethods::plain('COM_KNOWRES_RATE_IGNORE_PPPN_DSC'); ?>
					</div>
				</div>

			</div>
			<div class="col-xl-3 offset-xxl-1">
				<?php echo KrMethods::render('joomla.edit.global', $this); ?>
			</div>
		</div>
	</div>

	<input type="hidden" name="jform[property_id]" value="<?php echo $this->property_id; ?>">
	<input type="hidden" name="task" value="">
	<?php echo HTMLHelper::_('form.token'); ?>
</form>