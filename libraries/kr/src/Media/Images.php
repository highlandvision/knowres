<?php
/**
 * @package    Know Reservations
 * @subpackage Library
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\KR\Media;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Logger;
use HighlandVision\KR\Media;
use HighlandVision\KR\Utility;
use InvalidArgumentException;
use Joomla\CMS\Filesystem\File;
use Joomla\CMS\Filesystem\Folder;
use Joomla\CMS\Utility\Utility as JUtility;
use Joomla\Registry\Registry;
use RuntimeException;
use Zebra_Image;

use function filesize;
use function in_array;
use function round;
use function strtolower;

use const UPLOAD_ERR_OK;

define('KNOWRES_TEMP_PATH', JPATH_SITE . '/tmp');

/**
 * Knowres property upload helper.
 *
 * @since 1.0.0
 */
class Images extends Media
{
	/** @var array The acceptable image types for upload. */
	protected array $accepted = ['jpeg', 'jpg', 'png', 'gif'];
	/** @var boolean Set to true if uploaded file already exists. */
	protected bool $exists = false;
	/** @var int The id of the entity being uploaded. */
	protected int $id = 0;
	/** @var int The server max upload size. */
	protected int $max_upload = 0;
	/** @var string The name of the uploaded image. */
	protected string $name = '';
	/** @var string The path to the folder to store the original image. */
	protected string $original_path = '';
	/** @var Registry KR params. */
	protected Registry $params;
	/** @var string The path and name for the uploaded image. */
	protected string $tmp_name = '';
	/** @var string The path to the folder for the marker being uploaded. */
	protected string $upload_path;

	/**
	 * Constructor
	 *
	 * @throws InvalidArgumentException
	 * @throws RuntimeException
	 * @since  1.0.0
	 */
	public function __construct()
	{
		$this->checkGDExtension();
		$this->params     = KrMethods::getParams();
		$this->max_upload = JUtility::getMaxUploadSize();

		self::makeFolder(KNOWRES_TEMP_PATH);
	}

	/**
	 * Copy image folder
	 *
	 * @param  int  $old  Source property id
	 * @param  int  $new  Dest property id
	 *
	 * @throws RuntimeException|Exception
	 * @since  3.0.0
	 * @return bool
	 */
	public static function copyPropertyImages(int $old, int $new): bool
	{
		$source = self::getImageAbsPath($old);
		$dest   = self::getImageAbsPath($new);

		if (Folder::exists($source)) {
			return Folder::copy($source, $dest, '', true);
		}

		return true;
	}

	/**
	 * Delete recursively
	 *
	 * @param  string  $dir  Path to directory to be removed
	 *
	 * @since 3.0.0
	 */
	public static function deleteAll(string $dir): void
	{
		if (is_dir($dir)) {
			$objects = scandir($dir);
			foreach ($objects as $object) {
				if ($object != "." && $object != "..") {
					if (filetype($dir . "/" . $object) == "dir") {
						self::deleteAll($dir . "/" . $object);
					}
					else {
						unlink($dir . "/" . $object);
					}
				}
			}

			rmdir($dir);
		}
	}

	/**
	 * Delete image folder
	 *
	 * @param  int  $id  ID of  property
	 *
	 * @throws Exception
	 * @since  3.0.0
	 */
	public static function deletePropertyImages(int $id): void
	{
		$path = self::getImageAbsPath($id);
		if (Folder::exists($path)) {
			self::deleteAll($path);
		}
	}

	/**
	 * Get path to image for display
	 *
	 * @param  int     $property_id  ID of property
	 * @param  string  $type         e.g. "solo" or "slideshow"
	 * @param  string  $image        Image name
	 *
	 * @throws Exception
	 * @since  1.0.0
	 * @return string
	 */
	public static function getImageAbsPath(int $property_id, string $type = '', string $image = ''): string
	{
		$path = self::getPath($property_id, $type, $image);

		return JPATH_ROOT . '/' . implode('/', $path);
	}

	/**
	 * Get path to image for display
	 *
	 * @param  int     $property_id  ID of property
	 * @param  string  $type         e.g. "solo" or "slideshow"
	 * @param  string  $image        Image name\
	 *
	 * @throws Exception
	 * @since  1.0.0
	 * @return string
	 */
	public static function getImagePath(int $property_id, string $type = '', string $image = ''): string
	{
		$path = self::getPath($property_id, $type, $image);

		return implode('/', $path);
	}

