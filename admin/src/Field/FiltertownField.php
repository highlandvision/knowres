<?php
/**
 * @package     Joomla.Libraries
 * @subpackage  Form
 * @copyright   2005 - 2016 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE
 */

namespace HighlandVision\Component\Knowres\Administrator\Field;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Joomla\Extend\ListField as KrListField;
use HighlandVision\KR\Translations;
use InvalidArgumentException;
use stdClass;

use function array_merge;

/**
 * Form Field to load a list of filter regions
 *
 * @since  3.2
 */
class FiltertownField extends KrListField
{
	/** @var string The form field type. */
	public $type = 'Filtertown';

	/**
	 * Get the field options.
	 *
	 * @throws InvalidArgumentException|Exception
	 * @since  1.6
	 * @return array    The field input markup.
	 */
	protected function getOptions(): array
	{
		$options = [];

		$results = self::filteringForeign('#__knowres_town', $this->getAttribute('table'), 'town_id', 'id',
			null);

		$Translations = new Translations();
		$tmp          = $Translations->getArray($results, 'town', 'name');

		foreach ($tmp as $k => $v)
		{
			$option        = new stdClass();
			$option->value = $k;
			$option->text  = $v;
			$options[]     = $option;
		}

		return array_merge(parent::getOptions(), $options);
	}
}