<?php
/**
 * @package     Know Reservations
 * @subpackage  Library
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

/** @noinspection PhpPossiblePolymorphicInvocationInspection */

namespace HighlandVision\KR\Upgrade;

defined('_JEXEC') or die;

if (!defined('KRFRAMEWORK')) {
	define('KRFRAMEWORK', 'Joomla');
}

use Exception;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\TickTock;
use HighlandVision\KR\Translations;
use HighlandVision\KR\Utility;
use InvalidArgumentException;
use Joomla\CMS\Table\ContentType;
use Joomla\CMS\Table\Table;
use Joomla\Database\Exception\QueryTypeAlreadyDefinedException;
use RuntimeException;
use stdClass;
use UnexpectedValueException;

use function count;
use function defined;
use function explode;
use function implode;

/**
 * Helper upgrade install scripts
 *
 * @since   2.4.0
 */
class Upgrade
{
	/**
	 * Delete old translations
	 *
	 * @throws QueryTypeAlreadyDefinedException
	 * @throws InvalidArgumentException
	 * @throws RuntimeException
	 */
	public static function deleteOldData(): void
	{
		$db    = KrFactory::getDatabase();
		$query = $db->getQuery(true);

		$conditions = [
			$db->qn('item') . '=' . $db->q('propertyfeature'),
			$db->qn('field') . '=' . $db->q('abbreviation'),
		];
		$query->delete($db->qn('#__knowres_translation'));
		$query->where($conditions);
		$db->setQuery($query);
		$db->execute();

		$query      = $db->getQuery(true);
		$conditions = [
			$db->qn('item') . '=' . $db->q('type'),
			$db->qn('field') . '=' . $db->q('abbreviation'),
		];
		$query->delete($db->qn('#__knowres_translation'));
		$query->where($conditions);
		$db->setQuery($query);
		$db->execute();

		KrMethods::cleanCache('com_knowres_propertyfeature');
		KrMethods::cleanCache('com_knowres_type');
	}

	/**
	 * Create the data for tables using Content History
	 *
	 * @throws InvalidArgumentException
	 * @throws RuntimeException
	 * @throws UnexpectedValueException
	 * @throws Exception
	 * @since  2.4.0
	 */
	public static function historyTables(): void
	{
		Table::addIncludePath(JPATH_ADMINISTRATOR . '/components/com_knowres/tables');

		$tables = [
			'agency',
			'agent',
			'category',
			'cluster',
			'contractguestdata',
			'country',
			'coupon',
			'currency',
			'discount',
			'emailtemplate',
			'emailtrigger',
			'exchangerate',
			'extra',
			'guest',
			'image',
			'service',
			'servicequeue',
			'servicexref',
			'manager',
			'mapcategory',
			'mapmarker',
			'owner',
			'property',
			'propertyfeature',
			'propertyfield',
			'propertyical',
			'propertyoption',
			'propertyroom',
			'propertysetting',
			'rate',
			'ratemarkup',
			'region',
			'review',
			'season',
			'tax',
			'taxrate',
			'town',
			'translation',
			'type'
		];

		foreach ($tables as $name) {
			$table = KrFactory::getAdminModel($name)->getTable();
			$text  = 'COM_KNOWRES_TITLE_' . strtoupper($name);
			$title = KrMethods::plain($text);
			$alias = 'com_knowres.' . $name;
			self::historyUpdate($table, $name, $title, $alias);
		}
	}

