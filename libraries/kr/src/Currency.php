<?php
/**
 * @package    Know Reservations
 * @subpackage Library
 * @copyright  Copyright (c) 2020, Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\KR;

defined('_JEXEC') or die;

use function count;
use function defined;

/**
 * Currency class
 *
 * @since 1.0.0
 */
class Currency
{
	/** @var string The selected currency code. */
	protected string $currency_code = '';
	/** @var array All the currency codes. */
	protected array $currency_codes = [];
	/** @var array All the currency symbols. */
	protected array $currency_symbols = [];

	/**
	 * Manage currencies with symbols and decimals
	 *
	 * @param   string  $currency_code
	 *
	 * @since 1.0.0
	 */
	public function __construct(string $currency_code = '')
	{
		if ($currency_code)
		{
			$this->currency_code = trim($currency_code);
		}
	}

	/**
	 * Return currency array
	 *
	 * @since  1.0.0
	 * @return array
	 */
	public function getCurrencyCodes(): array
	{
		$this->setCurrencyCodes();

		return $this->currency_codes;
	}

	/**
	 * Format simple value display
	 *
	 * @param   string  $text           Currency value
	 * @param  ?string  $currency_code  Currency
	 *
	 * @since  1.0.0
	 * @return string
	 */
	public function getSimpleValue(string $text, ?string $currency_code = ''): string
	{
		if (empty($currency_code))
		{
			$currency_code = $this->currency_code;
		}

		$this->setCurrencySymbols();

		if (isset($this->currency_symbols[$currency_code]))
		{
			$symbol = $this->currency_symbols[$currency_code];

			return $symbol['pre'] . $text . $symbol['post'];
		}
		else
		{
			return $this->currency_code . $text;
		}
	}

