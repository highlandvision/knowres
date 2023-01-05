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
use HighlandVision\Component\Knowres\Administrator\Model\ContractguestdataModel as AdminContractguestdataModel;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\SiteHelper;
use HighlandVision\KR\TickTock;
use Joomla\CMS\Form\Form;
use stdClass;

/**
 * Site contract guest data form model
 *
 * @since 1.0.0
 */
class ContractguestdataModel extends AdminContractguestdataModel
{
	/**
	 * Override checkout for guestdata as checked_out set to 0.
	 *
	 * @param   int|null  $pk  The id of the row to check out.
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
			KrFactory::update('contract_guestdata', $update);
		}

		return true;
	}

	/**
	 * Method to get the record form.
	 *
	 * @param   array   $data      An optional array of data for the form to interogate.
	 * @param   bool    $loadData  True if the form is to load its own data (default case), false if not.
	 * @param  ?string  $source    The form name if required.
	 *
	 * @throws Exception
	 * @since  1.0
	 * @return Form|false    A Form object on success, false on failure
	 */
	public function getForm($data = [], $loadData = true, ?string $source = 'contractguestdata'): Form|false
	{
		return parent::getForm();
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
		if (parent::save($data))
		{
			KrMethods::message(KrMethods::plain('COM_KNOWRES_ITEM_UPDATED_SUCCESSFULLY'));
			SiteHelper::redirectDashboard();
		}

		return true;
	}

	/**
	 * Method to get the data that should be injected in the form.
	 *
	 * @throws Exception
	 * @since  1.6
	 * @return mixed    The data for the form.
	 */
	protected function loadFormData(): mixed
	{
		$data = KrMethods::getUserState('com_knowres.edit.contractguestdataform.data', []);
		if (empty($data))
		{
			$data = $this->getItem();
		}

		return $data;
	}
}