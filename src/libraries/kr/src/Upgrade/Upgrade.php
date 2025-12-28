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

// phpcs:disable PSR1.Files.SideEffects
\defined('_JEXEC') or die;
// phpcs:enable PSR1.Files.SideEffects

if (!defined('KRFRAMEWORK')) {
    define('KRFRAMEWORK', 'Joomla');
}

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
            'type',
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
        $query->select($db->qn(['id', 'generic']))
              ->from($db->qn('#__knowres_property_feature'))
              ->where($db->qn('generic') . '<> ""');

        $db->setQuery($query);
        $rows = $db->loadObjectList();
        if (count($rows)) {
            // got some generic so don't need to add
            return;
        }

        echo '<p>Installing features</p>';
        $knowres_property_feature = [
            [
                'id'        => '1',
                'name'      => 'Air Conditioning',
                'room_type' => [
                    'property',
                    'living',
                    'bedroom',
                ],
                'generic'   => 'air conditioning',
            ],
            [
                'id'        => '2',
                'name'      => 'Airport Transfer',
                'room_type' => ['property'],
                'generic'   => 'airport pick-up service',
            ],
            [
                'id'        => '3',
                'name'      => 'Baby Listening Device',
                'room_type' => ['property'],
                'generic'   => 'baby listening device',
            ],
            [
                'id'        => '4',
                'name'      => 'Balcony (small)',
                'room_type' => ['property'],
                'generic'   => 'small balcony',
            ],
            [
                'id'        => '5',
                'name'      => 'Bathroom Grab Bars',
                'room_type' => ['property'],
                'generic'   => 'bathroom grab bars',
            ],
            [
                'id'        => '6',
                'name'      => 'BBQ',
                'room_type' => ['property'],
                'generic'   => 'bbq',
            ],
            [
                'id'        => '7',
                'name'      => 'Beach View',
                'room_type' => ['property'],
                'generic'   => 'beach view',
            ],
            [
                'id'        => '8',
                'name'      => 'Bed Linen Included',
                'room_type' => ['property'],
                'generic'   => 'bed linen included',
            ],
            [
                'id'        => '9',
                'name'      => 'Billiard / Pool Table',
                'room_type' => ['property'],
                'generic'   => 'billiard table',
            ],
            [
                'id'        => '10',
                'name'      => 'Business Centre',
                'room_type' => ['property'],
                'generic'   => 'business centre',
            ],
            [
                'id'        => '11',
                'name'      => 'Canal View',
                'room_type' => ['property'],
                'generic'   => 'canal view',
            ],
            [
                'id'        => '12',
                'name'      => 'Cell Phone Rentals',
                'room_type' => ['property'],
                'generic'   => 'cell phone rentals',
            ],
            [
                'id'        => '13',
                'name'      => 'Cleaning Weekly (free)',
                'room_type' => ['property'],
                'generic'   => 'free weekly cleaning',
            ],
            [
                'id'        => '14',
                'name'      => 'Central Heating',
                'room_type' => ['property'],
                'generic'   => 'central heating',
            ],
            [
                'id'        => '15',
                'name'      => 'Concierge',
                'room_type' => ['property'],
                'generic'   => 'concierge',
            ],
            [
                'id'        => '16',
                'name'      => 'Conference Facilities',
                'room_type' => ['property'],
                'generic'   => 'conference facilites',
            ],
            [
                'id'        => '17',
                'name'      => 'Cot / Crib (extra charge)',
                'room_type' => ['property'],
                'generic'   => 'cot extra charge',
            ],
            [
                'id'        => '18',
                'name'      => 'Cot / Crib (free on request)',
                'room_type' => ['property'],
                'generic'   => 'cot free on request',
            ],
            [
                'id'        => '19',
                'name'      => 'Cot / Crib (free)',
                'room_type' => ['property'],
                'generic'   => 'cot free',
            ],
            [
                'id'        => '20',
                'name'      => 'Courtyard',
                'room_type' => ['property'],
                'generic'   => 'courtyard',
            ],
            [
                'id'        => '21',
                'name'      => 'Dishwasher',
                'room_type' => [
                    'property',
                    'kitchen',
                ],
                'generic'   => 'dishwasher',
            ],
            [
                'id'        => '22',
                'name'      => 'Doctor on Call',
                'room_type' => ['property'],
                'generic'   => 'doctor on call',
            ],
            [
                'id'        => '23',
                'name'      => 'DVD Player',
                'room_type' => [
                    'property',
                    'living',
                ],
                'generic'   => 'dvd',
            ],
            [
                'id'        => '24',
                'name'      => 'Electronic Door Locks',
                'room_type' => ['property'],
                'generic'   => 'electronic door locks',
            ],
            [
                'id'        => '25',
                'name'      => 'Elevator',
                'room_type' => ['property'],
                'generic'   => 'elevator',
            ],
            [
                'id'        => '26',
                'name'      => 'Fan (ceiling)',
                'room_type' => ['property'],
                'generic'   => 'ceiling fan',
            ],
            [
                'id'        => '27',
                'name'      => 'Fans (on request)',
                'room_type' => ['property'],
                'generic'   => 'fans on request',
            ],
            [
                'id'        => '28',
                'name'      => 'Fireplace',
                'room_type' => [
                    'property',
                    'living',
                    'bedroom',
                ],
                'generic'   => 'fireplace',
            ],
            [
                'id'        => '29',
                'name'      => 'Fireplace Wood Burning',
                'room_type' => ['property'],
                'generic'   => 'wood burning fireplace',
            ],
            [
                'id'        => '30',
                'name'      => 'Fitness Room',
                'room_type' => ['property'],
                'generic'   => 'fitness room',
            ],
            [
                'id'        => '31',
                'name'      => 'Freezer',
                'room_type' => ['property'],
                'generic'   => 'freezer',
            ],
            [
                'id'        => '32',
                'name'      => 'Fridge Freezer',
                'room_type' => [
                    'property',
                    'kitchen',
                ],
                'generic'   => 'fridge freezer',
            ],
            [
                'id'        => '33',
                'name'      => 'Games Room',
                'room_type' => ['property'],
                'generic'   => 'games room',
            ],
            [
                'id'        => '34',
                'name'      => 'Garden (shared)',
                'room_type' => ['property'],
                'generic'   => 'garden shared',
            ],
            [
                'id'        => '35',
                'name'      => 'Garden (private)',
                'room_type' => ['property'],
                'generic'   => 'garden private',
            ],
            [
                'id'        => '36',
                'name'      => 'Gym',
                'room_type' => ['property'],
                'generic'   => 'gym for guest use',
            ],
            [
                'id'        => '37',
                'name'      => 'Hair Dryer',
                'room_type' => 'property,bathroom',
                'generic'   => 'hair dryer',
            ],
            [
                'id'        => '38',
                'name'      => 'Health Club',
                'room_type' => ['property'],
                'generic'   => 'health club',
            ],
            [
                'id'        => '39',
                'name'      => 'Help Desk',
                'room_type' => ['property'],
                'generic'   => 'help desk',
            ],
            [
                'id'        => '40',
                'name'      => 'Hi-fi',
                'room_type' => ['property'],
                'generic'   => 'stereo',
            ],
            [
                'id'        => '41',
                'name'      => 'High Chair',
                'room_type' => ['property'],
                'generic'   => 'high chair',
            ],
            [
                'id'        => '42',
                'name'      => 'Hot Tub (shared)',
                'room_type' => ['property'],
                'generic'   => 'hot tub shared',
            ],
            [
                'id'        => '43',
                'name'      => 'Hot Tub (private)',
                'room_type' => ['property'],
                'generic'   => 'hot tub private',
            ],
            [
                'id'        => '44',
                'name'      => 'Internet Access (free)',
                'room_type' => ['property'],
                'generic'   => 'internet access free',
            ],
            [
                'id'        => '45',
                'name'      => 'Internet Access (high speed)',
                'room_type' => ['property'],
                'generic'   => 'internet access high speed',
            ],
            [
                'id'        => '46',
                'name'      => 'Internet Cable (extra charge)',
                'room_type' => ['property'],
                'generic'   => 'internet cable paid',
            ],
            [
                'id'        => '47',
                'name'      => 'Internet Cable (free)',
                'room_type' => ['property'],
                'generic'   => 'internet cable free',
            ],
            [
                'id'        => '48',
                'name'      => 'Internet Connection',
                'room_type' => ['property'],
                'generic'   => 'internet connection',
            ],
            [
                'id'        => '49',
                'name'      => 'Internet WiFi (extra charge)',
                'room_type' => ['property'],
                'generic'   => 'internet wifi paid',
            ],
            [
                'id'        => '50',
                'name'      => 'Internet Wifi (free )',
                'room_type' => ['property'],
                'generic'   => 'internet wifi free',
            ],
            [
                'id'        => '51',
                'name'      => 'Iron',
                'room_type' => ['property'],
                'generic'   => 'iron',
            ],
            [
                'id'        => '52',
                'name'      => 'Iron & Board',
                'room_type' => ['property'],
                'generic'   => 'iron and board',
            ],
            [
                'id'        => '53',
                'name'      => 'Ironing Board',
                'room_type' => ['property'],
                'generic'   => 'ironing board',
            ],
            [
                'id'        => '54',
                'name'      => 'Laundry (shared)',
                'room_type' => ['property'],
                'generic'   => 'laundry shared',
            ],
            [
                'id'        => '55',
                'name'      => 'Laundry (private)',
                'room_type' => ['property'],
                'generic'   => 'laundry private',
            ],
            [
                'id'        => '56',
                'name'      => 'Lounge',
                'room_type' => ['property'],
                'generic'   => 'lounge',
            ],
            [
                'id'        => '57',
                'name'      => 'Luggage Storage Facilities',
                'room_type' => ['property'],
                'generic'   => 'luggage storage facilities',
            ],
            [
                'id'        => '58',
                'name'      => 'Weekly Maid Service',
                'room_type' => ['property'],
                'generic'   => 'weekly maid service',
            ],
            [
                'id'        => '59',
                'name'      => 'Maid Service',
                'room_type' => ['property'],
                'generic'   => 'maid service',
            ],
            [
                'id'        => '60',
                'name'      => 'Ocean View',
                'room_type' => ['property'],
                'generic'   => 'ocean view',
            ],
            [
                'id'        => '61',
                'name'      => 'Parking Free',
                'room_type' => ['property'],
                'generic'   => 'parking free',
            ],
            [
                'id'        => '62',
                'name'      => 'Parking Guarded',
                'room_type' => ['property'],
                'generic'   => 'parking guarded',
            ],
            [
                'id'        => '63',
                'name'      => 'Parking On Street ',
                'room_type' => ['property'],
                'generic'   => 'parking on street',
            ],
            [
                'id'        => '64',
                'name'      => 'Parking Private',
                'room_type' => ['property'],
                'generic'   => 'parking private',
            ],
            [
                'id'        => '65',
                'name'      => 'Parking Underground',
                'room_type' => ['property'],
                'generic'   => 'underground parking',
            ],
            [
                'id'        => '66',
                'name'      => 'Pets Not Allowed',
                'room_type' => ['property'],
                'generic'   => 'pets not allowed',
            ],
            [
                'id'        => '67',
                'name'      => 'Pets Welcome',
                'room_type' => ['property'],
                'generic'   => 'pets welcome',
            ],
            [
                'id'        => '68',
                'name'      => 'Safe',
                'room_type' => ['property'],
                'generic'   => 'safe',
            ],
            [
                'id'        => '69',
                'name'      => 'Sauna',
                'room_type' => ['property'],
                'generic'   => 'sauna',
            ],
            [
                'id'        => '70',
                'name'      => 'Sea View',
                'room_type' => ['property'],
                'generic'   => 'sea view',
            ],
            [
                'id'        => '71',
                'name'      => 'Smoking Permitted',
                'room_type' => ['property'],
                'generic'   => 'smoking permitted',
            ],
            [
                'id'        => '72',
                'name'      => 'Steam Bath',
                'room_type' => ['property'],
                'generic'   => 'steam bath',
            ],
            [
                'id'        => '73',
                'name'      => 'Steam Room',
                'room_type' => ['property'],
                'generic'   => 'steam room',
            ],
            [
                'id'        => '74',
                'name'      => 'Swimming Pool',
                'room_type' => ['property'],
                'generic'   => 'swimming pool',
            ],
            [
                'id'        => '75',
                'name'      => 'Swimming Pool (Heated )',
                'room_type' => ['property'],
                'generic'   => 'swimming pool heated',
            ],
            [
                'id'        => '76',
                'name'      => 'Swimming Pool (indoor )',
                'room_type' => ['property'],
                'generic'   => 'swimming pool indoor',
            ],
            [
                'id'        => '77',
                'name'      => 'Telephone',
                'room_type' => ['property'],
                'generic'   => 'telephone',
            ],
            [
                'id'        => '78',
                'name'      => 'Telephone (free local calls)',
                'room_type' => ['property'],
                'generic'   => 'telephone free local calls',
            ],
            [
                'id'        => '79',
                'name'      => 'Tennis Court',
                'room_type' => ['property'],
                'generic'   => 'tennis court',
            ],
            [
                'id'        => '80',
                'name'      => 'Terrace',
                'room_type' => ['property'],
                'generic'   => 'terrace',
            ],
            [
                'id'        => '81',
                'name'      => 'Toiletries',
                'room_type' => [
                    'property',
                    'bathroom',
                ],
                'generic'   => 'toiletries',
            ],
            [
                'id'        => '82',
                'name'      => 'Towels Included',
                'room_type' => ['property'],
                'generic'   => 'towels included',
            ],
            [
                'id'        => '83',
                'name'      => 'TV (cable)',
                'room_type' => ['property'],
                'generic'   => 'tv cable',
            ],
            [
                'id'        => '84',
                'name'      => 'TV (local channels only)',
                'room_type' => ['property'],
                'generic'   => 'tv local channels only',
            ],
            [
                'id'        => '85',
                'name'      => 'TV (satellite)',
                'room_type' => ['property'],
                'generic'   => 'tv satellite',
            ],
            [
                'id'        => '86',
                'name'      => 'Vacuum Cleaner',
                'room_type' => ['property'],
                'generic'   => 'vacuum cleaner',
            ],
            [
                'id'        => '87',
                'name'      => 'Washing Machine',
                'room_type' => 'property,bathroom,kitchen',
                'generic'   => 'washing machine',
            ],
            [
                'id'        => '88',
                'name'      => 'Washer Dryer',
                'room_type' => [
                    'property',
                    'bathroom',
                    'kitchen',
                ],
                'generic'   => 'washer dryer',
            ],
            [
                'id'        => '89',
                'name'      => 'Video Game System',
                'room_type' => ['property'],
                'generic'   => 'video game system',
            ],
            [
                'id'        => '90',
                'name'      => 'Wheelchair Access',
                'room_type' => ['property'],
                'generic'   => 'wheelchair access',
            ],
            [
                'id'        => '91',
                'name'      => 'Laundry Service',
                'room_type' => ['property'],
                'generic'   => 'laundry service',
            ],
            [
                'id'        => '92',
                'name'      => 'Parking',
                'room_type' => ['property'],
                'generic'   => 'parking',
            ],
            [
                'id'        => '93',
                'name'      => 'Near the Beach',
                'room_type' => ['property'],
                'generic'   => 'beach',
            ],
            [
                'id'        => '94',
                'name'      => 'No Smoking',
                'room_type' => ['property'],
                'generic'   => 'no smoking rooms/facilities',
            ], // Non-general
            [
                'id'        => '1001',
                'name'      => 'Alarm Clock',
                'room_type' => ['bedroom'],
                'generic'   => 'alarm clock',
            ],
            [
                'id'        => '1002',
                'name'      => 'Armchair',
                'room_type' => [
                    'living',
                    'bedroom',
                ],
                'generic'   => 'armchair',
            ],
            [
                'id'        => '1003',
                'name'      => 'Balcony',
                'room_type' => 'living,bedroom',
                'generic'   => 'balcony',
            ],
            [
                'id'        => '1004',
                'name'      => 'Bathtub',
                'room_type' => ['bathroom'],
                'generic'   => 'bathtub',
            ],
            [
                'id'        => '1005',
                'name'      => 'Bed Double',
                'room_type' => [
                    'living',
                    'bedroom',
                ],
                'generic'   => 'double bed',
            ],
            [
                'id'        => '1006',
                'name'      => 'Bed King',
                'room_type' => [
                    'living',
                    'bedroom',
                ],
                'generic'   => 'king size bed',
            ],
            [
                'id'        => '1007',
                'name'      => 'Bed Queen',
                'room_type' => [
                    'living',
                    'bedroom',
                ],
                'generic'   => 'queen size bed',
            ],
            [
                'id'        => '1008',
                'name'      => 'Bed Single',
                'room_type' => 'living,bedroom',
                'generic'   => 'single bed',
            ],
            [
                'id'        => '1009',
                'name'      => 'Beds Bunk',
                'room_type' => 'living,bedroom',
                'generic'   => 'bunk beds',
            ],
            [
                'id'        => '1010',
                'name'      => 'Beds Twin',
                'room_type' => [
                    'living',
                    'bedroom',
                ],
                'generic'   => 'pair of twin beds',
            ],
            [
                'id'        => '1011',
                'name'      => 'Bedside Table',
                'room_type' => ['bedroom'],
                'generic'   => 'night table',
            ],
            [
                'id'        => '1012',
                'name'      => 'Bidet',
                'room_type' => [
                    'wc',
                    'bathroom',
                ],
                'generic'   => 'bidet',
            ],
            [
                'id'        => '1013',
                'name'      => 'Blender',
                'room_type' => ['kitchen'],
                'generic'   => 'blender',
            ],
            [
                'id'        => '1014',
                'name'      => 'Breakfast Bar & Stools',
                'room_type' => ['kitchen'],
                'generic'   => 'breakfast bar and stools',
            ],
            [
                'id'        => '1015',
                'name'      => 'Built In Wardrobes',
                'room_type' => ['bedroom'],
                'generic'   => 'built-in wardrobes',
            ],
            [
                'id'        => '1016',
                'name'      => 'Chair',
                'room_type' => [
                    'living',
                    'bedroom',
                ],
                'generic'   => 'chair',
            ],
            [
                'id'        => '1017',
                'name'      => 'Chest of Drawers',
                'room_type' => [
                    'wc',
                    'bathroom',
                    'bedroom',
                ],
                'generic'   => 'chest of drawers',
            ],
            [
                'id'        => '1018',
                'name'      => 'Coffee Maker',
                'room_type' => 'kitchen',
                'generic'   => 'coffee maker',
            ],
            [
                'id'        => '1019',
                'name'      => 'Coffee Table',
                'room_type' => ['living'],
                'generic'   => 'coffee table',
            ],
            [
                'id'        => '1020',
                'name'      => 'Cooker / Stove',
                'room_type' => ['kitchen'],
                'generic'   => 'cooker',
            ],
            [
                'id'        => '1021',
                'name'      => 'Cookware & Utensils',
                'room_type' => ['kitchen'],
                'generic'   => 'cookware and kitchen utensils',
            ],
            [
                'id'        => '1022',
                'name'      => 'Crockery & Cutlery',
                'room_type' => ['kitchen'],
                'generic'   => 'crockery and cutlery',
            ],
            [
                'id'        => '1023',
                'name'      => 'Cupboards',
                'room_type' => ['kitchen'],
                'generic'   => 'cupboards',
            ],
            [
                'id'        => '1024',
                'name'      => 'Cupboard',
                'room_type' => ['bathroom'],
                'generic'   => 'cupboard',
            ],
            [
                'id'        => '1025',
                'name'      => 'Desk',
                'room_type' => [
                    'living',
                    'bedroom',
                ],
                'generic'   => 'desk',
            ],
            [
                'id'        => '1026',
                'name'      => 'Electric Kettle',
                'room_type' => ['kitchen'],
                'generic'   => 'electric kettle',
            ],
            [
                'id'        => '1027',
                'name'      => 'En Suite Bathroom',
                'room_type' => ['bedroom'],
                'generic'   => 'en suite bathroom',
            ],
            [
                'id'        => '1028',
                'name'      => 'En Suite Shower',
                'room_type' => ['bedroom'],
                'generic'   => 'en suite shower',
            ],
            [
                'id'        => '1029',
                'name'      => 'Espresso Machine',
                'room_type' => ['kitchen'],
                'generic'   => 'espresso-machine',
            ],
            [
                'id'        => '1030',
                'name'      => 'Fan',
                'room_type' => ['living'],
                'generic'   => 'fan',
            ],
            [
                'id'        => '1031',
                'name'      => 'Fridge',
                'room_type' => ['kitchen'],
                'generic'   => 'fridge',
            ],
            [
                'id'        => '1032',
                'name'      => 'Heated Towel Rail',
                'room_type' => [
                    'wc',
                    'bathroom',
                ],
                'generic'   => 'heated towel bar',
            ],
            [
                'id'        => '1033',
                'name'      => 'Heating',
                'room_type' => ['living'],
                'generic'   => 'heating',
            ],
            [
                'id'        => '1034',
                'name'      => 'Hob (Electric)',
                'room_type' => ['kitchen'],
                'generic'   => 'gas or electric hob',
            ],
            [
                'id'        => '1035',
                'name'      => 'Hob (Gas)',
                'room_type' => ['kitchen'],
                'generic'   => 'gas or electric hob',
            ],
            [
                'id'        => '1036',
                'name'      => 'Ice Maker',
                'room_type' => ['kitchen'],
                'generic'   => 'ice maker',
            ],
            [
                'id'        => '1037',
                'name'      => 'Jacuzzi',
                'room_type' => ['bathroom'],
                'generic'   => 'jacuzzi',
            ],
            [
                'id'        => '1038',
                'name'      => 'Kettle',
                'room_type' => ['kitchen'],
                'generic'   => 'kettle',
            ],
            [
                'id'        => '1039',
                'name'      => 'Microwave',
                'room_type' => ['kitchen'],
                'generic'   => 'microwave',
            ],
            [
                'id'        => '1040',
                'name'      => 'Mirror',
                'room_type' => [
                    'wc',
                    'bathroom',
                    'bedroom',
                ],
                'generic'   => 'mirror',
            ],
            [
                'id'        => '1041',
                'name'      => 'Oven',
                'room_type' => ['kitchen'],
                'generic'   => 'oven',
            ],
            [
                'id'        => '1042',
                'name'      => 'Reading Lamp',
                'room_type' => [
                    'living',
                    'bedroom',
                ],
                'generic'   => 'reading lamp',
            ],
            [
                'id'        => '1043',
                'name'      => 'Shower',
                'room_type' => ['bathroom'],
                'generic'   => 'shower',
            ],
            [
                'id'        => '1044',
                'name'      => 'Sofa Bed (double)',
                'room_type' => 'living,bedroom',
                'generic'   => 'double sofa bed',
            ],
            [
                'id'        => '1045',
                'name'      => 'Sofa Bed (single)',
                'room_type' => [
                    'living',
                    'bedroom',
                ],
                'generic'   => 'sofabed',
            ],
            [
                'id'        => '1046',
                'name'      => 'Sofa (large)',
                'room_type' => ['living'],
                'generic'   => 'sofa',
            ],
            [
                'id'        => '1047',
                'name'      => 'Sofa (small)',
                'room_type' => [
                    'living',
                    'bedroom',
                ],
                'generic'   => 'double sofa',
            ],
            [
                'id'        => '1048',
                'name'      => 'Table',
                'room_type' => [
                    'kitchen',
                    'living',
                    'bedroom',
                ],
                'generic'   => 'table',
            ],
            [
                'id'        => '1049',
                'name'      => 'Table Lamp',
                'room_type' => [
                    'living',
                    'bedroom',
                ],
                'generic'   => 'lamp',
            ],
            [
                'id'        => '1050',
                'name'      => 'Table & Chairs',
                'room_type' => [
                    'kitchen',
                    'living',
                    'bedroom',
                ],
                'generic'   => 'table and chairs',
            ],
            [
                'id'        => '1051',
                'name'      => 'Toaster',
                'room_type' => ['kitchen'],
                'generic'   => 'toaster',
            ],
            [
                'id'        => '1052',
                'name'      => 'Toilet',
                'room_type' => [
                    'wc',
                    'bathroom',
                ],
                'generic'   => 'toilet',
            ],
            [
                'id'        => '1053',
                'name'      => 'TV',
                'room_type' => [
                    'living',
                    'bedroom',
                ],
                'generic'   => 'tv',
            ],
            [
                'id'        => '1054',
                'name'      => 'TV (flat screen)',
                'room_type' => [
                    'living',
                    'bedroom',
                ],
                'generic'   => 'tv',
            ],
            [
                'id'        => '1055',
                'name'      => 'Vanity Unit',
                'room_type' => ['bathroom'],
                'generic'   => 'vanity cupboard',
            ],
            [
                'id'        => '1056',
                'name'      => 'Wardrobe',
                'room_type' => ['bedroom'],
                'generic'   => 'wardrobe',
            ],
            [
                'id'        => '1057',
                'name'      => 'Washbasin',
                'room_type' => [
                    'wc',
                    'bathroom',
                ],
                'generic'   => 'washbasin',
            ],
            [
                'id'        => '1058',
                'name'      => 'Combo Tub Shower',
                'room_type' => ['bathroom'],
                'generic'   => 'combo tub shower',
            ],
        ];

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
        $query->select($db->qn(['id', 'akey']))
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
            [99, 'tax_ignore', 0],
        ];

        foreach ($kr_setting as $r) {
            $new              = new stdClass();
            $new->id          = $r[0];
            $new->property_id = 0;
            $new->akey        = $r[1];
            $new->value       = $r[2];
            $new->created_at  = TickTock::getTS();
            $new->created_by  = 0;
            $new->updated_at  = '0000-00-00 00:00:00';
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
            $query->delete($db->qn('#__knowres_property_setting'))
                  ->where($conditions);
            $db->setQuery($query);
            $db->execute();
        }
    }

    /**
     * Check if a history content type exists for a table and
     * create / edit as required
     *
     * @param   object  $table  The table object
     * @param   string  $name   The table name
     * @param   string  $title  The table title
     * @param   string  $alias  The table alias
     *
     * @return void
     * @throws RuntimeException
     * @throws UnexpectedValueException
     * @throws InvalidArgumentException
     * @since  2.4.0
     */
    protected static function historyUpdate(object $table, string $name, string $title, string $alias): void
    {
        if (!isset($alias)) {
            return;
        }

        $params      = KrMethods::getParams();
        $contentType = new ContentType(KrFactory::getDatabase());

        // Create a new content type for the table
        if (!$contentType->load(['type_alias' => $alias])) {
            $contentType->type_title = $title;
            $contentType->type_alias = $alias;
            $contentType->table      = Utility::encodeJson([
                'special' => [
                    'dbtable' => $table->getTableName(),
                    'key'     => $table->getKeyName(),
                    'type'    => ucfirst($name),
                    'prefix'  => 'KnowresTable',
                ],
            ]);

            $contentType->field_mappings = Utility::encodeJson([]);

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
                    'displayColumn' => 'name',
                ];
            }

            if (property_exists($table, 'agent_id')) {
                $lookup[] = [
                    'sourceColumn'  => 'agent_id',
                    'targetTable'   => '#__knowres_agent',
                    'targetColumn'  => 'id',
                    'displayColumn' => 'name',
                ];
            }

            if (property_exists($table, 'allow_payment')) {
                $lookup[] = [
                    'sourceColumn'  => 'allow_payment',
                    'targetTable'   => '#__knowres_currency',
                    'targetColumn'  => 'iso',
                    'displayColumn' => 'iso',
                ];
            }

            if (property_exists($table, 'arrival_air')) {
                $lookup[] = [
                    'sourceColumn'  => 'arrival_air',
                    'targetTable'   => 'layout',
                    'targetColumn'  => '',
                    'displayColumn' => '',
                ];
            }

            if (property_exists($table, 'cancellation_penalty')) {
                $lookup[] = [
                    'sourceColumn'  => 'cancellation_penalty',
                    'targetTable'   => 'layout',
                    'targetColumn'  => '',
                    'displayColumn' => '',
                ];
            }

            if (property_exists($table, 'categories')) {
                $lookup[] = [
                    'sourceColumn'  => 'categories',
                    'targetTable'   => 'category',
                    'targetColumn'  => 'krtranslate',
                    'displayColumn' => 'name',
                ];
            }

            if (property_exists($table, 'checkin_fees')) {
                $lookup[] = [
                    'sourceColumn'  => 'checkin_fees',
                    'targetTable'   => 'layout',
                    'targetColumn'  => '',
                    'displayColumn' => '',
                ];
            }

            if (property_exists($table, 'checkout_fees')) {
                $lookup[] = [
                    'sourceColumn'  => 'checkout_fees',
                    'targetTable'   => 'layout',
                    'targetColumn'  => '',
                    'displayColumn' => '',
                ];
            }

            if (property_exists($table, 'cluster_id')) {
                $lookup[] = [
                    'sourceColumn'  => 'cluster_id',
                    'targetTable'   => 'cluster',
                    'targetColumn'  => 'krtranslate',
                    'displayColumn' => 'name',
                ];
            }

            if (property_exists($table, 'children')) {
                $lookup[] = [
                    'sourceColumn'  => 'children',
                    'targetTable'   => 'layout',
                    'targetColumn'  => '',
                    'displayColumn' => '',
                ];
            }

            if (property_exists($table, 'contract_id')) {
                $lookup[] = [
                    'sourceColumn'  => 'contract_id',
                    'targetTable'   => '#__knowres_contract',
                    'targetColumn'  => 'id',
                    'displayColumn' => 'tag',
                ];
            }

            if (property_exists($table, 'country_id')) {
                $lookup[] = [
                    'sourceColumn'  => 'country_id',
                    'targetTable'   => 'country',
                    'targetColumn'  => 'krtranslate',
                    'displayColumn' => 'name',
                ];
            }

            if (property_exists($table, 'b_country_id')) {
                $lookup[] = [
                    'sourceColumn'  => 'b_country_id',
                    'targetTable'   => 'country',
                    'targetColumn'  => 'krtranslate',
                    'displayColumn' => 'name',
                ];
            }

            if (property_exists($table, 'created_by')) {
                $lookup[] = [
                    'sourceColumn'  => 'created_by',
                    'targetTable'   => '#__users',
                    'targetColumn'  => 'id',
                    'displayColumn' => 'name',
                ];
            }

            if (property_exists($table, 'email_template_id')) {
                $lookup[] = [
                    'sourceColumn'  => 'email_template_id',
                    'targetTable'   => 'emailtemplate',
                    'targetColumn'  => 'krtranslate',
                    'displayColumn' => 'name',
                ];
            }

            if (property_exists($table, 'guest_id')) {
                $lookup[] = [
                    'sourceColumn'  => 'guest_id',
                    'targetTable'   => '#__knowres_guest',
                    'targetColumn'  => 'id',
                    'displayColumn' => 'surname',
                ];
            }

            if (property_exists($table, 'guestinfo')) {
                $lookup[] = [
                    'sourceColumn'  => 'guestinfo',
                    'targetTable'   => 'layout',
                    'targetColumn'  => '',
                    'displayColumn' => '',
                ];
            }

            if (property_exists($table, 'service_id')) {
                $lookup[] = [
                    'sourceColumn'  => 'service_id',
                    'targetTable'   => '#__knowres_service',
                    'targetColumn'  => 'id',
                    'displayColumn' => 'name',
                ];
            }

            if (property_exists($table, 'manager_id')) {
                $lookup[] = [
                    'sourceColumn'  => 'manager_id',
                    'targetTable'   => '#__knowres_manager',
                    'targetColumn'  => 'id',
                    'displayColumn' => 'user_id',
                ];
            }

            if (property_exists($table, 'map_category_id')) {
                $lookup[] = [
                    'sourceColumn'  => 'map_category_id',
                    'targetTable'   => 'mapcategory',
                    'targetColumn'  => 'krtranslate',
                    'displayColumn' => 'name',
                ];
            }

            if (property_exists($table, 'mobile_country_id')) {
                $lookup[] = [
                    'sourceColumn'  => 'mobile_country_id',
                    'targetTable'   => 'country',
                    'targetColumn'  => 'krtranslate',
                    'displayColumn' => 'name',
                ];
            }

            if (property_exists($table, 'owner_id')) {
                $lookup[] = [
                    'sourceColumn'  => 'owner_id',
                    'targetTable'   => '#__knowres_owner',
                    'targetColumn'  => 'id',
                    'displayColumn' => 'name',
                ];
            }

            if (property_exists($table, 'properties')) {
                $lookup[] = [
                    'sourceColumn'  => 'properties',
                    'targetTable'   => '#__knowres_property',
                    'targetColumn'  => 'id',
                    'displayColumn' => 'property_name',
                ];
            }

            if (property_exists($table, 'property_alternatives')) {
                $lookup[] = [
                    'sourceColumn'  => 'property_alternatives',
                    'targetTable'   => '#__knowres_property',
                    'targetColumn'  => 'id',
                    'displayColumn' => 'property_name',
                ];
            }

            if (property_exists($table, 'property_features')) {
                $lookup[] = [
                    'sourceColumn'  => 'property_features',
                    'targetTable'   => 'propertyfeature',
                    'targetColumn'  => 'krtranslate',
                    'displayColumn' => 'name',
                ];
            }

            if (property_exists($table, 'property_id')) {
                $lookup[] = [
                    'sourceColumn'  => 'property_id',
                    'targetTable'   => '#__knowres_property',
                    'targetColumn'  => 'id',
                    'displayColumn' => 'property_name',
                ];
            }

            if (property_exists($table, 'property_units')) {
                $lookup[] = [
                    'sourceColumn'  => 'property_units',
                    'targetTable'   => '#__knowres_property',
                    'targetColumn'  => 'id',
                    'displayColumn' => 'property_name',
                ];
            }

            if (property_exists($table, 'region_id')) {
                $lookup[] = [
                    'sourceColumn'  => 'region_id',
                    'targetTable'   => 'region',
                    'targetColumn'  => 'krtranslate',
                    'displayColumn' => 'name',
                ];
            }

            if (property_exists($table, 'b_region_id')) {
                $lookup[] = [
                    'sourceColumn'  => 'b_region_id',
                    'targetTable'   => 'region',
                    'targetColumn'  => 'krtranslate',
                    'displayColumn' => 'name',
                ];
            }

            if ($name == 'guest' && property_exists($table, 'telephone')) {
                $lookup[] = [
                    'sourceColumn'  => 'telephone',
                    'targetTable'   => 'layout',
                    'targetColumn'  => '',
                    'displayColumn' => '',
                ];
            }

            if (property_exists($table, 'town_id')) {
                $lookup[] = [
                    'sourceColumn'  => 'town_id',
                    'targetTable'   => 'town',
                    'targetColumn'  => 'krtranslate',
                    'displayColumn' => 'name',
                ];
            }

            if (property_exists($table, 'type_id')) {
                $lookup[] = [
                    'sourceColumn'  => 'type_id',
                    'targetTable'   => 'type',
                    'targetColumn'  => 'krtranslate',
                    'displayColumn' => 'name',
                ];
            }

            if (property_exists($table, 'updated_by')) {
                $lookup[] = [
                    'sourceColumn'  => 'updated_by',
                    'targetTable'   => '#__users',
                    'targetColumn'  => 'id',
                    'displayColumn' => 'name',
                ];
            }

            if (property_exists($table, 'user_id')) {
                $lookup[] = [
                    'sourceColumn'  => 'user_id',
                    'targetTable'   => '#__users',
                    'targetColumn'  => 'id',
                    'displayColumn' => 'name',
                ];
            }

            $contentType->content_history_options = Utility::encodeJson([
                'formFile'      => 'administrator/components/com_knowres/models/forms/' . $name . '.xml',
                'hideFields'    => $hide,
                'ignoreChanges' => $ignore,
                'convertToInt'  => $convert,
                'displayLookup' => $lookup,
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
        $query
            ->select($db->qn(['id', 'property_features']))
            ->from($db->qn('#__knowres_property'))
            ->where($db->qn('property_features') . '<>' . $db->q(''));

        $db->setQuery($query);
        $rows = $db->loadObjectList();

        foreach ($rows as $r) {
            $features = [];
            if (is_string($r->property_features)) {
                $features = explode(',', $r->property_features);
            } elseif (is_object($r->property_features)) {
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