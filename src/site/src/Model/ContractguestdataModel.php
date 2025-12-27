<?php
/**
 * @package    Know Reservations
 * @subpackage Site Controllers
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Site\Model;

use Exception;
use HighlandVision\Component\Knowres\Administrator\Model\ContractguestdataModel as AdminContractguestdataModel;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\TickTock;
use Joomla\CMS\Form\Form;
use stdClass;

// phpcs:disable PSR1.Files.SideEffects
defined('_JEXEC') or die;
// phpcs:enable PSR1.Files.SideEffects

/**
 * Site contract guest data form model
 *
 * @since 1.0.0
 */
class ContractguestdataModel extends AdminContractguestdataModel
{
    /**
     * Override checkout for guestdata as checked_out set to 0.
     *
     * @param   int|null  $pk  The id of the row to check out.
     *
     * @return bool  True on success, false on failure
     * @throws Exception
     * @since  4.0.0
     */
    public function checkout($pk = null): bool
    {
        if (!empty($pk)) {
            $update                   = new stdClass();
            $update->id               = $pk;
            $update->checked_out      = 0;
            $update->checked_out_time = TickTock::getTs();
            KrFactory::update('contract_guestdata', $update);
        }

        return true;
    }

    /**
     * Method to get the record form.
     *
     * @param   array   $data      An optional array of data for the form to interogate.
     * @param   bool    $loadData  True if the form is to load its own data (default case), false if not.
     * @param  ?string  $source    The form name if required.
     *
     * @return Form|false    A Form object on success, false on failure
     * @throws Exception
     * @since  1.0
     */
    public function getForm($data = [], $loadData = true, ?string $source = 'contractguestdata'): Form|false
    {
        return parent::getForm();
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
        $data = KrMethods::getUserState('com_knowres.edit.contractguestdataform.data', []);
        if (empty($data)) {
            $data = $this->getItem();
        }

        return $data;
    }
}