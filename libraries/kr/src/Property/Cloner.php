<?php
/**
 * @package    Know Reservations
 * @subpackage Library
 * @copyright  Copyright (c) 2020, Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\KR\Property;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Logger;
use HighlandVision\KR\Media;
use HighlandVision\KR\TickTock;
use HighlandVision\KR\Translations;
use InvalidArgumentException;
use JetBrains\PhpStorm\NoReturn;
use Joomla\Database\DatabaseDriver;
use RuntimeException;

/**
 * Clones existing property as new
 *
 * @since 3.0.0
 */
class Cloner
{
	/** @var DatabaseDriver Database instance */
	protected DatabaseDriver $db;
	/** @var int New property id */
	protected int $new_id = 0;
	/** @var array Cloning options */
	protected array $options = [];
	/** @var int ID of property being cloned */
	protected int $property_id = 0;
	/** @var string Name of property being cloned */
	protected string $property_name = '';
	/** @var string Tables */
	protected string $tmp = '';
	/** @var string Temporary tables 1 */
	protected string $tmp1 = '';

	/**
	 * Initialise
	 *
	 * @param  int  $id  ID of existing property to clone
	 *
	 * @throws InvalidArgumentException
	 * @since  3.0.0
	 */
	public function __construct(int $id, string $property_name)
	{
		$this->property_id   = $id;
		$this->property_name = $property_name;
		$this->db            = KrFactory::getDatabase();
	}

	/**
	 * Clone property
	 *
	 * @param  array  $options   Array of cloning options
	 *                           Default values if not set
	 *                           $options['property_name']  New property_name;
	 *                           $options['image']          Clone images Default true
	 *                           $options['propertyoption'] Clone propertyoptions Default true
	 *                           $options['propertyroom']   Clone propertyrooms Default true
	 *                           $options['rate']           Clone rates Default true
	 *                           $options['discount']       Clone discounts and coupons  Default true
	 *                           $options['extra']          Clone extras Default true
	 *
	 * @throws RuntimeException
	 * @throws Exception
	 * @since  3.0.0
	 * @return int
	 */
	public function cloneProperty(array $options): int
	{
		$this->setOptions($options);
		if (!$this->createProperty())
		{
			return 0;
		}

		KrMethods::message(KrMethods::plain(COM_KNOWRES_PROPERTY_CLONE_OK), 'info');

		if (!$this->createPropertysettingsClone())
		{
			return 0;
		}

		return $this->new_id;
	}

	/**
	 * Create cloned tables with translations
	 *
	 * @param  string  $newid    New property id
	 * @param  string  $type     Child property type
	 * @param  array   $options  Clone options
	 *
	 * @throws Exception
	 * @throws RuntimeException
	 * @throws RuntimeException
	 * @throws RuntimeException
	 * @since  3.0.0
	 */
	#[NoReturn] public function clonePropertyChild(string $newid, string $type, array $options): void
	{
		$relations = $this->setRelations();
		$this->setOptions($options);
		$this->new_id = $newid;

		if ($this->options[$type])
		{
			if ($type != 'imagecopy')
			{
				if (!$this->createPropertyChild($relations[$type], $type))
				{
					echo false;
				}
				else
				{
					$Translations = new Translations();
					$Translations->cleanTranslationCache();

					$title = "COM_KNOWRES_TITLE_" . strtoupper($type . 's');
					echo KrMethods::plain($title) . " cloned successfully";
				}
			}
			else
			{
				if (!Media\Images::copyPropertyImages($this->property_id, $this->new_id))
				{
					echo false;
				}
				else
				{
					echo 'Images copied successfully';
				}
			}
		}

		jexit();
	}

