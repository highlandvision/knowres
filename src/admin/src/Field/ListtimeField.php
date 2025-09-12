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

use InvalidArgumentException;
use Joomla\CMS\Form\Field\ListField;
use Joomla\CMS\HTML\HTMLHelper;

/**
 * KrFactory form field for time select
 *
 * @since 1.0.0
 */
class ListtimeField extends ListField
{
	/** @var string $type The form field type. */
	protected $type = 'Listtime';

	/**
	 * Get the ampm select values
	 *
	 * @throws InvalidArgumentException
	 * @since  1.0.0
	 * @return array The field options.
	 */
	public function getOptions(): array
	{
		$options = [];

		for ($i = 0; $i < 24; $i++)
		{
			if ($i < 10)
			{
				$i = '0' . $i;
			}

			$options[] = HTMLHelper::_('select.option', $i . ':00', $i . ':00');
			$options[] = HTMLHelper::_('select.option', $i . ':30', $i . ':30');
		}

		return array_merge(parent::getOptions(), $options);
	}
}