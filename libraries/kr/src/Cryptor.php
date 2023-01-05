<?php

namespace HighlandVision\KR;

use Exception;

use function explode;

/**
 * Simple example of using the openssl encrypt/decrypt functions that
 * are inadequately documented in the PHP manual.
 * Available under the MIT License
 *
 * @since     2.5.0
 * @copyright 2016 ionCube Ltd.
 *            Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
 *            documentation files (the "Software"), to deal in the Software without restriction, including without limitation the
 *            rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
 *            permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *            The above copyright notice and this permission notice shall be included in all copies or substantial portions of
 *            the Software.
 *            THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO
 *            THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS
 *            OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT
 *            OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 * @license   The MIT License (MIT)
 */
class Cryptor
{
	const ENCRYPTION_KEY = 'Ln5D!3&z*m!SHPX6?S9DqdKU7bwG#C';
	const FORMAT_B64     = 1;
	const FORMAT_HEX     = 2;
	const FORMAT_RAW     = 0;
	protected string $cipher_algo;
	protected int $format;
	protected string $hash_algo;
	protected int|false $iv_num_bytes;

	/**
	 * Construct a Cryptor, using aes256 encryption, sha256 key hashing and base64 encoding.
	 *
	 * @param   string  $cipher_algo  The cipher algorithm.
	 * @param   string  $hash_algo    Key hashing algorithm.
	 * @param   int     $fmt
	 *
	 * @throws Exception
	 * @since    2.5.0
	 * @internal param $ [type] $fmt         Format of the encrypted data.
	 */
	public function __construct(string $cipher_algo = 'aes-256-ctr', string $hash_algo = 'sha256',
		int $fmt = Cryptor::FORMAT_B64
	) {
		$this->cipher_algo = $cipher_algo;
		$this->hash_algo   = $hash_algo;
		$this->format      = $fmt;

		if (!in_array($cipher_algo, openssl_get_cipher_methods(true)))
		{
			throw new Exception("Cryptor:: - unknown cipher algo $cipher_algo");
		}

		if (!in_array($hash_algo, openssl_get_md_methods(true)))
		{
			throw new Exception("Cryptor:: - unknown hash algo $hash_algo");
		}

		$this->iv_num_bytes = openssl_cipher_iv_length($cipher_algo);
	}

	/**
	 * Decrypting.
	 *
	 * @param   string  $in   String to decrypt.
	 * @param   mixed   $key  Optional Decryption key. Will be replaced by constant if null
	 * @param   mixed   $fmt  Optional override for the input encoding. One of FORMAT_RAW, FORMAT_B64 or FORMAT_HEX.
	 *
	 * @throws Exception
	 * @since  2.5.0
	 * @return false|array  The decrypted string parts ($contract_id, $guest_id, $qkey, $view).
	 */
	public static function decrypt(string $in, mixed $key = null, mixed $fmt = null): false|array
	{
		$c    = new Cryptor();
		$hash = $c->decryptString($in, $key, $fmt);

		$data = explode('||', $hash);
		if (!is_countable($data) || count($data) != 4)
		{
			return [0, 0, '', ''];
		}

		return [(int) $data[0], (int) $data[1], $data[2], $data[3]];
	}

	/**
	 * Static convenience method for encrypting.
	 *
	 * @param   string  $in   String to encrypt.
	 * @param   mixed   $key  Optional Decryption key. Will be replaced by constant if null
	 * @param   mixed   $fmt  Optional override for the output encoding. One of FORMAT_RAW, FORMAT_B64 or FORMAT_HEX.
	 *
	 * @throws Exception
	 * @since  2.5.0
	 * @return string  The encrypted string.
	 */
	public static function encrypt(string $in, mixed $key = null, mixed $fmt = null): string
	{
		$c = new Cryptor();

		return $c->encryptString($in, $key, $fmt);
	}

	/**
	 * Generate a random sring
	 *
	 * @param   int  $length  Length of string
	 *
	 * @since   1.0.0
	 * @return string
	 */
	public static function generateRandomString(int $length = 8): string
	{
		$characters   = '23456789abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ';
		$randomString = '';

		for ($i = 0; $i < $length; $i++)
		{
			$randomString .= $characters[rand(0, strlen($characters) - 1)];
		}

		return $randomString;
	}

