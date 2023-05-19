<?php
/**
 * @package    Know Reservations
 * @subpackage Admin Models
 * @copyright  2017 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Site\Field;

defined('_JEXEC') or die;

use Carbon\Exceptions\InvalidFormatException;
use HighlandVision\KR\TickTock;
use Joomla\CMS\Form\FormField;

/**
 * Supports the foundation datepicker fields
 *
 * @since 3.2.0
 */
class FdatepickerField extends FormField
{
	/** @var string The form field type. */
	protected $type = 'Fdatepicker';

	/**
	 * Wrapper method for getting attributes from the form element
	 *
	 * @param   string  $name     Attribute name
	 * @param   mixed   $default  Optional value to return if attribute not found
	 *
	 * @since  3.2.0
	 * @return mixed The value of the attribute if it exists, null otherwise
	 */
	public function getAttribute($name, $default = null): mixed
	{
		if (!empty($this->element[$name]))
		{
			return $this->element[$name];
		}
		else
		{
			return $default;
		}
	}

	/**
	 * Method to get the field input markup.
	 *
	 * @throws InvalidFormatException
	 * @since  3.2.0
	 * @return string    The field input markup.
	 */
	protected function getInput(): string
	{
		if ($this->name == 'jform[arrival]')
		{
			$this->value = TickTock::getDate('now', "d/m/Y");
		}
		else
		{
			$this->value = TickTock::modifyDays(TickTock::getDate(), 7, '+', "d/m/Y");
		}

		return '<input type="text" class="' . $this->class . '" name="' . $this->name . '" 
			id="' . $this->id . '" value="' . $this->value . '" . data-date-format="dd/mm/yyyy" 
			data-language="en" data-pickTime="false" data-closeButton="true" 
			data-disableDblClickSelection="true" . >';
	}
}