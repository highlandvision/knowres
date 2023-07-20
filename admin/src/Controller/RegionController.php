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
use HighlandVision\KR\Joomla\Extend\FormController;
use HighlandVision\KR\Media;
use HighlandVision\KR\Translations;
use Joomla\CMS\MVC\Model\BaseDatabaseModel;
use Joomla\CMS\Versioning\VersionableControllerTrait;
use Joomla\String\StringHelper;

/**
 * Region controller class.
 *
 * @since 1.0.0
 */
class RegionController extends FormController
{
	use VersionableControllerTrait;

	/**
	 * Delete region pdf files
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	public function delpdf(): void
	{
		$this->checkToken();

		$id = KrMethods::inputInt('id', 0, 'get');
		if (!$id)
		{
			KrMethods::redirect(KrMethods::route('index.php?option=com_knowres&view=regions', false));
		}

		$pdfNameArray = KrMethods::inputArray('pdf', [], 'get');
		if (!count($pdfNameArray))
		{
			KrMethods::redirect(KrMethods::plain('COM_KNOWRES_PDF_DELETE'), 'error');
		}

		Media::deletePdfs('regions', $id, $pdfNameArray);

		KrMethods::redirect(KrMethods::route('index.php?option=com_knowres&view=region&layout=edit&id=' . $id, false));
	}

	/**
	 * Upload region pdf files
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	public function uploadpdf(): void
	{
		$this->checkToken();

		$id = KrMethods::inputInt('id', 0, 'get');
		if (!$id)
		{
			KrMethods::redirect(KrMethods::route('index.php?option=com_knowres&view=regions', false));
		}

		$name     = $_FILES['uploadpdf']['name'];
		$filetype = $_FILES['uploadpdf']['type'];
		$tmpName  = $_FILES['uploadpdf']['tmp_name'];

		Media\Pdf::uploadPdf('regions', $id, $name, $filetype, $tmpName);

		KrMethods::redirect(KrMethods::route('index.php?option=com_knowres&view=region&layout=edit&id=' . $id, false));
	}

	/**
	 * Function that allows child controller access to model data after the data has been saved.
	 *
	 * @param   BaseDatabaseModel  $model      The data model object.
	 * @param   array              $validData  The validated data.
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	protected function postSaveHook(BaseDatabaseModel $model, $validData = []): void
	{
		$name  = (string) $validData['name'];
		$blurb = (string) $validData['blurb'];
		if (KrMethods::inputString('task', '', 'get') == 'save2copy')
		{
			$name = StringHelper::increment($name);
		}

		/* @var RegionModel $model */
		$id           = (int) $model->getItem()->get('id');
		$Translations = new Translations();
		$Translations->updateDefault('region', $id, 'name', $name);
		$Translations->updateDefault('region', $id, 'blurb', $blurb);
	}
}