<?php
/**
 * @package    Know Reservations
 * @subpackage Admin Controller
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Administrator\Controller;

use Exception;
use HighlandVision\Component\Knowres\Administrator\Model\RateModel;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Joomla\Extend\FormController;
use HighlandVision\KR\Translations;
use Joomla\CMS\MVC\Model\BaseDatabaseModel;
use Joomla\String\StringHelper;

// phpcs:disable PSR1.Files.SideEffects
defined('_JEXEC') || die;
// phpcs:enable PSR1.Files.SideEffects

/**
 * Rate controller form class
 *
 * @since 1.0.0
 */
class RateController extends FormController
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
        /** @var RateModel $model */
        $item = $model->getItem();
        $name = (string)$validData['name'];

        if ($this->input->get('task') == 'save2copy') {
            $name = StringHelper::increment($name);
        }

        $Translations = new Translations();
        $Translations->updateDefault('rate', $item->id, 'name', $name);

        /* @var ServicequeueModel $serviceQueue */
        $serviceQueue = KrFactory::getAdminModel('servicequeue');
        $serviceQueue::serviceQueueUpdate('updateAvailability', (int)$validData['property_id']);
        $serviceQueue::serviceQueueUpdate('updatePropertyRates', (int)$validData['property_id'], 0, null,
            (string)$validData['valid_from'], (string)$validData['valid_to'],
        );
    }
}