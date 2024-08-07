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

use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use Joomla\CMS\MVC\Controller\AdminController;
use Joomla\CMS\MVC\Model\BaseDatabaseModel;
use Joomla\Utilities\ArrayHelper;

use function is_countable;

/**
 * Service queues controller list class.
 *
 * @since 1.0.0
 */
class ServicequeuesController extends AdminController
{
	/**
	 * Proxy for getModel.
	 *
	 * @param  string  $name    Model name
	 * @param  string  $prefix  Model prefix administrator or site (defaults to administrator)
	 * @param  array   $config  Config options
	 *
	 * @since  1.6
	 * @return bool|BaseDatabaseModel
	 */
	public function getModel($name = 'servicequeue', $prefix = 'Administrator',
		$config = ['ignore_request' => true]): BaseDatabaseModel|bool
	{
		return parent::getModel($name, $prefix, $config);
	}

	/**
	 * Resend queue rows as requested on service logs
	 *
	 * @since  1.0.4
	 */
	public function resend(): void
	{
		$pks = KrMethods::inputArray('cid');
		ArrayHelper::toInteger($pks);

		if (!is_countable($pks) || !count($pks))
		{
			KrMethods::message(KrMethods::plain('JLIB_DATABASE_ERROR_NO_ROWS_SELECTED'));
		}
		else
		{
			KrFactory::getAdminModel('servicequeue')->resend($pks);
		}

		KrMethods::redirect(KrMethods::route('index.php?option=com_knowres&view=servicequeues', false));
	}
}