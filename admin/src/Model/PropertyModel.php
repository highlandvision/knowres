<?php
/**
 * @package     Know Reservations
 * @subpackage  Admin Model
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Administrator\Model;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\Component\Knowres\Administrator\Table\PropertyTable;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Joomla\Extend\AdminModel;
use HighlandVision\KR\Session as KrSession;
use HighlandVision\KR\Translations;
use HighlandVision\KR\Utility;
use JetBrains\PhpStorm\NoReturn;
use Joomla\CMS\Factory;
use Joomla\CMS\Form\Form;
use Joomla\CMS\Versioning\VersionableControllerTrait;
use RuntimeException;
use SimpleXMLElement;

use function array_map;
use function count;
use function implode;
use function is_countable;
use function is_null;
use function trim;

/**
 * Knowres Property model
 *
 * @since 1.0.0
 */
class PropertyModel extends AdminModel
{
	use VersionableControllerTrait;

	/**  @var string The type alias. */
	public $typeAlias = 'com_knowres.property';
	/** @var mixed Batch copy/move command. If set to false, the batch copy/move command is not supported. */
	protected $batch_copymove = false;
	/**  @var ?string The prefix to use with controller messages. */
	protected $text_prefix = 'COM_KNOWRES_PROPERTY';

	/**
	 * Get the text relevant to the booking type
	 *
	 * @param  int  $booking_type  Property booking type
	 *
	 * @throws Exception
	 * @since  1.2.2
	 * @return string
	 */
	public static function bookingTypeText(int $booking_type): string
	{
		if (KrMethods::isAdmin()) {
			return match ($booking_type) {
				0 => KrMethods::plain('COM_KNOWRES_PROPERTIES_BOOKING_TYPE_REQUEST'),
				1 => KrMethods::plain('COM_KNOWRES_PROPERTIES_BOOKING_TYPE_PROVISIONAL'),
				2 => KrMethods::plain('COM_KNOWRES_PROPERTIES_BOOKING_TYPE_CONFIRMED')
			};
		}
		else {
			return match ($booking_type) {
				0 => KrMethods::plain('COM_KNOWRES_VIEW_DETAILS'),
				1 => KrMethods::plain('COM_KNOWRES_REQUEST_BOOKING'),
				2 => KrMethods::plain('COM_KNOWRES_BOOK_NOW')
			};
		}
	}

	/**
	 * Get the property item.
	 *
	 * @param  int  $pk  The id of the primary key.
	 *
	 * @throws Exception
	 * @since  1.0.0
	 * @return object|false  Object on success, false on failure.
	 */
	public function getItem($pk = null): object|false
	{
		$item = parent::getItem($pk);
		if ($item) {
			//TODO-v4.4 delete bed types
			$item->bed_types             = Utility::decodeJson($item->bed_types, true);
			$item->cancellation_penalty  = Utility::decodeJson($item->cancellation_penalty);
			$item->categories            = Utility::decodeJson($item->categories, true);
			$item->checkin_fees          = Utility::decodeJson($item->checkin_fees);
			$item->checkout_fees         = Utility::decodeJson($item->checkout_fees);
			$item->guest_types           = Utility::decodeJson($item->guest_types);
			$item->property_alternatives = Utility::decodeJson($item->property_alternatives, true);
			$item->property_features     = Utility::decodeJson($item->property_features, true);
			$item->property_units        = Utility::decodeJson($item->property_units, true);
			$item->rooms                 = Utility::decodeJson($item->rooms);

			$Translations            = new Translations();
			$item->country_name      = $Translations->getText('country', $item->country_id);
			$item->region_name       = $Translations->getText('region', $item->region_id);
			$item->town_name         = $Translations->getText('town', $item->town_id);
			$item->type_name         = $Translations->getText('type', $item->type_id);
			$item->type_abbreviation = $Translations->getText('type', $item->type_id, 'abbreviation');
			$item->timezone          = 'UTC';
			if ($item->town_id > 0) {
				$town = KrFactory::getAdminModel('town')->getItem($item->town_id);
				if (!empty($town->timezone)) {
					$item->timezone = $town->timezone;
				}
			}

			$item = $this->setPropertyFields($item);
		}

		return $item;
	}

	/**
	 * Mark property for deletion
	 *
	 * @param  array  $cid  IDs of property to be actioned
	 *
	 * @throws RuntimeException
	 * @since  3.0.0
	 * @return bool
	 */
	public function markForDeletion(array $cid): bool
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$fields = [$db->qn('state') . '=-99'
		];