	/**
	 * Import Features
	 *
	 * @throws RuntimeException
	 * @throws Exception
	 * @since  2.4.0
	 */
	public static function importFeatures(): void
	{
		$db    = KrFactory::getDatabase();
		$query = $db->getQuery(true);
		$query->select($db->qn(['id', 'generic']))
			->from($db->qn('#__knowres_property_feature'))
			->where($db->qn('id') . '>=' . 10000);

		$db->setQuery($query);
		$rows = $db->loadObjectList();

		if (count($rows)) {
			// Got some custom features so don't need to do anything
			return;
		}

		//Update any existing features to id + 10000
		self::updateFeatures();

		// Check for generic features
		$query = $db->getQuery(true);
		$query->select($db->qn(array('id', 'generic')))
			->from($db->qn('#__knowres_property_feature'))
			->where($db->qn('generic') . '<> ""');

		$db->setQuery($query);
		$rows = $db->loadObjectList();
		if (count($rows)) {
			// got some generic so don't need to add
			return;
		}

		echo '<p>Installing features</p>';
		$knowres_property_feature = array(
			array(
				'id'        => '1',
				'name'      => 'Air Conditioning',
				'room_type' => array(
					'property',
					'living',
					'bedroom'
				),
				'generic'   => 'air conditioning'
			),
			array(
				'id'        => '2',
				'name'      => 'Airport Transfer',
				'room_type' => array('property'),
				'generic'   => 'airport pick-up service'
			),
			array(
				'id'        => '3',
				'name'      => 'Baby Listening Device',
				'room_type' => array('property'),
				'generic'   => 'baby listening device'
			),
			array(
				'id'        => '4',
				'name'      => 'Balcony (small)',
				'room_type' => array('property'),
				'generic'   => 'small balcony'
			),
			array(
				'id'        => '5',
				'name'      => 'Bathroom Grab Bars',
				'room_type' => array('property'),
				'generic'   => 'bathroom grab bars'
			),
			array(
				'id'        => '6',
				'name'      => 'BBQ',
				'room_type' => array('property'),
				'generic'   => 'bbq'
			),
			array(
				'id'        => '7',
				'name'      => 'Beach View',
				'room_type' => array('property'),
				'generic'   => 'beach view'
			),
			array(
				'id'        => '8',
				'name'      => 'Bed Linen Included',
				'room_type' => array('property'),
				'generic'   => 'bed linen included'
			),
			array(
				'id'        => '9',
				'name'      => 'Billiard / Pool Table',
				'room_type' => array('property'),
				'generic'   => 'billiard table'
			),
			array(
				'id'        => '10',
				'name'      => 'Business Centre',
				'room_type' => array('property'),
				'generic'   => 'business centre'
			),
			array(
				'id'        => '11',
				'name'      => 'Canal View',
				'room_type' => array('property'),
				'generic'   => 'canal view'
			),
			array(
				'id'        => '12',
				'name'      => 'Cell Phone Rentals',
				'room_type' => array('property'),
				'generic'   => 'cell phone rentals'
			),
			array(
				'id'        => '13',
				'name'      => 'Cleaning Weekly (free)',
				'room_type' => array('property'),
				'generic'   => 'free weekly cleaning'
			),
			array(
				'id'        => '14',
				'name'      => 'Central Heating',
				'room_type' => array('property'),
				'generic'   => 'central heating'
			),
			array(
				'id'        => '15',
				'name'      => 'Concierge',
				'room_type' => array('property'),
				'generic'   => 'concierge'
			),
			array(
				'id'        => '16',
				'name'      => 'Conference Facilities',
				'room_type' => array('property'),
				'generic'   => 'conference facilites'
			),
			array(
				'id'        => '17',
				'name'      => 'Cot / Crib (extra charge)',
				'room_type' => array('property'),
				'generic'   => 'cot extra charge'
			),
			array(
				'id'        => '18',
				'name'      => 'Cot / Crib (free on request)',
				'room_type' => array('property'),
				'generic'   => 'cot free on request'
			),
			array(
				'id'        => '19',
				'name'      => 'Cot / Crib (free)',
				'room_type' => array('property'),
				'generic'   => 'cot free'
			),
			array(
				'id'        => '20',
				'name'      => 'Courtyard',
				'room_type' => array('property'),
				'generic'   => 'courtyard'
			),
			array(
				'id'        => '21',
				'name'      => 'Dishwasher',
				'room_type' => array(
					'property',
					'kitchen'
				),
				'generic'   => 'dishwasher'
			),
			array(
				'id'        => '22',
				'name'      => 'Doctor on Call',
				'room_type' => array('property'),
				'generic'   => 'doctor on call'
			),
			array(
				'id'        => '23',
				'name'      => 'DVD Player',
				'room_type' => array(
					'property',
					'living'
				),
				'generic'   => 'dvd'
			),
			array(
				'id'        => '24',
				'name'      => 'Electronic Door Locks',
				'room_type' => array('property'),
				'generic'   => 'electronic door locks'
			),
			array(
				'id'        => '25',
				'name'      => 'Elevator',
				'room_type' => array('property'),
				'generic'   => 'elevator'
			),
			array(
				'id'        => '26',
				'name'      => 'Fan (ceiling)',
				'room_type' => array('property'),
				'generic'   => 'ceiling fan'
			),
			array(
				'id'        => '27',
				'name'      => 'Fans (on request)',
				'room_type' => array('property'),
				'generic'   => 'fans on request'
			),
			array(
				'id'        => '28',
				'name'      => 'Fireplace',
				'room_type' => array(
					'property',
					'living',
					'bedroom'
				),
				'generic'   => 'fireplace'
			),
			array(
				'id'        => '29',
				'name'      => 'Fireplace Wood Burning',
				'room_type' => array('property'),
				'generic'   => 'wood burning fireplace'
			),
			array(
				'id'        => '30',
				'name'      => 'Fitness Room',
				'room_type' => array('property'),
				'generic'   => 'fitness room'
			),
			array(
				'id'        => '31',
				'name'      => 'Freezer',
				'room_type' => array('property'),
				'generic'   => 'freezer'
			),
			array(
				'id'        => '32',
				'name'      => 'Fridge Freezer',
				'room_type' => array(
					'property',
					'kitchen'
				),
				'generic'   => 'fridge freezer'
			),
			array(
				'id'        => '33',
				'name'      => 'Games Room',
				'room_type' => array('property'),
				'generic'   => 'games room'
			),
			array(
				'id'        => '34',
				'name'      => 'Garden (shared)',
				'room_type' => array('property'),
				'generic'   => 'garden shared'
			),
			array(
				'id'        => '35',
				'name'      => 'Garden (private)',
				'room_type' => array('property'),
				'generic'   => 'garden private'
			),
			array(
				'id'        => '36',
				'name'      => 'Gym',
				'room_type' => array('property'),
				'generic'   => 'gym for guest use'
			),
			array(
				'id'        => '37',
				'name'      => 'Hair Dryer',
				'room_type' => 'property,bathroom',
				'generic'   => 'hair dryer'
			),
			array(
				'id'        => '38',
				'name'      => 'Health Club',
				'room_type' => array('property'),
				'generic'   => 'health club'
			),
			array(
				'id'        => '39',
				'name'      => 'Help Desk',
				'room_type' => array('property'),
				'generic'   => 'help desk'
			),
			array(
				'id'        => '40',
				'name'      => 'Hi-fi',
				'room_type' => array('property'),
				'generic'   => 'stereo'
			),
			array(
				'id'        => '41',
				'name'      => 'High Chair',
				'room_type' => array('property'),
				'generic'   => 'high chair'
			),
			array(
				'id'        => '42',
				'name'      => 'Hot Tub (shared)',
				'room_type' => array('property'),
				'generic'   => 'hot tub shared'
			),
			array(
				'id'        => '43',
				'name'      => 'Hot Tub (private)',
				'room_type' => array('property'),
				'generic'   => 'hot tub private'
			),
			array(
				'id'        => '44',
				'name'      => 'Internet Access (free)',
				'room_type' => array('property'),
				'generic'   => 'internet access free'
			),
			array(
				'id'        => '45',
				'name'      => 'Internet Access (high speed)',
				'room_type' => array('property'),
				'generic'   => 'internet access high speed'
			),
			array(
				'id'        => '46',
				'name'      => 'Internet Cable (extra charge)',
				'room_type' => array('property'),
				'generic'   => 'internet cable paid'
			),
			array(
				'id'        => '47',
				'name'      => 'Internet Cable (free)',
				'room_type' => array('property'),
				'generic'   => 'internet cable free'
			),
			array(
				'id'        => '48',
				'name'      => 'Internet Connection',
				'room_type' => array('property'),
				'generic'   => 'internet connection'
			),
			array(
				'id'        => '49',
				'name'      => 'Internet WiFi (extra charge)',
				'room_type' => array('property'),
				'generic'   => 'internet wifi paid'
			),
			array(
				'id'        => '50',
				'name'      => 'Internet Wifi (free )',
				'room_type' => array('property'),
				'generic'   => 'internet wifi free'
			),
			array(
				'id'        => '51',
				'name'      => 'Iron',
				'room_type' => array('property'),
				'generic'   => 'iron'
			),
			array(
				'id'        => '52',
				'name'      => 'Iron & Board',
				'room_type' => array('property'),
				'generic'   => 'iron and board'
			),
			array(
				'id'        => '53',
				'name'      => 'Ironing Board',
				'room_type' => array('property'),
				'generic'   => 'ironing board'
			),
			array(
				'id'        => '54',
				'name'      => 'Laundry (shared)',
				'room_type' => array('property'),
				'generic'   => 'laundry shared'
			),
			array(
				'id'        => '55',
				'name'      => 'Laundry (private)',
				'room_type' => array('property'),
				'generic'   => 'laundry private'
			),
			array(
				'id'        => '56',
				'name'      => 'Lounge',
				'room_type' => array('property'),
				'generic'   => 'lounge'
			),
			array(
				'id'        => '57',
				'name'      => 'Luggage Storage Facilities',
				'room_type' => array('property'),
				'generic'   => 'luggage storage facilities'
			),
			array(
				'id'        => '58',
				'name'      => 'Weekly Maid Service',
				'room_type' => array('property'),
				'generic'   => 'weekly maid service'
			),
			array(
				'id'        => '59',
				'name'      => 'Maid Service',
				'room_type' => array('property'),
				'generic'   => 'maid service'
			),
			array(
				'id'        => '60',
				'name'      => 'Ocean View',
				'room_type' => array('property'),
				'generic'   => 'ocean view'
			),
			array(
				'id'        => '61',
				'name'      => 'Parking Free',
				'room_type' => array('property'),
				'generic'   => 'parking free'
			),
			array(
				'id'        => '62',
				'name'      => 'Parking Guarded',
				'room_type' => array('property'),
				'generic'   => 'parking guarded'
			),
			array(
				'id'        => '63',
				'name'      => 'Parking On Street ',
				'room_type' => array('property'),
				'generic'   => 'parking on street'
			),
			array(
				'id'        => '64',
				'name'      => 'Parking Private',
				'room_type' => array('property'),
				'generic'   => 'parking private'
			),
			array(
				'id'        => '65',
				'name'      => 'Parking Underground',
				'room_type' => array('property'),
				'generic'   => 'underground parking'
			),
			array(
				'id'        => '66',
				'name'      => 'Pets Not Allowed',
				'room_type' => array('property'),
				'generic'   => 'pets not allowed'
			),
			array(
				'id'        => '67',
				'name'      => 'Pets Welcome',
				'room_type' => array('property'),
				'generic'   => 'pets welcome'
			),
			array(
				'id'        => '68',
				'name'      => 'Safe',
				'room_type' => array('property'),
				'generic'   => 'safe',
			),
			array(
				'id'        => '69',
				'name'      => 'Sauna',
				'room_type' => array('property'),
				'generic'   => 'sauna'
			),
			array(
				'id'        => '70',
				'name'      => 'Sea View',
				'room_type' => array('property'),
				'generic'   => 'sea view'
			),
			array(
				'id'        => '71',
				'name'      => 'Smoking Permitted',
				'room_type' => array('property'),
				'generic'   => 'smoking permitted'
			),
			array(
				'id'        => '72',
				'name'      => 'Steam Bath',
				'room_type' => array('property'),
				'generic'   => 'steam bath'
			),
			array(
				'id'        => '73',
				'name'      => 'Steam Room',
				'room_type' => array('property'),
				'generic'   => 'steam room'
			),
			array(
				'id'        => '74',
				'name'      => 'Swimming Pool',
				'room_type' => array('property'),
				'generic'   => 'swimming pool'
			),
			array(
				'id'        => '75',
				'name'      => 'Swimming Pool (Heated )',
				'room_type' => array('property'),
				'generic'   => 'swimming pool heated'
			),
			array(
				'id'        => '76',
				'name'      => 'Swimming Pool (indoor )',
				'room_type' => array('property'),
				'generic'   => 'swimming pool indoor'
			),
			array(
				'id'        => '77',
				'name'      => 'Telephone',
				'room_type' => array('property'),
				'generic'   => 'telephone'
			),
			array(
				'id'        => '78',
				'name'      => 'Telephone (free local calls)',
				'room_type' => array('property'),
				'generic'   => 'telephone free local calls'
			),
			array(
				'id'        => '79',
				'name'      => 'Tennis Court',
				'room_type' => array('property'),
				'generic'   => 'tennis court'
			),
			array(
				'id'        => '80',
				'name'      => 'Terrace',
				'room_type' => array('property'),
				'generic'   => 'terrace'
			),
			array(
				'id'        => '81',
				'name'      => 'Toiletries',
				'room_type' => array(
					'property',
					'bathroom'
				),
				'generic'   => 'toiletries'
			),
			array(
				'id'        => '82',
				'name'      => 'Towels Included',
				'room_type' => array('property'),
				'generic'   => 'towels included'
			),
			array(
				'id'        => '83',
				'name'      => 'TV (cable)',
				'room_type' => array('property'),
				'generic'   => 'tv cable'
			),
			array(
				'id'        => '84',
				'name'      => 'TV (local channels only)',
				'room_type' => array('property'),
				'generic'   => 'tv local channels only'
			),
			array(
				'id'        => '85',
				'name'      => 'TV (satellite)',
				'room_type' => array('property'),
				'generic'   => 'tv satellite'
			),
			array(
				'id'        => '86',
				'name'      => 'Vacuum Cleaner',
				'room_type' => array('property'),
				'generic'   => 'vacuum cleaner'
			),
			array(
				'id'        => '87',
				'name'      => 'Washing Machine',
				'room_type' => 'property,bathroom,kitchen',
				'generic'   => 'washing machine'
			),
			array(
				'id'        => '88',
				'name'      => 'Washer Dryer',
				'room_type' => array(
					'property',
					'bathroom',
					'kitchen'
				),
				'generic'   => 'washer dryer'
			),
			array(
				'id'        => '89',
				'name'      => 'Video Game System',
				'room_type' => array('property'),
				'generic'   => 'video game system'
			),
			array(
				'id'        => '90',
				'name'      => 'Wheelchair Access',
				'room_type' => array('property'),
				'generic'   => 'wheelchair access'
			),
			array(
				'id'        => '91',
				'name'      => 'Laundry Service',
				'room_type' => array('property'),
				'generic'   => 'laundry service'
			),
			array(
				'id'        => '92',
				'name'      => 'Parking',
				'room_type' => array('property'),
				'generic'   => 'parking'
			),
			array(
				'id'        => '93',
				'name'      => 'Near the Beach',
				'room_type' => array('property'),
				'generic'   => 'beach'
			),
			array(
				'id'        => '94',
				'name'      => 'No Smoking',
				'room_type' => array('property'),
				'generic'   => 'no smoking rooms/facilities'
			), // Non-general
			array(
				'id'        => '1001',
				'name'      => 'Alarm Clock',
				'room_type' => array('bedroom'),
				'generic'   => 'alarm clock'
			),
			array(
				'id'        => '1002',
				'name'      => 'Armchair',
				'room_type' => array(
					'living',
					'bedroom'
				),
				'generic'   => 'armchair'
			),
			array(
				'id'        => '1003',
				'name'      => 'Balcony',
				'room_type' => 'living,bedroom',
				'generic'   => 'balcony'
			),
			array(
				'id'        => '1004',
				'name'      => 'Bathtub',
				'room_type' => array('bathroom'),
				'generic'   => 'bathtub'
			),
			array(
				'id'        => '1005',
				'name'      => 'Bed Double',
				'room_type' => array(
					'living',
					'bedroom'
				),
				'generic'   => 'double bed'
			),
			array(
				'id'        => '1006',
				'name'      => 'Bed King',
				'room_type' => array(
					'living',
					'bedroom'
				),
				'generic'   => 'king size bed'
			),
			array(
				'id'        => '1007',
				'name'      => 'Bed Queen',
				'room_type' => array(
					'living',
					'bedroom'
				),
				'generic'   => 'queen size bed'
			),
			array(
				'id'        => '1008',
				'name'      => 'Bed Single',
				'room_type' => 'living,bedroom',
				'generic'   => 'single bed'
			),
			array(
				'id'        => '1009',
				'name'      => 'Beds Bunk',
				'room_type' => 'living,bedroom',
				'generic'   => 'bunk beds'
			),
			array(
				'id'        => '1010',
				'name'      => 'Beds Twin',
				'room_type' => array(
					'living',
					'bedroom'
				),
				'generic'   => 'pair of twin beds'
			),
			array(
				'id'        => '1011',
				'name'      => 'Bedside Table',
				'room_type' => array('bedroom'),
				'generic'   => 'night table'
			),
			array(
				'id'        => '1012',
				'name'      => 'Bidet',
				'room_type' => array(
					'wc',
					'bathroom'
				),
				'generic'   => 'bidet'
			),
			array(
				'id'        => '1013',
				'name'      => 'Blender',
				'room_type' => array('kitchen'),
				'generic'   => 'blender'
			),
			array(
				'id'        => '1014',
				'name'      => 'Breakfast Bar & Stools',
				'room_type' => array('kitchen'),
				'generic'   => 'breakfast bar and stools'
			),
			array(
				'id'        => '1015',
				'name'      => 'Built In Wardrobes',
				'room_type' => array('bedroom'),
				'generic'   => 'built-in wardrobes'
			),
			array(
				'id'        => '1016',
				'name'      => 'Chair',
				'room_type' => array(
					'living',
					'bedroom'
				),
				'generic'   => 'chair'
			),
			array(
				'id'        => '1017',
				'name'      => 'Chest of Drawers',
				'room_type' => array(
					'wc',
					'bathroom',
					'bedroom'
				),
				'generic'   => 'chest of drawers'
			),
			array(
				'id'        => '1018',
				'name'      => 'Coffee Maker',
				'room_type' => 'kitchen',
				'generic'   => 'coffee maker'
			),
			array(
				'id'        => '1019',
				'name'      => 'Coffee Table',
				'room_type' => array('living'),
				'generic'   => 'coffee table'
			),
			array(
				'id'        => '1020',
				'name'      => 'Cooker / Stove',
				'room_type' => array('kitchen'),
				'generic'   => 'cooker'
			),
			array(
				'id'        => '1021',
				'name'      => 'Cookware & Utensils',
				'room_type' => array('kitchen'),
				'generic'   => 'cookware and kitchen utensils'
			),
			array(
				'id'        => '1022',
				'name'      => 'Crockery & Cutlery',
				'room_type' => array('kitchen'),
				'generic'   => 'crockery and cutlery'
			),
			array(
				'id'        => '1023',
				'name'      => 'Cupboards',
				'room_type' => array('kitchen'),
				'generic'   => 'cupboards'
			),
			array(
				'id'        => '1024',
				'name'      => 'Cupboard',
				'room_type' => array('bathroom'),
				'generic'   => 'cupboard'
			),
			array(
				'id'        => '1025',
				'name'      => 'Desk',
				'room_type' => array(
					'living',
					'bedroom'
				),
				'generic'   => 'desk'
			),
			array(
				'id'        => '1026',
				'name'      => 'Electric Kettle',
				'room_type' => array('kitchen'),
				'generic'   => 'electric kettle'
			),
			array(
				'id'        => '1027',
				'name'      => 'En Suite Bathroom',
				'room_type' => array('bedroom'),
				'generic'   => 'en suite bathroom'
			),
			array(
				'id'        => '1028',
				'name'      => 'En Suite Shower',
				'room_type' => array('bedroom'),
				'generic'   => 'en suite shower'
			),
			array(
				'id'        => '1029',
				'name'      => 'Espresso Machine',
				'room_type' => array('kitchen'),
				'generic'   => 'espresso-machine'
			),
			array(
				'id'        => '1030',
				'name'      => 'Fan',
				'room_type' => array('living'),
				'generic'   => 'fan'
			),
			array(
				'id'        => '1031',
				'name'      => 'Fridge',
				'room_type' => array('kitchen'),
				'generic'   => 'fridge'
			),
			array(
				'id'        => '1032',
				'name'      => 'Heated Towel Rail',
				'room_type' => array(
					'wc',
					'bathroom'
				),
				'generic'   => 'heated towel bar'
			),
			array(
				'id'        => '1033',
				'name'      => 'Heating',
				'room_type' => array('living'),
				'generic'   => 'heating'
			),
			array(
				'id'        => '1034',
				'name'      => 'Hob (Electric)',
				'room_type' => array('kitchen'),
				'generic'   => 'gas or electric hob'
			),
			array(
				'id'        => '1035',
				'name'      => 'Hob (Gas)',
				'room_type' => array('kitchen'),
				'generic'   => 'gas or electric hob'
			),
			array(
				'id'        => '1036',
				'name'      => 'Ice Maker',
				'room_type' => array('kitchen'),
				'generic'   => 'ice maker'
			),
			array(
				'id'        => '1037',
				'name'      => 'Jacuzzi',
				'room_type' => array('bathroom'),
				'generic'   => 'jacuzzi'
			),
			array(
				'id'        => '1038',
				'name'      => 'Kettle',
				'room_type' => array('kitchen'),
				'generic'   => 'kettle'
			),
			array(
				'id'        => '1039',
				'name'      => 'Microwave',
				'room_type' => array('kitchen'),
				'generic'   => 'microwave'
			),
			array(
				'id'        => '1040',
				'name'      => 'Mirror',
				'room_type' => array(
					'wc',
					'bathroom',
					'bedroom'
				),
				'generic'   => 'mirror'
			),
			array(
				'id'        => '1041',
				'name'      => 'Oven',
				'room_type' => array('kitchen'),
				'generic'   => 'oven'
			),
			array(
				'id'        => '1042',
				'name'      => 'Reading Lamp',
				'room_type' => array(
					'living',
					'bedroom'
				),
				'generic'   => 'reading lamp'
			),
			array(
				'id'        => '1043',
				'name'      => 'Shower',
				'room_type' => array('bathroom'),
				'generic'   => 'shower'
			),
			array(
				'id'        => '1044',
				'name'      => 'Sofa Bed (double)',
				'room_type' => 'living,bedroom',
				'generic'   => 'double sofa bed'
			),
			array(
				'id'        => '1045',
				'name'      => 'Sofa Bed (single)',
				'room_type' => array(
					'living',
					'bedroom'
				),
				'generic'   => 'sofabed'
			),
			array(
				'id'        => '1046',
				'name'      => 'Sofa (large)',
				'room_type' => array('living'),
				'generic'   => 'sofa'
			),
			array(
				'id'        => '1047',
				'name'      => 'Sofa (small)',
				'room_type' => array(
					'living',
					'bedroom'
				),
				'generic'   => 'double sofa'
			),
			array(
				'id'        => '1048',
				'name'      => 'Table',
				'room_type' => array(
					'kitchen',
					'living',
					'bedroom'
				),
				'generic'   => 'table'
			),
			array(
				'id'        => '1049',
				'name'      => 'Table Lamp',
				'room_type' => array(
					'living',
					'bedroom'
				),
				'generic'   => 'lamp'
			),
			array(
				'id'        => '1050',
				'name'      => 'Table & Chairs',
				'room_type' => array(
					'kitchen',
					'living',
					'bedroom'
				),
				'generic'   => 'table and chairs'
			),
			array(
				'id'        => '1051',
				'name'      => 'Toaster',
				'room_type' => array('kitchen'),
				'generic'   => 'toaster'
			),
			array(
				'id'        => '1052',
				'name'      => 'Toilet',
				'room_type' => array(
					'wc',
					'bathroom'
				),
				'generic'   => 'toilet'
			),
			array(
				'id'        => '1053',
				'name'      => 'TV',
				'room_type' => array(
					'living',
					'bedroom'
				),
				'generic'   => 'tv'
			),
			array(
				'id'        => '1054',
				'name'      => 'TV (flat screen)',
				'room_type' => array(
					'living',
					'bedroom'
				),
				'generic'   => 'tv'
			),
			array(
				'id'        => '1055',
				'name'      => 'Vanity Unit',
				'room_type' => array('bathroom'),
				'generic'   => 'vanity cupboard'
			),
			array(
				'id'        => '1056',
				'name'      => 'Wardrobe',
				'room_type' => array('bedroom'),
				'generic'   => 'wardrobe'
			),
			array(
				'id'        => '1057',
				'name'      => 'Washbasin',
				'room_type' => array(
					'wc',
					'bathroom'
				),
				'generic'   => 'washbasin',
			),
			array(
				'id'        => '1058',
				'name'      => 'Combo Tub Shower',
				'room_type' => array('bathroom'),
				'generic'   => 'combo tub shower'
			),
		);

		$Translations = new Translations();
		foreach ($knowres_property_feature as $r) {
			$new             = new stdClass();
			$new->id         = $r['id'];
			$new->generic    = $r['generic'];
			$new->room_type  = Utility::encodeJson($r['room_type']);
			$new->ordering   = $r['id'];
			$new->state      = 1;
			$new->created_at = TickTock::getTS();
			$new->created_by = 0;
			$new->updated_at = "0000-00-00 00:00:00";
			$new->updated_by = 0;
			$new->version    = 1;
			KrFactory::insert('property_feature', $new);

			if ($r['id'] < 1057) {
				$Translations->updateDefault('propertyfeature', $r['id'], 'name', $r['name'], false);
			} else {
				$Translations->updateDefault('propertyfeature', $r['id'], 'name', $r['name']);
			}
		}
	}

