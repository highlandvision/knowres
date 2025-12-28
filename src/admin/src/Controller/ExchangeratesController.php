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
defined('_JEXEC') or die;
// phpcs:enable PSR1.Files.SideEffects

/**
 * Exchange rates controller list class.
 *
 * @since 1.0.0
 */
class ExchangeratesController extends AdminController
{
    /**
     * Proxy for getModel.
     *
     * @param   string  $name    Model name
     * @param   string  $prefix  Model prefix administrator or site (defaults to administrator)
     * @param   array   $config  Configuration options
     *
     * @return bool|BaseDatabaseModel
     * @since  1.6
     */
    public function getModel($name = 'exchangerate', $prefix = 'Administrator',
        $config = ['ignore_request' => true]): BaseDatabaseModel|bool
    {
        return parent::getModel($name, $prefix, $config);
    }
}