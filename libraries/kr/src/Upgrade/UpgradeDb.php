<?php
/**
 * @package     Know Reservations
 * @subpackage  Library
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\KR\Upgrade;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\TickTock;
use InvalidArgumentException;
use Joomla\Database\DatabaseDriver;
use RuntimeException;
use stdClass;

use function array_key_exists;
use function defined;
use function in_array;
use function is_numeric;

if (!defined('KRFRAMEWORK'))
{
	define('KRFRAMEWORK', 'Joomla');
}

/**
 * Upgrade Db install scripts
 *
 * @since   2.4.0
 */
class UpgradeDb
{
	/**
	 * Changes for V320.
	 *
	 * @throws Exception
	 * @since   4.0.0
	 * @return  void
	 */
	public static function forV320(): void
	{
		$db = KrFactory::getDatabase();

		//ALTER TABLE `#__knowres_agency` ADD COLUMN `tax_code` VARCHAR(30) DEFAULT NULL AFTER `telephone`;
		self::add($db, '#__knowres_agency', 'tax_code', 'telephone', 'VARCHAR(30) DEFAULT NULL');
		//ALTER TABLE `#__knowres_agency` ADD COLUMN `company_number` VARCHAR(30) DEFAULT NULL AFTER `tax_code`;
		self::add($db, '#__knowres_agency', 'company_number', 'tax_code', 'VARCHAR(30) DEFAULT NULL');
		//ALTER TABLE `#__knowres_contract` ADD COLUMN `guest_types` MEDIUMTEXT DEFAULT NULL AFTER `guests`;
		self::add($db, '#__knowres_contract', 'guest_types', 'guests', 'MEDIUMTEXT DEFAULT NULL');
		//ALTER TABLE `#__knowres_property` ADD COLUMN `rooms` MEDIUMTEXT DEFAULT NULL AFTER `checkout_fees`;
		self::add($db, '#__knowres_property', 'rooms', 'checkout_fees', 'MEDIUMTEXT DEFAULT NULL');
		//ALTER TABLE `#__knowres_property`ADD COLUMN  `guest_types` MEDIUMTEXT DEFAULT NULL AFTER `rooms`;
		self::add($db, '#__knowres_property', 'guest_types', 'rooms', 'MEDIUMTEXT DEFAULT NULL');
		//ALTER TABLE `#__knowres_map_marker` DROP COLUMN  `ordering`;
		self::drop($db, '#__knowres_map_marker', 'ordering');
		//ALTER TABLE `#__knowres_property_feature` CHANGE `state` `state` TINYINT(1) NOT NULL DEFAULT 1;
		self::change($db, '#__knowres_property_feature', 'state', 'state', 'TINYINT(1) NOT NULL DEFAULT 1');
		//ALTER TABLE `#__knowres_property_feature` CHANGE `created_by` `created_by` INT(11) NOT NULL DEFAULT 0;
		self::change($db, '#__knowres_property_feature', 'created_by', 'created_by', 'INT(11) NOT NULL DEFAULT 0');
		//ALTER TABLE `#__knowres_property_feature` CHANGE `created_at` `created_at` DATETIME DEFAULT NULL;
		self::change($db, '#__knowres_property_feature', 'created_at', 'created_at', 'DATETIME DEFAULT NULL');
		//ALTER TABLE `#__knowres_property_feature` CHANGE `updated_by` `updated_by` INT(11) NOT NULL DEFAULT 0;
		self::change($db, '#__knowres_property_feature', 'updated_by', 'updated_by', 'INT(11) NOT NULL DEFAULT 0');
		//ALTER TABLE `#__knowres_property_feature` CHANGE `updated_at` `updated_at` DATETIME DEFAULT NULL;
		self::change($db, '#__knowres_property_feature', 'updated_at', 'updated_at', 'DATETIME DEFAULT NULL');
		//ALTER TABLE `#__knowres_property_setting` CHANGE `version` `version` INT(11) DEFAULT 1;
		self::change($db, '#__knowres_property_feature', 'version', 'version', 'INT(11) DEFAULT 1');
		//ALTER TABLE `#__knowres_translation` CHANGE `state` `state` TINYINT(1) NOT NULL DEFAULT 1;
		self::change($db, '#__knowres_translation', 'state', 'state', 'TINYINT(1) DEFAULT 1');
		//INSERT INTO `#__knowres_property_setting`name - 'multiple_bookings', default - 0;
		self::addPS($db, 'multiple_bookings', 0);
	}

