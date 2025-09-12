<?php
/**
 * @package     KR
 * @subpackage  Admin views
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;

/** @var HighlandVision\Component\Knowres\Administrator\View\Property\HtmlView $this */

$this->form->setFieldAttribute('security_amount', 'addonBefore', $this->settings['currency']);
?>

<div class="row">
	<div>
		<legend><?php echo KrMethods::plain('COM_KNOWRES_PROPERTY_LEGEND_SECURITY'); ?></legend>
		<?php echo $this->form->renderFieldset('security'); ?>
		<legend><?php echo KrMethods::plain('COM_KNOWRES_PROPERTY_LEGEND_CHECKINFEES'); ?></legend>
		<?php echo $this->form->renderFieldset('checkintimesfees'); ?>
		<legend><?php echo KrMethods::plain('COM_KNOWRES_PROPERTY_LEGEND_CANCELLATION'); ?></legend>
		<?php echo $this->form->renderFieldset('cancellation'); ?>
		<legend><?php echo KrMethods::plain('COM_KNOWRES_PROPERTY_LEGEND_CONTACT'); ?></legend>
		<?php echo $this->form->renderFieldset('contact'); ?>
	</div>
</div>