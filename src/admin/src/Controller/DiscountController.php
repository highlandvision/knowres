<?php
/**
 * @package    Know Reservations
 * @subpackage Admin Controllers
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Administrator\Controller;

// phpcs:disable PSR1.Files.SideEffects
defined('_JEXEC') || die;
// phpcs:enable PSR1.Files.SideEffects

/**
 * Discount controller form class.
 *
 * @since 1.0.0
 */
class DiscountController extends FormController
{
    /**
     * Process additional requirements after save payment
     *
     * @param   BaseDatabaseModel  $model      The data model object.
     * @param   array              $validData  The validated data.
     *
     * @return void
     * @throws Exception
     * @since  3.1
     */
    protected function postSaveHook(BaseDatabaseModel $model, $validData = []): void
    {
        /* @var DiscountModel $model */
        $item = $model->getItem();
        $name = (string)$validData['name'];

        if ($this->input->get('task') == 'save2copy') {
            $name = StringHelper::increment($name);
        }

        $Translations = new Translations();
        $Translations->updateDefault('discount', $item->id, 'name', $name);

        /* @var ServicequeueModel $serviceQueue */
        $serviceQueue = KrFactory::getAdminModel('servicequeue');
        $serviceQueue::serviceQueueUpdate('updatePropertyRates', (int)$validData['property_id'], 0, null,
            (string)$validData['valid_from'], (string)$validData['valid_to'],
        );
    }
}