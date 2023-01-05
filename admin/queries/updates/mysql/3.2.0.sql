# Placeholder file for database changes for version 3.2.0
CREATE TABLE IF NOT EXISTS `#__knowres_room` (
	`id`               INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
	`state`            TINYINT(1)       NOT NULL DEFAULT 1,
	`checked_out`      INT(11)          DEFAULT NULL,
	`checked_out_time` DATETIME         DEFAULT NULL,
	`created_by`       INT(11)          NOT NULL DEFAULT 0,
	`created_at`       DATETIME         DEFAULT NULL,
	`updated_by`       INT(11)          NOT NULL DEFAULT 0,
	`updated_at`       DATETIME         DEFAULT NULL,
	`version`          INT(11)          NOT NULL DEFAULT 1,
	PRIMARY KEY (`id`)
)
	ENGINE = InnoDB
	DEFAULT CHARSET = utf8mb4
	DEFAULT COLLATE = utf8mb4_unicode_ci;