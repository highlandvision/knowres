# Fix up null and initial values for v4
ALTER TABLE `#__knowres_agency`
MODIFY	`name`             VARCHAR(255)     DEFAULT NULL,
MODIFY	`street`           VARCHAR(255)     DEFAULT NULL,
MODIFY	`town`             VARCHAR(255)     DEFAULT NULL,
MODIFY	`postcode`         VARCHAR(255)     DEFAULT NULL,
MODIFY	`region_id`        INT(11)          NOT NULL DEFAULT 0,
MODIFY	`country_id`       INT(11)          NOT NULL DEFAULT 0,
MODIFY	`telephone`        VARCHAR(100)     DEFAULT NULL,
MODIFY  `tax_code`         VARCHAR(30)      DEFAULT NULL,
MODIFY  `company_number`   VARCHAR(30)      DEFAULT NULL,
MODIFY	`ordering`         INT(11)          NOT NULL DEFAULT 0,
MODIFY	`state`            TINYINT(1)       NOT NULL DEFAULT 1,
MODIFY	`checked_out`      INT(11)          DEFAULT NULL,
MODIFY	`checked_out_time` DATETIME         DEFAULT NULL,
MODIFY	`created_by`       INT(11)          NOT NULL DEFAULT 0,
MODIFY	`created_at`       DATETIME         DEFAULT NULL,
MODIFY	`updated_by`       INT(11)          NOT NULL DEFAULT 0,
MODIFY	`updated_at`       DATETIME         DEFAULT NULL,
MODIFY	`version`          INT(11)          NOT NULL DEFAULT 1;
UPDATE `#__knowres_agency` SET `created_at` = NULL WHERE created_at = '0000-00-00 00:00:00';
UPDATE `#__knowres_agency` SET `updated_at` = NULL WHERE updated_at = '0000-00-00 00:00:00';

ALTER TABLE `#__knowres_agent`
MODIFY	`name`                      VARCHAR(255)     DEFAULT NULL,
MODIFY	`service_id`                INT(11)          NOT NULL DEFAULT 0,
MODIFY	`foreign_key`               VARCHAR(255)     DEFAULT NULL,
MODIFY	`mandatory_extras_charge`   TINYINT(1)       NOT NULL DEFAULT 0,
MODIFY	`mandatory_extras_excluded` TINYINT(1)       NOT NULL DEFAULT 0,
MODIFY	`deposit`                   DECIMAL(11, 4)   NOT NULL DEFAULT 0.0000,
MODIFY	`deposit_paid`              TINYINT(1)       NOT NULL DEFAULT 0,
MODIFY	`deposit_unconfirmed`       DECIMAL(11, 4)   NOT NULL DEFAULT 0.0000,
MODIFY	`deposit_unconfirmed_agent` TINYINT(1)       NOT NULL DEFAULT 0,
MODIFY	`expiry_days`               VARCHAR(3)       DEFAULT NULL,
MODIFY	`balance_days`              VARCHAR(3)       DEFAULT NULL,
MODIFY	`commission`                DECIMAL(11, 4)   NOT NULL DEFAULT 0.0000,
MODIFY	`provisional_email_text`    MEDIUMTEXT       NULL,
MODIFY	`confirmed_email_text`      MEDIUMTEXT       NULL,
MODIFY	`invoice_text`              MEDIUMTEXT       NULL,
MODIFY	`foreign_key_reqd`          TINYINT(1)       NOT NULL DEFAULT 0,
MODIFY	`owner_deposit_payment`     TINYINT(1)       NOT NULL DEFAULT 0,
MODIFY	`state`                     TINYINT(1)       NOT NULL DEFAULT 1,
MODIFY	`checked_out`               INT(11)          DEFAULT NULL,
MODIFY	`checked_out_time`          DATETIME         DEFAULT NULL,
MODIFY	`created_by`                INT(11)          NOT NULL DEFAULT 0,
MODIFY	`created_at`                DATETIME         DEFAULT NULL,
MODIFY	`updated_by`                INT(11)          NOT NULL DEFAULT 0,
MODIFY	`updated_at`                DATETIME         DEFAULT NULL,
MODIFY	`version`                   INT(11)          NOT NULL DEFAULT 0;
UPDATE `#__knowres_agent` SET `created_at` = NULL WHERE created_at = '0000-00-00 00:00:00';
UPDATE `#__knowres_agent` SET `updated_at` = NULL WHERE updated_at = '0000-00-00 00:00:00';

ALTER TABLE `#__knowres_bed_type`
MODIFY	`bedicon`          VARCHAR(255)     DEFAULT NULL,
MODIFY	`generic`          VARCHAR(20)      DEFAULT NULL,
MODIFY	`ordering`         INT(11)          NOT NULL DEFAULT 0,
MODIFY	`state`            TINYINT(1)       NOT NULL DEFAULT 1,
MODIFY	`checked_out`      INT(11)          DEFAULT NULL,
MODIFY	`checked_out_time` DATETIME         DEFAULT NULL,
MODIFY	`created_by`       INT(11)          NOT NULL DEFAULT 0,
MODIFY	`created_at`       DATETIME         DEFAULT NULL,
MODIFY	`updated_by`       INT(11)          NOT NULL DEFAULT 0,
MODIFY	`updated_at`       DATETIME         DEFAULT NULL,
MODIFY	`version`          INT(11)          NOT NULL DEFAULT 1;
UPDATE `#__knowres_bed_type` SET `created_at` = NULL WHERE created_at = '0000-00-00 00:00:00';
UPDATE `#__knowres_bed_type` SET `updated_at` = NULL WHERE updated_at = '0000-00-00 00:00:00';

ALTER TABLE `#__knowres_category`
MODIFY	`ordering`         INT(11)          NOT NULL DEFAULT 0,
MODIFY	`state`            TINYINT(1)       NOT NULL DEFAULT 1,
MODIFY	`checked_out`      INT(11)          DEFAULT NULL,
MODIFY	`checked_out_time` DATETIME         DEFAULT NULL,
MODIFY	`created_by`       INT(11)          NOT NULL DEFAULT 0,
MODIFY	`created_at`       DATETIME         DEFAULT NULL,
MODIFY	`updated_by`       INT(11)          NOT NULL DEFAULT 0,
MODIFY	`updated_at`       DATETIME         DEFAULT NULL,
MODIFY	`version`          INT(11)          NOT NULL DEFAULT 1;
UPDATE `#__knowres_category` SET `created_at` = NULL WHERE created_at = '0000-00-00 00:00:00';
UPDATE `#__knowres_category` SET `updated_at` = NULL WHERE updated_at = '0000-00-00 00:00:00';

ALTER TABLE `#__knowres_cluster`
MODIFY	`state`            TINYINT(1)       NOT NULL DEFAULT 1,
MODIFY	`checked_out`      INT(11)          DEFAULT NULL,
MODIFY	`checked_out_time` DATETIME         DEFAULT NULL,
MODIFY	`created_by`       INT(11)          NOT NULL DEFAULT 0,
MODIFY	`created_at`       DATETIME         DEFAULT NULL,
MODIFY	`updated_by`       INT(11)          NOT NULL DEFAULT 0,
MODIFY	`updated_at`       DATETIME         DEFAULT NULL,
MODIFY	`version`          INT(11)          NOT NULL DEFAULT 1;
UPDATE `#__knowres_cluster` SET `created_at` = NULL WHERE created_at = '0000-00-00 00:00:00';
UPDATE `#__knowres_cluster` SET `updated_at` = NULL WHERE updated_at = '0000-00-00 00:00:00';

ALTER TABLE `#__knowres_contract`
MODIFY	`tag`                     VARCHAR(20)      DEFAULT NULL,
MODIFY	`booking_status`          TINYINT(2)       NULL DEFAULT 1,
MODIFY	`on_request`              TINYINT(1)       NOT NULL DEFAULT 0,
MODIFY	`property_id`             INT(11)          NOT NULL DEFAULT 0,
MODIFY	`guest_id`                INT(11)          NOT NULL DEFAULT 0,
MODIFY	`agency_id`               INT(11)          NOT NULL DEFAULT 0,
MODIFY	`manager_id`              INT(11)          NOT NULL DEFAULT 0,
MODIFY	`service_id`              INT(11)          NOT NULL DEFAULT 0,
MODIFY	`agent_id`                INT(11)          NOT NULL DEFAULT 0,
MODIFY	`arrival`                 DATE             DEFAULT NULL,
MODIFY	`departure`               DATE             DEFAULT NULL,
MODIFY	`guests`                  INT(4)           NOT NULL DEFAULT 0,
MODIFY	`adults`                  TINYINT(1)       NOT NULL DEFAULT 0,
MODIFY	`children`                TINYINT(1)       NOT NULL DEFAULT 0,
MODIFY	`child_ages`              VARCHAR(255)     DEFAULT NULL,
MODIFY	`infants`                 TINYINT(1)       NOT NULL DEFAULT 0,
MODIFY	`pets`                    TINYINT(1)       NOT NULL DEFAULT 0,
MODIFY	`guest_types`             TEXT             DEFAULT NULL,
MODIFY	`rooms`                   TEXT             DEFAULT NULL,
MODIFY	`currency`                CHAR(3)          DEFAULT NULL,
MODIFY	`deposit`                 DECIMAL(11, 2)   NOT NULL DEFAULT 0.00,
MODIFY	`deposit_system`          DECIMAL(11, 2)   NOT NULL DEFAULT 0.00,
MODIFY	`room_total_gross`        DECIMAL(11, 2)   NOT NULL DEFAULT 0.00,
MODIFY	`room_total_gross_system` DECIMAL(11, 2)   NOT NULL DEFAULT 0.00,
MODIFY	`room_total`              DECIMAL(11, 2)   NOT NULL DEFAULT 0.00,
MODIFY	`contract_total`          DECIMAL(11, 2)   NOT NULL DEFAULT 0.00,
MODIFY	`extras`                  TEXT             DEFAULT NULL,
MODIFY	`extra_total`             DECIMAL(11, 2)   NOT NULL DEFAULT 0.00,
MODIFY	`taxes`                   TEXT             DEFAULT NULL,
MODIFY	`tax_total`               DECIMAL(11, 2)   NOT NULL DEFAULT 0.00,
MODIFY	`discount`                DECIMAL(11, 2)   NOT NULL DEFAULT 0.00,
MODIFY	`discount_system`         DECIMAL(11, 2)   NOT NULL DEFAULT 0.00,
MODIFY	`discounts`               TEXT             DEFAULT NULL,
MODIFY	`adjustments`             TEXT             DEFAULT NULL,
MODIFY	`nightly`                 TEXT             DEFAULT NULL,
MODIFY	`cancelled`               TINYINT(1)       NOT NULL DEFAULT 0,
MODIFY	`cancelled_timestamp`     DATETIME         DEFAULT NULL,
MODIFY	`coupon_id`               INT(11)          NOT NULL DEFAULT 0,
MODIFY	`coupon_discount`         DECIMAL(11, 2)   NOT NULL DEFAULT 0.00,
MODIFY	`expiry_days`             INT(3)           NOT NULL DEFAULT 0,
MODIFY	`expiry_date`             DATE             DEFAULT NULL,
MODIFY	`balance_days`            INT(3)           NOT NULL DEFAULT 0,
MODIFY	`balance_date`            DATE             DEFAULT NULL,
MODIFY	`commission`              DECIMAL(11,2)   NOT NULL DEFAULT 0.00,
MODIFY	`markup`                  DECIMAL(11,2)   NOT NULL DEFAULT 0.00,
MODIFY	`net_price`               DECIMAL(11,2)   NOT NULL DEFAULT 0.00,
MODIFY	`net_price_system`        DECIMAL(11,2)   NOT NULL DEFAULT 0.00,
MODIFY	`agent_value`             DECIMAL(11,2)   NOT NULL DEFAULT 0.00,
MODIFY	`agent_commission`        DECIMAL(11,2)   NOT NULL DEFAULT 0.00,
MODIFY	`agent_reference`         VARCHAR(100)     DEFAULT NULL,
MODIFY	`agent_deposit_paid`      TINYINT(1)       NOT NULL DEFAULT 0,
MODIFY	`channel_commission`      DECIMAL(11,2)   NOT NULL DEFAULT 0.00,
MODIFY	`black_booking`           TINYINT(1)       NOT NULL DEFAULT 0,
MODIFY	`reviewed`                TINYINT(1)       NOT NULL DEFAULT 0,
MODIFY	`review_requested`        TINYINT(1)       NOT NULL DEFAULT 0,
MODIFY	`qkey`                    VARCHAR(255)     DEFAULT NULL,
MODIFY	`state`                   TINYINT(1)       NOT NULL DEFAULT 1,
MODIFY	`checked_out`             INT(11)          DEFAULT NULL,
MODIFY	`checked_out_time`        DATETIME         DEFAULT NULL,
MODIFY	`created_by`              INT(11)          NOT NULL DEFAULT 0,
MODIFY	`created_at`              DATETIME         DEFAULT NULL,
MODIFY	`updated_by`              INT(11)          NOT NULL DEFAULT 0,
MODIFY	`updated_at`              DATETIME         DEFAULT NULL;
UPDATE `#__knowres_contract` SET `created_at` = NULL WHERE created_at = '0000-00-00 00:00:00';
UPDATE `#__knowres_contract` SET `updated_at` = NULL WHERE updated_at = '0000-00-00 00:00:00';

