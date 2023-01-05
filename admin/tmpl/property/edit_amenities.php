<?php
/**
 * @package     KR
 * @subpackage  Admin views
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

defined('_JEXEC') or die;

if (!$this->params->get('property_stars', false))
{
	$this->form->setFieldAttribute('stars', 'type', 'hidden');
}
?>

<div class="row">
	<div class="col-xl-9">
		<?php echo $this->form->renderFieldset('amenities'); ?>
	</div>
</div>