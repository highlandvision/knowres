<?php
/**
 * @package     KR
 * @subpackage  Admin views
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */
/** @noinspection PhpUnhandledExceptionInspection */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\TickTock;

$bgcolor = 'bookme';
$past    = false;
$arrival = false;
$inarray = false;
$link    = KrMethods::route('index.php?option=com_knowres&view=contract&layout=manager&property_id=' . $this->item->id
	. '&arrival=' . $this->dateYmd,
	false);

if (array_key_exists($this->dateYmd, $this->dates))
{
	$id        = $this->dates[$this->dateYmd]['id'];
	$confirmed = $this->dates[$this->dateYmd]['confirmed'];
	$black     = $this->dates[$this->dateYmd]['black'];
	$arrival   = $this->dates[$this->dateYmd]['arrival'];
	$ical      = $this->dates[$this->dateYmd]['ical'];
	$inarray   = true;

	if ($confirmed)
	{
		$bgcolor = 'bgbook';
	}
	else if ($black == 1)
	{
		$bgcolor = 'bgblack';
	}
	else if ($black == 2)
	{
		$bgcolor = 'bggrey';
	}
	else
	{
		$bgcolor = 'bgprov';
	}

	$link = KrMethods::route('index.php?option=com_knowres&task=contract.show&id=' . $id, false);
}

if ($this->dateYmd < $this->today)
{
	$bgcolor .= ' past';
	$past    = true;
}

$this->order++;

$dow = TickTock::displayDate($this->dateYmd, 'w');
if ($dow == 6 || $dow == 0)
{
	$bgcolor .= ' weekend';
}
?>

<?php if (!$past && !array_key_exists($this->dateYmd, $this->dates)) : ?>
<td data-order="<?php echo $this->order; ?>" data-date="<?php echo $this->dateYmd; ?>" class="<?php echo $bgcolor; ?>">
	<?php else : ?>
<td data-order="<?php echo $this->order; ?>" class="<?php echo $bgcolor; ?>">
	<?php endif; ?>

	<?php if (!$inarray) : ?>
		<?php if ($this->allow_block || $this->allow_book) : ?>
			<span><?php echo TickTock::displayDate($this->dateYmd, 'j'); ?></span>
		<?php else : ?>
			<?php echo TickTock::displayDate($this->dateYmd, 'j'); ?>
		<?php endif; ?>
	<?php else: ?>
		<?php if ($arrival) : ?>
			<span class="fa-stack fa-1x">
			<?php if ($black) : ?>
				<i class='fa-solid fa-circle fa-stack-2x block'></i>
			<?php else: ?>
				<i class='fa-solid fa-circle fa-stack-2x booking'></i>
			<?php endif; ?>
			<span class="fa-stack-1x suitcase-text">
				<span class="arrival modalshow" data-id="<?php echo $id; ?>" data-ical="<?php echo $ical; ?>">
					<?php echo TickTock::displayDate($this->dateYmd, 'j'); ?>
				</span>
			</span>
		</span>
		<?php else: ?>
			<span class="arrival modalshow" data-id="<?php echo $id; ?>" data-ical="<?php echo $ical; ?>">
			<?php echo TickTock::displayDate($this->dateYmd, 'j'); ?>
		</span>
		<?php endif; ?>
	<?php endif; ?>
</td>