ALTER TABLE `#__knowres_contract_fee`
MODIFY	`description`         VARCHAR(500)     DEFAULT NULL,
MODIFY	`value`               DECIMAL(11, 2)   NOT NULL DEFAULT 0,
MODIFY	`contract_id`         INT(11)          NOT NULL DEFAULT 0,
MODIFY	`contract_payment_id` INT(11)          NOT NULL DEFAULT 0,
MODIFY	`actioned`            TINYINT(1)       NOT NULL DEFAULT 0,
MODIFY	`checked_out`         INT(11)          DEFAULT NULL,
MODIFY	`checked_out_time`    DATETIME         DEFAULT NULL,
MODIFY	`created_by`          INT(11)          NOT NULL DEFAULT 0,
MODIFY	`created_at`          DATETIME         DEFAULT NULL;
UPDATE `#__knowres_contract` SET `created_at` = NULL WHERE created_at = '0000-00-00 00:00:00';

ALTER TABLE `#__knowres_contract_guestdata`
MODIFY	`contract_id`        INT(11)          NOT NULL DEFAULT 0,
MODIFY	`guest_id`           INT(11)          NOT NULL DEFAULT 0,
MODIFY	`adults`             TINYINT(1)       NOT NULL DEFAULT 0,
MODIFY	`children`           VARCHAR(100)     DEFAULT NULL,
MODIFY	`infants`            TINYINT(1)       NOT NULL DEFAULT 0,
MODIFY	`guestinfo`          TEXT             DEFAULT NULL,
MODIFY	`c_name`             VARCHAR(255)     DEFAULT NULL,
MODIFY	`c_phone`            VARCHAR(255)     DEFAULT NULL,
MODIFY	`c_email`            VARCHAR(255)     DEFAULT NULL,
MODIFY	`vmobile`            VARCHAR(50)      DEFAULT NULL,
MODIFY	`vmobile_country_id` INT(11)          NOT NULL DEFAULT 0,
MODIFY	`arrival_means`      VARCHAR(255)     DEFAULT NULL,
MODIFY	`arrival_time`       VARCHAR(255)     DEFAULT NULL,
MODIFY	`arrival_place`      VARCHAR(255)     DEFAULT NULL,
MODIFY	`arrival_from`       VARCHAR(255)     DEFAULT NULL,
MODIFY	`arrival_air`        TEXT             DEFAULT NULL,
MODIFY	`other_information`  TEXT             DEFAULT NULL,
MODIFY	`departure_time`     VARCHAR(255)     DEFAULT NULL,
MODIFY	`departure_means`    VARCHAR(255)     DEFAULT NULL,
MODIFY	`departure_number`   VARCHAR(255)     DEFAULT NULL,
MODIFY	`options`            TEXT             DEFAULT NULL,
MODIFY	`preferences`        TEXT             DEFAULT NULL,
MODIFY	`checked_out`        INT(11)          DEFAULT NULL,
MODIFY	`checked_out_time`   DATETIME         DEFAULT NULL,
MODIFY	`created_by`         INT(11)          NOT NULL DEFAULT 0,
MODIFY	`created_at`         DATETIME         DEFAULT NULL,
MODIFY	`updated_by`         INT(11)          NOT NULL DEFAULT 0,
MODIFY	`updated_at`         DATETIME         DEFAULT NULL,
MODIFY	`version`            INT(11)          NOT NULL DEFAULT 1;
UPDATE `#__knowres_contract_guestdata` SET `created_at` = NULL WHERE created_at = '0000-00-00 00:00:00';
UPDATE `#__knowres_contract_guestdata` SET `updated_at` = NULL WHERE updated_at = '0000-00-00 00:00:00';

ALTER TABLE `#__knowres_contract_note`
MODIFY	`contract_id`      INT(11)          NOT NULL DEFAULT 0,
MODIFY	`note`             TEXT             DEFAULT NULL,
MODIFY	`note_type`        VARCHAR(20)      DEFAULT NULL,
MODIFY	`checked_out`      INT(11)          DEFAULT NULL,
MODIFY	`checked_out_time` DATETIME         DEFAULT NULL,
MODIFY	`created_by`       INT(11)          NOT NULL DEFAULT 0,
MODIFY	`created_at`       DATETIME         DEFAULT NULL,
MODIFY	`updated_by`       INT(11)          NOT NULL DEFAULT 0,
MODIFY	`updated_at`       DATETIME         DEFAULT NULL;
UPDATE `#__knowres_contract_note` SET `created_at` = NULL WHERE created_at = '0000-00-00 00:00:00';
UPDATE `#__knowres_contract_note` SET `updated_at` = NULL WHERE updated_at = '0000-00-00 00:00:00';

ALTER TABLE `#__knowres_contract_payment`
MODIFY	`id`               INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
MODIFY	`contract_id`      INT(11)          NOT NULL DEFAULT 0,
MODIFY	`service_id`       INT(11)          NOT NULL DEFAULT 0,
MODIFY	`payment_date`     DATE             DEFAULT NULL,
MODIFY	`amount`           DECIMAL(11, 2)   NOT NULL DEFAULT 0.00,
MODIFY	`rate`             DECIMAL(14, 5)   NOT NULL DEFAULT 0.00000,
MODIFY	`base_amount`      DECIMAL(11, 2)   NOT NULL DEFAULT 0.00,
MODIFY	`currency`         VARCHAR(3)       DEFAULT NULL,
MODIFY	`payment_ref`      VARCHAR(255)     DEFAULT NULL,
MODIFY	`note`             VARCHAR(500)     DEFAULT NULL,
MODIFY	`confirmed`        TINYINT(1)       NOT NULL DEFAULT 0,
MODIFY	`service_ref`      VARCHAR(255)     DEFAULT NULL,
MODIFY	`actioned`         TINYINT(1)       NOT NULL DEFAULT 0,
MODIFY	`actioned_at`      DATETIME         DEFAULT NULL,
MODIFY	`state`            TINYINT(1)       NOT NULL DEFAULT 0,
MODIFY	`checked_out`      INT(11)          DEFAULT NULL,
MODIFY	`checked_out_time` DATETIME         DEFAULT NULL,
MODIFY	`created_by`       INT(11)          NOT NULL DEFAULT 0,
MODIFY	`created_at`       DATETIME         DEFAULT NULL,
MODIFY	`updated_by`       INT(11)          NOT NULL DEFAULT 0,
MODIFY	`updated_at`       DATETIME         DEFAULT NULL;
UPDATE `#__knowres_contract_payment` SET `created_at` = NULL WHERE created_at = '0000-00-00 00:00:00';
UPDATE `#__knowres_contract_payment` SET `updated_at` = NULL WHERE updated_at = '0000-00-00 00:00:00';

ALTER TABLE `#__knowres_country`
MODIFY	`country_iso`      CHAR(2)          DEFAULT NULL,
MODIFY	`dial_code`        VARCHAR(6)       DEFAULT NULL,
MODIFY	`allow_property`   TINYINT(1)       NOT NULL DEFAULT 0,
MODIFY  `state`            TINYINT(1)       NOT NULL DEFAULT 1,
MODIFY	`checked_out`      INT(11)          DEFAULT NULL,
MODIFY	`checked_out_time` DATETIME         DEFAULT NULL,
MODIFY	`created_by`       INT(11)          NOT NULL DEFAULT 0,
MODIFY	`created_at`       DATETIME         DEFAULT NULL,
MODIFY	`updated_by`       INT(11)          NOT NULL DEFAULT 0,
MODIFY	`updated_at`       DATETIME         DEFAULT NULL,
MODIFY	`version`          INT(11)          NOT NULL DEFAULT 1;
UPDATE `#__knowres_country` SET `created_at` = NULL WHERE created_at = '0000-00-00 00:00:00';
UPDATE `#__knowres_country` SET `updated_at` = NULL WHERE updated_at = '0000-00-00 00:00:00';

