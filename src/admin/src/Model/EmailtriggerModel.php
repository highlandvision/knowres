<?php
/**
 * @package    Know Reservations
 * @subpackage Admin Models
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Administrator\Model;

use Exception;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Joomla\Extend\AdminModel;
use HighlandVision\KR\Utility;
use Joomla\CMS\Factory;
use Joomla\CMS\Versioning\VersionableControllerTrait;
use RuntimeException;

// phpcs:disable PSR1.Files.SideEffects
defined('_JEXEC') or die;
// phpcs:enable PSR1.Files.SideEffects

/**
 * Knowres Email trigger model.
 *
 * @since 1.0.0
 */
class EmailtriggerModel extends AdminModel
{
    use VersionableControllerTrait;

    /**  @var string The type alias. */
    public $typeAlias = 'com_knowres.emailtrigger';
    /** @var mixed Batch copy/move command. If set to false, the batch copy/move command is not supported. */
    protected $batch_copymove = false;
    /**  @var ?string The prefix to use with controller messages. */
    protected $text_prefix = 'COM_KNOWRES_EMAILTRIGGER';

    /**
     * Method to get a knowres record.
     *
     * @param   int  $pk  The id of the primary key.
     *
     * @return object|false  Object on success, false on failure.
     * @since  1.0.0
     */
    public function getItem($pk = null): object|false
    {
        $item = parent::getItem($pk);
        if ($item) {
            $item->booking_status = Utility::decodeJson($item->booking_status, true);
        }

        return $item;
    }

    /**
     * Method to get the data that should be injected in the form.
     *
     * @return mixed The data for the form.
     * @throws Exception
     * @since  1.0.0
     */
    protected function loadFormData(): mixed
    {
        $data = KrMethods::getUserState('com_knowres.edit.emailtrigger.data', []);
        if (empty($data)) {
            $data = $this->getItem();
        }

        return $data;
    }

    /**
     * Prepare and sanitize the table prior to saving.
     *
     * @param $table
     *
     * @throws RuntimeException
     * @throws Exception
     * @since  1.0.0
     */
    protected function prepareTable($table): void
    {
        $jform = Factory::getApplication()->input->post->get('jform', [], 'array');

        if (empty($jform['booking_status'])) {
            $table->booking_status = '';
        }

        $trigger_actual  = [
            'GUESTARRIVALREMIND',
            'REVIEWREQUEST',
            'REVIEWREMINDER',
            'CUSTOMBYDATE',
        ];
        $trigger_actual1 = ['CUSTOMBYDATE'];

        if (!in_array($table->trigger_actual, $trigger_actual)) {
            $table->trigger_cron = '';
            $table->days         = 0;
            $table->days_before  = 0;
        }

        if (!in_array($table->trigger_actual, $trigger_actual1)) {
            $table->booking_status = '';
        }

        parent::prepareTable($table);
    }
}