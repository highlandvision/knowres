<?php
/**
 * @package    Know Reservations
 * @subpackage Admin Controllers
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

/** @noinspection PhpUnused */

namespace HighlandVision\Component\Knowres\Administrator\Controller;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use Joomla\CMS\MVC\Controller\AdminController;
use Joomla\CMS\MVC\Model\BaseDatabaseModel;

/**
 * Property settings list controller class.
 *
 * @since 1.0.0
 */
class PropertysettingsController extends AdminController
{
	/**
	 * Process apply request.
	 *
	 * @throws Exception
	 * @since 1.0.0
	 */
	public function apply(): void
	{
		$property_id = KrMethods::inputInt('property_id');
		KrFactory::getAdminModel('propertysetting')->saveSettings($property_id);

		if (!$property_id) {
			$this->setRedirect(KrMethods::route('index.php?option=com_knowres&view=propertysettings', false));
		}
		else {
			$this->setRedirect(KrMethods::route('index.php?option=com_knowres&task=propertysettings.solo&property_id=' . $property_id,
				false));
		}
	}

	/**
	 * Process cancel request.
	 *
	 * @throws Exception
	 * @since 1.0.0
	 */
	public function cancel(): void
	{
		$return = KrMethods::getUserState('com_knowres.gobackto');
		if ($return) {
			KrMethods::setUserState('com_knowres.gobackto', null);
			KrMethods::redirect(KrMethods::route('index.php?option=com_knowres&' . $return, false));
		}
		else {
			KrMethods::redirect(KrMethods::route('index.php?option=com_knowres&view=properties', false));
		}
	}

	/**
	 * Proxy for getModel.
	 *
	 * @param  string  $name    Model name
	 * @param  string  $prefix  Model prefix administrator or site (defaults to administrator)
	 * @param  array   $config  Config options
	 *
	 * @since  1.6
	 * @return bool|BaseDatabaseModel
	 */
	public function getModel($name = 'propertysetting', $prefix = 'Administrator',
		$config = ['ignore_request' => true]): BaseDatabaseModel|bool
	{
		return parent::getModel($name, $prefix, $config);
	}

	/**
	 * Process save & close request.
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	public function save(): void
	{
		$property_id = KrMethods::inputInt('property_id');
		KrFactory::getAdminModel('propertysetting')->saveSettings($property_id);

		$return = KrMethods::getUserState('com_knowres.gobackto');
		KrMethods::redirect(KrMethods::route('index.php?option=com_knowres&' . $return, false));
	}

	/**
	 * Sets the current selected property for the settings view.
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	public function solo(): void
	{
		/** @var PropertysettingsView $view */
		$view = $this->getView('propertysettings', 'html');
		if ($view) {
			$view->task = 'solo';
			$view->display();
		}
	}
}