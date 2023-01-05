<?php
/**
 * @package     Joomla.Libraries
 * @subpackage  Form
 * @copyright   2005 - 2016 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE
 */

namespace HighlandVision\Component\Knowres\Administrator\Field;

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Translations;
use Joomla\CMS\Form\Field\ListField;
use RuntimeException;

use function array_merge;

/**
 * Load a list of translated fields
 *
 * @since  3.2
 */
class FilterfieldField extends ListField
{
	/** @var string The form field type */
	public $type = 'Filterfield';

	/**
	 * Sort options array
	 *
	 * @param   object  $a  Occurrence
	 * @param   object  $b  Occurrence
	 *
	 * @since  3.2.0
	 * @return int
	 */
	protected function cmp(object $a, object $b): int
	{
		return strcmp($a->text, $b->text);
	}

	/**
	 * Method to get the fields to populate field filter list
	 *
	 * @throws RuntimeException
	 * @since  2.5.1
	 * @return array  The field option objects.
	 */
	protected function getOptions(): array
	{
		$Translations = new Translations();

		$db    = KrFactory::getDatabase();
		$query = $db->getQuery(true)
		            ->select($db->qn('field', 'value'))
		            ->select($db->qn('field', 'text'))
		            ->from($db->qn('#__knowres_translation'))
		            ->group($db->qn('field'))
		            ->order($db->qn('value'));

		$db->setQuery($query);
		$options = $db->loadObjectList();

		foreach ($options as $o)
		{
			$id = substr($o->value, 1);
			if (is_numeric($id))
			{
				$o->text = $Translations->getText('propertyfield', (int) $id, 'label');
			}
			else
			{
				$o->text = $o->value;
			}
		}

		usort($options, [$this, 'cmp']);

		return array_merge(parent::getOptions(), $options);
	}
}