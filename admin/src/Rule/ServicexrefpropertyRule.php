<?php
/**
 * @package    Know Reservations
 * @subpackage Admin Controllers
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Administrator\Rule;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Media;
use HighlandVision\KR\TickTock;
use HighlandVision\KR\Utility;
use Joomla\CMS\Form\Form;
use Joomla\CMS\Form\FormRule;
use Joomla\Registry\Registry;
use SimpleXMLElement;

/**
 * Form rule class for service xref
 *
 * @since          1.0.0
 */
class ServicexrefpropertyRule extends FormRule
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
		$service_id = ($input instanceof Registry) ? $input->get('service_id') : '';
		$sell       = ($input instanceof Registry) ? $input->get('sell', 1) : '0';
		if (!$sell)
		{
			return true;
		}
		$id         = ($input instanceof Registry) ? $input->get('id') : 0;
		$state      = ($input instanceof Registry) ? $input->get('state') : 1;

		$service = KrFactory::getAdminModel('service')->getItem((int) $service_id);
		if ($service->type != 'c')
		{
			return true;
		}

		if (!$id)
		{
			$xrefs = KrFactory::getListModel('servicexrefs')->getServiceProperty($service_id, $value);
			if (is_countable($xrefs) && count($xrefs))
			{
				KrMethods::message(KrMethods::plain('COM_KNOWRES_SERVICEXREF_ERROR0'), 'error');

				return false;
			}
		}

		if ($state <> 1)
		{
			return true;
		}

		$item = KrFactory::getAdminModel('property')->getItem($value);
		if (!$item->id)
		{
			return true;
		}

		$error = false;
		if (isset($item->channel_name) && strlen($item->channel_name) > 150)
		{
			KrMethods::message(KrMethods::plain('COM_KNOWRES_SERVICEXREF_ERROR6'), 'error');

			$error = true;
		}

		if (!$item->lat
			|| !$item->bedrooms
			|| !$item->sleeps
			|| !$item->p1
			|| !$item->checkin_time
			|| !$item->checkin_time_to
			|| !$item->cancellation_penalty)
		{
			KrMethods::message(KrMethods::plain('COM_KNOWRES_SERVICEXREF_ERROR2'), 'error');

			$error = true;
		}

		if (!is_countable($item->property_features) || !count($item->property_features))
		{
			KrMethods::message(KrMethods::plain('Please add some property amenities'), 'error');

			$error = true;
		}

		if ($service->plugin == 'ha' && (strlen($item->tagline) < 20 || strlen($item->tagline) > 100))
		{
			KrMethods::message(KrMethods::plain('Tagline must be 100 characters or less'), 'error');

			$error = true;
		}

		if (!$item->property_street)
		{
			KrMethods::message(KrMethods::plain('Street must be entered'), 'error');

			$error = true;
		}

		if (!$item->town_id)
		{
			KrMethods::message(KrMethods::plain('Town must be entered'), 'error');

			$error = true;
		}

		if (!$item->country_id)
		{
			KrMethods::message(KrMethods::plain('Country must be entered'), 'error');

			$error = true;
		}

		if (!$item->property_postcode)
		{
			KrMethods::message(KrMethods::plain('Postcode must be entered'), 'error');

			$error = true;
		}

		// Room spaces and bed types
		$entered = false;
		if (!empty($item->bed_types) && is_countable($item->bed_types))
		{
			foreach ($item->bed_types as $d)
			{
				if ((int)$d['room_id'] > 0)
				{
					$bed_types = (int)$d['bed_types'];
					foreach ($bed_types as $b)
					{
						foreach ($b as $n)
						{
							if ($n > 0)
							{
								$entered = true;
								break 3;
							}
						}
					}
				}
			}
		}

		// If no bed types check for rooms and spaces
		if (!$entered)
		{
			$rooms = KrFactory::getListModel('propertyrooms')->getForProperty($value);
			if (!is_countable($rooms) || !count($rooms))
			{
				KrMethods::message(KrMethods::plain('COM_KNOWRES_SERVICEXREF_ERROR2'), 'error');

				$error = true;
			}
		}

		// TODO-v4.3 Set up defaults for these
		$entered = false;
		foreach ($item->cancellation_penalty as $d)
		{
			if ((int) $d->cancellation_penalty_pc > 0)
			{
				$entered = true;
				break;
			}
		}

		if (!$entered)
		{
			KrMethods::message(KrMethods::plain('COM_KNOWRES_SERVICEXREF_ERROR2'), 'error');

			$error = true;
		}

		$soloPath = Media\Images::getImageAbsPath($value, 'solo');
		$soloPath .= "/*.{jpg,gif,png,JPG,GIF,PNG}";
		$files    = glob($soloPath, GLOB_BRACE);
		if (!is_countable($files) || !count($files))
		{
			KrMethods::message(KrMethods::plain('COM_KNOWRES_SERVICEXREF_ERROR3'), 'error');

			$error = true;
		}

		$images = KrFactory::getListModel('images')->getAllForProperty($value);
		if (is_countable($images) && count($images) < 10)
		{
			KrMethods::message(KrMethods::plain('COM_KNOWRES_SERVICEXREF_ERROR4'), 'error');

			$error = true;
		}

		// and the size ......
		$path = Media\Images::getImageAbsPath($value, 'original');
		foreach ($images as $i)
		{
			list($width, $height) = getimagesize($path . '/' . $i->filename);
			if ($width < 1190 || $height < 790)
			{
				KrMethods::message(KrMethods::plain("Image $i->filename is too small width = $width px and height = $height px"),
					'error');
				$error = true;
			}
		}

		// Check for rates
		$rates = KrFactory::getListModel('rates')->getRatesForProperty($value, TickTock::getDate());
		if (!is_countable($rates) || !count($rates))
		{
			KrMethods::message(KrMethods::plain('COM_KNOWRES_SERVICEXREF_ERROR5'), 'error');

			$error = true;
		}

		//Check licence info for RU
		if (!$item->licence_id)
		{
			$country = KrFactory::getAdminModel('country')->getItem($item->country_id);
			if ($country->property_licence)
			{
				KrMethods::message(KrMethods::plain('COM_KNOWRES_SERVICEXREF_ERROR7'), 'error');

				$error = true;
			}
		}

		// Check that guest count for HA does not exceed 10
		if ($service->plugin == 'vrbo')
		{
			foreach ($rates as $r)
			{
				if ($r->ignore_pppn)
				{
					$guests = 1;
				}
				else
				{
					$guests = $r->max_guests;
				}

				$more_guests = Utility::decodeJson($r->more_guests);
				if (is_countable($more_guests))
				{
					foreach ($more_guests as $m)
					{
						if ($m->more_pppn)
						{
							$guests = $guests + 1;
						}
						else
						{
							$guests = $guests + (int)$m->more_max + 1 - (int)$m->more_min;
						}
					}
				}

				if ($guests > 10)
				{
					$element->addAttribute('message',
						KrMethods::plain('Guest numbers in Rates exceeds the limit of 10 imposed by HomeAway. Please consolidate some of the Rates entry lines or use Includes all guests'),
						'error');
					$error = true;
				}
			}
		}

		return !$error;
	}
}