	/**
	 * Create tmp table based on actual table
	 * loading all rows with matching id
	 *
	 * @throws RuntimeException
	 * @throws Exception
	 * @since  3.0.0
	 * @return bool
	 */
	protected function createProperty(): bool
	{
		try
		{
			$this->tmp  = 'property';
			$this->tmp1 = 'property' . '1';
			$this->tmpDrop();

			// Create tmp property with selection of records as required
			$query = 'CREATE TEMPORARY TABLE ' . $this->db->qn($this->tmp);
			$query .= ' SELECT * FROM ' . $this->db->qn('#__knowres_property');
			$query .= ' WHERE ' . $this->db->qn('id') . '=' . $this->property_id;
			$this->db->setQuery($query);
			$this->db->execute();

			// Update tmp with new fields
			$query  = $this->db->getQuery(true);
			$fields = [$this->db->qn('state') . '=0',
			           $this->db->qn('property_name') . '=' . $this->db->q($this->options['property_name']),
			           $this->db->qn('created_at') . '=' . $this->db->q(TickTock::getTS()),
			           $this->db->qn('created_by') . '=' . KrMethods::getUser()->id,
			           $this->db->qn('updated_at') . '=' . $this->db->q('00-00-00 00:00:00'),
			           $this->db->qn('updated_by') . '=0'
			];

			$query->update($this->db->qn($this->tmp))->set($fields);
			$this->db->setQuery($query);
			$this->db->execute();

			$this->tmpAlter(1);

			// Create tmp1 translations with selection of translation records for cloned property
			$query = 'CREATE TEMPORARY TABLE ' . $this->db->qn($this->tmp1);
			$query .= ' SELECT * FROM ' . $this->db->qn('#__knowres_translation');
			$query .= ' WHERE ' . $this->db->qn('item_id') . '=' . $this->property_id;
			$query .= ' AND ' . $this->db->qn('item') . '=' . $this->db->q('property');
			$this->db->setQuery($query);
			$this->db->execute();

			$this->db->transactionStart();

			// Insert clone back into property table (new id should be generated)
			$this->new_id = $this->tmpCopy('#__knowres_property', $this->tmp, true);
			if (!$this->new_id)
			{
				throw new Exception("Cloned property ID not returned");
			}

			// Update tmp1 with new fields
			$query  = $this->db->getQuery(true);
			$fields = [$this->db->qn('item_id') . '=' . $this->new_id,
			           $this->db->qn('created_at') . '=' . $this->db->q(TickTock::getTS()),
			           $this->db->qn('created_by') . '=' . KrMethods::getUser()->id,
			           $this->db->qn('updated_at') . '=' . $this->db->q('00-00-00 00:00:00'),
			           $this->db->qn('updated_by') . '=0'
			];

			$query->update($this->db->qn($this->tmp1))->set($fields);
			$this->db->setQuery($query);
			$this->db->execute();

			$this->tmpAlter(2);
			$this->tmpCopy('#__knowres_translation', $this->tmp1);

			$this->db->transactionCommit();

			return true;
		}
		catch (RuntimeException $re)
		{
			$this->db->transactionRollback();
			Logger::logMe($re->getMessage(), 'info');

			return false;
		}
		catch (Exception $e)
		{
			$this->db->transactionRollback();
			Logger::logMe($e->getMessage(), 'info');

			return false;
		}
	}

