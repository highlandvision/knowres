<?php
/**
 * @package    Know Reservations
 * @subpackage Plugin
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

use Joomla\CMS\Factory;

defined('_JEXEC') or die;

/**
 * Installation/Uninstallation script
 *
 * @since 1.0.0
 */
class plgSystemKnowresredirectInstallerScript
{
	/**
	 * Publish the plugin on installation
	 *
	 * @throws Exception
	 * @since 1.0.0
	 */
	function postflight($type, $parent): void
	{
		if (strtolower($type) === 'install')
		{
			$db    = Factory::getDbo();
			$query = $db->getQuery(true);

			$query->update('#__extensions');
			$query->set([$db->qn('enabled') . '=1',
			             $db->qn('protected') . '=0',
			             $db->qn('ordering') . '=9999']);
			$query->where([$db->qn('element') . '=' . $db->q('knowresredirect'),
			               $db->qn('type') . '=' . $db->q('plugin'),
			               $db->qn('folder') . '=' . $db->q('system')]);

			$db->setQuery($query);
			$db->execute();
		}
	}
}