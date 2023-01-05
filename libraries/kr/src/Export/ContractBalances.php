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
 * Export contract balances
 *
 * @since 4.0.0
 */
class ContractBalances
{
	/** @var array Export criteria. */
	public array $data = [];
	/** @var Translations Translations object. */
	public Translations $Translations;

	/**
	 * Initialize
	 *
	 * @param   array  $data  Array containing the export paramters
	 *                        $data = [
	 *                        'agent_id'      =>    (int) Optional ID of agent
	 *                        'property_id'   =>    (mixed) Empty for all, int for one property, array for multiple.
	 *                        'region_id'     =>    (int) Optional ID of region
	 *                        'guest'         =>    (bool) True to include guest data
	 *                        'owner'         =>    (bool) True to include owner data
	 *                        'cancelled'     =>    (int) 1 to include cancelled contracts
	 *                        ]
	 *
	 * @throws Exception
	 * @since  4.0.0
	 */
	#[NoReturn] public function __construct(array $data)
	{
		$this->data = $data;
		$filename   = 'balances_' . TickTock::getTS() . '.csv';
		$filename   = str_replace(' ', '_', $filename);
		$filename   = str_replace(':', '_', $filename);
		$csv        = fopen(JPATH_SITE . '/tmp/' . $filename, 'w');

		$head = $this->setHead();
		fputcsv($csv, $head);

		$rows = KrFactory::getListModel('contracts')->exportBalances($this->data);
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
	 * Set headings for contract balances export
	 *
	 * @since  2.0.0
	 * @return array
	 */
	protected function setHead(): array
	{
		$head   = [];
		$head[] = 'Unique Id';
		$head[] = 'Reference';
		$head[] = 'Creation Timestamp';

		if ($this->data['cancelled'])
		{
			$head[] = 'Cancelled';
		}

		$head[] = 'Currency';
		$head[] = 'Balance';
		$head[] = 'Reservation Total';
		$head[] = 'Fees';
		$head[] = 'Payments';
		$head[] = 'Unconfirmed';
		$head[] = 'Deposit';
		$head[] = 'Booking Status';
		$head[] = 'Accommodation Total';
		$head[] = 'Property';
		$head[] = 'Region';
		$head[] = 'Check-in';
		$head[] = 'Check-out';
		$head[] = 'Guests';
		$head[] = 'Nights';
		$head[] = 'Agent';
		$head[] = 'Agent Value';
		$head[] = 'Agent Commission';
		$head[] = 'Channel';
		$head[] = 'Channel Commission';

		if ($this->data['owner'])
		{
			$head[] = 'Net Price';
			$head[] = 'Owner Name';
			$head[] = 'Owner Commission';
		}

		if ($this->data['guest'])
		{
			$head[] = 'First Name';
			$head[] = 'Surname';
			$head[] = 'Email';
		}

		return $head;
	}

	/**
	 * Set data for contract balances export
	 *
	 * @param   stdClass  $row  Contract row
	 *
	 * @throws Exception
	 * @since  2.4.0
	 * @return array
	 */
	protected function setLine(stdClass $row): array
	{
		$head   = [];
		$head[] = $row->id;
		$head[] = $row->tag;
		$head[] = $row->created_at;

		if ($this->data['cancelled'])
		{
			$head[] = $row->cancelled ? KrMethods::plain('JYES') : KrMethods::plain('JNO');
		}

		$head[] = $row->currency;
		$head[] = $row->contract_total + $row->fees - $row->payments;
		$head[] = $row->contract_total;
		$head[] = $row->fees;
		$head[] = $row->payments;
		$head[] = $row->unconfirmed;
		$head[] = $row->deposit;
		$head[] = Utility::getBookingStatus($row->booking_status);
		$head[] = $row->room_total;
		$head[] = $row->property_name;
		$head[] = $this->Translations->getText('region', $row->region_id);
		$head[] = $row->arrival;
		$head[] = $row->departure;
		$head[] = $row->guests;
		$head[] = TickTock::differenceDays($row->arrival, $row->departure);
		$head[] = $row->agent_name;
		$head[] = $row->agent_value;
		$head[] = $row->agent_commission;
		$head[] = $row->service_name;
		$head[] = $row->channel_commission;

		if ($this->data['owner'])
		{
			$head[] = $row->net_price;
			$head[] = $row->name;
			$head[] = $row->commission;
		}

		if ($this->data['guest'])
		{
			$head[] = $row->firstname;
			$head[] = $row->surname;
			$head[] = $row->email;
		}

		return $head;
	}
}