	/**
	 * Get link for map category image
	 *
	 * @param  int  $mapcategory_id  ID of map category
	 *
	 * @since   3.2.0
	 * @return  string
	 */
	public static function getMarkerImageLink(int $mapcategory_id): string
	{
		$image = '';
		$link  = '';

		$folders   = [];
		$folders[] = '/images';
		$folders[] = "krmap";
		$folders[] = $mapcategory_id;

		$path  = JPATH_ROOT . '/' . implode('/', $folders);
		$path  .= "/*.{jpg,gif,png,JPG,GIF,PNG}";
		$files = glob($path, GLOB_BRACE);

		if (count($files)) {
			$path_parts = pathinfo($files[0]);
			$image      = $path_parts['filename'] . '.' . $path_parts['extension'];
		}

		if ($image) {
			$folders[] = $image;
			$link      = implode('/', $folders);
		}

		$link .= '#joomlaImage://local-' . $link . '?width=120&height=90';

		return $link;
	}

	/**
	 * Get name of marker image
	 *
	 * @param  int  $mapcategory_id  ID of map category
	 *
	 * @since  3.2.0
	 * @return string
	 */
	public static function getMarkerImageName(int $mapcategory_id): string
	{
		$params    = KrMethods::getParams();
		$folders   = [];
		$folders[] = 'images';
		$folders[] = $params->get('image_path', 'krgallery');
		$folders[] = "mm" . $mapcategory_id;

		$path  = JPATH_ROOT . "/" . implode("/", $folders);
		$path  .= "/*.{jpg,gif,png,JPG,GIF,PNG}";
		$files = glob($path, GLOB_BRACE);

		if (count($files)) {
			$path_parts = pathinfo($files[0]);

			return $path_parts['filename'] . "." . $path_parts['extension'];
		}

		return '';
	}

	/**
	 * Get path to image folder or image
	 *
	 * @param  int     $property_id  ID of property
	 * @param  string  $type         e.g. "solo" or "slideshow"
	 * @param  string  $image        Image name
	 *
	 * @throws Exception
	 * @since  2.4.0
	 * @return  array
	 */
	public static function getPath(int $property_id, string $type = '', string $image = ''): array
	{
		$params = KrMethods::getParams();
		$path   = [];
		$path[] = 'images';
		$path[] = $params->get('image_path', 'krgallery');

		if ($params->get('image_folder')) {
			$property = KrFactory::getAdminModel('property')->getItem($property_id);
			$folder   = Utility::makeFolderName($property->property_name);
		}
		else {
			$folder = $property_id;
		}

		$path[] = $folder;

		if ($type) {
			$path[] = $type;
		}

		if ($image) {
			$path[] = $image;
		}

		return $path;
	}

	/**
	 * Get link for property image
	 *
	 * @param  int  $property_id  ID of property
	 *
	 * @throws Exception
	 * @since  1.0.0
	 * @return string
	 */
	public static function getPropertyImageLink(int $property_id): string
	{
		$link  = '';
		$image = '';
		$path  = self::getImageAbsPath($property_id, 'solo');
		$path  .= "/*.{jpg,gif,png,JPG,GIF,PNG}";
		$files = glob($path, GLOB_BRACE);

		if (count($files)) {
			$path_parts = pathinfo($files[0]);
			$image      = $path_parts['filename'] . '.' . $path_parts['extension'];
		}

		if ($image) {
			$link = self::getImagePath($property_id, 'solo', $image);
		}

		return $link;
	}

	/**
	 * Get name of property image
	 *
	 * @param  int  $property_id  ID of property
	 *
	 * @throws Exception
	 * @since  1.0.0
	 * @return string
	 */
	public static function getPropertyImageName(int $property_id): string
	{
		$soloPath = self::getImageAbsPath($property_id, 'solo');
		$soloPath .= "/*.{jpg,gif,png,JPG,GIF,PNG}";
		$files    = glob($soloPath, GLOB_BRACE);

		if (count($files)) {
			$path_parts = pathinfo($files[0]);

			return $path_parts['filename'] . '.' . $path_parts['extension'];
		}

		return '';
	}

	/**
	 * Make property and image folders if they do not exist
	 *
	 * @param  string  $folder_path  Path of folder
	 *
	 * @throws RuntimeException
	 * @since 1.0.0
	 */
	public static function makeFolder(string $folder_path): void
	{
		if (Folder::exists($folder_path)) {
			return;
		}

		if (!Folder::create($folder_path)) {
			throw new RuntimeException($folder_path . ' ' . KrMethods::plain('FOLDER_CREATE_ERROR'));
		}
	}

