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
use Joomla\CMS\Versioning\VersionableControllerTrait;
use RuntimeException;
use SimpleXMLElement;

use function count;

/**
 * Knowres Service model.
 *
 * @since 1.0.0
 */
class ServiceModel extends AdminModel
{
	use VersionableControllerTrait;

	/**  @var string The type alias. */
	public $typeAlias = 'com_knowres.service';
	/** @var mixed Batch copy/move command. If set to false, the batch copy/move command is not supported. */
	protected $batch_copymove = false;
	/**  @var ?string The prefix to use with controller messages. */
	protected $text_prefix = 'COM_KNOWRES_SERVICE';

	/**
	 * Method to get the model form.
	 *
	 * @param  array    $data         An optional array of data for the form to interogate.
	 * @param  bool     $loadData     True if the form is to load its own data (default case), false if not.
	 * @param  ?string  $source       The form name if required.
	 * @param  int      $property_id  ID of property if required fields to be set.
	 *
	 * @throws Exception
	 * @since  1.0
	 * @return Form|false    A Form object on success, false on failure
	 */
	public function getForm($data = [], $loadData = true, ?string $source = 'service', int $property_id = 0): Form|false
	{
		return parent::getForm($data, $loadData, $source);

		// TODO v4.3 Sort out Xero
		if ($form->getValue('plugin') != 'xero') {
			return $form;
		}

		$add_to_custom = [];
		$banks         = KrFactory::getListModel('services')->getGateways();
		if (is_countable($banks) && count($banks)) {
			$element = '<fieldset name="mapbanks">';
			foreach ($banks as $f) {
				$label           = $f->name . ' ' . $f->currency;
				$description     = $f->agency_name;
				$var             = 'bank_' . $f->plugin . $f->currency;
				$add_to_custom[] = $var;

				$field = '<field name="' . htmlentities($var) . '" ';
				$field .= 'type="xeroaccountlist" ';
				$field .= 'accounttype="CURRENT" ';
				$field .= 'field="' . htmlentities($var) . '" ';
				$field .= 'label="' . htmlentities($label) . '" ';
				$field .= 'description="' . htmlentities($description) . '" ';
				$field .= 'required="required"/>';

				$element .= $field;
			}

			$element .= '</fieldset>';

			$element = new SimpleXMLElement($element);
			$form->setField($element);
		}

		if (is_countable($add_to_custom) && count($add_to_custom)) {
			$custom = $form->getFieldAttribute('custom', 'default');
			$custom .= ',' . implode(',', $add_to_custom);
			$form->setFieldAttribute('custom', 'default', $custom);
		}

		return $form;
	}

	/**
	 * Method to get a knowres record.
	 *
	 * @param  int  $pk  The id of the primary key.
	 *
	 * @throws RuntimeException
	 * @since  1.0.0
	 * @return object|false  Object on success, false on failure.
	 */
	public function getItem($pk = null): object|false
	{
		$item = parent::getItem($pk);
		if ($item) {
			$Translations         = new Translations();
			$item->service_name   = $Translations->getText('service', $item->id);
			$item->parameters     = Utility::decodeJson($item->parameters);
			$item->service_plugin = $item->plugin;
		}

		return $item;
	}

	/**
	 * Add additional validation to form data
	 *
	 * @param  Form   $form   The form to validate against.
	 * @param  array  $data   The data to validate.
	 * @param  null   $group  From group
	 *
	 * @throws Exception
	 * @since  4.0.0
	 * @return bool|array
	 */
	public function validate($form, $data, $group = null): bool|array
	{
		$data['parameters'] = Utility::encodeJson(KrMethods::inputArray('custom'));

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
		$data = KrMethods::getUserState('com_knowres.edit.service.data', []);
		if (empty($data)) {
			$data = $this->getItem();
		}

		return $data;
	}

	/**
	 * Method to allow derived classes to preprocess the form.
	 *
	 * @param  Form    $form   A Form object.
	 * @param  mixed   $data   The data expected for the form.
	 * @param  string  $group  The name of the plugin group to import (defaults to "content").
	 *
	 * @throws  Exception if there is an error in the form event.
	 * @since   1.0.0
	 * @return  void
	 */
	protected function preprocessForm(Form $form, $data, $group = 'plugin'): void
	{
		if (isset($data->plugin)) {
			$plugin = $data->plugin;
			$form->loadFile('service_' . $plugin, false);
		}

		parent::preprocessForm($form, $data, $group);
	}
}