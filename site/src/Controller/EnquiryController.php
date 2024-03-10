<?php
/**
 * @package    Know Reservations
 * @subpackage Site Controller
 * @copyright  2017 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Site\Controller;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\Component\Knowres\Administrator\Model\PropertyModel;
use HighlandVision\Component\Knowres\Site\Model\EnquiryModel;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Joomla\Extend\FormController;
use HighlandVision\KR\SiteHelper;
use Joomla\CMS\Factory;
use Joomla\CMS\MVC\Model\BaseDatabaseModel;
use ReCaptcha\ReCaptcha;
use ReCaptcha\RequestMethod\CurlPost;

/**
 * Enquiry controller - Creates contract with enquiry details
 *
 * @since   3.2.0
 */
class EnquiryController extends FormController
{
	/**
	 * Proxy for getModel
	 *
	 * @param  string  $name    Name of model
	 * @param  string  $prefix  Prefix Admin or Site
	 * @param  array   $config  Config options
	 *
	 * @since   3.2.0
	 * @return BaseDatabaseModel
	 */
	public function getModel($name='enquiry', $prefix='Site', $config=['ignore_request' => true]):BaseDatabaseModel
	{
		return parent::getModel($name, $prefix);
	}

	/**
	 * Enquiry form submitted
	 *
	 * @throws Exception
	 * @since  3.2.0
	 * @return bool|void
	 */
	public function submit()
	{
		$this->checkToken();

		/** @var EnquiryModel $model */
		$model = $this->getModel();

		$massaged    = KrMethods::inputArray('jform');
		$property_id = $massaged['property_id'];
		/** @var PropertyModel $propertyModel */
		$propertyModel = $this->getModel('property');
		$property      = $propertyModel->getItem($property_id);

		$guest_data              = $model->prepareGuestTypes(json_decode($property->guest_types, true));
		$massaged['guest_types'] = json_encode($guest_data[0]);
		$massaged['guests']      = $guest_data[1];

		$massaged['rooms']  = json_encode($model->prepareRooms(json_decode($property->rooms, true)));
		$massaged['extras'] = json_encode($model->prepareExtras());

		$date                = DateTime::createFromFormat('d/m/Y', $massaged['arrival']);
		$massaged['arrival'] = $date->format('Y-m-d');

		$date                  = DateTime::createFromFormat('d/m/Y', $massaged['departure']);
		$massaged['departure'] = $date->format('Y-m-d');
		KrMethods::setUserState('com_knowres.enquiry.data', $massaged);

		$gresponse = $this->input->post->getString('g-recaptcha-response', "");
		$params    = KrMethods::getParams();
		$return    = SiteHelper::buildPropertyLink($property_id);

		if (isset($gresponse)) {
			require_once(JPATH_LIBRARIES . '/knowres/vendor/autoload.php');

			// If the form submission includes the "g-captcha-response" field
			// Create an instance of the service using secret
			//			$recaptcha = new \ReCaptcha\ReCaptcha($params->get('grsecretkey', ''));
			$recaptcha = new ReCaptcha($params->get('grsecretkey', ''), new CurlPost());
			$resp      = $recaptcha->verify($gresponse, $_SERVER['REMOTE_ADDR']);

			if (!$resp->isSuccess()) {
				// If it's not successful, then one or more error codes will be returned.
				$errors[] = KrMethods::plain('Please check the ReCaptcha entry box');
				foreach ($resp->getErrorCodes() as $code) {
					$errors[] = $code;
				}

				// Push up to three validation messages out to the user.
				for ($i = 0, $n = count($errors); $i < $n && $i < 3; $i++) {
					KrMethods::message($errors[$i], 'alert');
				}

				$this->setRedirect($return);

				return false;
			}
		}

		// Save the contract details
		$KnowresReservationSaveEnquiryHelper = new KnowresReservationSaveEnquiryHelper('enquiry', $massaged);
		$result                              = $KnowresReservationSaveEnquiryHelper->saveAll();

		// Oops an error
		if (!$result) {
			$errors = $KnowresReservationSaveEnquiryHelper->getErrors();

			// Push errors to user
			foreach ($errors as $e) {
				Factory::getApplication()->enqueueMessage($e, 'alert');
			}

			$this->setRedirect($return);

			return false;
		}

		// Get the reference to display to the user
		$tag = $KnowresReservationSaveEnquiryHelper->getTag();
		$KnowresReservationSaveEnquiryHelper->postSave();

		KrMethods::setUserState('com_knowres.enquiry.data', null);

		$message = KrMethods::sprintf('COM_KNOWRES_ENQUIRY_THANKS_REFERENCE', $tag);
		Factory::getApplication()->enqueueMessage($message, "success");
		$this->setRedirect($return);
	}
}