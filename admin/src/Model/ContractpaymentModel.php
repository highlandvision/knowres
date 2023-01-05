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
use HighlandVision\KR\Utility;
use Joomla\CMS\Form\Form;
use Joomla\CMS\Object\CMSObject;
use RuntimeException;

/**
 * Knowres contract payment model.
 *
 * @since 1.0.0
 */
class ContractpaymentModel extends AdminModel
{
	/**  @var string The type alias. */
	public $typeAlias = 'com_knowres.contractpayment';
	/** @var mixed Batch copy/move command. If set to false, the batch copy/move command is not supported. */
	protected $batch_copymove = false;
	/**  @var ?string The prefix to use with controller messages. */
	protected $text_prefix = 'COM_KNOWRES_PAYMENT';

	/**
	 * Calculate full balance (includes unconfirmed payments) and confirmed balances
	 *
	 * @param   CMSObject  $contract  Contract row
	 * @param   array      $payments  Contract payments
	 * @param   array      $fees      Contract fees
	 *
	 * @since  4.0.0
	 * @return array [Confirmed balance, Full balance].
	 */
	public static function setBalances(CMSObject $contract, array $payments = [], array $fees = []): array
	{
		$balance = $contract->contract_total;
		foreach ($fees as $f)
		{
			$balance += $f->value;
		}

		$balance_all = $balance;

		foreach ($payments as $p)
		{
			$balance_all -= $p->base_amount;
			if ($p->confirmed)
			{
				$balance -= $p->base_amount;
			}
		}

		return [Utility::roundValue($balance, $contract->currency),
		        Utility::roundValue($balance_all, $contract->currency)];
	}

	/**
	 * Update existing payment and fee records to actioned for new Xero service
	 *
	 * @param   int  $agency_id  ID of agency
	 *
	 * @throws Exception
	 * @throws RuntimeException
	 * @since  3.1.0
	 */
	public static function updateForXero(int $agency_id)
	{
		$db    = KrFactory::getDatabase();
		$query = $db->getQuery(true);

		$fieldlist = $db->qn(array('p.contract_id'));
		$query->select($fieldlist)
		      ->from($db->qn('#__knowres_contract_payment', 'p'))
		      ->join('LEFT',
			      $db->qn('#__knowres_contract', 'c') . ' ON ' . $db->qn('c.id') . '=' . $db->qn('p.contract_id'))
		      ->where($db->qn('p.actioned') . '=1')
		      ->where($db->qn('c.agency_id') . '=' . $agency_id)
		      ->where($db->qn('p.actioned_at') . '=' . $db->q('0000-00-00 00:00:00'))
		      ->where($db->qn('p.state') . '=1')
		      ->where($db->qn('p.confirmed') . '=1');

		$db->setQuery($query);
		$cids = $db->loadColumn();
		if (is_countable($cids) && count($cids))
		{
			try
			{
				$db->transactionStart();

				$query = $db->getQuery(true)
				            ->update($db->qn('#__knowres_contract_payment'))
				            ->set($db->qn('actioned') . '=1')
				            ->where($db->qn('contract_id') . ' IN (' . implode(',', array_map('intval', $cids)) . ')');
				$db->setQuery($query);
				$db->execute();

				$query = $db->getQuery(true)
				            ->update($db->qn('#__knowres_contract_fee'))
				            ->set($db->qn('actioned') . ' = 1')
				            ->where($db->qn('contract_id') . ' IN (' . implode(',', array_map('intval', $cids)) . ')');

				$db->setQuery($query);
				$db->execute();
			}
			catch (RuntimeException)
			{
				KrMethods::message(KrMethods::plain('Payment and Fee records could not be set to actioned for Xero initialise. Please contact support'),
					'error');
			}
		}
	}

