<?php
/**
 * @package    Know Reservations
 * @subpackage Library
 * @copyright  Copyright (c) 2020, Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\KR;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use Joomla\CMS\Cache\Cache;
use stdClass;
use UnexpectedValueException;

/**
 * Translations model extension
 *
 * @since 1.0.0
 */
class Translations
{
	/** @var array Translations retrieved from cache */
	protected array $Translations = [];
	/** @var Cache Cache */
	protected Cache $cache;
	/** @var string Default site language code */
	protected string $default_language = '';
	/** @var string Current user language */
	protected string $language = '';

	/**
	 * Manage translations
	 *
	 * @param   string  $language  Language string
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	public function __construct(string $language = '')
	{
		if ($language)
		{
			$this->setLanguage($language);
		}
		else
		{
			$this->setLanguage(KrMethods::getLanguageTag());
		}

		$user = KrMethods::getUser();
		if ($user->guest)
		{
			$this->default_language = KrMethods::getDefaultLanguage('site');
		}
		else
		{
			$this->default_language = KrMethods::getDefaultLanguage();
		}

		$cache_options = [
			'cachebase'    => JPATH_ADMINISTRATOR . '/cache',
			'lifetime'     => 86400,
			'caching'      => true,
			'defaultgroup' => 'com_knowres_translations'
		];

		$this->cache = KrMethods::getCache($cache_options);
	}

	/**
	 * Get country name
	 *
	 * @param  ?int  $country_id  ID of country
	 *
	 * @since  1.0.0
	 * @return string
	 */
	public static function getCountryName(?int $country_id): string
	{
		if (!empty($country_id))
		{
			$Translations = new Translations();

			return $Translations->getText('country', $country_id);
		}

		return '';
	}

	/**
	 * Get value of translation string for an array of objects
	 *
	 * @param   array   $items  Array of objects
	 * @param   string  $item   Translation table name
	 * @param   string  $key    Object variable to be used as translation item_id
	 * @param   string  $field  Object variable to be used as translation field
	 * @param   string  $new    Name of variable to be added to object
	 * @param   bool    $sort   Sort $field by alpha
	 *
	 * @since  1.0.0
	 * @return array
	 */
	public function addTranslationToObject(array $items, string $item, string $key = 'id', string $field = 'name',
		string $new = 'name', bool $sort = true): array
	{
		if (is_countable($this->Translations))
		{
			if (!count($this->Translations) || !array_key_exists($item, $this->Translations))
			{
				$this->checkCache($item);
			}
		}

		foreach ($items as $i)
		{
			$i->$new = $this->setText($item, $i->$key, $field);
		}

		if ($sort)
		{
			usort($items, function ($a, $b) use (&$new) {
				return strcmp($a->{$new}, $b->{$new});
			});
		}

		return $items;
	}

	/**
	 * Clear cache for item
	 *
	 * @param   string  $item  Name of item
	 *
	 * @since  2.4.0
	 */
	public function cleanTranslationCache(string $item = ''): void
	{
		if ($item)
		{
			$this->cache->remove($item);
		}
		else
		{
			$this->cache->clean();
		}
	}

	/**
	 * Delete multiple translation strings
	 *
	 * @param   string  $item  Table name
	 * @param   array   $pks   Array of item ids for item
	 *
	 * @since  3.0.0
	 */
	public function deleteMultiple(string $item, array $pks): void
	{
		KrFactory::getListModel('Translations')->deleteMultipleItemId($item, $pks);
	}

	/**
	 * Delete any existing translation string
	 *
	 * @param   string  $item     Table name
	 * @param   int     $item_id  ID of the base item
	 *
	 * @throws UnexpectedValueException
	 * @since  1.0.0
	 */
	public function deleteText(string $item, int $item_id): void
	{
		self::deleteMultiple($item, array($item_id));
	}

	/**
	 * Get value of translation strings for an item / language
	 * Used when translation strings need to be sorted
	 *
	 * @param   array   $items  Database items list
	 * @param   string  $item   Table name
	 * @param   string  $field  Field name
	 * @param   bool    $sort   Sort by alpha
	 *
	 * @since  1.0.0
	 * @return array
	 */
	public function getArray(array $items, string $item, string $field, bool $sort = true): array
	{
		$values = [];
		if (is_countable($this->Translations))
		{
			if (!count($this->Translations) || !array_key_exists($item, $this->Translations))
			{
				$this->checkCache($item);
			}
		}

		$list = [];
		foreach ($items as $i)
		{
			$list[$i->id] = $this->setText($item, $i->id, $field);
		}

		if ($sort)
		{
			asort($list);
		}

		foreach ($list as $k => $v)
		{
			$values[$k] = $v;
		}

		return $values;
	}

	/**
	 * Get property name
	 *
	 * @param   int  $property_id  ID of property
	 *
	 * @throws Exception
	 * @since  1.0.0
	 * @return string
	 */
	public function getProperty(int $property_id): string
	{
		$property = KrFactory::getAdminModel('property')->getItem($property_id);
		if (empty($property->id))
		{
			Logger::logMe('Translations property does not exist for ID ' . $property_id);

			return '';
		}
		else
		{
			return $property->property_name;
		}
	}

