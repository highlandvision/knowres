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

use HighlandVision\KR\Framework\KrFactory;
use InvalidArgumentException;
use Joomla\CMS\Form\Field\ListField;
use Joomla\CMS\HTML\HTMLHelper;
use RuntimeException;

use function array_merge;

/**
 * Supports a value from an external table
 *
 * @since 1.0.0
 */
class ListregionsField extends ListField
{
	/** @var string The form field type. */
	protected $type = 'Listregions';

	/**
	 * Get the field options.
	 *
	 * @throws RuntimeException|InvalidArgumentException
	 * @since  1.0.0
	 * @return array  The field input markup.
	 */
	public function getOptions(): array
	{
		$options = [];

		$allow_property = $this->getAttribute('allow_property', true);
		$items          = KrFactory::getListModel('regions')->getAllRegions($allow_property);
		foreach ($items as $i)
		{
			$options[] = HTMLHelper::_('select.option', $i->id, $i->name);
		}

		return array_merge(parent::getOptions(), $options);
	}
}