	/**
	 * Reset actioned flag on payments and fess for selected contracts
	 *
	 * @param   array  $ids  Contract ids for update
	 *
	 * @throws RuntimeException
	 * @throws Exception
	 * @since  3.1.0
	 * @return bool
	 */
	public static function updateXeroBatch(array $ids): bool
	{
		$db    = KrFactory::getDatabase();
		$query = $db->getQuery(true);

		$fieldlist    = $db->qn(array('contract_id'));
		$fieldlist[0] = 'DISTINCT ' . $fieldlist[0];

		$query->select($fieldlist)
		      ->from($db->qn('#__knowres_contract_payment'))
		      ->where($db->qn('actioned') . '  = 1')
		      ->where($db->qn('actioned_at') . ' = ' . $db->q('0000-00-00 00:00:00'))
		      ->where($db->qn('state') . ' = 1')
		      ->where($db->qn('confirmed') . ' = 1')
		      ->where($db->qn('contract_id') . ' IN (' . implode(',', array_map('intval', $ids)) . ')');

		$db->setQuery($query);
		$contracts = $db->loadColumn();

		if (!count($contracts))
		{
			KrMethods::message(KrMethods::plain('COM_KNOWRES_ACTION_SUCCESS'), 'info');

			return true;
		}

		try
		{
			$db->transactionStart();
			$query = $db->getQuery(true);

			$fields     = array(
				$db->qn('actioned') . ' = 0'
			);
			$conditions = array(
				$db->qn('contract_id') . ' IN (' . implode(',', array_map('intval', $contracts)) . ')',
			);

			$query->update($db->qn('#__knowres_contract_payment'))
			      ->set($fields)
			      ->where($conditions);

			$db->setQuery($query);
			$db->execute();

			$query = $db->getQuery(true);

			$query->update($db->qn('#__knowres_contract_fee'))
			      ->set($fields)
			      ->where($conditions);

			$db->setQuery($query);
			$db->execute();

			$db->transactionCommit();
		}
		catch (RuntimeException $e)
		{
			KrMethods::message(KrMethods::plain($e->getMessage()), 'error');
			KrMethods::message(KrMethods::plain('KrFactory error, please try again or contact support'), 'error');

			return false;
		}

		KrMethods::message(KrMethods::plain('COM_KNOWRES_ACTION_SUCCESS'), 'info');

		return true;
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
		/* @var ContractpaymentModel $item */
		$item = parent::getItem($pk);
		if ($item)
		{
			if ($item->service_id > 0)
			{
				/* @var ServiceModel $service */
				$service              = KrFactory::getAdminModel('service')->getItem($item->service_id);
				$item->service_name   = $service->name;
				$item->service_plugin = $service->plugin;
			}
		}

		return $item;
	}

	/**
	 * Add additional validation to form data
	 *
	 * @param   Form   $form  The form to validate against.
	 * @param   array  $data  The data to validate.
	 * @param   null   $group
	 *
	 * @since  1.0.0
	 * @return bool|array
	 */
	public function validate($form, $data, $group = null): bool|array
	{
		$data = parent::validate($form, $data, $group);
		if ($data === false)
		{
			return false;
		}

		if (!(float) $data['amount'])
		{
			$this->setError("Please enter a payment amount");

			return false;
		}

		if ((float) $data['amount'] < 0)
		{
			$this->setError("Please remove the - sign from the Amount and set Refund to Yes");

			return false;
		}

		if ($data['currency_res'] == $data['currency'])
		{
			$data['rate']        = 1;
			$data['base_amount'] = $data['amount'];

			return $data;
		}
		else
		{
			if (((float) $data['rate'] == 1 && !(float) $data['base_amount'])
				|| ((float) $data['rate'] == 0
					&& (float) $data['base_amount'] == 0))
			{
				$this->setError("Please enter Reservation amount or rate");

				return false;
			}
			else
			{
				if ((float) $data['base_amount'] == 0 && (float) $data['rate'] > 0)
				{
					$data['base_amount'] = round((float) $data['amount'] / (float) $data['rate'], 2);
				}
				else if (((float) $data['rate'] == 0 || (float) $data['rate'] == 1) && (float) $data['base_amount'] > 0)
				{
					$data['rate'] = round((float) $data['amount'] / (float) $data['base_amount'], 4);
				}

				return $data;
			}
		}
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
		$data = KrMethods::getUserState('com_knowres.edit.contractpayment.data', []);
		if (empty($data))
		{
			$data = $this->getItem();
		}

		return $data;
	}
}