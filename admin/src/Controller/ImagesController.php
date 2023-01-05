<?php
/**
 * @package    Know Reservations
 * @subpackage Admin Controllers
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Administrator\Controller;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\Component\Knowres\Administrator\Model\ImageModel;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Logger;
use HighlandVision\KR\Media\Images;
use JetBrains\PhpStorm\NoReturn;
use Joomla\CMS\MVC\Controller\AdminController;
use Joomla\CMS\MVC\Model\BaseDatabaseModel;
use Joomla\CMS\Response\JsonResponse;
use RuntimeException;

use function header;
use function http_response_code;
use function jexit;

/**
 * Images controller list class.
 *
 * @since 1.0.0
 */
class ImagesController extends AdminController
{
	/**
	 * Proxy for getModel.
	 *
	 * @param   string  $name    Model name
	 * @param   string  $prefix  Model prefix administrator or site (defaults to administrator)
	 * @param   array   $config  Configuration options
	 *
	 * @since  1.6
	 * @return bool|BaseDatabaseModel
	 */
	public function getModel($name = 'image', $prefix = 'Administrator',
		$config = ['ignore_request' => true]): BaseDatabaseModel|bool
	{
		return parent::getModel($name, $prefix, $config);
	}

	/**
	 * Ajax task to store image ordering
	 *
	 * @throws Exception
	 * @since  1.0.0
	 * @return bool
	 */
	public function ordering(): bool
	{
		$order = KrMethods::inputString('order', '');
		/** @var ImageModel $model */
		$model = $this->getModel();
		$model->updateOrdering($order);

		return true;
	}

	/**
	 * Ajax Upload inages processing
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	#[NoReturn] public function upload()
	{
		if (!$this->checkToken('post', false))
		{
			$this->returnError(KrMethods::plain('JINVALID_TOKEN_NOTICE'));
		}

		$property_id = KrMethods::inputInt('property_id');
		if (!$property_id)
		{
			Logger::logMe('Property ID was not received');
			$this->returnError();
		}

		$name     = $_FILES['file']['name'];
		$tmp_name = $_FILES['file']['tmp_name'];
		$error    = $_FILES['file']['error'];

		$count = count($name);
		if (!$count)
		{
			$this->returnError(KrMethods::plain('COM_KNOWRES_FORM_ERROR_PROPERTY_IMAGE'));
		}

		$ImagesProperty = new Images\Property($property_id);
		for ($i = 0; $i < $count; $i++)
		{
			try
			{
				$ImagesProperty->validate($name[$i], $tmp_name[$i], $error[$i]);
				$ImagesProperty->processOriginal();
				$ImagesProperty->resize();
			}
			catch (RuntimeException $e)
			{
				$this->returnError($e->getMessage());
			}

			if (!$ImagesProperty->getExists())
			{
				$sname = $ImagesProperty->getName();
				/** @var ImageModel $model */
				$model = $this->getModel();
				if (!$model->store($sname))
				{
					Logger::logMe('Image ' . $sname . ' could not be saved');
					$this->returnError();
				}
			}
		}

		KrFactory::getAdminModel('servicequeue')::serviceQueueUpdate('updateProperty', $property_id, 0, 'ru');

		header('Content-Type: application/json; charset=utf-8');
		http_response_code(200);
		jexit();
	}

	/**
	 * Send error back to dropzone
	 *
	 * @param   string|null  $message  Error message
	 *
	 * @since  4.0.0
	 */
	#[NoReturn] protected function returnError(string $message = null)
	{
		if (is_null($message))
		{
			$message = KrMethods::plain('COM_KNOWRES_ERROR_TRY_AGAIN');
		}

		header('Content-Type: application/json; charset=utf-8');
		http_response_code(401);
		$wrapper          = [];
		$wrapper['error'] = $message;
		echo new JsonResponse($wrapper);
		jexit();
	}
}