<?php
/**
 * @package    Know Reservations
 * @subpackage Admin Models
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Administrator\Model;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Joomla\Extend\ListModel;
use HighlandVision\KR\TickTock;
use Joomla\Database\QueryInterface;
use RuntimeException;

use function count;
use function implode;

/**
 * Property settings list model.
 *
 * @since 1.0.0
 */
class PropertysettingsModel extends ListModel
{
	/**
	 * Constructor.
	 *
	 * @param   array  $config  An optional associative array of configuration settings.
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	public function __construct($config = [])
	{
		if (empty($config['filter_fields']))
		{
			$config['filter_fields'] = array(
				'id', 'a.id',
				'property_id', 'a.property_id',
				'akey', 'a.akey',
				'value', 'a.value',
				'created_by', 'a.created_by',
				'created_at', 'a.created_at',
				'updated_by', 'a.updated_by',
				'updated_at', 'a.updated_at',
			);
		}

		parent::__construct($config);
	}

	/**
	 * SQL query to return an array of one setting per
	 * property as requested.
	 *
	 * @param   array  $settings  Array of settings required
	 *
	 * @throws RuntimeException
	 * @since  3.3.0
	 * @return array
	 */
	public static function propertySettingDates(array $settings): array
	{
		$db    = KrFactory::getDatabase();
		$query = $db->getQuery(true);

		$query->select('GREATEST(MAX(' . $db->qn('s.created_at') . '), MAX(' . $db->qn('s.updated_at') . '))  as '
			. $db->qn('maxdate'))
		      ->select($db->qn('s.property_id'))
		      ->from($db->qn('#__knowres_property_setting', 's'));

		$conditions = [];
		foreach ($settings as $s)
		{
			$conditions[] = $db->qn('s.akey') . ' = ' . $db->q($s);
		}

		$query->where(implode(' OR ', $conditions))
		      ->group($db->qn('property_id'));

		$db->setQuery($query);

		return $db->loadAssocList('property_id');
	}

	/**
	 * Get one setting for a subset of properties
	 *
	 * @param   string  $akey  Value for akey
	 *
	 * @throws RuntimeException
	 * @throws RuntimeException
	 * @since  1.0.0
	 * @return array
	 */
	public function getOneSetting(string $akey): array
	{
		$settings = [];

		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$query->select($db->qn(array('a.property_id', 'a.value')))
		      ->from($db->qn('#__knowres_property_setting', 'a'))
		      ->where($db->qn('a.akey') . '=' . $db->q($akey))
		      ->order($db->qn('a.property_id'));

		$db->setQuery($query);
		$items = $db->loadObjectList();

		if (is_countable($items))
		{
			foreach ($items as $item)
			{
				$settings[$item->property_id] = $item->value;
			}
		}

		return $settings;
	}

	/**
	 * Get the settings for a property
	 *
	 * @param  ?int     $property_id  ID of property (can be 0)
	 * @param  ?string  $akey         Setting value
	 *
	 * @throws RuntimeException
	 * @since  1.0.0
	 * @return array
	 */
	public function getPropertysettings(?int $property_id, ?string $akey = null): array
	{
		$settings = [];

		$items = $this->setPropertysettings($property_id, $akey);
		if (is_countable($items))
		{
			foreach ($items as $item)
			{
				$settings[$item->akey] = $item->value;
			}
		}

		if ($akey === 'advanceBookingsLimit')
		{
			if (!isset($settings['advanceBookingsLimit']) || !$settings['advanceBookingsLimit'])
			{
				$settings['advanceBookingsLimit'] = 365;
			}
		}

		return $settings;
	}

	/**
	 * Read the settings for a property for front end access
	 *
	 * @since  1.0.0
	 * @return array
	 */
	public function getSettings(): array
	{
		$settings = [];

		$items = parent::getItems();
		if (is_countable($items))
		{
			foreach ($items as $item)
			{
				$settings[$item->akey] = $item->value;
			}
		}

		if (!$settings['advanceBookingsLimit'])
		{
			$settings['advanceBookingsLimit'] = 365;
		}

		return $settings;
	}

	/**
	 * Build an SQL query to load the list data.
	 *
	 * @throws RuntimeException
	 * @since  1.0.0
	 * @return QueryInterface
	 */
	protected function getListQuery(): QueryInterface
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$query->select($this->getState('list.select', 'a.*'));
		$query->from($db->qn('#__knowres_property_setting', 'a'));

		$query->select($db->qn('created_by.name', 'created_by'));
		$query->join('LEFT',
			$db->qn('#__users', 'created_by') . ' ON ' . $db->qn('created_by.id') . '=' . $db->qn('a.created_by'));

		$query->select('updated_by.name AS updated_by');
		$query->join('LEFT', '#__users AS updated_by ON updated_by.id = a.updated_by');

		$filter_property_id = $this->state->get('filter.property_id');
		if ($filter_property_id)
		{
			$query->where($db->qn('a.property_id') . '=0 OR ' . $db->qn('a.property_id') . '='
				. (int) $filter_property_id);
		}
		else
		{
			$query->where($db->qn('a.property_id') . '=0');
		}

		$filter_akey = $this->state->get("filter.akey");
		if ($filter_akey)
		{
			$query->where($db->qn('a.akey') . '=' . $db->q($filter_akey));
		}

		$query->order($db->qn('a.akey'));
		$query->order($db->qn('a.property_id'));

