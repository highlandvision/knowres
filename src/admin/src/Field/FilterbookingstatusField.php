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

use HighlandVision\KR\Utility;
use Joomla\CMS\Form\Field\ListField;

use function array_merge;

/**
 * Supports a value from an external table
 *
 * @since 1.0.0
 */
class FilterbookingstatusField extends ListField
{
	/** @var string The form field type. */
	protected $type = 'Filterbookingstatus';

	/**
	 * Populate the booking status filter list
	 *
	 * @since   2.5.1
	 * @return  array  The field options.
	 */
	protected function getOptions(): array
	{
		$options   = [];
		$options[] = [
			'value' => 0,
			'text'  => Utility::getBookingStatus(0, true)
		];
		$options[] = [
			'value' => 1,
			'text'  => Utility::getBookingStatus(1), true
		];
		$options[] = [
			'value' => 5,
			'text'  => Utility::getBookingStatus(5, true)
		];
		$options[] = [
			'value' => 10,
			'text'  => Utility::getBookingStatus(10, true)
		];
		$options[] = [
			'value' => 30,
			'text'  => Utility::getBookingStatus(30, true)
		];
		$options[] = [
			'value' => 35,
			'text'  => Utility::getBookingStatus(35, true)
		];
		$options[] = [
			'value' => 39,
			'text'  => Utility::getBookingStatus(39, true)
		];
		$options[] = [
			'value' => 40,
			'text'  => Utility::getBookingStatus(40, true)
		];

		return array_merge(parent::getOptions(), $options);
	}
}