ALTER TABLE `#__knowres_coupon`
MODIFY	`property_id`      INT(11)          NOT NULL DEFAULT 0,
MODIFY	`coupon_code`      VARCHAR(20)      DEFAULT NULL,
MODIFY	`valid_from`       DATE             DEFAULT NULL,
MODIFY	`valid_to`         DATE             DEFAULT NULL,
MODIFY	`amount`           DECIMAL(11, 2)   NOT NULL DEFAULT 0.00,
MODIFY	`is_percentage`    TINYINT(1)       NOT NULL DEFAULT 0,
MODIFY  `state`            TINYINT(1)       NOT NULL DEFAULT 1,
MODIFY	`checked_out`      INT(11)          DEFAULT NULL,
MODIFY	`checked_out_time` DATETIME         DEFAULT NULL,
MODIFY	`created_by`       INT(11)          NOT NULL DEFAULT 0,
MODIFY	`created_at`       DATETIME         DEFAULT NULL,
MODIFY	`updated_by`       INT(11)          NOT NULL DEFAULT 0,
MODIFY	`updated_at`       DATETIME         DEFAULT NULL,
MODIFY	`version`          INT(11)          NOT NULL DEFAULT 1;
UPDATE `#__knowres_coupon` SET `created_at` = NULL WHERE created_at = '0000-00-00 00:00:00';
UPDATE `#__knowres_coupon` SET `updated_at` = NULL WHERE updated_at = '0000-00-00 00:00:00';

ALTER TABLE `#__knowres_currency`
MODIFY	`iso`              VARCHAR(3)       DEFAULT NULL,
MODIFY	`decimals`         INT(2)           NOT NULL DEFAULT 0,
MODIFY	`allow_property`   TINYINT(1)       NOT NULL DEFAULT 0,
MODIFY	`allow_payment`    TEXT             DEFAULT NULL,
MODIFY	`ordering`         INT(11)          NOT NULL DEFAULT 0,
MODIFY  `state`            TINYINT(1)       NOT NULL DEFAULT 1,
MODIFY	`checked_out`      INT(11)          DEFAULT NULL,
MODIFY	`checked_out_time` DATETIME         DEFAULT NULL,
MODIFY	`created_by`       INT(11)          NOT NULL DEFAULT 0,
MODIFY	`created_at`       DATETIME         DEFAULT NULL,
MODIFY	`updated_by`       INT(11)          NOT NULL DEFAULT 0,
MODIFY	`updated_at`       DATETIME         DEFAULT NULL,
MODIFY	`version`          INT(11)          NOT NULL DEFAULT 1;
UPDATE `#__knowres_currency` SET `created_at` = NULL WHERE created_at = '0000-00-00 00:00:00';
UPDATE `#__knowres_currency` SET `updated_at` = NULL WHERE updated_at = '0000-00-00 00:00:00';

ALTER TABLE `#__knowres_discount`
MODIFY	`property_id`      INT(11)          NOT NULL DEFAULT 0,
MODIFY	`discount`         DECIMAL(11, 2)   NOT NULL DEFAULT 0.00,
MODIFY	`is_pc`            TINYINT(1)       NOT NULL DEFAULT 0,
MODIFY	`valid_from`       DATE             DEFAULT NULL,
MODIFY	`valid_to`         DATE             DEFAULT NULL,
MODIFY	`model`            TINYINT(1)       NOT NULL DEFAULT 0,
mODIFY	`param1`           VARCHAR(255)     DEFAULT NULL,
MODIFY	`param2`           VARCHAR(255)     DEFAULT NULL,
MODIFY	`ordering`         INT(11)          NOT NULL DEFAULT 0,
MODIFY  `state`            TINYINT(1)       NOT NULL DEFAULT 1,
MODIFY	`checked_out`      INT(11)          DEFAULT NULL,
MODIFY	`checked_out_time` DATETIME         DEFAULT NULL,
MODIFY	`created_by`       INT(11)          NOT NULL DEFAULT 0,
MODIFY	`created_at`       DATETIME         DEFAULT NULL,
MODIFY	`updated_by`       INT(11)          NOT NULL DEFAULT 0,
MODIFY	`updated_at`       DATETIME         DEFAULT NULL,
MODIFY	`version`          INT(11)          NOT NULL DEFAULT 1;
UPDATE `#__knowres_discount` SET `created_at` = NULL WHERE created_at = '0000-00-00 00:00:00';
UPDATE `#__knowres_discount` SET `updated_at` = NULL WHERE updated_at = '0000-00-00 00:00:00';

ALTER TABLE `#__knowres_email_action`
MODIFY	`contract_id`      INT(11)          NOT NULL DEFAULT 0,
MODIFY	`email_trigger`    VARCHAR(50)      DEFAULT NULL,
MODIFY	`checked_out`      INT(11)          DEFAULT NULL,
MODIFY	`checked_out_time` DATETIME         DEFAULT NULL,
MODIFY	`created_by`       INT(11)          NOT NULL DEFAULT 0,
MODIFY	`created_at`       DATETIME         DEFAULT NULL,
MODIFY	`updated_by`       INT(11)          NOT NULL DEFAULT 0,
MODIFY	`updated_at`       DATETIME         DEFAULT NULL;
UPDATE `#__knowres_email_action` SET `created_at` = NULL WHERE created_at = '0000-00-00 00:00:00';
UPDATE `#__knowres_email_action` SET `updated_at` = NULL WHERE updated_at = '0000-00-00 00:00:00';

ALTER TABLE `#__knowres_email_template`
MODIFY	`pdf_uploaded`     VARCHAR(255)     DEFAULT NULL,
MODIFY	`pdf_auto`         VARCHAR(255)     DEFAULT NULL,
MODIFY  `state`            TINYINT(1)       NOT NULL DEFAULT 1,
MODIFY	`checked_out`      INT(11)          DEFAULT NULL,
MODIFY	`checked_out_time` DATETIME         DEFAULT NULL,
MODIFY	`created_by`       INT(11)          NOT NULL DEFAULT 0,
MODIFY	`created_at`       DATETIME         DEFAULT NULL,
MODIFY	`updated_by`       INT(11)          NOT NULL DEFAULT 0,
MODIFY	`updated_at`       DATETIME         DEFAULT NULL,
MODIFY	`version`          INT(11)          NOT NULL DEFAULT 1;
UPDATE `#__knowres_email_template` SET `created_at` = NULL WHERE created_at = '0000-00-00 00:00:00';
UPDATE `#__knowres_email_template` SET `updated_at` = NULL WHERE updated_at = '0000-00-00 00:00:00';

ALTER TABLE `#__knowres_email_trigger`
MODIFY	`email_template_id` INT(11)          NOT NULL DEFAULT 0,
MODIFY	`name`              VARCHAR(255)     DEFAULT NULL,
MODIFY	`trigger_actual`    VARCHAR(255)     DEFAULT NULL,
MODIFY	`trigger_cron`      VARCHAR(255)     DEFAULT NULL,
MODIFY	`days`              INT(3)           NOT NULL DEFAULT 0,
MODIFY	`days_before`       TINYINT(1)       NOT NULL DEFAULT 0,
MODIFY	`booking_status`    VARCHAR(255)     DEFAULT NULL,
MODIFY	`send_guest`        TINYINT(1)       NOT NULL DEFAULT 0,
MODIFY	`send_owner`        TINYINT(1)       NOT NULL DEFAULT 0,
MODIFY	`send_caretaker`    TINYINT(1)       NOT NULL DEFAULT 0,
MODIFY	`send_admin`        TINYINT(1)       NOT NULL DEFAULT 0,
MODIFY	`send_agent`        TINYINT(1)       NOT NULL DEFAULT 0,
MODIFY  `state`             TINYINT(1)       NOT NULL DEFAULT 1,
MODIFY	`checked_out`       INT(11)          DEFAULT NULL,
MODIFY	`checked_out_time`  DATETIME         DEFAULT NULL,
MODIFY	`created_by`        INT(11)          NOT NULL DEFAULT 0,
MODIFY	`created_at`        DATETIME         DEFAULT NULL,
MODIFY	`updated_by`        INT(11)          NOT NULL DEFAULT 0,
MODIFY	`updated_at`        DATETIME         DEFAULT NULL,
MODIFY	`version`           INT(11)          NOT NULL DEFAULT 1;
UPDATE `#__knowres_email_trigger` SET `created_at` = NULL WHERE created_at = '0000-00-00 00:00:00';
UPDATE `#__knowres_email_trigger` SET `updated_at` = NULL WHERE updated_at = '0000-00-00 00:00:00';

ALTER TABLE `#__knowres_exchange_rate`
MODIFY	`currency_from`    CHAR(3)          DEFAULT NULL,
MODIFY	`currency_to`      CHAR(3)          DEFAULT NULL,
MODIFY	`rate`             DECIMAL(15, 6)   NOT NULL DEFAULT 0.000000,
MODIFY	`factor`           INT(11)          NOT NULL DEFAULT 0,
MODIFY  `state`            TINYINT(1)       NOT NULL DEFAULT 1,
MODIFY	`checked_out`      INT(11)          DEFAULT NULL,
MODIFY	`checked_out_time` DATETIME         DEFAULT NULL,
MODIFY	`created_by`       INT(11)          NOT NULL DEFAULT 0,
MODIFY	`created_at`       DATETIME         DEFAULT NULL,
MODIFY	`updated_by`       INT(11)          NOT NULL DEFAULT 0,
MODIFY	`updated_at`       DATETIME         DEFAULT NULL,
MODIFY	`version`          INT(11)          NOT NULL DEFAULT 1;
UPDATE `#__knowres_exchange_rate` SET `created_at` = NULL WHERE created_at = '0000-00-00 00:00:00';
UPDATE `#__knowres_exchange_rate` SET `updated_at` = NULL WHERE updated_at = '0000-00-00 00:00:00';

