<?php
/**
 * @package     Know Reservations
 * @subpackage  Library
 * @copyright   Copyright (C) 2020 Highland Vision. All rights reserved.
 * @license     See the file LICENSE.txt for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\KR;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use NumberFormatter;
use RuntimeException;
use stdClass;

use function implode;
use function json_decode;
use function json_encode;
use function number_format;

use const JSON_NUMERIC_CHECK;

/**
 * KrMethods Linker (currently just Joomla)
 *
 * @since  3.0.0
 */
class Utility
{
	/**
	 * Format ajax errors
	 *
	 * @param  mixed  $errors  Error messages
	 *
	 * @throws Exception
	 * @since  3.3.0
	 * @return array
	 */
	public static function ajaxErrors(mixed $errors): array
	{
		$messages = [];

		if (is_a($errors, 'Exception') || is_subclass_of($errors, 'Exception')) {
			if (KrMethods::isAdmin()) {
				$messages[] = $errors->getMessage();
			}
			else {
				$messages[] = KrMethods::plain('COM_KNOWRES_ERROR_FATAL');
			}
		}
		else if (is_countable($errors) && count($errors)) {
			for ($i = 0, $n = count($errors); $i < $n && $i < 3; $i++) {
				if (is_a($errors[$i], 'Exception')) {
					$messages[] = $errors[$i]->getMessage();
				}
				else {
					$messages[] = $errors[$i];
				}
			}
		}
		else {
			$messages[] = KrMethods::plain('COM_KNOWRES_ERROR_FATAL');
		}

		return $messages;
	}

	/**
	 * Convert array to object
	 *
	 * @param  array  $array  Data to be converted
	 *
	 * @since  3.2.1
	 * @return mixed
	 */
	public static function arrayToObject(array $array): mixed
	{
		return json_decode(json_encode($array, false));
	}

	/**
	 * Compare two floats
	 *
	 * @param  float  $one      First float
	 * @param  float  $two      Second float
	 * @param  int    $decimal  Decimal points
	 *
	 * @since  3.4.0
	 * @return bool
	 */
	public static function compareFloat(float $one, float $two, int $decimal = 2): bool
	{
		return round($one, $decimal) == round($two, $decimal);
	}

	/**
	 * Get part of string without cutting words
	 *
	 * @param  string  $string  Text for evaluation
	 * @param  int     $length  Number of characters required
	 *
	 * @since  1.0.0
	 * @return string
	 */
	public static function cutString(string $string, int $length): string
	{
		$text = $string;
		if (strlen($string) > $length) {
			$text = substr($string, 0, strpos($string, ' ', $length));
			$text .= ".....";
		}

		return $text;
	}

	/**
	 * Decode json or return empty type
	 *
	 * @param  ?string  $data   Json data to be decoded
	 * @param  bool     $array  Output format
	 *
	 * @since  3.3.0
	 * @return mixed
	 */
	public static function decodeJson(?string $data, bool $array = false): mixed
	{
		if ($array) {
			$data = json_decode($data, true);
			if (!is_countable($data)) {
				$data = [];
			}
		}
		else {
			$data = json_decode($data);
			if (is_null($data)) {
				$data = new stdClass();
			}
		}

		return $data;
	}

	/**
	 * Display array of ages as 1, 2 ,3 and 4.
	 *
	 * @param  array  $ages  Array of ages
	 *
	 * @since  4.0.0
	 * @return string
	 */
	public static function displayAges(array $ages): string
	{
		$ages = implode(', ', $ages);

		return substr_replace($ages, ' and ', strrpos($ages, ', '), 1);
	}

	/**
	 * Display monetary (floated) input fields
	 *
	 * @param  ?float  $value      Monetary value
	 * @param  int     $dp         Decimal places
	 * @param  string  $separator  Decimal character
	 *
	 * @since  3.5.0
	 * @return string
	 */
	public static function displayMoney(?float $value, int $dp = 2, string $separator = '.'): string
	{
		$params = KrMethods::getParams();
		if ($params->get('decimal_comma') && !$separator) {
			return number_format($value, $dp, ',', '');
		}
		else {
			return number_format($value, $dp, '.', '');
		}
	}

