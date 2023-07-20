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
use HighlandVision\KR\Logger;
use HighlandVision\KR\Media;
use JetBrains\PhpStorm\NoReturn;
use Joomla\CMS\MVC\Controller\AdminController;
use Joomla\CMS\MVC\Model\BaseDatabaseModel;

/**
 * Contracts list class.
 *
 * @since 1.0.0
 */
class ContractsController extends AdminController
{
	/**
	 * Daily overview
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	#[NoReturn] public function daily(): void
	{
		$view = $this->getView('contracts', 'daily');
		$view->display();
	}

	/**
	 * Delete contract pdf files
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	public function delpdf(): void
	{
		$this->checkToken();

		$id  = KrMethods::getUserState('com_knowres.current.contract_id', 0);
		$tag = KrMethods::inputString('tag', '', 'get');

		$this->setRedirect(KrMethods::route('index.php?option=com_knowres&task=contract.show&id=' . $id,
			false));

		if (!$id || !$tag)
		{
			Logger::logme('ID or Tag missing for contract PDF deletion (delpdf)', 'error');
			KrMethods::message(KrMethods::plain('COM_KNOWRES_ERROR_TRY_AGAIN'));
		}
		else
		{
			$pdfNameArray = KrMethods::inputArray('pdf', [], 'get');
			Media::deletePdfs('contracts', $tag, $pdfNameArray);
		}
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
	public function getModel($name = 'contract', $prefix = 'Administrator',
		$config = ['ignore_request' => true]): BaseDatabaseModel|bool
	{
		return parent::getModel($name, $prefix, $config);
	}

	/**
	 * Ajax - Upload contract pdf files
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	public function uploadpdf(): void
	{
		$this->checkToken();

		$id  = KrMethods::getUserState('com_knowres.current.contract_id', 0);
		$tag = KrMethods::inputString('tag', '', 'get');
		$this->setRedirect(KrMethods::route('index.php?option=com_knowres&task=contract.show&id=' . $id,
			false));

		if (!$id || !$tag)
		{
			Logger::logme('ID or Tag missing for contract PDF upload (uploadpdf)', 'error');
			KrMethods::message(KrMethods::plain('COM_KNOWRES_ERROR_TRY_AGAIN'));
		}
		else
		{
			$name     = $_FILES['uploadpdf']['name'];
			$filetype = $_FILES['uploadpdf']['type'];
			$tmpName  = $_FILES['uploadpdf']['tmp_name'];

			Media\Pdf::uploadPdf('contracts', $tag, $name, $filetype, $tmpName);
		}
	}
}