ALTER TABLE `#__knowres_extra`
MODIFY	`price`            DECIMAL(11, 2)   NOT NULL DEFAULT 0.00,
MODIFY	`percentage`       INT(3)           NOT NULL DEFAULT 0,
MODIFY	`tax_id`           INT(11)          NOT NULL DEFAULT 0,
MODIFY	`max_quantity`     INT(5)           NOT NULL DEFAULT 0,
MODIFY	`property_id`      INT(11)          NOT NULL DEFAULT 0,
MODIFY	`model`            INT(3)           NOT NULL DEFAULT 0,
MODIFY	`mandatory`        TINYINT(1)       NOT NULL DEFAULT 0,
MODIFY	`cleaning`         TINYINT(1)       NOT NULL DEFAULT 0,
MODIFY	`payto`            TINYINT(1)       NOT NULL DEFAULT 0,
MODIFY	`ordering`         INT(11)          NOT NULL DEFAULT 0,
MODIFY  `state`            TINYINT(1)       NOT NULL DEFAULT 1,
MODIFY	`checked_out`      INT(11)          DEFAULT NULL,
MODIFY	`checked_out_time` DATETIME         DEFAULT NULL,
MODIFY	`created_by`       INT(11)          NOT NULL DEFAULT 0,
MODIFY	`created_at`       DATETIME         DEFAULT NULL,
MODIFY	`updated_by`       INT(11)          NOT NULL DEFAULT 0,
MODIFY	`updated_at`       DATETIME         DEFAULT NULL,
MODIFY	`version`          INT(11)          NOT NULL DEFAULT 1;
UPDATE `#__knowres_extra` SET `created_at` = NULL WHERE created_at = '0000-00-00 00:00:00';
UPDATE `#__knowres_extra` SET `updated_at` = NULL WHERE updated_at = '0000-00-00 00:00:00';

ALTER TABLE `#__knowres_guest`
MODIFY	`user_id`           INT(11)          NOT NULL DEFAULT 0,
MODIFY	`property_id`       INT(11)          NOT NULL DEFAULT 0,
MODIFY	`email`             VARCHAR(255)     DEFAULT NULL,
MODIFY	`firstname`         VARCHAR(255)     DEFAULT NULL,
MODIFY	`surname`           VARCHAR(255)     DEFAULT NULL,
MODIFY	`document_type`     TINYINT(1)       NOT NULL DEFAULT 0,
MODIFY	`document_id`       VARCHAR(50)      DEFAULT NULL,
MODIFY	`address1`          VARCHAR(255)     DEFAULT NULL,
MODIFY	`address2`          VARCHAR(255)     DEFAULT NULL,
MODIFY	`town`              VARCHAR(255)     DEFAULT NULL,
MODIFY	`region`            VARCHAR(255)     DEFAULT NULL,
MODIFY	`region_id`         INT(11)          NOT NULL DEFAULT 0,
MODIFY	`country_id`        INT(11)          NOT NULL DEFAULT 0,
MODIFY	`postcode`          VARCHAR(100)     DEFAULT NULL,
MODIFY	`b_address1`        VARCHAR(255)     DEFAULT NULL,
MODIFY	`b_address2`        VARCHAR(255)     DEFAULT NULL,
MODIFY	`b_town`            VARCHAR(255)     DEFAULT NULL,
MODIFY	`b_region`          VARCHAR(255)     DEFAULT NULL,
MODIFY	`b_postcode`        VARCHAR(100)     DEFAULT NULL,
MODIFY	`b_region_id`       INT(11)          NOT NULL DEFAULT 0,
MODIFY	`b_country_id`      INT(11)          NOT NULL DEFAULT 0,
MODIFY	`email_2`           VARCHAR(255)     DEFAULT NULL,
MODIFY	`email_3`           VARCHAR(255)     DEFAULT NULL,
MODIFY	`mobile`            VARCHAR(50)      DEFAULT NULL,
MODIFY	`mobile_country_id` INT(11)          NOT NULL DEFAULT 0,
MODIFY	`telephone`         TEXT             DEFAULT NULL,
MODIFY	`discount`          INT(11)          NOT NULL DEFAULT 0,
MODIFY	`referral_id`       INT(11)          NOT NULL DEFAULT 0,
MODIFY	`referral_info`     VARCHAR(500)     DEFAULT NULL,
MODIFY	`customer_ref`      TEXT             DEFAULT NULL,
MODIFY	`foreign_key`       VARCHAR(255)     DEFAULT NULL,
MODIFY  `state`             TINYINT(1)       NOT NULL DEFAULT 1,
MODIFY	`checked_out`       INT(11)          DEFAULT NULL,
MODIFY	`checked_out_time`  DATETIME         DEFAULT NULL,
MODIFY	`created_by`        INT(11)          NOT NULL DEFAULT 0,
MODIFY	`created_at`        DATETIME         DEFAULT NULL,
MODIFY	`updated_by`        INT(11)          NOT NULL DEFAULT 0,
MODIFY	`updated_at`        DATETIME         DEFAULT NULL,
MODIFY	`version`           INT(11)          NOT NULL DEFAULT 1;
UPDATE `#__knowres_guest` SET `created_at` = NULL WHERE created_at = '0000-00-00 00:00:00';
UPDATE `#__knowres_guest` SET `updated_at` = NULL WHERE updated_at = '0000-00-00 00:00:00';

ALTER TABLE `#__knowres_ical_block`
MODIFY	`property_id`       INT(11)          NOT NULL DEFAULT 0,
MODIFY	`service_id`        INT(11)          NOT NULL DEFAULT 0,
MODIFY	`arrival`           DATE             DEFAULT NULL,
MODIFY	`departure`         DATE             DEFAULT NULL,
MODIFY	`note`              TEXT             DEFAULT NULL,
MODIFY	`created_at`        DATETIME         DEFAULT NULL;
UPDATE `#__knowres_ical_block` SET `created_at` = NULL WHERE created_at = '0000-00-00 00:00:00';

ALTER TABLE `#__knowres_image`
MODIFY	`property_id`      INT(11)          NOT NULL DEFAULT 0,
MODIFY	`property_order`   INT(3)           NOT NULL DEFAULT 0,
MODIFY	`filename`         VARCHAR(255)     DEFAULT NULL,
MODIFY  `state`            TINYINT(1)       NOT NULL DEFAULT 1,
MODIFY	`checked_out`      INT(11)          DEFAULT NULL,
MODIFY	`checked_out_time` DATETIME         DEFAULT NULL,
MODIFY	`created_by`       INT(11)          NOT NULL DEFAULT 0,
MODIFY	`created_at`       DATETIME         DEFAULT NULL,
MODIFY	`updated_by`       INT(11)          NOT NULL DEFAULT 0,
MODIFY	`updated_at`       DATETIME         DEFAULT NULL,
MODIFY	`version`          INT(11)          NOT NULL DEFAULT 1;
UPDATE `#__knowres_image` SET `created_at` = NULL WHERE created_at = '0000-00-00 00:00:00';
UPDATE `#__knowres_image` SET `updated_at` = NULL WHERE updated_at = '0000-00-00 00:00:00';

ALTER TABLE `#__knowres_manager`
MODIFY	`user_id`          INT(11)          NOT NULL DEFAULT 0,
MODIFY  `properties`       TEXT             DEFAULT NULL,
MODIFY	`access_level`     INT(2)           NOT NULL DEFAULT 0,
MODIFY	`apikey`           VARCHAR(255)     DEFAULT NULL,
MODIFY	`agency_id`        INT(11)          NOT NULL DEFAULT 0,
MODIFY  `state`            TINYINT(1)       NOT NULL DEFAULT 1,
MODIFY	`checked_out`      INT(11)          DEFAULT NULL,
MODIFY	`checked_out_time` DATETIME         DEFAULT NULL,
MODIFY	`created_by`       INT(11)          NOT NULL DEFAULT 0,
MODIFY	`created_at`       DATETIME         DEFAULT NULL,
MODIFY	`updated_by`       INT(11)          NOT NULL DEFAULT 0,
MODIFY	`updated_at`       DATETIME         DEFAULT NULL,
MODIFY	`version`          INT(11)          NOT NULL DEFAULT 1;
UPDATE `#__knowres_manager` SET `created_at` = NULL WHERE created_at = '0000-00-00 00:00:00';
UPDATE `#__knowres_manager` SET `updated_at` = NULL WHERE updated_at = '0000-00-00 00:00:00';

ALTER TABLE `#__knowres_map_category`
MODIFY	`mapicon`          VARCHAR(255)     DEFAULT NULL,
MODIFY	`ordering`         INT(11)          NOT NULL DEFAULT 0,
MODIFY  `state`            TINYINT(1)       NOT NULL DEFAULT 1,
MODIFY	`checked_out`      INT(11)          DEFAULT NULL,
MODIFY	`checked_out_time` DATETIME         DEFAULT NULL,
MODIFY	`created_by`       INT(11)          NOT NULL DEFAULT 0,
MODIFY	`created_at`       DATETIME         DEFAULT NULL,
MODIFY	`updated_by`       INT(11)          NOT NULL DEFAULT 0,
MODIFY	`updated_at`       DATETIME         DEFAULT NULL,
MODIFY	`version`          INT(11)          NOT NULL DEFAULT 1;
UPDATE `#__knowres_map_category` SET `created_at` = NULL WHERE created_at = '0000-00-00 00:00:00';
UPDATE `#__knowres_map_category` SET `updated_at` = NULL WHERE updated_at = '0000-00-00 00:00:00';

ALTER TABLE `#__knowres_map_marker`
MODIFY	`map_category_id`  INT(11)          NOT NULL DEFAULT 0,
MODIFY	`region_id`        INT(11)          NOT NULL DEFAULT 0,
MODIFY	`country_id`       INT(11)          NOT NULL DEFAULT 0,
MODIFY	`lat`              FLOAT(10, 6)     NOT NULL DEFAULT 0,
MODIFY	`lng`              FLOAT(10, 6)     NOT NULL DEFAULT 0,
MODIFY  `state`            TINYINT(1)       NOT NULL DEFAULT 1,
MODIFY	`checked_out`      INT(11)          DEFAULT NULL,
MODIFY	`checked_out_time` DATETIME         DEFAULT NULL,
MODIFY	`created_by`       INT(11)          NOT NULL DEFAULT 0,
MODIFY	`created_at`       DATETIME         DEFAULT NULL,
MODIFY	`updated_by`       INT(11)          NOT NULL DEFAULT 0,
MODIFY	`updated_at`       DATETIME         DEFAULT NULL,
MODIFY	`version`          INT(11)          NOT NULL DEFAULT 1;
UPDATE `#__knowres_map_marker` SET `created_at` = NULL WHERE created_at = '0000-00-00 00:00:00';
UPDATE `#__knowres_map_marker` SET `updated_at` = NULL WHERE updated_at = '0000-00-00 00:00:00';

