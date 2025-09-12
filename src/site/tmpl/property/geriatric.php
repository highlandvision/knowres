<?php
/**
 * @package    Know Reservations
 * @subpackage Site View
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

defined('_JEXEC') or die;

$counter = 0;
?>

<div id="calendar-months" class="calendar-months">
	<?php while ($counter < $this->months_to_show) : ?>
		<?php
		echo $this->loadTemplate('month');

		$counter++;
		$this->month++;

		if ($this->month > 12) {
			$this->year  += 1;
			$this->month = 1;
		}
		?>
	<?php endwhile; ?>
</div>