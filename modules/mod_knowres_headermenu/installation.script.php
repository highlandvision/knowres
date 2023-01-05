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
 * Installation script
 *
 * @since 1.0.0
 */
class modKnowresHeadermenuInstallerScript
{
	/**
	 * Publish and set the module position on installation
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	function postflight($type, $parent): void
	{
		if (strtolower($type) === 'install')
		{
			$db    = Factory::getDbo();
			$query = $db->getQuery(true);

			$query->update('#__modules');
			$query->set([$db->qn('position') . '=' . $db->q('status')]);
			$query->where([
				$db->qn('module') . '=' . $db->q('mod_knowres_headermenu'),
				$db->qn('client_id') . '=1'
			]);

			$db->setQuery($query);
			$db->execute();
		}
	}
}