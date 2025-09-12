# Placeholder file for database changes for version 4.0.0
DELETE FROM `#__knowres_property_setting` WHERE `akey` = 'manager_requiredfields_country';
DELETE FROM `#__knowres_property_setting` WHERE `akey` = 'manager_requiredfields_address2';
DELETE FROM `#__knowres_property_setting` WHERE `akey` = 'manager_requiredfields_email_2';
DELETE FROM `#__knowres_property_setting` WHERE `akey` = 'manager_requiredfields_email_3';
DELETE FROM `#__knowres_property_setting` WHERE `akey` = 'manager_requiredfields_telephone';
DELETE FROM `#__knowres_property_setting` WHERE `akey` = 'bookingform_requiredfields_country';
DELETE FROM `#__knowres_property_setting` WHERE `akey` = 'bookingform_requiredfields_address2';
DELETE FROM `#__knowres_property_setting` WHERE `akey` = 'bookingform_requiredfields_email_2';
DELETE FROM `#__knowres_property_setting` WHERE `akey` = 'bookingform_requiredfields_email_3';
DELETE FROM `#__knowres_property_setting` WHERE `akey` = 'bookingform_requiredfields_telephone';
DELETE FROM `#__knowres_property_setting` WHERE `akey` = 'guestdata_age_option';
DELETE FROM `#__knowres_property_setting` WHERE `akey` = 'guestdata_document_age';
DELETE FROM `#__knowres_property_setting` WHERE `akey` = 'tax_type_1';
DELETE FROM `#__knowres_property_setting` WHERE `akey` = 'tax_type_2';
DELETE FROM `#__knowres_property_setting` WHERE `akey` = 'tax_type_3';

# ALTER TABLE `#__knowres_guest` DROP COLUMN  `foreign_key`;
# ALTER TABLE `#__knowres_owner` DROP COLUMN  `foreign_key`;

# See other updated below after default values set
UPDATE `#__knowres_translation` SET `text` = REPLACE(`text`,'AGENTEMAIL','MANAGEREMAIL') WHERE `item` = "emailtemplate";
UPDATE `#__knowres_translation` SET `text` = REPLACE(`text`,'AGENTNAME','MANAGERNAME') WHERE `item` = "emailtemplate";
UPDATE `#__knowres_translation` SET `text` = REPLACE(`text`,'BOOKINGAGENTNAME','AGENTNAME') WHERE `item` = "emailtemplate";
UPDATE `#__knowres_translation` SET `text` = REPLACE(`text`,'LINKGUESTARRIVAL','BUTTONARRIVAL') WHERE `item` = "emailtemplate";
UPDATE `#__knowres_translation` SET `text` = REPLACE(`text`,'LINKGUESTDASHBOARD','BUTTONDASHBOARD') WHERE `item` = "emailtemplate";
UPDATE `#__knowres_translation` SET `text` = REPLACE(`text`,'LINKPAYNOW','BUTTONPAYNOW') WHERE `item` = "emailtemplate";
UPDATE `#__knowres_translation` SET `text` = REPLACE(`text`,'LINKREVIEW','BUTTONREVIEW') WHERE `item` = "emailtemplate";

UPDATE `#__knowres_property_setting` SET `value` = 'vrbo' WHERE `value` = 'ha' AND `akey` = 'security_changes';
UPDATE `#__knowres_property_setting` SET `value` = 'vrbo' WHERE `value` = 'ha' AND `akey` = 'service_changes';