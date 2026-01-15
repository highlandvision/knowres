<?php
/**
 * @package     Know Reservations
 * @subpackage  Library
 * @copyright   Copyright (C) 2020 Highland Vision. All rights reserved.
 * @license     See the file LICENSE.txt for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\KR;

use Exception;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use NumberFormatter;
use RuntimeException;
use stdClass;

use function ceil;
use function defined;
use function floor;
use function implode;
use function json_decode;
use function json_encode;
use function number_format;
use function pow;

use const JSON_NUMERIC_CHECK;

if (!defined('KRFRAMEWORK')) {
    define('KRFRAMEWORK', 'Joomla');
}

// phpcs:disable PSR1.Files.SideEffects
defined('_JEXEC') or die;
// phpcs:enable PSR1.Files.SideEffects

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
     * @param   mixed  $errors  Error messages
     *
     * @return array
     * @throws Exception
     * @since  3.3.0
     */
    public static function ajaxErrors(mixed $errors): array
    {
        $messages = [];

        if (is_a($errors, 'Exception') || is_subclass_of($errors, 'Exception')) {
            if (KrMethods::isAdmin()) {
                $messages[] = $errors->getMessage();
            } else {
                $messages[] = KrMethods::plain('COM_KNOWRES_ERROR_FATAL');
            }
        } elseif (is_countable($errors) && count($errors)) {
            for ($i = 0, $n = count($errors); $i < $n && $i < 3; $i++) {
                if (is_a($errors[$i], 'Exception')) {
                    $messages[] = $errors[$i]->getMessage();
                } else {
                    $messages[] = $errors[$i];
                }
            }
        } else {
            $messages[] = KrMethods::plain('COM_KNOWRES_ERROR_FATAL');
        }

        return $messages;
    }

    /**
     * Convert array to object
     *
     * @param   array  $array  Data to be converted
     *
     * @return mixed
     * @since  3.2.1
     */
    public static function arrayToObject(array $array): mixed
    {
        return json_decode(json_encode($array, false));
    }

    /**
     * Compare two floats
     *
     * @param   ?float  $one      First float
     * @param   ?float  $two      Second float
     * @param   int     $decimal  Decimal points
     *
     * @return bool
     * @since  3.4.0
     */
    public static function compareFloat(?float $one, ?float $two, int $decimal = 2): bool
    {
        if (!$one || !$two) {
            return 0;
        }

        return round($one, $decimal) == round($two, $decimal);
    }

    /**
     * Get part of string without cutting words
     *
     * @param   string  $string  Text for evaluation
     * @param   int     $length  Number of characters required
     *
     * @return string
     * @since  1.0.0
     */
    public static function cutString(string $string, int $length): string
    {
        $text = $string;
        if (strlen($string) > $length) {
            $text = substr($string, 0, strpos($string, ' ', $length));
            $text .= '.....';
        }

        return $text;
    }

    /**
     * Decode JSON or return empty type
     *
     * @param  ?string  $data   Json data to be decoded
     * @param   bool    $array  Output format
     *
     * @return mixed
     * @since  3.3.0
     */
    public static function decodeJson(?string $data, bool $array = false): mixed
    {
        if ($array) {
            $data = json_decode($data, true);
            if (!is_countable($data)) {
                $data = [];
            }
        } else {
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
     * @param   array  $ages  Array of ages
     *
     * @return string
     * @since  4.0.0
     */
    public static function displayAges(array $ages): string
    {
        $ages = implode(', ', $ages);

        // Replace the last comma with "&"
        return preg_replace('/,([^,]*)$/', ' &$1', $ages);
    }

    /**
     * Display monetary (floated) input fields
     *
     * @param  ?float   $value      Monetary value
     * @param   int     $dp         Decimal places
     * @param   string  $separator  Decimal character
     *
     * @return string
     * @since  3.5.0
     */
    public static function displayMoney(?float $value, int $dp = 2, string $separator = '.'): string
    {
        $params = KrMethods::getParams();
        if ($params->get('decimal_comma') && !$separator) {
            return number_format($value, $dp, ',', '');
        } else {
            return number_format($value, $dp, '.', '');
        }
    }

    /**
     * Format a currency value for display using numberformatter
     *
     * @param   mixed   $value      Value to be converted or null
     * @param   string  $currency   ISO currency
     * @param   bool    $decimals   Falso to hide decimals
     * @param   string  $lang_code  Current language code
     *
     * @return string
     * @since  3.5.0
     */
    public static function displayValue(mixed $value, string $currency, bool $decimals = true, string $lang_code = '',
    ): string {
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
     * Encode JSON for a non-empty array or object
     *
     * @param   mixed  $data     Data to be encoded
     * @param   bool   $numeric  Set true to remove quotes from numbers
     *
     * @return string
     * @since  2.4.0
     */
    public static function encodeJson(mixed $data, bool $numeric = false): string
    {
        if (is_array($data) || is_object($data)) {
            if ($numeric) {
                return json_encode($data, JSON_NUMERIC_CHECK);
            } else {
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
     * @param   mixed    $region    ID of region or name
     * @param   mixed    $country   ID of country or name
     * @param   ?string  $string    Value for implode
     *
     * @return ?string
     * @throws RuntimeException
     * @since  3.3.0
     */
    public static function formatAddress(?string $address1, ?string $address2, ?string $postcode, ?string $town,
        mixed $region, mixed $country, ?string $string,
    ): ?string {
        $Translations = new Translations();
        $tmp          = [];
        $tmp[]        = $address1 ?: '';
        $tmp[]        = $address2 ?: '';
        $tmp[]        = $town ?: '';
        $tmp[]        = $postcode ?: '';
        $tmp[]        = $region ? self::formatAddressField($Translations, 'region', $region) : '';
        $tmp[]        = $country ? self::formatAddressField($Translations, 'country', $country) : '';
        $tmp          = array_filter($tmp);

        return implode($string, $tmp);
    }

    /**
     * Get translations for address fields
     *
     * @param   Translations  $Translations  Translations object
     * @param   string        $item          Table name
     * @param   mixed         $value         Item valuel
     * @param   string        $field         Translation field name
     *
     * @return array|string
     * @throws RuntimeException
     * @since  3.3.0
     */
    public static function formatAddressField(Translations $Translations, string $item, mixed $value,
        string $field = 'name',
    ): array|string {
        return is_numeric($value) ? $Translations->getText($item, $value, $field) : $value;
    }

    /**
     * Format a phone number for display
     *
     * @param   ?string  $number      Telephone number
     * @param   ?int     $country_id  ID of country
     * @param   bool     $paypal      True for PayPal format
     *
     * @return string
     * @throws Exception
     * @since  3.3.0
     */
    public static function formatPhoneNumber(?string $number, ?int $country_id = 0, bool $paypal = false): string
    {
        if (!$number) {
            return '';
        }

        $code = '';
        if ($country_id) {
            $code = self::generateDialCode($country_id, $paypal);
        }

        return $paypal ? $code . str_replace(' ', '', $number) : $code . ' ' . $number;
    }

    /**
     * Get dialing code from country
     *
     * @param   int   $country_id  ID of country
     * @param   bool  $paypal      True for PayPal format that requires 00 instead of plus
     *
     * @return string
     * @throws Exception
     * @since  3.7.0
     */
    public static function generateDialCode(int $country_id, bool $paypal = false): string
    {
        $country = KrFactory::getAdminItem('country', $country_id);
        if (isset($country->id) && $country->dial_code) {
            return $paypal ? '' : '+' . $country->dial_code;
        } else {
            return '';
        }
    }

    /**
     * New name for Save&Copy
     *
     * @param   string  $name  Value to be incremented
     *
     * @return string
     * @since  1.7.1
     */
    public static function generateNewName(string $name): string
    {
        return $name . ' (Copy)';
    }

    /**
     * Geocode latlng details
     *
     * @param   string  $latlng  LatLng details
     *
     * @return array|bool
     * @since 3.3.0
     */
    public static function geoCodeLatLng(string $latlng): array|bool
    {
        $params = KrMethods::getParams();
        $key    = $params->get('gmapkey', '');
        $url    =
            'https://maps.googleapis.com/maps/api/geocode/json?v=3.55&latlng=' . $latlng .
            '&key=' . $key .
            '&loading=async&callback=initMap';
        $data   = self::decodeJson(file_get_contents($url));

        if (isset($data->results[0]->formatted_address)) {
            return $data->results[0]->formatted_address;
        }

        return 'Unknown Place';
    }

    /**
     * Output textual status of contract
     *
     * @param   ?int  $booking_status  Booking status
     * @param   bool  $short           True for short booking status value
     *
     * @return string
     * @since  1.0.0
     */
    public static function getBookingStatus(?int $booking_status, bool $short = false): string
    {
        if (!$short) {
            return match ($booking_status) {
                1 => KrMethods::plain('COM_KNOWRES_CONTRACTS_BOOKING_STATUS_1'),
                5 => KrMethods::plain('COM_KNOWRES_CONTRACTS_BOOKING_STATUS_5'),
                10 => KrMethods::plain('COM_KNOWRES_CONTRACTS_BOOKING_STATUS_10'),
                30 => KrMethods::plain('COM_KNOWRES_CONTRACTS_BOOKING_STATUS_30'),
                35 => KrMethods::plain('COM_KNOWRES_CONTRACTS_BOOKING_STATUS_35'),
                39 => KrMethods::plain('COM_KNOWRES_CONTRACTS_BOOKING_STATUS_39'),
                40 => KrMethods::plain('COM_KNOWRES_CONTRACTS_BOOKING_STATUS_40'),
                99 => KrMethods::plain('COM_KNOWRES_CONTRACTS_BOOKING_STATUS_99'),
                default => KrMethods::plain('COM_KNOWRES_CONTRACTS_BOOKING_STATUS_0'),
            };
        } else {
            return match ($booking_status) {
                1 => KrMethods::plain('COM_KNOWRES_CONTRACTS_BOOKING_STATUS_SHORT_1'),
                5 => KrMethods::plain('COM_KNOWRES_CONTRACTS_BOOKING_STATUS_SHORT_5'),
                10 => KrMethods::plain('COM_KNOWRES_CONTRACTS_BOOKING_STATUS_SHORT_10'),
                30 => KrMethods::plain('COM_KNOWRES_CONTRACTS_BOOKING_STATUS_SHORT_30'),
                35 => KrMethods::plain('COM_KNOWRES_CONTRACTS_BOOKING_STATUS_SHORT_35'),
                39 => KrMethods::plain('COM_KNOWRES_CONTRACTS_BOOKING_STATUS_SHORT_39'),
                40 => KrMethods::plain('COM_KNOWRES_CONTRACTS_BOOKING_STATUS_SHORT_40'),
                99 => KrMethods::plain('COM_KNOWRES_CONTRACTS_BOOKING_STATUS_SHORT_99'),
                default => KrMethods::plain('COM_KNOWRES_CONTRACTS_BOOKING_STATUS_SHORT_0'),
            };
        }
    }

    /**
     * Return textual booking type
     *
     * @param   int  $booking_type  Property booking type
     *
     * @return string
     * @since  5.1.0
     */
    public static function getBookingTypeText(int $booking_type): string
    {
        return match ($booking_type) {
            2 => KrMethods::plain('COM_KNOWRES_BOOK_INSTANT'),
            1 => KrMethods::plain('COM_KNOWRES_ON_REQUEST'),
            default => KrMethods::plain('COM_KNOWRES_BOOK_ENQUIRY'),
        };
    }

    /**
     * Return URL for Google Maps
     *
     * @return string
     * @since  2.3.0
     */
    public static function getGmapsURL(): string
    {
        $key = KrMethods::getParams()->get('gmapkey', '');
        if (!$key) {
            throw new RuntimeException ('A Google maps key must be entered in KR Options to use Google Maps', 400);
        }

        $url = 'https://maps.googleapis.com/maps/api/js?';
        $url .= 'key=' . $key;
        $url .= '&libraries=marker';
        $url .= '&loading=async';

        return $url;
    }

    /**
     * Get session gobackto value
     *
     * @return false|string
     * @throws Exception
     * @since  4.0.0
     */
    public static function getGoBackTo(): bool|string
    {
        $gobackto = KrMethods::getUserState('com_knowres.gobackto');
        if (!empty($gobackto)) {
            KrMethods::setUserState('com_knowres.gobackto', null);
        }

        if (is_null($gobackto)) {
            return false;
        } else {
            return $gobackto;
        }
    }

    /**
     * Return URL for Google Maps MarkerClusterer
     *
     * @return string
     * @since  2.3.0
     */
    public static function getMarkerClustererURL(): string
    {
        return 'https://unpkg.com/@googlemaps/markerclusterer/dist/index.min.js';
    }

    /**
     * Get path info
     *
     * @param   string  $type  Path type
     *
     * @return false|string
     * @since  1.0.0
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
     * @param   string  $name  Folder name to clean
     *
     * @return string
     * @since  2.2.0
     */
    public static function makeFolderName(string $name): string
    {
        $name = str_replace("'", ' - ', $name);
        $name = iconv('UTF-8', 'ASCII//TRANSLIT', $name);
        $name = iconv('UTF-8', 'ASCII//IGNORE', $name);
        $name = iconv('CP1252', 'ASCII//TRANSLIT', $name);

        return strtolower(preg_replace('/[^A-Za-z\d-]/', '', str_replace(' ', '-', trim($name))));
    }

    /**
     * Convert new lines to paragraph tags
     *
     * @param   string  $string  String to convert
     *
     * @return string
     * @since  5.0.0
     */
    public static function nl2p(string $string): string
    {
        $string = str_replace(['<p>', '</p>', '<br>', '<br />'], '', $string);

        return '<p>' . preg_replace('/[\r\n]+/', '</p><p>', $string) . '</p>';
    }

    /**
     * Format errors for page
     *
     * @param   string|array  $errors  Error messages or Exception
     * @param   string        $type    Message type
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
            } else {
                KrMethods::plain('COM_KNOWRES_ERROR_FATAL');
            }
        } else {
            for ($i = 0, $n = count($errors); $i < $n && $i < 3; $i++) {
                if (is_a($errors[$i], 'Exception') || is_subclass_of($errors[$i], 'Exception')) {
                    KrMethods::message($errors[$i]->getMessage(), $type);
                } else {
                    KrMethods::message($errors[$i], $type);
                }
            }
        }
    }

    /**
     * Queue message and redirect
     *
     * @param   string  $message   A language or literal text.
     * @param   string  $redirect  Redirect rpoute excluding index and option.
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
     * Round monetary value
     *
     * @param   float  $value  Value to be rounded
     * @param   int    $round  Up (1) or down (0)
     * @param   int    $unit   Unit for rounding
     *
     * @return float
     * @since  3.3.0
     */
    public static function roundMe(float $value, int $round = 1, int $unit = 5): float
    {
        if (!$unit) {
            return $value;
        }

        if (!$round) {
            $worker = floor($value / $unit) * $unit;
        } else {
            $worker = ceil($value / $unit) * $unit;
        }

        return (float)$worker;
    }

    /**
     * Round currency values as per decimal places
     *
     * @param   ?float   $value     Value to be rounded
     * @param   ?string  $iso       ISO currency for rounding
     * @param   int      $decimals  Decimals for rounding
     *
     * @return float
     * @throws RuntimeException
     * @since  1.0.0
     */
    public static function roundValue(?float $value, ?string $iso = '', int $decimals = 0): float
    {
        if (is_null($float)) {
            return 0;
        }

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
     * Set rows for search layouts
     *
     * @param   int     $columns  Number of columns to display
     * @param   string  $width    Screen width (medium or large)
     *
     * @since  5.1.0
     */
    public static function setColumns(int $columns, string $width): string
    {
        if ($columns == 2) {
            return $width . '-6';
        }
        if ($columns == 3) {
            return $width . '-4';
        }
        if ($columns == 4) {
            return $width . '-3';
        }
        if ($columns == 6) {
            return $width . '-2';
        }

        return $width . '-12';
    }

    /**
     * Set the payment amount for stripe (no dp)
     *
     * @throws Exception
     * @since  5.1.0
     */
    public static function setStripeAmount(float $amount, string $currency): string
    {
        $KrCurrency = new Currency($currency);
        $dp         = $KrCurrency->getDp();
        if ($dp > 0) {
            $multiplier = pow(10, $dp);
            $amount     = (string)$amount * $multiplier;
        } else {
            $amount = (string)$amount;
        }

        return $amount;
    }

    /**
     * Generate stripe metadata based on paymentdata session with some fields removed
     *
     * @param   stdClass  $paymentData
     *
     * @return array
     * @since  5.1.0
     */
    public static function setStripeMeta(stdClass $paymentData): array
    {
        $tmp = (array)$paymentData;
        unset($tmp['gateway_name']);
        unset($tmp['gateway_description']);
        unset($tmp['gateways']);
        unset($tmp['merchantParameters']);
        unset($tmp['merchantSignature']);
        $data = (object)$tmp;

        return json_decode(json_encode($data), true);
    }

    /**
     * Validate input date
     *
     * @param   string  $date  Date to validate
     *
     * @throws RuntimeException
     * @since  3.3.1
     */
    public static function validateInputDate(string $date): void
    {
        if ($date) {
            if (!TickTock::isValidDate($date)) {
                throw new RuntimeException ('Invalid date was received', 400);
            }
        }
    }
}