	/**
	 * Changes for V321.
	 *
	 * @throws RuntimeException
	 * @throws InvalidArgumentException
	 * @since  4.0.0
	 * @return void
	 */
	public static function forV321(): void
	{
		$db = KrFactory::getDatabase();

		// ALTER TABLE `#__knowres_contract` ADD COLUMN `on_request` TINYINT(1) NOT NULL DEFAULT 0 AFTER `booking_status`;
		self::add($db, '#__knowres_contract', 'on_request', 'booking_status', 'TINYINT(1) NOT NULL DEFAULT 0');
		// ALTER TABLE `#__knowres_contract` ADD COLUMN `adults` TINYINT(1) NOT NULL DEFAULT 0 AFTER `guests`;
		self::add($db, '#__knowres_contract', 'adults', 'guests', 'TINYINT(1) NOT NULL DEFAULT 0');
		// ALTER TABLE `#__knowres_contract` ADD COLUMN `children` TINYINT(1) NOT NULL DEFAULT 0 AFTER `adults`;
		self::add($db, '#__knowres_contract', 'children', 'adults', 'TINYINT(1) NOT NULL DEFAULT 0');
		// ALTER TABLE `#__knowres_contract` ADD COLUMN `infants` TINYINT(1) NOT NULL DEFAULT 0 AFTER `children`;
		self::add($db, '#__knowres_contract', 'infants', 'children', 'TINYINT(1) NOT NULL DEFAULT 0');
		// ALTER TABLE `#__knowres_contract` ADD COLUMN `pets` TINYINT(1) NOT NULL DEFAULT 0 AFTER `infants`;
		self::add($db, '#__knowres_contract', 'pets', 'infants', 'TINYINT(1) NOT NULL DEFAULT 0');
		// ALTER TABLE `#__knowres_property` ADD COLUMN `pets` TINYINT(1) NOT NULL DEFAULT 0 AFTER `sleeps_infant_max`;
		self::add($db, '#__knowres_property', 'pets', 'sleeps_infant_max', 'TINYINT(1) NOT NULL DEFAULT 0');
	}

