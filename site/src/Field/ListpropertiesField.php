<?php
/**
 * @package     KR
 * @subpackage  Library
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Site\Field;

defined('_JEXEC') or die('Restricted access');

use HighlandVision\KR\Framework\KrFactory;
use Joomla\CMS\Form\Field\ListField;
use Joomla\CMS\HTML\HTMLHelper;

use function array_merge;

/**
 * Get property names for select.
 *
 * @since 4.0.0
 */
class ListpropertiesField extends ListField
{
	/** @var string $type The form field type. */
	protected $type = 'Listproperties';

	/**
	 * Get properties list options
	 *
	 * @since 4.0.0
	 * @return array  The field options.
	 */
	function getOptions(): array
	{
		$options = [];

		$names = KrFactory::getListSiteModel('properties')->getNames();
		foreach ($names as $n)
		{
			$options[] = HTMLHelper::_('select.option', $n->id, $n->property_name);
		}

		return array_merge(parent::getOptions(), $options);
	}
}