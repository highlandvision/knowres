<?php
/**
 * @package    Know Reservations
 * @subpackage Site View
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;

if ($this->settings['shortstay_percentage2'] == 100
	&& $this->settings['shortstay_percentage3'] == 100
	&& $this->settings['shortstay_percentage4'] == 100
	&& $this->settings['shortstay_percentage5'] == 100
	&& $this->settings['shortstay_percentage6'] == 100
	&& $this->settings['canwebook'] == 0)
{
	return;
}
?>

<?php
$nights = [];
if ($this->settings['shortstay_percentage2'] != 100)
{
	$nights[] = 2;
}
if ($this->settings['shortstay_percentage3'] != 100)
{
	$nights[] = 3;
}
if ($this->settings['shortstay_percentage4'] != 100)
{
	$nights[] = 4;
}
if ($this->settings['shortstay_percentage5'] != 100)
{
	$nights[] = 5;
}
if ($this->settings['shortstay_percentage5'] != 100)
{
	$nights[] = 6;
}
if ($this->settings['canwebook'] > 0)
{
	for ($i = $this->settings['canwebook']; $i <= 6; $i++)
	{
		$nights[] = $i;
	}
}

$nights = array_unique($nights);
if (count($nights) > 1)
{
	$last   = array_pop($nights);
	$first  = $nights[0];
	$nights = $first . ' - ' . $last;
}
else
{
	$nights = (string) $nights[0];
}
?>

<h6><?php echo KrMethods::sprintf('COM_KNOWRES_PRICING_SHORT_BREAKS', $nights); ?></h6>