	/**
	 * Format a currency value for display using numberformatter
	 *
	 * @param  mixed   $value      Value to be converted or null
	 * @param  string  $currency   ISO currency
	 * @param  bool    $decimals   Falso to hide decimals
	 * @param  string  $lang_code  Current language code
	 *
	 * @since  3.5.0
	 * @return string
	 */
	public static function displayValue(mixed  $value,
	                                    string $currency,
	                                    bool   $decimals = true,
	                                    string $lang_code = ''): string
	{
		if (empty($value)) {
			$value = 0;
		}

		if (!$lang_code) {
			$lang_code = KrMethods::getLanguageTag();
		}

		$fmt = new NumberFormatter($lang_code, NumberFormatter::CURRENCY);
		$fmt->setTextAttribute(NumberFormatter::CURRENCY_CODE, $currency);

		if (!$decimals) {
			$fmt->setAttribute(NumberFormatter::FRACTION_DIGITS, 0);
		}

		return $fmt->formatCurrency($value, $currency);
	}

	/**
	 * Encode json for a non-empty array or object
	 *
	 * @param  mixed  $data     Data to be encoded
	 * @param  bool   $numeric  Set true to remove quotes from numbers
	 *
	 * @since  2.4.0
	 * @return string
	 */
	public static function encodeJson(mixed $data, bool $numeric = false): string
	{
		if (is_array($data) || is_object($data)) {
			if ($numeric) {
				return json_encode($data, JSON_NUMERIC_CHECK);
			}
			else {
				return json_encode($data);
			}
		}

		return '';
	}

	/**
	 * Format address
	 *
	 * @param  ?string   $address1  Address line 1
	 * @param  ?string   $address2  Address line 2
	 * @param  ?string   $postcode  Postcode
	 * @param  ?string   $town      Town
	 * @param  mixed     $region    ID of region or name
	 * @param  mixed     $country   ID of country or name
	 * @param   ?string  $string    Value for implode
	 *
	 * @throws RuntimeException
	 * @since  3.3.0
	 * @return ?string
	 */
	public static function formatAddress(?string $address1,
	                                     ?string $address2,
	                                     ?string $postcode,
	                                     ?string $town,
	                                     mixed   $region,
	                                     mixed   $country,
	                                     ?string $string): ?string
	{
		$Translations = new Translations();

		$tmp   = [];
		$tmp[] = $address1 ?: '';
		$tmp[] = $address2 ?: '';
		$tmp[] = $town ?: '';
		$tmp[] = $postcode ?: '';
		$tmp[] = $region ? self::getAddressValue($Translations, 'region', $region) : '';
		$tmp[] = $country ? self::getAddressValue($Translations, 'country', $country) : '';
		$tmp   = array_filter($tmp);

		return implode($string, $tmp);
	}

	/**
	 * Format a phone number for display
	 *
	 * @param  string  $number      Telephone number
	 * @param  int     $country_id  ID of country
	 * @param  bool    $paypal      True for PayPal format
	 *
	 * @throws Exception
	 * @since  3.3.0
	 * @return string
	 */
	public static function formatPhoneNumber(string $number, int $country_id = 0, bool $paypal = false): string
	{
		$code = '';
		if ($country_id) {
			$code = self::getDialCode($country_id, $paypal);
		}

		return $paypal ? $code . str_replace(' ', '', $number) : $code . ' ' . $number;
	}

	/**
	 * New name for Save&Copy
	 *
	 * @param  string  $name  Value to be incremented
	 *
	 * @since  1.7.1
	 * @return string
	 */
	public static function generateNewName(string $name): string
	{
		return $name . ' (Copy)';
	}

	/**
	 * Geocode latlng details
	 *
	 * @param  string  $latlng  LatLng details
	 *
	 * @since 3.3.0
	 * @return array|bool
	 */
	public static function geoCodeLatLng(string $latlng): array|bool
	{
		$params = KrMethods::getParams();
		$key    = $params->get('gmapkey', '');
		$url    = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" . $latlng . '&key=' . $key;
		$data   = self::decodeJson(file_get_contents($url));

		if (isset($data->results[0]->formatted_address)) {
			return $data->results[0]->formatted_address;
		}

		return 'Unknown Place';
	}

	/**
	 * Get translations for address fields
	 *
	 * @param  Translations  $Translations  Translations object
	 * @param  string        $item          Table name
	 * @param  mixed         $value         Item value
	 * @param  string        $field         Translation field name
	 *
	 * @throws RuntimeException
	 * @since  3.3.0
	 * @return array|string
	 */
	public static function getAddressValue(Translations $Translations,
	                                       string       $item,
	                                       mixed        $value,
	                                       string       $field = 'name'): array|string
	{
		return is_numeric($value) ? $Translations->getText($item, $value, $field) : $value;
	}

