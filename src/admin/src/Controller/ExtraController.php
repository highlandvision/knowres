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
use HighlandVision\Component\Knowres\Administrator\Model\ExtraModel;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Joomla\Extend\FormController;
use HighlandVision\KR\Translations;
use Joomla\CMS\MVC\Model\BaseDatabaseModel;
use Joomla\String\StringHelper;

// phpcs:disable PSR1.Files.SideEffects
defined('_JEXEC') || die;
// phpcs:enable PSR1.Files.SideEffects

/**
 * Extra controller form class
 *
 * @since 1.0.0
 */
class ExtraController extends FormController
{
    /**
     * Process additional requirements after save payment
     *
     * @param   BaseDatabaseModel  $model      The data model object.
     * @param   array              $validData  The validated data.
     *
     * @throws Exception
     * @since  1.0.0
     */
    protected function postSaveHook(BaseDatabaseModel $model, $validData = []): void
    {
        /* @var ExtraModel $model */
        $item        = $model->getItem();
        $name        = (string)$validData['name'];
        $description = (string)$validData['description'];

        if ($this->input->get('task') == 'save2copy') {
            $name = StringHelper::increment($name);
        }

        $Translations = new Translations();
        $Translations->updateDefault('extra', $item->id, 'name', $name);
        $Translations->updateDefault('extra', $item->id, 'description', $description);

        if ($validData['cleaning']) {
            /* @var ServicequeueModel $serviceQueue */
            $serviceQueue = KrFactory::getAdminModel('servicequeue');
            $serviceQueue::serviceQueueUpdate('updateProperty', (int)$validData['property_id'], 0, 'ru');
            $serviceQueue::serviceQueueUpdate('updatePropertyRates', (int)$validData['property_id'], 0, 'vrbo');
        }
    }
}