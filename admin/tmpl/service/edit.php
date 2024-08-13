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
use HighlandVision\KR\Utility;
use Joomla\CMS\HTML\HTMLHelper;

/** @var HighlandVision\Component\Knowres\Administrator\View\Service\HtmlView $this */
$wa = $this->document->getWebAssetManager();
$wa->useScript('keepalive')
   ->useScript('form.validate');

if ($this->item->type == 'g') {
	$this->form->setFieldAttribute('currency', 'type', 'listpaymentcurrency');
	$this->form->setFieldAttribute('currency', 'required', 'false');
	$this->form->setFieldAttribute('property_id', 'type', 'listforeignkey');
	$this->form->setFieldAttribute('property_id', 'layout', 'joomla.form.field.list-fancy-select');
}
//TODO-v5.2 Sort out Xero
//if ($this->item->plugin === 'xero' && $this->item->id > 0)
//{
//	$xero = new Xero($this->item->id);
//	$data = $xero->getAccounts(true);
//}
?>

<form action="<?php echo KrMethods::route('index.php?option=com_knowres&layout=edit&id=' . $this->item->id); ?>"
      aria-label="<?php echo $this->form_aria_label; ?>" class="form-validate" id="service-form" method="post"
      name="adminForm">

	<div class="main-card">
		<div class="row">
			<div class="col-xl-9 col-xxl-8">
				<?php echo $this->form->renderFieldset('krdata'); ?>
				<?php echo $this->adhoc->renderFieldset('custom'); ?>
			</div>
			<div class="col-xl-3 offset-xxl-1">
				<?php echo KrMethods::render('joomla.edit.global', $this); ?>
			</div>
		</div>
	</div>

	<?php echo HTMLHelper::_('form.token'); ?>

	<input type="hidden" name="jform[id]" value="<?php echo $this->item->id; ?>">
	<input type="hidden" name="jform[plugin]" value="<?php echo $this->plugin; ?>">
	<input type="hidden" name="jform[type]" value="<?php echo $this->type; ?>">
	<input type="hidden" name="jform[parameters]"
	       value="<?php echo Utility::encodeJson($this->item->parameters); ?>">
	<input type="hidden" name="existing"
	       value="<?php echo htmlentities(Utility::encodeJson($this->item->parameters)); ?>">
	<input type="hidden" name="task" value=''>
</form>