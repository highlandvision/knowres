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
use HighlandVision\KR\Utility;
use Joomla\CMS\Form\Form;
use Joomla\CMS\Form\FormRule;
use Joomla\Registry\Registry;
use SimpleXMLElement;

/**
 * Form rule class for rates
 *
 * @since          1.0.0
 */
class MoreguestsRule extends FormRule
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
		 * this gives you the value of the ID field
		 */
		$property_id = ($input instanceof Registry) ? $input->get('property_id') : '';
		$min_guests  = ($input instanceof Registry) ? $input->get('min_guests') : '0';
		$max_guests  = ($input instanceof Registry) ? $input->get('max_guests') : '0';
		$min_nights  = ($input instanceof Registry) ? $input->get('min_nights') : '0';
		$more_guests = KrMethods::inputArray('more_guests');
		$more_guests = Utility::arrayToObject($more_guests);
		$property    = KrFactory::getAdminModel('Property')->getItem($property_id);

		// Check that a maximum guests up to the property sleeps
		// has been entered
		$max = $max_guests;
		foreach ($more_guests as $m)
		{
			if ((int) $m->more_max > $max)
			{
				$max = (int) $m->more_max;
			}
		}

		$prop_max = (int) $property->sleeps + (int) $property->sleeps_extra;
		if ($max > $prop_max)
		{
			KrMethods::message(KrMethods::sprintf('COM_KNOWRES_RATES_ERROR1', $prop_max),
				'error');

			return false;
		}
		else if ($max < $prop_max)
		{
			KrMethods::message(KrMethods::sprintf('COM_KNOWRES_RATES_ERROR2', $prop_max),
				'error');

			return false;
		}

		// Check min nights is 1 for managed rates
		$settings = KrFactory::getListModel('propertysettings')->getPropertysettings($property_id, 'managed_rates');
		if ((int) $settings['managed_rates'] && $min_nights > 1)
		{
			KrMethods::message(KrMethods::plain('COM_KNOWRES_RATES_ERROR3'), 'error');

			return false;
		}

		$count = [];
		for ($i = $min_guests; $i <= $max_guests; $i++)
		{
			if (isset($count[$i]))
			{
				$count[$i]++;
			}
			else
			{
				$count[$i] = 1;
			}
		}

		// Other rows min and max
		foreach ($more_guests as $m)
		{
			for ($i = (int) $m->more_min; $i <= (int) $m->more_max; $i++)
			{
				if ($i > 0)
				{
					isset($count[$i]) ? $count[$i]++ : $count[$i] = 1;
				}
			}
		}

		foreach ($count as $k => $v)
		{
			if ($v > 1)
			{
				KrMethods::message(KrMethods::sprintf('COM_KNOWRES_RATES_ERROR4', $k), 'error');

				return false;
			}
		}

		// Also check that there are no gaps in guests
		for ($i = 1; $i <= $prop_max; $i++)
		{
			if (!isset($count[$i]))
			{
				KrMethods::message(KrMethods::sprintf('COM_KNOWRES_RATES_ERROR6', $i), 'error');

				return false;
			}
		}

		// Check that a rate is entered when more guests
		// Other rows min and max
		foreach ($more_guests as $m)
		{
			if ((int) $m->more_min && !$m->more_rate)
			{
				KrMethods::message(KrMethods::plain('COM_KNOWRES_RATES_ERROR5'), 'error');

				return false;
			}
		}

		return true;
	}
}