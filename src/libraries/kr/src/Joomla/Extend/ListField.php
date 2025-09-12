<?php
/**
 * @package     Know Reservations (Knowres)
 * @subpackage  Library
 * @copyright   Copyright (c) 2020, Highland Vision. All rights reserved.
 * @license     See the file LICENSE.txt for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\KR\Joomla\Extend;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Framework\KrFactory;
use InvalidArgumentException;
use Joomla\CMS\Form\Form;
use RuntimeException;

use function defined;
use function is_null;

/**
 * Generic filter functions
 *
 * @since  3.3.0
 */
class ListField extends \Joomla\CMS\Form\Field\ListField
{
	/**
	 * Filter manager for Contracts
	 *
	 * @throws RuntimeException
	 * @throws InvalidArgumentException
	 * @since  3.3.0
	 * @return mixed
	 */
	public static function filterManager(): mixed
	{
		$db    = KrFactory::getDatabase();
		$query = $db->getQuery(true);

		$query->select($db->qn('m.id', 'value'))
		      ->select($db->qn('u.name', 'text'))
		      ->from($db->qn('#__users', 'u'))
		      ->join('', $db->qn('#__knowres_manager', 'm') . 'ON' . $db->qn('u.id') . '=' . $db->qn('m.user_id'))
		      ->join('INNER',
			      $db->qn('#__knowres_contract', 'c') . 'ON' . $db->qn('m.id') . '=' . $db->qn('c.manager_id'))
		      ->group($db->qn('value'))
		      ->group($db->qn('text'))
		      ->order($db->qn('text'));

		$db->setQuery($query);

		return $db->loadObjectList();
	}

	/**
	 * Filter service method
	 *
	 * @param  string  $table  Filter table
	 *
	 * @throws RuntimeException|InvalidArgumentException
	 * @since  3.3.0
	 * @return mixed
	 */
	public static function filterMethod(string $table): mixed
	{
		$db    = KrFactory::getDatabase();
		$query = $db->getQuery(true);

		$query->select(' IF (m.method = "", "availability", ' . $db->qn('m.method') . ') AS ' . $db->qn('value'))
		      ->select(' IF (m.method = "", "availability", ' . $db->qn('m.method') . ') AS ' . $db->qn('text'))
		      ->from($db->qn($table, 'm'))
		      ->group($db->qn('method'))
		      ->order($db->qn('method'));

		$db->setQuery($query);

		return $db->loadObjectList();
	}

	/**
	 * Filter region for Contracts
	 *
	 * @throws RuntimeException
	 * @throws InvalidArgumentException
	 * @since  3.3.0
	 * @return mixed
	 */
	public static function filterRegionJoin(): mixed
	{
		$region_id = 'region_id';

		$db    = KrFactory::getDatabase();
		$query = $db->getQuery(true);

		$query->select($db->qn('region_id', 'id'))
		      ->from($db->qn('#__knowres_property', 'p'))
		      ->join('INNER',
			      $db->qn('#__knowres_contract', 'c') . 'ON' . $db->qn('c.property_id') . '=' . $db->qn('p.id'))
		      ->group($db->qn($region_id));

		$db->setQuery($query);

		return $db->loadObjectList();
	}

	/**
	 * Get filters for listing pages
	 *
	 * @param  string  $table  Table name
	 * @param  string  $id     Name of ID field
	 * @param  string  $name   Name of description field
	 * @param  mixed   $state  Comma separated list of state options or one state
	 *
	 * @throws Exception
	 * @throws RuntimeException
	 * @since  3.3.0
	 * @return mixed
	 */
	public static function filtering(string $table, string $id = 'id', string $name = 'name',
		mixed $state = 1): mixed
	{
		$db    = KrFactory::getDatabase();
		$query = $db->getQuery(true);

		$query->select($db->qn($id, 'value'))
		      ->select($db->qn($name, 'text'))
		      ->from($db->qn($table));

		if (!is_null($state))
		{
			if (mb_strpos($state, ',') === false)
			{
				$query->where($db->qn('state') . '=' . (int) $state);
			}
			else
			{
				$query->where($db->qn('state') . 'IN (' . $state . ')');
			}
		}

		$query->group($db->qn($id))
		      ->order($db->qn($name));

		$db->setQuery($query);

		return $db->loadObjectList();
	}

