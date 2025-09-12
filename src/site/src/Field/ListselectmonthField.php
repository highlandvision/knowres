<?php
/**
 * @package    Know Reservations
 * @subpackage Site
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Site\Field;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Joomla\Extend\ListField;
use HighlandVision\KR\TickTock;
use InvalidArgumentException;
use Joomla\CMS\HTML\HTMLHelper;

/**
 * Displays a select with months
 *
 * @since 1.0.0
 */
class ListselectmonthField extends ListField
{
	/** @var string The form field type. */
	protected $type = 'Listselectmonth';

	/**
	 * Get the field options
	 *
	 * @throws InvalidArgumentException
	 * @throws Exception
	 * @since  1.0.0
	 * @return array    The field input markup.
	 */
	public function getOptions(): array
	{
		$count   = 0;
		$options = [];

		while ($count < 25)
		{
			$mmmyy     = TickTock::modifyMonths('now', $count, '+', 'M-Y');
			$ym        = TickTock::modifyMonths('now', $count, '+', 'Ym');
			$options[] = HTMLHelper::_('select.option', $ym, $mmmyy);
			$count++;
		}

		return array_merge(parent::getOptions(), $options);
	}
}