<?php
/**
 * @package    Know Reservations
 * @subpackage Admin Controllers
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

/** @noinspection PhpComposerExtensionStubsInspection */

namespace HighlandVision\Component\Knowres\Administrator\Rule;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Framework\KrMethods;
use Joomla\CMS\Form\Form;
use Joomla\CMS\Form\FormRule;
use Joomla\Registry\Registry;
use SimpleXMLElement;

/**
 * Rule for date ranges
 *
 * @since 1.0.0
 */
class DaterangeRule extends FormRule
{
	/**
	 * Method to test the value.
	 *
	 * @param  SimpleXMLElement  $element    The SimpleXMLElement object representing the `<field>` tag for the form
	 *                                       field object.
	 * @param  mixed             $value      The form field value to validate.
	 * @param  null              $group      The field name group control value. This acts as an array container
	 *                                       for the field.
	 *                                       For example if the field name="foo" and the group value is set to "bar"
	 *                                       then the full field name would end up being "bar[foo]".
	 * @param  Registry|null     $input      An optional Registry object with the entire data set to validate against
	 *                                       the entire form.
	 * @param  Form|null         $form       The form object for which the field is being tested.
	 *
	 * @throws Exception
	 * @since  1.0.0
	 * @return bool  True if the value is valid, false otherwise.
	 */
	public function test(SimpleXMLElement $element, $value, $group = null, Registry $input = null,
		Form $form = null): bool
	{
		$valid_from = ($input instanceof Registry) ? $input->get('valid_from') : '';
		if ($value < $valid_from)
		{
			KrMethods::message(KrMethods::plain('COM_KNOWRES_RULES_DATERANGE'), 'error');

			return false;
		}

		return true;
	}
}