	/**
	 * Create the hash string.
	 *
	 * @param   mixed  $key1  Hash key 1.
	 * @param   mixed  $key2  Hash key 2.
	 * @param   mixed  $key3  Hash key 3.
	 * @param   mixed  $key4  Hash key 4.
	 *
	 * @since  4.0.0
	 * @return string
	 */
	public static function setHash(mixed $key1, mixed $key2, mixed $key3, mixed $key4 = 'dashboard'): string
	{
		return $key1 . '||' . $key2 . '||' . $key3 . '||' . $key4;
	}

	/**
	 * Decrypt a string.
	 *
	 * @param   string  $in   String to decrypt.
	 * @param   mixed   $key  Decryption key.
	 * @param   mixed   $fmt  Optional override for the input encoding. One of FORMAT_RAW, FORMAT_B64 or FORMAT_HEX.
	 *
	 * @throws Exception
	 * @since  2.5.0
	 * @return string The decrypted string.
	 */
	public function decryptString(string $in, mixed $key = null, mixed $fmt = null): string
	{
		if ($key == null)
		{
			$key = Cryptor::ENCRYPTION_KEY;
		}
		if ($fmt === null)
		{
			$fmt = $this->format;
		}

		$raw = $in;

		// Restore the encrypted data if encoded
		if ($fmt == Cryptor::FORMAT_B64)
		{
			$raw = base64_decode(strtr($in, '-_', '+/'));
		}
		else if ($fmt == Cryptor::FORMAT_HEX)
		{
			$raw = pack('H*', $in);
		}

		// and do an integrity check on the size.
		if (strlen($raw) < $this->iv_num_bytes)
		{
			throw new Exception('Cryptor::decryptString() - ' . 'data length ' . strlen($raw)
				. " is less than iv length $this->iv_num_bytes");
		}

		// Extract the initialisation vector and encrypted data
		$iv  = substr($raw, 0, $this->iv_num_bytes);
		$raw = substr($raw, $this->iv_num_bytes);

		// Hash the key
		$keyhash = openssl_digest($key, $this->hash_algo, true);

		// and decrypt.
		$opts = OPENSSL_RAW_DATA;
		$res  = openssl_decrypt($raw, $this->cipher_algo, $keyhash, $opts, $iv);

		if ($res === false)
		{
			throw new Exception('Cryptor::decryptString - decryption failed: ' . openssl_error_string());
		}

		return $res;
	}

	/**
	 * Encrypt a string.
	 *
	 * @param   string  $in   String to encrypt.
	 * @param   mixed   $key  Encryption key.
	 * @param   mixed   $fmt  Optional override for the output encoding. One of FORMAT_RAW, FORMAT_B64 or FORMAT_HEX.
	 *
	 * @throws Exception
	 * @since  2.5.0
	 * @return string The encrypted string.
	 */
	public function encryptString(string $in, mixed $key = null, mixed $fmt = null): string
	{
		if ($key == null)
		{
			$key = Cryptor::ENCRYPTION_KEY;
		}

		if ($fmt === null)
		{
			$fmt = $this->format;
		}

		// Build an initialisation vector
		//		$iv = mcrypt_create_iv($this->iv_num_bytes, MCRYPT_DEV_URANDOM);
		$iv = openssl_random_pseudo_bytes($this->iv_num_bytes);

		// Hash the key
		$keyhash = openssl_digest($key, $this->hash_algo, true);

		// and encrypt
		$opts      = OPENSSL_RAW_DATA;
		$encrypted = openssl_encrypt($in, $this->cipher_algo, $keyhash, $opts, $iv);
		if ($encrypted === false)
		{
			throw new Exception('Cryptor::encryptString() - Encryption failed: ' . openssl_error_string());
		}

		// The result comprises the IV and encrypted data
		$res = $iv . $encrypted;

		// and format the result if required.
		if ($fmt == Cryptor::FORMAT_B64)
		{
			$res = strtr(base64_encode($res), '+/', '-_');
		}
		else if ($fmt == Cryptor::FORMAT_HEX)
		{
			$res = unpack('H*', $res)[1];
		}

		return $res;
	}
}