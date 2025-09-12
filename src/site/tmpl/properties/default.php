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

HTMLHelper::_('script', trim(Utility::getGmapsURL()), [], ['async' => 'async', 'defer' => 'defer']);
HTMLHelper::_('script', trim(Utility::getMarkerClustererURL()), [], ['async' => 'async', 'defer' => 'defer']);
?>

<?php echo $this->loadTemplate('heading'); ?>
<?php echo $this->loadTemplate('main'); ?>
<?php echo $this->loadTemplate('modalmap'); ?>