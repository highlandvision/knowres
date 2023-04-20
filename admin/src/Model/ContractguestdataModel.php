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
use HighlandVision\KR\TickTock;
use HighlandVision\KR\Utility;
use Joomla\CMS\Form\Form;
use Joomla\CMS\Versioning\VersionableControllerTrait;
use stdClass;

use function implode;
use function trim;

/**
 * Knowres contract guest data model.
 *
 * @since 1.0.0
 */
class ContractguestdataModel extends AdminModel
{
	use VersionableControllerTrait;

	/**  @var string The type alias. */
	public $typeAlias = 'com_knowres.contractguestdata';
	/** @var mixed Batch copy/move command. If set to false, the batch copy/move command is not supported. */
	protected $batch_copymove = false;
	/**  @var ?string The prefix to use with controller messages. */
	protected $text_prefix = 'COM_KNOWRES_CONTRACTGUESTDATA';

	/**
	 * Get child ages from guestdata
	 *
	 * @param  string  $children  Child ages
	 *
	 * @since  2.2.0
	 * @return string
	 */
	public static function getChildAges(string $children): string
	{
		$tmp  = [];
		$ages = [];

		foreach (explode(',', $children) as $a)
		{
			if (isset($tmp[$a]))
			{
				$tmp[$a]++;
			}
			else
			{
				$tmp[$a] = 1;
			}
		}

		foreach ($tmp as $k => $v)
		{
			$ages[] = $v . ' x ' . $k . ' year old';
		}

		return implode(', ', $ages);
	}

	/**
	 * Return the document text for the given document type
	 *
	 * @param  string  $type  Type of document
	 *
	 * @since  2.2.0
	 * @return string
	 */
	public static function getDocumentType(string $type): string
	{
		$text = 'COM_KNOWRES_FORM_OPTION_DOCUMENT_TYPE' . $type;

		return KrMethods::plain($text);
	}

	/**
	 * Returns the textual gender
	 *
	 * @param  string  $sex  M or F
	 *
	 * @since  2.2.0
	 * @return string
	 */
	public static function getSex(string $sex): string
	{
		if ($sex == 'F')
		{
			return KrMethods::plain('COM_KNOWRES_FEMALE');
		}
		else if ($sex == 'M')
		{
			return KrMethods::plain('COM_KNOWRES_MALE');
		}
		else
		{
			return '';
		}
	}

	/**
	 * Override checkin for guestdata as checked_out set to 0.
	 *
	 * @param  array  $pks  The id of the row to check out.
	 *
	 * @throws Exception
	 * @since  4.0.0
	 * @return bool  True on success, false on failure
	 */
	public function checkin($pks = null): bool
	{
		$pk = is_array($pks) ? $pks[0] : $pks;
		if (!empty($pk))
		{
			$update                   = new stdClass();
			$update->id               = $pk;
			$update->checked_out      = null;
			$update->checked_out_time = null;
			KrFactory::update('contract_guestdata', $update);
		}

		return true;
	}

	/**
	 * Method to get a knowres record.
	 *
	 * @param  int  $pk  The id of the primary key.
	 *
	 * @since  1.0.0
	 * @return object|false  Object on success, false on failure.
	 */
	public function getItem($pk = null): object|false
	{
		$item = parent::getItem($pk);
		if ($item)
		{
			$item->arrival_air = Utility::decodeJson($item->arrival_air);
			$item->guestinfo   = Utility::decodeJson($item->guestinfo);
			$item->options     = Utility::decodeJson($item->options);
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
	 * @since  1.0.0
	 * @return bool|array
	 */
	public function validate($form, $data, $group = null): bool|array
	{
		$data['guestinfo']   = Utility::encodeJson(KrMethods::inputArray('guestinfo'));
		$data['arrival_air'] = Utility::encodeJson(KrMethods::inputArray('arrival_air'));
		$data['options']     = $this->prepareOptions();

		$jform = KrMethods::inputArray('jform');
		if ($jform['arrival_means'] == 'auto')
		{
			$data['arrival_from'] = $jform['auto_arrival_from'];
			$data['arrival_time'] = $jform['auto_arrival_time'];
		}

		$data = parent::validate($form, $data, $group);
		if ($data === false)
		{
			return false;
		}

		$dob             = KrMethods::inputArray('dob');
		$document_issue  = KrMethods::inputArray('document_issue');
		$document_expiry = KrMethods::inputArray('document_expiry');
		$today           = TickTock::getDate();

		foreach ($dob as $d)
		{
			if (trim($d) && $d >= $today)
			{
				$this->setError('Date of Birth should not be in the future');

				return false;
			}
		}
		foreach ($document_issue as $d)
		{
			if (trim($d) && $d >= $today)
			{
				$this->setError("Issue date should not be in the future");

				return false;
			}
		}
		foreach ($document_expiry as $d)
		{
			if (trim($d) && $d <= $today)
			{
				$this->setError("Expiry date should not be in the past");

				return false;
			}
		}

		return $data;
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
		$data = KrMethods::getUserState('com_knowres.edit.contractguestdata.data', []);
		if (empty($data))
		{
			$data = $this->getItem();
		}

		return $data;
	}

	/**
	 * Prepare options
	 *
	 * @throws Exception
	 * @since  2.5.0
	 * @return array
	 */
	private function prepareOptions(): array
	{
		$oid    = KrMethods::inputArray('oid');
		$answer = KrMethods::inputArray('answer');

		$options = [];
		for ($i = 0; $i < count($oid); $i++)
		{
			$options[] = [
				'id'     => (int) $oid[$i],
				'answer' => (string) $answer[$i]
			];
		}

		return $options;
	}
}