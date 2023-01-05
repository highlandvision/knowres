<?php
/**
 * @package     Know Reservations
 * @subpackage  Library
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\KR;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Framework\KrMethods;
use JetBrains\PhpStorm\Pure;
use Joomla\CMS\Filesystem\File;

use function basename;
use function count;
use function defined;
use function dirname;
use function file_exists;
use function glob;
use function iconv;
use function is_countable;
use function is_dir;
use function is_writable;
use function mkdir;
use function move_uploaded_file;
use function preg_replace;
use function str_replace;
use function strtolower;
use function trim;
use function unlink;

/**
 * General media functions for images, pdf files etc
 *
 * @since 1.0.0
 */
class Media
{
	/**
	 * Delete pdfs
	 *
	 * @param   string  $type   PDF type, property, region etc
	 * @param   int     $id     ID of type
	 * @param   array   $names  PDF names
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	public static function deletePdfs(string $type, int $id, array $names = []): void
	{
		if (!is_countable($names) || !count($names))
		{
			KrMethods::message(KrMethods::plain('COM_KNOWRES_NO_FILES_SELECTED'));

			return;
		}
		else
		{
			$mrp = self::getPdfLocation() . $type . '/' . $id . '/';
			foreach ($names as $pdf)
			{
				if (file_exists($mrp . $pdf))
				{
					if (is_writable($mrp . $pdf) && !unlink($mrp . $pdf))
					{
						KrMethods::message(KrMethods::sprintf('COM_KNOWRES_ERROR_NO_FILE', $pdf), 'error');

						return;
					}
				}
				else
				{
					KrMethods::message(KrMethods::sprintf('COM_KNOWRES_ERROR_NO_DELETE_FILE', $pdf), 'error');

					return;
				}
			}
		}

		KrMethods::message(KrMethods::plain('COM_KNOWRES_ACTION_SUCCESS'));
	}

	/**
	 * Get file extension
	 *
	 * @param   string  $path  Path
	 *
	 * @since  1.0.0
	 * @return mixed
	 */
	public static function getFileExtension(string $path): mixed
	{
		$path_parts = pathinfo($path);

		return $path_parts['extension'];
	}

	/**
	 * Get file name
	 *
	 * @param   string  $path  Path
	 *
	 * @since 1.0.0
	 * @return array|string
	 */
	public static function getFileName(string $path): array|string
	{
		$path_parts = pathinfo($path);

		return $path_parts['filename'];
	}

	/**
	 * List pdfs folder
	 *
	 * @since  1.0.0
	 * @return string
	 */
	#[Pure] public static function getPdfLocation(): string
	{
		$rootPath = Utility::getPath('root');
		$upOne    = dirname($rootPath);
		$folder   = basename($rootPath);

		return $upOne . '/uploadedpdfs/' . $folder . '/';
	}

	/**
	 * List pdfs  folder
	 *
	 * @param   string  $type  e.g. "property" or "region" etc
	 * @param   int     $id    ID of type
	 *
	 * @since  1.0.0
	 * @return array
	 */
	public static function listPdfs(string $type, int $id): array
	{
		$docs    = [];
		$pdfPath = self::getPdfLocation() . $type . '/' . $id . '/';

		foreach (glob($pdfPath . '*.pdf') as $filename)
		{
			$docs[] = $filename;
		}

		return $docs;
	}

	/**
	 * Upload pdf
	 *
	 * @param   string  $type      e.g. "solo" or "slideshow".
	 * @param   int     $id        ID of item.
	 * @param   string  $pdf       Name of pdf.
	 * @param   string  $filetype  File type.
	 * @param   string  $tmpName   Temporary name.
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	public static function uploadPdf(string $type, int $id, string $pdf, string $filetype, string $tmpName): void
	{
		if (!$pdf)
		{
			KrMethods::message(KrMethods::plain('COM_KNOWRES_NO_FILES_BROWSED'), 'error');

			return;
		}
		if ($filetype != "application/octet" && $filetype != "application/pdf")
		{
			KrMethods::message(KrMethods::sprintf('COM_KNOWRES_ERROR_NOT_PDF', $pdf), 'error');

			return;
		}

		$new      = $pdf;
		$fileExt  = strtolower(File::getExt($new));
		$new      = File::stripExt($new);
		$new      = iconv('UTF-8', 'ASCII//TRANSLIT', $new);
		$new      = iconv('UTF-8', 'ASCII//IGNORE', $new);
		$new      = iconv('CP1252', 'ASCII//TRANSLIT', $new);
		$new      = preg_replace("/[^A-Za-z0-9-_]/", '', str_replace(" ", "-", trim($new)));
		$filename = $new . '.' . $fileExt;

		$destination = self::getPdfLocation() . $type . '/' . $id . '/' . $filename;
		$directory   = self::getPdfLocation() . $type . '/';
		if (!is_dir($directory))
		{
			mkdir($directory);
		}
		$directory = self::getPdfLocation() . $type . '/' . $id . '/';
		if (!is_dir($directory))
		{
			mkdir($directory);
		}

		if (!move_uploaded_file($tmpName, $destination))
		{
			KrMethods::message(KrMethods::sprintf('COM_KNOWRES_ERROR_NO_UPLOAD_FILE', $filename), 'error');
		}
		else
		{
			KrMethods::message(KrMethods::plain('COM_KNOWRES_ACTION_SUCCESS'));
		}
	}
}