	/**
	 * Changes for V330.
	 *
	 * @throws Exception
	 * @since  4.0.0
	 * @return void
	 */
	public static function forV330(): void
	{
		$db      = KrFactory::getDatabase();
		$results = $db->setQuery('SHOW TABLES')->loadColumn();
		$prefix  = $db->getPrefix();
		if (in_array($prefix . 'knowres_interface', $results))
		{
			if (in_array($prefix . 'knowres_service', $results))
			{
				// Sort out stupid installation anomaly
				self::dropTable($db, '#__knowres_service');
				self::dropTable($db, '#__knowres_service_log');
				self::dropTable($db, '#__knowres_service_queue');
				self::dropTable($db, '#__knowres_service_xref');
			}
			// RENAME TABLE `#__knowres_interface` TO `#__knowres_service`;
			$query = 'RENAME TABLE ' . $db->qn('#__knowres_interface') . ' TO ' . $db->qn('#__knowres_service');
			$db->setQuery($query);
			$db->execute();
			// RENAME TABLE `#__knowres_interface_log` TO `#__knowres_service_log`;
			$query = 'RENAME TABLE ' . $db->qn('#__knowres_interface_log') . ' TO ' . $db->qn('#__knowres_service_log');
			$db->setQuery($query);
			$db->execute();
			// RENAME TABLE `#__knowres_interface_queue` TO `#__knowres_service_queue`;
			$query = 'RENAME TABLE ' . $db->qn('#__knowres_interface_queue') . ' TO '
				. $db->qn('#__knowres_service_queue');
			$db->setQuery($query);
			$db->execute();
			// RENAME TABLE `#__knowres_interface_xref` TO `#__knowres_service_xref`;
			$query = 'RENAME TABLE ' . $db->qn('#__knowres_interface_xref') . ' TO '
				. $db->qn('#__knowres_service_xref');
			$db->setQuery($query);
			$db->execute();
		}

		//ALTER TABLE `#__knowres_service_xref` ADD COLUMN `sell` TINYINT(1) NOT NULL DEFAULT 1 AFTER `new`;
		self::add($db, '#__knowres_service_xref', 'sell', 'new', 'TINYINT(1) NOT NULL DEFAULT 1');
		//ALTER TABLE `#__knowres_agent` CHANGE `interface_id` `service_id` INT(11) NOT NULL DEFAULT 0;
		self::change($db, '#__knowres_agent', 'interface_id', 'service_id', 'INT(11) NOT NULL DEFAULT 0');
		//ALTER TABLE `#__knowres_contract` CHANGE `interface_commission` `channel_commission` DECIMAL(11,2) NOT NULL DEFAULT 0.00;
		self::change($db, '#__knowres_contract', 'interface_commission', 'channel_commission',
			'DECIMAL(11,2) NOT NULL DEFAULT 0.00');
		//ALTER TABLE `#__knowres_contract` CHANGE `interface_id` `service_id` INT(11) NOT NULL DEFAULT 0;
		self::change($db, '#__knowres_contract', 'interface_id', 'service_id', 'INT(11) NOT NULL DEFAULT 0');
		//ALTER TABLE `#__knowres_contract` CHANGE `tax` `tax_total` DECIMAL(11,2) NOT NULL DEFAULT 0.00;
		self::change($db, '#__knowres_contract', 'tax', 'tax_total', 'DECIMAL(11,2) NOT NULL DEFAULT 0.00');
		//ALTER TABLE `#__knowres_contract` DROP COLUMN `block_before`;
		self::drop($db, '#__knowres_contract', 'block_before');
		//ALTER TABLE `#__knowres_contract` DROP COLUMN `bookedin`;
		self::drop($db, '#__knowres_contract', 'bookedin');
		//ALTER TABLE `#__knowres_contract` DROP COLUMN `bookedout`;
		self::drop($db, '#__knowres_contract', 'bookedout');
		//ALTER TABLE `#__knowres_contract` DROP COLUMN `bookedout_timestamp`;
		self::drop($db, '#__knowres_contract', 'bookedout_timestamp');
		//ALTER TABLE `#__knowres_contract` DROP COLUMN `manual_hold`;
		self::drop($db, '#__knowres_contract', 'manual_hold');
		//ALTER TABLE `#__knowres_contract` DROP COLUMN `manual_payment`;
		self::drop($db, '#__knowres_contract', 'manual_payment');
		//ALTER TABLE `#__knowres_contract` DROP COLUMN `rate_rules`;
		self::drop($db, '#__knowres_contract', 'rate_rules');
		//ALTER TABLE `#__knowres_contract` DROP COLUMN `rooms_tariffs`;
		self::drop($db, '#__knowres_contract', 'rooms_tariffs');
		//ALTER TABLE `#__knowres_contract` CHANGE `email_poststay` `review_requested` TINYINT(1) NOT NULL DEFAULT 0 AFTER `reviewed`;
		self::change($db, '#__knowres_contract', 'email_poststay', 'review_requested', 'TINYINT(1) NOT NULL DEFAULT 0');
		//ALTER TABLE `#__knowres_contract_payment` CHANGE `interface_id` `service_id` 'INT(11) NOT NULL DEFAULT 0';
		self::change($db, '#__knowres_contract_payment', 'interface_id', 'service_id', 'INT(11) NOT NULL DEFAULT 0');
		//ALTER TABLE `#__knowres_contract_payment` CHANGE `interface_ref` `service_ref` VARCHAR(255) DEFAULT NULL;
		self::change($db, '#__knowres_contract_payment', 'interface_ref', 'service_ref', 'VARCHAR(255) DEFAULT NULL');
		//ALTER TABLE `#__knowres_extra` DROP COLUMN `block_before`;
		self::drop($db, '#__knowres_extra', 'block_before');
		//ALTER TABLE `#__knowres_service_queue` CHANGE `interface_id` `service_id` INT(11) NOT NULL DEFAULT 0;
		self::change($db, '#__knowres_service_queue', 'interface_id', 'service_id', 'INT(11) NOT NULL DEFAULT 0');
		//ALTER TABLE `#__knowres_service_log` CHANGE `interface_id` `service_id` INT(11) NOT NULL DEFAULT 0;
		self::change($db, '#__knowres_service_log', 'interface_id', 'service_id', 'INT(11) NOT NULL DEFAULT 0');
		//ALTER TABLE `#__knowres_service_xref` CHANGE `interface_id` `service_id` INT(11) NOT NULL DEFAULT 0;
		self::change($db, '#__knowres_service_xref', 'interface_id', 'service_id', 'INT(11) NOT NULL DEFAULT 0');
		//ALTER TABLE `#__knowres_property_ical` CHANGE `interface_id` `service_id` INT(11) NOT NULL DEFAULT 0;
		self::change($db, '#__knowres_property_ical', 'interface_id', 'service_id', 'INT(11) NOT NULL DEFAULT 0');
		//ALTER TABLE `#__knowres_property_ical` ADD COLUMN `icsdata` TEXT DEFAULT NULL AFTER `link`;
		self::add($db, '#__knowres_property_ical', 'icsdata', 'link', 'TEXT DEFAULT NULL');
		// DROP INDEX IF EXISTS `byInterfacePropertyMethod` ON `#__knowres_service_log`;
		self::dropIndex($db, '#__knowres_service_log', 'byInterfacePropertyMethod');
		//DROP INDEX IF EXISTS `byInterface` ON `#__knowres_service_xref`;
		self::dropIndex($db, '#__knowres_service_xref', 'byInterface');
		//ALTER TABLE `#__knowres_service_log` ADD INDEX `byServicePropertyMethod`(`service_id`, `property_id`, `method`);
		self::addIndex($db, '#__knowres_service_log', 'byServicePropertyMethod', '`service_id`, `property_id`, `method`');
		//ALTER TABLE `#__knowres_service_xref` ADD INDEX `byService`(`service_id`);
		self::addIndex($db, '#__knowres_service_xref', 'byService', '`service_id`');
		//INSERT INTO `#__knowres_property_setting 'service_changes', 'vrbo';
		self::addPS($db, 'security_changes', 'vrbo');
		//INSERT INTO `#__knowres_property_setting 'service_changes', 'vrbo';
		self::addPS($db, 'service_changes', 'vrbo');
	}

