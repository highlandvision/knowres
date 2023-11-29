<?php
/**
 * @package    Know Reservations
 * @subpackage Site View
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

/** @noinspection PhpUnhandledExceptionInspection */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\SiteHelper;

$Itemid = SiteHelper::getItemId('com_knowres', 'contact');
$link   = KrMethods::route('index.php?option=com_knowres&view=contact&Itemid=' . $Itemid . '&id='
	. $this->item->id);
?>

<div id="kr-bookmodule" class="text-center" style="padding:0.5rem;">
	<h4>
		<?php echo KrMethods::plain('COM_KNOWRES_SEARCH_REQUEST_CONTACT'); ?>
	</h4>
	<br>
	<div class="custom bold">
		<i class='fa-solid fa-envelope fa-1x'></i>
		<a href="<?php echo $link; ?>" title="<?php echo $this->item->property_name; ?>">
			<?php echo KrMethods::plain('COM_KNOWRES_SEND_REQUEST'); ?>
		</a>
		<br><br>
	</div>
</div>