ALTER TABLE `#__knowres_owner`
MODIFY	`name`              VARCHAR(255)  DEFAULT NULL,
MODIFY	`address1`          VARCHAR(255)  DEFAULT NULL,
MODIFY	`address2`          VARCHAR(255)  DEFAULT NULL,
MODIFY	`town`              VARCHAR(255)  DEFAULT NULL,
MODIFY	`postcode`          VARCHAR(100)  DEFAULT NULL,
MODIFY	`region_id`         INT(11)       NOT NULL DEFAULT 0,
MODIFY	`country_id`        INT(11)       NOT NULL DEFAULT 0,
MODIFY	`business`          TINYINT(1)    NOT NULL DEFAULT 0,
MODIFY	`iban`              VARCHAR(50)   DEFAULT NULL,
MODIFY	`email`             VARCHAR(255)  DEFAULT NULL,
MODIFY	`mobile`            VARCHAR(50)   DEFAULT NULL,
MODIFY	`mobile_country_id` INT(11)       NOT NULL DEFAULT 0,
MODIFY	`document_type`     VARCHAR(255)  DEFAULT NULL,
MODIFY	`document_id`       VARCHAR(255)  DEFAULT NULL,
MODIFY	`commission`        DECIMAL(5, 2) NOT NULL DEFAULT 0.00,
MODIFY	`payment_schedule`  VARCHAR(10)   DEFAULT NULL,
MODIFY	`prorate`           TINYINT(1)    NOT NULL DEFAULT 0,
MODIFY	`days`              TINYINT(3)    NOT NULL DEFAULT 0,
MODIFY	`pay_deposit`       TINYINT(3)    NOT NULL DEFAULT 0,
MODIFY	`deposit_pc`        TINYINT(1)    NOT NULL DEFAULT 0,
MODIFY	`deposit_days`      TINYINT(3)    NOT NULL DEFAULT 0,
MODIFY	`whopays`           TINYINT(1)    NOT NULL DEFAULT 0,
MODIFY	`invoice`           TINYINT(1)    NOT NULL DEFAULT 0,
MODIFY	`foreign_key`       VARCHAR(255)  DEFAULT NULL,
MODIFY  `state`             TINYINT(1)    NOT NULL DEFAULT 1,
MODIFY	`checked_out`       INT(11)       DEFAULT NULL,
MODIFY	`checked_out_time`  DATETIME      DEFAULT NULL,
MODIFY	`created_by`        INT(11)       NOT NULL DEFAULT 0,
MODIFY	`created_at`        DATETIME      DEFAULT NULL,
MODIFY	`updated_by`        INT(11)       NOT NULL DEFAULT 0,
MODIFY	`updated_at`        DATETIME      DEFAULT NULL,
MODIFY	`version`           INT(11)       NOT NULL DEFAULT 1;
UPDATE `#__knowres_owner` SET `created_at` = NULL WHERE created_at = '0000-00-00 00:00:00';
UPDATE `#__knowres_owner` SET `updated_at` = NULL WHERE updated_at = '0000-00-00 00:00:00';

ALTER TABLE `#__knowres_owner_payment`
MODIFY	`owner_id`         INT(11)          NOT NULL DEFAULT 0,
MODIFY	`contract_id`      INT(11)          NOT NULL DEFAULT 0,
MODIFY	`amount`           DECIMAL(11,2)    NOT NULL DEFAULT 0.00,
MODIFY	`calculated`       DECIMAL(11,2)    NOT NULL DEFAULT 0.00,
MODIFY	`type`             VARCHAR(3)       DEFAULT NULL,
MODIFY	`payment_date`     DATE             DEFAULT NULL,
MODIFY	`payment_ref`      VARCHAR(50)      DEFAULT NULL,
MODIFY	`confirmed`        TINYINT(1)       NOT NULL DEFAULT 0,
MODIFY	`confirmed_at`     DATETIME         DEFAULT NULL,
MODIFY	`confirmed_by`     INT(11)          NOT NULL DEFAULT 0,
MODIFY  `state`            TINYINT(1)       NOT NULL DEFAULT 1,
MODIFY	`created_by`       INT(11)          NOT NULL DEFAULT 0,
MODIFY	`created_at`       DATETIME         DEFAULT NULL,
MODIFY	`updated_by`       INT(11)          NOT NULL DEFAULT 0,
MODIFY	`updated_at`       DATETIME         DEFAULT NULL;
UPDATE `#__knowres_owner_payment` SET `created_at` = NULL WHERE created_at = '0000-00-00 00:00:00';
UPDATE `#__knowres_owner_payment` SET `updated_at` = NULL WHERE updated_at = '0000-00-00 00:00:00';

ALTER TABLE `#__knowres_property`
MODIFY	`property_name`         VARCHAR(255)     DEFAULT NULL,
MODIFY	`property_aka`          VARCHAR(255)     DEFAULT NULL,
MODIFY	`property_street`       VARCHAR(255)     DEFAULT NULL,
MODIFY	`property_area`         VARCHAR(255)     DEFAULT NULL,
MODIFY	`property_town`         VARCHAR(255)     DEFAULT NULL,
MODIFY	`town_id`               INT(11)          NOT NULL DEFAULT 0,
MODIFY	`region_id`             INT(11)          NOT NULL DEFAULT 0,
MODIFY	`property_region`       VARCHAR(255)     DEFAULT NULL,
MODIFY	`country_id`            INT(11)          NOT NULL DEFAULT 0,
MODIFY	`property_postcode`     VARCHAR(100)     DEFAULT NULL,
MODIFY	`property_tel`          VARCHAR(100)     DEFAULT NULL,
MODIFY	`property_email`        VARCHAR(255)     DEFAULT NULL,
MODIFY	`caretaker_email`       VARCHAR(255)     DEFAULT NULL,
MODIFY	`property_features`     TEXT             DEFAULT NULL,
MODIFY	`property_mappinglink`  TEXT             DEFAULT NULL,
MODIFY	`floor`                 INT(3)           NOT NULL DEFAULT 0,
MODIFY	`area`                  INT(6)           NOT NULL DEFAULT 0,
MODIFY	`stars`                 INT(11)          NOT NULL DEFAULT 0,
MODIFY	`type_id`               INT(11)          NOT NULL DEFAULT 0,
MODIFY	`apikey`                VARCHAR(255)     DEFAULT NULL,
MODIFY	`lat`                   FLOAT(10, 6)     NOT NULL DEFAULT 0,
MODIFY	`lng`                   FLOAT(10, 6)     NOT NULL DEFAULT 0,
MODIFY	`lat_actual`            FLOAT(10, 6)     NOT NULL DEFAULT 0,
MODIFY	`lng_actual`            FLOAT(10, 6)     NOT NULL DEFAULT 0,
MODIFY	`map_max_zoom`          TINYINT(2)       NULL DEFAULT 20,
MODIFY	`property_units`        VARCHAR(255)     DEFAULT NULL,
MODIFY	`property_alternatives` VARCHAR(255)     DEFAULT NULL,
MODIFY	`sleeps`                TINYINT(1)       NOT NULL DEFAULT 0,
MODIFY	`sleeps_extra`          TINYINT(1)       NOT NULL DEFAULT 0,
MODIFY	`sleeps_infant_age`     TINYINT(1)       NOT NULL DEFAULT 0,
MODIFY	`sleeps_infant_max`     TINYINT(1)       NOT NULL DEFAULT 0,
MODIFY	`pets`                  TINYINT(1)       NOT NULL DEFAULT 0,
MODIFY	`bedrooms`              INT(11)          NOT NULL DEFAULT 0,
MODIFY	`bed_types`             TEXT             DEFAULT NULL,
MODIFY	`bathrooms`             INT(11)          NOT NULL DEFAULT 0,
MODIFY	`wc`                    TINYINT(1)       NOT NULL DEFAULT 0,
MODIFY	`price_summary`         VARCHAR(50)      DEFAULT NULL,
MODIFY	`contact_name`          VARCHAR(255)     DEFAULT NULL,
MODIFY	`contact_phone`         VARCHAR(255)     DEFAULT NULL,
MODIFY	`contact_email`         VARCHAR(255)     DEFAULT NULL,
MODIFY	`contact_days`          TINYINT(1)       NOT NULL DEFAULT 0,
MODIFY	`property_videolink`    VARCHAR(255)     DEFAULT NULL,
MODIFY	`cancellation_penalty`  TEXT             DEFAULT NULL,
MODIFY	`security_cash`         TINYINT(1)       NOT NULL DEFAULT 0,
MODIFY	`security_amount`       DECIMAL(11, 2)   NOT NULL DEFAULT 0.00,
MODIFY	`booking_type`          TINYINT(1)       NOT NULL DEFAULT 0,
MODIFY	`private`               TINYINT(1)       NOT NULL DEFAULT 0,
MODIFY	`categories`            VARCHAR(255)     DEFAULT NULL,
MODIFY	`owner_id`              INT(11)          NOT NULL DEFAULT 0,
MODIFY	`checkin_time`          VARCHAR(5)       DEFAULT NULL,
MODIFY	`checkin_time_to`       VARCHAR(5)       DEFAULT NULL,
MODIFY	`checkin_fees`          TEXT             DEFAULT NULL,
MODIFY	`checkout_time`         VARCHAR(5)       DEFAULT NULL,
MODIFY	`checkout_fees`         TEXT             DEFAULT NULL,
MODIFY	`rooms`                 TEXT             DEFAULT NULL,
MODIFY	`guest_types`           TEXT             DEFAULT NULL,
MODIFY	`approved`              TINYINT(1)       NULL DEFAULT 1,
MODIFY	`ordering`              INT(11)          NOT NULL DEFAULT 0,
MODIFY  `state`                 TINYINT(1)       NOT NULL DEFAULT 1,
MODIFY	`checked_out`           INT(11)          DEFAULT NULL,
MODIFY	`checked_out_time`      DATETIME         DEFAULT NULL,
MODIFY	`created_by`            INT(11)          NOT NULL DEFAULT 0,
MODIFY	`created_at`            DATETIME         DEFAULT NULL,
MODIFY	`updated_by`            INT(11)          NOT NULL DEFAULT 0,
MODIFY	`updated_at`            DATETIME         DEFAULT NULL,
MODIFY	`version`               INT(11)          NOT NULL DEFAULT 1;
UPDATE `#__knowres_property` SET `created_at` = NULL WHERE created_at = '0000-00-00 00:00:00';
UPDATE `#__knowres_property` SET `updated_at` = NULL WHERE updated_at = '0000-00-00 00:00:00';

