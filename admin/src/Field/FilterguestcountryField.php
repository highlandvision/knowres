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
use HighlandVision\KR\Translations;
use InvalidArgumentException;
use Joomla\CMS\Form\Field\ListField;
use Joomla\CMS\HTML\HTMLHelper;
use stdClass;

use function array_merge;

/**
 * Supports a value from an external table
 *
 * @since 1.0.0
 */
class FilterguestcountryField extends ListField
{
	/** @var string The form field type. */
	protected $type = 'Filterguestcountry';

	/**
	 * Get the field options.
	 *
	 * @throws InvalidArgumentException
	 * @since  1.6
	 * @return array    The field input markup.
	 */
	public function getOptions(): array
	{
		$options[] = HTMLHelper::_('select.option', 0, "- Select Country -");
		$items     = KrFactory::getListModel('guests')->getGuestCountries();

		$Translations = new Translations();
		$data         = $Translations->getArray($items, 'country', 'name');

		foreach ($data as $k => $v)
		{
			$option        = new stdClass();
			$option->value = $k;
			$option->text  = $v;
			$options[]     = $option;
		}

		return array_merge(parent::getOptions(), $options);
	}
}