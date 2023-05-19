<?php
/**
 * @package    Know Reservations
 * @subpackage Admin Controller
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Administrator\Controller;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Session as KrSession;
use HighlandVision\KR\Utility;
use Joomla\CMS\Application\CMSApplication;
use Joomla\CMS\MVC\Controller\BaseController;
use Joomla\CMS\MVC\Factory\MVCFactoryInterface;
use Joomla\Input\Input;

use function count;
use function defined;
use function implode;
use function in_array;
use function is_countable;

/**
 * Knowres master display controller.
 *
 * @since  1.6
 */
class DisplayController extends BaseController
{
	/** @var string The default view */
	protected $default_view = 'contracts';

	/**
	 * Constructor.
	 *
	 * @param   array                     $config   An optional associative array of configuration settings.
	 *                                              Recognized key values include 'name', 'default_task', 'model_path', and
	 *                                              'view_path' (this list is not meant to be comprehensive).
	 * @param   MVCFactoryInterface|null  $factory  The factory.
	 * @param   CMSApplication|null       $app      The Application for the dispatcher
	 * @param   Input|null                $input    Input
	 *
	 * @throws Exception
	 * @since  3.0
	 */
	public function __construct($config = [], MVCFactoryInterface $factory = null, ?CMSApplication $app = null,
		?Input $input = null)
	{
		$userSession = new KrSession\User();
		$userData    = $userSession->getData();

		if (empty($userData->access_level))
		{
			$user = KrMethods::getUser();
			if ($user->id)
			{
				$manager = KrFactory::getAdminModel('manager')->getManagerbyUserId($user->id);
				if (isset($manager->id))
				{
					$manager->properties    = Utility::decodeJson($manager->properties, true);
					$userData->access_level = $manager->access_level;
					$userData->agency_id    = $manager->agency_id;
					$userData->manager_id   = $manager->id;

					if (count($manager->properties))
					{
						$userData->properties = implode(',', $manager->properties);
					}
					else
					{
						$userData->properties = '';
					}
					$userSession->setData($userData);

					if ($manager->access_level == 10 && !count($manager->properties))
					{
						KrMethods::message(KrMethods::plain('You have not been assigned any properties. Please contact your system administrator.'),
							'error');
						$this->setRedirect(KrMethods::route('index.php', false));

						return;
					}
				}
				else
				{
					KrMethods::message(KrMethods::plain('You are not authorised to access the requested page. Please contact your system administrator.'),
						'error');
					$this->setRedirect(KrMethods::route('index.php', false));

					return;
				}
			}
			else
			{
				KrMethods::message(KrMethods::plain('You are not authorised to access the requested page. Please contact your system administrator.'),
					'error');
				$this->setRedirect(KrMethods::route('index.php', false));

				return;
			}
		}

		parent::__construct($config, $factory, $app, $input);
	}

	/**
	 * Method to display a view.
	 *
	 * @param   bool   $cachable   If true, the view output will be cached
	 * @param   array  $urlparams  An array of safe url parameters and their variable types, for valid values see {@link FilterInput::clean()}
	 *
	 * @throws  Exception
	 * @since   1.0.0
	 * @return  BaseController|bool  This object to support chaining.
	 */
	public function display($cachable = false, $urlparams = []): BaseController|bool
	{
		$view   = KrMethods::inputString('view', 'contracts', 'get');
		$layout = KrMethods::inputString('layout', 'default', 'get');
		$id     = KrMethods::inputInt('id', 0, 'get');

		$userSession = new KrSession\User();
		$userData    = $userSession->getData();

		$valid = [
			'contract',
			'contracts',
			'contractfee',
			'contractguestdata',
			'contractnote',
			'contractpayment',
			'coupon',
			'coupons',
			'discount',
			'discounts',
			'extras',
			'extra',
			'gantt',
			'guest',
			'images',
			'image',
			'properties',
			'property',
			'propertyicals',
			'propertyical',
			'propertyoptions',
			'propertyoption',
			'propertyrooms',
			'propertyroom',
			'propertysettings',
			'propertysetting',
			'media',
			'rate',
			'rates'
		];

		if ((int) $userData->access_level < 40 && !in_array($view, $valid))
		{
			$this->setRedirect(KrMethods::route('index.php?option=com_knowres', false));

			return false;
		}

		$valid10 = [
			'contract',
			'contracts',
			'discount',
			'discounts',
			'gantt',
			'image',
			'images',
			'media',
			'properties',
			'property',
			'propertyicals',
			'propertyical',
			'propertyrooms',
			'propertyroom',
			'rate',
			'rates',
		];

		if ((int) $userData->access_level < 20 && !in_array($view, $valid10))
		{
			$this->setRedirect(KrMethods::route('index.php?option=com_knowres', false));

			return false;
		}

		$context = 'com_knowres.edit.' . $view;
		if ($layout == 'edit' && !$id && !KrMethods::getUser()->authorise('core.edit', 'com_knowres'))
		{
			KrMethods::message(KrMethods::sprintf('JLIB_APPLICATION_ERROR_UNHELD_ID', $id), 'error');
			$this->setRedirect(KrMethods::route('index.php?option=com_knowres', false));

			return false;
		}

		if ($layout == 'edit' && !$this->checkEditId($context, $id))
		{
			KrMethods::message(KrMethods::sprintf('JLIB_APPLICATION_ERROR_UNHELD_ID', $id), 'error');
			$this->setRedirect(KrMethods::route('index.php?option=com_knowres', false));

			return false;
		}

		$requireProperty = [
			'contract',
			'coupons',
			'discounts',
			'extras',
			'images',
			'media',
			'property',
			'propertyicals',
			'propertyoptions',
			'propertyrooms',
			'rates'
		];

		if (in_array($view, $requireProperty))
		{
			$property_id = KrMethods::inputInt('property_id', 0, 'get');
			if (!$property_id)
			{
				$cid = KrMethods::inputArray('cid', [], 'get');
				if (is_countable($cid) && count($cid) == 1)
				{
					$property_id = (int) $cid[0];
				}
			}
			if (!$property_id)
			{
				$property_id = (int) $userData->cr_property_id;
			}

			if ((int) $userData->cr_property_id != $property_id)
			{
				if ($property_id)
				{
					$property                   = KrFactory::getAdminModel('property')->getItem($property_id);
					$userData->cr_property_id   = $property_id;
					$userData->cr_property_name = (string) $property->property_name;
					$userData->cr_country_id    = (int) $property->country_id;
					$userData->cr_region_id     = (int) $property->region_id;
					$userData->cr_town_id       = (int) $property->town_id;
				}
				else
				{
					$userData->cr_property_id   = 0;
					$userData->cr_property_name = '';
					$userData->cr_country_id    = 0;
					$userData->cr_region_id     = 0;
					$userData->cr_town_id       = 0;
				}
			}
		}

		$userSession->setData($userData);

		return parent::display();
	}
}