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

/**
 * The category options for menu selection
 *
 * @since 1.0.0
 */
class ListpropertiesField extends ListField
{
	/** @var string $type The form field type. */
	protected $type = 'Listproperties';

	/**
	 * Get the field options.
	 *
	 * @throws InvalidArgumentException
	 * @since  1.0.0
	 * @return array The field options.
	 */
	public function getOptions(): array
	{
		$options    = [];
		$properties = KrFactory::getListSiteModel('properties')->getNames();

		foreach ($properties as $p)
		{
			$options[] = HTMLHelper::_('select.option', $p->id, $p->property_name);
		}

		return array_merge(parent::getOptions(), $options);
	}
}