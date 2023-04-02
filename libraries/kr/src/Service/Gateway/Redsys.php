<?php
/**
 * @package    Know Reservations
 * @subpackage Library
 * @copyright  Copyright (c) 2020, Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\KR\Service\Gateway;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Service\Gateway;
use JetBrains\PhpStorm\Pure;
use RuntimeException;
use stdClass;

use function base64_decode;
use function base64_encode;
use function hash_hmac;
use function implode;
use function json_decode;
use function json_encode;
use function mt_rand;
use function number_format;
use function openssl_encrypt;
use function str_pad;
use function strlen;

use const OPENSSL_NO_PADDING;
use const OPENSSL_RAW_DATA;

/**
 * Parent class for multiple redsys gateways
 *
 * @since 3.3.1
 */
class Redsys extends Gateway
{
	const REDSYSLIVEURL = 'https://sis.redsys.es/sis/realizarPago';
	const REDSYSTESTURL = 'https://sis-t.redsys.es:25443/sis/realizarPago';
	/** @var array Form fields */
	protected array $fields = [];

	/**
	 * Initialize
	 *
	 * @param  int       $service_id   ID of service
	 * @param  stdClass  $paymentData  Session payment data
	 *
	 * @throws Exception
	 * @since  3.3.1
	 */
	public function __construct(int $service_id, stdClass $paymentData)
	{
		parent::__construct($service_id, $paymentData);
	}

	/**
	 * Set the gateway data
	 *
	 * @throws Exception
	 * @since        3.3.1
	 * @return stdClass
	 * @noinspection PhpUnused
	 */
	public function setOutputData(): stdClass
	{
		$this->readTables();
		$this->setOutputForPaymentType();

		$return_url     = KrMethods::getBase() . 'index.php?option=com_knowres&task=service.' . $this->service->plugin;
		$rand           = mt_rand(1, 9999);
		$merchant_order = $this->contract->tag . $rand;

		$custom[] = $this->service_id;
		$custom[] = $this->paymentData->contract_id;
		$custom[] = $this->paymentData->payment_type;
		$custom[] = $this->paymentData->base_amount;
		$custom[] = $this->paymentData->rate;
		$custom[] = $this->paymentData->base_surcharge;

		$this->addField('Ds_Merchant_Amount', number_format($this->paymentData->amount * 100, 0, '', ''));
		$this->addField('Ds_Merchant_Currency', '978');
		$this->addField('Ds_Merchant_Order', $merchant_order);
		$this->addField('Ds_Merchant_ProductDescription', $this->paymentData->note);
		$this->addField('Ds_Merchant_MerchantCode', $this->parameters->merchant_code);
		$this->addField('Ds_Merchant_MerchantURL', $return_url . '&action=ipn');
		$this->addField('Ds_Merchant_UrlOK', $return_url . '&action=success');
		$this->addField('Ds_Merchant_UrlKO', $return_url . '&action=cancel');
		$this->addField('Ds_Merchant_MerchantName', $this->parameters->merchant_name);
		$this->addField('Ds_Merchant_ConsumerLanguage', $this->getLanguage($this->guest->country_iso));
		$this->addField('Ds_Merchant_Terminal', $this->parameters->terminal);
		$this->addField('Ds_Merchant_TransactionType', $this->parameters->transaction_type);
		$this->addField('Ds_Merchant_MerchantData', implode('-', $custom));

		$this->paymentData->merchantParameters = $this->encryptMerchantParameters();
		$this->paymentData->merchantSignature  = $this->createMerchantSignature();
		$this->paymentData->url                = (int) $this->parameters->usesandbox ? self::REDSYSTESTURL
			: self::REDSYSLIVEURL;

		return $this->paymentData;
	}

	/**
	 * Set payment data from Redsys response
	 * Can't rely on session for this so have to set all
	 *
	 * @throws Exception
	 * @since  3.3.1
	 * @return stdClass
	 */
	public function setResponseData(): stdClass
	{
		$signature = $this->getReplySignature();
		if ($signature != $this->paymentData->merchantSignature)
		{
			throw new RuntimeException("ERROR - Generated signature $signature and sent signature $this->paymentData->merchantSignature do not match");
		}

		$this->validateResponseData();

		return $this->paymentData;
	}

	/**
	 * Adds a field and value to the 'fields' variable
	 *
	 * @param  string  $field  Field name
	 * @param  string  $value  Field value
	 *
	 * @since 3.3.1
	 */
	protected function addField(string $field, string $value)
	{
		$this->fields["$field"] = $value;
	}

	/**
	 * Base64 url decode
	 *
	 * @param  string  $input  Text to decode
	 *
	 * @since  3.3.1
	 * @return string
	 */
	protected function base64_url_decode(string $input): string
	{
		return base64_decode(strtr($input, '-_', '+/'));
	}

	/**
	 * Base64 url encode
	 *
	 * @param  string  $input  Text to encode
	 *
	 * @since  3.3.1
	 * @return string
	 */
	protected function base64_url_encode(string $input): string
	{
		return strtr(base64_encode($input), '+/', '-_');
	}

	/**
	 * Create merchant signature from input fields and secret key
	 *
	 * @since  3.3.1
	 * @return string
	 */
	protected function createMerchantSignature(): string
	{
		// Decode key base64
		$key = $this->decodeBase64($this->parameters->secret_key);
		// Encrypt POST fields
		$field = $this->encryptMerchantParameters();
		// Encrypt order number
		$key = $this->encrypt_3DES($this->getOrder(), $key);
		// Apply SHA256
		$sha = $this->mac256($field, $key);

		return $this->encodeBase64($sha);
	}