ALTER TABLE `#__knowres_property_feature`
MODIFY	`generic`          VARCHAR(50)      DEFAULT NULL,
MODIFY	`room_type`        TEXT             DEFAULT NULL,
MODIFY	`filter`           TINYINT(1)       NOT NULL DEFAULT 0,
MODIFY	`ordering`         INT(11)          NOT NULL DEFAULT 0,
MODIFY  `state`            TINYINT(1)       NOT NULL DEFAULT 1,
MODIFY	`checked_out`      INT(11)          DEFAULT NULL,
MODIFY	`checked_out_time` DATETIME         DEFAULT NULL,
MODIFY	`created_by`       INT(11)          NOT NULL DEFAULT 0,
MODIFY	`created_at`       DATETIME         DEFAULT NULL,
MODIFY	`updated_by`       INT(11)          NOT NULL DEFAULT 0,
MODIFY	`updated_at`       DATETIME         DEFAULT NULL,
MODIFY	`version`          INT(11)          NOT NULL DEFAULT 1;
UPDATE `#__knowres_property_feature` SET `created_at` = NULL WHERE created_at = '0000-00-00 00:00:00';
UPDATE `#__knowres_property_feature` SET `updated_at` = NULL WHERE updated_at = '0000-00-00 00:00:00';

ALTER TABLE `#__knowres_property_field`
MODIFY	`required`         TINYINT(1)       NOT NULL DEFAULT 0,
MODIFY	`format`           TINYINT(1)       NOT NULL DEFAULT 0,
MODIFY	`special`          TINYINT(1)       NOT NULL DEFAULT 0,
MODIFY	`ordering`         INT(11)          NOT NULL DEFAULT 0,
MODIFY  `state`            TINYINT(1)       NOT NULL DEFAULT 1,
MODIFY	`checked_out`      INT(11)          DEFAULT NULL,
MODIFY	`checked_out_time` DATETIME         DEFAULT NULL,
MODIFY	`created_by`       INT(11)          NOT NULL DEFAULT 0,
MODIFY	`created_at`       DATETIME         DEFAULT NULL,
MODIFY	`updated_by`       INT(11)          NOT NULL DEFAULT 0,
MODIFY	`updated_at`       DATETIME         DEFAULT NULL,
MODIFY	`version`          INT(11)          NOT NULL DEFAULT 1;
UPDATE `#__knowres_property_field` SET `created_at` = NULL WHERE created_at = '0000-00-00 00:00:00';
UPDATE `#__knowres_property_field` SET `updated_at` = NULL WHERE updated_at = '0000-00-00 00:00:00';

ALTER TABLE `#__knowres_property_ical`
MODIFY	`property_id`      INT(11)          NOT NULL DEFAULT 0,
MODIFY	`service_id`       INT(11)          NOT NULL DEFAULT 0,
MODIFY	`name`             VARCHAR(255)     DEFAULT NULL,
MODIFY	`link`             TEXT             DEFAULT NULL,
MODIFY	`icsdata`          TEXT             DEFAULT NULL,
MODIFY	`last_update`      DATETIME         DEFAULT NULL,
MODIFY  `state`            TINYINT(1)       NOT NULL DEFAULT 1,
MODIFY	`checked_out`      INT(11)          DEFAULT NULL,
MODIFY	`checked_out_time` DATETIME         DEFAULT NULL,
MODIFY	`created_by`       INT(11)          NOT NULL DEFAULT 0,
MODIFY	`created_at`       DATETIME         DEFAULT NULL,
MODIFY	`updated_by`       INT(11)          NOT NULL DEFAULT 0,
MODIFY	`updated_at`       DATETIME         DEFAULT NULL,
MODIFY	`version`          INT(11)          NOT NULL DEFAULT 1;
UPDATE `#__knowres_property_ical` SET `created_at` = NULL WHERE created_at = '0000-00-00 00:00:00';
UPDATE `#__knowres_property_ical` SET `updated_at` = NULL WHERE updated_at = '0000-00-00 00:00:00';

ALTER TABLE `#__knowres_property_option`
MODIFY	`property_id`      INT(11)          NOT NULL DEFAULT 0,
MODIFY	`yesno`            TINYINT(1)       NOT NULL DEFAULT 0,
MODIFY	`ordering`         INT(11)          NOT NULL DEFAULT 0,
MODIFY  `state`            TINYINT(1)       NOT NULL DEFAULT 1,
MODIFY	`checked_out`      INT(11)          DEFAULT NULL,
MODIFY	`checked_out_time` DATETIME         DEFAULT NULL,
MODIFY	`created_by`       INT(11)          NOT NULL DEFAULT 0,
MODIFY	`created_at`       DATETIME         DEFAULT NULL,
MODIFY	`updated_by`       INT(11)          NOT NULL DEFAULT 0,
MODIFY	`updated_at`       DATETIME         DEFAULT NULL,
MODIFY	`version`          INT(11)          NOT NULL DEFAULT 1;
UPDATE `#__knowres_property_option` SET `created_at` = NULL WHERE created_at = '0000-00-00 00:00:00';
UPDATE `#__knowres_property_option` SET `updated_at` = NULL WHERE updated_at = '0000-00-00 00:00:00';

ALTER TABLE `#__knowres_property_room`
MODIFY	`property_id`      INT(11)          NOT NULL DEFAULT 0,
MODIFY	`generic`          VARCHAR(50)      DEFAULT NULL,
MODIFY	`features`         TEXT             DEFAULT NULL,
MODIFY	`ordering`         INT(11)          NOT NULL DEFAULT 0,
MODIFY  `state`            TINYINT(1)       NOT NULL DEFAULT 1,
MODIFY	`checked_out`      INT(11)          DEFAULT NULL,
MODIFY	`checked_out_time` DATETIME         DEFAULT NULL,
MODIFY	`created_by`       INT(11)          NOT NULL DEFAULT 0,
MODIFY	`created_at`       DATETIME         DEFAULT NULL,
MODIFY	`updated_by`       INT(11)          NOT NULL DEFAULT 0,
MODIFY	`updated_at`       DATETIME         DEFAULT NULL,
MODIFY	`version`          INT(11)          NOT NULL DEFAULT 1;
UPDATE `#__knowres_property_room` SET `created_at` = NULL WHERE created_at = '0000-00-00 00:00:00';
UPDATE `#__knowres_property_room` SET `updated_at` = NULL WHERE updated_at = '0000-00-00 00:00:00';

ALTER TABLE `#__knowres_property_setting`
MODIFY	`property_id` INT(11)          NOT NULL DEFAULT 0,
MODIFY	`akey`        VARCHAR(255)     DEFAULT NULL,
MODIFY	`value`       VARCHAR(255)     DEFAULT NULL,
MODIFY	`created_by`  INT(11)          NOT NULL DEFAULT 0,
MODIFY	`created_at`  DATETIME         DEFAULT NULL,
MODIFY	`updated_by`  INT(11)          NOT NULL DEFAULT 0,
MODIFY	`updated_at`  DATETIME         DEFAULT NULL,
MODIFY	`version`     INT(11)          NOT NULL DEFAULT 1;
UPDATE `#__knowres_property_setting` SET `created_at` = NULL WHERE created_at = '0000-00-00 00:00:00';
UPDATE `#__knowres_property_setting` SET `updated_at` = NULL WHERE updated_at = '0000-00-00 00:00:00';

ALTER TABLE `#__knowres_rate`
MODIFY	`property_id`      INT(11)          NOT NULL DEFAULT 0,
MODIFY	`valid_from`       DATE             DEFAULT NULL,
MODIFY	`valid_to`         DATE             DEFAULT NULL,
MODIFY	`rate`             DECIMAL(11, 2)   NOT NULL DEFAULT 0.00,
MODIFY	`min_nights`       INT(3)           NOT NULL DEFAULT 0,
MODIFY	`max_nights`       INT(3)           NOT NULL DEFAULT 0,
MODIFY	`min_guests`       INT(3)           NOT NULL DEFAULT 0,
MODIFY	`max_guests`       INT(3)           NOT NULL DEFAULT 0,
MODIFY	`ignore_pppn`      TINYINT(1)       NOT NULL DEFAULT 0,
MODIFY	`start_day`        TINYINT(2)       NULL DEFAULT 7,
MODIFY	`more_guests`      TEXT             DEFAULT NULL,
MODIFY  `state`            TINYINT(1)       NOT NULL DEFAULT 1,
MODIFY	`checked_out`      INT(11)          DEFAULT NULL,
MODIFY	`checked_out_time` DATETIME         DEFAULT NULL,
MODIFY	`created_by`       INT(11)          NOT NULL DEFAULT 0,
MODIFY	`created_at`       DATETIME         DEFAULT NULL,
MODIFY	`updated_by`       INT(11)          NOT NULL DEFAULT 0,
MODIFY	`updated_at`       DATETIME         DEFAULT NULL,
MODIFY	`version`          INT(11)          NOT NULL DEFAULT 1;
UPDATE `#__knowres_rate` SET `created_at` = NULL WHERE created_at = '0000-00-00 00:00:00';
UPDATE `#__knowres_rate` SET `updated_at` = NULL WHERE updated_at = '0000-00-00 00:00:00';

ALTER TABLE `#__knowres_rate_markup`
MODIFY	`property_id`      INT(11)          NOT NULL DEFAULT 0,
MODIFY	`net_markup`       DECIMAL(6, 2)    NOT NULL DEFAULT 0.00,
MODIFY	`valid_from`       DATE             DEFAULT NULL,
MODIFY	`valid_to`         DATE             DEFAULT NULL,
MODIFY  `state`            TINYINT(1)       NOT NULL DEFAULT 1,
MODIFY	`checked_out`      INT(11)          DEFAULT NULL,
MODIFY	`checked_out_time` DATETIME         DEFAULT NULL,
MODIFY	`created_by`       INT(11)          NOT NULL DEFAULT 0,
MODIFY	`created_at`       DATETIME         DEFAULT NULL,
MODIFY	`updated_by`       INT(11)          NOT NULL DEFAULT 0,
MODIFY	`updated_at`       DATETIME         DEFAULT NULL,
MODIFY	`version`          INT(11)          NOT NULL DEFAULT 1;
UPDATE `#__knowres_rate_markup` SET `created_at` = NULL WHERE created_at = '0000-00-00 00:00:00';
UPDATE `#__knowres_rate_markup` SET `updated_at` = NULL WHERE updated_at = '0000-00-00 00:00:00';

