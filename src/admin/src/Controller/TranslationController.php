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
use HighlandVision\KR\Joomla\Extend\FormController;
use HighlandVision\KR\Translations;
use JetBrains\PhpStorm\NoReturn;
use Joomla\CMS\MVC\Model\BaseDatabaseModel;

/**
 * Translation controller class.
 *
 * @since 1.0.0
 */
class TranslationController extends FormController
{
	/** @var string The prefix to use with controller messages. */
	protected $text_prefix = 'COM_KNOWRES_TRANSLATION';

	/**
	 * Modal for translations
	 *
	 * @throws Exception
	 * @since   3.0
	 * @return  void
	 */
	#[NoReturn] public function translateme(): void
	{
		$this->checkToken();

		$view = $this->getView('translation', 'translateme');
		$view->display();
	}

	/**
	 * Function that allows child controller access to model data after the data has been saved.
	 *
	 * @param  BaseDatabaseModel  $model      The data model object.
	 * @param  array              $validData  The validated data.
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	protected function postSaveHook(BaseDatabaseModel $model, $validData = []): void
	{
		$item = (string) $validData['item'];

		$Translations = new Translations();
		$Translations->cleanTranslationCache($item);
	}
}