	/**
	 * Insert Agency and User for a new installation.
	 *
	 * @throws RuntimeException
	 * @throws Exception
	 * @since  1.0.0
	 */
	public static function insertDefaults(): void
	{
		$db    = KrFactory::getDatabase();
		$query = $db->getQuery(true);
		$query->select($db->qn(['id', 'name']))
			->from($db->qn('#__knowres_agency'))
			->setLimit(1);
		$db->setQuery($query);
		$rows = $db->loadObjectList();
		if (is_countable($rows) && !count($rows)) {
			$query = $db->getQuery(true);
			$query->select($db->qn('user_id'))
				->from($db->qn('#__user_usergroup_map'))
				->where($db->qn('group_id') . '=8')
				->setLimit(1);
			$db->setQuery($query);
			$user = $db->loadObject();

			$new                   = new stdClass();
			$new->id               = 1;
			$new->name             = 'Agency Name';
			$new->street           = 'Street';
			$new->town             = 'Town';
			$new->region_id        = 1064;
			$new->country_id       = 228;
			$new->ordering         = 1;
			$new->state            = 1;
			$new->checked_out      = 0;
			$new->checked_out_time = null;
			$new->created_at       = TickTock::getTS();
			$new->created_by       = $user->user_id;
			$new->updated_at       = null;
			$new->updated_by       = 0;
			$new->created_at       = TickTock::getTS();
			$new->version          = 1;
			KrFactory::insert('agency', $new);

			$new                   = new stdClass();
			$new->user_id          = $user->user_id;
			$new->properties       = '';
			$new->access_level     = 40;
			$new->apikey           = '';
			$new->agency_id        = 1;
			$new->state            = 1;
			$new->checked_out      = 0;
			$new->checked_out_time = null;
			$new->created_at       = TickTock::getTS();
			$new->created_by       = $user->user_id;
			$new->updated_at       = null;
			$new->updated_by       = 0;
			$new->version          = 1;
			KrFactory::insert('manager', $new);
		}
	}

