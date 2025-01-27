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
use Joomla\CMS\HTML\HTMLHelper;

extract($displayData);
/**
 * Layout variables
 *
 * @var  string $label    The label of the item.
 * @var  string $icon     The icon classname.
 * @var  string $id       Element ID
 * @var  int    $item_id  The item ID.
 * @var  string $type     Target type task or edit or view
 * @var  string $view     View or task
 * @var  string $field    Link field
 * @var  string $layout   Target layout
 * @var  string $gobackto Return view
 */

$vars   = [];
$vars[] = 'option=com_knowres';

if ($type == 'edit')
{
	$split  = explode('.', $view);
	$vars[] = 'view=' . $split[0];
	$vars[] = 'task=' . $split[1];
}
else if ($type == 'task')
{
	$vars[] = 'task=' . $view;
}
else
{
	$vars[] = 'view=' . $view;
}

if ($layout)
{
	$vars[] = 'layout=' . $layout;
}
if ($field && $item_id)
{
	$vars[] = $field . '=' . $item_id;
}

$link = KrMethods::route('index.php?' . implode('&', $vars));
?>

<div style="margin-right:10px;">
	<a href="<?php echo $link; ?>" aria-labelledby="<?php echo $id; ?>" class="btn btn-sm btn-primary">
		<i class="fa-lg fa-solid <?php echo $icon; ?>"></i>
	</a>
	<div id="<?php echo $id; ?>" role="tooltip" style="min-width:200px;max-width:200px;width:auto;">
		<?php echo HTMLHelper::_('tooltipText', '', $label, 0, false); ?>
	</div>
</div>