	/**
	 * Set the currency code array
	 *
	 * @since 1.0.0
	 */
	private function setCurrencyCodes(): void
	{
		if (!count($this->currency_codes))
		{
			$this->currency_codes = [
				'AFA' => 'AFA Afghanistan Afghani',
				'ALL' => 'ALL Albanian Lek',
				'AON' => 'AON Angolan New Kwanza',
				'AED' => 'AED (United) Arab Emirates Dirham',
				'ARS' => 'ARS Argentine Peso',
				'AWG' => 'AWG Aruban Florin (old guilder)',
				'AUD' => 'AUD Australian Dollar',
				'BSD' => 'BSD Bahamian Dollar',
				'BHD' => 'BHD Bahraini Dinar',
				'BDT' => 'BDT Bangladeshi Taka',
				'BBD' => 'BBD Barbados Dollar',
				'BZD' => 'BZD Belize Dollar',
				'BMD' => 'BMD Bermudian Dollar',
				'BTN' => 'BTN Bhutan Ngultrum',
				'BOB' => 'BOB Bolivian Boliviano',
				'BWP' => 'BWP Botswana Pula',
				'BRL' => 'BRL Brazilian Real',
				'BND' => 'BND Brunei Dollar',
				'BGL' => 'BGL Bulgarian Lev',
				'BIF' => 'BIF Burundi Franc',
				'KHR' => 'KHR Kampuchean (Cambodian) Riel',
				'CAD' => 'CAD Canadian Dollar',
				'CVE' => 'CVE Cape Verde Escudo ',
				'KYD' => 'KYD Cayman Islands Dollar',
				'CHF' => 'CHF Swiss Franc',
				'CLP' => 'CLP Chilean Peso',
				'CNY' => 'CNY Chinese Yuan Renminbi',
				'COP' => 'COP Colombian Peso',
				'CZK' => 'CZK Czech koruna',
				'KMF' => 'KMF Comoros Franc',
				'CRC' => 'CRC Costa Rican Colon',
				'HRK' => 'HRK Croatian Kuna',
				'CUP' => 'CUP Cuban Peso',
				'DKK' => 'DKK Danish Krone',
				'DJF' => 'DJF Djibouti Franc',
				'DOP' => 'DOP Dominican Peso',
				'DZD' => 'DZD Algerian Dinar',
				'EUR' => 'EUR Euro',
				'EGP' => 'EGP Egyption Pound',
				'SVC' => 'SVC El Salvador Colon',
				'EEK' => 'EEK Estonian Kroon',
				'ETB' => 'ETB Ethiopian Birr',
				'FKP' => 'FKP Falkland Islands Pound',
				'FJD' => 'FJD Fiji Dollar',
				'GBP' => 'GBP British Pound',
				'GMD' => 'GMD Gambian Dalasi',
				'GHC' => 'GHC Ghanaian Cedi',
				'GIP' => 'GIP Gibraltar Pound',
				'GTQ' => 'GTQ Guatemalan Quetzal',
				'GNF' => 'GNF Guiniea Franc',
				'GYD' => 'GYD Guyanan Dollar',
				'HTG' => 'HTG Haitian Gourde',
				'HNL' => 'HNL Honduran Lempira',
				'HKD' => 'HKD Hong Kong Dollar',
				'HUF' => 'HUF Hungarian Forint',
				'ISK' => 'ISK Iceland Krona',
				'INR' => 'INR Indian Rupee',
				'IDR' => 'IDR Indonesian Rupiah',
				'IRR' => 'IRR Iranian Rial',
				'IQD' => 'IQD Iraqi Dinar',
				'ILS' => 'ILS Israeili New Shekel',
				'JMD' => 'JMD Jamaican Dollar',
				'JPY' => 'JPY Japanese Yen',
				'JOD' => 'JOD Jordanian Dinar',
				'KZT' => 'KZT Kazakhstan Tenge',
				'KES' => 'KES Kenyan Schilling',
				'KRW' => 'KRW Korean Won',
				'KWD' => 'KWD Kuwaiti Dinar',
				'LAK' => 'LAK Lao Kip',
				'LBP' => 'LBP Lebanese Pound',
				'LKR' => 'LKR Sri Lanka Rupee',
				'LRD' => 'LRD Liberian Dollar',
				'LSL' => 'LSL Lesotho Loti ',
				'LTL' => 'LTL Lithuanian Litas',
				'LYD' => 'LYD Libyan Dinar ',
				'LVL' => 'LVL Latvian Lats',
				'MOP' => 'MOP Macau Pataca',
				'MGA' => 'MGA Malagasy Franc ',
				'MWK' => 'MWK Malawi Kwacha',
				'MYR' => 'MYR Malaysian Ringgit',
				'MVR' => 'MVR Maldive Rufiyaa',
				'MRO' => 'MRO Mauritanian Ouguiya',
				'MUR' => 'MUR Mauritius Rupee',
				'MXN' => 'MXN Mexican Peso',
				'MNT' => 'MNT Mongolian Tugrik ',
				'MAD' => 'MAD Moroccan Dirham',
				'MZM' => 'MZM Mozambique Metical',
				'MMK' => 'MMK Myanmar Kyat',
				'ANG' => 'ANG Netherlands Antillian Guilder',
				'NAD' => 'NAD Namibian Dollar',
				'NPR' => 'NPR Nepalese Rupee',
				'NZD' => 'NZD New Zealand Dollar',
				'NIO' => 'NIO Nicaraguan Cordoba Oro',
				'NGN' => 'NGN Nigerian Naira',
				'KPW' => 'KPW North Korean Won',
				'NOK' => 'NOK Norwegian Kroner',
				'OMR' => 'OMR Omani Rial',
				'PKR' => 'PKR Pakistan Rupee ',
				'PAB' => 'PAB Panamanian Balboa',
				'PGK' => 'PGK Papua New Guinea Kina',
				'PYG' => 'PYG Paraguay Guarani',
				'PEN' => 'PEN Peruvian Neuevo Sol',
				'PHP' => 'PHP Philippine Peso',
				'PLN' => 'PLN Polish Zloty',
				'QAR' => 'QAR Qatari Rial',
				'RON' => 'RON Romanian New Leu',
				'RUB' => 'RUB Russian Rouble',
				'STD' => 'STD Sao Tome and Principe Dobra',
				'SAR' => 'SAR Saudi Riyal',
				'SCR' => 'SCR Seychelles Rupee',
				'SLL' => 'SLL Sierra Leone Leone',
				'SGD' => 'SGD Singapore Dollar',
				'SBD' => 'SBD Solomon Islands Dollar ',
				'SOS' => 'SOS Somali Schilling',
				'ZAR' => 'ZAR South African Rand',
				'SHP' => 'SHP St. Helena Pound',
				'SDP' => 'SDP Sudanese Pound',
				'SZL' => 'SZL Swaziland Lilangeni',
				'SEK' => 'SEK Swedish Krona',
				'SYP' => 'SYP Syrian Pound',
				'TWD' => 'TWD Taiwan Dollar',
				'THB' => 'THB Thai Baht',
				'TOP' => 'TOP Tongan Pa\'anga',
				'TTD' => 'TTD Trinidad and Tobago Dollar',
				'TND' => 'TND Tunisian Dinar',
				'TRL' => 'TRL Turkish Lira',
				'USD' => 'USD US Dollar',
				'UGS' => 'UGS Uganda Schilling',
				'UAG' => 'UAG Ukraine Hryvnia ',
				'UYP' => 'UYP Uruguayan Peso',
				'VUV' => 'VUV Vanuatu Vatu',
				'VEB' => 'VEB Venezuelan Bolivar',
				'VND' => 'VND Vietnamese Dong',
				'WST' => 'WST Samoan Tala',
				'XOF' => 'XOF CFA Franc BCEAO',
				'XAF' => 'XAF CFA Franc BEAC',
				'ZMK' => 'ZMK Zambian Kwacha',
				'ZWD' => 'ZWD Zimbabwe Dollar',
				'MDL' => 'MDL Moldovan leu'
			];

			ksort($this->currency_codes);
		}
	}