	/**
	 * Changes for V331.
	 *
	 * @throws RuntimeException
	 * @throws InvalidArgumentException
	 * @since   4.0.0
	 * @return  void
	 */
	public static function forV331(): void
	{
		$db = KrFactory::getDatabase();

		// ALTER TABLE `#__knowres_service_xref` DROP COLUMN `foreign_roomtype`;
		self::drop($db, '#__knowres_service_xref', 'foreign_roomtype');
		//ALTER TABLE `#__knowres_service_xref` DROP COLUMN `foreign_rateplan`;
		self::drop($db, '#__knowres_service_xref', 'foreign_rateplan');
		// ALTER TABLE `#__knowres_manager` DROP COLUMN `initials`;
		self::drop($db, '#__knowres_manager', 'initials');
		// ALTER TABLE `#__knowres_owner` ADD COLUMN `document_type` VARCHAR(255) DEFAULT NULL AFTER `mobile_country_id`;
		self::add($db, '#__knowres_owner', 'document_type', 'mobile_country_id', 'VARCHAR(255) DEFAULT NULL');
		// ALTER TABLE `#__knowres_owner` ADD COLUMN `pay_deposit` TINYINT(3) NOT NULL DEFAULT 0 AFTER `days`;
		self::add($db, '#__knowres_owner', 'pay_deposit', 'days', 'TINYINT(3) NOT NULL DEFAULT 0');
		// ALTER TABLE `#__knowres_owner` ADD COLUMN `deposit_days` TINYINT(3) NOT NULL DEFAULT 0 AFTER `pay_deposit`;
		self::add($db, '#__knowres_owner', 'deposit_days', 'pay_deposit', 'TINYINT(3) NOT NULL DEFAULT 0');
		// ALTER TABLE `#__knowres_owner` ADD COLUMN `whopays` TINYINT(1) NOT NULL DEFAULT 0 AFTER `deposit_days`;
		self::add($db, '#__knowres_owner', 'whopays', 'deposit_days', 'TINYINT(1) NOT NULL DEFAULT 0');
		// ALTER TABLE `#__knowres_owner` ADD COLUMN `business` TINYINT(1) NOT NULL DEFAULT 0 AFTER `country_id`;
		self::add($db, '#__knowres_owner', 'business', 'country_id', 'TINYINT(1) NOT NULL DEFAULT 0');
		//ALTER TABLE `#__knowres_owner` ADD COLUMN `iban` VARCHAR(22) DEFAULT NULL AFTER `business`;
		self::add($db, '#__knowres_owner', 'iban', 'business', 'VARCHAR(22) DEFAULT NULL');
		//ALTER TABLE `#__knowres_extra` ADD COLUMN `payto` TINYINT(1) NOT NULL DEFAULT 0 AFTER `cleaning`;
		self::add($db, '#__knowres_extra', 'payto', 'cleaning', 'TINYINT(1) NOT NULL DEFAULT 0');
		// ALTER TABLE `#__knowres_type` ADD COLUMN `ordering` INT(11) NOT NULL DEFAULT 0 AFTER `id`;
		self::add($db, '#__knowres_type', 'ordering', 'id', 'INT(11) NOT NULL DEFAULT 0');
	}

