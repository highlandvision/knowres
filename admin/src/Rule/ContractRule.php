<?php
/**
 * @package    Know Reservations
 * @subpackage Admin Models
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

/** @noinspection PhpComposerExtensionStubsInspection */

namespace HighlandVision\Component\Knowres\Administrator\Rule;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\Component\Knowres\Administrator\Model\PropertyModel;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\TickTock;
use Joomla\CMS\Form\Form;
use Joomla\CMS\Form\FormRule;
use Joomla\Registry\Registry;
use SimpleXMLElement;

/**
 * Form rule class for service
 *
 * @since         1.0.0
 */
class ContractRule extends FormRule
{
	/**
	 * Method to test the value.
	 *
	 * @param   SimpleXMLElement  $element  The SimpleXMLElement object representing the `<field>` tag for the form field object.
	 * @param   mixed             $value    The form field value to validate.
	 * @param   null              $group    The field name group control value. This acts as an array container for the field.
	 *                                      For example if the field name="foo" and the group value is set to "bar" then the
	 *                                      full field name would end up being "bar[foo]".
	 * @param   Registry|null     $input    An optional Registry object with the entire data set to validate against the entire form.
	 * @param   Form|null         $form     The form object for which the field is being tested.
	 *
	 * @throws Exception
	 * @since  1.0.0
	 * @return bool  True if the value is valid, false otherwise.
	 */
	public function test(SimpleXMLElement $element, $value, $group = null, Registry $input = null,
		Form $form = null): bool
	{
		/* @var PropertyModel $property */
		$property = KrFactory::getAdminModel('property')->getItem($value);
		if (!$property->id || !$property->state == 1)
		{
			KrMethods::message(KrMethods::plain('COM_KNOWRES_ERROR_NO_PROPERTY'));

			return false;
		}

		$arrival = ($input instanceof Registry) ? $input->get('arrival') : '';
		if (!TickTock::isValidDate($arrival))
		{
			KrMethods::message(KrMethods::plain('Arrival date is invalid'));

			return false;
		}

		$departure = ($input instanceof Registry) ? $input->get('departure') : '';
		if (!TickTock::isValidDate($departure))
		{
			KrMethods::message(KrMethods::plain('Departure date is invalid'));

			return false;
		}

		if ($departure <= $arrival)
		{
			KrMethods::message(KrMethods::plain('Departure is on or before arrival'));

			return false;
		}

		$id        = ($input instanceof Registry) ? $input->get('id') : '0';
		$available = KrFactory::getListModel('contracts')->isPropertyAvailable($value, $arrival, $departure, $id);
		if (!$available)
		{
			KrMethods::message(KrMethods::plain('COM_KNOWRES_RULES_QUOTE_NOT_AVAILABLE'));

			return false;
		}

		return true;
	}
}