	/**
	 * Create cloned tables with translations
	 *
	 * @param  string  $table  Table to replicate
	 * @param  string  $type   TranslationsModel item
	 *
	 * @throws RuntimeException
	 * @throws Exception
	 * @since  3.0.0
	 * @return bool
	 */
	protected function createPropertyChild(string $table, string $type): bool
	{
		try
		{
			$item_id    = 0;
			$in         = [];
			$relations  = [];
			$this->tmp  = $type;
			$this->tmp1 = $type . '1';

			while (true)
			{
				$this->tmpDrop();

				$query = 'CREATE TEMPORARY TABLE ' . $this->db->qn($this->tmp);
				$query .= ' SELECT * FROM ' . $this->db->qn($table);
				$query .= ' WHERE ' . $this->db->qn('id') . '>' . (int) $item_id;
				$query .= ' AND ' . $this->db->qn('property_id') . '=' . $this->property_id;
				$query .= ' ORDER BY ' . $this->db->qn('id') . ' ASC';
				$query .= ' LIMIT 1';
				$this->db->setQuery($query);
				$this->db->execute();

				// Check if any rows exist
				$query = 'SELECT * FROM ' . $this->db->qn($this->tmp);
				$this->db->setQuery($query);
				$row = $this->db->loadObject();

				// No record is found
				if (is_null($row))
				{
					break;
				}

				$item_id = $row->id;
				$in[]    = $row->id;

				// Update tmp with cloned property id
				$query  = $this->db->getQuery(true);
				$fields = [
					$this->db->qn('property_id') . '=' . $this->new_id,
					$this->db->qn('created_at') . '=' . $this->db->q(TickTock::getTS()),
					$this->db->qn('created_by') . '=' . KrMethods::getUser()->id,
					$this->db->qn('updated_at') . '=' . $this->db->q('00-00-00 00:00:00'),
					$this->db->qn('updated_by') . '=0',
				];

				$query->update($this->db->qn($this->tmp))->set($fields);
				$this->db->setQuery($query);
				$this->db->execute();

				// Drop id for tmp
				$this->tmpAlter(1);

				// Get the last insert id and store it with the old id
				$relations[$item_id] = $this->tmpCopy($table, $this->tmp, true);
			}

			if (!count($relations))
			{
				return true;
			}

			// Create tmp1 with selection of translation records
			$query = 'CREATE TEMPORARY TABLE ' . $this->db->qn($this->tmp1);
			$query .= ' SELECT * FROM ' . $this->db->qn('#__knowres_translation');
			$query .= ' WHERE ' . $this->db->qn('item_id') . ' IN(' . implode(",", $in) . ')';
			$query .= ' AND ' . $this->db->qn('item') . '=' . $this->db->q($type);

			$this->db->setQuery($query);
			$this->db->execute();

			// Update tmp1 with new fields
			$query = $this->db->getQuery(true);

			$case = '';
			foreach ($relations as $old => $new)
			{
				$case .= ' WHEN ' . $this->db->qn('item_id') . '=' . (int) $old . ' THEN ' . (int) $new;
			}

			$fields = [$this->db->qn('item_id') . ' = CASE ' . $case . ' ELSE 0 END',
			           $this->db->qn('created_at') . '=' . $this->db->q(TickTock::getTS()),
			           $this->db->qn('created_by') . '=' . KrMethods::getUser()->id,
			           $this->db->qn('updated_at') . '=' . $this->db->q('00-00-00 00:00:00'),
			           $this->db->qn('updated_by') . '=0'
			];

			$query->update($this->db->qn($this->tmp1))->set($fields);

			$this->db->setQuery($query);
			$this->db->execute();

			$this->tmpAlter(2);
			$this->tmpCopy('#__knowres_translation', $this->tmp1);

			return true;
		}
		catch (Exception $e)
		{
			$this->db->transactionRollback();
			Logger::logMe($e->getMessage(), 'info');

			return false;
		}
	}

	/**
	 * Clone property setting table
	 *
	 * @throws RuntimeException
	 * @throws Exception
	 * @since  3.0.0
	 * @return bool
	 */
	protected function createPropertysettingsClone(): bool
	{
		try
		{
			$this->tmp = "settings";
			$this->tmpDrop();

			// Create tmp with the latest record
			$query = 'CREATE TEMPORARY TABLE ' . $this->db->qn($this->tmp);
			$query .= ' SELECT * FROM ' . $this->db->qn('#__knowres_property_setting');
			$query .= ' WHERE ' . $this->db->qn('property_id') . '=' . $this->property_id;
			$query .= ' ORDER BY ' . $this->db->qn('id') . ' ASC';
			$this->db->setQuery($query);
			$this->db->execute();

			// Update tmp with cloned property id
			$query  = $this->db->getQuery(true);
			$fields = [$this->db->qn('property_id') . '=' . $this->new_id,
			           $this->db->qn('created_at') . '=' . $this->db->q(TickTock::getTS()),
			           $this->db->qn('created_by') . '=' . KrMethods::getUser()->id,
			           $this->db->qn('updated_at') . '=' . $this->db->q('00-00-00 00:00:00'),
			           $this->db->qn('updated_by') . '=0',
			];

			$query->update($this->db->qn($this->tmp))->set($fields);
			$this->db->setQuery($query);
			$this->db->execute();

			$this->tmpAlter(1);

			$this->db->transactionStart();
			$this->tmpCopy('#__knowres_property_setting', $this->tmp);

			$this->db->transactionCommit();

			return true;
		}
		catch (RuntimeException $re)
		{
			$this->db->transactionRollback();
			Logger::logMe($re->getMessage());

			return false;
		}
	}

