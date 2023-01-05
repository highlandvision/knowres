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

use Exception;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use Joomla\CMS\Form\Field\ListField;
use Joomla\CMS\HTML\HTMLHelper;

use function array_merge;

/**
 * Displays the properties available to switch to
 *
 * @since 1.0.0
 */
class ListpropertyswitchField extends ListField
{
	/** @var string The form field type. */
	protected $type = 'Listpropertyswitch';

	/**
	 * Get the field options.
	 *
	 * @throws Exception
	 * @since  1.0.0
	 * @return array  The field input markup.
	 */
	public function getOptions(): array
	{
		$id      = KrMethods::inputInt('id');
		$items   = KrFactory::getListModel('properties')->getForSwitch($id);
		$options = [];
		foreach ($items as $i)
		{
			$options[] = HTMLHelper::_('select.option', $i->id, $i->property_name);
		}

		return array_merge(parent::getOptions(), $options);
	}
}