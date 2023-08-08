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
	 * @param  string  $name     Attribute name
	 * @param  mixed   $default  Optional value to return if attribute not found
	 *
	 * @since  3.2.0
	 * @return mixed The value of the attribute if it exists, null otherwise
	 */
	public function getAttribute($name, $default = null): mixed
	{
		if (!empty($this->element[$name])) {
			return $this->element[$name];
		}
		else {
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
		$this->dataAttributes = $this->setDataAttributes();

		return parent::getInput();
	}

	/**
	 * Field data attributes.
	 *
	 * @since  4.0.0
	 * @return array    The field input markup.
	 */
	protected function setDataAttributes(): array
	{
		if ($this->name == 'jform[arrival]') {
			$value = TickTock::getDate('now', "d/m/Y");
		}
		else {
			$value = TickTock::modifyDays(TickTock::getDate(), 7, '+', "d/m/Y");
		}

		$attributes                                  = [];
		$attributes['class']                         = $this->class;
		$attributes['name']                          = $this->name;
		$attributes['id']                            = $this->id;
		$attributes['value']                         = $value;
		$attributes['data-date-format']              = "dd/mm/yyyy";
		$attributes['data-language']                 = 'en';
		$attributes['data-pickTime']                 = false;
		$attributes['data-closeButton']              = true;
		$attributes['data-disableDblClickSelection'] = true;

		return $attributes;
	}
}