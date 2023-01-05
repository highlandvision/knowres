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
use RuntimeException;

use function array_merge;

/**
 * Form Field to load a list of currencies
 *
 * @since  3.2
 */
class FiltercurrencyField extends KrListField
{
	/** @var string The form field type */
	public $type = 'Filtercurrency';

	/**
	 * Method to get the currencies to populate filter list
	 *
	 * @throws RuntimeException|Exception
	 * @since  2.5.1
	 * @return array  The field option objects.
	 */
	protected function getOptions(): array
	{
		$table   = $this->getAttribute('table');
		$column  = $this->getAttribute('column');
		$options = self::filteringForeign('#__knowres_currency', $table, $column, 'iso', 'iso');

		return array_merge(parent::getOptions(), $options);
	}
}