	/**
	 * Insert settings
	 *
	 * @throws RuntimeException
	 * @throws Exception
	 * @since  2.4.0
	 */
	public static function insertSettings(): void
	{
		$db    = KrFactory::getDatabase();
		$query = $db->getQuery(true);
		$query->select($db->qn(array('id', 'akey')))
			->from($db->qn('#__knowres_property_setting'));

		$db->setQuery($query);
		$rows = $db->loadObjectList();
		if (count($rows)) {
			return;
		}

		$kr_setting = [
			[1, 'depositIsPercentage', '1'],
			[2, 'depositValue', '50'],
			[3, 'weekenddays', '0'],
			[4, 'advanceBookingsLimit', '365'],
			[6, 'defaultcountry', '228'],
			[7, 'minimuminterval', '1'],
			[8, 'mindaysbeforearrival', '1'],
			[9, 'roundupDepositYesNo', '1'],
			[10, 'chargeDepositYesNo', '1'],
			[11, 'tariffChargesStoredWeeklyYesNo', '0'],
			[12, 'bookingform_requiredfields_firstname', '1'],
			[13, 'bookingform_requiredfields_surname', '1'],
			[14, 'bookingform_requiredfields_address1', '1'],
			[16, 'bookingform_requiredfields_town', '1'],
			[17, 'bookingform_requiredfields_postcode', '0'],
			[18, 'bookingform_requiredfields_region', '1'],
			[21, 'bookingform_requiredfields_mobile', '1'],
			[23, 'use_variable_deposits', '1'],
			[24, 'variable_deposit_threashold', '90'],
			[25, 'currency', 'EUR'],
			[26, 'expiry_days', '2'],
			[27, 'longstay_days1', '0'],
			[28, 'longstay_percentage1', '100'],
			[29, 'longstay_days2', '0'],
			[30, 'longstay_percentage2', '100'],
			[31, 'longstay_days3', '0'],
			[32, 'longstay_percentage3', '100'],
			[33, 'shortstay_percentage2', '100'],
			[34, 'shortstay_percentage3', '100'],
			[35, 'shortstay_percentage4', '100'],
			[36, 'shortstay_percentage5', '100'],
			[37, 'shortstay_percentage6', '100'],
			[38, 'low_season_pc', '100'],
			[39, 'mid_season_pc', '100'],
			[40, 'high_season_pc', '100'],
			[41, 'xlow_season_pc', '100'],
			[42, 'xhigh_season_pc', '100'],
			[43, 'service_id', '0'],
			[44, 'exclude_lastminute', '1'],
			[45, 'canwebook', '0'],
			[46, 'bookingform_requiredfields_email_2', '2'],
			[47, 'bookingform_requiredfields_email_3', '2'],
			[48, 'manager_requiredfields_address1', '2'],
			[49, 'manager_requiredfields_address2', '2'],
			[51, 'manager_requiredfields_email', '1'],
			[52, 'manager_requiredfields_email_2', '2'],
			[53, 'manager_requiredfields_email_3', '2'],
			[54, 'manager_requiredfields_mobile', '2'],
			[55, 'manager_requiredfields_firstname', '1'],
			[56, 'manager_requiredfields_postcode', '2'],
			[57, 'manager_requiredfields_region', '2'],
			[58, 'manager_requiredfields_surname', '1'],
			[59, 'manager_requiredfields_telephone', '2'],
			[60, 'manager_requiredfields_town', '2'],
			[61, 'manager_requiredfields_expiry_days', '1'],
			[62, 'manager_requiredfields_balance_days', '1'],
			[63, 'manager_requiredfields_net_price', '0'],
			[64, 'special_tag', '0'],
			[65, 'balance_days', '0'],
			[67, 'managed_rates', '0'],
			[68, 'net_rates', '0'],
			[69, 'net_markup', '15'],
			[72, 'cluster', '0'],
			[73, 'default_manager', '1'],
			[74, 'slow_season_pc', '100'],
			[75, 'sunday_pc', '100'],
			[76, 'monday_pc', '100'],
			[77, 'tuesday_pc', '100'],
			[78, 'wednesday_pc', '100'],
			[79, 'thursday_pc', '100'],
			[80, 'friday_pc', '100'],
			[81, 'saturday_pc', '100'],
			[82, 'shortbook', '0'],
			[83, 'manager_requiredfields_block_note', '0'],
			[84, 'property_map_type', 'google.maps.MapTypeId.ROADMAP'],
			[85, 'display_calendar', '1'],
			[86, 'beyond_rates', '0'],
			[87, 'base_price', '0'],
			[88, 'min_price', '0'],
			[89, 'base_guests', '2'],
			[90, 'extra_person_rate', '25'],
			[91, 'min_nights', '2'],
			[92, 'max_nights', '365'],
			[93, 'tax_type_1', '0'],
			[94, 'tax_type_2', '0'],
			[95, 'tax_type_3', '0'],
			[96, 'multiple_bookings', '0'],
			[97, 'security_changes', 'vrbo'],
			[98, 'service_changes', 'vrbo'],
			[99, 'tax_ignore', 0]
		];

		foreach ($kr_setting as $r) {
			$new              = new stdClass();
			$new->id          = $r[0];
			$new->property_id = 0;
			$new->akey        = $r[1];
			$new->value       = $r[2];
			$new->created_at  = TickTock::getTS();
			$new->created_by  = 0;
			$new->updated_at  = "0000-00-00 00:00:00";
			$new->updated_by  = 0;
			$new->version     = 1;
			KrFactory::insert('property_setting', $new);
		}
	}

