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
use HighlandVision\Component\Knowres\Administrator\Model\ContractpaymentModel;
use HighlandVision\KR\Framework\KrMethods;
use Joomla\CMS\MVC\Controller\AdminController;
use Joomla\CMS\MVC\Model\BaseDatabaseModel;
use Joomla\Utilities\ArrayHelper;

/**
 * Contract payments controller list class.
 *
 * @since 1.0.0
 */
class ContractpaymentsController extends AdminController
{
	/**
	 * Remove an item(s)
	 *
	 * @throws Exception
	 * @since  1.0.0
	 * @return bool  True if access level checks pass, false otherwise.
	 */
	public function delete(): bool
	{
		$this->checkToken();

		$cid = KrMethods::inputArray('cid', [], 'get');
		if (!is_countable($cid) || count($cid) < 1)
		{
			KrMethods::message(KrMethods::plain($this->text_prefix . '_NO_ITEM_SELECTED'));
		}
		else
		{
			/* @var ContractpaymentModel $model */
			$model = $this->getModel();
			ArrayHelper::toInteger($cid);

			if ($model->delete($cid))
			{
				KrMethods::message(KrMethods::plural($this->text_prefix . '_N_ITEMS_DELETED', count($cid)));
			}
			else
			{
				KrMethods::message($model->getError());
			}
		}

		$this->postDeleteHook($model, $cid);

		KrMethods::redirect(KrMethods::route('index.php?option=' . $this->option . '&view=' . $this->view_list, false));

		$contract_id = KrMethods::getUserState('com_knowres.current.contract_id', 0);
		if (!$contract_id)
		{
			KrMethods::redirect(KrMethods::route('index.php?option=' . $this->option . '&view=' . $this->view_list
				. $this->getRedirectToListAppend(),
				false));
		}
		else
		{
			KrMethods::redirect(KrMethods::route('index.php?option=' . $this->option . '&task=contract.show&id='
				. $contract_id,
				false));
		}

		return true;
	}

	/**
	 * Proxy for getModel.
	 *
	 * @param   string  $name    Model name
	 * @param   string  $prefix  Model prefix administrator or site (defaults to administrator)
	 * @param   array   $config  Configuration options
	 *
	 * @since  1.6
	 * @return bool|BaseDatabaseModel
	 */
	public function getModel($name = 'contractpayment', $prefix = 'Administrator',
		$config = ['ignore_request' => true]): BaseDatabaseModel|bool
	{
		return parent::getModel($name, $prefix, $config);
	}
}