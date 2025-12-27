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
use HighlandVision\KR\Translations;
use Joomla\CMS\Versioning\VersionableControllerTrait;
use RuntimeException;

// phpcs:disable PSR1.Files.SideEffects
defined('_JEXEC') or die;
// phpcs:enable PSR1.Files.SideEffects

/**
 * Country model
 *
 * @since 1.0.0
 */
class CountryModel extends AdminModel
{
    use VersionableControllerTrait;

    /**  @var string The type alias. */
    public $typeAlias = 'com_knowres.country';
    /** @var mixed Batch copy/move command. If set to false, the batch copy/move command is not supported. */
    protected $batch_copymove = false;
    /**  @var ?string The prefix to use with controller messages. */
    protected $text_prefix = 'COM_KNOWRES_COUNTRY';

    /**
     * Method to get a KR item.
     *
     * @param   int  $pk  The id of the primary key.
     *
     * @return object|false  Object on success, false on failure.
     * @throws RuntimeException
     * @since  1.0.0
     */
    public function getItem($pk = null): object|false
    {
        $item = parent::getItem($pk);
        if ($item) {
            $Translations = new Translations();
            $item->name   = $Translations->getText('country', $item->id);
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
        $data = KrMethods::getUserState('com_knowres.edit.country.data', []);
        if (empty($data)) {
            $data = $this->getItem();
        }

        return $data;
    }
}