	/**
	 * Changes for V333.
	 *
	 * @throws RuntimeException
	 * @throws InvalidArgumentException
	 * @since  4.0.0
	 * @return void
	 */
	public static function forV333(): void
	{
		$db = KrFactory::getDatabase();

		//ALTER TABLE `#__knowres_service_log` ADD INDEX `byPropertyServiceMethod`(`property_id`, `service_id`, `method`);
		self::addIndex($db, '#__knowres_service_log', 'byPropertyServiceMethod',
			'`property_id`, `service_id`, `method`');
		//ALTER TABLE `#__knowres_contract` ADD INDEX `byAvailability` (`property_id`, `departure`, `cancelled`);
		self::addIndex($db, '#__knowres_contract', 'byAvailability', '`property_id`, `departure`, `cancelled`');
		//ALTER TABLE `#__knowres_ical_block` ADD INDEX `byAvailability` (`property_id`, `departure`);
		self::addIndex($db, '#__knowres_ical_block', 'byAvailability', '`property_id`, `departure`');
		//ALTER TABLE `#__knowres_agent` ADD COLUMN `owner_deposit_payment` TINYINT(1) NOT NULL DEFAULT 0 AFTER `foreign_key_reqd`;
		self::add($db, '#__knowres_agent', 'owner_deposit_payment', 'foreign_key_reqd',
			'TINYINT(1) NOT NULL DEFAULT 0');
		//ALTER TABLE `#__knowres_property` ADD COLUMN `service_id` INT(11) NOT NULL DEFAULT 0 AFTER `approved`;
		self::add($db, '#__knowres_property', 'service_id', 'approved', 'INT(11) NOT NULL DEFAULT 0');
		//ALTER TABLE `#__knowres_property` ADD COLUMN `resell` TINYINT(1) NOT NULL DEFAULT 1 AFTER `service_id`;
		self::add($db, '#__knowres_property', 'resell', 'service_id', 'TINYINT(1) NOT NULL DEFAULT 0');
		//ALTER TABLE `#__knowres_service_xref` ADD COLUMN `table_name` VARCHAR(30) DEFAULT NULL AFTER `service_id`;
		self::add($db, '#__knowres_service_xref', 'table_name', 'service_id', 'VARCHAR(30) DEFAULT NULL');
		//ALTER TABLE `#__knowres_service_xref` ADD COLUMN `table_id` INT(11) NOT NULL DEFAULT 0 AFTER `table_name`;
		self::add($db, '#__knowres_service_xref', 'table_id', 'table_name', 'INT(11) NOT NULL DEFAULT 0');
	}

