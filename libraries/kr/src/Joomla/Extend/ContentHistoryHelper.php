<?php
/**
 * @package     Joomla.Administrator
 * @subpackage  com_contenthistory
 * @copyright   2005 - 2016 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

namespace HighlandVision\KR\Joomla\Extend;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Logger;
use HighlandVision\KR\Translations;
use JetBrains\PhpStorm\Pure;
use Joomla\CMS\Factory;
use Joomla\CMS\Filesystem\File;
use Joomla\CMS\Filesystem\Folder;
use Joomla\CMS\Filesystem\Path;
use Joomla\CMS\Table\ContentType;
use RuntimeException;
use stdClass;

//TODO-v4.4 Will need tested at some point but not used live

/**
 * Content history extends base via KR plugin.
 *
 * @since  3.2
 */
class ContentHistoryHelper extends \Joomla\Component\Contenthistory\Administrator\Helper\ContenthistoryHelper
{
	/**
	 * Method to get the XML form file for this component. Used to get translated field names for history preview.
	 *
	 * @param   ContentType  $typesTable  Table object with content history options.
	 *
	 * @since   3.2
	 * @return  bool|string  JModel object if successful, false if no model found.
	 */
	public static function getFormFile(ContentType $typesTable): bool|string
	{
		// First, see if we have a file name in the $typesTable
		$options = json_decode($typesTable->content_history_options);

		if (is_object($options) && isset($options->formFile) && File::exists(JPATH_ROOT . '/' . $options->formFile))
		{
			$result = JPATH_ROOT . '/' . $options->formFile;
		}
		else
		{
			$aliasArray = explode('.', $typesTable->type_alias);
			if (count($aliasArray) == 2)
			{
				$component = ($aliasArray[1] == 'category') ? 'com_categories' : $aliasArray[0];
				$path      = Folder::makeSafe(JPATH_ADMINISTRATOR . '/components/' . $component . '/models/forms/');
				$file      = File::makeSafe($aliasArray[1] . '.xml');
				$result    = File::exists($path . $file) ? $path . $file : false;
			}
		}

		return $result;
	}

	/**
	 * Method to get field labels for the fields in the JSON-encoded object.
	 * First we see if we can find translatable labels for the fields in the object.
	 * We translate any we can find and return an array in the format object->name => label.
	 *
	 * @param   stdClass     $object      Standard class object in the format name->value.
	 * @param   ContentType  $typesTable  Table object with content history options.
	 *
	 * @since   3.2
	 * @return  stdClass  Contains two associative arrays.
	 *                    $formValues->labels in the format name => label (for example, 'id' => 'Article ID').
	 *                    $formValues->values in the format name => value (for example, 'state' => 'Published').
	 *                    This translates the text from the selected option in the form.
	 */
	public static function getFormValues(stdClass $object, ContentType $typesTable): stdClass
	{
		$labels              = [];
		$values              = [];
		$expandedObjectArray = static::createObjectArray($object);
		static::loadLanguageFiles($typesTable->type_alias);

		$formFile = static::getFormFile($typesTable);
		if ($formFile)
		{
			$xml = simplexml_load_file($formFile);
			if ($xml)
			{
				// Get all the labels from the form
				$fieldArray = $xml->xpath('//field');
				$fieldArray = array_merge($fieldArray, $xml->xpath('//fields'));
				foreach ($fieldArray as $field)
				{
					$label = (string) $field->attributes()->label;
					if ($label)
					{
						$labels[(string) $field->attributes()->name] = KrMethods::plain($label);
					}
				}

				// Get values for any special fields
				$listFieldArray = $xml->xpath('//field[@type="list" or @type="radio" or @type="translation"]');
				foreach ($listFieldArray as $field)
				{
					$name = (string) $field->attributes()->name;
					if ($field->attributes()->type == 'translation')
					{
						$Translations = new Translations();
						$value        = $Translations->getText((string) $field->attributes()->table, (int) $object->id,
							(string) $field->attributes()->field);

						if ($value)
						{
							$tmp = new stdClass();
							foreach ($object as $k => $v)
							{
								$tmp->$k = $v;
								if ($k == "id")
								{
									$tmp->$name = $value;
								}
							}

							$object = $tmp;
						}
					}
					else if (isset($expandedObjectArray[$name]))
					{
						if (is_array($expandedObjectArray[$name]))
						{
							$allValues = [];
							foreach ($expandedObjectArray[$name] as $me)
							{
								$optionFieldArray = $field->xpath('option[@value="' . $me . '"]');
								if (isset($optionFieldArray[0]))
								{
									$valueText   = trim((string) $optionFieldArray[0]);
									$allValues[] = KrMethods::plain($valueText);
								}
								else
								{
									$allValues[] = $me;
								}
							}

							$values[(string) $field->attributes()->name] = implode(", ", $allValues);
						}
						else
						{
							$optionFieldArray = $field->xpath('option[@value="' . $expandedObjectArray[$name] . '"]');
							if (isset($optionFieldArray[0]))
							{
								$valueText                                   = trim((string) $optionFieldArray[0]);
								$values[(string) $field->attributes()->name] = KrMethods::plain($valueText);
							}
						}
					}
				}
			}
		}

		$result         = new stdClass();
		$result->labels = $labels;
		$result->values = $values;
		$result->object = $object;

		return $result;
	}

