<?php
/**
 * @package     KR
 * @subpackage  Library
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Site\Field;

defined('_JEXEC') or die('Restricted access');

use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use InvalidArgumentException;
use Joomla\CMS\Form\Field\ListField;
use Joomla\CMS\HTML\HTMLHelper;

use RuntimeException;

use function array_merge;
use function count;

/**
 * Get property types select.
 *
 * @since 4.0.0
 */
class ListpropertytypesField extends ListField
{
	/** @var string $type The form field type. */
	protected $type = 'Listpropertytypes';

	/**
	 * Get property types list options
	 *
	 * @throws RuntimeException|InvalidArgumentException
	 * @since 4.0.0
	 * @return array  The field options.
	 */
	function getOptions(): array
	{
		$options   = [];
		$options[] = HTMLHelper::_('select.option', 0, KrMethods::plain('MOD_KNOWRES_SEARCH_TYPES_LABEL'));

		$types = KrFactory::getListSiteModel('properties')->getDistinctTypes();
		if (is_countable($types) && count($types))
		{
			foreach ($types as $t)
			{
				$options[] = HTMLHelper::_('select.option', $t->type_id, $t->name);
			}
		}

		return array_merge(parent::getOptions(), $options);
	}
}