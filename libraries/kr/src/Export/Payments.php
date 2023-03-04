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
use HighlandVision\KR\TickTock;
use HighlandVision\KR\Translations;
use JetBrains\PhpStorm\NoReturn;
use stdClass;

use function defined;
use function fclose;
use function fopen;
use function fputcsv;
use function header;
use function readfile;
use function str_replace;
use function ucfirst;
use function unlink;

/**
 * Export payments
 *
 * @since 4.0.0
 */
class Payments
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
	 *                        'datetype'      =>    (int) 0 - Creation, 1 - Arrival
	 *                        'agent_id'      =>    (int) Optional ID of agent
	 *                        'property_id'   =>    (mixed) Empty for all, int for one property, array for multiple.
	 *                        'region_id'     =>    (int) Optional ID of region
	 *                        'service_id'    =>    (int) Optional ID of service
	 *                        'cancelled'     =>    (int) 1 to include cancelled contracts
	 *                        ]
	 *
	 * @throws Exception
	 * @since  4.0.0
	 */
	#[NoReturn] public function __construct(array $data)
	{
		$this->data = $data;

		$filename = 'payments_' . TickTock::getTS() . '.csv';
		$filename = str_replace(' ', '_', $filename);
		$filename = str_replace(':', '_', $filename);
		$csv      = fopen(JPATH_SITE . '/tmp/' . $filename, 'w');

		$head = $this->setHead();
		fputcsv($csv, $head);

		$rows = KrFactory::getListModel('contractpayments')->exportPayments($this->data);
		if (is_countable($rows))
		{
			$this->Translations = new Translations();
			foreach ($rows as $row)
			{
				$line = $this->setLine($row);
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
	 * Set headings for payments export
	 *
	 * @since  2.0.0
	 * @return array
	 */
	protected function setHead(): array
	{
		$head   = [];
		$head[] = 'Unique Id';
		$head[] = 'Reservation';
		$head[] = 'Check-in';
		$head[] = 'Check-out';
		$head[] = 'Creation Timestamp';

		if ($this->data['cancelled'])
		{
			$head[] = 'Cancelled';
		}

		$head[] = 'Property';
		$head[] = 'Region';
		$head[] = 'Agency';
		$head[] = 'Payment Reference';
		$head[] = 'Payment Date';
		$head[] = 'Method';
		$head[] = 'Currency';
		$head[] = 'Payment Amount';
		$head[] = 'Exchange Rate';
		$head[] = 'Base Currency';
		$head[] = 'Base Amount';
		$head[] = 'Confirmed';
		$head[] = 'Payment Note';

		return $head;
	}

	/**
	 * Set data for payments export
	 *
	 * @param  stdClass  $row  Contract row
	 *
	 * @since  2.4.0
	 * @return array
	 */
	protected function setLine(stdClass $row): array
	{
		$head   = [];
		$head[] = $row->id;
		$head[] = $row->tag;
		$head[] = $row->arrival;
		$head[] = $row->departure;
		$head[] = $row->created_at;

		if ($this->data['cancelled'])
		{
			$head[] = $row->cancelled ? 'Yes' : 'No';
		}

		$head[] = $row->property_name;
		$head[] = $this->Translations->getText('region', $row->region_id);
		$head[] = $row->agency_name;
		$head[] = $row->payment_ref;
		$head[] = $row->payment_date;
		$head[] = ucfirst($row->service_plugin);
		$head[] = $row->currency;
		$head[] = $row->amount;
		$head[] = $row->rate;
		$head[] = $row->base_currency;
		$head[] = $row->base_amount;
		$head[] = $row->confirmed ? 'Yes' : 'No';
		$head[] = $row->note;

		return $head;
	}
}