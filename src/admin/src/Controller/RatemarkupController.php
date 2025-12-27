<?php
/**
 * @package    Know Reservations
 * @subpackage Admin Controllers
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Administrator\Controller;

use Exception;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Joomla\Extend\FormController;
use Joomla\CMS\MVC\Model\BaseDatabaseModel;

// phpcs:disable PSR1.Files.SideEffects
defined('_JEXEC') || die;
// phpcs:enable PSR1.Files.SideEffects

/**
 * Rate markup controller form class.
 *
 * @since 1.0.0
 */
class RatemarkupController extends FormController
{
    /**
     * Process additional requirements after save
     *
     * @param   BaseDatabaseModel  $model      The data model object.
     * @param   array              $validData  The validated data.
     *
     * @throws Exception
     * @since  3.1
     */
    protected function postSaveHook(BaseDatabaseModel $model, $validData = []): void
    {
        KrFactory::getAdminModel('servicequeue')::serviceQueueUpdate('updatePropertyRates',
            (int)$validData['property_id'], 0, null, $validData['valid_from'], $validData['valid_to'],
        );
    }
}