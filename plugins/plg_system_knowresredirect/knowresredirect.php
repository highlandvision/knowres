<?php
/**
 * @package    Know Reservations
 * @subpackage Plugin
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Session as KrSession;
use Joomla\CMS\Plugin\CMSPlugin;

/**
 * Redirect to selected page on login.
 *
 * @since       1.0.0.
 */
class plgSystemKnowresredirect extends CMSPlugin
{
	/**
	 * Checks for return task and if not then redirects to selected KR Dashboard page.
	 *
	 * @param   array  $options  Plugin options
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	function onUserAfterLogin(array $options = [])
	{
		if (KrMethods::isAdmin())
		{
			$user = new KrSession\User();
			$user->setLogin();

			$return = base64_decode(KrMethods::inputString('return', null, 'get'));
			if (empty($return) || $return == 'index.php')
			{
				$landing = KrMethods::getParams()->get('landing', 'view=contracts');
				KrMethods::redirect(KrMethods::route('index.php?option=com_knowres&' . $landing, false));
			}
		}
	}
}