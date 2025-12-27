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
use HighlandVision\Component\Knowres\Administrator\Model\EmailtemplateModel;
use HighlandVision\KR\Joomla\Extend\FormController;
use HighlandVision\KR\Translations;
use HighlandVision\KR\Utility;
use Joomla\CMS\MVC\Model\BaseDatabaseModel;

// phpcs:disable PSR1.Files.SideEffects
defined('_JEXEC') || die;
// phpcs:enable PSR1.Files.SideEffects

/**
 * Emailtemplate controller form class.
 *
 * @since 1.0.0
 */
class EmailtemplateController extends FormController
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
        /* @var EmailtemplateModel $model */
        $item    = $model->getItem();
        $name    = (string)$validData['name'];
        $subject = (string)$validData['subject'];
        $blurb   = (string)$validData['blurb'];

        if ($this->input->get('task') == 'save2copy') {
            $name = Utility::generateNewName($name);
        }

        $Translations = new Translations();
        $Translations->updateDefault('emailtemplate', $item->id, 'name', $name);
        $Translations->updateDefault('emailtemplate', $item->id, 'subject', $subject);
        $Translations->updateDefault('emailtemplate', $item->id, 'blurb', $blurb);
    }
}