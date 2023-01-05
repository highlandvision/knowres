<?php
/**
 * @package    Know Reservations
 * @subpackage Admin templates
 * @copyright  2021 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Joomla\Extend\HtmlView as KrHtmlView;

extract($displayData);
/**
 * Layout variables
 *
 * @var KrHtmlView $data The view data.
 */
?>

<?php
$iconClass = '';
if (!$data->canChange)
{
	$iconClass = ' inactive';
}
else if (!$data->saveOrder)
{
	$iconClass = ' inactive" title="' . KrMethods::plain('JORDERINGDISABLED');
}
?>
	<span class="sortable-handler <?php echo $iconClass ?>">
	<span class="icon-ellipsis-v" aria-hidden="true"></span>
</span>

<?php if ($data->canChange && $data->saveOrder): ?>
	<label>
		<input class="w-20 text-area-order hidden" name="order[]" size="5" type="text"
		       value="<?php echo $data->item->ordering; ?>">
	</label>
<?php endif; ?>