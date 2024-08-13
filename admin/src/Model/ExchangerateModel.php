<?php
/**
 * @package    Know Reservations
 * @subpackage Admin Models
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

/** @noinspection MissingSinceTagDocInspection */

namespace HighlandVision\Component\Knowres\Administrator\Model;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Joomla\Extend\AdminModel;
use HighlandVision\KR\Service\Exchange;
use HighlandVision\KR\Utility;

/**
 * Knowres Exchange rate model.
 *
 * @since 1.0.0
 */
class ExchangerateModel extends AdminModel
{
    /**  @var string The type alias. */
    public $typeAlias = 'com_knowres.exchangerate';
    /** @var mixed Batch copy/move command. If set to false, the batch copy/move command is not supported. */
    protected $batch_copymove = false;
    /**  @var ?string The prefix to use with controller messages. */
    protected $text_prefix = 'COM_KNOWRES_EXCHANGERATE';

    /**
     * Convert amount
     *
     * @param  string  $amount   Value to convert
     * @param  string  $from     ISO currency from
     * @param  string  $to       ISO current to
     * @param  bool    $inverse  TRUE inverse conversion
     * @param  float   $rate     Use provided rate if non zero
     *
     * @throws Exception
     * @since  1.0.0
     * @return array
     */
    public static function convertAmount(string $amount, string $from, string $to, bool $inverse = false,
        float $rate = 0): array
    {
        if ($from === $to) {
            return [$amount,
                    1];
        }

        if (!$rate) {
            $Exchange = new Exchange($from, $to);
            $rate     = $Exchange->getRate($inverse);
        }

        $amount = Utility::roundValue($amount * $rate, $to);

        return [$amount,
                $rate];
    }

    /**
     * Method to get the data that should be injected in the form.
     *
     * @throws Exception
     * @since  1.0.0
     * @return mixed The data for the form.
     */
    protected function loadFormData(): mixed
    {
        $data = KrMethods::getUserState('com_knowres.edit.exchangerate.data', []);
        if (empty($data)) {
            $data = $this->getItem();
        }

        return $data;
    }
}