	/**
	 * Output textual status of contract
	 *
	 * @param  int   $booking_status  Booking status
	 * @param  bool  $short           True for short booking status value
	 *
	 * @since  1.0.0
	 * @return string
	 */
	public static function getBookingStatus(int $booking_status, bool $short = false): string
	{
		if (!$short) {
			return match ($booking_status) {
				1       => KrMethods::plain('COM_KNOWRES_CONTRACTS_BOOKING_STATUS_1'),
				5       => KrMethods::plain('COM_KNOWRES_CONTRACTS_BOOKING_STATUS_5'),
				10      => KrMethods::plain('COM_KNOWRES_CONTRACTS_BOOKING_STATUS_10'),
				30      => KrMethods::plain('COM_KNOWRES_CONTRACTS_BOOKING_STATUS_30'),
				35      => KrMethods::plain('COM_KNOWRES_CONTRACTS_BOOKING_STATUS_35'),
				39      => KrMethods::plain('COM_KNOWRES_CONTRACTS_BOOKING_STATUS_39'),
				40      => KrMethods::plain('COM_KNOWRES_CONTRACTS_BOOKING_STATUS_40'),
				99      => KrMethods::plain('COM_KNOWRES_CONTRACTS_BOOKING_STATUS_99'),
				default => KrMethods::plain('COM_KNOWRES_CONTRACTS_BOOKING_STATUS_0'),
			};
		}
		else {
			return match ($booking_status) {
				1       => KrMethods::plain('COM_KNOWRES_CONTRACTS_BOOKING_STATUS_SHORT_1'),
				5       => KrMethods::plain('COM_KNOWRES_CONTRACTS_BOOKING_STATUS_SHORT_5'),
				10      => KrMethods::plain('COM_KNOWRES_CONTRACTS_BOOKING_STATUS_SHORT_10'),
				30      => KrMethods::plain('COM_KNOWRES_CONTRACTS_BOOKING_STATUS_SHORT_30'),
				35      => KrMethods::plain('COM_KNOWRES_CONTRACTS_BOOKING_STATUS_SHORT_35'),
				39      => KrMethods::plain('COM_KNOWRES_CONTRACTS_BOOKING_STATUS_SHORT_39'),
				40      => KrMethods::plain('COM_KNOWRES_CONTRACTS_BOOKING_STATUS_SHORT_40'),
				99      => KrMethods::plain('COM_KNOWRES_CONTRACTS_BOOKING_STATUS_SHORT_99'),
				default => KrMethods::plain('COM_KNOWRES_CONTRACTS_BOOKING_STATUS_SHORT_0'),
			};
		}
	}

	/**
	 * Get dialling code from country
	 *
	 * @param  int   $country_id  ID of country
	 * @param  bool  $paypal      True for PayPAl format that requires 00 instead of plus
	 *
	 * @throws Exception
	 * @since  3.7.0
	 * @return string
	 */
	public static function getDialCode(int $country_id, bool $paypal = false): string
	{
		$country = KrFactory::getAdminModel('country')->getItem($country_id);
		if (isset($country->id) && $country->dial_code) {
			return $paypal ? '' : '+' . $country->dial_code;
		}
		else {
			return '';
		}
	}

	/**
	 * Return URL for Google Maps
	 *
	 * @since  2.3.0
	 * @return string
	 */
	public static function getGmapsURL(): string
	{
		$url = 'https://maps.googleapis.com/maps/api/js';

		$params = KrMethods::getParams();
		$key    = $params->get('gmapkey', '');
		if ($key) {
			$url .= '?key=' . $key;
		}

		$url .= '&callback=Function.prototype';

		return $url;
	}

	/**
	 * Return URL for Google Maps
	 *
	 * @since  2.3.0
	 * @return string
	 */
	public static function getMarkerClustererURL(): string
	{
		return 'https://unpkg.com/@googlemaps/markerclusterer/dist/index.min.js';
	}

	/**
	 * Get session gobackto value
	 *
	 * @throws Exception
	 * @since  4.0.0
	 * @return false|string
	 */
	public static function getGoBackTo(): bool|string
	{
		$gobackto = KrMethods::getUserState('com_knowres.gobackto');
		if (!empty($gobackto)) {
			KrMethods::setUserState('com_knowres.gobackto', null);
		}

		if (is_null($gobackto)) {
			return false;
		}
		else {
			return $gobackto;
		}
	}

