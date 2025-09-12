<?php
/**
 * @package     Know Reservations (Knowres)
 * @subpackage  Exception Handling
 * @copyright   Copyright (C) 2020 Highland Vision. All rights reserved.
 * @license     See the file LICENSE.txt for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

/** @noinspection PhpPossiblePolymorphicInvocationInspection */

namespace HighlandVision\KR;

use ErrorException;
use Exception;
use InvalidArgumentException;
use Joomla\CMS\Application\CMSApplication;
use Joomla\CMS\Error\AbstractRenderer;
use Joomla\CMS\Factory;
use Throwable;

/**
 * Exception handler for both errors and exceptions
 *
 * @since 3.5.0
 */
class ExceptionHandling
{
	/**
	 * Exceptions constructor.
	 *
	 * @since 3.5.0
	 */
	public function __construct()
	{
		set_exception_handler([$this,
		                       'exceptionHandler']);
		set_error_handler([$this,
		                   'exceptionErrorHandler']);
	}

	/**
	 * Render the error page based on an exception.
	 *
	 * @param  Throwable  $error  An Exception or Throwable (PHP 7+) object for which to render the error page.
	 *
	 * @throws Throwable
	 * @since   3.0
	 * @return  void
	 */
	public static function render(Throwable $error): void
	{
		try {
			$app = Factory::getApplication();

			// Flag if we are on cli
			$isCli = $app->isClient('cli');

			// If site is offline, and it's a 404 error, just go to index (to see offline message, instead of 404)
			if (!$isCli && $error->getCode() == '404' && $app->get('offline') == 1) {
				$app->redirect('index.php');
			}

			/*
			 * Try and determine the format to render the error page in
			 *
			 * First we check if a Document instance was registered to Factory and use the type from that if available
			 * If a type does not exist for a format then try to use the format from the application's Input object
			 * Lastly, if all else fails, we default onto the HTML format to at least render something
			 */
			if (Factory::$document) {
				$format = Factory::$document->getType();
			} else {
				$format = $app->input->getString('format', 'html');
			}

			try {
				$renderer = AbstractRenderer::getRenderer($format);
			} catch (InvalidArgumentException) {
				// Default to the HTML renderer
				$renderer = AbstractRenderer::getRenderer('html');
			}

			// Reset the document object in the factory, this gives us a clean slate and lets everything render properly
			Factory::$document = $renderer->getDocument();
			Factory::getApplication()->loadDocument(Factory::$document);

			$data = $renderer->render($error);

			// If nothing was rendered, just use the message from the Exception
			if (empty($data)) {
				$data = $error->getMessage();
			}

			if ($isCli) {
				echo $data;
			} else {
				/** @var CMSApplication $app */

				// Do not allow cache
				$app->allowCache(false);

				$app->setBody($data);
			}

			// This return is needed to ensure the test suite does not trigger the non-Exception handling below
			return;
		} catch (Throwable $errorRendererError) {
			// Pass the error down
		}

		/*
		 * To reach this point in the code means there was an error creating the error page.
		 *
		 * Let global handler to handle the error, @see bootstrap.php
		 * Here the thing, at this point we have 2 exceptions:
		 * $errorRendererError  - the error caused by error renderer
		 * $error               - the main error
		 *
		 * We need to show both exceptions, without loss of trace information, so use a bit of magic to merge them.
		 *
		 * Use exception nesting feature: rethrow the exceptions, an exception thrown in a finally block
		 * will take unhandled exception as previous.
		 * So PHP will add $error Exception as previous to $errorRendererError Exception to keep full error stack.
		 */
		try {
			throw $error;
		} finally {
			throw $errorRendererError;
		}
	}

	/**
	 * Set override error handler.
	 *
	 * @param  int     $severity  Error severity
	 * @param  string  $message   Error message
	 * @param  string  $file      Filename
	 * @param  int     $line      Line number
	 *
	 * @throws Exception
	 * @since  4.0.0
	 */
	public function exceptionErrorHandler(int $severity, string $message, string $file, int $line = 0): void
	{
		$level = $this->setLevel($severity);
		if ($level !== 'ignore' && $level !== 'warning') {
			Logger::logMe($message, $level);
		}
	}

	/**
	 * Set override exception handler.
	 *
	 * @param  Throwable  $error  Thrown exception
	 *
	 * @throws ExceptionHandling
	 * @throws Exception
	 * @throws Throwable
	 * @since  3.5.0
	 */
	public function exceptionHandler(Throwable $error): void
	{
		$isException = $error instanceof Throwable;
		if ($isException) {
			$class = get_class($error);
			if ($class == 'ErrorException') {
				/* @var ErrorException $error */
				$code  = $error->getSeverity();
				$level = $this->setLevel($code);
			} else {
				$level = 'error';
				$code  = $error->getCode();
				if ($class == 'InvalidArgumentException' || $code == 403 || $code == 404) {
					$level = 'notice';
				}
			}

			new Logger($error->getMessage(), $code, $error->getFile(), $error->getLine(), $level,
				$error->getTraceAsString());

			// static::render($error);
		}
	}

	/**
	 * Set level for log file
	 *
	 * @param  int  $code  Exception code
	 *
	 * @since 3.5.0
	 * @return string
	 */
	protected function setLevel(int $code): string
	{
		$level_xref                      = [];
		$level_xref[E_ERROR]             = 'error';
		$level_xref[E_WARNING]           = 'warning';
		$level_xref[E_PARSE]             = 'parse';
		$level_xref[E_NOTICE]            = 'notice';
		$level_xref[E_CORE_ERROR]        = 'error';
		$level_xref[E_CORE_WARNING]      = 'warning';
		$level_xref[E_COMPILE_ERROR]     = 'parse';
		$level_xref[E_COMPILE_WARNING]   = 'notice';
		$level_xref[E_USER_ERROR]        = 'error';
		$level_xref[E_USER_WARNING]      = 'warning';
		$level_xref[E_USER_NOTICE]       = 'notice';
		$level_xref[E_RECOVERABLE_ERROR] = 'error';
		$level_xref[E_DEPRECATED]        = 'ignore';
		$level_xref[E_USER_DEPRECATED]   = 'ignore';

		return $level_xref[$code] ?? 'error';
	}
}