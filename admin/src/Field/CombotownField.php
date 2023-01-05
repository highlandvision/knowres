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
use InvalidArgumentException;
use Joomla\CMS\Form\Field\ListField;
use Joomla\CMS\HTML\HTMLHelper;

use function array_merge;

/**
 * Field for town combo.
 *
 * @since  1.0.0
 */
class CombotownField extends ListField
{
	/** @var string The form field type. */
	protected $type = 'Combotown';

	/**
	 * Get the field options.
	 *
	 * @throws InvalidArgumentException
	 * @throws Exception
	 * @since  1.0.0
	 * @return array The field options
	 */
	public function getOptions(): array
	{
		$options = [];

		$region_id = $this->form->getValue('region_id');
		if ($region_id)
		{
			$items = KrFactory::getListModel('towns')
			                  ->getByRegion($region_id, $this->getAttribute('allowproperty', false));

			foreach ($items as $i)
			{
				$options[] = HTMLHelper::_('select.option', $i->id, $i->name);
			}
		}

		return array_merge(parent::getOptions(), $options);
	}
}