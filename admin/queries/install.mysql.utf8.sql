CREATE TABLE IF NOT EXISTS `#__knowres_agency` (
	`id`               INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
	`name`             VARCHAR(255)     DEFAULT NULL,
	`street`           VARCHAR(255)     DEFAULT NULL,
	`town`             VARCHAR(255)     DEFAULT NULL,
	`postcode`         VARCHAR(255)     DEFAULT NULL,
	`region_id`        INT(11)          NOT NULL DEFAULT 0,
	`country_id`       INT(11)          NOT NULL DEFAULT 0,
	`telephone`        VARCHAR(100)     DEFAULT NULL,
    `tax_code`         VARCHAR(30)      DEFAULT NULL,
    `company_number`   VARCHAR(30)      DEFAULT NULL,
	`ordering`         INT(11)          NOT NULL DEFAULT 0,
	`state`            TINYINT(1)       NOT NULL DEFAULT 0,
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

CREATE TABLE IF NOT EXISTS `#__knowres_agent` (
	`id`                        INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
	`name`                      VARCHAR(255)     DEFAULT NULL,
	`service_id`                INT(11)          NOT NULL DEFAULT 0,
	`foreign_key`               VARCHAR(255)     DEFAULT NULL,
	`mandatory_extras_charge`   TINYINT(1)       NOT NULL DEFAULT 0,
	`mandatory_extras_excluded` TINYINT(1)       NOT NULL DEFAULT 0,
	`deposit`                   DECIMAL(11,4)    NOT NULL DEFAULT 0.0000,
	`deposit_paid`              TINYINT(1)       NOT NULL DEFAULT 0,
	`deposit_unconfirmed`       DECIMAL(11,4)    NOT NULL DEFAULT 0.0000,
	`deposit_unconfirmed_agent` TINYINT(1)       NOT NULL DEFAULT 0,
	`expiry_days`               VARCHAR(3)       DEFAULT NULL,
	`balance_days`              VARCHAR(3)       DEFAULT NULL,
	`agent_markup`              DECIMAL(11,4)    NOT NULL DEFAULT 0.0000,
	`commission`                DECIMAL(11,4)    NOT NULL DEFAULT 0.0000,
	`provisional_email_text`    MEDIUMTEXT       NULL,
	`confirmed_email_text`      MEDIUMTEXT       NULL,
	`invoice_text`              MEDIUMTEXT       NULL,
	`foreign_key_reqd`          TINYINT(1)       NOT NULL DEFAULT 0,
	`owner_deposit_payment`     TINYINT(1)       NOT NULL DEFAULT 0,
	`state`                     TINYINT(1)       NOT NULL DEFAULT 1,
	`checked_out`               INT(11)          DEFAULT NULL,
	`checked_out_time`          DATETIME         DEFAULT NULL,
	`created_by`                INT(11)          NOT NULL DEFAULT 0,
	`created_at`                DATETIME         DEFAULT NULL,
	`updated_by`                INT(11)          NOT NULL DEFAULT 0,
	`updated_at`                DATETIME         DEFAULT NULL,
	`version`                   INT(11)          NOT NULL DEFAULT 0,
	PRIMARY KEY (`id`),
	KEY `byService`(`service_id`)
)
	ENGINE = InnoDB
	DEFAULT CHARSET = utf8mb4
	DEFAULT COLLATE = utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `#__knowres_bed_type` (
	`id`               INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
	`bedicon`          VARCHAR(255)     DEFAULT NULL,
	`generic`          VARCHAR(20)      DEFAULT NULL,
	`ordering`         INT(11)          NOT NULL DEFAULT 0,
	`state`            TINYINT(1)       NOT NULL DEFAULT 0,
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

CREATE TABLE IF NOT EXISTS `#__knowres_category` (
	`id`               INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
	`ordering`         INT(11)          NOT NULL DEFAULT 0,
	`state`            TINYINT(1)       NOT NULL DEFAULT 0,
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

CREATE TABLE IF NOT EXISTS `#__knowres_cluster` (
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

CREATE TABLE IF NOT EXISTS `#__knowres_contract` (
	`id`                      INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
	`tag`                     VARCHAR(20)      DEFAULT NULL,
	`booking_status`          TINYINT(2)       NULL DEFAULT 1,
	`on_request`              TINYINT(1)       NOT NULL DEFAULT 0,
	`property_id`             INT(11)          NOT NULL DEFAULT 0,
	`guest_id`                INT(11)          NOT NULL DEFAULT 0,
	`agency_id`               INT(11)          NOT NULL DEFAULT 0,
	`manager_id`              INT(11)          NOT NULL DEFAULT 0,
	`service_id`              INT(11)          NOT NULL DEFAULT 0,
	`agent_id`                INT(11)          NOT NULL DEFAULT 0,
	`arrival`                 DATE             DEFAULT NULL,
	`departure`               DATE             DEFAULT NULL,
	`guests`                  INT(4)           NOT NULL DEFAULT 0,
	`adults`                  TINYINT(1)       NOT NULL DEFAULT 0,
	`children`                TINYINT(1)       NOT NULL DEFAULT 0,
    `child_ages`              VARCHAR(255)	   DEFAULT NULL,
	`infants`                 TINYINT(1)       NOT NULL DEFAULT 0,
	`pets`                    TINYINT(1)       NOT NULL DEFAULT 0,
	`guest_types`             TEXT             DEFAULT NULL,
	`rooms`                   TEXT             DEFAULT NULL,
	`currency`                CHAR(3)          DEFAULT NULL,
	`deposit`                 DECIMAL(11,2)    NOT NULL DEFAULT 0.00,
	`deposit_system`          DECIMAL(11,2)    NOT NULL DEFAULT 0.00,
	`room_total_gross`        DECIMAL(11,2)    NOT NULL DEFAULT 0.00,
	`room_total_gross_system` DECIMAL(11,2)    NOT NULL DEFAULT 0.00,
	`room_total`              DECIMAL(11,2)    NOT NULL DEFAULT 0.00,
	`contract_total`          DECIMAL(11,2)    NOT NULL DEFAULT 0.00,
	`extras`                  TEXT             DEFAULT NULL,
	`extra_total`             DECIMAL(11,2)    NOT NULL DEFAULT 0.00,
	`taxes`                   TEXT             DEFAULT NULL,
	`tax_total`               DECIMAL(11,2)    NOT NULL DEFAULT 0.00,
	`discount`                DECIMAL(11,2)    NOT NULL DEFAULT 0.00,
	`discount_system`         DECIMAL(11,2)    NOT NULL DEFAULT 0.00,
	`discounts`               TEXT             DEFAULT NULL,
	`adjustments`             TEXT             DEFAULT NULL,
	`nightly`                 TEXT             DEFAULT NULL,
	`cancelled`               TINYINT(1)       NOT NULL DEFAULT 0,
	`cancelled_timestamp`     DATETIME         DEFAULT NULL,
	`coupon_id`               INT(11)          NOT NULL DEFAULT 0,
	`coupon_discount`         DECIMAL(11,2)    NOT NULL DEFAULT 0.00,
	`expiry_days`             INT(3)           NOT NULL DEFAULT 0,
	`expiry_date`             DATE             DEFAULT NULL,
	`balance_days`            INT(3)           NOT NULL DEFAULT 0,
	`balance_date`            DATE             DEFAULT NULL,
	`commission`              DECIMAL(11,2)   NOT NULL DEFAULT 0.00,
	`markup`                  DECIMAL(11,2)   NOT NULL DEFAULT 0.00,
	`net_price`               DECIMAL(11,2)   NOT NULL DEFAULT 0.00,
	`net_price_system`        DECIMAL(11,2)   NOT NULL DEFAULT 0.00,
	`agent_value`             DECIMAL(11,2)   NOT NULL DEFAULT 0.00,
	`agent_commission`        DECIMAL(11,2)   NOT NULL DEFAULT 0.00,
	`agent_reference`         VARCHAR(100)     DEFAULT NULL,
	`agent_deposit_paid`      TINYINT(1)       NOT NULL DEFAULT 0,
	`channel_commission`      DECIMAL(11,2)   NOT NULL DEFAULT 0.00,
	`black_booking`           TINYINT(1)       NOT NULL DEFAULT 0,
	`reviewed`                TINYINT(1)       NOT NULL DEFAULT 0,
	`review_requested`        TINYINT(1)       NOT NULL DEFAULT 0,
	`qkey`                    VARCHAR(255)     DEFAULT NULL,
	`state`                   TINYINT(1)       NOT NULL DEFAULT 0,
	`checked_out`             INT(11)          DEFAULT NULL,
	`checked_out_time`        DATETIME         DEFAULT NULL,
	`created_by`              INT(11)          NOT NULL DEFAULT 0,
	`created_at`              DATETIME         DEFAULT NULL,
	`updated_by`              INT(11)          NOT NULL DEFAULT 0,
	`updated_at`              DATETIME         DEFAULT NULL,
	PRIMARY KEY (`id`),
	KEY `byDefaultList`(`departure`, `black_booking`, `cancelled`),
	KEY `byArrival`(`arrival`),
	KEY `byBookingStatus`(`booking_status`),
	KEY `byProperty`(`property_id`),
	KEY `byGuest`(`guest_id`),
	KEY `byGantt`(`cancelled`, `property_id`, `departure`, `arrival`),
	KEY `byAvailability`(`property_id`, `departure`, `cancelled`)
)
	ENGINE = InnoDB
	DEFAULT CHARSET = utf8mb4
	DEFAULT COLLATE = utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `#__knowres_contract_fee` (
	`id`                  INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
	`description`         VARCHAR(500)     DEFAULT NULL,
	`value`               DECIMAL(11,2)    NOT NULL DEFAULT 0,
	`contract_id`         INT(11)          NOT NULL DEFAULT 0,
	`contract_payment_id` INT(11)          NOT NULL DEFAULT 0,
	`actioned`            TINYINT(1)       NOT NULL DEFAULT 0,
	`checked_out`         INT(11)          DEFAULT NULL,
	`checked_out_time`    DATETIME         DEFAULT NULL,
	`created_by`          INT(11)          NOT NULL DEFAULT 0,
	`created_at`          DATETIME         DEFAULT NULL,
	PRIMARY KEY (`id`),
	KEY `byContractCreatedAt`(`contract_id`, `created_at`)
)
	ENGINE = InnoDB
	DEFAULT CHARSET = utf8mb4
	DEFAULT COLLATE = utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `#__knowres_contract_guestdata` (
	`id`                 INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
	`contract_id`        INT(11)          NOT NULL DEFAULT 0,
	`guest_id`           INT(11)          NOT NULL DEFAULT 0,
	`adults`             TINYINT(1)       NOT NULL DEFAULT 0,
	`children`           VARCHAR(100)     DEFAULT NULL,
	`infants`            TINYINT(1)       NOT NULL DEFAULT 0,
	`guestinfo`          TEXT             DEFAULT NULL,
	`c_name`             VARCHAR(255)     DEFAULT NULL,
	`c_phone`            VARCHAR(255)     DEFAULT NULL,
	`c_email`            VARCHAR(255)     DEFAULT NULL,
	`arrival_means`      VARCHAR(255)     DEFAULT NULL,
	`arrival_time`       VARCHAR(255)     DEFAULT NULL,
	`arrival_place`      VARCHAR(255)     DEFAULT NULL,
	`arrival_from`       VARCHAR(255)     DEFAULT NULL,
	`arrival_air`        TEXT             DEFAULT NULL,
	`other_information`  TEXT             DEFAULT NULL,
	`departure_time`     VARCHAR(255)     DEFAULT NULL,
	`departure_means`    VARCHAR(255)     DEFAULT NULL,
	`departure_number`   VARCHAR(255)     DEFAULT NULL,
	`options`            TEXT             DEFAULT NULL,
	`preferences`        TEXT             DEFAULT NULL,
	`checked_out`      INT(11)          DEFAULT NULL,
	`checked_out_time`   DATETIME         DEFAULT NULL,
	`created_by`         INT(11)          NOT NULL DEFAULT 0,
	`created_at`         DATETIME         DEFAULT NULL,
	`updated_by`         INT(11)          NOT NULL DEFAULT 0,
	`updated_at`         DATETIME         DEFAULT NULL,
	`version`            INT(11)          NOT NULL DEFAULT 0,
	PRIMARY KEY (`id`),
	KEY `byContract`(`contract_id`)
)
	ENGINE = InnoDB
	DEFAULT CHARSET = utf8mb4
	DEFAULT COLLATE = utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `#__knowres_contract_note` (
	`id`               INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
	`contract_id`      INT(11)          NOT NULL DEFAULT 0,
	`note`             TEXT             DEFAULT NULL,
	`note_type`        VARCHAR(20)      DEFAULT NULL,
	`checked_out`      INT(11)          DEFAULT NULL,
	`checked_out_time` DATETIME         DEFAULT NULL,
	`created_by`       INT(11)          NOT NULL DEFAULT 0,
	`created_at`       DATETIME         DEFAULT NULL,
	`updated_by`       INT(11)          NOT NULL DEFAULT 0,
	`updated_at`       DATETIME         DEFAULT NULL,
	PRIMARY KEY (`id`),
	KEY `byContract`(`contract_id`)
)
	ENGINE = InnoDB
	DEFAULT CHARSET = utf8mb4
	DEFAULT COLLATE = utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `#__knowres_contract_payment` (
	`id`               INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
	`contract_id`      INT(11)          NOT NULL DEFAULT 0,
	`service_id`       INT(11)          NOT NULL DEFAULT 0,
	`payment_date`     DATE             DEFAULT NULL,
	`amount`           DECIMAL(11,2)   NOT NULL DEFAULT 0.00,
	`rate`             DECIMAL(14,5)   NOT NULL DEFAULT 0.00000,
	`base_amount`      DECIMAL(11,2)   NOT NULL DEFAULT 0.00,
	`currency`         VARCHAR(3)       DEFAULT NULL,
	`payment_ref`      VARCHAR(255)     DEFAULT NULL,
	`note`             VARCHAR(500)     DEFAULT NULL,
	`confirmed`        TINYINT(1)       NOT NULL DEFAULT 0,
	`service_ref`      VARCHAR(255)     DEFAULT NULL,
	`actioned`         TINYINT(1)       NOT NULL DEFAULT 0,
	`actioned_at`      DATETIME         DEFAULT NULL,
	`state`            TINYINT(1)       NOT NULL DEFAULT 0,
	`checked_out`      INT(11)          DEFAULT NULL,
	`checked_out_time` DATETIME         DEFAULT NULL,
	`created_by`       INT(11)          NOT NULL DEFAULT 0,
	`created_at`       DATETIME         DEFAULT NULL,
	`updated_by`       INT(11)          NOT NULL DEFAULT 0,
	`updated_at`       DATETIME         DEFAULT NULL,
	PRIMARY KEY (`id`),
	KEY `byContractDate`(`contract_id`, `payment_date`)
)
	ENGINE = InnoDB
	DEFAULT CHARSET = utf8mb4
	DEFAULT COLLATE = utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `#__knowres_country` (
	`id`               INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
	`country_iso`      CHAR(2)          DEFAULT NULL,
	`dial_code`        VARCHAR(6)       DEFAULT NULL,
	`allow_property`   TINYINT(1)       NOT NULL DEFAULT 0,
	`state`            TINYINT(1)       NOT NULL DEFAULT 0,
	`checked_out`      INT(11)          DEFAULT NULL,
	`checked_out_time` DATETIME         DEFAULT NULL,
	`created_by`       INT(11)          NOT NULL DEFAULT 0,
	`created_at`       DATETIME         DEFAULT NULL,
	`updated_by`       INT(11)          NOT NULL DEFAULT 0,
	`updated_at`       DATETIME         DEFAULT NULL,
	`version`          INT(11)          NOT NULL DEFAULT 1,
	PRIMARY KEY (`id`),
	KEY `byAllowPropertyId`(`allow_property`, `id`)
)
	ENGINE = InnoDB
	DEFAULT CHARSET = utf8mb4
	DEFAULT COLLATE = utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `#__knowres_coupon` (
	`id`               INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
	`property_id`      INT(11)          NOT NULL DEFAULT 0,
	`coupon_code`      VARCHAR(20)      DEFAULT NULL,
	`valid_from`       DATE             DEFAULT NULL,
	`valid_to`         DATE             DEFAULT NULL,
	`amount`           DECIMAL(11,2)    NOT NULL DEFAULT 0.00,
	`is_percentage`    TINYINT(1)       NOT NULL DEFAULT 0,
	`state`            TINYINT(1)       NOT NULL DEFAULT 0,
	`checked_out`      INT(11)          DEFAULT NULL,
	`checked_out_time` DATETIME         DEFAULT NULL,
	`created_by`       INT(11)          NOT NULL DEFAULT 0,
	`created_at`       DATETIME         DEFAULT NULL,
	`updated_by`       INT(11)          NOT NULL DEFAULT 0,
	`updated_at`       DATETIME         DEFAULT NULL,
	`version`          INT(11)          NOT NULL DEFAULT 1,
	PRIMARY KEY (`id`),
	KEY `byPropertyCouponCode`(`property_id`, `coupon_code`)
)
	ENGINE = InnoDB
	DEFAULT CHARSET = utf8mb4
	DEFAULT COLLATE = utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `#__knowres_currency` (
	`id`               INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
	`iso`              VARCHAR(3)       DEFAULT NULL,
	`decimals`         INT(2)           NOT NULL DEFAULT 0,
	`allow_property`   TINYINT(1)       NOT NULL DEFAULT 0,
	`allow_payment`    TEXT             DEFAULT NULL,
	`ordering`         INT(11)          NOT NULL DEFAULT 0,
	`state`            TINYINT(1)       NOT NULL DEFAULT 0,
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

CREATE TABLE IF NOT EXISTS `#__knowres_discount` (
	`id`               INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
	`property_id`      INT(11)          NOT NULL DEFAULT 0,
	`discount`         DECIMAL(11,2)    NOT NULL DEFAULT 0.00,
	`is_pc`            TINYINT(1)       NOT NULL DEFAULT 0,
	`valid_from`       DATE             DEFAULT NULL,
	`valid_to`         DATE             DEFAULT NULL,
	`model`            TINYINT(1)       NOT NULL DEFAULT 0,
	`param1`           VARCHAR(255)     DEFAULT NULL,
	`param2`           VARCHAR(255)     DEFAULT NULL,
	`ordering`         INT(11)          NOT NULL DEFAULT 0,
	`state`            TINYINT(1)       NOT NULL DEFAULT 0,
	`checked_out`      INT(11)          DEFAULT NULL,
	`checked_out_time` DATETIME         DEFAULT NULL,
	`created_by`       INT(11)          NOT NULL DEFAULT 0,
	`created_at`       DATETIME         DEFAULT NULL,
	`updated_by`       INT(11)          NOT NULL DEFAULT 0,
	`updated_at`       DATETIME         DEFAULT NULL,
	`version`          INT(11)          NOT NULL DEFAULT 1,
	PRIMARY KEY (`id`),
	KEY `byProperty`(`property_id`)
)
	ENGINE = InnoDB
	DEFAULT CHARSET = utf8mb4
	DEFAULT COLLATE = utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `#__knowres_email_action` (
	`id`               INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
	`contract_id`      INT(11)          NOT NULL DEFAULT 0,
	`email_trigger`    VARCHAR(50)      DEFAULT NULL,
	`checked_out`      INT(11)          DEFAULT NULL,
	`checked_out_time` DATETIME         DEFAULT NULL,
	`created_by`       INT(11)          NOT NULL DEFAULT 0,
	`created_at`       DATETIME         DEFAULT NULL,
	`updated_by`       INT(11)          NOT NULL DEFAULT 0,
	`updated_at`       DATETIME         DEFAULT NULL,
	PRIMARY KEY (`id`)
)
	ENGINE = InnoDB
	DEFAULT CHARSET = utf8mb4
	DEFAULT COLLATE = utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `#__knowres_email_template` (
	`id`               INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
	`pdf_uploaded`     VARCHAR(255)     DEFAULT NULL,
	`pdf_auto`         VARCHAR(255)     DEFAULT NULL,
	`state`            TINYINT(1)       NOT NULL DEFAULT 0,
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

CREATE TABLE IF NOT EXISTS `#__knowres_email_trigger` (
	`id`                INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
	`email_template_id` INT(11)          NOT NULL DEFAULT 0,
	`name`              VARCHAR(255)     DEFAULT NULL,
	`trigger_actual`    VARCHAR(255)     DEFAULT NULL,
	`trigger_cron`      VARCHAR(255)     DEFAULT NULL,
	`days`              INT(3)           NOT NULL DEFAULT 0,
	`days_before`       TINYINT(1)       NOT NULL DEFAULT 0,
	`booking_status`    VARCHAR(255)     DEFAULT NULL,
	`send_guest`        TINYINT(1)       NOT NULL DEFAULT 0,
	`send_owner`        TINYINT(1)       NOT NULL DEFAULT 0,
	`send_caretaker`    TINYINT(1)       NOT NULL DEFAULT 0,
	`send_admin`        TINYINT(1)       NOT NULL DEFAULT 0,
	`send_agent`        TINYINT(1)       NOT NULL DEFAULT 0,
	`state`             TINYINT(1)       NOT NULL DEFAULT 0,
	`checked_out`      INT(11)          DEFAULT NULL,
	`checked_out_time`  DATETIME         DEFAULT NULL,
	`created_by`        INT(11)          NOT NULL DEFAULT 0,
	`created_at`        DATETIME         DEFAULT NULL,
	`updated_by`        INT(11)          NOT NULL DEFAULT 0,
	`updated_at`        DATETIME         DEFAULT NULL,
	`version`           INT(11)          NOT NULL DEFAULT 0,
	PRIMARY KEY (`id`),
	KEY `byTriggeractual`(`trigger_actual`)
)
	ENGINE = InnoDB
	DEFAULT CHARSET = utf8mb4
	DEFAULT COLLATE = utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `#__knowres_exchange_rate` (
	`id`               INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
	`currency_from`    CHAR(3)          DEFAULT NULL,
	`currency_to`      CHAR(3)          DEFAULT NULL,
	`rate`             DECIMAL(15,6)    NOT NULL DEFAULT 0.000000,
	`factor`           INT(11)          NOT NULL DEFAULT 0,
	`state`            TINYINT(1)       NOT NULL DEFAULT 0,
	`checked_out`      INT(11)          DEFAULT NULL,
	`checked_out_time` DATETIME         DEFAULT NULL,
	`created_by`       INT(11)          NOT NULL DEFAULT 0,
	`created_at`       DATETIME         DEFAULT NULL,
	`updated_by`       INT(11)          NOT NULL DEFAULT 0,
	`updated_at`       DATETIME         DEFAULT NULL,
	`version`          INT(11)          NOT NULL DEFAULT 1,
	PRIMARY KEY (`id`),
	KEY `byStateFromToUpdated`(`state`, `currency_from`, `currency_to`, `updated_at`)
)
	ENGINE = InnoDB
	DEFAULT CHARSET = utf8mb4
	DEFAULT COLLATE = utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `#__knowres_extra` (
	`id`               INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
	`price`            DECIMAL(11,2)    NOT NULL DEFAULT 0.00,
	`percentage`       INT(3)           NOT NULL DEFAULT 0,
	`tax_id`           INT(11)          NOT NULL DEFAULT 0,
	`max_quantity`     INT(5)           NOT NULL DEFAULT 0,
	`property_id`      INT(11)          NOT NULL DEFAULT 0,
	`model`            INT(3)           NOT NULL DEFAULT 0,
	`mandatory`        TINYINT(1)       NOT NULL DEFAULT 0,
	`cleaning`         TINYINT(1)       NOT NULL DEFAULT 0,
	`payto`            TINYINT(1)       NOT NULL DEFAULT 0,
	`ordering`         INT(11)          NOT NULL DEFAULT 0,
	`state`            TINYINT(1)       NOT NULL DEFAULT 0,
	`checked_out`      INT(11)          DEFAULT NULL,
	`checked_out_time` DATETIME         DEFAULT NULL,
	`created_by`       INT(11)          NOT NULL DEFAULT 0,
	`created_at`       DATETIME         DEFAULT NULL,
	`updated_by`       INT(11)          NOT NULL DEFAULT 0,
	`updated_at`       DATETIME         DEFAULT NULL,
	`version`          INT(11)          NOT NULL DEFAULT 1,
	PRIMARY KEY (`id`),
	KEY `byProperty`(`property_id`)
)
	ENGINE = InnoDB
	DEFAULT CHARSET = utf8mb4
	DEFAULT COLLATE = utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `#__knowres_guest` (
	`id`                INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
	`user_id`           INT(11)          NOT NULL DEFAULT 0,
	`property_id`       INT(11)          NOT NULL DEFAULT 0,
	`email`             VARCHAR(255)     DEFAULT NULL,
	`firstname`         VARCHAR(255)     DEFAULT NULL,
	`surname`           VARCHAR(255)     DEFAULT NULL,
	`document_type`     TINYINT(1)       NOT NULL DEFAULT 0,
	`document_id`       VARCHAR(50)      DEFAULT NULL,
	`address1`          VARCHAR(255)     DEFAULT NULL,
	`address2`          VARCHAR(255)     DEFAULT NULL,
	`town`              VARCHAR(255)     DEFAULT NULL,
	`region`            VARCHAR(255)     DEFAULT NULL,
	`region_id`         INT(11)          NOT NULL DEFAULT 0,
	`country_id`        INT(11)          NOT NULL DEFAULT 0,
	`postcode`          VARCHAR(100)     DEFAULT NULL,
	`b_address1`        VARCHAR(255)     DEFAULT NULL,
	`b_address2`        VARCHAR(255)     DEFAULT NULL,
	`b_town`            VARCHAR(255)     DEFAULT NULL,
	`b_region`          VARCHAR(255)     DEFAULT NULL,
	`b_postcode`        VARCHAR(100)     DEFAULT NULL,
	`b_region_id`       INT(11)          NOT NULL DEFAULT 0,
	`b_country_id`      INT(11)          NOT NULL DEFAULT 0,
	`email_2`           VARCHAR(255)     DEFAULT NULL,
	`email_3`           VARCHAR(255)     DEFAULT NULL,
	`mobile`            VARCHAR(50)      DEFAULT NULL,
	`mobile_country_id` INT(11)          NOT NULL DEFAULT 0,
	`telephone`         TEXT             DEFAULT NULL,
	`discount`          INT(11)          NOT NULL DEFAULT 0,
	`referral_id`       INT(11)          NOT NULL DEFAULT 0,
	`referral_info`     VARCHAR(500)     DEFAULT NULL,
	`customer_ref`      TEXT             DEFAULT NULL,
	`foreign_key`       VARCHAR(255)     DEFAULT NULL,
	`state`             TINYINT(1)       NOT NULL DEFAULT 0,
	`checked_out`      INT(11)          DEFAULT NULL,
	`checked_out_time`  DATETIME         DEFAULT NULL,
	`created_by`        INT(11)          NOT NULL DEFAULT 0,
	`created_at`        DATETIME         DEFAULT NULL,
	`updated_by`        INT(11)          NOT NULL DEFAULT 0,
	`updated_at`        DATETIME         DEFAULT NULL,
	`version`           INT(11)          NOT NULL DEFAULT 0,
	PRIMARY KEY (`id`),
	KEY `byUser`(`user_id`)
)
	ENGINE = InnoDB
	DEFAULT CHARSET = utf8mb4
	DEFAULT COLLATE = utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `#__knowres_ical_block` (
	`id`          INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
	`property_id` INT(11)          NOT NULL DEFAULT 0,
	`service_id`  INT(11)          NOT NULL DEFAULT 0,
	`arrival`     DATE             DEFAULT NULL,
	`departure`   DATE             DEFAULT NULL,
	`note`        TEXT             DEFAULT NULL,
	`created_at`  DATETIME         DEFAULT NULL,
	PRIMARY KEY (`id`),
	KEY `byPropertyArrival`(`property_id`, `arrival`),
	KEY `byServiceProperty`(`service_id`, `property_id`, `arrival`),
	KEY `byAvailability`(`property_id`, `departure`)
)
	ENGINE = InnoDB
	DEFAULT CHARSET = utf8mb4
	DEFAULT COLLATE = utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `#__knowres_image` (
	`id`               INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
	`property_id`      INT(11)          NOT NULL DEFAULT 0,
	`property_order`   INT(3)           NOT NULL DEFAULT 0,
	`filename`         VARCHAR(255)     DEFAULT NULL,
	`state`            TINYINT(1)       NOT NULL DEFAULT 0,
	`checked_out`      INT(11)          DEFAULT NULL,
	`checked_out_time` DATETIME         DEFAULT NULL,
	`created_by`       INT(11)          NOT NULL DEFAULT 0,
	`created_at`       DATETIME         DEFAULT NULL,
	`updated_by`       INT(11)          NOT NULL DEFAULT 0,
	`updated_at`       DATETIME         DEFAULT NULL,
	`version`          INT(11)          NOT NULL DEFAULT 1,
	PRIMARY KEY (`id`),
	KEY `byProperty`(`property_id`),
	KEY `byStatePropertyOrder`(`state`, `property_id`, `property_order`)
)
	ENGINE = InnoDB
	DEFAULT CHARSET = utf8mb4
	DEFAULT COLLATE = utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `#__knowres_manager` (
	`id`               INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
	`user_id`          INT(11)          NOT NULL DEFAULT 0,
	`properties`       TEXT             DEFAULT NULL,
	`access_level`     INT(2)           NOT NULL DEFAULT 0,
	`apikey`           VARCHAR(255)     DEFAULT NULL,
	`agency_id`        INT(11)          NOT NULL DEFAULT 0,
	`state`            TINYINT(1)       NOT NULL DEFAULT 0,
	`checked_out`      INT(11)          DEFAULT NULL,
	`checked_out_time` DATETIME         DEFAULT NULL,
	`created_by`       INT(11)          NOT NULL DEFAULT 0,
	`created_at`       DATETIME         DEFAULT NULL,
	`updated_by`       INT(11)          NOT NULL DEFAULT 0,
	`updated_at`       DATETIME         DEFAULT NULL,
	`version`          INT(11)          NOT NULL DEFAULT 1,
	PRIMARY KEY (`id`),
	KEY `byUser`(`user_id`)
)
	ENGINE = InnoDB
	DEFAULT CHARSET = utf8mb4
	DEFAULT COLLATE = utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `#__knowres_map_category` (
	`id`               INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
	`mapicon`          VARCHAR(255)     DEFAULT NULL,
	`ordering`         INT(11)          NOT NULL DEFAULT 0,
	`state`            TINYINT(1)       NOT NULL DEFAULT 0,
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

CREATE TABLE IF NOT EXISTS `#__knowres_map_marker` (
	`id`               INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
	`map_category_id`  INT(11)          NOT NULL DEFAULT 0,
	`region_id`        INT(11)          NOT NULL DEFAULT 0,
	`country_id`       INT(11)          NOT NULL DEFAULT 0,
	`lat`              FLOAT(10,6)      NOT NULL DEFAULT 0,
	`lng`              FLOAT(10,6)      NOT NULL DEFAULT 0,
	`state`            TINYINT(1)       NOT NULL DEFAULT 0,
	`checked_out`      INT(11)          DEFAULT NULL,
	`checked_out_time` DATETIME         DEFAULT NULL,
	`created_by`       INT(11)          NOT NULL DEFAULT 0,
	`created_at`       DATETIME         DEFAULT NULL,
	`updated_by`       INT(11)          NOT NULL DEFAULT 0,
	`updated_at`       DATETIME         DEFAULT NULL,
	`version`          INT(11)          NOT NULL DEFAULT 1,
	PRIMARY KEY (`id`),
	KEY `byMapCategory`(`map_category_id`),
	KEY `byRegion`(`region_id`)
)
	ENGINE = InnoDB
	DEFAULT CHARSET = utf8mb4
	DEFAULT COLLATE = utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `#__knowres_owner` (
	`id`                INT(11)       NOT NULL AUTO_INCREMENT,
	`name`              VARCHAR(255)  DEFAULT NULL,
	`address1`          VARCHAR(255)  DEFAULT NULL,
	`address2`          VARCHAR(255)  DEFAULT NULL,
	`town`              VARCHAR(255)  DEFAULT NULL,
	`postcode`          VARCHAR(100)  DEFAULT NULL,
	`region_id`         INT(11)       NOT NULL DEFAULT 0,
	`country_id`        INT(11)       NOT NULL DEFAULT 0,
	`business`          TINYINT(1)    NOT NULL DEFAULT 0,
	`iban`              VARCHAR(50)   DEFAULT NULL,
	`email`             VARCHAR(255)  DEFAULT NULL,
	`mobile`            VARCHAR(50)   DEFAULT NULL,
	`mobile_country_id` INT(11)       NOT NULL DEFAULT 0,
	`document_type`     VARCHAR(255)  DEFAULT NULL,
	`document_id`       VARCHAR(255)  DEFAULT NULL,
	`commission`        DECIMAL(5,2)  NOT NULL DEFAULT 0.00,
	`payment_schedule`  VARCHAR(10)   DEFAULT NULL,
	`prorate`           TINYINT(1)    NOT NULL DEFAULT 0,
	`days`              TINYINT(3)    NOT NULL DEFAULT 0,
	`pay_deposit`       TINYINT(3)    DEFAULT NULL,
	`deposit_pc`        TINYINT(1)    NOT NULL DEFAULT 0,
	`deposit_days`      TINYINT(3)    DEFAULT NULL,
	`whopays`           TINYINT(1)    NOT NULL DEFAULT 0,
	`invoice`           TINYINT(1)    NOT NULL DEFAULT 0,
	`foreign_key`       VARCHAR(255)  DEFAULT NULL,
	`state`             TINYINT(1)    NOT NULL DEFAULT 0,
	`checked_out`       INT(11)       DEFAULT NULL,
	`checked_out_time`  DATETIME      DEFAULT NULL,
	`created_by`        INT(11)       NOT NULL DEFAULT 0,
	`created_at`        DATETIME      DEFAULT NULL,
	`updated_by`        INT(11)       NOT NULL DEFAULT 0,
	`updated_at`        DATETIME      DEFAULT NULL,
	`version`           INT(11)       NOT NULL DEFAULT 0,
	PRIMARY KEY (`id`)
)
	ENGINE = InnoDB
	DEFAULT CHARSET = utf8mb4
	DEFAULT COLLATE = utf8mb4_unicode_ci;

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
	`state`            TINYINT(1)       NOT NULL DEFAULT 0,
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

CREATE TABLE IF NOT EXISTS `#__knowres_property` (
	`id`                    INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
	`property_name`         VARCHAR(255)     DEFAULT NULL,
	`property_aka`          VARCHAR(255)     DEFAULT NULL,
	`property_street`       VARCHAR(255)     DEFAULT NULL,
	`property_area`         VARCHAR(255)     DEFAULT NULL,
	`property_town`         VARCHAR(255)     DEFAULT NULL,
	`town_id`               INT(11)          NOT NULL DEFAULT 0,
	`region_id`             INT(11)          NOT NULL DEFAULT 0,
	`property_region`       VARCHAR(255)     DEFAULT NULL,
	`country_id`            INT(11)          NOT NULL DEFAULT 0,
	`property_postcode`     VARCHAR(100)     DEFAULT NULL,
	`property_tel`          VARCHAR(100)     DEFAULT NULL,
	`property_email`        VARCHAR(255)     DEFAULT NULL,
	`caretaker_email`       VARCHAR(255)     DEFAULT NULL,
	`property_features`     TEXT             DEFAULT NULL,
	`property_mappinglink`  TEXT             DEFAULT NULL,
	`floor`                 INT(3)           NOT NULL DEFAULT 0,
	`area`                  INT(6)           NOT NULL DEFAULT 0,
	`stars`                 INT(11)          NOT NULL DEFAULT 0,
	`type_id`               INT(11)          NOT NULL DEFAULT 0,
	`apikey`                VARCHAR(255)     DEFAULT NULL,
	`lat`                   FLOAT(10,6)      NOT NULL DEFAULT 0,
	`lng`                   FLOAT(10,6)      NOT NULL DEFAULT 0,
	`lat_actual`            FLOAT(10,6)      NOT NULL DEFAULT 0,
	`lng_actual`            FLOAT(10,6)      NOT NULL DEFAULT 0,
	`map_max_zoom`          TINYINT(2)       NULL DEFAULT 20,
	`property_units`        VARCHAR(255)     DEFAULT NULL,
	`property_alternatives` VARCHAR(255)     DEFAULT NULL,
	`sleeps`                TINYINT(1)       NOT NULL DEFAULT 0,
	`sleeps_extra`          TINYINT(1)       NOT NULL DEFAULT 0,
	`sleeps_infant_age`     TINYINT(1)       NOT NULL DEFAULT 0,
	`sleeps_infant_max`     TINYINT(1)       NOT NULL DEFAULT 0,
	`pets`                  TINYINT(1)       NOT NULL DEFAULT 0,
	`bedrooms`              INT(11)          NOT NULL DEFAULT 0,
	`bed_types`             TEXT             DEFAULT NULL,
	`bathrooms`             INT(11)          NOT NULL DEFAULT 0,
	`wc`                    TINYINT(1)       NOT NULL DEFAULT 0,
	`price_summary`         VARCHAR(50)      DEFAULT NULL,
	`contact_name`          VARCHAR(255)     DEFAULT NULL,
	`contact_phone`         VARCHAR(255)     DEFAULT NULL,
	`contact_email`         VARCHAR(255)     DEFAULT NULL,
	`contact_days`          TINYINT(1)       NOT NULL DEFAULT 0,
	`property_videolink`    VARCHAR(255)     DEFAULT NULL,
	`cancellation_penalty`  TEXT             DEFAULT NULL,
	`security_cash`         TINYINT(1)       NOT NULL DEFAULT 0,
	`security_amount`       DECIMAL(11,2)    NOT NULL DEFAULT 0.00,
	`booking_type`          TINYINT(1)       NOT NULL DEFAULT 0,
	`private`               TINYINT(1)       NOT NULL DEFAULT 0,
	`categories`            VARCHAR(255)     DEFAULT NULL,
	`owner_id`              INT(11)          NOT NULL DEFAULT 0,
	`checkin_time`          VARCHAR(5)       DEFAULT NULL,
	`checkin_time_to`       VARCHAR(5)       DEFAULT NULL,
	`checkin_fees`          TEXT             DEFAULT NULL,
	`checkout_time`         VARCHAR(5)       DEFAULT NULL,
	`checkout_fees`         TEXT             DEFAULT NULL,
	`rooms`                 TEXT             DEFAULT NULL,
	`guest_types`           TEXT             DEFAULT NULL,
	`approved`              TINYINT(1)       NULL DEFAULT 1,
	`service_id`            INT(11)          NOT NULL DEFAULT 0,
	`resell`                TINYINT(1)       NOT NULL DEFAULT 1,
	`ordering`              INT(11)          NOT NULL DEFAULT 0,
	`state`                 TINYINT(1)       NOT NULL DEFAULT 0,
	`checked_out`           INT(11)          DEFAULT NULL,
	`checked_out_time`      DATETIME         DEFAULT NULL,
	`created_by`            INT(11)          NOT NULL DEFAULT 0,
	`created_at`            DATETIME         DEFAULT NULL,
	`updated_by`            INT(11)          NOT NULL DEFAULT 0,
	`updated_at`            DATETIME         DEFAULT NULL,
	`version`               INT(11)          NOT NULL DEFAULT 0,
	PRIMARY KEY (`id`),
	KEY `byPropertyName`(`property_name`),
	KEY `byRegion`(`region_id`),
	KEY `byPropertyArea`(`property_area`),
	KEY `byState`(`state`)
)
	ENGINE = InnoDB
	DEFAULT CHARSET = utf8mb4
	DEFAULT COLLATE = utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `#__knowres_property_feature` (
	`id`               INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
	`generic`          VARCHAR(50)      DEFAULT NULL,
	`room_type`        TEXT             DEFAULT NULL,
	`filter`           TINYINT(1)       NOT NULL DEFAULT 0,
	`ordering`         INT(11)          NOT NULL DEFAULT 0,
	`state`            TINYINT(1)       NOT NULL DEFAULT 0,
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

CREATE TABLE IF NOT EXISTS `#__knowres_property_field` (
	`id`               INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
	`required`         TINYINT(1)       NOT NULL DEFAULT 0,
	`format`           TINYINT(1)       NOT NULL DEFAULT 0,
	`special`          TINYINT(1)       NOT NULL DEFAULT 0,
	`ordering`         INT(11)          NOT NULL DEFAULT 0,
	`state`            TINYINT(1)       NOT NULL DEFAULT 0,
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

CREATE TABLE IF NOT EXISTS `#__knowres_property_ical` (
	`id`               INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
	`property_id`      INT(11)          NOT NULL DEFAULT 0,
	`service_id`       INT(11)          NOT NULL DEFAULT 0,
	`name`             VARCHAR(255)     DEFAULT NULL,
	`link`             TEXT             DEFAULT NULL,
	`icsdata`          TEXT             DEFAULT NULL,
	`last_update`      DATETIME         DEFAULT NULL,
	`state`            TINYINT(1)       NOT NULL DEFAULT 0,
	`checked_out`      INT(11)          DEFAULT NULL,
	`checked_out_time` DATETIME         DEFAULT NULL,
	`created_by`       INT(11)          NOT NULL DEFAULT 0,
	`created_at`       DATETIME         DEFAULT NULL,
	`updated_by`       INT(11)          NOT NULL DEFAULT 0,
	`updated_at`       DATETIME         DEFAULT NULL,
	`version`          INT(11)          NOT NULL DEFAULT 1,
	PRIMARY KEY (`id`),
	KEY `byProperty`(`property_id`)
)
	ENGINE = InnoDB
	DEFAULT CHARSET = utf8mb4
	DEFAULT COLLATE = utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `#__knowres_property_option` (
	`id`               INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
	`property_id`      INT(11)          NOT NULL DEFAULT 0,
	`yesno`            TINYINT(1)       NOT NULL DEFAULT 0,
	`ordering`         INT(11)          NOT NULL DEFAULT 0,
	`state`            TINYINT(1)       NOT NULL DEFAULT 0,
	`checked_out`      INT(11)          DEFAULT NULL,
	`checked_out_time` DATETIME         DEFAULT NULL,
	`created_by`       INT(11)          NOT NULL DEFAULT 0,
	`created_at`       DATETIME         DEFAULT NULL,
	`updated_by`       INT(11)          NOT NULL DEFAULT 0,
	`updated_at`       DATETIME         DEFAULT NULL,
	`version`          INT(11)          NOT NULL DEFAULT 1,
	PRIMARY KEY (`id`),
	KEY `byProperty`(`property_id`)
)
	ENGINE = InnoDB
	DEFAULT CHARSET = utf8mb4
	DEFAULT COLLATE = utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `#__knowres_property_room` (
	`id`               INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
	`property_id`      INT(11)          NOT NULL DEFAULT 0,
	`generic`          VARCHAR(50)      DEFAULT NULL,
	`features`         TEXT             DEFAULT NULL,
	`ordering`         INT(11)          NOT NULL DEFAULT 0,
	`state`            TINYINT(1)       NOT NULL DEFAULT 0,
	`checked_out`      INT(11)          DEFAULT NULL,
	`checked_out_time` DATETIME         DEFAULT NULL,
	`created_by`       INT(11)          NOT NULL DEFAULT 0,
	`created_at`       DATETIME         DEFAULT NULL,
	`updated_by`       INT(11)          NOT NULL DEFAULT 0,
	`updated_at`       DATETIME         DEFAULT NULL,
	`version`          INT(11)          NOT NULL DEFAULT 1,
	PRIMARY KEY (`id`),
	KEY `byProperty`(`property_id`)
)
	ENGINE = InnoDB
	DEFAULT CHARSET = utf8mb4
	DEFAULT COLLATE = utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `#__knowres_property_setting` (
	`id`          INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
	`property_id` INT(11)          NOT NULL DEFAULT 0,
	`akey`        VARCHAR(255)     DEFAULT NULL,
	`value`       VARCHAR(255)     DEFAULT NULL,
	`created_by`  INT(11)          NOT NULL DEFAULT 0,
	`created_at`  DATETIME         DEFAULT NULL,
	`updated_by`  INT(11)          NOT NULL DEFAULT 0,
	`updated_at`  DATETIME         DEFAULT NULL,
	`version`     INT(11)          NOT NULL DEFAULT 0,
	PRIMARY KEY (`id`),
	KEY `byProperty`(`property_id`)
)
	ENGINE = InnoDB
	DEFAULT CHARSET = utf8mb4
	DEFAULT COLLATE = utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `#__knowres_rate` (
	`id`               INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
	`property_id`      INT(11)          NOT NULL DEFAULT 0,
	`valid_from`       DATE             DEFAULT NULL,
	`valid_to`         DATE             DEFAULT NULL,
	`rate`             DECIMAL(11,2)    NOT NULL DEFAULT 0.00,
	`min_nights`       INT(3)           NOT NULL DEFAULT 0,
	`max_nights`       INT(3)           NOT NULL DEFAULT 0,
	`min_guests`       INT(3)           NOT NULL DEFAULT 0,
	`max_guests`       INT(3)           NOT NULL DEFAULT 0,
	`ignore_pppn`      TINYINT(1)       NOT NULL DEFAULT 0,
	`start_day`        TINYINT(2)       NULL DEFAULT 7,
	`more_guests`      TEXT             DEFAULT NULL,
	`state`            TINYINT(1)       NOT NULL DEFAULT 0,
	`checked_out`      INT(11)          DEFAULT NULL,
	`checked_out_time` DATETIME         DEFAULT NULL,
	`created_by`       INT(11)          NOT NULL DEFAULT 0,
	`created_at`       DATETIME         DEFAULT NULL,
	`updated_by`       INT(11)          NOT NULL DEFAULT 0,
	`updated_at`       DATETIME         DEFAULT NULL,
	`version`          INT(11)          NOT NULL DEFAULT 1,
	PRIMARY KEY (`id`),
	KEY `byProperty`(`property_id`)
)
	ENGINE = InnoDB
	DEFAULT CHARSET = utf8mb4
	DEFAULT COLLATE = utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `#__knowres_rate_markup` (
	`id`               INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
	`property_id`      INT(11)          NOT NULL DEFAULT 0,
	`net_markup`       DECIMAL(6,2)     NOT NULL DEFAULT 0.00,
	`valid_from`       DATE             DEFAULT NULL,
	`valid_to`         DATE             DEFAULT NULL,
	`state`            TINYINT(1)       NOT NULL DEFAULT 0,
	`checked_out`      INT(11)          DEFAULT NULL,
	`checked_out_time` DATETIME         DEFAULT NULL,
	`created_by`       INT(11)          NOT NULL DEFAULT 0,
	`created_at`       DATETIME         DEFAULT NULL,
	`updated_by`       INT(11)          NOT NULL DEFAULT 0,
	`updated_at`       DATETIME         DEFAULT NULL,
	`version`          INT(11)          NOT NULL DEFAULT 1,
	PRIMARY KEY (`id`),
	KEY `byProperty`(`property_id`)
)
	ENGINE = InnoDB
	DEFAULT CHARSET = utf8mb4
	DEFAULT COLLATE = utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `#__knowres_referral` (
	`id`               INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
	`ordering`         INT(11)          NOT NULL DEFAULT 0,
	`state`            TINYINT(1)       NOT NULL DEFAULT 0,
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

CREATE TABLE IF NOT EXISTS `#__knowres_region` (
	`id`               INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
	`region_iso`       CHAR(2)          DEFAULT NULL,
	`country_id`       INT(11)          NOT NULL DEFAULT 0,
	`allow_property`   TINYINT(1)       NOT NULL DEFAULT 0,
	`map_zoom`         INT(2)           NOT NULL DEFAULT 0,
	`map_zoom_max`     INT(2)           NULL DEFAULT 20,
	`code`             CHAR(2)          DEFAULT NULL,
	`state`            TINYINT(1)       NOT NULL DEFAULT 0,
	`checked_out`      INT(11)          DEFAULT NULL,
	`checked_out_time` DATETIME         DEFAULT NULL,
	`created_by`       INT(11)          NOT NULL DEFAULT 0,
	`created_at`       DATETIME         DEFAULT NULL,
	`updated_by`       INT(11)          NOT NULL DEFAULT 0,
	`updated_at`       DATETIME         DEFAULT NULL,
	`version`          INT(11)          NOT NULL DEFAULT 1,
	PRIMARY KEY (`id`),
	KEY `byCountry`(`country_id`),
	KEY `byAllowPropertyId`(`allow_property`, `id`)
)
	ENGINE = InnoDB
	DEFAULT CHARSET = utf8mb4
	DEFAULT COLLATE = utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `#__knowres_review` (
	`id`               INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
	`contract_id`      INT(11)          NOT NULL DEFAULT 0,
	`property_id`      INT(11)          NOT NULL DEFAULT 0,
	`review_date`      DATE             DEFAULT NULL,
	`rating`           FLOAT(3,2)       NOT NULL DEFAULT 0,
	`title`            VARCHAR(500)     DEFAULT NULL,
	`review`           MEDIUMTEXT       NULL,
	`rating1`          TINYINT(1)       NOT NULL DEFAULT 0,
	`rating2`          TINYINT(1)       NOT NULL DEFAULT 0,
	`rating3`          TINYINT(1)       NOT NULL DEFAULT 0,
	`rating4`          TINYINT(1)       NOT NULL DEFAULT 0,
	`rating5`          TINYINT(1)       NOT NULL DEFAULT 0,
	`rating6`          TINYINT(1)       NOT NULL DEFAULT 0,
	`guest_name`       VARCHAR(255)     DEFAULT NULL,
	`guest_location`   VARCHAR(255)     DEFAULT NULL,
	`held`             TINYINT(1)       NOT NULL DEFAULT 0,
	`approved`         TINYINT(1)       NOT NULL DEFAULT 0,
	`state`            TINYINT(1)       NOT NULL DEFAULT 0,
	`checked_out`      INT(11)          DEFAULT NULL,
	`checked_out_time` DATETIME         DEFAULT NULL,
	`created_by`       INT(11)          NOT NULL DEFAULT 0,
	`created_at`       DATETIME         DEFAULT NULL,
	`updated_by`       INT(11)          NOT NULL DEFAULT 0,
	`updated_at`       DATETIME         DEFAULT NULL,
	`version`          INT(11)          NOT NULL DEFAULT 1,
	PRIMARY KEY (`id`),
	KEY `byProperty`(`property_id`),
	KEY `byState`(`state`),
	KEY `byApproved`(`approved`),
	KEY `byReviewDate`(`review_date`)
)
	ENGINE = InnoDB
	DEFAULT CHARSET = utf8mb4
	DEFAULT COLLATE = utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `#__knowres_room` (
	`id`               INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
	`state`            TINYINT(1)       NOT NULL DEFAULT 0,
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

CREATE TABLE IF NOT EXISTS `#__knowres_season` (
	`id`               INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
	`cluster_id`       INT(11)          NOT NULL DEFAULT 0,
	`valid_from`       DATE             DEFAULT NULL,
	`valid_to`         DATE             DEFAULT NULL,
	`minimum_nights`   INT(3)           NOT NULL DEFAULT 0,
	`season`           VARCHAR(10)      DEFAULT NULL,
	`state`            TINYINT(1)       NOT NULL DEFAULT 0,
	`checked_out`      INT(11)          DEFAULT NULL,
	`checked_out_time` DATETIME         DEFAULT NULL,
	`created_by`       INT(11)          NOT NULL DEFAULT 0,
	`created_at`       DATETIME         DEFAULT NULL,
	`updated_by`       INT(11)          NOT NULL DEFAULT 0,
	`updated_at`       DATETIME         DEFAULT NULL,
	`version`          INT(11)          NOT NULL DEFAULT 1,
	PRIMARY KEY (`id`),
	KEY `byCluster`(`cluster_id`)
)
	ENGINE = InnoDB
	DEFAULT CHARSET = utf8mb4
	DEFAULT COLLATE = utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `#__knowres_service` (
	`id`               INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
	`name`             VARCHAR(255)     DEFAULT NULL,
	`currency`         CHAR(3)          DEFAULT NULL,
	`property_id`      INT(11)          NOT NULL DEFAULT 0,
	`agency_id`        INT(11)          NOT NULL DEFAULT 0,
	`plugin`           VARCHAR(255)     DEFAULT NULL,
	`type`             VARCHAR(2)       DEFAULT NULL,
	`parameters`       TEXT             DEFAULT NULL,
	`ordering`         INT(11)          NOT NULL DEFAULT 0,
	`state`            TINYINT(1)       NOT NULL DEFAULT 0,
	`checked_out`      INT(11)          DEFAULT NULL,
	`checked_out_time` DATETIME         DEFAULT NULL,
	`created_by`       INT(11)          NOT NULL DEFAULT 0,
	`created_at`       DATETIME         DEFAULT NULL,
	`updated_by`       INT(11)          NOT NULL DEFAULT 0,
	`updated_at`       DATETIME         DEFAULT NULL,
	`version`          INT(11)          NOT NULL DEFAULT 1,
	PRIMARY KEY (`id`),
	KEY `byStateAgencyType`(`state`, `agency_id`, `type`)
)
	ENGINE = InnoDB
	DEFAULT CHARSET = utf8mb4
	DEFAULT COLLATE = utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `#__knowres_service_log` (
	`id`          INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
	`success`     TINYINT(1)       NOT NULL DEFAULT 0,
	`service_id`  INT(11)          NOT NULL DEFAULT 0,
	`queue_id`    INT(11)          NOT NULL DEFAULT 0,
	`contract_id` INT(11)          NOT NULL DEFAULT 0,
	`property_id` INT(11)          NOT NULL DEFAULT 0,
	`foreign_key` VARCHAR(255)     DEFAULT NULL,
	`method`      VARCHAR(255)     DEFAULT NULL,
	`errors`      MEDIUMTEXT       NULL,
	`request`     MEDIUMTEXT       NULL,
	`response`    MEDIUMTEXT       NULL,
	`subject`     MEDIUMTEXT       NULL,
	`reply_to`    MEDIUMTEXT       NULL,
	`created_at`  DATETIME         DEFAULT NULL,
	PRIMARY KEY (`id`),
	KEY `byServicePropertyMethod`(`service_id`, `property_id`, `method`),
	KEY `byPropertyServiceMethod`(`property_id`, `service_id`, `method`)
)
	ENGINE = InnoDB
	DEFAULT CHARSET = utf8mb4
	DEFAULT COLLATE = utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `#__knowres_service_queue` (
	`id`               INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
	`service_id`       INT(11)          NOT NULL DEFAULT 0,
	`foreign_key`      VARCHAR(255)     DEFAULT NULL,
	`contract_id`      INT(11)          NOT NULL DEFAULT 0,
	`agent_id`         INT(11)          NOT NULL DEFAULT 0,
	`property_id`      INT(11)          NOT NULL DEFAULT 0,
	`arrival`          DATE             DEFAULT NULL,
	`departure`        DATE             DEFAULT NULL,
	`availability`     TINYINT(1)       NOT NULL DEFAULT 0,
	`actioned`         TINYINT(1)       NOT NULL DEFAULT 0,
	`method`           VARCHAR(255)     DEFAULT NULL,
	`state`            TINYINT(1)       NOT NULL DEFAULT 0,
	`checked_out`      INT(11)          DEFAULT NULL,
	`checked_out_time` DATETIME         DEFAULT NULL,
	`created_by`       INT(11)          NOT NULL DEFAULT 0,
	`created_at`       DATETIME         DEFAULT NULL,
	`updated_by`       INT(11)          NOT NULL DEFAULT 0,
	`updated_at`       DATETIME         DEFAULT NULL,
	`version`          INT(11)          NOT NULL DEFAULT 1,
	PRIMARY KEY (`id`),
	KEY `byServiceActioned`(`service_id`, `actioned`)
)
	ENGINE = InnoDB
	DEFAULT CHARSET = utf8mb4
	DEFAULT COLLATE = utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `#__knowres_service_xref` (
	`id`               INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
	`service_id`       INT(11)          NOT NULL DEFAULT 0,
	`table_name`       VARCHAR(20)      DEFAULT NULL,
	`table_id`         INT(11)          NOT NULL DEFAULT 0,
	`property_id`      INT(11)          NOT NULL DEFAULT 0,
	`contract_id`      INT(11)          NOT NULL DEFAULT 0,
	`payment_id`       INT(11)          NOT NULL DEFAULT 0,
	`guest_id`         INT(11)          NOT NULL DEFAULT 0,
	`owner_id`         INT(11)          NOT NULL DEFAULT 0,
	`invoice_number`   VARCHAR(255)     DEFAULT NULL,
	`foreign_key`      VARCHAR(255)     DEFAULT NULL,
	`cancelled`        TINYINT(1)       NOT NULL DEFAULT 0,
	`new`              TINYINT(1)       NOT NULL DEFAULT 0,
	`sell`             TINYINT(1)       NULL DEFAULT 1,
	`state`            TINYINT(1)       NOT NULL DEFAULT 0,
	`checked_out`      INT(11)          DEFAULT NULL,
	`checked_out_time` DATETIME         DEFAULT NULL,
	`created_by`       INT(11)          NOT NULL DEFAULT 0,
	`created_at`       DATETIME         DEFAULT NULL,
	`updated_by`       INT(11)          NOT NULL DEFAULT 0,
	`updated_at`       DATETIME         DEFAULT NULL,
	`version`          INT(11)          NOT NULL DEFAULT 1,
	PRIMARY KEY (`id`),
	KEY `byService`(`service_id`)
)
	ENGINE = InnoDB
	DEFAULT CHARSET = utf8mb4
	DEFAULT COLLATE = utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `#__knowres_tax` (
	`id`               INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
	`country_id`       INT(11)          NOT NULL DEFAULT 0,
	`region_id`        INT(11)          NOT NULL DEFAULT 0,
	`town_id`          INT(11)          NOT NULL DEFAULT 0,
	`state`            TINYINT(1)       NOT NULL DEFAULT 0,
	`checked_out`      INT(11)          DEFAULT NULL,
	`checked_out_time` DATETIME         DEFAULT NULL,
	`created_by`       INT(11)          NOT NULL DEFAULT 0,
	`created_at`       DATETIME         DEFAULT NULL,
	`updated_by`       INT(11)          NOT NULL DEFAULT 0,
	`updated_at`       DATETIME         DEFAULT NULL,
	`version`          INT(11)          NOT NULL DEFAULT 1,
	PRIMARY KEY (`id`),
	KEY `byGeo`(`country_id`, `region_id`, `town_id`)
)
	ENGINE = InnoDB
	DEFAULT CHARSET = utf8mb4
	DEFAULT COLLATE = utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `#__knowres_tax_rate` (
	`id`               INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
	`tax_id`           INT(11)          NOT NULL DEFAULT 0,
	`tax_type`         VARCHAR(10)      DEFAULT NULL,
	`code`             VARCHAR(30)      DEFAULT NULL,
	`agent`            VARCHAR(255)     DEFAULT NULL,
	`rate`             DECIMAL(6,3)     NOT NULL DEFAULT 0.000,
	`fixed`            TINYINT(1)       NOT NULL DEFAULT 0,
	`basis`            TINYINT(1)       NOT NULL DEFAULT 0,
	`max_nights`       TINYINT(2)       NOT NULL DEFAULT 0,
	`reduced_rate`     DECIMAL(6,3)     NOT NULL DEFAULT 0.000,
	`gross`            TINYINT(1)       NOT NULL DEFAULT 0,
	`pay_arrival`      TINYINT(1)       NOT NULL DEFAULT 0,
	`applicable_age`   TINYINT(2)       NOT NULL DEFAULT 0,
	`per_night`        TINYINT(1)       NOT NULL DEFAULT 0,
	`valid_from`       DATE             DEFAULT NULL,
	`taxrate_id`       INT(11)          NOT NULL DEFAULT 0,
	`tt_option`        TINYINT(1)       NOT NULL DEFAULT 0,
	`ordering`         INT(11)          NOT NULL DEFAULT 0,
	`state`            TINYINT(1)       NOT NULL DEFAULT 0,
	`checked_out`      INT(11)          DEFAULT NULL,
	`checked_out_time` DATETIME         DEFAULT NULL,
	`created_by`       INT(11)          NOT NULL DEFAULT 0,
	`created_at`       DATETIME         DEFAULT NULL,
	`updated_by`       INT(11)          NOT NULL DEFAULT 0,
	`updated_at`       DATETIME         DEFAULT NULL,
	`version`          INT(11)          NOT NULL DEFAULT 1,
	PRIMARY KEY (`id`),
	INDEX `byTaxId`(`tax_id`)
)
	ENGINE = InnoDB
	DEFAULT CHARSET = utf8mb4
	DEFAULT COLLATE = utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `#__knowres_town` (
	`id`               INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
	`country_id`       INT(11)          NOT NULL DEFAULT 0,
	`region_id`        INT(11)          NOT NULL DEFAULT 0,
	`lat`              FLOAT(10,6)      NOT NULL DEFAULT 0,
	`lng`              FLOAT(10,6)      NOT NULL DEFAULT 0,
	`allow_property`   TINYINT(1)       NOT NULL DEFAULT 0,
	`timezone`         VARCHAR(100)     DEFAULT NULL,
	`currency`         CHAR(3)          DEFAULT NULL,
	`state`            TINYINT(1)       NOT NULL DEFAULT 0,
	`checked_out`      INT(11)          DEFAULT NULL,
	`checked_out_time` DATETIME         DEFAULT NULL,
	`created_by`       INT(11)          NOT NULL DEFAULT 0,
	`created_at`       DATETIME         DEFAULT NULL,
	`updated_by`       INT(11)          NOT NULL DEFAULT 0,
	`updated_at`       DATETIME         DEFAULT NULL,
	`version`          INT(11)          NOT NULL DEFAULT 1,
	PRIMARY KEY (`id`),
	KEY `byRegionId`(`region_id`)
)
	ENGINE = InnoDB
	DEFAULT CHARSET = utf8mb4
	DEFAULT COLLATE = utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `#__knowres_translation` (
	`id`               INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
	`item`             CHAR(50)         DEFAULT NULL,
	`item_id`          INT(11) UNSIGNED NOT NULL DEFAULT 0,
	`field`            VARCHAR(255)     DEFAULT NULL,
	`text`             MEDIUMTEXT       NULL,
	`status`           TINYINT(1)       NOT NULL DEFAULT 0,
	`state`            TINYINT(1)       NOT NULL DEFAULT 0,
	`checked_out`      INT(11)          DEFAULT NULL,
	`checked_out_time` DATETIME         DEFAULT NULL,
	`created_by`       INT(11)          NOT NULL DEFAULT 0,
	`created_at`       DATETIME         DEFAULT NULL,
	`updated_by`       INT(11)          NOT NULL DEFAULT 0,
	`updated_at`       DATETIME         DEFAULT NULL,
	`language`         CHAR(7)          DEFAULT NULL,
	`version`          INT(11)          NOT NULL DEFAULT 1,
	PRIMARY KEY (`id`),
	KEY `byItemItemidLanguage`(`item`, `item_id`, `language`)
)
	ENGINE = InnoDB
	DEFAULT CHARSET = utf8mb4
	DEFAULT COLLATE = utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `#__knowres_type` (
	`id`               INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
	`ordering`         INT(11)          NOT NULL DEFAULT 0,
	`state`            TINYINT(1)       NOT NULL DEFAULT 0,
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