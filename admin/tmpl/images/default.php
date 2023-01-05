<?php
/**
 * @package     KR
 * @subpackage  Admin views
 * @copyright   2021 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */
/** @noinspection PhpUnhandledExceptionInspection */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;

/** @var HighlandVision\Component\Knowres\Administrator\View\Images\HtmlView $this */

$params = KrMethods::getParams();

$wa = $this->document->getWebAssetManager();
$wa->useScript('keepalive')
   ->useScript('form.validate')
   ->useScript('com_knowres.admin-images')
   ->useScript('com_knowres.vendor-jqueryui')
   ->useStyle('com_knowres.admin-images');

include(JPATH_ADMINISTRATOR . '/components/com_knowres/layouts/html/list/includes/list-header.php');
?>

<?php echo $this->loadTemplate('dropzone'); ?>

<?php include(JPATH_ADMINISTRATOR . '/components/com_knowres/layouts/html/list/includes/list-form-start.php'); ?>
	<table class="table" id="kr-list">
		<?php echo KrMethods::render('html.list.caption', ['name' => $this->name]); ?>
		<thead>
		<?php echo $this->loadTemplate('th'); ?>
		</thead>

		<tbody <?php if ($this->saveOrder): ?> class="js-draggable" data-url="<?php echo $this->saveOrderingUrl; ?>"
			data-direction="<?php echo strtolower($this->listDirn); ?>"<?php endif; ?>>
		<?php echo $this->loadTemplate('td'); ?>
		</tbody>
	</table>
<?php include(JPATH_ADMINISTRATOR . '/components/com_knowres/layouts/html/list/includes/list-form-end.php'); ?>

<?php echo $this->loadTemplate('order'); ?>