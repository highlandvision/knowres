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

$wa = $this->document->getWebAssetManager();
$wa->useScript('keepalive')
   ->useScript('form.validate');
?>

<form action="<?php echo KrMethods::route('index.php?option=com_knowres'); ?>" class="form-validate"
      id="export-form" method="post" name="adminForm">

	<div class="main-card">
		<div class="row">
			<div class="col-xl-9 col-xxl-8">
				<?php echo $this->form->renderFieldset('krdata'); ?>
			</div>
		</div>
	</div>

	<?php echo HTMLHelper::_('form.token'); ?>
	<input type="hidden" name="task" value="">
</form>