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

use HighlandVision\KR\Currency;
use Joomla\CMS\Form\Field\ListField;

use function array_merge;

/**
 * Currency form field
 *
 * @since 1.0.0
 */
class ListcurrencyField extends ListField
{
	/** @var string The form field type. */
	public $type = 'Listcurrency';

	/**
	 * Get the field options.
	 *
	 * @since  4.0.0
	 * @return array    The field options.
	 */
	protected function getOptions(): array
	{
		$currency = new Currency($this->value);
		$options  = $currency->getCurrencyCodes();

		return array_merge(parent::getOptions(), $options);
	}
}