		return $query;
	}

	/**
	 * Method to get a store id based on model configuration state.
	 * This is necessary because the model is used by the component and
	 * different modules that might need different sets of data or different
	 * ordering requirements.
	 *
	 * @param   string  $id  A prefix for the store id.
	 *
	 * @since  1.0.0
	 * @return string        A store id.
	 */
	protected function getStoreId($id = ''): string
	{
		$id .= ':' . $this->getState('filter.search');
		$id .= ':' . $this->getState('filter.state');

		return parent::getStoreId($id);
	}

	/**
	 * Method to autopopulate the model state.
	 * Note. Calling getState in this method will result in recursion.
	 *
	 * @param   null  $ordering
	 * @param   null  $direction
	 *
	 * @since 1.0.0@param   null  $direction
	 */
	protected function populateState($ordering = null, $direction = null)
	{
		$this->setState('filter.property_id',
			$this->getUserStateFromRequest($this->context . '.filter.property_id', 'filter_property_id', '', 'string'));
		$this->setState('filter.akey',
			$this->getUserStateFromRequest($this->context . '.filter.akey', 'filter_akey', '', 'string'));

		$this->setState('params', KrMethods::getParams());
	}

	/**
	 * Save the property settings to the database.
	 *
	 * @param   array  $settings     Changed settings
	 * @param   int    $property_id  ID of specific property or 0 for all
	 *
	 * @throws RuntimeException
	 * @throws Exception
	 * @since  3.3.0
	 */
	public function saveSettings(array $settings, int $property_id)
	{
		$rates_update   = false;
		$deposit_update = false;
		$bp_update      = false;

		if (is_countable($settings) && count($settings))
		{
			$db      = KrFactory::getDatabase();
			$columns = [
				'id', 'property_id', 'akey', 'value', 'created_at', 'created_by'
			];

			$rows    = [];
			$user_id = KrMethods::getUser()->get('id');

			foreach ($settings as $akey => $value)
			{
				if (!$rates_update && !str_contains($akey, 'requiredfields'))
				{
					$rates_update = true;
				}

				if (!$deposit_update && str_contains($akey, 'deposit'))
				{
					$deposit_update = true;
				}

				if (!$bp_update && ($akey == 'min_price' || $akey == 'base_price') && $value > 0)
				{
					$bp_update = true;
				}

				$row = [
					!$property_id || $value[1] ? (int) $value[1] : 0,
					$property_id,
					$db->q($akey),
					$db->q($value[0]),
					$db->q(TickTock::getTS()),
					(int) $user_id
				];

				$rows[] = $row;
			}

			if (count($rows))
			{
				foreach ($rows as &$row)
				{
					$row = implode(', ', $row);
				}

				try
				{
					$db->transactionStart();

					$query = $db->getQuery(true);
					$query->insert($db->qn('#__knowres_property_setting'))->columns($db->qn($columns))->values($rows);
					$query .= ' ON DUPLICATE KEY UPDATE ';
					$query .= $db->qn('value') . ' = VALUES(value), ';
					$query .= $db->qn('updated_at') . ' = VALUES(created_at), ';
					$query .= $db->qn('updated_by') . ' = VALUES(created_by)';

					$db->setQuery($query);
					$db->execute();

					if ($rates_update)
					{
						KrFactory::getAdminModel('servicequeue')::serviceQueueUpdate('updatePropertyRates', $property_id);
					}

					// Update beyond if min / base rates have changed and solo property
					if ($bp_update && $property_id)
					{
						KrFactory::getAdminModel('service')::beyondSettingRateUpdate($property_id);
					}

					if ($deposit_update)
					{
						if ($property_id)
						{
							KrFactory::getAdminModel('servicequeue')::serviceQueueUpdate('updateProperty', $property_id);
							KrFactory::getAdminModel('servicequeue')::serviceQueueUpdate('updatePropertyRates', $property_id);
						}
						else
						{
							KrFactory::getAdminModel('servicequeue')::serviceQueueUpdate('updateProperty');
						}
					}

					$db->transactionCommit();

					KrMethods::message(KrMethods::plain('COM_KNOWRES_ACTION_SUCCESS'));
				}
				catch (Exception $e)
				{
					$db->transactionRollback();

					throw new $e;
				}
			}
		}
	}

	/**
	 * Get the settings
	 *
	 * @param  ?int     $property_id  ID of property
	 * @param  ?string  $akey         setting key
	 *
	 * @throws RuntimeException
	 * @since  1.0.0
	 * @return array
	 */
	protected function setPropertysettings(?int $property_id, ?string $akey): array
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$query->select($this->getState('list.select', 'a.*'));
		$query->from($db->qn('#__knowres_property_setting', 'a'));

		$query->select('created_by.name AS created_by');
		$query->join('LEFT', '#__users AS created_by ON created_by.id = a.created_by');
		$query->select('updated_by.name AS updated_by');
		$query->join('LEFT', '#__users AS updated_by ON updated_by.id = a.updated_by');

		if ($property_id)
		{
			$query->where('(' . $db->qn('a.property_id') . '=0 OR ' . $db->qn('a.property_id') . '=' . $property_id
				. ')');
		}
		else
		{
			$query->where($db->qn('a.property_id') . '=0');
		}

		if (!is_null($akey))
		{
			$query->where($db->qn('a.akey') . '=' . $db->q($akey));
		}

		$query->order($db->qn('a.akey'));
		$query->order($db->qn('a.property_id'));

		$db->setQuery($query);

		return $db->loadObjectList();
	}
}