<?php
/**
 * @package     KR
 * @subpackage  Admin views
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

use HighlandVision\KR\Framework\KrMethods;

// phpcs:disable PSR1.Files.SideEffects
defined('_JEXEC') or die;
// phpcs:enable PSR1.Files.SideEffects

/** @var HighlandVision\Component\Knowres\Administrator\View\Mapcategories\HtmlView $this */

include(JPATH_ADMINISTRATOR . '/components/com_knowres/layouts/html/list/includes/list-header.php');
?>

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