	/**
	 * Resize and crop images as required
	 *
	 * @param  string  $source   Source file path
	 * @param  string  $target   Target file path
	 * @param  int     $width    Required width
	 * @param  int     $height   Required height
	 * @param  int     $quality  Quality
	 * @param  int     $crop     1 to crop image
	 *
	 * @throws RuntimeException
	 * @since  1.0.0
	 */
	public static function resizeImage(string $source,
	                                   string $target,
	                                   int    $width,
	                                   int    $height,
	                                   int    $quality = 80,
	                                   int    $crop = 0): void
	{
		if ($crop && $width == 0 && $height == 0) {
			throw new RuntimeException(KrMethods::plain('Width or height must be provided'));
		}
		else if ($width == 0 && $height == 0) {
			throw new RuntimeException(KrMethods::plain('Width and height must be provided'));
		}

		$ZebraImage                         = new Zebra_Image();
		$ZebraImage->source_path            = $source;
		$ZebraImage->target_path            = $target;
		$ZebraImage->jpeg_quality           = $quality;
		$ZebraImage->sharpen_images         = true;
		$ZebraImage->enlarge_smaller_images = true;
		$ZebraImage->preserve_time          = true;

		if ($crop) {
			$ZebraImage->preserve_aspect_ratio = true;
			$result                            = $ZebraImage->resize($width, $height);
		}
		else {
			$ZebraImage->preserve_aspect_ratio = false;
			$result                            = $ZebraImage->resize($width, $height, ZEBRA_IMAGE_BOXED);
		}

		if (!$result) {
			switch ($ZebraImage->error) {
				case 1:
					throw new RuntimeException($source . ' Source could not be found!');
				case 2:
					throw new RuntimeException($source . ' Source is not readable!');
				case 3:
					throw new RuntimeException($source . ' Could not write target file!');
				case 4:
					throw new RuntimeException($source . ' Unsupported source file format!');
				case 5:
					throw new RuntimeException($target . ' Unsupported target file format!');
				case 6:
					throw new RuntimeException($target . ' GD library version does not support target file format!');
				case 7:
					throw new RuntimeException('GD library is not installed!');
			}
		}
	}

	/**
	 * Return true if file already existed
	 *
	 * @since 1.0.0
	 * @return bool
	 */
	public function getExists(): bool
	{
		return $this->exists;
	}

	/**
	 *  Set exists to true if file already in folder
	 *
	 * @param  string  $file  Name of file
	 *
	 * @since 1.0.0
	 */
	protected function setExists(string $file): void
	{
		if (File::exists($file)) {
			$this->exists = true;
		}
	}

	/**
	 * Return true if file already existed
	 *
	 * @since  4.0.0
	 * @return string
	 */
	public function getname(): string
	{
		return $this->name;
	}

	/**
	 * Validate uploaded file
	 *
	 * @param  string  $name      File name
	 * @param  string  $tmp_name  Temporary path and name
	 * @param  int     $error     Upload error code
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	public function validate(string $name, string $tmp_name, int $error): void
	{
		$this->name     = $this->replaceSpecial($name);
		$this->tmp_name = $tmp_name;

		if ($error !== UPLOAD_ERR_OK) {
			$this->checkUploadError($error);
			throw new RuntimeException(KrMethods::plain('COM_KNOWRES_ERROR_TRY_AGAIN_CHECK'));
		}

		$this->checkMaxFilesize();
		$this->validateExtension();
		$this->checkIsImage();
	}

	/**
	 * Check that GD extension is compiled
	 *
	 * @throws InvalidArgumentException
	 * @since  1.0.0
	 */
	protected function checkGDExtension(): void
	{
		if (!extension_loaded('gd') && !function_exists('gd_info')) {
			throw new InvalidArgumentException('Please Check the PHP extension "GD Image Library" is installed on this server');
		}
	}

	/**
	 * Check that uploaded file is an image
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	protected function checkIsImage(): void
	{
		$info = getimagesize($this->tmp_name);
		if (!is_int($info[0]) || !is_int($info[1])) {
			Logger::logMe(KrMethods::plain('No width or height detected in image file'));
			throw new RuntimeException(KrMethods::plain($this->name . ' is not a valid image'));
		}
	}

	/**
	 * Check that max filesize is not exceeded
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	protected function checkMaxFilesize(): void
	{
		$file_size = filesize($this->tmp_name);

		if ($file_size > $this->max_upload) {
			$error =
				KrMethods::plain($this->name . ' exceeds server upload max size of ' . $this->max_upload . ' bytes');
			throw new RuntimeException($error);
		}

		$max_upload_size = $this->params->get('max_upload_size', 4) * 1000000;
		if ($max_upload_size < $file_size) {
			$message = $this->name . ': ' . round($file_size / 1000000, 2) . 'MB '
				. KrMethods::plain('Maximum Allowed Size')
				. ': ' . $max_upload_size / 1000000 . 'MB - ';

			Logger::logme($message);
			throw new RuntimeException(KrMethods::plain($this->name . ' is too large please upload a smaller image'));
		}
	}

	//	/**
	//	 * Move file to another directory
	//	 *
	//	 * @param  string  $tmp_path   Temporary path
	//	 * @param  string  $dest_dir   Destination directory
	//	 *
	//	 * @since 1.0.0
	//	 * @return bool
	//	 */
	//	protected function moveFile(string $tmp_path, string $dest_dir): bool
	//	{
	//		$dest_path = $dest_dir . '/' . $this->name;
	//		if (!File::upload($tmp_path, $dest_path))
	//		{
	//			$this->raiseError($tmp_path . ' -> ' . $dest_path . ' ' . KrMethods::plain('Error Moving File To Directory'),
	//				$refresh);
	//
	//			return false;
	//		}
	//
	//		return true;
	//	}

