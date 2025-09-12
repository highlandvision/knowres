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
use RuntimeException;
use stdClass;

use function array_merge;

/**
 * Supports a value from an external table
 *
 * @since 1.0.0
 */
class FilterpropertyregionField extends ListField
{

	/** @var string The form field type. */
	protected $type = 'Filterpropertyregion';

	/**
	 * Get the field options.
	 *
	 * @throws RuntimeException
	 * @since  1.6
	 * @return array
	 */
	public function getOptions(): array
	{
		$options = [];
		$items   = KrFactory::getListModel('regions')->getAllRegions(true);
		foreach ($items as $i)
		{
			$option        = new stdClass();
			$option->value = $i->id;
			$option->text  = $i->region;
			$options[]     = $option;
		}

		return array_merge(parent::getOptions(), $options);
	}
}