	/**
	 * Move config text to agency (V3.3)
	 *
	 * @throws Exception
	 * @since  3.3.0
	 */
	public static function paramsToAgency(): void
	{
		$params                 = KrMethods::getParams();
		$dashboard_confirm      = $params->get('dashboard_confirm', '');
		$dashboard_cancellation = $params->get('dashboard_cancellation', '');
		$dashboard_insurance    = $params->get('dashboard_insurance', '');

		if (!empty($dashboard_confirm)) {
			$db    = KrFactory::getDatabase();
			$query = $db->getQuery(true);
			$query->select($db->qn('id'));
			$query->from($db->qn('#__knowres_agency'))
				->where($db->qn('state') . '=1')
				->setLimit(1);
			$db->setQuery($query);
			$id = $db->loadResult();

			$Translations = new Translations();
			$Translations->updateDefault('agency', $id, 'gdpr_statement', $dashboard_confirm);
			$Translations->updateDefault('agency', $id, 'cancellation_terms', $dashboard_cancellation);
			$Translations->updateDefault('agency', $id, 'insurance_disclaimer', $dashboard_insurance);
		}
	}

	/**
	 * Remove obsolete settings
	 *
	 * @throws RuntimeException
	 * @throws Exception
	 * @since  3.4.0
	 */
	public static function removeSettings(): void
	{
		$akey = ['net_rounding', 'net_rounding_unit'];

		$db = KrFactory::getDatabase();

		foreach ($akey as $a) {
			$query      = $db->getQuery(true);
			$conditions = [
				$db->qn('akey') . '=' . $db->q($a),
			];
			$query->delete($db->qn('#__knowres_property_setting'));
			$query->where($conditions);
			$db->setQuery($query);
			$db->execute();
		}
	}

