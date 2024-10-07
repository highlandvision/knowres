<?php
/**
 * @package     Know Reservations
 * @subpackage  Site View
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

defined('_JEXEC') or die;

use HighlandVision\KR\TickTock;

$month       = $this->month < 10 ? '0' . $this->month : $this->month;
$month_start = $this->year . '-' . $month . '-01';
$month_end   = TickTock::parseString($month_start, 'Y-m-t');
?>

<table class="amonth">
	<tr class="monthrow">
		<th colspan="7">
			<?php echo TickTock::parseString($month_start, 'F'); ?>&nbsp;<?php echo $this->year; ?>
		</th>
	</tr>

	<tr class="daysrow">
		<?php
		$currDate = $month_start;
		if (TickTock::parseString($month_start, 'w') != $this->startday_dow) {
			$currDate = TickTock::parseString($month_start . 'last ' . $this->startday_name);
		}

		$endDate = $month_end;
		if (TickTock::parseString($month_end, 'w') != $this->yesterday_dow) {
			$endDate = TickTock::parseString($month_end . 'next ' . $this->yesterday_name);
		}
		?>

		<?php for ($i = 0; $i < 7; $i++) : ?>
			<th><?php echo substr(TickTock::parseString($this->startday_name . ' +' . $i . ' Days', 'D'),
					0,
					-1); ?></th>
		<?php endfor; ?>
	</tr>

	<?php while ($currDate < $endDate) : ?>
		<tr>
			<?php for ($c = 0; $c < 7; $c++) : ?>
				<?php
				if ($currDate == $this->start) {
					$bgcolor = 'bgtoday bgtoavail duo';
				} else {
					$bgcolor = 'bookme solo';
				}

				if (isset($this->blocked[$currDate])) {
					$index = array_keys($this->blocked, $currDate);
					$type  = $this->blocked[$currDate];

					if (isset($this->confirmed[$currDate])) {
						$astate = $this->confirmed[$currDate]['astate'];
						$dstate = $this->confirmed[$currDate]['dstate'];
						$bstate = $this->confirmed[$currDate]['bstate'];
					} else {
						$astate = true;
						$dstate = true;
						$bstate = true;
					}

					if ($type == 0) {
						if ($currDate == $this->start) {
							$bgcolor = $bstate ? 'bgtoday bgtobook duo' : 'bgtoday bgtoprov duo';
						} else {
							$bgcolor = $bstate ? 'bgbook solo' : 'bgprov solo';
						}
					} else if ($type == 1) {
						if ($currDate == $this->start) {
							$bgcolor = $astate ? 'bgtoday bgtobook duo' : 'bgtoday bgtoprov duo';
						} else {
							$bgcolor = $astate ? 'bgfromavail bgtobook duo' : 'bgfromavail bgtoprov duo';
						}
					} else if ($type == 2) {
						if ($currDate == $this->start) {
							$bgcolor = 'bgtoday bgtoavail duo';
						} else {
							$bgcolor = $dstate ? 'bgfrombook bgtoavail duo' : 'bgfromprov bgtoavail duo';
						}
					} else if ($type == 3) {
						if ($dstate) {
							if ($currDate == $this->start) {
								$bgcolor = 'bgtoday bgtoprov duo';
							} else {
								$bgcolor = $astate ? 'bgbook solo' : 'bgfrombook bgtoprov duo';
							}
						} else {
							if ($currDate == $this->start) {
								$bgcolor = 'bgtoday bgtobook duo';
							} else {
								$bgcolor = $astate ? 'bgfromprov bgtobook duo' : 'bgprov solo';
							}
						}
					}
				} else if (isset($this->weekly[$currDate])) {
					$bgcolor = 'bookme solo nostart';
				}

				//	Not in the month so don't display
				if ($currDate < $this->start) {
					$bgcolor = "bgpast solo";
				}
				//	Not in the month so don't display
				if ($currDate < $month_start || $currDate > $month_end) {
					$bgcolor = "bgblank solo";
				}
				?>

				<td>
					<div class="<?php echo $bgcolor; ?>">
						<p class="day">
							<?php echo date("j", strtotime($currDate)); ?>
						</p>
					</div>
				</td>

				<?php
				$i++;
				$currDate = TickTock::modifyDays($currDate);
				?>
			<?php endfor; ?>
		</tr>
	<?php endwhile; ?>
</table>