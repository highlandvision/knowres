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
use Joomla\CMS\Form\Form;

extract($displayData);
/**
 * Layout variables
 *
 * Service log Form object
 * @var Form $form
 */
?>

<div class="modal-header">
	<h3 class="modal-title" id="kr-ajax-modal-label">
		Data for ID <?php echo $form->getValue('id'); ?>
	</h3>
	<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
</div>
<div class="modal-body">
	<div class="row">
		<div class="col">
			<br>
			<?php echo $form->renderField('errors'); ?>
			<?php echo $form->renderField('method'); ?>
			<?php echo $form->renderField('request'); ?>
			<?php echo $form->renderField('response'); ?>
		</div>
	</div>
</div>
<div class="modal-footer">
	<button class="btn btn-danger" type="button" data-bs-dismiss="modal">
		<?php echo KrMethods::plain('JTOOLBAR_CLOSE'); ?>
	</button>
</div>