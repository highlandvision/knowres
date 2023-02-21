<?php
/**
 * @package    Know Reservations
 * @subpackage Admin Controllers
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */
/** @noinspection PhpUnhandledExceptionInspection */

namespace HighlandVision\Component\Knowres\Administrator\Controller;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Logger;
use Joomla\CMS\MVC\Controller\AdminController;
use Joomla\CMS\MVC\Factory\MVCFactoryInterface;
use Joomla\CMS\MVC\Model\BaseDatabaseModel;
use Joomla\CMS\Response\JsonResponse;
use RuntimeException;

use function jexit;

/**
 * Properties controller list class.
 *
 * @since 1.0.0
 */
class PropertiesController extends AdminController
{
	/**
	 * Constructor.
	 *
	 * @param   array                     $config   An optional associative array of configuration settings.
	 * @param   MVCFactoryInterface|null  $factory  The factory.
	 * @param   null                      $app      The Application for the dispatcher
	 * @param   null                      $input    Input
	 *
	 * @throws Exception
	 * @since  4.0
	 */
	public function __construct($config = array(), MVCFactoryInterface $factory = null, $app = null, $input = null)
	{
		parent::__construct($config, $factory, $app, $input);

		$this->registerTask('markastrash', 'markastrash');
		$this->registerTask('markfordeletion', 'markfordeletion');
	}

	/**
	 * Returns the property area for the typeahead property edit.
	 *
	 * @since 1.0.0
	 */
	public function area()
	{
		try
		{
			$search    = KrMethods::inputString('query', '');
			$region_id = KrMethods::inputInt('region_id');
			$areas     = KrFactory::getListModel('properties')->getArea($region_id, $search);

			echo new JsonResponse($areas);
			jexit();
		}
		catch (Exception $e)
		{
			Logger::logMe($e->getMessage());
			echo new JsonResponse(null, KrMethods::plain('COM_KNOWRES_ERROR_TRY_AGAIN'), true);
			jexit();
		}
	}

	/**
	 * Proxy for getModel.
	 *
	 * @param   string  $name    Model name
	 * @param   string  $prefix  Model prefix administrator or site (defaults to administrator)
	 * @param   array   $config  Config options
	 *
	 * @since  1.6
	 * @return bool|BaseDatabaseModel
	 */
	public function getModel($name = 'property', $prefix = 'Administrator',
		$config = ['ignore_request' => true]): BaseDatabaseModel|bool
	{
		return parent::getModel($name, $prefix, $config);
	}

	/**
	 * Mark selected properties either as trash if no reservations otherwise archived
	 *
	 * @throws Exception
	 * @since  3.0.0
	 */
	public function markAsTrash()
	{
		$this->checkToken();

		$cid = KrMethods::inputArray('cid', [], 'get');
		if (!is_countable($cid) || count($cid) < 1)
		{
			KrMethods::addLog(KrMethods::plain($this->text_prefix . '_NO_ITEM_SELECTED'));
			KrMethods::redirect(KrMethods::route('index.php?option=com_knowres&view=properties', false));
		}

		if (KrFactory::getAdminModel('property')->markAsTrash($cid))
		{
			KrMethods::message(KrMethods::plain('COM_KNOWRES_ACTION_SUCCESS'));
		}
		else
		{
			KrMethods::message(KrMethods::plain('COM_KNOWRES_ERROR_TRY_AGAIN'), 'error');
		}

		KrMethods::redirect(KrMethods::route('index.php?option=com_knowres&view=properties', false));
	}

	/**
	 * Mark selected properties for deletion in overnight daily run
	 *
	 * @throws Exception
	 * @throws RuntimeException
	 * @since  3.0.0
	 */
	public function markForDeletion()
	{
		$this->checkToken();

		$cid = KrMethods::inputArray('cid', [], 'get');
		if (!is_countable($cid) || count($cid) < 1)
		{
			KrMethods::addLog(KrMethods::plain($this->text_prefix . '_NO_ITEM_SELECTED'));
			KrMethods::redirect(KrMethods::route('index.php?option=com_knowres&view=properties', false));
		}

		if (KrFactory::getAdminModel('property')->markForDeletion($cid))
		{
			KrMethods::message(KrMethods::plain('COM_KNOWRES_ACTION_SUCCESS'));
		}
		else
		{
			KrMethods::message(KrMethods::plain('COM_KNOWRES_ERROR_TRY_AGAIN'), 'error');
		}

		KrMethods::redirect(KrMethods::route('index.php?option=com_knowres&view=properties', false));
	}

	/**
	 * Display property list
	 *
	 * @since  3.0.0
	 */
	public function view()
	{
		KrMethods::redirect(KrMethods::route('index.php?option=com_knowres&view=properties', false));
	}
}