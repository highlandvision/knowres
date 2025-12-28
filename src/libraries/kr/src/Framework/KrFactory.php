<?php

/**
 * @package     Know Reservations (KR)
 * @subpackage  Library
 * @copyright   Copyright (C) 2020 Highland Vision. All rights reserved.
 * @license     See the file LICENSE.txt for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\KR\Framework;

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

// phpcs:disable PSR1.Files.SideEffects
defined('_JEXEC') or die;
// phpcs:enable PSR1.Files.SideEffects

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
     * @param   string  $email  Guest email
     *
     * @return mixed
     * @throws RuntimeException|InvalidArgumentException
     * @throws QueryTypeAlreadyDefinedException
     * @since  3.3.0
     */
    public static function checkUser(string $email): mixed
    {
        return FNS::checkUser($email);
    }

    /**
     * Check for existing username on User.
     *
     * @param   string  $name  Proposed username
     *
     * @return mixed
     * @throws RuntimeException|InvalidArgumentException
     * @throws QueryTypeAlreadyDefinedException
     * @since  3.3.0
     */
    public static function checkUsername(string $name): mixed
    {
        return FNS::checkUsername($name);
    }

    /**
     * Delete data from table
     *
     * @param   string  $table       Table name
     * @param   array   $conditions  Deletion conditions
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
     * @param   string  $name     Form name
     * @param   string  $source   Name of XML file
     * @param   string  $area     Set to 'site' for Site or 'module' for Module or 'library' for Library
     * @param ?string   $control  Form control name
     *
     * @return Form
     * @since  3.3.0
     */
    public static function getAdhocForm(string $name, string $source, string $area = 'administrator',
        ?string $control = 'jform',
    ): Form {
        if ($area == 'site') {
            $filepath = JPATH_COMPONENT_SITE . '/forms/' . $source;
        } elseif ($area == 'module') {
            $filepath = JPATH_SITE . '/modules/' . $name . '/forms/' . $source;
        } elseif ($area == 'library') {
            $filepath = JPATH_LIBRARIES . '/highlandvision/' . $name . '/forms/' . $source;
        } else {
            $filepath = JPATH_COMPONENT_ADMINISTRATOR . '/forms/' . $source;
        }

        $form = new Form($name, ['control' => $control]);
        $form->addFormPath($filepath);
        $form->loadFile($filepath);

        return $form;
    }

    /**
     * Get item from model and id
     *
     * @param   string  $model  Model name
     * @param   int     $id     Item ID
     *
     * @return stdClass|false
     * @throws Exception
     * @since  5.2.0
     */
    public static function getAdminItem(string $model, int $id): stdClass|false
    {
        /** @noinspection PhpPossiblePolymorphicInvocationInspection */
        $item = self::getAdminModel($model)->getItem($id);
        if ($item->id == $id) {
            return $item;
        } else {
            return false;
        }
    }

    /**
     * Get admin model
     *
     * @param   string  $name  Model name
     *
     * @return ?ModelInterface The model object
     * @throws Exception
     * @since  3.3.0
     */
    public static function getAdminModel(string $name): ?ModelInterface
    {
        try {
            return FNS::getAdminModel($name);
        } catch (Exception $e) {
            Logger::logMe($e->getMessage());
            jexit();
        }
    }

    /**
     * Get database
     *
     * @return DatabaseDriver
     * @throws KeyNotFoundException
     * @since  3.3.0
     */
    public static function getDatabase(): DatabaseDriver
    {
        return FNS::getDatabase();
    }

    /**
     * Get list model
     *
     * @param   string  $name  Model name
     *
     * @return mixed
     * @since  3.3.0
     */
    public static function getListModel(string $name): mixed
    {
        return FNS::getListModel($name);
    }

    /**
     * Get list model
     *
     * @param   string  $name  Model name
     *
     * @return mixed
     * @since  3.3.0
     */
    public static function getListSiteModel(string $name): mixed
    {
        return FNS::getListModel($name, 'site');
    }

    /**
     * Get site model
     *
     * @param   string  $name  Model name
     *
     * @return ModelInterface|FormModel|null  The model object or form
     * @throws Exception
     * @since  3.3.0
     */
    public static function getSiteModel(string $name): ModelInterface|FormModel|null
    {
        return FNS::getAdminModel($name, 'site');
    }

    /**
     * Insert object into database
     *
     * @param   string    $table  Table name
     * @param   stdClass  $data   Data to be inserted
     * @param   string    $key    Primary key
     *
     * @return mixed
     * @throws KeyNotFoundException
     * @throws RuntimeException
     * @since  3.3.0
     */
    public static function insert(string $table, stdClass $data, string $key = 'id'): mixed
    {
        return FNS::insert($table, $data, $key);
    }

    /**
     * Truncate a table
     *
     * @param   string  $table  Name of table
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
     * @param   string    $table  Table name
     * @param   stdClass  $data   Data to be inserted
     * @param   string    $key    Name of primary key
     *
     * @throws RuntimeException|KeyNotFoundException
     * @since  3.3.0
     */
    public static function update(string $table, stdClass $data, string $key = 'id'): void
    {
        FNS::update($table, $data, $key);
    }
}
