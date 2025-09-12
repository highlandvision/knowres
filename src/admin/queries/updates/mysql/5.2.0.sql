# Placeholder file for database changes for version 5.2.0
# Delete all Beyond service xref rows
DELETE `#__knowres_service_xref`
FROM `#__knowres_service_xref`
         LEFT JOIN `#__knowres_service` ON `#__knowres_service_xref`.service_id = `#__knowres_service`.id
WHERE `#__knowres_service`.plugin = "beyond";

DELETE
FROM `#__knowres_service`
WHERE plugin = "beyond";