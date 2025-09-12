<?php
/**
 * @package     Joomla.Libraries
 * @subpackage  Form
 * @copyright   2005 - 2016 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE
 */

namespace HighlandVision\Component\Knowres\Administrator\Field;

defined('_JEXEC') or die;

use HighlandVision\KR\Joomla\Extend\ListField as KrListField;
use InvalidArgumentException;
use RuntimeException;

use function array_merge;

/**
 * Form Field to load a list of filter properties
 *
 * @since  3.2
 */
class FiltermanagerField extends KrListField
{
	/** @var string The form field type. */
	public $type = 'Filtermanager';

	/**
	 * Populate manager filter
	 *
	 * @throws  RuntimeException
	 * @throws InvalidArgumentException
	 * @since   2.5.1
	 * @return  array  The field option objects.
	 */
	protected function getOptions(): array
	{
		$options = self::filterManager();

		return array_merge(parent::getOptions(), $options);
	}
}