<?php
/**
 * @package     KR
 * @subpackage  Admin Controller
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file LICENSE.txt for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
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

use function count;
use function implode;

/**
 * Export plain text file of guest registration details
 *
 * @since 4.0.0
 */
class Registration
{
	/** @var array Export filters. */
	public array $data = [];

	/**
	 * Initialize
	 *
	 * @param  array  $data   Array containing the export paramters
	 *                        $data = ['arrival' => (string) Arrival date].
	 *
	 * @throws Exception
	 * @since  4.0.0
	 */
	#[NoReturn] public function __construct(array $data)
	{
		$this->data = $data;
		$arrival    = $this->data['arrival'];

		$rows = KrFactory::getListModel('contracts')->exportRegistration($arrival);
		if (empty($rows))
		{
			KrMethods::message(KrMethods::sprintf('COM_KNOWRES_NO_ARRIVALS', TickTock::displayDate($arrival)),
				'warning');
			KrMethods::redirect(KrMethods::route('index.php?option=com_knowres&task=contracts.daily', false));

			return;
		}

		$es_id = KrFactory::getListModel('countries')->getCountryIdByIso('ES');

		// Create a new txt file and save it in tmp directory
		$filename = 'registration_' . $arrival . '.txt';
		$filename = str_replace(' ', '_', $filename);
		$filename = str_replace(':', '_', $filename);
		$txt      = fopen(JPATH_SITE . '/tmp/' . $filename, 'w');

		foreach ($rows as $row)
		{
			$lines = $this->setTypeTwoThree($row, $es_id, $arrival);
			foreach ($lines as $line)
			{
				$line .= "\r\n";
				fwrite($txt, $line);
			}
		}

		fclose($txt);

		// output headers so that the file is downloaded rather than displayed
		header("Content-type: text/plain");
		header("Content-disposition: attachment; filename = " . $filename);
		readfile(JPATH_SITE . '/tmp/' . $filename);

		unlink(JPATH_SITE . '/tmp/' . $filename);

		jexit();
	}

	/**
	 * Return the document type for the file
	 *
	 * @param  int  $type   Document type
	 *                      1: DNI (Spanish citizens only)
	 *                      2: Passport
	 *                      3: Driving Licence (Spanish citizens only)
	 *                      4: ID Document (EU citizens)
	 *                      5: Spanish residence permit
	 *                      6: Residence permit of another EU member state
	 *
	 * @since  2.5.0
	 * @return string D: ID,
	 *                Q: passport,
	 *                C: driving license (only for Spanish citizens),
	 *                I: identity card or,
	 *                N: spanish residence permit,
	 *                X: residence permit from another Member State of the European Union
	 */
	protected function getDocumentType(int $type): string
	{
		return match ($type)
		{
			1 => 'D',
			2 => 'Q',
			3 => 'C',
			4 => 'I',
			5 => 'N',
			6 => 'X',
			default => ''
		};
	}

	/**
	 * Create type 1 row
	 * Record Type 1 = 0 has the value 0
	 * Code grouping 10 Hotel ME Facility
	 * Name of grouping 40 uppercase
	 * Date of the preparation File Format YYYYMMDD 8
	 * Time of preparation File Format HHMM 4
	 * Number of records of type 1 releases 5 Each record must correspond to type 1
	 *
	 * @param  string  $property_name  Name of property
	 * @param  int     $count          Line type 2 count
	 *
	 * @since  2.5.0
	 * @return string $line Text line to be added to file
	 */
	protected function setTypeOne(string $property_name, int $count): string
	{
		$line   = [];
		$line[] = '1';
		$line[] = 'CODEHERE';
		$line[] = $property_name;
		$line[] = TickTock::getDate('now', 'Ymd');
		$line[] = TickTock::getDate('now', 'H:i');
		$line[] = $count;

		return implode('|', $line);
	}

	/**
	 * Create the type 2 and 3 records
	 * Record Type = 2
	 * Number of identification of 11 Spanish Should Spanish ID card, passport and driving license.
	 * Number of passport or other identity document of 14 foreign passport, or identity card for citizens of the European Union, Andorra, Iceland, Switzerland, Norway, Malta, Monaco and San Marino. Passport to other foreigners. Spanish residence permit in force for foreign residents in Spain. Residence permit issued by another Member State of the European Union.
	 * Type 1 D ID: ID, Q: passport, C: driving license (only for Spanish citizens), I: identity card or, N: Spanish residence permit, X: residence permit of another Member State of the European Union.
	 * Date of issue of ID 8 Format YYYYMMDD
	 * 30 Surname
	 * 30 Second surname
	 * 30 In case Name
	 * Gender: F: Female, M: male
	 * Date of birth  YYYYMMDD
	 * 21 Country of nationality
	 * Check-In 8 YYYYMMDD format
	 *
	 * @param  object  $row      Database row
	 * @param  int     $es_id    Country ID for Spain
	 * @param  string  $arrival  Arrival date yyyy-mm-dd
	 *
	 * @throws Exception
	 * @since  2.5.0
	 * @return array $lines Text lines to be added to file
	 */
	protected function setTypeTwoThree(object $row, int $es_id, string $arrival): array
	{
		$lines = [];
		$tmp   = [];

		$guestinfo = Utility::decodeJson($row->guestinfo);
		foreach ($guestinfo as $g)
		{
			if ($g->surname1)
			{
				$line   = [];
				$line[] = '2';

				if ($g->document_id)
				{
					// Adults
					$line[] = (int) $g->document_nat == $es_id ? $g->document_id : '';
					$line[] = (int) $g->document_nat != $es_id ? $g->document_id : '';
					$line[] = $this->getDocumentType($g->document_type);
					$line[] = TickTock::displayDate($g->document_issue, 'Ymd');
				}
				else
				{
					// Children
					$line[] = '';
					$line[] = '';
					$line[] = '';
					$line[] = '';
				}

				$line[] = $g->surname1;
				$line[] = $g->surname2 ?: '';
				$line[] = $g->name;
				$line[] = $g->sex;
				$line[] = TickTock::displayDate($g->dob, 'Ymd');
				$line[] = strtoupper(Translations::getCountryName((int) $g->document_nat));
				$line[] = TickTock::displayDate($arrival, 'Ymd');

				$tmp[] = implode('|', $line);
			}
		}

		$lines[] = $this->setTypeOne($row->property_name, count($tmp));

		return array_merge($lines, $tmp);
	}
}