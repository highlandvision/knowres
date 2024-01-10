<?php
/**
 * @package     Know Reservations (KR)
 * @subpackage  Library
 * @copyright   Copyright (C) 2020 Highland Vision. All rights reserved.
 * @license     See the file LICENSE.txt for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\KR\Framework;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Joomla\Extend\FormModel;
use HighlandVision\KR\Joomla\FDatabase as FNS;
use InvalidArgumentException;
use Joomla\CMS\Form\Form;
use Joomla\CMS\MVC\Model\ModelInterface;
use Joomla\Database\DatabaseDriver;
use Joomla\DI\Exception\KeyNotFoundException;
use RuntimeException;
use stdClass;

use const JPATH_COMPONENT_ADMINISTRATOR;
use const JPATH_COMPONENT_SITE;

/**
 * Generic database linker
 *
 * @since  3.3.0
 */
class KrFactory
{
	/**
	 * Check for existing guest email on User.
	 *
	 * @param  string  $email  Guest email
	 *
	 * @throws QueryTypeAlreadyDefinedException
	 * @throws RuntimeException|InvalidArgumentException
	 * @since  3.3.0
	 * @return mixed
	 */
	public static function checkUser(string $email): mixed
	{
		return FNS::checkUser($email);
	}

	/**
	 * Check for existing username on User.
	 *
	 * @param  string  $name  Proposed username
	 *
	 * @throws QueryTypeAlreadyDefinedException
	 * @throws RuntimeException|InvalidArgumentException
	 * @since  3.3.0
	 * @return mixed
	 */
	public static function checkUsername(string $name): mixed
	{
		return FNS::checkUsername($name);
	}

	/**
	 * Delete data from table
	 *
	 * @param  string  $table       Table name
	 * @param  array   $conditions  Deletion conditions
	 *
	 * @throws QueryTypeAlreadyDefinedException
	 * @throws RuntimeException|InvalidArgumentException
	 * @since  3.3.0
	 */
	public static function deleteData(string $table, array $conditions): void
	{
		FNS::deleteData($table, $conditions);
	}

	/**
	 * Get a new empty Form for adhoc uses
	 *
	 * @param  string   $name     Form name
	 * @param  string   $source   Name of XML file
	 * @param  string   $area     Set to 'site' for Site or 'module' for Module or 'libraries' for Library
	 * @param  ?string  $control  Form control name
	 *
	 * @since  3.3.0
	 * @return Form
	 */
	public static function getAdhocForm(string $name, string $source, string $area = 'administrator',
		?string $control = 'jform'): Form
	{
		if ($area == 'site')
		{
			$filepath = JPATH_COMPONENT_SITE . '/forms/' . $source;
		}
		else if ($area == 'module')
		{
			$filepath = JPATH_SITE . '/modules/' . $name . '/forms/' . $source;
		}
		else if ($area == 'library')
		{
			$filepath = JPATH_LIBRARIES . '/highlandvision/' . $name . '/forms/' . $source;
		}
		else
		{
			$filepath = JPATH_COMPONENT_ADMINISTRATOR . '/forms/' . $source;
		}

		$form = new Form($name, ['control' => $control]);
		$form->addFormPath($filepath);
		$form->loadFile($filepath);

		return $form;
	}

	/**
	 * Get admin model
	 *
	 * @param  string  $name  Model name
	 *
	 * @throws Exception
	 * @since  3.3.0
	 * @return ?ModelInterface  The model object
	 */
	public static function getAdminModel(string $name): ?ModelInterface
	{
		return FNS::getAdminModel($name);
	}

	/**
	 * Get admin model
	 *
	 * @param  string  $name  Model name
	 *
	 * @throws Exception
	 * @since  3.3.0
	 * @return ModelInterface|FormModel|null  The model object or form
	 */
	public static function getSiteModel(string $name): ModelInterface|FormModel|null
	{
		return FNS::getAdminModel($name, 'site');
	}

	/**
	 * Get database
	 *
	 * @throws KeyNotFoundException
	 * @since  3.3.0
	 * @return DatabaseDriver
	 */
	public static function getDatabase(): DatabaseDriver
	{
		return FNS::getDatabase();
	}

	/**
	 * Get list model
	 *
	 * @param  string  $name  Model name
	 *
	 * @since  3.3.0
	 * @return mixed
	 */
	public static function getListModel(string $name): mixed
	{
		return FNS::getListModel($name);
	}

	/**
	 * Get list model
	 *
	 * @param  string  $name  Model name
	 *
	 * @since  3.3.0
	 * @return mixed
	 */
	public static function getListSiteModel(string $name): mixed
	{
		return FNS::getListModel($name, 'site');
	}

	/**
	 * Insert object into database
	 *
	 * @param  string    $table  Table name
	 * @param  stdClass  $data   Data to be inserted
	 * @param  string    $key    Primary key
	 *
	 * @throws RuntimeException
	 * @throws KeyNotFoundException
	 * @since  3.3.0
	 * @return mixed
	 */
	public static function insert(string $table, stdClass $data, string $key = 'id'): mixed
	{
		return FNS::insert($table, $data, $key);
	}

	/**
	 * Truncate a table
	 *
	 * @param  string  $table  Name of table
	 *
	 * @throws RuntimeException
	 * @throws KeyNotFoundException
	 * @since  3.3.0
	 */
	public static function truncate(string $table): void
	{
		FNS::truncate($table);
	}

	/**
	 * Update database
	 *
	 * @param  string    $table  Table name
	 * @param  stdClass  $data   Data to be inserted
	 * @param  string    $key    Name of primary key
	 *
	 * @throws RuntimeException|KeyNotFoundException
	 * @since  3.3.0
	 */
	public static function update(string $table, stdClass $data, string $key = 'id'): void
	{
		FNS::update($table, $data, $key);
	}
}