	/**
	 * Check if a history content type exists for a table and
	 * create / edit as required
	 *
	 * @param  object  $table  The table object
	 * @param  string  $name   The table name
	 * @param  string  $title  The table title
	 * @param  string  $alias  The table alias
	 *
	 * @throws InvalidArgumentException
	 * @throws RuntimeException
	 * @throws UnexpectedValueException
	 * @since  2.4.0
	 * @return void
	 */
	protected static function historyUpdate(object $table, string $name, string $title, string $alias): void
	{
		if (!isset($alias)) {
			return;
		}

		$params      = KrMethods::getParams();
		$contentType = new ContentType(KrFactory::getDatabase());

		// Create a new content type for the table
		if (!$contentType->load(array('type_alias' => $alias))) {
			$contentType->type_title = $title;
			$contentType->type_alias = $alias;
			$contentType->table      = Utility::encodeJson(array(
				'special' => array(
					'dbtable' => $table->getTableName(),
					'key'     => $table->getKeyName(),
					'type'    => ucfirst($name),
					'prefix'  => 'KnowresTable'
				)
			));

			$contentType->field_mappings = Utility::encodeJson(array());

			// Fields to hide
			$hide = [];
			if (property_exists($table, 'apikey')) {
				$hide[] = 'apikey';
			}
			if ($name == 'guest' && property_exists($table, 'b_region')) {
				$hide[] = 'b_region';
			}
			if (property_exists($table, 'checked_out')) {
				$hide[] = 'checked_out';
			}
			if (property_exists($table, 'checked_out_time')) {
				$hide[] = 'checked_out_time';
			}
			if ($name == 'region' && property_exists($table, 'code')) {
				$hide[] = 'code';
			}
			if ($name == 'guest' && property_exists($table, 'customer_ref')) {
				$hide[] = 'customer_ref';
			}
			if ($name == 'guest' && property_exists($table, 'discount')) {
				$hide[] = 'discount';
			}
			if ($name == 'guest' && property_exists($table, 'foreign_key')) {
				$hide[] = 'foreign_key';
			}
			if ($name == 'town' && property_exists($table, 'lat')) {
				$hide[] = 'lat';
			}
			if ($name == 'town' && property_exists($table, 'lng')) {
				$hide[] = 'lng';
			}
			if ($name == 'servicexref' && property_exists($table, 'new')) {
				$hide[] = 'new';
			}
			if (property_exists($table, 'property_mappinglink')) {
				$hide[] = 'property_mappinglink';
			}
			if ($name == 'guest' && property_exists($table, 'property_id')) {
				$hide[] = 'property_id';
			}
			if ($name == 'property' && property_exists($table, 'property_region')) {
				$hide[] = 'property_region';
			}
			if (property_exists($table, 'stars') && $params->get('property_stars', 0)) {
				$hide[] = 'stars';
			}
			if ($name == 'property' && property_exists($table, 'property_town')) {
				$hide[] = 'property_town';
			}
			if ($name == 'guest' && property_exists($table, 'region')) {
				$hide[] = 'region';
			}
			if ($name == 'translation' && property_exists($table, 'status')) {
				$hide[] = 'status';
			}
			if ($name == 'mapcategory' && property_exists($table, 'town')) {
				$hide[] = 'town';
			}
			if (property_exists($table, 'version')) {
				$hide[] = 'version';
			}

			// Fields to ignore
			$ignore = [];
			if (property_exists($table, 'apikey')) {
				$ignore[] = 'apikey';
			}
			if (property_exists($table, 'checked_out')) {
				$ignore[] = 'checked_out';
			}
			if (property_exists($table, 'checked_out_time')) {
				$ignore[] = 'checked_out_time';
			}
			if ($name == 'propertyical' && property_exists($table, 'last_update')) {
				$ignore[] = 'last_update';
			}
			if ($name == 'guest' && property_exists($table, 'property_id')) {
				$ignore[] = 'property_id';
			}
			if (property_exists($table, 'property_mappinglink')) {
				$ignore[] = 'property_mappinglink';
			}
			if (property_exists($table, 'updated_by')) {
				$ignore[] = 'updated_by';
			}
			if (property_exists($table, 'updated_at')) {
				$ignore[] = 'updated_at';
			}
			if (property_exists($table, 'version')) {
				$ignore[] = 'version';
			}

			// Convert integer
			$convert = [];
			if (property_exists($table, 'agency_id')) {
				$convert[] = 'agency_id';
			}
			if (property_exists($table, 'agent_id')) {
				$convert[] = 'agent_id';
			}
			if (property_exists($table, 'booking_status')) {
				$convert[] = 'booking_status';
			}
			if (property_exists($table, 'service_id')) {
				$convert[] = 'service_id';
			}
			if (property_exists($table, 'manager_id')) {
				$convert[] = 'manager_id';
			}
			if (property_exists($table, 'ordering')) {
				$convert[] = 'ordering';
			}
			if (property_exists($table, 'reviewed')) {
				$convert[] = 'reviewed';
			}

			// Lookups
			$lookup = [];
			if (property_exists($table, 'agency_id')) {
				$lookup[] = [
					'sourceColumn'  => 'agency_id',
					'targetTable'   => '#__knowres_agency',
					'targetColumn'  => 'id',
					'displayColumn' => 'name'
				];
			}

			if (property_exists($table, 'agent_id')) {
				$lookup[] = [
					'sourceColumn'  => 'agent_id',
					'targetTable'   => '#__knowres_agent',
					'targetColumn'  => 'id',
					'displayColumn' => 'name'
				];
			}

			if (property_exists($table, 'allow_payment')) {
				$lookup[] = [
					'sourceColumn'  => 'allow_payment',
					'targetTable'   => '#__knowres_currency',
					'targetColumn'  => 'iso',
					'displayColumn' => 'iso'
				];
			}

			if (property_exists($table, 'arrival_air')) {
				$lookup[] = [
					'sourceColumn'  => 'arrival_air',
					'targetTable'   => 'layout',
					'targetColumn'  => '',
					'displayColumn' => ''
				];
			}

			if (property_exists($table, 'cancellation_penalty')) {
				$lookup[] = [
					'sourceColumn'  => 'cancellation_penalty',
					'targetTable'   => 'layout',
					'targetColumn'  => '',
					'displayColumn' => ''
				];
			}

			if (property_exists($table, 'categories')) {
				$lookup[] = [
					'sourceColumn'  => 'categories',
					'targetTable'   => 'category',
					'targetColumn'  => 'krtranslate',
					'displayColumn' => 'name'
				];
			}

			if (property_exists($table, 'checkin_fees')) {
				$lookup[] = [
					'sourceColumn'  => 'checkin_fees',
					'targetTable'   => 'layout',
					'targetColumn'  => '',
					'displayColumn' => ''
				];
			}

			if (property_exists($table, 'checkout_fees')) {
				$lookup[] = [
					'sourceColumn'  => 'checkout_fees',
					'targetTable'   => 'layout',
					'targetColumn'  => '',
					'displayColumn' => ''
				];
			}

			if (property_exists($table, 'cluster_id')) {
				$lookup[] = [
					'sourceColumn'  => 'cluster_id',
					'targetTable'   => 'cluster',
					'targetColumn'  => 'krtranslate',
					'displayColumn' => 'name'
				];
			}

			if (property_exists($table, 'children')) {
				$lookup[] = [
					'sourceColumn'  => 'children',
					'targetTable'   => 'layout',
					'targetColumn'  => '',
					'displayColumn' => ''
				];
			}

			if (property_exists($table, 'contract_id')) {
				$lookup[] = [
					'sourceColumn'  => 'contract_id',
					'targetTable'   => '#__knowres_contract',
					'targetColumn'  => 'id',
					'displayColumn' => 'tag'
				];
			}

			if (property_exists($table, 'country_id')) {
				$lookup[] = [
					'sourceColumn'  => 'country_id',
					'targetTable'   => 'country',
					'targetColumn'  => 'krtranslate',
					'displayColumn' => 'name'
				];
			}

			if (property_exists($table, 'b_country_id')) {
				$lookup[] = [
					'sourceColumn'  => 'b_country_id',
					'targetTable'   => 'country',
					'targetColumn'  => 'krtranslate',
					'displayColumn' => 'name'
				];
			}

			if (property_exists($table, 'created_by')) {
				$lookup[] = [
					'sourceColumn'  => 'created_by',
					'targetTable'   => '#__users',
					'targetColumn'  => 'id',
					'displayColumn' => 'name'
				];
			}

			if (property_exists($table, 'email_template_id')) {
				$lookup[] = [
					'sourceColumn'  => 'email_template_id',
					'targetTable'   => 'emailtemplate',
					'targetColumn'  => 'krtranslate',
					'displayColumn' => 'name'
				];
			}

			if (property_exists($table, 'guest_id')) {
				$lookup[] = [
					'sourceColumn'  => 'guest_id',
					'targetTable'   => '#__knowres_guest',
					'targetColumn'  => 'id',
					'displayColumn' => 'surname'
				];
			}

			if (property_exists($table, 'guestinfo')) {
				$lookup[] = [
					'sourceColumn'  => 'guestinfo',
					'targetTable'   => 'layout',
					'targetColumn'  => '',
					'displayColumn' => ''
				];
			}

			if (property_exists($table, 'service_id')) {
				$lookup[] = [
					'sourceColumn'  => 'service_id',
					'targetTable'   => '#__knowres_service',
					'targetColumn'  => 'id',
					'displayColumn' => 'name'
				];
			}

			if (property_exists($table, 'manager_id')) {
				$lookup[] = [
					'sourceColumn'  => 'manager_id',
					'targetTable'   => '#__knowres_manager',
					'targetColumn'  => 'id',
					'displayColumn' => 'user_id'
				];
			}

			if (property_exists($table, 'map_category_id')) {
				$lookup[] = [
					'sourceColumn'  => 'map_category_id',
					'targetTable'   => 'mapcategory',
					'targetColumn'  => 'krtranslate',
					'displayColumn' => 'name'
				];
			}

			if (property_exists($table, 'mobile_country_id')) {
				$lookup[] = [
					'sourceColumn'  => 'mobile_country_id',
					'targetTable'   => 'country',
					'targetColumn'  => 'krtranslate',
					'displayColumn' => 'name'
				];
			}

			if (property_exists($table, 'owner_id')) {
				$lookup[] = [
					'sourceColumn'  => 'owner_id',
					'targetTable'   => '#__knowres_owner',
					'targetColumn'  => 'id',
					'displayColumn' => 'name'
				];
			}

			if (property_exists($table, 'properties')) {
				$lookup[] = [
					'sourceColumn'  => 'properties',
					'targetTable'   => '#__knowres_property',
					'targetColumn'  => 'id',
					'displayColumn' => 'property_name'
				];
			}

			if (property_exists($table, 'property_alternatives')) {
				$lookup[] = [
					'sourceColumn'  => 'property_alternatives',
					'targetTable'   => '#__knowres_property',
					'targetColumn'  => 'id',
					'displayColumn' => 'property_name'
				];
			}

			if (property_exists($table, 'property_features')) {
				$lookup[] = [
					'sourceColumn'  => 'property_features',
					'targetTable'   => 'propertyfeature',
					'targetColumn'  => 'krtranslate',
					'displayColumn' => 'name'
				];
			}

			if (property_exists($table, 'property_id')) {
				$lookup[] = [
					'sourceColumn'  => 'property_id',
					'targetTable'   => '#__knowres_property',
					'targetColumn'  => 'id',
					'displayColumn' => 'property_name'
				];
			}

			if (property_exists($table, 'property_units')) {
				$lookup[] = [
					'sourceColumn'  => 'property_units',
					'targetTable'   => '#__knowres_property',
					'targetColumn'  => 'id',
					'displayColumn' => 'property_name'
				];
			}

			if (property_exists($table, 'region_id')) {
				$lookup[] = [
					'sourceColumn'  => 'region_id',
					'targetTable'   => 'region',
					'targetColumn'  => 'krtranslate',
					'displayColumn' => 'name'
				];
			}

			if (property_exists($table, 'b_region_id')) {
				$lookup[] = [
					'sourceColumn'  => 'b_region_id',
					'targetTable'   => 'region',
					'targetColumn'  => 'krtranslate',
					'displayColumn' => 'name'
				];
			}

			if ($name == 'guest' && property_exists($table, 'telephone')) {
				$lookup[] = [
					'sourceColumn'  => 'telephone',
					'targetTable'   => 'layout',
					'targetColumn'  => '',
					'displayColumn' => ''
				];
			}

			if (property_exists($table, 'town_id')) {
				$lookup[] = [
					'sourceColumn'  => 'town_id',
					'targetTable'   => 'town',
					'targetColumn'  => 'krtranslate',
					'displayColumn' => 'name'
				];
			}

			if (property_exists($table, 'type_id')) {
				$lookup[] = [
					'sourceColumn'  => 'type_id',
					'targetTable'   => 'type',
					'targetColumn'  => 'krtranslate',
					'displayColumn' => 'name'
				];
			}

			if (property_exists($table, 'updated_by')) {
				$lookup[] = [
					'sourceColumn'  => 'updated_by',
					'targetTable'   => '#__users',
					'targetColumn'  => 'id',
					'displayColumn' => 'name'
				];
			}

			if (property_exists($table, 'user_id')) {
				$lookup[] = [
					'sourceColumn'  => 'user_id',
					'targetTable'   => '#__users',
					'targetColumn'  => 'id',
					'displayColumn' => 'name'
				];
			}

			$contentType->content_history_options = Utility::encodeJson([
				'formFile'      => 'administrator/components/com_knowres/models/forms/' . $name . '.xml',
				'hideFields'    => $hide,
				'ignoreChanges' => $ignore,
				'convertToInt'  => $convert,
				'displayLookup' => $lookup
			]);

			$contentType->router = '';
			$contentType->store();
		}
	}

