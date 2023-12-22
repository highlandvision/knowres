<?php
/**
 * @package    Know Reservations
 * @subpackage Library
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\KR\Media\Images;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Media\Images;
use HighlandVision\KR\Utility;
use InvalidArgumentException;
use Joomla\CMS\Filesystem\File;
use RuntimeException;

use function glob;
use function implode;
use function move_uploaded_file;
use function unlink;

use const GLOB_BRACE;

/**
 * Media properties image upload.
 *
 * @since 1.0.0
 */
class Property extends Images
{
	/** @var  string Property name */
	protected string $property_name = '';
	/** @var  string Path to the folder to store the main property image */
	protected string $solo_path = '';
	/** @var string  Path to the folder to store the thumb image */
	protected string $thumb_path = '';
	/** @var  string Type being uploaded - slideshow or property */
	protected string $type = '';

	/**
	 * Constructor
	 *
	 * @param  int     $property_id  ID of property
	 * @param  string  $type         slideshow or solo
	 *
	 * @throws InvalidArgumentException|Exception
	 * @since  1.0.0
	 */
	public function __construct(int $property_id, string $type = 'slideshow')
	{
		parent::__construct();

		$this->setId($property_id);
		$this->setType($type);
		$this->setPaths();
		$this->setFolders();
	}

	/**
	 * Delete image from folders
	 *
	 * @param  string  $name  Name of file
	 *
	 * @since 1.0.0
	 */
	public function deleteImage(string $name): void
	{
		$path = $this->original_path . $name;
		File::delete($path);

		$path = $this->thumb_path . $name;
		File::delete($path);

		$path = $this->upload_path . $name;
		File::delete($path);
	}

	/**
	 * Resize thumb and main images from original uploaded image
	 *
	 * @throws Exception
	 * @since  4.0.0
	 */
	public function resize(): void
	{
		$quality = $this->params->get('max_upload_quality');
		$source  = $this->original_path . $this->name;

		if ($this->type == 'slideshow')
		{
			$target = $this->upload_path . $this->name;
			$width  = $this->params->get('max_slideshow_width');
			$height = $this->params->get('max_slideshow_height');
			self::resizeImage($source, $target, $width, $height, $quality);

			$target = $this->thumb_path . $this->name;
			$width  = $this->params->get('max_slideshow_thumb_width');
			$height = $this->params->get('max_slideshow_thumb_height');
		}
		else
		{
			$target = $this->solo_path . $this->name;
			$width  = $this->params->get('max_property_width');
			$height = $this->params->get('max_property_height');
		}

		self::resizeImage($source, $target, $width, $height, $quality);
	}

	/**
	 * Delete any images in upload path
	 *
	 * @since  4.0.0
	 */
	protected function deleteExisting(): void
	{
		$path = $this->upload_path . "*.{jpg,gif,png,JPG,GIF,PNG}";
		if ($this->type == 'solo')
		{
			$path = $this->solo_path . "*.{jpg,gif,png,JPG,GIF,PNG}";
		}
		$files = glob($path, GLOB_BRACE);
		foreach ($files as $file)
		{
			unlink($file);
		}
	}

	/**
	 * Process the original uploaded file
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	public function process(): void
	{
		$this->deleteExisting();
		$this->resize();
	}

	/**
	 * Process the original uploaded file
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	public function processOriginal(): void
	{
		//TODO-v4.3 needs additional validation for max server size
		if (!move_uploaded_file($this->tmp_name, $this->original_path . $this->name))
		{
			//TODO-v4.3 check that this displays try again message
			throw new RuntimeException(KrMethods::plain("Uploaded file $this->name could not be moved"));
		}
	}

	/**
	 * Set type
	 *
	 * @param $type
	 *
	 * @throws InvalidArgumentException
	 * @since  1.0.0
	 * @return void
	 */
	public function setType($type): void
	{
		if ($type != 'slideshow' && $type != 'solo')
		{
			throw new InvalidArgumentException('$type must be entered and contain slideshow or solo');
		}

		$this->type = $type;
	}

	/**
	 * Set the upload folder names
	 *
	 * @throws RuntimeException
	 * @since  4.0.0
	 */
	protected function setFolders(): void
	{
		self::makeFolder($this->upload_path);
		self::makeFolder($this->original_path);
		self::makeFolder($this->thumb_path);
		self::makeFolder($this->solo_path);
	}

	/**
	 * Set ID of item being uploaded
	 *
	 * @param $id
	 *
	 * @throws InvalidArgumentException|Exception
	 * @since  1.0.0
	 * @return void
	 */
	protected function setId($id): void
	{
		if (!is_numeric($id) || !$id)
		{
			throw new InvalidArgumentException('$id should consist of numbers only and should not be zero');
		}

		$this->id            = $id;
		$property            = KrFactory::getAdminModel('property')->getItem($this->id);
		$this->property_name = $property->property_name;
	}

	/**
	 * Set paths to the property image folders
	 *
	 * @since 1.0.0
	 */
	protected function setPaths(): void
	{
		$path   = [];
		$path[] = 'images';
		$path[] = $this->params->get('image_path', 'krgallery');

		if ($this->params->get('image_folder'))
		{
			$folder = Utility::makeFolderName($this->property_name);
		}
		else
		{
			$folder = $this->id;
		}

		$path[] = $folder;

		$this->upload_path   = JPATH_SITE . '/' . implode('/', $path) . '/';
		$this->original_path = $this->upload_path . 'original/';
		$this->thumb_path    = $this->upload_path . 'thumb/';
		$this->solo_path     = $this->upload_path . 'solo/';
	}
}