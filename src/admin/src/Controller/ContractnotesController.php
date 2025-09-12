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
use HighlandVision\KR\Framework\KrMethods;
use Joomla\CMS\MVC\Controller\AdminController;
use Joomla\CMS\MVC\Model\BaseDatabaseModel;

/**
 * Contract notes controller list class.
 *
 * @since 1.0.0
 */
class ContractnotesController extends AdminController
{
	/** @var string The URL view list variable */
	protected $view_list = 'contract.show';

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
	public function getModel($name = 'contractnote', $prefix = 'Administrator',
		$config = ['ignore_request' => true]): BaseDatabaseModel|bool
	{
		return parent::getModel($name, $prefix, $config);
	}

	/**
	 * Delete notes
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	public function delete(): bool
	{
		parent::delete();

		$contract_id = KrMethods::getUserState('com_knowres.current.contract_id', 0);
		if ($contract_id)
		{
			KrMethods::redirect(KrMethods::route('index.php?option=com_knowres&task=contract.show&id=' . $contract_id,
				false));
		}
	}
}