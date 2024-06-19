<?php
/**
 * @package    Know Reservations
 * @subpackage Admin Models
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Administrator\Field;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\TickTock;
use HighlandVision\KR\Translations;
use InvalidArgumentException;
use Joomla\CMS\Form\Field\ListField;
use Joomla\CMS\HTML\HTMLHelper;
use RuntimeException;

/**
 * Display options for translatable foreign key field
 *
 * @since 1.0.0
 */
class ListforeignkeytranslateField extends ListField
{
	/** @var string $type The form field type. */
	protected $type = 'Listforeignkeytranslate';

	/**
	 * Get the field options.
	 *
	 * @throws RuntimeException
	 * @throws InvalidArgumentException
	 * @throws Exception
	 * @since  1.0.0
	 * @return array
	 */
	protected function getOptions(): array
	{
		$orderby          = $this->getAttribute('orderby', false);
		$translation_item = $this->getAttribute('translation_item');
		$value_field      = $this->getAttribute('value_field');

		$items        = $this->getItems();
		$Translations = new Translations();
		$data         = $Translations->getArray($items, $translation_item, $value_field, !$orderby);

		$options = [];
		foreach ($data as $k => $v) {
			$options[] = HTMLHelper::_('select.option', $k, $v);
		}

		return array_merge(parent::getOptions(), $options);
	}

	/**
	 * Get database items for translation
	 *
	 * @throws Exception
	 * @since  4.0.0
	 * @return mixed
	 */
	private function getItems(): mixed
	{
		$key_field = $this->getAttribute('key_field');
		$room_type = $this->getAttribute('room_type');
		$table     = $this->getAttribute('table');
		$today     = $this->getAttribute('today');
		$where     = $this->getAttribute('where');

		$db    = KrFactory::getDatabase();
		$query = $db->getQuery(true);

		$query->select($db->qn($key_field));
		$query->from($table);

		if (!is_null($where)) {
			$query->where($where);
		}
		if (!is_null($today)) {
			$query->where($db->qn($today) . '>=' . $db->q(TickTock::getDate()));
		}
		if (!is_null($room_type)) {
			$query->where($db->qn('room_type') . ' LIKE ' . $db->q($room_type));
		}

		//		if ($this->orderby)
		//		{
		//			$query->order($db->qn('ordering'));
		//		}

		$db->setQuery($query);

		return $db->loadObjectList();
	}
}