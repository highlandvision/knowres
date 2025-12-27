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
use Joomla\CMS\Versioning\VersionableModelTrait;
use RuntimeException;

// phpcs:disable PSR1.Files.SideEffects
defined('_JEXEC') or die;
// phpcs:enable PSR1.Files.SideEffects

/**
 * Knowres Translation model.
 *
 * @since 1.0.0
 */
class TranslationModel extends AdminModel
{
    use VersionableModelTrait;

    /** @var string The type alias for this content type. */
    public $typeAlias = 'com_knowres.translation';
    /** @var mixed Batch copy/move command. If set to false, the batch copy/move command is not supported. */
    protected $batch_copymove = false;
    /**  @var ?string The prefix to use with controller messages. */
    protected $text_prefix = 'COM_KNOWRES_TRANSLATION';

    /**
     * Method to get a knowres record.
     *
     * @param   int  $pk  The id of the primary key.
     *
     * @return false|object  Object on success, false on failure.
     * @throws RuntimeException
     * @since  1.0.0
     */
    public function getItem($pk = null): false|object
    {
        /** @var TranslationModel $item */
        $item = parent::getItem($pk);
        if ($item) {
            $Translations = new Translations();
            $item->name   = $Translations->getText('translation', $item->id);
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
        $data = KrMethods::getUserState('com_knowres.edit.translation.data', []);
        if (empty($data)) {
            $data = $this->getItem();
        }

        return $data;
    }
}