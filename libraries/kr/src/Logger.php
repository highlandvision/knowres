<?php /** @noinspection ALL */

/**
 * @package     Know Reservations (Knowres)
 * @subpackage  Exception Handling
 * @copyright   Copyright (C) 2020 Highland Vision. All rights reserved.
 * @license     See the file LICENSE.txt for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\KR;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Framework\KrMethods;

use function in_array;

/**
 * Write to log and send emails for errors and exceptions
 *
 * @since 1.0.0
 */
class Logger
{
	const ERROR   = 'error';
	const NOTICE  = 'notice';
	const PARSE   = 'parse';
	const WARNING = 'warning';
	/** @var array Defined email levels */
	static protected array $emailLevel
		= [self::ERROR,
		   self::WARNING,
		   self::PARSE];
	/** @var array Defined logging level */
	static protected array $logLevel
		= [self::ERROR,
		   self::WARNING,
		   self::PARSE,
		   self::NOTICE];

	/**
	 * Default and set entered params
	 *
	 * @param  string   $message  Logging message
	 * @param  int      $code     Logging code
	 * @param  string   $file     Logging file
	 * @param  int      $line     Logging line
	 * @param  string   $level    Error level
	 * @param  ?string  $trace    Trace
	 *
	 * @throws Exception
	 * @since  3.3.0
	 */
	public function __construct(string $message, int $code, string $file, int $line, string $level = 'notice',
		?string $trace = '')
	{
		if (!in_array($level, self::$logLevel) && !in_array($level, self::$emailLevel))
		{
			return;
		}

		$params = self::setParams($message, $code, $file, $line, $level, $trace);
		self::logToFile($params);
		self::sendEmail($params);
	}

	/**
	 * Standalone log message only
	 *
	 * @param  string  $message  Error message
	 * @param  string  $level    Error level
	 *
	 * @since  3.3.0
	 */
	public static function logMe(string $message, string $level = 'notice'): void
	{
		if (!in_array($level, self::$logLevel) && !in_array($level, self::$emailLevel))
		{
			return;
		}

		$params = self::setParams($message, 1024, '', 0, $level, (new Exception)->getTraceAsString());
		self::logToFile($params);
		self::sendEmail($params);
	}

	/**
	 * Log error to file
	 *
	 * @param array  $params  Data for log
	 *
	 * @since 3.4.0
	 */
	protected static function logToFile(array $params): void
	{
		if (!in_array($params['level'], self::$logLevel))
		{
			return;
		}

		$file_path = KrMethods::getCfg('log_path') . '/' . $params['option'] . '/' . $params['today'];

		$options = ['text_file_path' => $file_path,
		            'text_file'      => $params['level'] . '.php'
		];

		KrMethods::addLogLogger($options, array($params['option']));
		$message = $params['message'] . "\r\n" . $params['trace'];
		KrMethods::addLog($message, $params['code'], $params['option'], $params['ts'], $options);
	}

	/**
	 * Send emails if required, avoiding an endless loop if mailer fails
	 *
	 * @param  array  $params  Data for logging
	 *
	 * @since 3.4.0
	 */
	protected static function sendEmail(array $params): void
	{
		if (str_contains($_SERVER['SERVER_NAME'], '.test'))
		{
			return;
		}

		if (!in_array($params['level'], self::$emailLevel))
		{
			return;
		}

		try
		{
			$subject = KrMethods::sprintf('COM_KNOWRES_ERROR_EMAIL_SUBJECT', KrMethods::getCfg('sitename'));
			$body    = 'An error occurred in your website at ' . $params['ts'] . ' that may require your attention.';
			$body    .= "\r\n\r\n";
			$body    .= $params['message'];
			$body    .= $params['file'] ? ' in ' . $params['file'] : '';
			$body    .= $params['line'] ? ' at ' . $params['line'] : '';

			KrMethods::sendEmail(KrMethods::getCfg('mailfrom'), KrMethods::getCfg('fromname'),
				KrMethods::getCfg('mailfrom'), $subject, $body, false);
		}
		catch (Exception)
		{
			return;
		}
	}

	/**
	 * Default and set entered params
	 *
	 * @param  string  $message  Logging message
	 * @param  int     $code     Logging code
	 * @param  string  $file     Logging file
	 * @param  int     $line     Logging line
	 * @param  string  $level    Error level
	 * @param  string  $trace    Trace report
	 *
	 * @since  3.3.0
	 * @return array
	 */
	protected static function setParams(string $message, int $code, string $file, int $line = 0,
		string $level = 'notice', string $trace = ''): array
	{
		$message .= $file ? ' in ' . $file : '';
		$message .= $line > 0 ? ' at line ' . $line : '';

		try
		{
			$today = TickTock::getDate();
		}
		catch (Exception)
		{
			$today = 'unknown';
		}
		try
		{
			$ts = TickTock::getTs();
		}
		catch (Exception)
		{
			$ts = 'unknown';
		}

		try
		{
			return ['option'  => 'com_knowres',
			        'message' => $message,
			        'code'    => $code,
			        'file'    => $file,
			        'line'    => $line,
			        'level'   => $level,
			        'trace'   => $trace,
			        'ts'      => $ts,
			        'today'   => $today
			];
		}
		catch (Exception $e)
		{
			return ['option'  => 'com_knowres',
			        'message' => $message,
			        'code'    => $code,
			        'file'    => $file,
			        'line'    => $line,
			        'level'   => $level,
			        'trace'   => $trace,
			        'ts'      => '',
			        'today'   => $today
			];
		}
	}
}