	/**
	 * Get path info
	 *
	 * @param  string  $type  Path type
	 *
	 * @since  1.0.0
	 * @return false|string
	 */
	public static function getPath(string $type): false|string
	{
		if ($type == 'root') {
			return JPATH_SITE;
		}

		return false;
	}

	/**
	 * Redirect to a main listing page
	 * Admin use only as no Itemid
	 *
	 * @throws Exception
	 * @since  4.0.0
	 */
	public static function goto(string $view): void
	{
		KrMethods::redirect(KrMethods::route('index.php?option=com_knowres&view=' . $view, false));
	}

	/**
	 * Convert text to folder name
	 *
	 * @param  string  $name  Folder name to clean
	 *
	 * @since  2.2.0
	 * @return string
	 */
	public static function makeFolderName(string $name): string
	{
		$name = str_replace("'", ' - ', $name);
		$name = iconv('UTF-8', 'ASCII//TRANSLIT', $name);
		$name = iconv('UTF-8', 'ASCII//IGNORE', $name);
		$name = iconv('CP1252', 'ASCII//TRANSLIT', $name);

		return strtolower(preg_replace("/[^A-Za-z\d-]/", '', str_replace(" ", "-", trim($name))));
	}

	/**
	 * Convert new lines to paragraph tags
	 *
	 * @param  string  $string String to convert
	 *
	 * @since  4.3.0
	 * @return string
	 */
	public static function nl2p(string $string): string
	{
		$string = str_replace(['<p>', '</p>', '<br>', '<br />'], '', $string);

		return  '<p>' . preg_replace('/[\r\n]+/', '</p><p>', $string) . '</p>';
	}

	/**
	 * Format errors for page
	 *
	 * @param  string|array  $errors  Error messages or Exception
	 * @param  string        $type    Message type
	 *
	 * @throws Exception
	 * @since  3.3.0
	 */
	public static function pageErrors(string|array $errors, string $type = 'error'): void
	{
		if (is_string($errors)) {
			$errors = [$errors];
		}

		if (is_a($errors, 'Exception') || is_subclass_of($errors, 'Exception')) {
			if (KrMethods::isAdmin()) {
				KrMethods::message($errors->getMessage(), 'error');
			}
			else {
				KrMethods::plain('COM_KNOWRES_ERROR_FATAL');
			}
		}
		else {
			for ($i = 0, $n = count($errors); $i < $n && $i < 3; $i++) {
				if (is_a($errors[$i], 'Exception') || is_subclass_of($errors[$i], 'Exception')) {
					KrMethods::message($errors[$i]->getMessage(), $type);
				}
				else {
					KrMethods::message($errors[$i], $type);
				}
			}
		}
	}

	/**
	 * Queue message and redirect
	 *
	 * @param  string  $message   A language or literal text.
	 * @param  string  $redirect  Redirect rpoute excluding index and option.
	 *
	 * @throws Exception
	 * @since  4.0.0
	 */
	public static function qmr(string $message, string $redirect): void
	{
		KrMethods::message(KrMethods::plain($message));
		KrMethods::redirect(KrMethods::route('index.php?option=com_knowres&' . $redirect, false));
	}

	/**
	 * Round currency values as per decimal places
	 *
	 * @param  float   $value     Value to be rounded
	 * @param  string  $iso       ISO currency for rounding
	 * @param  int     $decimals  Decimals for rounding
	 *
	 * @throws RuntimeException
	 * @since  1.0.0
	 * @return float
	 */
	public static function roundValue(float $value, string $iso = '', int $decimals = 0): float
	{
		if ($iso && !$decimals) {
			$decimals = KrFactory::getListModel('currencies')->getDp($iso);
		}

		$value = round($value, $decimals);
		if (!$value) {
			$value = abs($value);
		}

		return $value;
	}

	/**
	 * Validate input date
	 *
	 * @param  string  $date  Date to validate
	 *
	 * @throws RuntimeException
	 * @since  3.3.1
	 */
	public static function validateInputDate(string $date): void
	{
		//TODO-v4.3 Use this for all site input date fields
		if ($date) {
			if (!TickTock::isValidDate($date)) {
				throw new RuntimeException ('Invalid date was received', 400);
			}
		}
	}
}