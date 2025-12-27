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
use HighlandVision\Component\Knowres\Administrator\Model\PropertyoptionModel;
use HighlandVision\KR\Joomla\Extend\FormController;
use HighlandVision\KR\Translations;
use Joomla\CMS\MVC\Model\BaseDatabaseModel;
use Joomla\String\StringHelper;

// phpcs:disable PSR1.Files.SideEffects
defined('_JEXEC') || die;
// phpcs:enable PSR1.Files.SideEffects

/**
 * Property option controller form class.
 *
 * @since 1.0.0
 */
class PropertyoptionController extends FormController
{
    /**
     * Process additional requirements after save payment
     *
     * @param   BaseDatabaseModel  $model      The data model object.
     * @param   array              $validData  The validated data.
     *
     * @throws Exception
     * @since  3.1
     */
    protected function postSaveHook(BaseDatabaseModel $model, $validData = []): void
    {
        /** @var PropertyoptionModel $model */
        $item = $model->getItem();
        $name = (string)$validData['name'];

        if ($this->input->get('task') == 'save2copy') {
            $name = StringHelper::increment($name);
        }

        $Translations = new Translations();
        $Translations->updateDefault('propertyoption', $item->id, 'name', $name);
    }
}