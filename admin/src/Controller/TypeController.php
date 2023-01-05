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
use HighlandVision\Component\Knowres\Administrator\Model\TypeModel;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Joomla\Extend\FormController;
use HighlandVision\KR\Media;
use HighlandVision\KR\Translations;
use Joomla\CMS\MVC\Model\BaseDatabaseModel;
use Joomla\CMS\Router\Route;
use Joomla\String\StringHelper;

/**
 * Type controller form class.
 *
 * @since 1.0.0
 */
class TypeController extends FormController
{
	/**
	 * Delete region pdf files
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	public function delpdf()
	{
		$this->checkToken();

		$id = $this->input->getInt('id', 0);
		if (!$id)
		{
			$this->setRedirect(Route::_('index.php?option=com_knowres&view=types', false));

			return false;
		}

		$pdfNameArray = $this->input->get('pdf', [], 'array');
		if (!count($pdfNameArray))
		{
			KrMethods::message(KrMethods::plain('COM_KNOWRES_PDF_DELETE'), 'error');
			$this->setRedirect(Route::_('index.php?option=com_knowres&view=type&layout=edit&id=' . $id, false));

			return;
		}

		Media::deletePdfs('types', $id, $pdfNameArray);

		$this->setRedirect(Route::_('index.php?option=com_knowres&view=type&layout=edit&id=' . $id, false));
	}

	/**
	 * Upload region pdf files
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	public function uploadpdf()
	{
		$this->checkToken();

		$id = $this->input->get('id', 0, 'integer');
		if (!$id)
		{
			$this->setRedirect(Route::_('index.php?option=com_knowres&view=types', false));

			return false;
		}

		$name     = $_FILES['uploadpdf']['name'];
		$filetype = $_FILES['uploadpdf']['type'];
		$tmpName  = $_FILES['uploadpdf']['tmp_name'];

		Media::uploadPdf('types', $id, $name, $filetype, $tmpName);

		$this->setRedirect(Route::_('index.php?option=com_knowres&view=type&layout=edit&id=' . $id, false));
	}

	/**
	 * Process additional requirements after save payment
	 *
	 * @param   BaseDatabaseModel  $model      The data model object.
	 * @param   array              $validData  The validated data.
	 *
	 * @throws Exception
	 * @throws Exception
	 * @since  1.0.0
	 */
	protected function postSaveHook(BaseDatabaseModel $model, $validData = [])
	{
		/** @var TypeModel $model */
		$id           = $model->getItem()->get('id');
		$name         = (string) $validData['name'];
		$abbreviation = (string) $validData['abbreviation'];

		if ($this->input->get('task') == 'save2copy')
		{
			$abbreviation = StringHelper::increment($abbreviation);
		}

		$translation = new Translations();
		$translation->updateDefault('type', $id, 'name', $name);
		$translation->updateDefault('type', $id, 'abbreviation', $abbreviation);
	}
}