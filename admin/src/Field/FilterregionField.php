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
use RuntimeException;
use stdClass;

use function array_merge;

/**
 * Form Field to load a list of filter regions
 *
 * @since  3.2
 */
class FilterregionField extends KrListField
{
	/** @var string The form field type */
	public $type = 'Filterregion';

	/**
	 * Populate the regions filter list
	 *
	 * @throws RuntimeException|Exception
	 * @since  2.5.1
	 * @return array  The field option objects.
	 */
	protected function getOptions(): array
	{
		$options = [];
		$table   = $this->getAttribute('table');
		$results = self::filteringForeign('#__knowres_region', $table, 'region_id', 'id', null);

		$Translations = new Translations();
		$tmp          = $Translations->getArray($results, 'region', 'name');
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