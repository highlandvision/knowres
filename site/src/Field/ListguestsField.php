<?php
/**
 * @package    Know Reservations
 * @subpackage Admin Models
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Site\Field;

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;
use InvalidArgumentException;
use Joomla\CMS\Form\Field\ListField;
use Joomla\CMS\HTML\HTMLHelper;

use function array_merge;

/**
 * Select options for guest in search.
 *
 * @since 1.0.0
 */
class ListguestsField extends ListField
{
	//TODO-v4.1 Remove and reinstate Listpartysizefield in search form
	/** @var string $type The form field type. */
	protected $type = 'Listguests';

	/**
	 * Get party size list options
	 *
	 * @throws InvalidArgumentException
	 * @since  4.0.0
	 * @return array  The field options.
	 */
	function getOptions(): array
	{
		$options   = [];
		$maxguests = KrMethods::getParams()->get('search_maxguests', 16);

		for ($i = 2; $i <= $maxguests; $i++)
		{
			$options[] = HTMLHelper::_('select.option', $i, KrMethods::sprintf('MOD_KNOWRES_SEARCH_GUEST', $i));
		}

		return array_merge(parent::getOptions(), $options);
	}
}