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
 * Form Field to load a list of filter properties
 *
 * @since  3.2
 */
class FilteritemField extends KrListField
{
	/** @var string The form field type */
	public $type = 'Filteritem';

	/**
	 * Method to get the items to populate filter list
	 *
	 * @throws RuntimeException|Exception
	 * @since  2.5.1
	 * @return array  The field option objects.
	 */
	protected function getOptions(): array
	{
		$state   = self::getState($this->form);
		$options = self::filtering('#__knowres_translation', 'item', 'item', $state);

		return array_merge(parent::getOptions(), $options);
	}
}