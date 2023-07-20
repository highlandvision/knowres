<?php
/**
 * @package    Know Reservations
 * @subpackage Admin Controllers
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Administrator\Controller;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\Component\Knowres\Administrator\Model\ContractsModel;
use HighlandVision\Component\Knowres\Administrator\Model\OwnerpaymentsModel;
use HighlandVision\Component\Knowres\Administrator\Model\PropertyModel;
use HighlandVision\Component\Knowres\Administrator\Model\PropertysettingsModel;
use HighlandVision\Component\Knowres\Administrator\View\Property\CalendarView;
use HighlandVision\Component\Knowres\Administrator\View\Property\DashboardView;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Joomla\Extend\FormController;
use HighlandVision\KR\Logger;
use HighlandVision\KR\Media;
use HighlandVision\KR\Property\Cloner;
use HighlandVision\KR\Session as KrSession;
use HighlandVision\KR\SiteHelper;
use HighlandVision\KR\TickTock;
use HighlandVision\KR\Translations;
use HighlandVision\KR\Utility;
use JetBrains\PhpStorm\NoReturn;
use Joomla\CMS\MVC\Model\BaseDatabaseModel;
use Joomla\CMS\MVC\View\ViewInterface;
use Joomla\CMS\Response\JsonResponse;
use RuntimeException;
use stdClass;

use function file_get_contents;
use function jexit;
use function trim;
use function urlencode;

/**
 * Property controller form class.
 *
 * @since 1.0.0
 */
class PropertyController extends FormController
{
	/**
	 * Geocode address data
	 *
	 * @param  string  $address  Address string
	 *
	 * @since 1.0.0
	 * @return array|bool
	 */
	public static function geoCodeAddress(string $address): array|bool
	{
		$response        = [];
		$key             = KrMethods::getParams()->get('gmapkey', '');
		$address         = urlencode($address);
		$url             = 'https://maps.googleapis.com/maps/api/geocode/json?address=' . $address . '&key=' . $key;
		$geocodeResponse = Utility::decodeJson(file_get_contents($url));
		if ($geocodeResponse->status == 'OK') {
			foreach ($geocodeResponse->results as $result) {
				$response['lat'] = $result->geometry->location->lat;
				$response['lng'] = $result->geometry->location->lng;
			}

			return $response;
		}

		return false;
	}

	/**
	 * Set the property to approved
	 *
	 * @throws Exception
	 * @since  3.0.0
	 */
	public function approve(): void
	{
		$this->checkToken('get');

		$id = $this->input->getInt('id', 0);
		if (empty($id)) {
			Logger::logme('ID not received for property approval', 'error');
			KrMethods::message(KrMethods::plain('COM_KNOWRES_ERROR_TRY_AGAIN'));
		}
		else {
			$data           = new stdClass();
			$data->id       = $id;
			$data->approved = 1;
			KrFactory::update('property', $data);

			KrMethods::message(KrMethods::plain('COM_KNOWRES_ACTION_SUCCESS'));
		}

		KrMethods::redirect(KrMethods::route('index.php?option=com_knowres&task=contracts.daily', false));
	}

