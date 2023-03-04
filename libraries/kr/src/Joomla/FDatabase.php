<?php
/**
 * @package     Know Reservations (KR)
 * @subpackage  Library
 * @copyright   Copyright (C) 2020 Highland Vision. All rights reserved.
 * @license     See the file LICENSE.txt for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\KR\Joomla;

defined('_JEXEC') or die;

use Exception;
use InvalidArgumentException;
use Joomla\CMS\Factory;
use Joomla\CMS\MVC\Model\ModelInterface;
use Joomla\Database\DatabaseDriver;
use Joomla\Database\Exception\QueryTypeAlreadyDefinedException;
use Joomla\DI\Exception\KeyNotFoundException;
use RuntimeException;
use stdClass;

use function ucfirst;

const SUFFIX = 'Model';
const TABLE  = "#__knowres_";

/**
 * Generic Joomla database methods
 *
 * @since  1.0.0
 */
class FDatabase
{
	/**
	 * Validate if user email exists
	 *
	 * @param  string  $email  Email string
	 *
	 * @throws InvalidArgumentException
	 * @throws QueryTypeAlreadyDefinedException
	 * @throws RuntimeException
	 * @since  1.0.0
	 * @return mixed
	 */
	public static function checkUser(string $email): mixed
	{
		if ($email)
		{
			$db    = self::getDatabase();
			$query = $db->getQuery(true);

			$query->select($db->qn('id'))
			      ->from($db->qn('#__users'))
			      ->where($db->qn('email') . '=' . $db->q($email))
			      ->setLimit(1)
			      ->order($db->qn('id') . 'DESC');
			$db->setQuery($query);

			return $db->loadResult();
		}

		return false;
	}

	/**
	 * Validate if user name exists
	 *
	 * @param  string  $username  Name of user
	 *
	 * @throws InvalidArgumentException
	 * @throws QueryTypeAlreadyDefinedException
	 * @throws RuntimeException
	 * @since  1.0.0
	 * @return mixed
	 */
	public static function checkUsername(string $username): mixed
	{
		if (!$username)
		{
			return true;
		}

		$db    = self::getDatabase();
		$query = $db->getQuery(true);

		$query->select($db->qn('id'))
		      ->from($db->qn('#__users'))
		      ->where($db->qn('username') . '=' . $db->q($username))
		      ->setLimit(1);

		$db->setQuery($query);

		return $db->loadResult();
	}

	/**
	 * Delete data from table
	 *
	 * @param  string  $table       Table name
	 * @param  array   $conditions  Deletion conditions
	 *
	 * @throws InvalidArgumentException
	 * @throws QueryTypeAlreadyDefinedException
	 * @throws RuntimeException
	 * @since   3.3.0
	 */
	public static function deleteData(string $table, array $conditions): void
	{
		$db    = self::getDatabase();
		$query = $db->getQuery(true);

		$query->delete($db->qn(TABLE . $table))->where($conditions);
		$db->setQuery($query);
		$db->execute();
	}

	/**
	 * Get a model class
	 *
	 * @param  string  $name  Model name.
	 * @param  string  $area  administrator or site.
	 *
	 * @throws Exception
	 * @since  1.0.0
	 * @return ?ModelInterface  The model object
	 */
	public static function getAdminModel(string $name, string $area = 'Administrator'): ?ModelInterface
	{
		return Factory::getApplication()->bootComponent('com_knowres')
		              ->getMVCFactory()->createModel($name, $area, ['ignore_request' => true]);
	}

	/**
	 * Get database
	 *
	 * @throws KeyNotFoundException
	 * @since  1.0.0
	 * @return DatabaseDriver
	 */
	public static function getDatabase(): DatabaseDriver
	{
		return Factory::getContainer()->get('DatabaseDriver');
	}

	/**
	 * Get list model
	 *
	 * @param  string  $name  Model name
	 * @param  string  $area  Administrator or Site
	 *
	 * @since  3.0.0
	 * @return mixed
	 */
	public static function getListModel(string $name, string $area = "Administrator"): mixed
	{
		$class = ucfirst($name) . SUFFIX;
		if ($area == 'Administrator')
		{
			$model = 'HighlandVision\\Component\\Knowres\\Administrator\\Model\\' . $class;
		}
		else
		{
			$model = 'HighlandVision\\Component\\Knowres\\Site\\Model\\' . $class;
		}

		return new $model;
	}

	/**
	 * Get the admin path to the model
	 *
	 * @param  string  $name  Model name
	 * @param  string  $area  Site or Admin
	 *
	 * @since  3.3.0
	 * @return string
	 */
	public static function getPath(string $name, string $area = 'admin'): string
	{
		if ($area == 'admin')
		{
			return JPATH_ADMINISTRATOR . '/components/com_knowres/src/Model/' . $name . '.php';
		}
		else
		{
			return JPATH_SITE . '/components/com_knowres/src/Model/' . $name . '.php';
		}
	}

	/**
	 * Insert object into database
	 *
	 * @param  string    $table  Table name
	 * @param  stdClass  $data   Data to be inserted
	 * @param  string    $key    Primary key
	 *
	 * @throws RuntimeException
	 * @since  3.3.0
	 * @return mixed
	 */
	public static function insert(string $table, stdClass $data, string $key = 'id'): mixed
	{
		$db = self::getDatabase();
		$db->insertObject(TABLE . $table, $data, $key);

		return $db->insertid();
	}

	/**
	 * Truncate a table
	 *
	 * @param  string  $table  Name of table
	 *
	 * @throws RuntimeException
	 * @since  3.3.0
	 */
	public static function truncate(string $table): void
	{
		self::getDatabase()->truncateTable(TABLE . $table);
	}

	/**
	 * Update object into database
	 *
	 * @param  string    $table  Table name
	 * @param  stdClass  $data   Data to be inserted
	 * @param  string    $key    Name of primary key
	 *
	 * @throws RuntimeException
	 * @since  3.3.0
	 */
	public static function update(string $table, stdClass $data, string $key): void
	{
		self::getDatabase()->updateObject(TABLE . $table, $data, $key, true);
	}
}