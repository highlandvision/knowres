<?php
/**
 * @package    Know Reservations
 * @subpackage Library
 * @copyright  2017 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\KR\Core;

defined('_JEXEC') or die;

//use Exception;
//use HighlandVision\KR\Framework\KrFactory;
//use HighlandVision\KR\Hub;
//
//use function defined;

//TODO-v4.1 JSA

/**
 * Enquiry quote requests
 *
 * @since 3.2.0
 */
class Enquiry
{
	//	/** @var Hub Hub data. */
	//	protected Hub $hub;
	//
	//	/**
	//	 * Action guest confirm
	//	 *
	//	 * @param  Hub  $Hub  Hub data
	//	 *
	//	 * @throws Exception
	//	 * @since  1.0.0
	//	 * @return bool
	//	 */
	//	public function action(Hub $Hub): bool
	//	{
	//		$this->hub = $Hub;
	//		$this->setValues();
	//
	//		return $this->saveAll();
	//
	//		// Get session data
	//		$this->getContractSession();
	//
	//		// Set form data
	//		$this->setFormData($form_data);
	//
	//		$this->setPropertyId($this->form_data['property_id']);
	//		$this->setArrival($this->form_data['arrival']);
	//		$this->setDeparture($this->form_data['departure']);
	//
	//		$this->getSettings();
	//	}
	//
	//	/**
	//	 * Returns the tag generated for the contract
	//	 *
	//	 * @return string
	//	 * @since 3.2.0
	//	 */
	//	public function getTag()
	//	{
	//		return $this->contract['tag'] ?? "";
	//	}
	//
	//	/**
	//	 * Does the post save processing, only emails for an enquiry
	//	 *
	//	 * @since 3.2.0
	//	 */
	//	public function postSave()
	//	{
	//		$KnowresEmailContractHelper = new Email("GUESTENQUIRY", $this->id);
	//	}
	//
	//	/**
	//	 * Controls the save and processing for the contract
	//	 *
	//	 * @since 3.2.0
	//	 * @throws Exception
	//	 */
	//	public function saveAll()
	//	{
	//		$success  = true;
	//		$this->id = 0;
	//
	//		if (!$this->validateGuest())
	//		{
	//			return false;
	//		}
	//
	//		if (!$this->validateContract())
	//		{
	//			return false;
	//		}
	//
	//		if (!$this->validateGuestNote())
	//		{
	//			return false;
	//		}
	//
	//		try
	//		{
	//			$db = KrFactory::getDatabase();
	//			$db->transactionStart();
	//
	//			if (!$this->saveGuest())
	//			{
	//				return false;
	//			}
	//
	//			// Save the newly created guest id
	//			$this->contract['guest_id'] = $this->guest_id;
	//
	//			if (!$this->saveContract())
	//			{
	//				return false;
	//			}
	//
	//			if ($this->form_data['guest_note'])
	//			{
	//				if (!$this->saveContractNote($this->guest_note))
	//				{
	//					return false;
	//				}
	//			}
	//
	//			$db->transactionCommit();
	//		}
	//		catch (Exception $e)
	//		{
	//			$db->transactionRollback();
	//
	//			$this->errors[] = JText::_('saveAll() failed for channnel');
	//			$this->errors[] = $e->getMessage();
	//
	//			return false;
	//		}
	//
	//		$this->errors[] = JText::_('COM_KNOWRES_INTERFACE_LOG_SUCCESS');
	//
	//		if (isset($this->form_data['note']) && $this->form_data['note'])
	//		{
	//			KnowresContractCommonHelper::createContractNote($this->id, $this->form_data['note']);
	//		}
	//
	//		if (!$this->linkedProperties())
	//		{
	//			return false;
	//		}
	//
	//		return $this->id;
	//	}
	//
	//	/**
	//	 * Get the input data and set fields
	//	 *
	//	 * @param array $data Dummy form data to match global declaration
	//	 *
	//	 * @since 3.2.0
	//	 */
	//	protected function setFormData($data = array())
	//	{
	//		$this->form_data                  = $data;
	//		$this->form_data['black_booking'] = 0;
	//
	//		$this->setBlackBooking(0);
	//	}
	//
	//	/**
	//	 * @param $form
	//	 *
	//	 * @return mixed
	//	 * @since 1.0.0
	//	 */
	//	protected function setGuestRequired($form)
	//	{
	//		if ((int) $this->settings['bookingform_requiredfields_address1'] != 2)
	//		{
	//			$form->setFieldAttribute(
	//				'address1', 'required',
	//				(int) $this->settings['bookingform_requiredfields_address1'] ? 'true' : 'false');
	//		}
	//		else
	//		{
	//			$form->setFieldAttribute('address1', 'required', 'false');
	//		}
	//
	//		if ((int) $this->settings['bookingform_requiredfields_country'] != 2)
	//		{
	//			$form->setFieldAttribute(
	//				'country_id', 'required',
	//				(int) $this->settings['bookingform_requiredfields_country'] ? 'true' : 'false');
	//		}
	//		else
	//		{
	//			$form->setFieldAttribute('country_id', 'required', 'false');
	//		}
	//
	//		if ((int) $this->settings['bookingform_requiredfields_email'] != 2)
	//		{
	//			$form->setFieldAttribute(
	//				'email', 'required', (int) $this->settings['bookingform_requiredfields_email'] ? 'true' : 'false');
	//		}
	//		else
	//		{
	//			$form->setFieldAttribute('email', 'required', 'false');
	//		}
	//
	//		if ((int) $this->settings['bookingform_requiredfields_firstname'] != 2)
	//		{
	//			$form->setFieldAttribute('firstname', 'required', 'true');
	//		}
	//		else
	//		{
	//			$form->setFieldAttribute('firstname', 'required', 'false');
	//		}
	//
	//		if ((int) $this->settings['bookingform_requiredfields_mobile'] != 2)
	//		{
	//			$form->setFieldAttribute(
	//				'mobile_country_id', 'required',
	//				(int) $this->settings['bookingform_requiredfields_mobile'] ? 'true' : 'false');
	//			$form->setFieldAttribute(
	//				'mobile', 'required', (int) $this->settings['bookingform_requiredfields_mobile'] ? 'true' : 'false');
	//		}
	//		else
	//		{
	//			$form->setFieldAttribute('mobile_country_id', 'required', 'false');
	//			$form->setFieldAttribute('mobile', 'required', 'false');
	//		}
	//
	//		if ((int) $this->settings['bookingform_requiredfields_postcode'] != 2)
	//		{
	//			$form->setFieldAttribute(
	//				'postcode', 'required',
	//				(int) $this->settings['bookingform_requiredfields_postcode'] ? 'true' : 'false');
	//		}
	//		else
	//		{
	//			$form->setFieldAttribute('postcode', 'required', 'false');
	//		}
	//
	//		if ((int) $this->settings['bookingform_requiredfields_region'] != 2)
	//		{
	//			$form->setFieldAttribute(
	//				'region_id', 'required', (int) $this->settings['bookingform_requiredfields_region'] ? 'true' : 'false');
	//		}
	//		else
	//		{
	//			$form->setFieldAttribute('region_id', 'required', 'false');
	//		}
	//
	//		if ((int) $this->settings['bookingform_requiredfields_surname'] != 2)
	//		{
	//			$form->setFieldAttribute(
	//				'surname', 'required', (int) $this->settings['bookingform_requiredfields_surname'] ? 'true' : 'false');
	//		}
	//		else
	//		{
	//			$form->setFieldAttribute('surname', 'required', 'false');
	//		}
	//
	//		if ((int) $this->settings['bookingform_requiredfields_town'] != 2)
	//		{
	//			$form->setFieldAttribute(
	//				'town', 'required', (int) $this->settings['bookingform_requiredfields_town'] ? 'true' : 'false');
	//		}
	//		else
	//		{
	//			$form->setFieldAttribute('town', 'required', 'false');
	//		}
	//
	//		$form->setFieldAttribute('b_address1', 'required', 'false');
	//		$form->setFieldAttribute('b_town', 'required', 'false');
	//		$form->setFieldAttribute('b_country_id', 'required', 'false');
	//
	//		return $form;
	//	}
	//
	//	/**
	//	 * Validates the contract data
	//	 *
	//	 * @return bool
	//	 * @since 3.2.0
	//	 */
	//	protected function validateContract()
	//	{
	//		// Get the form Data
	//		$this->contract = array_merge($this->contract_session, $this->form_data);
	//
	//		$this->contract['id']             = 0;
	//		$this->contract['state']          = 1;
	//		$this->contract['created_at']     = KnowresCommonHelper::getTS();
	//		$this->contract['currency']       = $this->settings['currency'];
	//		$this->contract['expiry_days']    = $this->settings['expiry_days'];
	//		$this->contract['balance_days']   = $this->settings['balance_days'];
	//		$this->contract['booking_status'] = 0;
	//		$this->contract['tag']            = $this->setTag();
	//
	//		// Frig validation for guest_id
	//		if (!$this->contract['guest_id'])
	//		{
	//			$this->contract['guest_id'] = 1;
	//		}
	//
	//		// Set non enterable fields
	//		// Expiry and balance date
	//		$this->contract['expiry_date']  = $this->calcExpiryDate($this->contract['expiry_days']);
	//		$this->contract['balance_date'] = $this->calcBalanceDate(
	//			$this->contract['expiry_date'], $this->contract['balance_days']);
	//
	//		$this->contract['manager_id'] = $this->settings['default_manager'];
	//
	//		// get the agency from the manager
	//		if ($this->settings['default_manager'])
	//		{
	//			$modelManagers               = new KnowresModelManagers();
	//			$this->contract['agency_id'] = $modelManagers->getAgency($this->settings['default_manager']);
	//		}
	//
	//		// Generate qkey
	//		$hash                   = $this->contract['tag'] . $this->contract['guest_id'];
	//		$this->contract['qkey'] = hash("ripemd160", $hash);
	//
	//		// get the contract form
	//		$modelContract = JModelLegacy::getInstance('Contract', 'KnowresModel');
	//		$form          = $modelContract->getForm($this->contract);
	//
	//		// filter and validate
	//		$valid_data = $form->validate($this->contract);
	//
	//		// Check for validation errors.
	//		if ($valid_data === false)
	//		{
	//			// Get the validation messages.
	//			$this->errors = $form->getErrors();
	//
	//			return false;
	//		}
	//
	//		return true;
	//	}
	//
	//	/**
	//	 * @return bool
	//	 * @since 1.0.0
	//	 */
	//	protected function validateGuest()
	//	{
	//		$this->guest                = $this->form_data;
	//		$this->guest['id']          = 0;
	//		$this->guest['user_id']     = 0;
	//		$this->guest['state']       = 1;
	//		$this->guest['created_at']  = KnowresCommonHelper::getTS();
	//		$this->guest['property_id'] = $this->property_id;
	//
	//		// get the guest form
	//		$modelGuest = JModelLegacy::getInstance('Guest', 'KnowresModel');
	//		$form       = $modelGuest->getForm($this->guest);
	//
	//		// Set required attributes on / off as per settings
	//		$form = $this->setGuestRequired($form);
	//
	//		// filter and validate
	//		$valid_data = $form->validate($this->guest);
	//
	//		// Check for validation errors.
	//		if ($valid_data === false)
	//		{
	//			// Get the validation messages.
	//			$this->errors = $form->getErrors();
	//
	//			return false;
	//		}
	//
	//		return true;
	//	}
	//
	//	/**
	//	 * Validates the guest note (if entered)
	//	 *
	//	 * @return bool
	//	 * @since 3.2.0
	//	 */
	//	protected function validateGuestNote()
	//	{
	//		if ($this->form_data['guest_note'])
	//		{
	//			$this->guest_note                = $this->form_data;
	//			$this->guest_note['id']          = 0;
	//			$this->guest_note['contract_id'] = 1;
	//			$this->guest_note['note']        = $this->form_data['guest_note'];
	//			$this->guest_note['note_type']   = array(
	//				"0",
	//				"1"
	//			);
	//			$this->guest_note['created_at']  = KnowresCommonHelper::getTS();
	//
	//			return $this->validateNote($this->guest_note);
	//		}
	//
	//		return true;
	//	}
	//
	//	/**
	//	 * Validates the payment data if required
	//	 *
	//	 * @return bool
	//	 * @since 3.2.0
	//	 */
	//	protected function validatePayment()
	//	{
	//		// Is some are set then all must be set
	//		if (!$this->form_data['cc_number'])
	//		{
	//			$this->errors[] = "Credit card number not sent by channel";
	//		}
	//		//		if (!$this->form_data['cc_ccv'])
	//		//		{
	//		//			$this->errors[] = "Credit card CCV missing from channel";
	//		//		}
	//		if (!$this->form_data['cc_month'])
	//		{
	//			$this->errors[] = "Credit card expiry month missing from channel";
	//		}
	//		if (!$this->form_data['cc_year'])
	//		{
	//			$this->errors[] = "Credit card expiry year data missing from channel";
	//		}
	//
	//		if (count($this->errors))
	//		{
	//			return false;
	//		}
	//
	//		return true;
	//	}
}