	/**
	 * Changes for V400.
	 *
	 * @throws Exception
	 * @since  4.0.0
	 * @return void
	 */
	public static function forV400(): void
	{
		$db = KrFactory::getDatabase();

		//ALTER TABLE `#__knowres_owner` CHANGE `iban` `iban` VARCHAR(50) DEFAULT NULL;
		self::change($db, '#__knowres_owner', 'iban', 'iban', 'VARCHAR(50) DEFAULT NULL');
		//ALTER TABLE `#__knowres_contract_payment` CHANGE `rate` `rate` DECIMAL(14,5) NOT NULL DEFAULT 0.00000;
		self::change($db, '#__knowres_contract_payment', 'rate', 'rate', 'DECIMAL(14,5) NOT NULL DEFAULT 0.00000');
		//ALTER TABLE `#__knowres_contract` ADD COLUMN `nightly` TEXT DEFAULT NULL AFTER `adjustments`;
		self::add($db, '#__knowres_contract', 'nightly', 'adjustments', 'TEXT DEFAULT NULL');
		//ALTER TABLE `#__knowres_contract` ADD COLUMN `commission` DECIMAL(11,2) NOT NULL DEFAULT 0.00 AFTER `balance_date`;
		self::add($db, '#__knowres_contract', 'commission', 'balance_date', 'DECIMAL(11,2) NOT NULL DEFAULT 0.00');
		//ALTER TABLE `#__knowres_contract` ADD COLUMN `markup` DECIMAL(11,2) NOT NULL DEFAULT 0.00 AFTER `commission`;
		self::add($db, '#__knowres_contract', 'markup', 'commission', 'DECIMAL(11,2) NOT NULL DEFAULT 0.00');
		//ALTER TABLE `#__knowres_contract` ADD COLUMN `child_ages` VARCHAR(255) DEFAULT NULL AFTER `children`;
		self::add($db, '#__knowres_contract', 'child_ages', 'children', 'VARCHAR(255) DEFAULT NULL');
		//ALTER TABLE `#__knowres_country` ADD COLUMN `property_licence` TINYINT(1) DEFAULT 0 AFTER `allow_property`;
		self::add($db, '#__knowres_country', 'property_licence', 'allow_property', 'TINYINT(1) DEFAULT 0');
		//ALTER TABLE `#__knowres_coupon` DROP COLUMN `ordering`;
		self::drop($db, '#__knowres_coupon', 'ordering');
		//ALTER TABLE `#__knowres_owner` ADD COLUMN `deposit_pc` TINYINT(1) NOT NULL DEFAULT 0 AFTER `pay_deposit`;
		self::add($db, '#__knowres_owner', 'deposit_pc', 'pay_deposit', 'TINYINT(1) DEFAULT 0');
		//ALTER TABLE `#__knowres_tax_rate` ADD COLUMN `tax_type` VARCHAR(10) DEFAULT NULL AFTER `tax_id`;
		self::add($db, '#__knowres_tax_rate', 'tax_type', 'tax_id', 'VARCHAR(10) DEFAULT NULL');
		//ALTER TABLE `#__knowres_tax_rate` ADD COLUMN `agent` VARCHAR(255) DEFAULT NULL AFTER `code`;
		self::add($db, '#__knowres_tax_rate', 'agent', 'code', 'VARCHAR(255) DEFAULT NULL');
		//ALTER TABLE `#__knowres_tax_rate` ADD COLUMN `reduced_rate` decimal(6,3) NOT NULL DEFAULT 0.000 AFTER `max_nights`;
		self::add($db, '#__knowres_tax_rate', 'reduced_rate', 'max_nights', 'DECIMAL(6,3) NOT NULL DEFAULT 0.000');
		//ALTER TABLE `#__knowres_tax_rate` ADD COLUMN `gross` TINYINT(1) NOT NULL DEFAULT 0 AFTER `tax_type`;
		self::add($db, '#__knowres_tax_rate', 'gross', 'tax_type', 'TINYINT(1) NOT NULL DEFAULT 0');
		//ALTER TABLE `#__knowres_tax_rate` ADD COLUMN `pay_arrival` TINYINT(1) NOT NULL DEFAULT 0 AFTER `gross`;
		self::add($db, '#__knowres_tax_rate', 'pay_arrival', 'gross', 'TINYINT(1) NOT NULL DEFAULT 0');
		//ALTER TABLE `#__knowres_tax_rate` ADD COLUMN `taxrate_id` INT(11) NOT NULL DEFAULT 0 AFTER `valid_from`;
		self::add($db, '#__knowres_tax_rate', 'taxrate_id', 'valid_from', 'INT(11) NOT NULL DEFAULT 0');
		//ALTER TABLE `#__knowres_tax_rate` CHANGE COLUMN `child_age` `applicable_age` TINYINT(2) NOT NULL DEFAULT 0;
		self::change($db, '#__knowres_tax_rate', 'child_age', 'applicable_age', 'TINYINT(2) NOT NULL DEFAULT 0');
		//ALTER TABLE `#__knowres_agent` DROP COLUMN `tax1_charge`;
		self::drop($db, '#__knowres_agent', 'tax1_charge');
		//ALTER TABLE `#__knowres_agent` DROP COLUMN `tax1_excluded`;
		self::drop($db, '#__knowres_agent', 'tax1_excluded');
		//ALTER TABLE `#__knowres_agent` DROP COLUMN `tax2_charge`;
		self::drop($db, '#__knowres_agent', 'tax2_charge');
		//ALTER TABLE `#__knowres_agent` DROP COLUMN `tax2_excluded`;
		self::drop($db, '#__knowres_agent', 'tax2_excluded');
		//ALTER TABLE `#__knowres_agent` DROP COLUMN `tax3_charge`;
		self::drop($db, '#__knowres_agent', 'tax3_charge');
		//ALTER TABLE `#__knowres_agent` DROP COLUMN `tax3_excluded`;
		self::drop($db, '#__knowres_agent', 'tax3_excluded');
		//ALTER TABLE `#__knowres_review` DROP COLUMN `ordering`;
		self::drop($db, '#__knowres_review', 'ordering');
		//ALTER TABLE `#__knowres_agent` DROP COLUMN `agent_markup`;
		self::drop($db, '#__knowres_agent', 'agent_markup');
		// INSERT INTO `#__knowres_property_setting` (`id`, `property_id`, `akey`, `value`, `created_at`, `created_by`, `updated_at`, `updated_by`, `version`) VALUES (0, 0, 'tax_ignore', '0', NOW(), '0', NULL, '0', '1');
		self::addPS($db, 'tax_ignore', 0);

		// DELETE FROM `#__knowres_service` WHERE `agency_id` = 0;
		$query = 'DELETE FROM ' . $db->qn('#__knowres_service') . ' WHERE ' . $db->qn('agency_id') . '=0';
		$db->setQuery($query);
		$db->execute();
		// UPDATE `#__knowres_service` SET `plugin` = 'vrbo' WHERE `plugin` = 'ha';
		$query = 'UPDATE ' . $db->qn('#__knowres_service') . ' SET ' . $db->qn('plugin') . '=' . $db->q('vrbo')
			. ' WHERE ' . $db->qn('plugin') . '=' . $db->q('ha');
		$db->setQuery($query);
		$db->execute();
	}

