<?php
/**
 * @package    Know Reservations
 * @subpackage Site module
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;
?>

<a href="<?php echo KrMethods::route('index.php?option=com_knowres&view=properties&region_id=' . $region_id . '&Itemid='
	. $Itemid . '&display=map'); ?>"
   class="button">
	<?php echo KrMethods::plain('MOD_KNOWRES_SEARCHBYMAP_BUTTON'); ?>
	<i class='fa-solid fa-search'></i>
</a>