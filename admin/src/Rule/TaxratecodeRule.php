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
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use Joomla\CMS\Form\Form;
use Joomla\CMS\Form\FormRule;
use Joomla\Registry\Registry;
use SimpleXMLElement;

//TODO-v5.2 Deleted me please I am obolete

/**
 * Form rule class for tax rate code
 *
 * @since 2.5.0
 */
class TaxratecodeRule extends FormRule
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
	public function test(SimpleXMLElement $element, $value, $group = null, Registry $input = null,
		Form $form = null): bool
	{
		$id = ($input instanceof Registry) ? $input->get('id') : '0';

		$db    = KrFactory::getDatabase();
		$query = $db->getQuery(true);

		$query->select('COUNT(*)')
		      ->from($db->qn('#__knowres_tax_rate'))
		      ->where($db->qn('code') . '=' . $db->q($value));
		if ($id)
		{
			$query->where($db->qn('id') . '<>' . $db->q($id));
		}

		$db->setQuery($query);

		$duplicate = $db->loadResult();
		if ($duplicate)
		{
			KrMethods::message(KrMethods::plain('COM_KNOWRES_TAXRATE_CODE_ERROR1'), 'error');

			return false;
		}

		return true;
	}
}