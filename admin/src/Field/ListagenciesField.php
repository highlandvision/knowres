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
use Joomla\CMS\Form\Field\ListField;
use Joomla\CMS\HTML\HTMLHelper;

use function array_merge;

/**
 * Currency form field
 *
 * @since 1.0.0
 */
class ListagenciesField extends ListField
{
	/** @var string The form field type. */
	public $type = 'Listagencies';

	/**
	 * Get the field options.
	 *
	 * @since  4.0.0
	 * @return array    The field options.
	 */
	protected function getOptions(): array
	{
		$options = [];
		$items   = KrFactory::getListModel('agencies')->getAll();
		foreach ($items as $i)
		{
			$options[] = HTMLHelper::_('select.option', $i->id, $i->name);
		}

		return array_merge(parent::getOptions(), $options);
	}
}