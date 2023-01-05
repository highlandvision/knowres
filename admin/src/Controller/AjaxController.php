<?php
/**
 * @package     KR
 * @subpackage  Admin views
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Administrator\Controller;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\TickTock;
use HighlandVision\KR\Translations;
use Joomla\CMS\MVC\Controller\BaseController;
use Joomla\CMS\MVC\Model\BaseDatabaseModel;
use Joomla\CMS\Response\JsonResponse;
use stdClass;

use function jexit;
use function json_encode;

/**
 * Reporting list controller class.
 *
 * @since 1.0.0
 */
class AjaxController extends BaseController
{
	/**
	 * Edit from jinplace (edit in place)
	 *
	 * @throws Exception
	 * @since  2.4.0
	 */
	public function editinplace()
	{
		$table  = KrMethods::inputString('table');
		$column = KrMethods::inputString('column');
		$text   = KrMethods::inputString('text');

		if (empty($column) || empty($table))
		{
			$wrapper         = [];
			$wrapper['text'] = "No";
			echo json_encode($wrapper);
			jexit();
		}

		$translate = explode('~', $table);
		if ($translate[0] == 'translate')
		{
			try
			{
				$Translations = new Translations();
				$Translations->updateDefault($translate[1], $translate[2], $column, $text);

				$data             = new stdClass();
				$data->id         = (int) $translate[2];
				$data->updated_at = TickTock::getTS();
				$data->updated_by = (int) KrMethods::getUser()->id;
				KrFactory::update($translate[1], $data);
			}
			catch (Exception)
			{
				echo new JsonResponse(null, KrMethods::plain('Please try again or edit the image'), true);
				jexit();
			}
		}

		$wrapper         = [];
		$wrapper['text'] = $text;
		echo json_encode($wrapper);
		jexit();
	}

	/**
	 * Proxy for getModel.
	 *
	 * @param   string  $name    Name of model
	 * @param   string  $prefix  Model prefix
	 * @param   array   $config
	 *
	 * @since  2.0.0
	 * @return bool|BaseDatabaseModel
	 */
	public function getModel($name = 'editinplace', $prefix = 'Administrator',
		$config = ['ignore_request' => true]): BaseDatabaseModel|bool
	{
		return parent::getModel($name, $prefix, $config);
	}
}