	/**
	 * Base 64 decode
	 *
	 * @param  string  $data  Text to decode
	 *
	 * @since  3.3.1
	 * @return string
	 */
	protected function decodeBase64(string $data): string
	{
		return base64_decode($data);
	}

	/**
	 * Decode JSON string
	 *
	 * @param  string  $data  Json string
	 *
	 * @since  3.3.1
	 * @return string
	 */
	#[Pure] protected function decodeMerchantParameters(string $data): string
	{
		return $this->base64_url_decode($data);
	}

	/**
	 * Base 64 encode
	 *
	 * @param  string  $data  Text to encode
	 *
	 * @since 3.3.1
	 * @return string
	 */
	protected function encodeBase64(string $data): string
	{
		return base64_encode($data);
	}

	/**
	 * Encrypt parameters for POSTing
	 *
	 * @since  3.3.1
	 * @return string
	 */
	protected function encryptMerchantParameters(): string
	{
		$json = json_encode($this->fields);

		return $this->encodeBase64($json);
	}

	/**
	 * 3DES Encryption
	 *
	 * @param  string  $data  Text to encrypt
	 * @param  string  $key   Encryption key
	 *
	 * @since  3.3.1
	 * @return string
	 */
	protected function encrypt_3DES(string $data, string $key): string
	{
		$iv          = "\0\0\0\0\0\0\0\0";
		$data_padded = $data;
		if (strlen($data_padded) % 8)
		{
			$data_padded = str_pad($data_padded, strlen($data_padded) + 8 - strlen($data_padded) % 8, "\0");
		}

		return openssl_encrypt($data_padded, "DES-EDE3-CBC", $key, OPENSSL_RAW_DATA | OPENSSL_NO_PADDING, $iv);
	}

	/**
	 * Set locale
	 *
	 * @param  string  $country_iso  ISO country code
	 *
	 * @since 3.3.1
	 * @return string
	 */
	protected function getLanguage(string $country_iso): string
	{
		return match ($country_iso)
		{
			'FR', 'CH', 'LU', 'BE' => '004',
			'DE', 'AT' => '005',
			'ES', 'MX' => '001',
			'IT' => '007',
			'NL' => '006',
			'PL' => '011',
			'PT' => '009',
			'RU' => '643',
			'SE', 'DK', 'NO' => '008',
			default => '002',
		};
	}

	/**
	 * Retrieve order number from returned fields
	 *
	 * @since 3.3.1
	 * @return string
	 */
	protected function getOrder(): string
	{
		if (empty($this->fields['DS_MERCHANT_ORDER']))
		{
			$order = $this->fields['Ds_Merchant_Order'];
		}
		else
		{
			$order = $this->fields['DS_MERCHANT_ORDER'];
		}

		return $order;
	}

	/**
	 * Retrieve order number from returned fields
	 *
	 * @throws Exception
	 * @since 3.3.1
	 * @return string
	 */
	protected function getReplyOrder(): string
	{
		if (empty($this->fields['DS_ORDER']))
		{
			$order = $this->fields['Ds_Order'];
		}
		else
		{
			$order = $this->fields['DS_ORDER'];
		}

		return $order;
	}

	/**
	 * Create signature from reply fields and secret key
	 *
	 * @throws Exception
	 * @since  3.3.1
	 * @return string
	 */
	protected function getReplySignature(): string
	{
		// Base64 decode key
		$key = $this->decodeBase64($this->parameters->secret_key);
		// Base64 url decode params string
		$fields = $this->decodeMerchantParameters($this->paymentData->merchantParameters);
		// Convert params to array
		$this->fields = $this->stringToArray($fields);

		// Get the order number
		$key = $this->encrypt_3DES($this->getReplyOrder(), $key);

		// SHA256 encrypt
		$res = $this->mac256($this->paymentData->merchantParameters, $key);

		// And finally base64 url encode
		return $this->base64_url_encode($res);
	}

	/**
	 * SHA256 encryption
	 *
	 * @param  string  $data  Text to decode
	 * @param  string  $key   Encryption key
	 *
	 * @since 3.3.1
	 * @return string
	 */
	protected function mac256(string $data, string $key): string
	{
		return hash_hmac('sha256', $data, $key, true);
	}

	/**
	 * Decode JSON string to array
	 *
	 * @param  string  $data  Json string
	 *
	 * @since  3.3.1
	 * @return array
	 */
	protected function stringToArray(string $data): array
	{
		return json_decode($data, true);
	}

	/**
	 * Validate response data
	 *
	 * @throws Exception
	 * @since  3.3.1
	 */
	protected function validateResponseData()
	{
		$this->readContract();
		$response    = (string) $this->fields['Ds_Response'];
		$amount      = (int) $this->fields['Ds_Amount'] / 100;
		$currency    = (int) $this->fields['Ds_Currency'];
		$payment_ref = $this->fields['Ds_Order'];

		if ($response != '0000' && $response != '0099')
		{
			throw new RuntimeException("Unsuccessful Ds_Response received: $response");
		}

		if ($currency != '978')
		{
			throw new RuntimeException("Redsys currency is not 978 (EUR)");
		}

		if ($this->paymentData->payment_type == 'OBD')
		{
			if ($amount * 100 != $this->contract->deposit * 100)
			{
				throw new RuntimeException("Redsys amount $amount does not match with expected amount $this->contract->deposit");
			}
		}

		$this->paymentData->amount      = $amount;
		$this->paymentData->payment_ref = $payment_ref;
		$this->paymentData->currency    = $this->contract->currency;
		$this->paymentData->expiry_date = $this->contract->expiry_date;

		$this->setNote();
	}
}