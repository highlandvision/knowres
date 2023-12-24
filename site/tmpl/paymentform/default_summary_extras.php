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

use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Utility;

$extras           = [];
$extras_value     = [];
$prices_inclusive = 1;

foreach ($this->contract->extras as $id => $d)
{
	if (!empty($id) && $id > 0)
	{
		$extra = KrFactory::getAdminModel('extra')->getItem($id);
		$name  = $extra->name;
		if ((int) $d['quantity'] > 1)
		{
			$name = $name . " x " . $d['quantity'];
		}

		$extras[]       = $name;
		$extras_value[] = Utility::displayValue($d['value'], $this->contract->currency);
	}
}

if (count($extras))
{
	$this->data[] = [
		'left'  => KrMethods::plain('COM_KNOWRES_EXTRAS'),
		'mid'   => implode("<br>", $extras),
		'right' => implode("<br>", $extras_value)
	];
}