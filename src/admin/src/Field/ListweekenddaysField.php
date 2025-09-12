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
use InvalidArgumentException;
use Joomla\CMS\Form\Field\ListField;
use Joomla\CMS\HTML\HTMLHelper;

use function array_merge;

/**
 * Supports a value from an external table
 *
 * @since 1.0.0
 */
class ListweekenddaysField extends ListField
{
	/** @var string The form field type. */
	protected $type = 'Listweekenddays';

	/**
	 * Get the field options.
	 *
	 * @throws InvalidArgumentException
	 * @since  1.6
	 * @return array  The field input markup.
	 */
	public function getOptions(): array
	{
		$items            = [];
		$items[""]        = KrMethods::plain('COM_KNOWRES_NODAY');
		$items["4,5"]     = KrMethods::plain('COM_KNOWRES_THURSDAY') . ", "
			. KrMethods::plain('COM_KNOWRES_FRIDAY');
		$items["4,5,6"]   = KrMethods::plain('COM_KNOWRES_THURSDAY') . ", " . KrMethods::plain('COM_KNOWRES_FRIDAY')
			. ", " . KrMethods::plain('COM_KNOWRES_SATURDAY');
		$items["4,5,6,0"] = KrMethods::plain('COM_KNOWRES_THURSDAY') . ", " . KrMethods::plain('COM_KNOWRES_FRIDAY')
			. ", " . KrMethods::plain('COM_KNOWRES_SATURDAY') . ", " . KrMethods::plain('COM_KNOWRES_SUNDAY');
		$items["5"]       = KrMethods::plain('COM_KNOWRES_FRIDAY');
		$items["5,6"]     = KrMethods::plain('COM_KNOWRES_FRIDAY') . ", "
			. KrMethods::plain('COM_KNOWRES_SATURDAY');
		$items["5,6,0"]   = KrMethods::plain('COM_KNOWRES_FRIDAY') . ", " . KrMethods::plain('COM_KNOWRES_SATURDAY')
			. ", " . KrMethods::plain('COM_KNOWRES_SUNDAY');
		$items["6"]       = KrMethods::plain('COM_KNOWRES_SATURDAY');
		$items["6,0"]     = KrMethods::plain('COM_KNOWRES_SATURDAY') . ", "
			. KrMethods::plain('COM_KNOWRES_SUNDAY');
		$items["0"]       = KrMethods::plain('COM_KNOWRES_SUNDAY');

		$options = [];
		foreach ($items as $k => $v)
		{
			$options[] = HTMLHelper::_('select.option', $k, $v);
		}

		return array_merge(parent::getOptions(), $options);
	}
}