	/**
	 * Update old features to set id + 10000
	 *
	 * @throws RuntimeException
	 * @throws Exception
	 * @since  1.0.0
	 */
	protected static function updateFeatures(): void
	{
		$db = KrFactory::getDatabase();

		$query = 'UPDATE ' . $db->qn('#__knowres_property_feature') . ' SET ' . $db->qn('id') . ' = (' . $db->qn('id')
		         . '+ 10000), ' . $db->qn('room_type') . '=' . $db->q('property');

		$db->setQuery($query);
		$db->execute();

		// Update property to match
		$query = $db->getQuery(true);
		$query->select($db->qn(['id', 'property_features']))
			->from($db->qn('#__knowres_property'))
			->where($db->qn('property_features') . '<>' . $db->q(''));

		$db->setQuery($query);
		$rows = $db->loadObjectList();

		foreach ($rows as $r) {
			$features = [];
			if (is_string($r->property_features)) {
				$features = explode(',', $r->property_features);
			} else if (is_object($r->property_features)) {
				$value = get_object_vars($r->property_features);
				foreach ($value as $p) {
					if (!is_array($p)) {
						$features[] = $p;
					}
				}
			}

			for ($i = 0; $i < count($features); $i++) {
				$features[$i] = $features[$i] + 10000;
			}

			$update                    = new stdClass();
			$update->id                = $r->id;
			$update->property_features = implode(',', $features);
			$update->updated_at        = TickTock::getDate();
			$update->updated_by        = 0;
			KrFactory::update('property', $update);
		}

		// Update all custom to id + 10000
		$db    = KrFactory::getDatabase();
		$query = 'UPDATE ' . $db->qn('#__knowres_translation') . ' SET ' . $db->qn('item_id') . ' = ('
		         . $db->qn('item_id') . '+ 10000) WHERE `item` = "propertyfeature"';

		$db->setQuery($query);
		$db->execute();
	}
}