<?php
/**
 * @package     Joomla.Libraries
 * @subpackage  Form
 * @copyright   2005 - 2016 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE
 */

namespace HighlandVision\Component\Knowres\Administrator\Field;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Joomla\Extend\ListField as KrListField;
use RuntimeException;

use function array_merge;

/**
 * Form Field to load a list of filter properties
 *
 * @since  3.2
 */
class FilterkeyField extends KrListField
{
	/** @var string The form field type. */
	public $type = 'Filterkey';

	/**
	 * Keys to populate filter key list
	 *
	 * @throws RuntimeException|Exception
	  * @since  3.4
	 * @return array  The field option objects.
	 */
	protected function getOptions(): array
	{
		$options = [];
		$table   = $this->getAttribute('table');
		$state   = self::getState($this->form);

		if (isset($this->form->getData()->get('filter', [])->type))
		{
			$type = $this->form->getData()->get('filter', [])->type;
		}
		if (empty($type) || $type == 'p')
		{
			$options = self::filteringForeign('#__knowres_property', $table, 'property_id', 'id',
				'property_name', $state);
		}
		else if ($type == 'c')
		{
			$options = self::filteringForeign('#__knowres_contract', $table, 'contract_id', 'id',
				'tag', $state);
		}
		else if ($type == 'g')
		{
			$options = self::filteringForeign('#__knowres_guest', $table, 'guest_id', 'id',
				'surname', $state);
		}
		else if ($type == 'o')
		{
			$options = self::filteringForeign('#__knowres_owner', $table, 'owner_id', 'id',
				'name', $state);
		}

		return array_merge(parent::getOptions(), $options);
	}
}