	/**
	 * Get filters for listing pages that require a join
	 *
	 * @param  string   $table          Table name
	 * @param  string   $foreign_table  Foreign table name
	 * @param  string   $foreign_field  Foreign column name
	 * @param  string   $id             Name of ID field
	 * @param  ?string  $name           Name of description field
	 * @param  mixed    $state          Comma separated list of state options or null
	 *
	 * @throws Exception
	 * @throws RuntimeException
	 * @since  3.3.0
	 * @return mixed
	 */
	public static function filteringForeign(string $table, string $foreign_table, string $foreign_field,
		string $id = 'id', ?string $name = 'name', mixed $state = 1): mixed
	{
		$id = 'a.' . $id;
		if (!is_null($name))
		{
			$name = 'a.' . $name;
		}

		$db    = KrFactory::getDatabase();
		$query = $db->getQuery(true);

		if (!is_null($name))
		{
			$query->select($db->qn($id, 'value'));
			$query->select($db->qn($name, 'text'));
		}
		else
		{
			$query->select($db->qn($id, 'id'));
		}

		$query->from($db->qn($table, 'a'))
		      ->join('INNER',
			      $db->qn($foreign_table, 'f') . ' ON ' . $db->qn($id) . '=' . $db->qn('f.' . $foreign_field))
		      ->where($db->qn('f.' . $foreign_field) . '>' . $db->q(''));

		if (!is_null($state))
		{
			if (is_numeric($state))
			{
				$query->where($db->qn('f.state') . '=' . (int) $state);
			}
			else if (strlen($state) && $state != '*')
			{
				$query->where($db->qn('f.state') . 'IN (' . $state . ')');
			}
		}

		$query->group($db->qn($id));

		if (!is_null($name))
		{
			$query->order($db->qn($name));
		}

		$db->setQuery($query);

		return $db->loadObjectList();
	}

	/**
	 * Get value for state
	 *
	 * @param  Form  $form  The form object
	 *
	 * @since  3.3.0
	 * @return mixed
	 */
	public static function getState(Form $form): mixed
	{
		if (isset($form->getData()->get('filter', [])->state))
		{
			$state = $form->getData()->get('filter', [])->state;
			if ($state == '')
			{
				$state = 1;
			}
		}
		else
		{
			$state = null;
		}

		return $state;
	}

	/**
	 * Get property filter for translations
	 *
	 * @throws RuntimeException
	 * @throws InvalidArgumentException
	 * @since  3.3.0
	 * @return mixed
	 */
	public static function getTranslationsPropertyFilter(): mixed
	{
		$db    = KrFactory::getDatabase();
		$query = $db->getQuery(true);

		$query->select($db->qn('t.item_id', 'value'))
		      ->select($db->qn('p.property_name', 'text'))
		      ->from($db->qn('#__knowres_translation', 't'))
		      ->join('INNER',
			      $db->qn('#__knowres_property', 'p') . 'ON' . $db->qn('t.item_id') . '=' . $db->qn('p.id'))
		      ->where($db->qn('t.item') . '=' . $db->q('property'))
		      ->group($db->qn('item_id'))
		      ->group($db->qn('property_name'))
		      ->order($db->qn('property_name'));

		$db->setQuery($query);

		return $db->loadObjectList();
	}

	/**
	 * Set fields for property model filter
	 *
	 * @since   3.2.0
	 * @return array
	 */
	public static function setPropertyFilterFields(): array
	{
		return [
			'id', 'a.id',
			'property_name', 'a.property_name',
			'property_region', 'a.property_region',
			'country_id', 'a.country_id',
			'area', 'a.area',
			'stars', 'a.stars',
			'type_id', 'a.type_id',
			'categories', 'a.categories',
			'sleeps', 'a.sleeps',
			'sleeps_extra', 'a.sleeps_extra',
			'bedrooms', 'a.bedrooms',
			'bathrooms', 'a.bathrooms',
			'wc', 'a.wc',
			'quote', 'a.quote',
			'region_id', 'a.region_id',
			'booking_type', 'a.booking_type',
			'owner_id', 'a.owner_id',
			'ordering', 'a.ordering',
			'state', 'a.state',
			'allsleeps', 'a.allsleeps',
			'region_name', 'type_name',
		];
	}

	/**
	 * Get the field data attributes.
	 *
	 * @since  4.0.0
	 * @return array    The field input markup.
	 */
	protected function setDataAttributes(): array
	{
		$attributes               = [];
		$attributes['data-task']  = $this->getAttribute('task', '');
		$attributes['data-class'] = $this->getAttribute('class', '');

		if (!empty($this->getAttribute('target')))
		{
			$attributes['data-target'] = $this->getAttribute('target');
		}
		if (!empty($this->getAttribute('ajaxname')))
		{
			$attributes['data-ajaxname'] = $this->getAttribute('ajaxname');
		}

		return $attributes;
	}
}