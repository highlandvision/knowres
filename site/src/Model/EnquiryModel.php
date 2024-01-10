<?php
/**
 * @package    Know Reservations
 * @subpackage Site Model
 * @copyright  2017 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Site\Model;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Joomla\Extend\AdminModel;
use Joomla\CMS\Form\Form;

/**
 * Enquiry model
 *
 * @since 3.2.0
 */
class EnquiryModel extends AdminModel
{
	/**
	 * Method to get the enquiry form. The base form is loaded from XML
	 *
	 * @param  array    $data      An optional array of data for the form to interogate.
	 * @param  boolean  $loadData  True if the form is to load its own data (default case), false if not.
	 *
	 * @throws Exception
	 * @since  3.2.0
	 * @return Form|false    A Form object on success, false on failure
	 */
	public function getForm($data = [], $loadData = true, ?string $source = null): Form|false
	{
		$form = $this->loadForm('com_knowres.enquiry', 'enquiry', ['control' => 'jform', 'load_data' => $loadData]);
		if (empty($form)) {
			return false;
		}

		return $form;
	}

	/**
	 * Prepare extras
	 *
	 * @throws Exception
	 * @since  3.2.0
	 * @return array
	 */
	public function prepareExtras(): array
	{
		$extra_quantity = KrMethods::inputArray('extraquantity');
		$extra_id       = KrMethods::inputArray('extraid');

		$extras = [];
		for ($i = 0; $i < count($extra_id); $i++) {
			if ((int) $extra_id[$i] > 0 && isset($extra_quantity[$i])) {
				$extras[(int) $extra_id[$i]] = [
					'quantity' => $extra_quantity[$i] == 'on' ? '1' : (string) $extra_quantity[$i],
					'value'    => 0
				];
			}
		}

		return $extras;
	}

	/**
	 * Prepare guest types
	 *
	 * @param  array  $property_guest_types  Property guest types
	 *
	 * @throws Exception
	 * @since  3.2.0
	 * @return array
	 */
	public function prepareGuestTypes(array $property_guest_types): array
	{
		$total = 0;
		$input = KrMethods::inputArray('guest_types');

		$guest_types = [];
		for ($i = 0; $i < count($input); $i++) {
			$guest_types[] = [
				'type'   => isset($property_guest_types[$i]['type']) ? (string) $property_guest_types[$i]['type'] : '',
				'number' => (int) $input[$i]
			];

			$total += (int) $input[$i];
		}

		return [
			$guest_types,
			$total
		];
	}

	/**
	 * Prepare the rooms from the entered data
	 *
	 * @param  array  $property_rooms  Property rooms
	 *
	 * @throws Exception
	 * @since  3.2.0
	 * @return array
	 */
	public function prepareRooms(array $property_rooms): array
	{
		$input = KrMethods::inputArray('rooms');

		$rooms = [];
		for ($i = 0; $i < count($input); $i++) {
			$rooms[] = [
				'room_id' => !isset($property_rooms[$i]['room_id']) ? (int) $property_rooms[$i]['room_id'] : 0,
				'number'  => (int) $input[$i]
			];
		}

		return $rooms;
	}

	/**
	 * Method to get the data that should be injected in the form.
	 *
	 * @throws Exception
	 * @since  1.0.0
	 * @return mixed    The data for the form
	 */
	protected function loadFormData(): mixed
	{
		return KrMethods::getUserState('com_knowres.enquiry.data', []);
	}
}