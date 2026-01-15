<?php

/**
 * @package    Know_Reservations
 * @subpackage Admin Controllers
 * @author     Hazel Wilson <hazel@highlandvision.com>
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 */

namespace HighlandVision\Component\Knowres\Administrator\Controller;

use Joomla\CMS\MVC\Controller\AdminController;
use Joomla\CMS\MVC\Model\BaseDatabaseModel;

// phpcs:disable PSR1.Files.SideEffects
defined('_JEXEC') || die;
// phpcs:enable PSR1.Files.SideEffects

/**
 * Agencies controller list class.
 *
 * @since 1.0.0
 */
class AgenciesController extends AdminController
{
    /**
     * Proxy for getModel.
     *
     * @param   string  $name  Model name
     * @param   string  $prefix  Model prefix administrator or site (defaults to Administrator)
     * @param   array   $config  Configuration array for model. Optional.
     *
     * @return  bool|BaseDatabaseModel Model object on success; otherwise false on failure.
     * @since   1.6
     */
    public function getModel(
        $name = 'agency',
        $prefix = 'Administrator',
        $config = ['ignore_request' => true],
    ): bool|BaseDatabaseModel {
        return parent::getModel($name, $prefix, $config);
    }
}