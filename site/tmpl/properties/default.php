<?php
/**
 * @package    Know Reservations
 * @subpackage Site View
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Utility;
use Joomla\CMS\HTML\HTMLHelper;

$wa = $this->document->getWebAssetManager();
$wa->getRegistry()->addExtensionRegistryFile('com_knowres');
$wa->useScript('com_knowres.site')
   ->useScript('com_knowres.modules')
   ->useScript('form.validate')
   ->useScript('keepalive');

HTMLHelper::_('script', trim(Utility::getGmapsURL()), ['async' => 'async', 'defer' => 'defer']);
?>

	<h1 class="show-for-large">
		<?php echo $this->header; ?>
	</h1>

	<div class="kr-properties" data-view="<?php echo $this->Search->data->view; ?>">
		<div class="row kr-properties-header">
			<div class="large-3 columns show-for-large">
				<h3 class="kr-refine-search">
					<?php echo KrMethods::plain('COM_KNOWRES_SEARCH_REFINE_RESULTS'); ?>
				</h3>
			</div>
			<div class="small-12 large-9 columns">
				<?php echo $this->loadTemplate('menubar'); ?>
				<?php echo $this->loadTemplate('mobilebar'); ?>
				<div id="kr-properties-sortby" class="kr-sortby top show-for-large flexbox-inline hideme"></div>
			</div>
		</div>
		<div class="row">
			<div class="sidebar large-3 columns show-for-large" id="sidebar-left">
				<div id="kr-sidebar-search"><!--Loaded by ajax--></div>
				<div id="kr-properties-filters" class="kr-filters"></div>
			</div>
			<div class="small-12 large-9 columns">
				<div id="kr-properties-data"></div>

				<div class="small-only-text-center">
					<div class="kr-pager"></div>
				</div>
			</div>
		</div>
	</div>

<?php echo $this->loadTemplate('modalmap'); ?>