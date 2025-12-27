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
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Joomla\Extend\AdminModel;
use HighlandVision\KR\Session as KrSession;
use HighlandVision\KR\Translations;
use HighlandVision\KR\Utility;
use Joomla\CMS\Factory;
use Joomla\CMS\Versioning\VersionableControllerTrait;
use RuntimeException;

// phpcs:disable PSR1.Files.SideEffects
defined('_JEXEC') or die;
// phpcs:enable PSR1.Files.SideEffects

/**
 * Knowres Rate markup model.
 *
 * @since 1.0.0
 */
class RatemarkupModel extends AdminModel
{
    use VersionableControllerTrait;

    /**  @var string The type alias. */
    public $typeAlias = 'com_knowres.ratemarkup';
    /** @var mixed Batch copy/move command. If set to false, the batch copy/move command is not supported. */
    protected $batch_copymove = false;
    /**  @var ?string The prefix to use with controller messages. */
    protected $text_prefix = 'COM_KNOWRES_RATEMARKUP';

    /**
     * Get gross rate from net
     * Net is net price x markup
     *
     * @param   float   $net       Net rate
     * @param   float   $markup    Gross markup percentage
     * @param   string  $currency  Currency for rounding
     * @param   int     $decimals  Decimals required in rounding
     *
     * @return string Marked up rounded rate
     * @throws RuntimeException
     * @since  1.0.0
     */
    public static function getGrossRate(float $net, float $markup, string $currency = '', int $decimals = 0): string
    {
        $rate = $net + ($net * $markup / 100);

        return Utility::roundValue($rate, $currency, $decimals);
    }

    /**
     * Method to get a knowres record.
     *
     * @param   int  $pk  The id of the primary key.
     *
     * @return false|object  Object on success, false on failure.
     * @since  1.0.0
     */
    public function getItem($pk = null): false|object
    {
        $item = parent::getItem($pk);
        if ($item) {
            $Translations = new Translations();
            $item->name   = $Translations->getText('ratemarkup', $item->id);
        }

        return $item;
    }

    /**
     * Override publish function
     *
     * @param   array   &$pks    A list of the primary keys to change.
     * @param   int      $value  The value of the published state.
     *
     * @return bool
     * @throws Exception
     * @since  3.1.0
     */
    public function publish(&$pks, $value = 1): bool
    {
        $first = true;
        if (parent::publish($pks, $value)) {
            foreach ($pks as $id) {
                if ($first) {
                    $item = parent::getItem($id);
                    if ($item) {
                        KrFactory::getAdminModel('servicequeue')::serviceQueueUpdate('updatePropertyRates',
                            (int)$item->property_id,
                        );
                    }

                    $first = false;
                }

                self::setUpdatedAt($id, 'rate_markup');
            }

            return true;
        }

        return false;
    }

    /**
     * Method to test whether a record can be deleted.
     *
     * @param   object  $record  A record object.
     *
     * @return bool  True if allowed to delete the record. Defaults to the permission for the component.
     * @since  3.0.0
     */
    protected function canDelete($record): bool
    {
        $userSession = new KrSession\User();

        return $userSession->getAccessLevel() == 40 || Factory::getUser()->authorise('core.delete', $this->option);
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
        $data = KrMethods::getUserState('com_knowres.edit.ratemarkup.data', []);
        if (empty($data)) {
            $data = $this->getItem();
        }

        return $data;
    }
}