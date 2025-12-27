<?php
/**
 * @package    Know Reservations
 * @subpackage Admin Controllers
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Administrator\Controller;

use Joomla\CMS\MVC\Controller\AdminController;
use Joomla\CMS\MVC\Model\BaseDatabaseModel;

// phpcs:disable PSR1.Files.SideEffects
defined('_JEXEC') || die;
// phpcs:enable PSR1.Files.SideEffects

/**
 * Regions controller list class.
 *
 * @since 1.0.0
 */
class RegionsController extends AdminController
{
    /**
     * Proxy for getModel.
     *
     * @param   string  $name
     * @param   string  $prefix
     * @param   array   $config
     *
     * @return bool|BaseDatabaseModel
     * @since  1.6
     */
    public function getModel($name = 'region', $prefix = 'Administrator',
        $config = ['ignore_request' => true]): BaseDatabaseModel|bool
    {
        return parent::getModel($name, $prefix, $config);
    }
}