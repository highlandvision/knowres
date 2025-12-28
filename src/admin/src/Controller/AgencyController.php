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
use HighlandVision\Component\Knowres\Administrator\Model\AgencyModel;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Joomla\Extend\FormController;
use HighlandVision\KR\Translations;
use JetBrains\PhpStorm\NoReturn;
use Joomla\CMS\MVC\Model\BaseDatabaseModel;
use Joomla\CMS\Response\JsonResponse;
use Joomla\CMS\Versioning\VersionableControllerTrait;

use function jexit;

// phpcs:disable PSR1.Files.SideEffects
defined('_JEXEC') || die;
// phpcs:enable PSR1.Files.SideEffects

/**
 * Agency controller class.
 *
 * @since        1.0.0
 * @noinspection PhpUnused
 */
class AgencyController extends FormController
{
    use VersionableControllerTrait;

    /**
     * Return regions combo
     *
     * @throws  Exception
     * @since        1.0.0
     * @noinspection PhpUnused
     */
    #[NoReturn]
    public function combo(): void
    {
        $model     = new AgencyModel();
        $form      = $model->getForm([], false);
        $parent_id = KrMethods::inputInt('parent');
        $target    = KrMethods::inputString('target');

        if ($target == 'region_id') {
            $form->setValue('country_id', null, $parent_id);
        } else {
            $form->setValue('region_id', null, $parent_id);
        }

        $wrapper         = [];
        $wrapper['html'] = $form->getInput($target);

        echo new JsonResponse($wrapper);
        jexit();
    }

    /**
     * Function that allows child controller access to model data after the data has been saved.
     *
     * @param   BaseDatabaseModel  $model      The data model object.
     * @param   array              $validData  The validated data.
     *
     * @throws  Exception
     * @since   1.0.0
     */
    protected function postSaveHook(BaseDatabaseModel $model, $validData = []): void
    {
        /** @var AgencyModel $model */
        $item                 = $model->getItem();
        $gdpr_statement       = (string)$validData['gdpr_statement'];
        $cancellation_terms   = (string)$validData['cancellation_terms'];
        $insurance_disclaimer = (string)$validData['insurance_disclaimer'];

        $Translations = new Translations();
        $Translations->updateDefault('agency', $item->id, 'gdpr_statement', $gdpr_statement);
        $Translations->updateDefault('agency', $item->id, 'cancellation_terms', $cancellation_terms);
        $Translations->updateDefault('agency', $item->id, 'insurance_disclaimer', $insurance_disclaimer);
    }
}