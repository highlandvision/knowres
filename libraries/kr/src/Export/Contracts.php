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
use HighlandVision\KR\Utility;
use JetBrains\PhpStorm\NoReturn;
use stdClass;

use function defined;
use function fclose;
use function fopen;
use function fputcsv;
use function header;
use function implode;
use function readfile;
use function str_replace;
use function unlink;

/**
 * Export contracts
 *
 * @since 4.0.0
 */
class Contracts
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
	 *                        'valid_from'    =>    (string) From date
	 *                        'valid_to'      =>    (string) To date
	 *                        'datetype'      =>    (int) 0 - Creation, 1 - Arrival
	 *                        'inresidence'   =>    (int) 0 - No , 1 - Yes
	 *                        'agent_id'      =>    (int) Optional ID of agent
	 *                        'owner_id'      =>    (int) Optional ID of owner
	 *                        'property_id'   =>    (mixed) Empty for all, int for one property, array for multiple.
	 *                        'region_id'     =>    (int) Optional ID of region
	 *                        'payments'      =>    (int) Display payments 0 - No, 1 - Yes
	 *                        'property'      =>    (int) Export property address 0 - No, 1 - Yes
	 *                        'guest'         =>    (int) Export guest data 0 - No, 1 - Yes
	 *                        'owner'         =>    (int) Export owner data 0 - No, 1 - Yes
	 *                        'referral'      =>    (int) Export referral data 0 - No, 1 - Yes
	 *                        'cancelled'     =>    (int) True to include cancelled contracts
	 *                        ]
	 *
	 * @throws Exception
	 * @since  4.0.0
	 */
	#[NoReturn] public function __construct(array $data)
	{
		$this->data = $data;

		$filename = 'contracts_' . TickTock::getTS() . '.csv';
		$filename = str_replace(' ', '_', $filename);
		$filename = str_replace(':', '_', $filename);
		$csv      = fopen(JPATH_SITE . '/tmp/' . $filename, 'w');

		$head = $this->setHead();
		fputcsv($csv, $head);

		$rows = KrFactory::getListModel('contracts')->exportContracts($this->data);
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
	 * Set heading for contract export
	 *
	 * @since  2.4.0
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

		$head[] = 'Property';
		$head[] = 'Region';
		$head[] = 'Check-in';
		$head[] = 'Check-out';
		$head[] = 'Guests';
		$head[] = 'Nights';
		$head[] = 'Booking Status';
		$head[] = 'Currency';
		$head[] = 'Deposit';
		$head[] = 'Accommodation Total';
		$head[] = 'Reservation Total';
		$head[] = 'Agent';
		$head[] = 'Agent Value';
		$head[] = 'Agent Commission';
		$head[] = 'Channel';
		$head[] = 'Channel Commission';

		if ($this->data['property'])
		{
			$head[] = 'Address';
			$head[] = 'Reference';
		}

		if ($this->data['payments'])
		{
			$head[] = 'Payments';
			$head[] = 'Unconfirmed Payments';
		}

		if ($this->data['owner'] || (int) $this->data['owner_id'] > 0)
		{
			$head[] = 'Net Price';
			$head[] = 'Owner Name';
			$head[] = 'Owner Commission';
			$head[] = 'Owner ID';
		}

		if ($this->data['guest'])
		{
			$head[] = 'Guest First Name';
			$head[] = 'Guest Surname';
			$head[] = 'Guest Email';
			$head[] = 'Guest ID';
			$head[] = 'Guest Country';
		}

		if ($this->data['referral'])
		{
			$head[] = 'Referral';
			$head[] = 'Referral Info';
		}

		return $head;
	}

	/**
	 * Set data for contract export
	 *
	 * @param  stdClass  $row  Contract row
	 *
	 * @throws Exception
	 * @since  1.0.0
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
			$head[] = $row->cancelled ? 'Yes' : 'No';
		}

		$head[] = $row->property_name;
		$head[] = $this->Translations->getText('region', $row->region_id);
		$head[] = $row->arrival;
		$head[] = $row->departure;
		$head[] = $row->guests;
		$head[] = TickTock::differenceDays($row->arrival, $row->departure);
		$head[] = Utility::getBookingStatus($row->booking_status);
		$head[] = $row->currency;
		$head[] = $row->deposit;
		$head[] = $row->room_total;
		$head[] = $row->contract_total;
		$head[] = $row->agent_name;
		$head[] = $row->agent_value;
		$head[] = $row->agent_commission;
		$head[] = $row->service_name;
		$head[] = $row->channel_commission;

		if ($this->data['property'])
		{
			$p = KrFactory::getAdminModel('property')->getItem($row->property_id);

			$address = [];
			if ($p->property_street)
			{
				$address[] = $p->property_street;
			}
			if ($p->town_name)
			{
				$address[] = $p->town_name;
			}
			if ($p->region_name)
			{
				$address[] = $p->region_name;
			}
			if ($p->property_postcode)
			{
				$address[] = $p->property_postcode;
			}
			if ($p->country_name)
			{
				$address[] = $p->country_name;
			}

			$head[] = implode(', ', $address);
			$head[] = $p->catastral ?? '';
		}

		if ($this->data['payments'])
		{
			$totals = KrFactory::getListModel('contractpayments')->getTotals($row->id);
			if (isset($totals->total))
			{
				$head[] = $totals->total;
				$head[] = $totals->confirmed;
			}
			else
			{
				$head[] = 0;
				$head[] = 0;
			}
		}

		if ($this->data['owner'] || (int) $this->data['owner_id'] > 0)
		{
			$head[] = $row->net_price;
			$head[] = $row->name;
			$head[] = $row->commission;
			$head[] = $row->owner_document_id;
		}

		if ($this->data['guest'])
		{
			$head[] = $row->firstname;
			$head[] = $row->surname;
			$head[] = $row->email;
			$head[] = $row->guest_document_id;
			$head[] = $this->Translations->getText('country', $row->country_id);
		}

		if ($this->data['referral'])
		{
			$head[] = $this->Translations->getText('referral', $row->referral_id);
			$head[] = $row->referral_info;
		}

		return $head;
	}
}