	/**
	 * Method to query the database using values from lookup objects.
	 *
	 * @param   stdClass  $lookup  The std object with the values needed to do the query.
	 * @param   mixed     $value   The value used to find the matching title or name. Typically, the id.
	 *
	 * @throws RuntimeException
	 * @since  3.2
	 * @return mixed  Value from database (for example, name or title) on success, false on failure.
	 */
	public static function getLookupValue(stdClass $lookup, $value): mixed
	{
		$result = false;

		if (isset($lookup->sourceColumn) && isset($lookup->targetTable) && isset($lookup->targetColumn)
			&& isset($lookup->displayColumn))
		{
			$db    = KrFactory::getDatabase();
			$query = $db->getQuery(true);
			$query->select($db->qn($lookup->displayColumn))
			      ->from($db->qn($lookup->targetTable))
			      ->where($db->qn($lookup->targetColumn) . ' = ' . $db->q($value));
			$db->setQuery($query);

			try
			{
				$result = $db->loadResult();
			}
			catch (Exception $e)
			{
				Logger::logMe($e->getMessage());
				return false;
			}
		}

		return $result;
	}

	/**
	 * Method to remove fields from the object based on values entered in the #__content_types table.
	 *
	 * @param   stdClass     $object     Object to be passed to view layout file.
	 * @param   ContentType  $typeTable  Table object with content history options.
	 *
	 * @since  3.2
	 * @return stdClass  Object with hidden fields removed.
	 */
	public static function hideFields(stdClass $object, ContentType $typeTable): stdClass
	{
		$options = json_decode($typeTable->content_history_options);
		if ($options)
		{
			if (isset($options->hideFields) && is_array($options->hideFields))
			{
				foreach ($options->hideFields as $field)
				{
					unset($object->$field);
				}
			}
		}

		return $object;
	}

	/**
	 * Method to load the language files for the component whose history is being viewed.
	 *
	 * @param   string  $typeAlias  The type alias, for example 'com_content.article'.
	 *
	 * @since   3.2
	 * @return  void
	 */
	public static function loadLanguageFiles(string $typeAlias): void
	{
		$aliasArray = explode('.', $typeAlias);

		if (is_array($aliasArray) && count($aliasArray) == 2)
		{
			$component = ($aliasArray[1] == 'category') ? 'com_categories' : $aliasArray[0];
			$lang      = Factory::getLanguage();

			/**
			 * Loading language file from the administrator/language directory then
			 * loading language file from the administrator/components/extension/language directory
			 */
			$lang->load($component, JPATH_ADMINISTRATOR)
			|| $lang->load($component,
				Path::clean(JPATH_ADMINISTRATOR . '/components/' . $component));

			// Force loading of backend global language file
			$lang->load('joomla', Path::clean(JPATH_ADMINISTRATOR));
		}
	}

