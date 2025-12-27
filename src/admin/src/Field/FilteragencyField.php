<?php
/**
 * @package     Joomla.Libraries
 * @subpackage  Form
 * @copyright   2005 - 2016 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE
 */

namespace HighlandVision\Component\Knowres\Administrator\Field;

use Exception;
use HighlandVision\KR\Joomla\Extend\ListField as KrListField;
use RuntimeException;

use function array_merge;

// phpcs:disable PSR1.Files.SideEffects
defined('_JEXEC') || die;
// phpcs:enable PSR1.Files.SideEffects

/**
 * Form Field to load a list of agents
 *
 * @since  3.2
 */
class FilteragencyField extends KrListField
{
	/** @var string The form field type do not add $type as per phpstorm requires Joomla changes. */
	protected $type = 'Filteragency';

	/**
	 * Populate the agencies filter list
	 *
	 * @throws RuntimeException|Exception
	 * @since  2.5.1
	 * @return array
	 */
	protected function getOptions(): array
	{
		$options = self::filteringForeign('#__knowres_agency', $this->getAttribute('table'), 'agency_id');

		return array_merge(parent::getOptions(), $options);
	}
}