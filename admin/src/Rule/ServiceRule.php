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
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use Joomla\CMS\Form\Form;
use Joomla\CMS\Form\FormRule;
use Joomla\Registry\Registry;
use SimpleXMLElement;

/**
 * Form rule class for service
 *
 * @since         1.0.0
 */
class ServiceRule extends FormRule
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
		/*
		 * Here we match the value with a specific format. You may also use any kind of validation,
		 * If you need a value of another field as well from the same form then use the following method:
		 * $userId = ($input instanceof Registry) ? $input->get('id') : '0';
		 * this gived you the value of the ID field
		 */
		$currency    = ($input instanceof Registry) ? $input->get('currency') : '';
		$plugin      = ($input instanceof Registry) ? $input->get('plugin') : '';
		$id          = ($input instanceof Registry) ? $input->get('id', 0) : '';
		$property_id = ($input instanceof Registry) ? $input->get('property_id') : '';

		if ($plugin !== 'ical' && !$id)
		{
			$db    = KrFactory::getDatabase();
			$query = $db->getQuery(true);

			$query->select('COUNT(*)')
			      ->from($db->qn('#__knowres_service'))
			      ->where($db->qn('id') . '>0')
			      ->where($db->qn('agency_id') . '=' . (int) $value)
			      ->where($db->qn('property_id') . '=' . (int) $property_id)
			      ->where($db->qn('currency') . '=' . $db->q($currency))
			      ->where($db->qn('plugin') . '=' . $db->q($plugin));

			$db->setQuery($query);
			if ($db->loadResult())
			{
				KrMethods::setUserState('com_knowres.service.plugin', $plugin);
				KrMethods::message(KrMethods::plain('COM_KNOWRES_SERVICE_ERROR1'), 'error');

				return false;
			}
		}

		return true;
	}
}