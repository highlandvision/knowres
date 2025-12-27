<?php
/**
 * @package    Know Reservations
 * @subpackage Site
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Site\Model;

use Exception;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Joomla\Extend\AdminModel;
use Joomla\CMS\Form\Form;

// phpcs:disable PSR1.Files.SideEffects
defined('_JEXEC') or die;
// phpcs:enable PSR1.Files.SideEffects

/**
 * Confirm payment
 *
 * @since 1.0.0
 */
class ConfirmModel extends AdminModel
{
    /**
     * Method to get the profile form.
     * The base form is loaded from XML
     *
     * @param   array   $data      An optional array of data for the form to interogate.
     * @param   bool    $loadData  True if the form is to load its own data (default case), false if not.
     * @param  ?string  $source    The form name if required.
     *
     * @return Form|false    A Form object on success, false on failure
     * @throws Exception
     * @since  1.0.0
     */
    public function getForm($data = [], $loadData = true, ?string $source = null): Form|false
    {
        $form = $this->loadForm('com_knowres.confirm', 'confirm', ['control' => 'jform', 'load_data' => $loadData]);
        if (empty($form)) {
            return false;
        }

        return $form;
    }

    /**
     * Get the form data from session as no item.
     *
     * @return object|false Session data
     * @since  1.0.0
     */
    public function getItem($pk = null): object|false
    {
        return $this->state->get('formdata');
    }

    /**
     * Method to get the data that should be injected in the form.
     *
     * @return mixed    The data for the form.
     * @throws Exception
     * @since  1.6
     */
    protected function loadFormData(): mixed
    {
        $data = KrMethods::getUserState('com_knowres.edit.confirm.data', []);
        if (empty($data)) {
            $data = $this->getItem();
        }

        return $data;
    }
}