	/**
	 * Method to create object to pass to the layout. Format is as follows:
	 * field is std object with name, value.
	 * Value can be a std object with name, value pairs.
	 *
	 * @param ?stdClass   $object      The std object from the JSON string. Can be nested 1 level deep.
	 * @param   stdClass  $formValues  Standard class of label and value in an associative array.
	 *
	 * @since  3.2
	 * @return stdClass  Object with translated labels where available
	 */
	#[Pure] public static function mergeLabels(?stdClass $object, stdClass $formValues): stdClass
	{
		$result = new stdClass();

		if ($object === null)
		{
			return $result;
		}

		$labelsArray = $formValues->labels;
		$valuesArray = $formValues->values;

		foreach ($object as $name => $value)
		{
			$result->$name        = new stdClass();
			$result->$name->name  = $name;
			$result->$name->value = $valuesArray[$name] ?? $value;
			$result->$name->label = $labelsArray[$name] ?? $name;

			if (is_object($value))
			{
				$subObject = new stdClass();
				foreach ($value as $subName => $subValue)
				{
					$subObject->$subName        = new stdClass();
					$subObject->$subName->name  = $subName;
					$subObject->$subName->value = $valuesArray[$subName] ?? $subValue;
					$subObject->$subName->label = $labelsArray[$subName] ?? $subName;
					$result->$name->value       = $subObject;
				}
			}
		}

		return $result;
	}

	/**
	 * Method to process any lookup values found in the content_history_options column for this table.
	 * This allows category title and username to be displayed instead of the id column.
	 *
	 * @param   stdClass     $object      The std object from the JSON string. Can be nested 1 level deep.
	 * @param   ContentType  $typesTable  Table object loaded with data.
	 *
	 * @throws Exception
	 * @since  3.2
	 * @return stdClass  Object with lookup values inserted.
	 */
	public static function processLookupFields(stdClass $object, ContentType $typesTable): stdClass
	{
		$options = json_decode($typesTable->content_history_options);
		if ($options)
		{
			if (isset($options->displayLookup) && is_array($options->displayLookup))
			{
				foreach ($options->displayLookup as $lookup)
				{
					$sourceColumn = $lookup->sourceColumn ?? false;
					$sourceValue  = $object->$sourceColumn->value ?? false;

					if ($sourceColumn && $sourceValue)
					{
						if ($lookup->targetTable == 'layout')
						{
							$object->$sourceColumn->value = KrMethods::render('history.' . $sourceColumn, [
								'data' => $sourceValue
							]);
						}
						else if ($lookup->targetColumn == 'krtranslate')
						{
							$Translations = new Translations();

							if (is_numeric($sourceValue) && (int) $sourceValue)
							{
								$object->$sourceColumn->value = $Translations->getText($lookup->targetTable,
									$sourceValue, $lookup->displayColumn);
							}
							else if (is_array($sourceValue))
							{
								$values = [];
								foreach ($sourceValue as $s)
								{
									$values[] = $Translations->getText($lookup->targetTable, (int) $s,
										$lookup->displayColumn);
								}

								$object->$sourceColumn->value = implode(", ", $values);
							}
						}
						else
						{
							if (is_numeric($sourceValue) && (int) $sourceValue)
							{
								$object->$sourceColumn->value = static::getLookupValue($lookup, $sourceValue);
							}
							else if (is_array($sourceValue))
							{
								$values = [];
								foreach ($sourceValue as $s)
								{
									$values[] = static::getLookupValue($lookup, $s);
								}

								$object->$sourceColumn->value = implode(", ", $values);
							}
						}
					}
				}
			}
		}

		return $object;
	}
}
