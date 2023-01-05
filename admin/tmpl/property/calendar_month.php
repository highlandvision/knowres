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

use HighlandVision\KR\TickTock;

$days = TickTock::displayDate($this->startDate, 't');
?>

<table class="amonth">
	<tr>
		<th>
			<?php echo TickTock::displayDate($this->startDate, 'M Y'); ?>
		</th>

		<?php for ($d = 1; $d <= $days; $d++): ?>
			<?php $this->dateYmd = $d < 10 ? $this->startMonth . '-0' . $d : $this->startMonth . '-' . $d; ?>
			<?php echo $this->loadTemplate('day'); ?>
		<?php endfor; ?>
	</tr>
</table>