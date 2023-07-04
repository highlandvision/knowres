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
use Joomla\CMS\Table\Table;
use Joomla\CMS\Versioning\VersionableControllerTrait;
use PHP_IBAN\IBAN;
use RuntimeException;

/**
 * Admin model class for owner
 *
 * @since 1.0.0
 */
class OwnerModel extends AdminModel
{
	use VersionableControllerTrait;

	/**  @var string The type alias. */
	public $typeAlias = 'com_knowres.owner';
	/** @var mixed Batch copy/move command. If set to false, the batch copy/move command is not supported. */
	protected $batch_copymove = false;
	/**  @var ?string The prefix to use with controller messages. */
	protected $text_prefix = 'COM_KNOWRES_OWNER';

	/**
	 * Method to get an owner record.
	 *
	 * @param ?int  $pk  The id of the primary key.
	 *
	 * @throws Exception
	 * @since  1.0.0
	 * @return object|false  Object on success, false on failure.
	 */
	public function getItem($pk = null): object|false
	{
		$item = parent::getItem($pk);
		if ($item)
		{
			$Translations       = new Translations();
			$item->country_name = $Translations->getText('country', $item->country_id);
			$item->region_name  = $Translations->getText('region', $item->region_id);

			$item->country_iso = '';
			if (!empty($item->country_id))
			{
				$item->country_iso = '';
				$model             = KrFactory::getAdminModel('country');
				$country           = $model->getItem($item->country_id);
				$item->country_iso = $country->country_iso ?? '';
			}
		}

		return $item;
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
		$data = KrMethods::getUserState('com_knowres.edit.owner.data', []);
		if (empty($data))
		{
			$data = $this->getItem();
		}

		return $data;
	}

	/**
	 * Prepare and sanitise the table prior to saving.
	 *
	 * @param   Table  $table  Table data
	 *
	 * @throws RuntimeException
	 * @throws Exception
	 * @throws Exception
	 * @since  3.4.0
	 */
	protected function prepareTable($table): void
	{
		if (!empty($table->iban))
		{
			$Iban        = new IBAN($table->iban);
			$table->iban = $Iban->MachineFormat();
		}

		parent::prepareTable($table);
	}
}