	/**
	 * Changes for V410.
	 *
	 * @throws RuntimeException
	 * @throws InvalidArgumentException|Exception
	 * @since  4.0.0
	 * @return void
	 */
	public static function forV410(): void
	{
		$db = KrFactory::getDatabase();

		//ALTER TABLE `#__knowres_contract_guestdata` DROP COLUMN `vmobile`;
		self::drop($db, '#__knowres_contract_guestdata', 'vmobile');
		//ALTER TABLE `#__knowres_contract_guestdata` DROP COLUMN `vmobile_country_id`;
		self::drop($db, '#__knowres_contract_guestdata', 'vmobile_country_id');
		// ALTER TABLE `#__knowres_tax_rate` ADD COLUMN `tt_option` TINYINT(1) NOT NULL DEFAULT 0 AFTER `taxrate_id`;
		self::add($db, '#__knowres_tax_rate', 'tt_option', 'taxrate_id', 'TINYINT(1) NOT NULL DEFAULT 0');

		self::updateTaxSettings();
	}

	/**
	 * Add database column.
	 *
	 * @param  DatabaseDriver  $db       Database instance
	 * @param  string          $table    Table name
	 * @param  string          $field    Column name
	 * @param  string          $after    Column name after
	 * @param  mixed           $default  Default value
	 *
	 * @throws RuntimeException
	 * @throws InvalidArgumentException
	 * @since  4.0.0
	 * @return void
	 */
	protected static function add(DatabaseDriver $db, string $table, string $field, string $after, mixed $default): void
	{
		$columns = $db->getTableColumns($table);
		if (!array_key_exists($field, $columns))
		{
			$query = 'ALTER TABLE ' . $db->qn($table) . ' ADD COLUMN ' . $db->qn($field) . ' ' . $default . ' AFTER '
				. $db->qn($after);
			$db->setQuery($query);
			$db->execute();
		}
	}

	/**
	 * Add table index.
	 *
	 * @param  DatabaseDriver  $db     Database instance
	 * @param  string          $table  Table name
	 * @param  string          $index  Index name
	 * @param  string          $keys   Index keys
	 *
	 * @since  4.0.0
	 * @return void
	 */
	protected static function addIndex(DatabaseDriver $db, string $table, string $index, string $keys): void
	{
		try
		{
			$query = 'ALTER TABLE ' . $db->qn($table) . ' ADD INDEX ' . $db->qn($index) . '(' . $keys . ')';
			$db->setQuery($query);
			$db->execute();
		}
		catch (Exception)
		{
			// Do nothing index exists
		}
	}

