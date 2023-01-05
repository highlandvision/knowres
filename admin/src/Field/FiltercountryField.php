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
use HighlandVision\KR\Translations;
use Joomla\CMS\HTML\HTMLHelper;
use RuntimeException;

use function array_merge;

/**
 * Filter countries
 *
 * @since  3.2
 */
class FiltercountryField extends KrListField
{
	/** @var string The form field type */
	public $type = 'Filtercountry';

	/**
	 * Populate countries filter list
	 *
	 * @throws RuntimeException|Exception
	 * @since  2.5.1
	 * @return array  The field option objects.
	 */
	protected function getOptions(): array
	{
		$options = [];
		$table   = $this->getAttribute('table');
		$results = self::filteringForeign('#__knowres_country', $table, 'country_id', 'id', null);

		$Translations = new Translations();
		$tmp          = $Translations->getArray($results, 'country', 'name');
		foreach ($tmp as $k => $v)
		{
			$options[] = HTMLHelper::_('select.option', $k, $v);
		}

		return array_merge(parent::getOptions(), $options);
	}
}