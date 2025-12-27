<?php
/**
 * @package    Know Reservations
 * @subpackage Admin Models
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Administrator\Field;

use HighlandVision\KR\Framework\KrFactory;
use InvalidArgumentException;
use Joomla\CMS\Form\Field\ListField;
use Joomla\CMS\HTML\HTMLHelper;
use RuntimeException;

use function array_merge;

// phpcs:disable PSR1.Files.SideEffects
defined('_JEXEC') or die;
// phpcs:enable PSR1.Files.SideEffects

/**
 * Supports a value from an external table
 *
 * @since 1.0.0
 */
class ListserviceicalField extends ListField
{
	/** @var string The form field type. */
	protected $type = 'Listserviceical';

	/**
	 * Get the field options.
	 *
	 * @throws InvalidArgumentException|RuntimeException
	 * @since  1.6
	 * @return array    The field input markup.
	 */
	public function getOptions(): array
	{
		$options = [];

		$items = KrFactory::getListModel('services')->getServicesByPlugin('ical');
		foreach ($items as $i) {
			$options[] = HTMLHelper::_('select.option', $i->id, $i->name);
		}

		return array_merge(parent::getOptions(), $options);
	}
}