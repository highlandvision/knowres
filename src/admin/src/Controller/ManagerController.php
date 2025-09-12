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

use HighlandVision\KR\Joomla\Extend\FormController;
use Joomla\CMS\Versioning\VersionableControllerTrait;

/**
 * Manager controller class
 *
 * @since 1.0.0
 */
class ManagerController extends FormController
{
	use VersionableControllerTrait;
}