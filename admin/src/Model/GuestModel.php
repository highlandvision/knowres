<?php
/**
 * @package    Know Reservations
 * @subpackage Admin Models
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Administrator\Model;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Joomla\Extend\AdminModel;
use HighlandVision\KR\Translations;
use HighlandVision\KR\Utility;
use Joomla\CMS\Form\Form;
use Joomla\CMS\Object\CMSObject;
use Joomla\CMS\Versioning\VersionableControllerTrait;
use stdClass;
use UnexpectedValueException;

use function count;
use function is_array;
use function is_countable;

/**
 * Guest model
 *
 * @since 1.0.0
 */
class GuestModel extends AdminModel
{
	use VersionableControllerTrait;

	/**  @var string The type alias. */
	public $typeAlias = 'com_knowres.guest';
	/** @var mixed Batch copy/move command. If set to false, the batch copy/move command is not supported. */
	protected $batch_copymove = false;
	/**  @var ?string The prefix to use with controller messages. */
	protected $text_prefix = 'COM_KNOWRES_GUEST';

	/**
	 * Override checkin for guest as checked_out set to 0.
	 *
	 * @param   mixed  $pks  The ID of the primary key or an array of IDs
	 *
	 * @throws Exception
	 * @since  4.0.0
	 * @return bool  True on success, false on failure
	 */
	public function checkin(mixed $pks = null): bool
	{
		$pk = is_array($pks) ? $pks[0] : $pks;
		if (!empty($pk))
		{
			$update                   = new stdClass();
			$update->id               = $pk;
			$update->checked_out      = null;
			$update->checked_out_time = null;
			KrFactory::update('guest', $update);
		}

		return true;
	}

	/**
	 * Method to get the record form.
	 *
	 * @param   array   $data         An optional array of data for the form to interogate.
	 * @param   bool    $loadData     True if the form is to load its own data (default case), false if not.
	 * @param  ?string  $source       The form name if required.
	 * @param   int     $property_id  ID of property if required fields to be set.
	 *
	 * @throws Exception
	 * @since  1.0
	 * @return Form|false    A Form object on success, false on failure
	 */
	public function getForm($data = [], $loadData = true, ?string $source = 'guest', int $property_id = 0): Form|false
	{
		$form = parent::getForm($data, $loadData, $source);
		if ($property_id)
		{
			$settings = KrFactory::getListModel('propertysettings')->getPropertysettings($property_id);
			if (is_countable($settings) && count($settings))
			{
				$form = $this->setFormRequired($form, $settings);
			}
		}

		return $form;
	}

	/**
	 * Method to get a knowres record.
	 *
	 * @param   int  $pk  The id of the primary key.
	 *
	 * @throws Exception
	 * @since  1.0.0
	 * @return CMSObject|false  Object on success, false on failure.
	 */
	public function getItem($pk = null): CMSObject|false
	{
		/* @var GuestModel $item */
		$item = parent::getItem($pk);
		if ($item)
		{
			$item->telephone = Utility::decodeJson($item->telephone);

			$Translations         = new Translations();
			$item->name           = $item->surname . ' ' . $item->firstname;
			$item->country_name   = $Translations->getText('country', $item->country_id);
			$item->b_country_name = $Translations->getText('country', $item->b_country_id);
			$item->region_name    = $Translations->getText('region', $item->region_id);
			$item->b_region_name  = $Translations->getText('region', $item->b_region_id);
			$item->referral_name  = $Translations->getText('referral', $item->referral_id);

			$item->country_iso = '';
			if (isset($item->country_id) && $item->country_id > 0)
			{
				$country           = KrFactory::getAdminModel('country')->getItem($item->country_id);
				$item->country_iso = $country->country_iso ?? '';
			}

			$item->b_country_iso = '';
			if (isset($item->b_country_id) && $item->b_country_id != 0)
			{
				if ($item->b_country_id == $item->country_id)
				{
					$item->b_country_iso = $item->country_iso;
				}
				else
				{
					$country             = KrFactory::getAdminModel('country')->getItem($item->b_country_id);
					$item->b_country_iso = $country->country_iso ?? '';
				}
			}

			$item->region_iso = '';
			if (isset($item->region_id) && $item->region_id > 0)
			{
				$region           = KrFactory::getAdminModel('region')->getItem($item->region_id);
				$item->region_iso = $region->region_iso ?? '';
			}

			$item->b_region_iso = '';
			if (isset($item->b_region_id) && $item->b_region_id != 0)
			{
				if ($item->b_region_id == $item->region_id)
				{
					$item->b_region_iso = $item->region_iso;
				}
				else
				{
					$region             = KrFactory::getAdminModel('region')->getItem($item->b_region_id);
					$item->b_region_iso = $region->region_iso ?? '';
				}
			}
		}

		return $item;
	}

	/**
	 * Method to save the form data.
	 *
	 * @param   array  $data  The existing form data.
	 *
	 * @throws Exception
	 * @since  4.0.0
	 * @return bool  True on success.
	 */
	public function save($data): bool
	{
		return parent::save($data);
	}

	/**
	 * Method to validate the form data.
	 *
	 * @param   Form    $form      The form to validate against.
	 * @param   array   $data      The data to validate.
	 * @param  ?string  $group     The name of the field group to validate.
	 * @param   array   $settings  Property settings
	 *
	 * @throws Exception
	 * @since  1.0.0
	 * @return array|bool  Array of filtered data if valid, false otherwise.
	 */
	public function validate($form, $data, $group = null, array $settings = []): array|bool
	{
		$data['telephone'] = Utility::encodeJson(KrMethods::inputArray('telephone', []));

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
	 * @since  1.0.0
	 * @return mixed The data for the form.
	 */
	protected function loadFormData(): mixed
	{
		$data = KrMethods::getUserState('com_knowres.edit.guest.data', []);
		if (empty($data))
		{
			$data = $this->getItem();
		}

		return $data;
	}

	/**
	 * Set the required fields for the manager guest form (from settings)
	 *
	 * @param   Form   $form      Guest form
	 * @param   array  $settings  Property settings
	 *
	 * @throws UnexpectedValueException
	 * @since  1.0.0
	 * @return Form
	 */
	protected function setFormRequired(Form $form, array $settings): Form
	{
		$form = $this->setAttribute($settings['manager_requiredfields_firstname'], 'firstname', $form);
		$form = $this->setAttribute($settings['manager_requiredfields_surname'], 'surname', $form);
		$form = $this->setAttribute($settings['manager_requiredfields_mobile'], 'mobile_country_id', $form);
		$form = $this->setAttribute($settings['manager_requiredfields_mobile'], 'mobile', $form);
		$form = $this->setAttribute($settings['manager_requiredfields_address1'], 'address1', $form);
		$form = $this->setAttribute($settings['manager_requiredfields_address1'], 'address2', $form);
		if ($settings['manager_requiredfields_address1'] < 2)
		{
			$form->setFieldAttribute('address2', 'required', false);
		}

		$form = $this->setAttribute($settings['manager_requiredfields_town'], 'town', $form);
		$form = $this->setAttribute($settings['manager_requiredfields_postcode'], 'postcode', $form);
		$form = $this->setAttribute($settings['manager_requiredfields_region'], 'region_id', $form);

		return $this->setAttribute($settings['manager_requiredfields_region'], 'country_id', $form);
	}
}