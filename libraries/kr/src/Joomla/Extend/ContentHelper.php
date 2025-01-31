<?php
/**
 * Joomla! Content Management System
 *
 * @copyright  (C) 2013 Open Source Matters, Inc. <https://www.joomla.org>
 * @license        GNU General Public License version 2 or later; see LICENSE.txt
 */

namespace HighlandVision\KR\Joomla\Extend;

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Session as KrSession;
use Joomla\CMS\Access\Access;
use Joomla\CMS\Factory;
use Joomla\CMS\Language\Text;
use Joomla\CMS\Log\Log;
use Joomla\CMS\Object\CMSObject;

use function defined;

/**
 * Helper for standard content style extensions.
 * This class mainly simplifies static helper methods often repeated in individual components
 *
 * @since  3.1
 */
class ContentHelper extends \Joomla\CMS\Helper\ContentHelper
{
	/**
	 * Gets a list of the actions that can be performed.
	 *
	 * @param  string   $component  The component name.
	 * @param  string   $section    The access section name.
	 * @param  integer  $id         The item ID.
	 *
	 * @since   3.2
	 * @return  object
	 */
	public static function getActions($component = 'com_knowres', $section = '', $id = 0): object
	{
		$assetName = $component;

		if ($section && $id)
		{
			$assetName .= '.' . $section . '.' . (int) $id;
		}

		$result = new CMSObject();

		$user = Factory::getUser();

		$actions = Access::getActionsFromFile(
			JPATH_ADMINISTRATOR . '/components/' . $component . '/access.xml',
			'/access/section[@name="component"]/'
		);

		if ($actions === false)
		{
			Log::add(
				Text::sprintf('JLIB_ERROR_COMPONENTS_ACL_CONFIGURATION_FILE_MISSING_OR_IMPROPERLY_STRUCTURED',
					$component),
				Log::ERROR,
				'jerror'
			);

			return $result;
		}

		$params       = KrMethods::getParams();
		$userSession  = new KrSession\User();
		$access_level = $userSession->getAccessLevel();

		foreach ($actions as $action)
		{
			$result->set($action->name, $user->authorise($action->name, $assetName));

			if (($action->name == 'core.admin' || $action->name == 'core.delete') && $access_level == 40)
			{
				$result->set($action->name, $user->authorise($action, $assetName));
			}
			else if ($action->name != 'core.admin' && $action->name != 'core.delete' && $access_level > 10)
			{
				$result->set($action->name, $user->authorise($action->name, $assetName));
			}
			else
			{
				// These should be owners that have component specific rights
				if ($action->name == 'core.admin' || $action->name == 'core.manage')
				{
					$result->set($action->name, false);
				}
				else if ($action->name == 'core.create')
				{
					if ($section == 'property' || $section == 'image')
					{
						if ($params->get('property_add'))
						{
							$result->set($action->name, $user->authorise($action->name, $assetName));
						}
					}
					else if ($section == 'contract')
					{
						if ($params->get('contract_add'))
						{
							$result->set($action->name, $user->authorise($action->name, $assetName));
						}
					}
					else if ($section == 'rate')
					{
						if ($params->get('rate_manage'))
						{
							$result->set($action->name, $user->authorise($action->name, $assetName));
						}
					}
					else if ($section == 'discount')
					{
						if ($params->get('discount_manage'))
						{
							$result->set($action->name, $user->authorise($action->name, $assetName));
						}
					}
					else if ($section == 'extra')
					{
						if ($params->get('extra_manage'))
						{
							$result->set($action->name, $user->authorise($action->name, $assetName));
						}
					}
				}
				else if ($action->name == 'core.edit' || $action->name == 'core.edit.state')
				{
					if ($section == 'property' || $section == 'image')
					{
						if ($params->get('property_edit'))
						{
							$result->set($action->name, $user->authorise($action->name, $assetName));
						}
					}
					else if ($section == 'contract')
					{
						if ($params->get('contract_edit'))
						{
							$result->set($action->name, $user->authorise($action->name, $assetName));
						}
					}
					else if ($section == 'rate')
					{
						if ($params->get('rate_manage'))
						{
							$result->set($action->name, $user->authorise($action->name, $assetName));
						}
					}
					else if ($section == 'discount')
					{
						if ($params->get('discount_manage'))
						{
							$result->set($action->name, $user->authorise($action->name, $assetName));
						}
					}
					else if ($section == 'extra')
					{
						if ($params->get('extra_manage'))
						{
							$result->set($action->name, $user->authorise($action->name, $assetName));
						}
					}
				}
			}
		}

		return $result;
	}
}
