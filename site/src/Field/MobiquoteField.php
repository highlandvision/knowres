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
use Joomla\CMS\Form\FormField;

/**
 * Supports a value from an external table
 *
 * @since 1.0.0
 */
class MobiquoteField extends FormField
{
	/**
	 * Method to get the field input markup.
	 *
	 * @throws Exception
	 * @since  1.6
	 * @return string    The field input markup.
	 */
	protected function getInput(): string
	{
		$this->type = 'mobiquote';

		$html = '<div class="datepicker-wrapper">';
		$html .= '<input type="text" name="' . $this->name . '" id="' . $this->id . '" class="' . $this->class . '">';
		$html .= '<label for="' . $this->id . '">';
		$html .= '<i class="fa-solid fa-calendar-alt"></i>';
		$html .= '</label>';
		$html .= '</div>';

		return $html;
	}
}