	/**
	 * Get translation string
	 *
	 * @param   string  $item     Table name
	 * @param  ?int     $item_id  ID of the base item
	 * @param   string  $field    Name of the field (column)
	 *
	 * @since        1.0.0
	 * @return string
	 */
	public function getText(string $item, ?int $item_id, string $field = 'name'): string
	{
		if (is_countable($this->Translations))
		{
			if (!count($this->Translations) || !array_key_exists($item, $this->Translations))
			{
				$this->checkCache($item);
			}
		}

		return $this->setText($item, $item_id, $field);
	}

	/**
	 * Add or update default language string
	 *
	 * @param   string  $item          Table name
	 * @param   int     $item_id       ID of the base item
	 * @param   string  $field         Name of the field (column)
	 * @param   string  $text          The text
	 * @param   bool    $remove_cache  True to remove cache
	 * @param   string  $language      Language string
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	public function updateDefault(string $item, int $item_id, string $field, string $text, bool $remove_cache = true,
		string $language = '')
	{
		if (!$language)
		{
			$language = $this->language;
		}

		$row = KrFactory::getListModel('translations')->getIdText($item, $item_id, $field, $language);
		if (!is_null($row) && $row->id && $row->text == $text)
		{
			return true;
		}

		if (is_null($row) && !$text)
		{
			return true;
		}

		$data = new stdClass();
		if (is_null($row))
		{
			$data->id            = 0;
			$data->item          = $item;
			$data->item_id       = $item_id;
			$data->field         = $field;
			$data->text          = $text;
			$data->status        = 2;
			$data->state         = 1;
			$data->checked_out   = 0;
			$data->checkout_time = '0000-00-00 00:00:00';
			$data->created_by    = KrMethods::getUser()->id;
			$data->created_at    = TickTock::getTS();
			$data->created_by    = KrMethods::getUser()->id;
			$data->updated_at    = '0000-00-00 00:00:00';
			$data->updated_by    = 0;
			$data->language      = $language;
			$data->version       = 0;
			KrFactory::insert('translation', $data);
		}
		else
		{
			$data->id         = $row->id;
			$data->item       = $item;
			$data->item_id    = $item_id;
			$data->field      = $field;
			$data->text       = $text;
			$data->status     = 1;
			$data->updated_at = TickTock::getTS();
			$data->updated_by = KrMethods::getUser()->id;
			$data->language   = $language;
			KrFactory::update('translation', $data);
		}

		if ($remove_cache)
		{
			$this->cache->remove($item);
		}
	}

	/**
	 * Check if cache exists for table
	 *
	 * @param   string  $item  Item name to return
	 *
	 * @since  1.0.0
	 */
	protected function checkCache(string $item): void
	{
		$data = $this->cache->get($item);
		if ($data === false)
		{
			$this->setTranslations($item);
			$this->cache->store(Utility::encodeJson($this->Translations[$item]), $item);
		}
		else
		{
			if (!is_array($data))
			{
				$data = Utility::decodeJson($data, true);
			}

			$this->Translations[$item] = $data;
		}
	}

	/**
	 * Set translation language
	 *
	 * @param   string  $language  Language code
	 *
	 * @since  1.0.0
	 */
	protected function setLanguage(string $language): void
	{
		if (!$language)
		{
			$this->language = KrMethods::getLanguageTag();
		}
		else
		{
			$this->language = $language;
		}
	}

	/**
	 * Set translation text
	 *
	 * @param   string  $item     Table name
	 * @param  ?int     $item_id  ID of the base item
	 * @param   string  $field    Name of the field (column)
	 *
	 * @since  1.0.0
	 * @return string
	 */
	protected function setText(string $item, ?int $item_id, string $field): string
	{
		$string = '';
		$data   = [];

		if (array_key_exists($item, $this->Translations))
		{
			$data = $this->Translations[$item];
		}

		$key = $this->language . $item_id . $field;
		if (array_key_exists($key, $data))
		{
			$string = $data[$key];
		}

		if (!$string && ($this->language != $this->default_language))
		{
			$key = $this->default_language . $item_id . $field;
			if (array_key_exists($key, $data))
			{
				$string = $data[$key];
			}
		}
		else if (!$string)
		{
			$languages = KrMethods::getLanguages();
			foreach ($languages as $l)
			{
				if ($l->published && $l->lang_code != $this->language)
				{
					$key = $l->lang_code . $item_id . $field;
					if (array_key_exists($key, $data))
					{
						$string = $data[$key];

						break;
					}
				}
			}
		}

		return $string;
	}

	/**
	 * Create translations array for $item
	 *
	 * @param   string  $item  Table name
	 *
	 * @since 1.0.0
	 */
	protected function setTranslations(string $item): void
	{
		$data = [];

		$rows = KrFactory::getListModel('translations')->getByItem($item);
		foreach ($rows as $row)
		{
			$key        = $row->language . $row->item_id . $row->field;
			$data[$key] = $row->text;
		}

		$this->Translations[$item] = $data;
	}
}