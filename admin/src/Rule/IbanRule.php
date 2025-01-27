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
use PHP_IBAN\IBAN;
use SimpleXMLElement;

use function in_array;

/**
 * Form rule class for iban validation
 *
 * @since 3.4.0
 */
class IbanRule extends FormRule
{

	/**
	 * Method to test the value.
	 *
	 * @param   SimpleXMLElement  $element  The SimpleXMLElement object representing the `<field>` tag for the form
	 *                                      field object.
	 * @param   mixed             $value    The form field value to validate.
	 * @param  ?string            $group    The field name group control value. This acts as an array container for
	 *                                      the field.
	 *                                      For example if the field name="foo" and the group value is set to "bar"
	 *                                      then the full field name would end up being "bar[foo]".
	 * @param  ?Registry          $input    An optional Registry object with the entire data set to validate against
	 *                                      the entire form.
	 * @param  ?Form              $form     The form object for which the field is being tested.
	 *
	 * @throws Exception
	 * @since  3.4.0
	 * @return bool  True if the value is valid, false otherwise.
	 */
	public function test(SimpleXMLElement $element, $value, $group = null, ?Registry $input = null,
		?Form $form = null): bool
	{

		$payment_schedule = ($input instanceof Registry) ? $input->get('payment_schedule') : '';
		if (!in_array($payment_schedule, ['eom', 'rgp', 'dba', 'dad']))
		{
			return true;
		}

		if (empty($value))
		{
			KrMethods::message(KrMethods::plain('IBAN must be entered'), 'error');
			return false;
		}

		$Iban = new IBAN($value);
		if (!$Iban->Verify())
		{
			KrMethods::message(KrMethods::plain('IBAN is invalid format'), 'error');

			return false;
		}
		if (!$Iban->VerifyChecksum())
		{
			KrMethods::message(KrMethods::plain('IBAN checksum is not valid'), 'error');

			return false;
		}

		# Find the correct checksum for an IBAN
		$Iban->FindChecksum();
		# Set the correct checksum for an IBAN
		$Iban->SetChecksum();
		$value = $Iban->HumanFormat();

		# Verify the pre-IBAN era, BBAN-level national checksum for those countries that
		# have such a system that we have implemented.
		# Returns '' if unimplemented, true or false
		$result = $Iban->VerifyNationalChecksum();
		if ($result === false)
		{
			KrMethods::message(KrMethods::plain('IBAN ' . $value
				. ' failed the national checksum algorithm for its country'), 'error');

			return false;
		}

		return true;
	}
}