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
 * Form Field to load a list of filter regions
 *
 * @since  3.2
 */
class FilterserviceField extends KrListField
{
	/** @var string The form field type. */
	public $type = 'Filterservice';

	/**
	 * Method to get the services to populate filter list
	 *
	 * @throws RuntimeException|Exception
	 * @since  2.5.1
	 * @return array  The field option objects.
	 */
	protected function getOptions(): array
	{
		$options = self::filteringForeign('#__knowres_service', $this->getAttribute('table'), 'service_id', 'id',
			'name', null);

		return array_merge(parent::getOptions(), $options);
	}
}