# Placeholder file for database changes for version 3.3.0
DELETE FROM `#__knowres_interface` WHERE `plugin` = "expedia";
DELETE FROM `#__knowres_interface` WHERE `plugin` = "flipkey";
DELETE FROM `#__knowres_interface` WHERE `plugin` = "flipkeylead";
DELETE FROM `#__knowres_interface` WHERE `plugin` = "homeaway";
DELETE FROM `#__knowres_interface` WHERE `plugin` = "kigo";
DELETE FROM `#__knowres_interface` WHERE `plugin` = "vreasy";
DELETE FROM `#__knowres_interface` WHERE `plugin` = "vrbo";
DELETE FROM `#__knowres_interface` WHERE `plugin` = "xpat";
DROP TABLE IF EXISTS `#__knowres_dynamic_rate`;

-- #New settings
DELETE FROM `#__knowres_property_setting` WHERE `akey` = 'bookingform_requiredfields_email';
DELETE FROM `#__knowres_property_setting` WHERE `akey` = 'manager_requiredfields_email';
DELETE FROM `#__knowres_property_setting` WHERE `akey` = 'b2b_discount';
DELETE FROM `#__knowres_property_setting` WHERE `akey` = 'special_tag';
UPDATE `#__knowres_contract` SET `agency_id` = 1 WHERE `agency_id` = 0 AND `black_booking` = 0;

CREATE TABLE IF NOT EXISTS `#__knowres_ical_block` (
	`id`          INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
	`property_id` INT(11)          NOT NULL DEFAULT 0,
	`service_id`  INT(11)          NOT NULL DEFAULT 0,
	`arrival`     DATE             DEFAULT NULL,
	`departure`   DATE             DEFAULT NULL,
	`note`        MEDIUMTEXT       DEFAULT NULL,
	`created_at`  DATETIME         DEFAULT NULL,
	PRIMARY KEY (`id`),
	KEY `byPropertyArrival`(`property_id`, `arrival`),
	KEY `byServiceProperty`(`service_id`, `property_id`, `arrival`)
)
	ENGINE = InnoDB
	DEFAULT CHARSET = utf8mb4
	DEFAULT COLLATE = utf8mb4_unicode_ci;