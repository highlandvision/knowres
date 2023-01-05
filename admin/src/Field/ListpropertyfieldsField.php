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
use Joomla\CMS\Form\Field\ListField;
use Joomla\CMS\HTML\HTMLHelper;

use function array_merge;

/**
 * Displays the properties available to switch to
 *
 * @since 1.0.0
 */
class ListpropertyfieldsField extends ListField
{
	/** @var string The form field type. */
	protected $type = 'Listpropertyfields';

	/**
	 * Get the field options.
	 *
	 * @throws Exception
	 * @since  1.0.0
	 * @return array  The field input markup.
	 */
	public function getOptions(): array
	{
		$options = [];

		$values = KrFactory::getAdminModel('propertyfield')->getOptions();
		foreach ($values as $k => $v)
		{
			$options[] = HTMLHelper::_('select.option', $k, $v);
		}

		return array_merge(parent::getOptions(), $options);
	}
}