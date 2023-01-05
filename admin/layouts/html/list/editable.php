<?php
/**
 * @package    Know Reservations
 * @subpackage Admin templates
 * @copyright  2021 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

/** @noinspection PhpUnhandledExceptionInspection */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Joomla\Extend\HtmlView as KrHtmlView;
use HighlandVision\KR\TickTock;
use Joomla\CMS\HTML\HTMLHelper;

extract($displayData);
/**
 * Layout variables
 *
 * @var KrHtmlView $data   The view data.
 * @var object     $item   The database row.
 * @var int        $i      The item index.
 * @var string     $column The column name.
 * @var string     $task   The task value.
 * @var string     $layout The required layout.
 */

if (empty($column))
{
	$column = 'name';
}

$dates = ['valid_from', 'payment_date'];
$value = in_array($column, $dates) ? TickTock::displayDate($item->$column, 'd M Y') : $item->$column;
?>

<div class="break-word">
	<?php if (!empty($item->checked_out)) : ?>
		<?php echo HTMLHelper::_('jgrid.checkedout', $i, $item->editor, $item->checked_out_time, $data->name . '.',
			$data->canCheckin); ?>
	<?php endif; ?>
	<?php if ($data->canEdit) : ?>
		<?php if (!empty($task)): ?>
			<?php $link = KrMethods::route('index.php?option=com_knowres&task=' . $task . '&id=' . $item->id); ?>
			<a href="<?php echo $link; ?>" style="word-break:keep-all;">
				<?php echo $this->escape($value); ?>
			</a>
		<?php else: ?>
			<?php $link = KrMethods::route('index.php?option=com_knowres&task=' . $data->form_name . '.edit&id='
				. $item->id); ?>
			<a href="<?php echo $link; ?>" style="word-break:keep-all;">
				<?php echo $this->escape($value); ?>
			</a>
		<?php endif; ?>
	<?php else : ?>
		<?php echo $this->escape($value); ?>
	<?php endif; ?>
</div>