	/**
	 * Display property calendar
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	#[NoReturn] public function calendar(): void
	{
		$id = KrMethods::inputInt('property_id', 0, 'get');
		if (empty($id)) {
			Utility::goto('properties');
		}
		$item = KrFactory::getAdminModel('property')->getItem($id);
		if (empty($item->id)) {
			KrMethods::redirect(KrMethods::route('index.php?option=com_knowres&view=properties', false));
		}

		/** @var CalendarView $view */
		$view       = $this->getView('property', 'calendar');
		$view->item = $item;
		$view       = $this->setAccess($view);
		$view->display();
	}

	/**
	 * Check in a property from dashboard
	 *
	 * @throws Exception
	 * @since  3.0.0
	 */
	public function checkin(): void
	{
		$id = KrMethods::inputInt('id', 0, 'get');
		if (!$id) {
			Logger::logme('ID not received for property checkin', 'error');
			KrMethods::message(KrMethods::plain('COM_KNOWRES_ERROR_TRY_AGAIN'));
			KrMethods::redirect(KrMethods::route('index.php?option=com_knowres&view=properties', false));
		}
		else {
			$this->setRedirect(KrMethods::route('index.php?option=com_knowres&task=property.dashboard&id=' . $id,
				false));

			/** @var PropertyModel $model */
			$model = $this->getModel();
			if (!$model->checkin($id)) {
				KrMethods::message($model->getError(), 'error');
			}
			else {
				KrMethods::message(KrMethods::plain('COM_KNOWRES_ITEM_CHECKED_IN'));
			}
		}
	}

	/**
	 * An Ajax method to clone a property
	 *
	 * @throws Exception
	 * @since  3.0.0
	 */
	#[NoReturn] public function cloner(): void
	{
		$jform         = KrMethods::inputArray('jform');
		$id            = (int) $jform['id'];
		$property_name = (string) $jform['property_name'];

		// Second plus time around will be empty first call
		$type  = KrMethods::inputString('type', '');
		$newid = KrMethods::inputInt('newid');

		$Cloner = new Cloner($id, $property_name);
		if ($id && !$newid && $type == '') {
			$newid = $Cloner->cloneProperty($jform);
			if (!$newid) {
				echo false;
			}
			else {
				echo $newid;
			}
		}
		else if ($id && $newid && $type != '') {
			$Cloner->clonePropertyChild($newid, $type, $jform);
		}

		jexit();
	}

	/**
	 * Return regions combo
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	#[NoReturn] public function combo(): void
	{
		$model     = new PropertyModel();
		$form      = $model->getForm([], false);
		$parent_id = KrMethods::inputInt('parent');
		$target    = KrMethods::inputString('target');

		if ($target == 'region_id') {
			$form->setValue('country_id', null, $parent_id);
		}
		else if ($target == 'town_id') {
			$form->setValue('region_id', null, $parent_id);
		}

		$wrapper         = [];
		$wrapper['html'] = $form->getInput($target);

		echo new JsonResponse($wrapper);
		jexit();
	}

	/**
	 * Returns the dashboard data.
	 *
	 * @throws Exception
	 * @since  3.0.0
	 */
	#[NoReturn] public function dashboard(): void
	{
		$id = KrMethods::inputInt('id', 0, 'get');
		if (!$id) {
			Utility::goto('properties');
		}

		/** @var DashboardView $view */
		$view       = $this->getView('property', 'dashboard');
		$view->item = KrFactory::getListModel('properties')->getForDashboard($id);
		/** @var PropertysettingsModel $view - >settings */
		$view->settings = KrFactory::getListModel('propertysettings')->getPropertysettings($id);
		$view           = $this->setAccess($view);

		$created_at = TickTock::modifyYears('now', 1, '-');
		/** @var ContractsModel $view - >latest */
		$view->latest = KrFactory::getListModel('contracts')->getLatestForProperty($id, $created_at, $view->today);
		/** @var ContractsModel $view - >upcoming */
		$view->upcoming = KrFactory::getListModel('contracts')->getUpcomingForProperty($id, $view->today);

		$Itemid             = SiteHelper::getItemId('com_knowres', 'property', ['id' => 0]);
		$view->preview_link = KrMethods::route(KrMethods::getRoot() . 'index.php?option=com_knowres&view=property&layout=preview&id=' . $id . '&Itemid=' . $Itemid);
		$view->edit_link    = KrMethods::route('index.php?option=com_knowres&task=property.edit&id=' . $id);

		if ($view->item->owner_id) {
			$view->owner = KrFactory::getAdminModel('owner')->getItem($view->item->owner_id);
		}
		if ($view->item->ownerpayments) {
			/** @var OwnerpaymentsModel $view - >ownerpayments */
			$view->ownerpayments = KrFactory::getListModel('services')->getGateways(null, 0, $id);
		}
		if ($view->item->channels) {
			$view->channels = KrFactory::getListModel('servicexrefs')->getChannels($id, true);
		}

		$view->display();
	}

	/**
	 * Delete property pdf files
	 *
	 * @throws Exception
	 * @since        1.0.0
	 * @noinspection PhpUnused
	 */
	public function delpdf(): void
	{
		$this->checkToken();

		$id = $this->input->getInt('id', 0);
		if (!$id) {
			Logger::logme('ID not received for property delete PDF', 'error');
			KrMethods::message(KrMethods::plain('COM_KNOWRES_ERROR_TRY_AGAIN'));
			KrMethods::redirect(KrMethods::route('index.php?option=com_knowres&view=properties', false));
		}
		else {
			$this->setRedirect(KrMethods::route('index.php?option=com_knowres&view=media&id=' . $id, false));

			$pdfNameArray = $this->input->get('pdf', [], 'array');
			Media::deletePdfs('propertys', $id, $pdfNameArray);
		}
	}

	/**
	 * Method to edit an existing record.
	 *
	 * @param  string  $key      The name of the primary key of the URL variable.
	 * @param  string  $urlVar   The name of the URL variable if different from the primary key
	 *                           (sometimes required to avoid router collisions).
	 *
	 * @throws Exception
	 * @since  3.0.0
	 * @return void
	 */
	public function edit($key = null, $urlVar = null): void
	{
		if (!parent::edit()) {
			$id = $this->input->get('id', 0, 'integer');
			KrMethods::message(KrMethods::plain('COM_KNOWRES_PROPERTYDASHBOARD_CHECKIN'), 'error');
			KrMethods::redirect(KrMethods::route('index.php?option=com_knowres&task=property.dashboard&id=' . $id,
				false));
		}
	}

	/**
	 * Returns the geodata details for the property address (ajax)
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	#[NoReturn] public function geocode(): void
	{
		$data    = 'null';
		$address = $this->input->getString('address', '');
		$address = trim(str_replace(',', ' ', $address));
		$latlng  = trim($this->input->getString('latlng', ''));

		if ($address) {
			echo Utility::encodeJson(self::geoCodeAddress($address));
		}
		else if ($latlng) {
			echo Utility::geoCodeLatLng($latlng);
		}
		else {
			echo Utility::encodeJson($data);
		}

		jexit();
	}

	/**
	 * Method to log out an owner
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	public function logout(): void
	{
		KrMethods::logoutUser(KrMethods::getUser()->id);
	}

	/**
	 * Save the uploaded property image
	 *
	 * @throws Exception
	 * @since        3.0.0
	 * @noinspection PhpUnused
	 */
	public function saveimage(): void
	{
		$this->checkToken();

		$property_id = KrMethods::inputInt('id');
		if (!$property_id) {
			KrMethods::message(KrMethods::plain('COM_KNOWRES_PROPERTY_MEDIA_ERROR1'));
			Utility::goto('properties');
		}

		$this->setRedirect(KrMethods::route('index.php?option=com_knowres&view=media&id=' . $property_id, false));

		$files    = KrMethods::inputFiles('jform');
		$files    = $files['images'];
		$name     = $files['image']['name'];
		$tmp_name = $files['image']['tmp_name'];
		$error    = $files['image']['error'];

		if (!$name) {
			KrMethods::message(KrMethods::plain('COM_KNOWRES_FORM_ERROR_PROPERTY_IMAGE'), 'error');

			return;
		}

		$ImagesProperty = new Media\Images\Property($property_id, 'solo');
		try {
			$ImagesProperty->validate($name, $tmp_name, $error);
			$ImagesProperty->processOriginal();
			$ImagesProperty->process();
		} catch (RuntimeException $e) {
			Logger::logMe($e->getMessage());
			KrMethods::message(KrMethods::plain('COM_KNOWRES_ERROR_TRY_AGAIN_CHECK'), 'error');

			return;
		}

		KrMethods::message(KrMethods::plain('COM_KNOWRES_ACTION_SUCCESS'));

		//		$file_data = $ImagesProperty->processUploadedImage($filename, $tmpPath, $uploadError, false);
		//		if (!$file_data)
		//		{
		//			KrMethods::message(KrMethods::plain('COM_KNOWRES_FORM_ERROR_PROPERTY_IMAGE'), 'error');
		//
		//			return;
		//		}
		//
		//		if (!$UploadProperty->makeResizedOnUpload($file_data, false))
		//		{
		//			KrMethods::message(KrMethods::plain('COM_KNOWRES_FORM_ERROR_PROPERTY_IMAGE'), 'error');
		//		}
	}

	/**
	 * Save the video field
	 *
	 * @throws Exception
	 * @since        3.0.0
	 * @noinspection PhpUnused
	 */
	public function savevideo(): void
	{
		$this->checkToken();

		$jform = KrMethods::inputArray('jform');
		if (empty($jform['id'])) {
			Logger::logme('ID not received for property save video', 'error');
			KrMethods::message(KrMethods::plain('COM_KNOWRES_ERROR_TRY_AGAIN'));
			KrMethods::redirect(KrMethods::route('index.php?option=com_knowres&view=properties', false));
		}

		$id = $jform['id'];
		$this->setRedirect(KrMethods::route('index.php?option=com_knowres&view=media&id=' . $id, false));

		$data                     = new stdClass();
		$data->id                 = $id;
		$data->property_videolink = $jform['property_videolink'];
		KrFactory::update('property', $data);

		KrMethods::message(KrMethods::plain('COM_KNOWRES_ACTION_SUCCESS'));
	}

	/**
	 * Display property stats
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	#[NoReturn] public function stats(): void
	{
		/** @var PropertyModel $view */
		$view = $this->getView('property', 'stats');
		$id   = $this->input->getInt('id', 0);
		if (!$id) {
			Logger::logme('ID not received for property stats', 'error');
			KrMethods::message(KrMethods::plain('COM_KNOWRES_ERROR_TRY_AGAIN'));
			KrMethods::redirect(KrMethods::route('index.php?option=com_knowres&view=properties', false));
		}

		$view->item      = KrFactory::getAdminModel('property')->getItem($id);
		$view->settings  = KrFactory::getListModel('propertysettings')->getPropertysettings($id);
		$view->today     = TickTock::getDate();
		$view->params    = KrMethods::getParams();
		$created_after   = TickTock::modifyDays('now', 365, '-');
		$view->contracts = KrFactory::getListModel('contracts')->getDataForPropertyStats($id, $created_after);

		$view->display();
	}

	/**
	 * Upload property pdf files
	 *
	 * @throws Exception
	 * @since        1.0.0
	 * @noinspection PhpUnused
	 */
	public function uploadpdf(): void
	{
		$this->checkToken();

		$id = $this->input->getInt('id', 0);
		if (!$id) {
			Logger::logme('ID not received for property uploadpdf', 'error');
			KrMethods::message(KrMethods::plain('COM_KNOWRES_ERROR_TRY_AGAIN'));
			KrMethods::redirect(KrMethods::route('index.php?option=com_knowres&view=properties', false));
		}

		$this->setRedirect(KrMethods::route('index.php?option=com_knowres&view=media&&id=' . $id, false));

		$jform    = $this->input->files->get('jform', []);
		$name     = (string) $jform['uploadpdf']['name'];
		$filetype = (string) $jform['uploadpdf']['type'];
		$tmpName  = (string) $jform['uploadpdf']['tmp_name'];

		Media\Pdf::uploadPdf('propertys', $id, $name, $filetype, $tmpName);
		KrMethods::message(KrMethods::plain('COM_KNOWRES_ACTION_SUCCESS'));
	}

	/**
	 * Method to check if you can add a new record.
	 * Extended classes can override this if necessary.
	 *
	 * @param  array  $data  An array of input data.
	 *
	 * @since   1.0.0
	 * @return  bool
	 */
	protected function allowAdd($data = []): bool
	{
		$params       = KrMethods::getParams();
		$userSession  = new KrSession\User();
		$access_level = $userSession->getAccessLevel();
		if ($access_level > 10 || !$params->get('property_add')) {
			return parent::allowAdd();
		}
		else if ($access_level == 10 && $params->get('property_add')) {
			return true;
		}
	}

	/**
	 * Process additional requirements after save
	 *
	 * @param  BaseDatabaseModel  $model      The data model object.
	 * @param  array              $validData  The validated data.
	 *
	 * @throws Exception
	 * @since  3.1.0
	 */
	protected function postSaveHook(BaseDatabaseModel $model, $validData = []): void
	{
		/** @var PropertyModel $model */
		$id       = $model->getItem()->get('id');
		$massaged = KrMethods::inputArray('jform');

		$fields = KrFactory::getListModel('propertyfields')->getAllPropertyFields();
		if (is_countable($fields) && count($fields)) {
			$Translations = new Translations();
			foreach ($fields as $f) {
				$label     = 'p' . $f->id;
				$formlabel = 'p' . $f->id;
				if ($f->special) {
					$formlabel = KrFactory::getAdminModel('propertyfield')->propertyFieldSpecial($f->special, false);
				}

				if (isset($massaged[$formlabel])) {
					$text = (string) $massaged[$formlabel];
					$Translations->updateDefault('property', $id, $label, $text);
				}
			}
		}

		// New property add to manager if owner or limited access
		if (!(int) $validData['id']) {
			$userSession  = new KrSession\User();
			$userData     = $userSession->getData();
			$access_level = $userData->access_level;

			if ($access_level == 10 || $access_level == 20) {
				/** @var ManagerModel $manager */
				$manager      = KrFactory::getAdminModel('manager')->getItem($userSession['manager_id']);
				$properties   = $manager->properties;
				$properties[] = $id;

				$data             = new stdClass();
				$data->id         = $manager->id;
				$data->properties = Utility::encodeJson($properties);
				KrFactory::update('manager', $data);

				$userData->properties = implode(',', $properties);
				$userSession->setData($userData);
			}
		}
		else {
			$old_security_amount = KrMethods::inputString('old_security_amount', '0');
			$old_security_cash   = KrMethods::inputString('old_security_cash', '0');

			if ((isset($validData['security_amount']) && $validData['security_amount'] !== $old_security_amount) || (isset($validData['security_cash']) && $validData['security_cash'] !== $old_security_cash)) {
				KrFactory::getAdminModel('propertysetting')->updateSetting('security_changes', $validData['id']);
			}

			KrFactory::getAdminModel('servicequeue')::serviceQueueUpdate('updateProperty', (int) $validData['id'], 0,
				'ru');
		}
	}

	/**
	 * Set user session and access level
	 *
	 * @param  ViewInterface  $view
	 *
	 * @since  4.0.0
	 * @return ViewInterface
	 */
	protected function setAccess(ViewInterface $view): ViewInterface
	{
		$userSession        = new KrSession\User();
		$userData           = $userSession->getData();

		/** @var CalendarView $view */
		$view->access_level = $userData->access_level;
		$view->allow_book  = !($view->access_level == 10 && !KrMethods::getParams()->get('contract_add'));
		$view->allow_block = !($view->access_level == 10 && !KrMethods::getParams()->get('block_add'));

		$userData->cr_property_id   = (int) $view->item->id;
		$userData->cr_property_name = (string) $view->item->property_name;
		$userData->cr_country_id    = (int) $view->item->country_id;
		$userData->cr_region_id     = (int) $view->item->region_id;
		$userData->cr_town_id       = (int) $view->item->town_id;
		$userSession->setData($userData);

		return $view;
	}
}