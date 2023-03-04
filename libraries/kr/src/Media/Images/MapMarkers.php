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
use HighlandVision\KR\Media\Images;
use InvalidArgumentException;
use Joomla\CMS\Filesystem\File;

use function glob;
use function unlink;

use const GLOB_BRACE;

define('KNOWRES_MARKER_IMAGE_WIDTH', 200);
define('KNOWRES_MARKER_IMAGE_HEIGHT', 150);

/**
 * Media map marker image upload.
 *
 * @since 3.2.0
 */
class MapMarkers extends Images
{
	/**
	 * Constructor
	 *
	 * @param  int  $marker_id  ID of marker
	 *
	 * @throws InvalidArgumentException
	 * @since  1.0.0
	 */
	public function __construct(int $marker_id)
	{
		parent::__construct();

		$this->setId($marker_id);
		$this->setPaths();
		$this->setFolders();
	}

	/**
	 * Delete image from folders
	 *
	 * @since 1.0.0
	 */
	public function deleteImage()
	{
		$path = $this->upload_path . $this->name;
		File::delete($path);
	}

	/**
	 * Process the original uploaded file
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	public function process()
	{
		$this->deleteExisting();
		$this->resize();
	}

	/**
	 * Resize original uploaded image
	 *
	 * @since 4.0.0
	 */
	public function resize()
	{
		$source  = $this->tmp_name;
		$target  = $this->upload_path . $this->name;
		$quality = $this->params->get('max_upload_quality');

		self::resizeImage($source, $target, KNOWRES_MARKER_IMAGE_WIDTH, KNOWRES_MARKER_IMAGE_HEIGHT, $quality);
	}

	/**
	 * Delete any images in upload path
	 *
	 * @since  4.0.0
	 */
	protected function deleteExisting()
	{
		$path  = $this->upload_path . "*.{jpg,gif,png,JPG,GIF,PNG}";
		$files = glob($path, GLOB_BRACE);
		foreach ($files as $file)
		{
			unlink($file);
		}
	}

	/**
	 * Set the upload folder names
	 *
	 * @since  4.0.0
	 */
	protected function setFolders()
	{
		self::makeFolder($this->upload_path);
	}

	/**
	 * Set paths to the property image folders
	 *
	 * @since 1.0.0
	 */
	protected function setPaths()
	{
		$path   = [];
		$path[] = 'images';
		$path[] = 'krmap';
		$path[] = (string) $this->id;

		$this->upload_path = JPATH_SITE . '/' . implode('/', $path) . "/";
	}
}