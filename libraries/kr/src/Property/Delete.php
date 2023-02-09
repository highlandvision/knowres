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
use HighlandVision\KR\Media;
use InvalidArgumentException;
use Joomla\Database\DatabaseDriver;

/**
 * Property deletion
 *
 * @since 3.0.0
 */
class Delete
{
	/** @var DatabaseDriver Database instance */
	protected DatabaseDriver $db;
	/** @var int Property id of property being cloned */
	protected int $property_id = 0;

	/**
	 * Initialise
	 *
	 * @param  int  $id  ID of property to delete
	 *
	 * @throws InvalidArgumentException
	 * @since  3.0.0
	 */
	function __construct(int $id)
	{
		$this->property_id = $id;
		$this->db          = KrFactory::getDatabase();
	}

	/**
	 * Delete property also needs canDelete set in Model
	 *
	 * @throws Exception
	 * @since  3.0.0
	 */
	public function deleteTheProperty(): void
	{
		$data                               = [];
		$data['#__knowres_coupon']          = 'Coupon';
		$data['#__knowres_discount']        = 'Discount';
		$data['#__knowres_extra']           = 'Extra';
		$data['#__knowres_ical_block']      = 'Icalblock';
		$data['#__knowres_image']           = 'Image';
		$data['#__knowres_property_ical']   = 'Propertyical';
		$data['#__knowres_property_option'] = 'Propertyoption';
		$data['#__knowres_property_room']   = 'Propertyroom';
		$data['#__knowres_rate']            = 'Rate';
		$data['#__knowres_rate_markup']     = 'Ratemarkup';
		$data['#__knowres_service_log']     = 'Servicelog';
		$data['#__knowres_service_queue']   = 'Servicequeue';
		$data['#__knowres_service_xref']    = 'Servicexref';

		try
		{
			$this->db->transactionStart();

			foreach ($data as $table => $model)
			{
				$this->deleteLinked($table, $model);
			}

			$this->deletePropertysettings();
			$this->deleteProperty();
			Media\Images::deletePropertyImages($this->property_id);

			$this->db->transactionCommit();
		}
		catch (Exception)
		{
			$this->db->transactionRollback();
		}
	}

	/**
	 * Create tmp table based on actual table
	 * loading all rows with matching id
	 *
	 * @throws Exception
	 * @throws Exception
	 * @throws Exception
	 * @since  3.0.0
	 */
	protected function deleteProperty(): void
	{
		$model = KrFactory::getAdminModel('property');
		$cid   = array($this->property_id);
		$model->delete($cid);
	}

	/**
	 * Delete linked tables with translations
	 *
	 * @param  string  $table  Table to replicate
	 * @param  string  $class  Model class
	 *
	 * @throws Exception
	 * @since  3.0.0
	 */
	protected function deleteLinked(string $table, string $class): void
	{
		$query = $this->db->getQuery(true);
		$query->select($this->db->qn('id'))
		      ->from($this->db->qn($table))
		      ->where($this->db->qn('property_id') . '=' . $this->property_id);

		$this->db->setQuery($query);
		$ids = $this->db->loadColumn();

		if (count($ids))
		{
			$model = KrFactory::getAdminModel($class);
			$model->delete($ids);
		}
	}

	/**
	 * Delete property settings table
	 *
	 * @throws Exception
	 * @since 3.0.0
	 */
	protected function deletePropertysettings(): void
	{
		$query = $this->db->getQuery(true);

		$conditions = [
			$this->db->qn('property_id') . '=' . $this->property_id
		];

		$query->delete($this->db->qn('#__knowres_property_setting'));
		$query->where($conditions);

		$this->db->setQuery($query);
		$this->db->execute();
	}
}