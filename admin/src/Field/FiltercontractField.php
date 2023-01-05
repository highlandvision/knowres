<?php
/**
 * @package    Know Reservations
 * @subpackage Admin Model Field
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
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
class FiltercontractField extends KrListField
{
	/** @var string The form field type. */
	public $type = 'Filtercontract';

	/**
	 * Method to get the contracts to populate filter list
	 *
	 * @throws RuntimeException|Exception
	 * @since  2.5.1
	 * @return array  The field options.
	 */
	protected function getOptions(): array
	{
		$table = $this->getAttribute('table');
		$state = self::getState($this->form);

		if ($table != 'own')
		{
			$options = self::filteringForeign('#__knowres_contract', $table, 'contract_id', 'id',
				'tag', $state);
		}
		else
		{
			$options = self::filtering('#__knowres_contract', 'id', 'tag', $state);
		}

		return array_merge(parent::getOptions(), $options);
	}
}