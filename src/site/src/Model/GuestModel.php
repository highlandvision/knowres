<?php
/**
 * @package    Know Reservations
 * @subpackage Site Controllers
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Site\Model;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\Component\Knowres\Administrator\Model\GuestModel as AdminGuestModel;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\TickTock;
use HighlandVision\KR\Utility;
use Joomla\CMS\Form\Form;
use stdClass;
use UnexpectedValueException;

use function count;

/**
 * Site guest form model
 *
 * @since 2.5.0
 */
class GuestModel extends AdminGuestModel
{
	/**
	 * Override checkout for guestdata as checked_out set to 0.
	 *
	 * @param  int|null  $pk  The id of the row to check out.
	 *
	 * @throws Exception
	 * @since  4.0.0
	 * @return bool  True on success, false on failure
	 */
	public function checkout($pk = null): bool
	{
		if (!empty($pk))
		{
			$update                   = new stdClass();
			$update->id               = $pk;
			$update->checked_out      = 0;
			$update->checked_out_time = TickTock::getTs();
			KrFactory::update('guest', $update);
		}

		return true;
	}

	/**
	 * Method to validate the form data.
	 *
	 * @param  Form     $form      The form to validate against.
	 * @param  array    $data      The data to validate.
	 * @param  ?string  $group     The name of the field group to validate.
	 * @param  array    $settings  Property settings
	 *
	 * @throws Exception
	 * @since  1.0.0
	 * @return array|bool  Array of filtered data if valid, false otherwise.
	 */
	public function validate($form, $data, $group = null, array $settings = []): array|bool
	{
		$data['telephone'] = Utility::encodeJson(KrMethods::inputArray('telephone'));

		if (is_countable($settings) && count($settings))
		{
			$form = $this->setFormRequired($form, $settings);
		}

		return parent::validate($form, $data, $group);
	}

	/**
	 * Method to get the data that should be injected in the form.
	 *
	 * @throws Exception
	 * @since  1.6
	 * @return mixed The data for the form.
	 */
	protected function loadFormData(): mixed
	{
		$data = KrMethods::getUserState('com_knowres.edit.guestform.data', []);
		if (empty($data))
		{
			$data = $this->getItem();
		}

		return $data;
	}

	/**
	 * Set the required fields for the manager guest form (from settings)
	 *
	 * @param  Form   $form      Guest form
	 * @param  array  $settings  Property settings
	 *
	 * @throws UnexpectedValueException
	 * @since  4.0.0
	 * @return Form
	 */
	public function setFormRequired(Form $form, array $settings): Form
	{
		$form = $this->setAttribute($settings['bookingform_requiredfields_firstname'], 'firstname', $form);
		$form = $this->setAttribute($settings['bookingform_requiredfields_surname'], 'surname', $form);
		$form = $this->setAttribute($settings['bookingform_requiredfields_mobile'], 'mobile_country_id', $form);
		$form = $this->setAttribute($settings['bookingform_requiredfields_mobile'], 'mobile', $form);
		$form = $this->setAttribute($settings['bookingform_requiredfields_address1'], 'address1', $form);
		$form = $this->setAttribute($settings['bookingform_requiredfields_address1'], 'address2', $form);
		if ($settings['bookingform_requiredfields_address1'] < 2)
		{
			$form->setFieldAttribute('address2', 'required', false);
		}

		$form = $this->setAttribute($settings['bookingform_requiredfields_town'], 'town', $form);
		$form = $this->setAttribute($settings['bookingform_requiredfields_postcode'], 'postcode', $form);
		$form = $this->setAttribute($settings['bookingform_requiredfields_region'], 'region_id', $form);

		return $this->setAttribute($settings['bookingform_requiredfields_region'], 'country_id', $form);
	}
}