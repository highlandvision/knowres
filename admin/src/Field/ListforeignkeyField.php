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
use Joomla\CMS\Form\Field\ListField;

use function array_merge;

/**
 * Supports a value from an external table
 *
 * @since 1.0.0
 */
class ListforeignkeyField extends ListField
{
	/** @var string The form field type. */
	public $type = 'Listforeignkey';

	/**
	 * Returns an array of stdClass options in value / text format.
	 *
	 * @throws Exception
	 * @since  4.0.0
	 * @return array    The field option objects.
	 */
	public function getOptions(): array
	{
		$key_field   = $this->getAttribute('key_field');
		$value_field = $this->getAttribute('value_field');

		$db    = KrFactory::getDatabase();
		$query = $db->getQuery(true);

		$query->select(
			[
				$db->qn($key_field, 'value'),
				$db->qn($value_field, 'text'),
			]
		);

		$query->from($this->getAttribute('table'))
		      ->order($value_field);

		if ($this->getAttribute('where'))
		{
			$query->where($this->getAttribute('where'));
		}

		if ($this->getAttribute('today'))
		{
			$query->where($this->getAttribute('today') . '>=' . $db->q(TickTock::getDate()));
		}

		if ($this->getAttribute('b4today'))
		{
			$query->where($this->getAttribute('b4today') . '<' . $db->q(TickTock::getDate()));
		}

		$db->setQuery($query);
		$options = $db->loadObjectList();

		return array_merge(parent::getOptions(), $options);
	}
}