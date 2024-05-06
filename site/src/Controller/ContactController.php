<?php
/**
 * @package    Know Reservations
 * @subpackage Site Controller
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Site\Controller;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Email\ContactEmail;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\SiteHelper;
use HighlandVision\KR\TickTock;
use HighlandVision\KR\Translations;
use HighlandVision\KR\Utility;
use Joomla\CMS\Factory;
use Joomla\CMS\MVC\Controller\FormController;
use Joomla\CMS\MVC\Model\BaseDatabaseModel;
use Joomla\CMS\String\PunycodeHelper;
use Joomla\Registry\Registry;
use ReCaptcha\ReCaptcha;
use RuntimeException;

/**
 * Contact controller - sends email enquiry only no contract
 *
 * @since   1.0.0
 */
class ContactController extends FormController
{
	/**
	 * Method to cancel an edit.
	 *
	 * @param  string  $key  The name of the primary key of the URL variable.
	 *
	 * @throws Exception
	 * @since  1.6
	 * @return bool  True if access level checks pass, false otherwise.
	 */
	public function cancel($key = null): bool
	{
		$id = KrMethods::inputInt('id');
		if ($id) {
			KrMethods::redirect(SiteHelper::buildPropertyLink($id));
		} else {
			$Itemid = SiteHelper::getItemId('com_knowres', 'properties');
			KrMethods::redirect(KrMethods::route('index.php?Itemid=' . $Itemid, false));
		}

		return true;
	}

	/**
	 * Proxy for getModel
	 *
	 * @param  string  $name    Name of model
	 * @param  string  $prefix  Prefix Admin or Site
	 * @param  array   $config  Config options
	 *
	 * @since  1.0.0
	 * @return BaseDatabaseModel
	 */
	public function getModel($name = 'contact', $prefix = 'Site',
	                         $config = ['ignore_request' => true]): BaseDatabaseModel
	{
		return parent::getModel($name, $prefix, $config);
	}

	/**
	 * Validates the submitted form
	 *
	 * @throws Exception
	 * @since  1.0.0
	 * @return void
	 */
	public function submit(): void
	{
		$this->checkToken();

		$id   = KrMethods::inputInt('id');
		$data = KrMethods::inputArray('jform');

		$params    = KrMethods::getParams();
		$Itemid    = SiteHelper::getItemId('com_knowres', 'contact');
		$return    =
			KrMethods::route('index.php?option=com_knowres&view=contact&Itemid=' . $Itemid . '&id=' . $id, false);
		$return_ok =
			KrMethods::route('index.php?option=com_knowres&view=contact&sent=1&Itemid=' . $Itemid . '&id=' . $id,
			                 false);

		$session = Factory::getSession();
		if ($session->getState() !== 'active') {
			KrMethods::setUserState('com_knowres.contact.data', $data);
			KrMethods::redirect($return);
		}

		$model = KrFactory::getSiteModel('contact');
		$form  = $model->getForm();
		if (!$model->validate($form, $data)) {
			Utility::pageErrors($model->getErrors());
			KrMethods::setUserState('com_knowres.contact.data', $data);
			KrMethods::redirect($return);
		}

		$errors = $this->checkReCaptcha($params);
		if (is_countable($errors) && count($errors)) {
			Utility::pageErrors($errors);
			KrMethods::setUserState('com_knowres.contact.data', $data);
			KrMethods::redirect($return);
		}

		$this->sendEmail($data, $id);

		KrMethods::message(KrMethods::plain('COM_KNOWRES_CONTACT_THANKS'));
		KrMethods::setUserState('com_knowres.contact.data', null);
		$this->setRedirect($return_ok);
	}

	/**
	 * Check the recaptcha box
	 *
	 * @param  Registry  $params  KR params
	 *
	 * @throws RuntimeException
	 * @since  1.2.0
	 * @return array
	 */
	private function checkRecaptcha(Registry $params): array
	{
		$errors    = [];
		$gresponse = $this->input->post->getString('g-recaptcha-response', '');
		if (!$gresponse) {
			$errors[] = KrMethods::plain('Please complete the ReCaptcha entry box');
		} else {
			$recaptcha = new ReCaptcha($params->get('grsecretkey'));
			$resp      = $recaptcha->verify($gresponse, $_SERVER['REMOTE_ADDR']);
			if (!$resp->isSuccess()) {
				$errors[] = KrMethods::plain('Please check the ReCaptcha entry box');
				foreach ($resp->getErrorCodes() as $code) {
					$errors[] = $code;
				}
			}
		}

		return $errors;
	}

	/**
	 * @param  array  $data  Input from form data
	 * @param  int    $id    ID of property
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	private function sendEmail(array $data, int $id = 0): void
	{
		$arrival = '--';
		$day     = $data['day'];
		$month   = $data['month'];
		if ($month) {
			$year  = substr($month, 0, 4);
			$month = substr($month, 4, 2);
			$day   = $day ?: 0;
			if ($day) {
				$arrival = $year . '-' . $month . '-' . $day;
				$arrival = TickTock::displayDate($arrival);
			} else {
				$arrival = $year . '-' . $month;
				$arrival = TickTock::parseString($arrival, 'F Y');
			}
		}

		$input                 = [];
		$input['ARRIVAL']      = $arrival;
		$input['REQNAME']      = $data['contact_name'];
		$input['REQEMAIL']     = PunycodeHelper::emailToPunycode($data['contact_email']);
		$input['REQCOUNTRY']   = Translations::getCountryName($data['contact_country']);
		$input['REQPHONE']     = $data['contact_phone'];
		$input['REQMESSAGE']   = $data['message'];
		$input['MESSAGE']      = $data['message'];
		$input['#NIGHTS']      = $data['nights'];
		$input['#ADULTS']      = $data['guests'];
		$input['#CHILDREN']    = $data['children'];
		$input['CHILDAGES']    = $data['ages'];
		$input['BUDGET']       = $data['budget'] ?? "--";
		$input['PROPERTYNAME'] = $data['property_name'] ?? '--';
		$input['LOCATION']     = $data['region'] ?? '--';

		$email = new ContactEmail('BOOKENQUIRY');
		$email->sendTheEmails($id, $input);
	}
}