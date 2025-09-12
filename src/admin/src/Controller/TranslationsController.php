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
use HighlandVision\KR\Translations;
use Joomla\CMS\MVC\Controller\AdminController;
use Joomla\CMS\MVC\Model\BaseDatabaseModel;

/**
 * Translations controller list class.
 *
 * @since 1.0.0
 */
class TranslationsController extends AdminController
{
	/**
	 * Clear the translations cache
	 *
	 * @throws Exception
	 * @since  2.4.0
	 */
	public function clearcache(): void
	{
		$Translations = new Translations();
		$Translations->cleanTranslationCache();

		KrMethods::message(KrMethods::plain('Cache has been cleared'));
		$this->setRedirect(KrMethods::route('index.php?option=com_knowres&view=translations', false));
	}

	/**
	 * Proxy for getModel.
	 *
	 * @param   string  $name    Model name
	 * @param   string  $prefix  Model prefix administrator or site (defaults to administrator)
	 * @param   array   $config  Config options
	 *
	 * @since  1.6
	 * @return bool|BaseDatabaseModel
	 */
	public function getModel($name = 'translation', $prefix = 'Administrator',
		$config = ['ignore_request' => true]): BaseDatabaseModel|bool
	{
		return parent::getModel($name, $prefix, $config);
	}
}