	/**
	 * Set currency symbols for before or after amount
	 *
	 * @since 1.0.0
	 */
	private function setCurrencySymbols(): void
	{
		if (count($this->currency_symbols) > 0)
		{
			return;
		}

		$this->currency_symbols = array(
			'AFA' => array(
				"pre"  => "؋",
				"post" => '',
				"dp"   => 2
			),
			'ALL' => array(
				"pre"  => "L",
				"post" => '',
				"dp"   => 2
			),
			'DZD' => array(
				"pre"  => "دج",
				"post" => '',
				"dp"   => 2
			),
			'AON' => array(
				"pre"  => "Kz",
				"post" => '',
				"dp"   => 2
			),
			'ANG' => array(
				"pre"  => "NAƒ",
				"post" => '',
				"dp"   => 2
			),
			'ARS' => array(
				"pre"  => "$",
				"post" => '',
				"dp"   => 2
			),
			'AWG' => array(
				"pre"  => "Afl.",
				"post" => '',
				"dp"   => 2
			),
			'AUD' => array(
				"pre"  => "$",
				"post" => '',
				"dp"   => 2
			),
			'BSD' => array(
				"pre"  => "$",
				"post" => '',
				"dp"   => 2
			),
			'BHD' => array(
				"pre"  => ".د.ب",
				"post" => '',
				"dp"   => 2
			),
			'BDT' => array(
				"pre"  => "৳",
				"post" => '',
				"dp"   => 2
			),
			'BBD' => array(
				"pre"  => "$",
				"post" => '',
				"dp"   => 2
			),
			'BZD' => array(
				"pre"  => "BZ$",
				"post" => '',
				"dp"   => 2
			),
			'XOF' => array(
				"pre"  => "CFA",
				"post" => '',
				"dp"   => 2
			),
			'BMD' => array(
				"pre"  => "$",
				"post" => '',
				"dp"   => 2
			),
			'BTN' => array(
				"pre"  => "Nu.",
				"post" => '',
				"dp"   => 2
			),
			'BOB' => array(
				"pre"  => "Bs.",
				"post" => '',
				"dp"   => 2
			),
			'BWP' => array(
				"pre"  => "P",
				"post" => '',
				"dp"   => 2
			),
			'BRL' => array(
				"pre"  => "R$",
				"post" => '',
				"dp"   => 2
			),
			'GBP' => array(
				"pre"  => "£",
				"post" => '',
				"dp"   => 2
			),
			'BND' => array(
				"pre"  => "B$",
				"post" => '',
				"dp"   => 2
			),
			'BGL' => array(
				"pre"  => "лв",
				"post" => '',
				"dp"   => 2
			),
			'BIF' => array(
				"pre"  => "FBu",
				"post" => '',
				"dp"   => 0
			),
			'XAF' => array(
				"pre"  => "FCFA",
				"post" => '',
				"dp"   => 0
			),
			'KHR' => array(
				"pre"  => "riel",
				"post" => '',
				"dp"   => 2
			),
			'CAD' => array(
				"pre"  => "$",
				"post" => '',
				"dp"   => 2
			),
			'CVE' => array(
				"pre"  => "$",
				"post" => '',
				"dp"   => 2
			),
			'KYD' => array(
				"pre"  => "$",
				"post" => '',
				"dp"   => 2
			),
			'CLP' => array(
				"pre"  => "$",
				"post" => '',
				"dp"   => 0
			),
			'CNY' => array(
				"pre"  => "¥",
				"post" => '',
				"dp"   => 2
			),
			'COP' => array(
				"pre"  => "$",
				"post" => '',
				"dp"   => 2
			),
			'CZK' => array(
				"pre"  => '',
				"post" => " Kč",
				"dp"   => 2
			),
			'KMF' => array(
				"pre"  => "CF",
				"post" => '',
				"dp"   => 0
			),
			'CRC' => array(
				"pre"  => "₡",
				"post" => '',
				"dp"   => 2
			),
			'HRK' => array(
				"pre"  => "kn",
				"post" => '',
				"dp"   => 2
			),
			'CUP' => array(
				"pre"  => '$MN',
				"post" => '',
				"dp"   => 2
			),
			'DKK' => array(
				"pre"  => '',
				"post" => "kr",
				"dp"   => 2
			),
			'DJF' => array(
				"pre"  => "Fdj",
				"post" => '',
				"dp"   => 0
			),
			'DOP' => array(
				"pre"  => "RD$",
				"post" => '',
				"dp"   => 2
			),
			'EUR' => array(
				"pre"  => '',
				"post" => " €",
				"dp"   => 2
			),
			'EGP' => array(
				"pre"  => "£",
				"post" => '',
				"dp"   => 2
			),
			'SVC' => array(
				"pre"  => "$",
				"post" => '',
				"dp"   => 2
			),
			'EEK' => array(
				"pre"  => '',
				"post" => "kr",
				"dp"   => 2
			),
			'ETB' => array(
				"pre"  => "Br",
				"post" => '',
				"dp"   => 2
			),
			'FKP' => array(
				"pre"  => "£",
				"post" => '',
				"dp"   => 2
			),
			'FJD' => array(
				"pre"  => "$",
				"post" => '',
				"dp"   => 2
			),
			'GMD' => array(
				"pre"  => "D",
				"post" => '',
				"dp"   => 2
			),
			'GHC' => array(
				"pre"  => "¢",
				"post" => '',
				"dp"   => 2
			),
			'GIP' => array(
				"pre"  => "£",
				"post" => '',
				"dp"   => 2
			),
			'GTQ' => array(
				"pre"  => "Q",
				"post" => '',
				"dp"   => 2
			),
			'GNF' => array(
				"pre"  => "FG",
				"post" => '',
				"dp"   => 0
			),
			'GYD' => array(
				"pre"  => "$",
				"post" => '',
				"dp"   => 2
			),
			'HTG' => array(
				"pre"  => "G",
				"post" => '',
				"dp"   => 2
			),
			'HNL' => array(
				"pre"  => "L",
				"post" => '',
				"dp"   => 2
			),
			'HKD' => array(
				"pre"  => "HK$",
				"post" => '',
				"dp"   => 2
			),
			'HUF' => array(
				"pre"  => "Ft",
				"post" => '',
				"dp"   => 2
			),
			'ISK' => array(
				"pre"  => '',
				"post" => "kr",
				"dp"   => 2
			),
			'INR' => array(
				"pre"  => "Rs",
				"post" => '',
				"dp"   => 2
			),
			'IDR' => array(
				"pre"  => "Rp",
				"post" => '',
				"dp"   => 2
			),
			'IRR' => array(
				"pre"  => "﷼",
				"post" => '',
				"dp"   => 2
			),
			'IQD' => array(
				"pre"  => "ع.د",
				"post" => '',
				"dp"   => 3
			),
			'ILS' => array(
				"pre"  => "₪",
				"post" => '',
				"dp"   => 2
			),
			'JMD' => array(
				"pre"  => "J$",
				"post" => '',
				"dp"   => 2
			),
			'JPY' => array(
				"pre"  => "¥",
				"post" => '',
				"dp"   => 0
			),
			'JOD' => array(
				"pre"  => "JD",
				"post" => '',
				"dp"   => 3
			),
			'KZT' => array(
				"pre"  => "лв",
				"post" => '',
				"dp"   => 2
			),
			'KES' => array(
				"pre"  => "KSh",
				"post" => '',
				"dp"   => 2
			),
			'KRW' => array(
				"pre"  => "₩",
				"post" => '',
				"dp"   => 0
			),
			'KWD' => array(
				"pre"  => "د.ك",
				"post" => '',
				"dp"   => 3
			),
			'LAK' => array(
				"pre"  => "₭",
				"post" => '',
				"dp"   => 2
			),
			'LVL' => array(
				"pre"  => "Ls",
				"post" => '',
				"dp"   => 2
			),
			'LBP' => array(
				"pre"  => "£",
				"post" => '',
				"dp"   => 2
			),
			'LSL' => array(
				"pre"  => "M",
				"post" => '',
				"dp"   => 2
			),
			'LRD' => array(
				"pre"  => "$",
				"post" => '',
				"dp"   => 2
			),
			'LYD' => array(
				"pre"  => "ل.د",
				"post" => '',
				"dp"   => 2
			),
			'LTL' => array(
				"pre"  => "Lt",
				"post" => '',
				"dp"   => 2
			),
			'MOP' => array(
				"pre"  => "MOP$",
				"post" => '',
				"dp"   => 2
			),
			'MGA' => array(
				"pre"  => "FMG",
				"post" => '',
				"dp"   => 2
			),
			'MWK' => array(
				"pre"  => "MK",
				"post" => '',
				"dp"   => 2
			),
			'MYR' => array(
				"pre"  => "RM",
				"post" => '',
				"dp"   => 2
			),
			'MVR' => array(
				"pre"  => ".ރ",
				"post" => '',
				"dp"   => 2
			),
			'MRO' => array(
				"pre"  => "UM",
				"post" => '',
				"dp"   => 2
			),
			'MUR' => array(
				"pre"  => "R",
				"post" => '',
				"dp"   => 2
			),
			'MXN' => array(
				"pre"  => "$",
				"post" => '',
				"dp"   => 2
			),
			'MNT' => array(
				"pre"  => "₮",
				"post" => '',
				"dp"   => 2
			),
			'MAD' => array(
				"pre"  => "د.م.",
				"post" => '',
				"dp"   => 2
			),
			'MZM' => array(
				"pre"  => "MT",
				"post" => '',
				"dp"   => 2
			),
			'MMK' => array(
				"pre"  => "K",
				"post" => '',
				"dp"   => 2
			),
			'NAD' => array(
				"pre"  => "$",
				"post" => '',
				"dp"   => 2
			),
			'NPR' => array(
				"pre"  => "रू.",
				"post" => '',
				"dp"   => 2
			),
			'NZD' => array(
				"pre"  => "$",
				"post" => '',
				"dp"   => 2
			),
			'NIO' => array(
				"pre"  => "C$",
				"post" => '',
				"dp"   => 2
			),
			'NGN' => array(
				"pre"  => "₦",
				"post" => '',
				"dp"   => 2
			),
			'KPW' => array(
				"pre"  => "₩",
				"post" => '',
				"dp"   => 2
			),
			'NOK' => array(
				"pre"  => '',
				"post" => "kr",
				"dp"   => 2
			),
			'OMR' => array(
				"pre"  => "﷼",
				"post" => '',
				"dp"   => 2
			),
			'PKR' => array(
				"pre"  => "Rs",
				"post" => '',
				"dp"   => 2
			),
			'PAB' => array(
				"pre"  => "B/.",
				"post" => '',
				"dp"   => 2
			),
			'PGK' => array(
				"pre"  => "K",
				"post" => '',
				"dp"   => 2
			),
			'PYG' => array(
				"pre"  => "Gs",
				"post" => '',
				"dp"   => 0
			),
			'PEN' => array(
				"pre"  => "S/.",
				"post" => '',
				"dp"   => 2
			),
			'PHP' => array(
				"pre"  => "Php",
				"post" => '',
				"dp"   => 2
			),
			'PLN' => array(
				"pre"  => "zł",
				"post" => '',
				"dp"   => 2
			),
			'QAR' => array(
				"pre"  => "ر.ق",
				"post" => '',
				"dp"   => 2
			),
			'ROL' => array(
				"pre"  => "lei",
				"post" => '',
				"dp"   => 2
			),
			'RUB' => array(
				"pre"  => "руб",
				"post" => '',
				"dp"   => 2
			),
			'WST' => array(
				"pre"  => "WS$",
				"post" => '',
				"dp"   => 2
			),
			'STD' => array(
				"pre"  => "Db",
				"post" => '',
				"dp"   => 2
			),
			'SAR' => array(
				"pre"  => "﷼",
				"post" => '',
				"dp"   => 2
			),
			'SCR' => array(
				"pre"  => "SRe",
				"post" => '',
				"dp"   => 2
			),
			'SLL' => array(
				"pre"  => "Le",
				"post" => '',
				"dp"   => 2
			),
			'SGD' => array(
				"pre"  => "$",
				"post" => '',
				"dp"   => 2
			),
			'SBD' => array(
				"pre"  => "SI$",
				"post" => '',
				"dp"   => 2
			),
			'SOS' => array(
				"pre"  => "S",
				"post" => '',
				"dp"   => 2
			),
			'ZAR' => array(
				"pre"  => "R",
				"post" => '',
				"dp"   => 2
			),
			'LKR' => array(
				"pre"  => "Rs",
				"post" => '',
				"dp"   => 2
			),
			'SHP' => array(
				"pre"  => "£",
				"post" => '',
				"dp"   => 2
			),
			'SDP' => array(
				"pre"  => "جنيه سوداني",
				"post" => '',
				"dp"   => 2
			),
			'SZL' => array(
				"pre"  => "E",
				"post" => '',
				"dp"   => 2
			),
			'SEK' => array(
				"pre"  => '',
				"post" => "kr",
				"dp"   => 2
			),
			'CHF' => array(
				"pre"  => "CHF",
				"post" => '',
				"dp"   => 2
			),
			'SYP' => array(
				"pre"  => "£",
				"post" => '',
				"dp"   => 2
			),
			'TWD' => array(
				"pre"  => "NT$",
				"post" => '',
				"dp"   => 2
			),
			'THB' => array(
				"pre"  => '',
				"post" => "฿",
				"dp"   => 2
			),
			'TOP' => array(
				"pre"  => "T$",
				"post" => '',
				"dp"   => 2
			),
			'TTD' => array(
				"pre"  => "$",
				"post" => '',
				"dp"   => 2
			),
			'TND' => array(
				"pre"  => "د.ت",
				"post" => '',
				"dp"   => 2
			),
			'TRL' => array(
				"pre"  => "TL",
				"post" => '',
				"dp"   => 2
			),
			'USD' => array(
				"pre"  => "US$",
				"post" => '',
				"dp"   => 2
			),
			'UGS' => array(
				"pre"  => "Sh",
				"post" => '',
				"dp"   => 2
			),
			'UAG' => array(
				"pre"  => "₴",
				"post" => '',
				"dp"   => 2
			),
			'UYP' => array(
				"pre"  => "$",
				"post" => '',
				"dp"   => 2
			),
			'AED' => array(
				"pre"  => "د.إ",
				"post" => '',
				"dp"   => 2
			),
			'VUV' => array(
				"pre"  => "Vt",
				"post" => '',
				"dp"   => 0
			),
			'VEB' => array(
				"pre"  => "Bs F",
				"post" => '',
				"dp"   => 2
			),
			'VND' => array(
				"pre"  => "₫",
				"post" => '',
				"dp"   => 2
			),
			'ZMK' => array(
				"pre"  => "ZK",
				"post" => '',
				"dp"   => 2
			),
			'ZWD' => array(
				"pre"  => "$",
				"post" => '',
				"dp"   => 2
			),
		);
	}
}