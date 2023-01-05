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
use HighlandVision\KR\Session as KrSession;
use RuntimeException;

use function array_merge;

/**
 * Form Field to load a list of filter properties
 *
 * @since  3.2
 */
class FilterpropertyField extends KrListField
{
	/** @var string The form field type. */
	public $type = 'Filterproperty';

	/**
	 * Method to populate the propertys filter list
	 *
	 * @throws RuntimeException|Exception
	 * @since  2.5.1
	 * @return array  The field option objects.
	 */
	protected function getOptions(): array
	{
		$userSession = new KrSession\User();
		$userData    = $userSession->getData();
		$properties  = $userData->properties;
		$state       = self::getState($this->form);
		$table       = $this->getAttribute('table');

		if ($table != 'own')
		{
			$options = self::filteringForeign('#__knowres_property', $table, 'property_id', 'id',
				'property_name', $state);
		}
		else
		{
			$options = self::filtering('#__knowres_property', 'id', 'property_name', $state);
		}

		if ($properties)
		{
			$properties = explode(',', $properties);
			foreach ($options as $k => $o)
			{
				if (!in_array((int) $o->value, $properties))
				{
					unset($options[$k]);
				}
			}
		}

		return array_merge(parent::getOptions(), $options);
	}
}