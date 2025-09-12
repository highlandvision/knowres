# Placeholder file for database changes for version 3.3.1
CREATE TABLE IF NOT EXISTS `#__knowres_owner_payment` (
	`id`               INT(11)          NOT NULL AUTO_INCREMENT,
	`owner_id`         INT(11)          NOT NULL DEFAULT 0,
	`contract_id`      INT(11)          NOT NULL DEFAULT 0,
	`amount`           DECIMAL(11,2)    NOT NULL DEFAULT 0.00,
	`calculated`       DECIMAL(11,2)    NOT NULL DEFAULT 0.00,
	`type`             VARCHAR(3)       DEFAULT NULL,
	`payment_date`     DATE             DEFAULT NULL,
	`payment_ref`      VARCHAR(50)      DEFAULT NULL,
	`confirmed`        TINYINT(1)       NOT NULL DEFAULT 0,
	`confirmed_at`     DATETIME         DEFAULT NULL,
	`confirmed_by`     INT(11)          NOT NULL DEFAULT 0,
	`state`            TINYINT(1)       NOT NULL DEFAULT 1,
	`created_by`       INT(11)          NOT NULL DEFAULT 0,
	`created_at`       DATETIME         DEFAULT NULL,
	`updated_by`       INT(11)          NOT NULL DEFAULT 0,
	`updated_at`       DATETIME         DEFAULT NULL,
	PRIMARY KEY (`id`),
	KEY `byContract` (`contract_id`),
	KEY `byOwner` (`owner_id`)
)
	ENGINE=InnoDB
	DEFAULT CHARSET=utf8mb4
	COLLATE=utf8mb4_unicode_ci;