	/**
	 * Add property setting.
	 *
	 * @param  DatabaseDriver  $db       Database instance
	 * @param  string          $akey     Name
	 * @param  string          $default  Default value
	 *
	 * @throws Exception
	 * @since  4.0.0
	 * @return void
	 */
	protected static function addPS(DatabaseDriver $db, string $akey, mixed $default): void
	{
		$query = $db->getQuery(true);
		$query->select($db->qn('a.id'))
		      ->from($db->qn('#__knowres_property_setting', 'a'))
		      ->where($db->qn('a.akey') . '=' . $db->q($akey))
		      ->where($db->qn('a.property_id') . '=0');

		$db->setQuery($query);
		$id = $db->loadObjectList();

		if (!is_countable($id))
		{
			$new              = new stdClass();
			$new->id          = 0;
			$new->property_id = 0;
			$new->akey        = $akey;
			$new->value       = $default;
			$new->created_by  = 0;
			$new->created_at  = TickTock::getTS();
			KrFactory::insert('property_setting', $new);
		}
	}

	/**
	 * Change the database
	 *
	 * @param  DatabaseDriver  $db       Database instance
	 * @param  string          $table    Table name
	 * @param  string          $field    Row name
	 * @param  string          $new      New name
	 * @param  mixed           $default  Default value
	 *
	 * @throws RuntimeException
	 * @throws InvalidArgumentException
	 * @since  4.0.0
	 */
	protected static function change(DatabaseDriver $db, string $table, string $field, string $new,
		mixed $default): void
	{
		$columns = $db->getTableColumns($table);
		if (array_key_exists($field, $columns))
		{
			$query = 'ALTER TABLE ' . $db->qn($table) . ' CHANGE ' . $db->qn($field) . ' ' . $db->qn($new) . ' '
				. $default;
			$db->setQuery($query);
			$db->execute();
		}
	}

	/**
	 * Drop the database
	 *
	 * @param  DatabaseDriver  $db     Database instance
	 * @param  string          $table  Table name
	 * @param  string          $field  Row name
	 *
	 * @throws RuntimeException
	 * @throws InvalidArgumentException
	 * @since  4.0.0
	 * @return void
	 */
	protected static function drop(DatabaseDriver $db, string $table, string $field): void
	{
		$columns = $db->getTableColumns($table);
		if (array_key_exists($field, $columns))
		{
			$query = 'ALTER TABLE ' . $db->qn($table) . ' DROP COLUMN ' . $db->qn($field);
			$db->setQuery($query);
			$db->execute();
		}
	}

	/**
	 * Drop table
	 *
	 * @param  DatabaseDriver  $db     Database instance
	 * @param  string          $table  Table name
	 *
	 * @since  4.0.0
	 * @return void
	 */
	protected static function dropTable(DatabaseDriver $db, string $table): void
	{
		try
		{
			$query = 'DROP TABLE ' . $db->qn($table);
			$db->setQuery($query);
			$db->execute();
		}
		catch (Exception)
		{
			// Do nothing TABLE does not exist
		}
	}

	/**
	 * Drop index
	 *
	 * @param  DatabaseDriver  $db     Database instance
	 * @param  string          $table  Table name
	 * @param  string          $index  Index name
	 *
	 * @since  4.0.0
	 * @return void
	 */
	protected static function dropIndex(DatabaseDriver $db, string $table, string $index): void
	{
		try
		{
			$query = 'ALTER TABLE ' . $db->qn($table) . ' DROP INDEX ' . $db->qn($index);
			$db->setQuery($query);
			$db->execute();
		}
		catch (Exception)
		{
			// Do nothing index does not exist
		}
	}

	/**
	 * Update property settings taxes to replace tax ID with tax code
	 *
	 * @since  4.1.0
	 */
	public static function updateTaxSettings(): void
	{
		$db    = KrFactory::getDatabase();
		$query = $db->getQuery(true);

		$query->select($db->qn(['id', 'akey', 'value']))
		      ->from($db->qn('#__knowres_property_setting'))
		      ->where($db->qn('akey') . ' IN  ("tax_code_1", "tax_code_2", "tax_code_3")');
		$db->setQuery($query);
		$rows = $db->loadObjectList();

		foreach ($rows as $r)
		{
			if ($r->value == 0)
			{
				$update        = new stdClass();
				$update->id    = $r->id;
				$update->value = '';
				KrFactory::update('property_setting', $update);
			}
			else if ($r->value > 0 && is_numeric($r->value))
			{
				$query = $db->getQuery(true);
				$query->select($db->qn('code'))
				      ->from($db->qn('#__knowres_tax_rate'))
				      ->where($db->qn('id') . '=' . (int) $r->value)
				      ->setLimit(1);
				$db->setQuery($query);
				$code = $db->loadResult();

				$update        = new stdClass();
				$update->id    = $r->id;
				$update->value = $code;
				KrFactory::update('property_setting', $update);
			}
		}
	}
}