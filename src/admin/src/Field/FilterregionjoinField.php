<?php
/**
 * @package     Joomla.Libraries
 * @subpackage  Form
 * @copyright   2005 - 2016 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE
 */

namespace HighlandVision\Component\Knowres\Administrator\Field;

use HighlandVision\KR\Joomla\Extend\ListField as KrListField;
use HighlandVision\KR\Translations;
use InvalidArgumentException;
use RuntimeException;

use function array_merge;

// phpcs:disable PSR1.Files.SideEffects
defined('_JEXEC') || die;
// phpcs:enable PSR1.Files.SideEffects

/**
 * Form Field to load a list of filter regions
 *
 * @since  3.2
 */
class FilterregionjoinField extends KrListField
{
	/** @var string The form field type. */
	protected $type = 'Filterregionjoin';

	/**
	 * Method to get the regions to populate filter list
	 *
	 * @throws RuntimeException
	 * @throws InvalidArgumentException
	 * @since  2.5.1
	 * @return array  The field option objects.
	 */
	protected function getOptions(): array
	{
		$options = [];
		$results = self::filterRegionJoin();

		$Translations = new Translations();
		$tmp          = $Translations->getArray($results, 'region', 'name');
		foreach ($tmp as $k => $v) {
			$options[] = array(
				'value' => $k,
				'text'  => $v
			);
		}

		return array_merge(parent::getOptions(), $options);
	}
}