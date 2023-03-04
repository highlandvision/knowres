<?php
/**
 * @package    Know Reservations
 * @subpackage Library
 * @copyright  Copyright (c) 2020, Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\KR\Export;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\TickTock;
use HighlandVision\KR\Translations;
use HighlandVision\KR\Utility;
use JetBrains\PhpStorm\NoReturn;
use stdClass;

use function defined;
use function fclose;
use function fopen;
use function fputcsv;
use function header;
use function readfile;
use function str_replace;
use function unlink;

/**
 * Export owner payments
 *
 * @since 4.0.0
 */
class OwnerPayments
{
	/** @var array Export criteria. */
	public array $data = [];
	/** @var Translations Translations object. */
	public Translations $Translations;

	/**
	 * Initialize
	 *
	 * @param  array  $data   Array containing the export paramters
	 *                        $data = [
	 *                        'valid_from'    =>    (string) Start date.
	 *                        'valid_to'      =>    (string) End date.
	 *                        'confirmed'     =>    (int) 0 - unconfirmed, 1 - confirmed, 2 - all.
	 *                        'owner_id'      =>    (mixed) Empty for all, int for one owner, array for multiple.
	 *                        'property_id'   =>    (mixed) Empty for all, int for one property, array for multiple
	 *                        ]
	 *
	 * @throws Exception
	 * @since  4.0.0
	 */
	#[NoReturn] public function __construct(array $data)
	{
		$this->data = $data;
		$filename   = 'ownerpayments_' . TickTock::getTS() . '.csv';
		$filename   = str_replace(' ', '_', $filename);
		$filename   = str_replace(':', '_', $filename);
		$csv        = fopen(JPATH_SITE . '/tmp/' . $filename, 'w');

		$head = $this->setHead();
		fputcsv($csv, $head);

		$rows = KrFactory::getListModel('ownerpayments')->exportPayments($this->data);
		if (is_countable($rows))
		{
			$net                = KrFactory::getListModel('propertysettings')->getOneSetting('net_rates');
			$net_markup         = KrFactory::getListModel('propertysettings')->getOneSetting('net_markup');
			$this->Translations = new Translations();
			foreach ($rows as $row)
			{
				$line = $this->setLine($row, $net, $net_markup);
				fputcsv($csv, $line);
			}
		}

		fclose($csv);
		header("Content-type: text/csv");
		header("Content-disposition: attachment; filename = " . $filename);
		readfile(JPATH_SITE . '/tmp/' . $filename);
		unlink(JPATH_SITE . '/tmp/' . $filename);

		jexit();
	}

	/**
	 * Set headings for owner payments
	 *
	 * @since  2.0.0
	 * @return array
	 */
	protected function setHead(): array
	{
		$head   = [];
		$head[] = 'Unique Id';
		$head[] = 'Property Name';
		$head[] = 'Owner Name';
		$head[] = 'Business?';
		$head[] = 'Payment Schedule';
		$head[] = 'Commission %';
		$head[] = 'Markup %';
		$head[] = 'Rent';
		$head[] = 'Payment Amount';
		$head[] = 'Currency';
		$head[] = 'Payment Date';
		$head[] = 'Reservation';
		$head[] = 'Cancelled';
		$head[] = 'Check-in';
		$head[] = 'Check-out';
		$head[] = 'Confirmed';
		$head[] = 'Payment Type';
		$head[] = 'Payment Reference';
		$head[] = 'IBAN';

		return $head;
	}

	/**
	 * Set data for owner payments
	 *
	 * @param  stdClass  $row      Contract row.
	 * @param  array     $snet     Property settings net rates.
	 * @param  array     $smarkup  Property settings net markup.
	 *
	 * @since  2.4.0
	 * @return array
	 */
	protected function setLine(stdClass $row, array $snet, array $smarkup): array
	{
		$net    = !isset($snet[$row->property_id]) ? $snet[0] : $snet[$row->property_id];
		$markup = !isset($smarkup[$row->property_id]) ? $smarkup[0] : $smarkup[$row->property_id];

		$head   = [];
		$head[] = $row->id;
		$head[] = $row->property_name;
		$head[] = $row->owner_name;
		$head[] = $row->business ? KrMethods::plain('JYES') : KrMethods::plain('JNO');
		$head[] = $row->owner_schedule;
		if (!$net)
		{
			$head[] = $row->owner_commission;
			$head[] = '';
		}
		else
		{
			$head[] = '';
			$head[] = $markup;
		}
		$head[] = Utility::displayMoney($row->room_total);
		$head[] = Utility::displayMoney($row->amount);
		$head[] = $row->currency;
		$head[] = $row->payment_date;
		$head[] = $row->tag;
		$head[] = $row->cancelled ? '1' : '0';
		$head[] = $row->arrival;
		$head[] = $row->departure;
		$head[] = $row->confirmed ? '1' : '0';
		$head[] = $row->type;
		$head[] = $row->payment_ref;
		$head[] = $row->iban;

		return $head;
	}
}