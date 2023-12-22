<?php
/**
 * @package     KR
 * @subpackage  Admin views
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

defined('_JEXEC') or die;

use HighlandVision\KR\Media;
use Joomla\CMS\Factory;

/** @noinspection PhpUnhandledExceptionInspection */
$wa = Factory::getApplication()->getDocument()->getWebAssetManager();
$wa->useScript('keepalive')
   ->useScript('bootstrap.dropdown')
   ->useScript('form.validate');

$this->lines = Media\Pdf::listPdfs('propertys', $this->item->id);
?>

<div class="main-card">
	<div class="row">
		<div class="col-lg-4">
			<?php echo $this->loadTemplate('youtube'); ?>
		</div>
		<div class="col-lg-4">
			<?php echo $this->loadTemplate('addpdf'); ?>
		</div>
		<?php if (count($this->lines)): ?>
			<div class="col-lg-4">
				<?php echo $this->loadTemplate('delpdf'); ?>
			</div>
		<?php endif; ?>
	</div>
	<div class="row">
		<div class="col-lg-12">
			<?php echo $this->loadTemplate('propertyimage'); ?>
		</div>
	</div>
</div>