ALTER TABLE `#__knowres_referral`
MODIFY	`ordering`         INT(11)          NOT NULL DEFAULT 0,
MODIFY  `state`            TINYINT(1)       NOT NULL DEFAULT 1,
MODIFY	`checked_out`      INT(11)          DEFAULT NULL,
MODIFY	`checked_out_time` DATETIME         DEFAULT NULL,
MODIFY	`created_by`       INT(11)          NOT NULL DEFAULT 0,
MODIFY	`created_at`       DATETIME         DEFAULT NULL,
MODIFY	`updated_by`       INT(11)          NOT NULL DEFAULT 0,
MODIFY	`updated_at`       DATETIME         DEFAULT NULL,
MODIFY	`version`          INT(11)          NOT NULL DEFAULT 1;
UPDATE `#__knowres_referral` SET `created_at` = NULL WHERE created_at = '0000-00-00 00:00:00';
UPDATE `#__knowres_referral` SET `updated_at` = NULL WHERE updated_at = '0000-00-00 00:00:00';

ALTER TABLE `#__knowres_region`
MODIFY	`region_iso`       CHAR(2)          DEFAULT NULL,
MODIFY	`country_id`       INT(11)          NOT NULL DEFAULT 0,
MODIFY	`allow_property`   TINYINT(1)       NOT NULL DEFAULT 0,
MODIFY	`map_zoom`         INT(2)           NOT NULL DEFAULT 0,
MODIFY	`map_zoom_max`     INT(2)           NULL DEFAULT 20,
MODIFY	`code`             CHAR(2)          DEFAULT NULL,
MODIFY  `state`            TINYINT(1)       NOT NULL DEFAULT 1,
MODIFY	`checked_out`      INT(11)          DEFAULT NULL,
MODIFY	`checked_out_time` DATETIME         DEFAULT NULL,
MODIFY	`created_by`       INT(11)          NOT NULL DEFAULT 0,
MODIFY	`created_at`       DATETIME         DEFAULT NULL,
MODIFY	`updated_by`       INT(11)          NOT NULL DEFAULT 0,
MODIFY	`updated_at`       DATETIME         DEFAULT NULL,
MODIFY	`version`          INT(11)          NOT NULL DEFAULT 1;
UPDATE `#__knowres_region` SET `created_at` = NULL WHERE created_at = '0000-00-00 00:00:00';
UPDATE `#__knowres_region` SET `updated_at` = NULL WHERE updated_at = '0000-00-00 00:00:00';

ALTER TABLE `#__knowres_review`
MODIFY	`contract_id`      INT(11)          NOT NULL DEFAULT 0,
MODIFY	`property_id`      INT(11)          NOT NULL DEFAULT 0,
MODIFY	`review_date`      DATE             DEFAULT NULL,
MODIFY	`rating`           FLOAT(3, 2)      NOT NULL DEFAULT 0,
MODIFY	`title`            VARCHAR(500)     DEFAULT NULL,
MODIFY	`review`           MEDIUMTEXT       NULL,
MODIFY	`rating1`          TINYINT(1)       NOT NULL DEFAULT 0,
MODIFY	`rating2`          TINYINT(1)       NOT NULL DEFAULT 0,
MODIFY	`rating3`          TINYINT(1)       NOT NULL DEFAULT 0,
MODIFY	`rating4`          TINYINT(1)       NOT NULL DEFAULT 0,
MODIFY	`rating5`          TINYINT(1)       NOT NULL DEFAULT 0,
MODIFY	`rating6`          TINYINT(1)       NOT NULL DEFAULT 0,
MODIFY	`guest_name`       VARCHAR(255)     DEFAULT NULL,
MODIFY	`guest_location`   VARCHAR(255)     DEFAULT NULL,
MODIFY	`held`             TINYINT(1)       NOT NULL DEFAULT 0,
MODIFY	`approved`         TINYINT(1)       NOT NULL DEFAULT 0,
MODIFY  `state`            TINYINT(1)       NOT NULL DEFAULT 1,
MODIFY	`checked_out`      INT(11)          DEFAULT NULL,
MODIFY	`checked_out_time` DATETIME         DEFAULT NULL,
MODIFY	`created_by`       INT(11)          NOT NULL DEFAULT 0,
MODIFY	`created_at`       DATETIME         DEFAULT NULL,
MODIFY	`updated_by`       INT(11)          NOT NULL DEFAULT 0,
MODIFY	`updated_at`       DATETIME         DEFAULT NULL,
MODIFY	`version`          INT(11)          NOT NULL DEFAULT 1;
UPDATE `#__knowres_review` SET `created_at` = NULL WHERE created_at = '0000-00-00 00:00:00';
UPDATE `#__knowres_review` SET `updated_at` = NULL WHERE updated_at = '0000-00-00 00:00:00';

ALTER TABLE `#__knowres_room`
MODIFY  `state`            TINYINT(1)       NOT NULL DEFAULT 1,
MODIFY	`checked_out`      INT(11)          DEFAULT NULL,
MODIFY	`checked_out_time` DATETIME         DEFAULT NULL,
MODIFY	`created_by`       INT(11)          NOT NULL DEFAULT 0,
MODIFY	`created_at`       DATETIME         DEFAULT NULL,
MODIFY	`updated_by`       INT(11)          NOT NULL DEFAULT 0,
MODIFY	`updated_at`       DATETIME         DEFAULT NULL,
MODIFY	`version`          INT(11)          NOT NULL DEFAULT 1;
UPDATE `#__knowres_room` SET `created_at` = NULL WHERE created_at = '0000-00-00 00:00:00';
UPDATE `#__knowres_room` SET `updated_at` = NULL WHERE updated_at = '0000-00-00 00:00:00';

ALTER TABLE `#__knowres_season`
MODIFY	`cluster_id`       INT(11)          NOT NULL DEFAULT 0,
MODIFY	`valid_from`       DATE             DEFAULT NULL,
MODIFY	`valid_to`         DATE             DEFAULT NULL,
MODIFY	`minimum_nights`   INT(3)           NOT NULL DEFAULT 0,
MODIFY	`season`           VARCHAR(10)      DEFAULT NULL,
MODIFY  `state`            TINYINT(1)       NOT NULL DEFAULT 1,
MODIFY	`checked_out`      INT(11)          DEFAULT NULL,
MODIFY	`checked_out_time` DATETIME         DEFAULT NULL,
MODIFY	`created_by`       INT(11)          NOT NULL DEFAULT 0,
MODIFY	`created_at`       DATETIME         DEFAULT NULL,
MODIFY	`updated_by`       INT(11)          NOT NULL DEFAULT 0,
MODIFY  `updated_at`       DATETIME         DEFAULT NULL,
MODIFY	`version`          INT(11)          NOT NULL DEFAULT 1;
UPDATE `#__knowres_season` SET `created_at` = NULL WHERE created_at = '0000-00-00 00:00:00';
UPDATE `#__knowres_season` SET `updated_at` = NULL WHERE updated_at = '0000-00-00 00:00:00';

ALTER TABLE `#__knowres_service`
MODIFY	`name`             VARCHAR(255)     DEFAULT NULL,
MODIFY	`currency`         CHAR(3)          DEFAULT NULL,
MODIFY	`property_id`      INT(11)          NOT NULL DEFAULT 0,
MODIFY	`agency_id`        INT(11)          NOT NULL DEFAULT 0,
MODIFY	`plugin`           VARCHAR(255)     DEFAULT NULL,
MODIFY	`type`             VARCHAR(2)       DEFAULT NULL,
MODIFY	`parameters`       TEXT             DEFAULT NULL,
MODIFY	`ordering`         INT(11)          NOT NULL DEFAULT 0,
MODIFY  `state`            TINYINT(1)       NOT NULL DEFAULT 1,
MODIFY	`checked_out`      INT(11)          DEFAULT NULL,
MODIFY	`checked_out_time` DATETIME         DEFAULT NULL,
MODIFY	`created_by`       INT(11)          NOT NULL DEFAULT 0,
MODIFY	`created_at`       DATETIME         DEFAULT NULL,
MODIFY	`updated_by`       INT(11)          NOT NULL DEFAULT 0,
MODIFY	`updated_at`       DATETIME         DEFAULT NULL,
MODIFY	`version`          INT(11)          NOT NULL DEFAULT 1;
UPDATE `#__knowres_service` SET `created_at` = NULL WHERE created_at = '0000-00-00 00:00:00';
UPDATE `#__knowres_service` SET `updated_at` = NULL WHERE updated_at = '0000-00-00 00:00:00';

ALTER TABLE `#__knowres_service_log`
MODIFY	`success`     TINYINT(1)       NOT NULL DEFAULT 0,
MODIFY	`service_id`  INT(11)          NOT NULL DEFAULT 0,
MODIFY	`queue_id`    INT(11)          NOT NULL DEFAULT 0,
MODIFY	`contract_id` INT(11)          NOT NULL DEFAULT 0,
MODIFY	`property_id` INT(11)          NOT NULL DEFAULT 0,
MODIFY	`foreign_key` VARCHAR(255)     DEFAULT NULL,
MODIFY	`method`      VARCHAR(255)     DEFAULT NULL,
MODIFY	`errors`      MEDIUMTEXT       NULL,
MODIFY	`request`     MEDIUMTEXT       NULL,
MODIFY	`response`    MEDIUMTEXT       NULL,
MODIFY	`subject`     MEDIUMTEXT       NULL,
MODIFY	`reply_to`    MEDIUMTEXT       NULL,
MODIFY	`created_at`  DATETIME         DEFAULT NULL;
UPDATE `#__knowres_service_log` SET `created_at` = NULL WHERE created_at = '0000-00-00 00:00:00';