	/**
	 * Set clone options from input or default if no input
	 *
	 * @param  array  $options  Parameter input options
	 *
	 * @since 3.0.0
	 */
	protected function setOptions(array $options): void
	{
		$this->options['property_name']  = !empty($options['new_name']) ? $options['new_name']
			: $this->property_name . ' 2';
		$this->options['image']          = $options['image'] ?? 1;
		$this->options['imagecopy']      = $options['image'] ?? 1;
		$this->options['propertyoption'] = $options['propertyoption'] ?? 1;
		$this->options['propertyroom']   = $options['propertyroom'] ?? 1;
		$this->options['rate']           = $options['rate'] ?? 1;
		$this->options['ratemarkup']     = $options['rate'] ?? 1;
		$this->options['coupon']         = $options['discount'] ?? 1;
		$this->options['discount']       = $options['discount'] ?? 1;
		$this->options['extra']          = $options['extra'] ?? 1;
	}

	/**
	 * Set relations for child clone
	 *
	 * @since  3.0.0
	 * @return array
	 */
	protected function setRelations(): array
	{
		$data['propertyoption'] = "#__knowres_property_option";
		$data['propertyroom']   = "#__knowres_property_room";
		$data['rate']           = "#__knowres_rate";
		$data['ratemarkup']     = "#__knowres_rate_markup";
		$data['coupon']         = "#__knowres_coupon";
		$data['discount']       = "#__knowres_discount";
		$data['extra']          = "#__knowres_extra";
		$data['image']          = "#__knowres_image";

		return $data;
	}

	/**
	 * Alter tmp remove primary key
	 *
	 * @param  int  $scope  Tables to drop 1 = tmp, 2 = 2mp1, 3 = both
	 *
	 * @throws RuntimeException
	 * @throws InvalidArgumentException
	 * @since  3.0.0
	 */
	protected function tmpAlter(int $scope = 0): void
	{
		if ($scope == 1 || !$scope)
		{
			$query = 'ALTER TABLE ' . $this->db->qn($this->tmp) . ' DROP ' . $this->db->qn('id');
			$this->db->setQuery($query);
			$this->db->execute();
		}

		if ($scope == 2 || !$scope)
		{
			$query = 'ALTER TABLE ' . $this->db->qn($this->tmp1) . ' DROP ' . $this->db->qn('id');
			$this->db->setQuery($query);
			$this->db->execute();
		}
	}

	/**
	 * Copy tmp to require table
	 *
	 * @param  string  $table   Table name to insert
	 * @param  string  $tmp     Temp table to read
	 * @param  bool    $getNew  True to return new ID
	 *
	 * @throws InvalidArgumentException
	 * @throws RuntimeException
	 * @since  3.0.0
	 * @return int
	 */
	protected function tmpCopy(string $table, string $tmp, bool $getNew = false): int
	{
		$query = 'INSERT INTO ' . $this->db->qn($table) . ' SELECT 0, ' . $this->db->qn($tmp) . '.* FROM '
			. $this->db->qn($tmp);
		$this->db->setQuery($query);
		$this->db->execute();

		return $getNew ? $this->db->insertid() : 0;
	}

	/**
	 * Drop tmp table
	 *
	 * @throws RuntimeException|InvalidArgumentException
	 * @since 3.0.0
	 */
	protected function tmpDrop(): void
	{
		$query = "DROP TABLE IF EXISTS " . $this->db->qn($this->tmp);
		$this->db->setQuery($query);
		$this->db->execute();

		$query = "DROP TABLE IF EXISTS " . $this->db->qn($this->tmp1);
		$this->db->setQuery($query);
		$this->db->execute();
	}
}