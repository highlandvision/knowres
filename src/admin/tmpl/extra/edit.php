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
use Joomla\CMS\HTML\HTMLHelper;

/** @var HighlandVision\Component\Knowres\Administrator\View\Extra\HtmlView $this */

$params  = KrMethods::getParams();
$setting = KrFactory::getListModel('propertysettings')->getPropertysettings($this->item->property_id, 'currency');

$wa = $this->document->getWebAssetManager();
$wa->useScript('keepalive')
   ->useScript('form.validate');

$this->form->setFieldAttribute('price', 'addonAfter', $setting['currency']);
?>

<form action="<?php echo KrMethods::route('index.php?option=com_knowres&layout=edit&id=' . (int) $this->item->id); ?>"
      aria-label="<?php echo $this->form_aria_label; ?>" class="form-validate" id="extra-form" method="post"
      name="adminForm">

	<div class="main-card">
		<div class="row">
			<div class="col-xl-9 col-xxl-8">
				<?php echo $this->form->renderFieldset('krdata'); ?>
				<?php if (!$params->get('tax_ignore')) : ?>
					<div class="control-group">
						<div class="control-label"><?php echo $this->form->getLabel('tax_id'); ?></div>
						<div class="controls"><?php echo $this->form->getInput('tax_id'); ?></div>
					</div>
				<?php else: ?>
					<input type="hidden" name="jform[tax_id]" value="<?php echo $this->item->tax_id; ?>" />
				<?php endif; ?>
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