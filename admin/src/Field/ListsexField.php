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

use HighlandVision\KR\Framework\KrMethods;
use Joomla\CMS\Form\Field\ListField;

use function array_merge;

/**
 * Supports a value from an external table
 *
 * @since 1.0.0
 */
class ListsexField extends ListField
{
	/** @var string The form field type. */
	protected $type = 'Listsex';

	/**
	 * Get the field options.
	 *
	 * @since  1.6
	 * @return array The field options.
	 */
	protected function getOptions(): array
	{
		$options      = [];
		$options['F'] = KrMethods::plain('COM_KNOWRES_FEMALE');
		$options['M'] = KrMethods::plain('COM_KNOWRES_MALE');

		return array_merge(parent::getOptions(), $options);
	}
}