		$conditions = [$db->qn('id') . ' IN (' . implode(',', array_map('intval', $cid)) . ')'
		];

		$query->update($db->qn('#__knowres_property'))->set($fields)->where($conditions);

		$db->setQuery($query);

		return $db->execute();
	}

	/**
	 * Mark properties for trash
	 *
	 * @param  array  $cid  IDs of property to be actioned
	 *
	 * @throws RuntimeException
	 * @since  3.0.0
	 * @return bool
	 */
	public function markAsTrash(array $cid): bool
	{
		$db = $this->getDatabase();

		$query = 'UPDATE ' . $db->qn('#__knowres_property', 'p');
		$query .= ' LEFT JOIN ' . $db->qn('#__knowres_contract',
				'c') . 'ON' . $db->qn('c.property_id') . '=' . $db->qn('p.id');
		$query .= ' SET ' . $db->qn('p.state') . ' = (CASE WHEN `c`.`id` IS NULL THEN -2 ELSE 2 END)';
		//	Do not use $db->qn('c.id') above as throws error
		$query .= ' WHERE ' . $db->qn('p.id') . ' IN (' . implode(',', array_map('intval', $cid)) . ')';
		$db->setQuery($query);

		return $db->execute();
	}

	/**
	 * Override publish function
	 *
	 * @param  array   &$pks    A list of the primary keys to change.
	 * @param  int      $value  The value of the published state.
	 *
	 * @throws Exception
	 * @since  3.1.0
	 */
	public function publish(&$pks, $value = 1): void
	{
		if (parent::publish($pks, $value)) {
			foreach ($pks as $id) {
				KrFactory::getAdminModel('servicequeue')::serviceQueueUpdate('updateProperty', $id, 0, 'ru');
				self::setUpdatedAt($id, 'property');
			}
		}
	}

	/**
	 * Method to save the form data
	 * Override for coupon_code increment field
	 *
	 * @param  array  $data  The form data.
	 *
	 * @throws Exception
	 * @since  3.2
	 * @return bool  True on success.
	 */
	public function save($data): bool
	{
		if (Factory::getApplication()->input->get('task') == 'save2copy') {
			$data['property_name'] = Utility::generateNewName($data['property_name']);
		}

		return parent::save($data);
	}

	/**
	 * Add the property field text to $item
	 *
	 * @param  mixed   $item    Property item
	 * @param  ?array  $fields  Property fields or null to read
	 *
	 * @throws Exception
	 * @since  3.3.0
	 * @return mixed
	 */
	public function setPropertyFields(mixed $item, ?array $fields = null): mixed
	{
		if (is_null($fields)) {
			$fields = KrFactory::getListModel('propertyfields')->getAllPropertyFields();
		}

		if (is_countable($fields)) {
			$Translations = new Translations();
			foreach ($fields as $f) {
				$label = $Translations->getText('propertyfield', $f->id, 'label');

				$field = 'p' . $f->id;
				$name  = $field;
				if ($f->special) {
					$name = KrFactory::getAdminModel('propertyfield')->propertyFieldSpecial($f->special, false);
				}

				$item->{$name} = trim($Translations->getText('property', $item->id, $field));
				if (!KrMethods::isAdmin() && $f->format == 2) {
					$item->{$name} = Utility::nl2p($item->{$name});
				}
				$item->buttons ="true";
				$hvar          = 'h' . $name;
				$item->{$hvar} = $label;
			}
		}

		return $item;
	}

	/**
	 * Method to validate the form data.
	 *
	 * @param  Form    $form   The form to validate against.
	 * @param  array   $data   The data to validate.
	 * @param  string  $group  The name of the field group to validate.
	 *
	 * @throws Exception
	 * @since  4.0.0
	 * @return bool|array  Array of filtered data if valid, false otherwise.
	 */
	public function validate($form, $data, $group = null): bool|array
	{
		$data['bed_types']            = Utility::encodeJson(KrMethods::inputArray('bed_types'), true);
		$data['cancellation_penalty'] = Utility::encodeJson(KrMethods::inputArray('cancellation_penalty'));
		$data['checkin_fees']         = Utility::encodeJson(KrMethods::inputArray('checkin_fees'));
		$data['checkout_fees']        = Utility::encodeJson(KrMethods::inputArray('checkout_fees'));
		$data['guest_types']          = Utility::encodeJson(KrMethods::inputArray('guest_types'));
		$data['rooms']                = Utility::encodeJson(KrMethods::inputArray('rooms'));

		$jform                         = KrMethods::inputArray('jform');
		$data['categories']            = !empty($jform['categories']) ? Utility::encodeJson($jform['categories']) : [];
		$data['property_alternatives'] = !empty($jform['property_alternatives']) ? Utility::encodeJson($jform['property_alternatives']) : [];
		$data['property_features']     = !empty($jform['property_features']) ? Utility::encodeJson($jform['property_features']) : [];
		$data['property_units']        = !empty($jform['property_units']) ? Utility::encodeJson($jform['property_units']) : [];

		return parent::validate($form, $data, $group);
	}

	/**
	 * Method to test whether a record can be deleted.
	 *
	 * @param  object  $record  A record object.
	 *
	 * @since  3.0.0
	 * @return bool  True if allowed to delete the record.
	 */
	protected function canDelete($record): bool
	{
		$userSession = new KrSession\User();
		if ($userSession->getAccessLevel() == 40) {
			return true;
		}
		else {
			return Factory::getUser()->authorise('core.delete', $this->option);
		}
	}

	/**
	 * Method to get the data that should be injected in the form.
	 *
	 * @throws Exception
	 * @since  1.0.0
	 * @return mixed The data for the form array or object.
	 */
	protected function loadFormData(): mixed
	{
		$data = KrMethods::getUserState('com_knowres.edit.property.data', []);
		if (empty($data)) {
			$data = $this->getItem();
		}

		return $data;
	}

	/**
	 * Prepare and sanitise the table prior to saving.
	 *
	 * @param  PropertyTable  $table  Table object
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	protected function prepareTable($table): void
	{
		if (empty($table->id)) {
			$params       = KrMethods::getParams();
			$userSession  = new KrSession\User();
			$access_level = $userSession->getAccessLevel();

			$table->approved = 1;
			if ($access_level == 10 && $params->get('property_approve', 0)) {
				$table->approved = 0;
			}
		}

		$table->property_name = trim($table->property_name);
		$table->property_area = trim($table->property_area);

		parent::prepareTable($table);
	}

	/**
	 * Preprocess the form.
	 *
	 * @param  Form    $form   Form object.
	 * @param  object  $data   Data object.
	 * @param  string  $group  Group name.
	 *
	 * @throws Exception
	 * @since  4.0.0
	 * @return void
	 */
	#[NoReturn] protected function preprocessForm(Form $form, $data, $group = null): void
	{
		$fields = KrFactory::getListModel('propertyfields')->getAllPropertyFields();
		if (is_countable($fields) && count($fields)) {
			$Translations = new Translations();

			foreach ($fields as $f) {
				$label       = $Translations->getText('propertyfield', $f->id, 'label');
				$description = $Translations->getText('propertyfield', $f->id, 'description');

				$field = 'p' . $f->id;
				$name  = $field;
				$tab   = 'propertyfields';
				if ($f->special) {
					$name = KrFactory::getAdminModel('propertyfield')->propertyFieldSpecial($f->special, false);
					$tab  = KrFactory::getAdminModel('propertyfield')->getPropertyTab($f->special);
				}

				$fieldXml = new SimpleXMLElement('<field></field>');
				$fieldXml->addAttribute('name', htmlentities($name));
				$fieldXml->addAttribute('label', htmlentities($label));
				$fieldXml->addAttribute('description', htmlentities($description));
				if ($name == 'tagline') {
					$fieldXml->addAttribute('maxlength', 100);
				}
				if ($f->required) {
					$fieldXml->addAttribute('required', true);
				}
				if ($f->format == 1) {
					$fieldXml->addAttribute('type', 'text');
					$fieldXml->addAttribute('filter', 'string');
				}
				else if ($f->format == 2) {
					$fieldXml->addAttribute('type', 'textarea');
					$fieldXml->addAttribute('filter', 'safehtml');
					$fieldXml->addAttribute('rows', '6');
				}
				else if ($f->format == 3) {
					$fieldXml->addAttribute('type', 'editor');
					$fieldXml->addAttribute('filter', 'safehtml');
					$fieldXml->addAttribute('buttons', 'true');
				}

				$form->setField($fieldXml, null, true, $tab);
			}
		}

		parent::preprocessForm($form, $data, $group);
	}
}