	/**
	 * Set exception messages
	 *
	 * @param  int  $error  Upload error
	 *
	 * @throws Exception
	 * @since 1.0.0
	 */
	protected function checkUploadError(int $error): void
	{
		$message = match ($error) {
			1       => 'The uploaded file exceeds the upload_max_filesize directive in php.ini',
			2       => 'The uploaded file exceeds the MAX_FILE_SIZE directive that was specified in the HTML form',
			3       => 'The uploaded file was only partially uploaded',
			4       => 'No file was uploaded',
			6       => 'Server is missing a temporary upload folder',
			7       => 'Failed to write file to phps temp upload folder, this may be a problem with your disk space limit',
			8       => 'A PHP extension stopped the file upload',
			default => 'Upload Error Code: ' . $error,
		};

		Logger::logMe($this->name . ' ' . $message);
	}

	//	/**
	//	 * Resize and save original image
	//	 *
	//	 * @param  string   $fileName
	//	 * @param  string   $pathName
	//	 * @param           $width
	//	 * @param           $height
	//	 * @param           $quality
	//	 * @param           $crop
	//	 * @param  string   $type  Inage type
	//	 * @param  bool     $refresh
	//	 * @param  bool     $sharpen
	//	 *
	//	 * @since 1.0.0
	//	 * @return bool
	//	 */
	//	protected function originalToResized(string $fileName, string $pathName, $width, $height, $quality,
	//		$crop, string $type, bool $refresh = true, bool $sharpen = false): bool
	//	{
	//		$sourceFile = $this->original_path . $fileName;
	//		$destFile   = $pathName . $fileName;
	//
	//		$this->setExists($destFile);
	//
	//		if ($type == 'solo')
	//		{
	//			// Delete the old image
	//			$path  = $this->solo_path . "/*.{jpg,gif,png,JPG,GIF,PNG}";
	//			$files = glob($path, GLOB_BRACE);
	//
	//			foreach ($files as $file)
	//			{
	//				unlink($file);
	//			}
	//		}
	//
	//		$this->resizeImage($sourceFile, $destFile, $width, $height, $quality, $crop);
	//		$imgSize = getimagesize($destFile);
	//		if (empty($imgSize[0]) || empty($imgSize[1]))
	//		{
	//			$this->raiseError('Error: the image dimensions of the file ' . $destFile
	//				. ' cannot be read, please delete and re-upload this image.',
	//				$refresh);
	//
	//			return true;
	//		}
	//
	//		return true;
	//	}

	/**
	 * Replace non-acceptable characters in file name
	 *
	 * @param  string  $name  The raw file name;
	 *
	 * @since  1.0.0
	 */
	protected function replaceSpecial(string $name): string
	{
		$extension = strtolower(File::getExt($name));
		$name      = preg_replace('/[^A-Za-z\d.]/', '_', File::stripExt($name));

		return $name . '.' . $extension;
	}

	/**
	 * Set ID of item being uploaded
	 *
	 * @param  int  $id  ID of image
	 *
	 * @throws InvalidArgumentException
	 * @since  1.0.0
	 * @return void
	 */
	protected function setId(int $id): void
	{
		if (!$id) {
			throw new InvalidArgumentException('$id should consist of numbers only and should not be zero');
		}

		$this->id = $id;
	}

	/**
	 * Validate that the file extension is valid
	 *
	 * @throws RuntimeException
	 * @since  1.0.0
	 */
	protected function validateExtension(): void
	{
		$extension = File::getExt($this->name);
		if (!in_array($extension, $this->accepted)) {
			if (empty($extension)) {
				$message = $this->name . ' ' . KrMethods::plain('the uploaded file had no extension');
			}
			else {
				$message = $this->name . ' ' . KrMethods::plain('Invalid extension');
			}

			throw new RuntimeException($message);
		}
	}
}