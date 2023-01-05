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
 * Field for region combo.
 *
 * @since 1.0.0
 */
class ComboregionField extends ListField
{
	/** @var string The form field type. */
	protected $type = 'ComboRegion';

	/**
	 * Get the field options.
	 *
	 * @throws Exception
	 * @since  4.0.0
	 * @return array    The field input markup.
	 */
	protected function getOptions(): array
	{
		$options = [];

		$country_id = $this->form->getValue('country_id');
		if (!$country_id)
		{
			$country_id = KrMethods::getParams()->get('default_country');
		}
		if ($country_id)
		{
			$items = KrFactory::getListModel('regions')->getAllRegions($this->getAttribute('allowproperty', false),
				null, $country_id);
			foreach ($items as $i)
			{
				$options[] = HTMLHelper::_('select.option', $i->id, $i->name);
			}
		}

		return array_merge(parent::getOptions(), $options);
	}
}