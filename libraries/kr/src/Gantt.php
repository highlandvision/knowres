<?php
/**
 * @package     Know Reservations
 * @subpackage  Admin Model
 * @copyright   Copyright (c) 2020, Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\KR;

use Exception;
use HighlandVision\KR\Framework\KrMethods;

use RuntimeException;

use function implode;

defined('_JEXEC') or die;

/**
 * Get bookings data for gantt claendar (multiple properties)
 *
 * @since 3.3.0
 */
class Gantt
{
	/**
	 * Prepare data for the gantt calendar from properties and bookings
	 *
	 * @param  array  $properties  Property data
	 * @param  array  $booked      Booked dates
	 * @param  bool   $allow       User can make a booking
	 *
	 * @throws Exception
	 * @since  3.3.0
	 * @return array
	 */
	public function prepareData(array $properties, array $booked, bool $allow): array
	{
		$index        = 0;
		$data         = [];
		$Translations = new Translations();
		$options      = $this->propertyOptions($properties, $Translations);

		foreach ($properties as $p)
		{
			$found  = true;
			$values = [];

			while ($found)
			{
				if (isset($booked[$index]) && $booked[$index]['property_name'] === $p->property_name)
				{
					$values[] = $this->setOneBlock($booked[$index]);
					$index++;

					if (isset($booked[$index]['firstname']))
					{
						$options[] = [
							'type'          => 'guest',
							'icon'          => 'fas fa-calendar-alt',
							'name'          => $booked[$index]['firstname'] . ' ' . $booked[$index]['surname'],
							'arrival'       => TickTock::displayDate($booked[$index]['arrival']),
							'arrival_ymd'   => $booked[$index]['arrival'],
							'property_name' => $booked[$index]['property_name'],
							'id'            => $booked[$index]['id']
						];
					}
				}
				else
				{
					$found = false;
					$link  = $p->property_name . ', ' . $Translations->getText('region', $p->region_id);

					$p = ['id'            => $p->id,
					      'property_name' => $p->property_name,
					      'bookme'        => $allow,
					      'name'          => '<a href="'
						      . KrMethods::route('index.php?option=com_knowres&task=property.dashboard&id=' . $p->id,
							      false) . '">' . $link . '</a>',
					      'values'        => $values
					];

					$data[] = $p;
				}
			}
		}

		$wrapper            = [];
		$wrapper['booked']  = $data;
		$wrapper['options'] = $options;

		return $wrapper;
	}

	/**
	 * Prepare the properties for gantt data
	 *
	 * @param  array         $properties    Properties for display
	 * @param  Translations  $Translations  Translations object
	 *
	 * @throws RuntimeException
	 * @since  3.3.0
	 * @return array Formatted property options
	 */
	protected function propertyOptions(array $properties, Translations $Translations): array
	{
		$rids = [];

		foreach ($properties as $p)
		{
			$rids[$p->region_id][] = $p->id;
			$options[]             = [
				'type'   => 'property',
				'icon'   => 'fas fa-home',
				'name'   => $p->property_name,
				'region' => $Translations->getText('region', $p->region_id),
				'id'     => $p->id
			];
		}

		foreach ($rids as $k => $v)
		{
			$options[] = array(
				'type' => 'region',
				'icon' => 'fas fa-map-marker',
				'name' => $Translations->getText('region', $k),
				'id'   => $v
			);
		}

		return $options;
	}

	/**
	 * Set data for one block
	 *
	 * @param  array  $r  Contract data
	 *
	 * @throws Exception
	 * @since 3.3.0
	 * @return array
	 */
	protected function setOneBlock(array $r): array
	{
		$customClass = 'ganttBook';
		if ((int) $r['black_booking'] == 1)
		{
			$customClass = 'ganttBlack';
		}
		else if ((int) $r['black_booking'] == 2)
		{
			$customClass = 'ganttGrey';
		}
		else if ((int) $r['booking_status'] < 10)
		{
			$customClass = 'ganttProv';
		}

		$tmp = [];
		if ($r['agent_name'])
		{
			$tmp[] = $r['agent_name'];
		}
		else if ($r['service_name'])
		{
			$tmp[] = $r['service_name'];
		}

		if ((int) $r['black_booking'] == 2)
		{
			$tmp[] = KrMethods::plain('COM_KNOWRES_GANTT_MANUAL_ICAL');
		}
		else if ((int) $r['black_booking'] == 1)
		{
			$tmp[] = KrMethods::plain('COM_KNOWRES_BLOCKED');
		}
		else
		{
			$tmp[] = $r['firstname'] . ' ' . $r['surname'];
		}

		$days = TickTock::differenceDays($r['arrival'], $r['departure']);

		return array(
			'id'          => $r['id'],
			'arrive'      => $r['arrival'],
			'depart'      => $r['departure'],
			'days'        => $days,
			'customClass' => $customClass,
			'label'       => implode(' ', $tmp),
			'property'    => $r['property_name']
		);
	}
}