ALTER TABLE `#__knowres_service_queue`
MODIFY	`service_id`       INT(11)          NOT NULL DEFAULT 0,
MODIFY	`foreign_key`      VARCHAR(255)     DEFAULT NULL,
MODIFY	`contract_id`      INT(11)          NOT NULL DEFAULT 0,
MODIFY	`agent_id`         INT(11)          NOT NULL DEFAULT 0,
MODIFY	`property_id`      INT(11)          NOT NULL DEFAULT 0,
MODIFY	`arrival`          DATE             DEFAULT NULL,
MODIFY	`departure`        DATE             DEFAULT NULL,
MODIFY	`availability`     TINYINT(1)       NOT NULL DEFAULT 0,
MODIFY	`actioned`         TINYINT(1)       NOT NULL DEFAULT 0,
MODIFY	`method`           VARCHAR(255)     DEFAULT NULL,
MODIFY  `state`            TINYINT(1)       NOT NULL DEFAULT 1,
MODIFY	`checked_out`      INT(11)          DEFAULT NULL,
MODIFY	`checked_out_time` DATETIME         DEFAULT NULL,
MODIFY	`created_by`       INT(11)          NOT NULL DEFAULT 0,
MODIFY	`created_at`       DATETIME         DEFAULT NULL,
MODIFY	`updated_by`       INT(11)          NOT NULL DEFAULT 0,
MODIFY	`updated_at`       DATETIME         DEFAULT NULL,
MODIFY	`version`          INT(11)          NOT NULL DEFAULT 1;
UPDATE `#__knowres_service_queue` SET `created_at` = NULL WHERE created_at = '0000-00-00 00:00:00';
UPDATE `#__knowres_service_queue` SET `updated_at` = NULL WHERE updated_at = '0000-00-00 00:00:00';

ALTER TABLE `#__knowres_service_xref`
MODIFY	`service_id`       INT(11)          NOT NULL DEFAULT 0,
MODIFY	`property_id`      INT(11)          NOT NULL DEFAULT 0,
MODIFY	`contract_id`      INT(11)          NOT NULL DEFAULT 0,
MODIFY	`payment_id`       INT(11)          NOT NULL DEFAULT 0,
MODIFY	`guest_id`         INT(11)          NOT NULL DEFAULT 0,
MODIFY	`owner_id`         INT(11)          NOT NULL DEFAULT 0,
MODIFY	`invoice_number`   VARCHAR(255)     DEFAULT NULL,
MODIFY	`foreign_key`      VARCHAR(255)     DEFAULT NULL,
MODIFY	`cancelled`        TINYINT(1)       NOT NULL DEFAULT 0,
MODIFY	`new`              TINYINT(1)       NOT NULL DEFAULT 0,
MODIFY	`sell`             TINYINT(1)       NULL DEFAULT 1,
MODIFY  `state`            TINYINT(1)       NOT NULL DEFAULT 1,
MODIFY	`checked_out`      INT(11)          DEFAULT NULL,
MODIFY	`checked_out_time` DATETIME         DEFAULT NULL,
MODIFY	`created_by`       INT(11)          NOT NULL DEFAULT 0,
MODIFY	`created_at`       DATETIME         DEFAULT NULL,
MODIFY	`updated_by`       INT(11)          NOT NULL DEFAULT 0,
MODIFY	`updated_at`       DATETIME         DEFAULT NULL,
MODIFY	`version`          INT(11)          NOT NULL DEFAULT 1;
UPDATE `#__knowres_service_xref` SET `created_at` = NULL WHERE created_at = '0000-00-00 00:00:00';
UPDATE `#__knowres_service_xref` SET `updated_at` = NULL WHERE updated_at = '0000-00-00 00:00:00';

ALTER TABLE `#__knowres_tax`
MODIFY	`country_id`       INT(11)          NOT NULL DEFAULT 0,
MODIFY	`region_id`        INT(11)          NOT NULL DEFAULT 0,
MODIFY	`town_id`          INT(11)          NOT NULL DEFAULT 0,
MODIFY  `state`            TINYINT(1)       NOT NULL DEFAULT 1,
MODIFY	`checked_out`      INT(11)          DEFAULT NULL,
MODIFY	`checked_out_time` DATETIME         DEFAULT NULL,
MODIFY	`created_by`       INT(11)          NOT NULL DEFAULT 0,
MODIFY	`created_at`       DATETIME         DEFAULT NULL,
MODIFY	`updated_by`       INT(11)          NOT NULL DEFAULT 0,
MODIFY	`updated_at`       DATETIME         DEFAULT NULL,
MODIFY	`version`          INT(11)          NOT NULL DEFAULT 1;
UPDATE `#__knowres_tax` SET `created_at` = NULL WHERE created_at = '0000-00-00 00:00:00';
UPDATE `#__knowres_tax` SET `updated_at` = NULL WHERE updated_at = '0000-00-00 00:00:00';

ALTER TABLE `#__knowres_tax_rate`
MODIFY	`tax_id`           INT(11)          NOT NULL DEFAULT 0,
MODIFY  `tax_type`         VARCHAR(10)      DEFAULT NULL,
MODIFY  `gross`            TINYINT(1)       NOT NULL DEFAULT 0,
MODIFY  `pay_arrival`      TINYINT(1)       NOT NULL DEFAULT 0,
MODIFY	`code`             VARCHAR(30)      DEFAULT NULL,
MODIFY  `service`          VARCHAR(255)     DEFAULT NULL,
MODIFY  `agent`            VARCHAR(255)     DEFAULT NULL,
MODIFY	`rate`             DECIMAL(6, 3)    NOT NULL DEFAULT 0.000,
MODIFY	`fixed`            TINYINT(1)       NOT NULL DEFAULT 0,
MODIFY	`basis`            TINYINT(1)       NOT NULL DEFAULT 0,
MODIFY	`max_nights`       TINYINT(2)       NOT NULL DEFAULT 0,
MODIFY  `reduced_rate`     DECIMAL(6,3)     NOT NULL DEFAULT 0.000,
MODIFY	`applicable_age`   TINYINT(2)       NOT NULL DEFAULT 0,
MODIFY	`per_night`        TINYINT(1)       NOT NULL DEFAULT 0,
MODIFY	`valid_from`       DATE             DEFAULT NULL,
MODIFY  `taxrate_id`       INT(11)            NOT NULL DEFAULT 0,
MODIFY	`ordering`         INT(11)          NOT NULL DEFAULT 0,
MODIFY  `state`            TINYINT(1)       NOT NULL DEFAULT 1,
MODIFY	`checked_out`      INT(11)          DEFAULT NULL,
MODIFY	`checked_out_time` DATETIME         DEFAULT NULL,
MODIFY	`created_by`       INT(11)          NOT NULL DEFAULT 0,
MODIFY	`created_at`       DATETIME         DEFAULT NULL,
MODIFY	`updated_by`       INT(11)          NOT NULL DEFAULT 0,
MODIFY	`updated_at`       DATETIME         DEFAULT NULL,
MODIFY	`version`          INT(11)          NOT NULL DEFAULT 1;
UPDATE `#__knowres_tax_rate` SET `created_at` = NULL WHERE created_at = '0000-00-00 00:00:00';
UPDATE `#__knowres_tax_rate` SET `updated_at` = NULL WHERE updated_at = '0000-00-00 00:00:00';

ALTER TABLE `#__knowres_town`
MODIFY	`country_id`       INT(11)          NOT NULL DEFAULT 0,
MODIFY	`region_id`        INT(11)          NOT NULL DEFAULT 0,
MODIFY	`lat`              FLOAT(10, 6)     NOT NULL DEFAULT 0,
MODIFY	`lng`              FLOAT(10, 6)     NOT NULL DEFAULT 0,
MODIFY	`allow_property`   TINYINT(1)       NOT NULL DEFAULT 0,
MODIFY	`timezone`         VARCHAR(100)     DEFAULT NULL,
MODIFY	`currency`         CHAR(3)          DEFAULT NULL,
MODIFY  `state`            TINYINT(1)       NOT NULL DEFAULT 1,
MODIFY	`checked_out`      INT(11)          DEFAULT NULL,
MODIFY	`checked_out_time` DATETIME         DEFAULT NULL,
MODIFY	`created_by`       INT(11)          NOT NULL DEFAULT 0,
MODIFY	`created_at`       DATETIME         DEFAULT NULL,
MODIFY	`updated_by`       INT(11)          NOT NULL DEFAULT 0,
MODIFY	`updated_at`       DATETIME         DEFAULT NULL,
MODIFY	`version`          INT(11)          NOT NULL DEFAULT 1;
UPDATE `#__knowres_town` SET `created_at` = NULL WHERE created_at = '0000-00-00 00:00:00';
UPDATE `#__knowres_town` SET `updated_at` = NULL WHERE updated_at = '0000-00-00 00:00:00';

ALTER TABLE `#__knowres_translation`
MODIFY	`item`             CHAR(50)         DEFAULT NULL,
MODIFY	`item_id`          INT(11) UNSIGNED NOT NULL DEFAULT 0,
MODIFY	`field`            VARCHAR(255)     DEFAULT NULL,
MODIFY	`text`             MEDIUMTEXT       NULL,
MODIFY	`status`           TINYINT(1)       NOT NULL DEFAULT 0,
MODIFY  `state`            TINYINT(1)       NOT NULL DEFAULT 1,
MODIFY	`checked_out`      INT(11)          DEFAULT NULL,
MODIFY	`checked_out_time` DATETIME         DEFAULT NULL,
MODIFY	`created_by`       INT(11)          NOT NULL DEFAULT 0,
MODIFY	`created_at`       DATETIME         DEFAULT NULL,
MODIFY	`updated_by`       INT(11)          NOT NULL DEFAULT 0,
MODIFY	`updated_at`       DATETIME         DEFAULT NULL,
MODIFY	`language`         CHAR(7)          DEFAULT NULL,
MODIFY	`version`          INT(11)          NOT NULL DEFAULT 1;
UPDATE `#__knowres_translation` SET `created_at` = NULL WHERE created_at = '0000-00-00 00:00:00';
UPDATE `#__knowres_translation` SET `updated_at` = NULL WHERE updated_at = '0000-00-00 00:00:00';

ALTER TABLE `#__knowres_type`
MODIFY	`ordering`         INT(11)          NOT NULL DEFAULT 0,
MODIFY  `state`            TINYINT(1)       NOT NULL DEFAULT 1,
MODIFY	`checked_out`      INT(11)          DEFAULT NULL,
MODIFY	`checked_out_time` DATETIME         DEFAULT NULL,
MODIFY	`created_by`       INT(11)          NOT NULL DEFAULT 0,
MODIFY	`created_at`       DATETIME         DEFAULT NULL,
MODIFY	`updated_by`       INT(11)          NOT NULL DEFAULT 0,
MODIFY	`updated_at`       DATETIME         DEFAULT NULL,
MODIFY	`version`          INT(11)          NOT NULL DEFAULT 1;
UPDATE `#__knowres_type` SET `created_at` = NULL WHERE created_at = '0000-00-00 00:00:00';
UPDATE `#__knowres_type` SET `updated_at` = NULL WHERE updated_at = '0000-00-00 00:00:00';