<?php
/**
 * @package    Know Reservations
 * @subpackage Site View
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

defined('_JEXEC') or die;

use HighlandVision\KR\Utility;
use Joomla\CMS\HTML\HTMLHelper;

$wa = $this->document->getWebAssetManager();
$wa->getRegistry()->addExtensionRegistryFile('com_knowres');
$wa->useScript('com_knowres.site')
   ->useScript('form.validate')
   ->useScript('keepalive');

HTMLHelper::_('script', trim(Utility::getGmapsURL()), ['async' => 'async', 'defer' => 'defer']);
HTMLHelper::_('script', trim(Utility::getMarkerClustererURL()), ['async' => 'async', 'defer' => 'defer']);
?>

<h1 id="kr-properties-filter-heading" class="h3 show-for-medium">
	<?php echo $this->header; ?>
</h1>

<div class="kr-properties">
	<?php echo $this->loadTemplate('searchbar'); ?>
	<div id="kr-properties-data"></div>
	<div class="small-only-text-center">
		<div class="kr-pager"></div>
	</div>
</div>

<?php echo $this->loadTemplate('modalmap'); ?>