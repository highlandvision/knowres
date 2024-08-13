<?php
/**
 * @package    Know Reservations
 * @subpackage Library
 * @copyright  Copyright (c) 2020, Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\KR\Service;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Service;
use HighlandVision\KR\TickTock;
use HighlandVision\KR\Utility;
use RuntimeException;
use stdClass;

use function curl_close;
use function curl_errno;
use function curl_exec;
use function curl_init;
use function curl_setopt;
use function implode;
use function round;

use const CURLOPT_RETURNTRANSFER;
use const CURLOPT_SSL_VERIFYPEER;
use const CURLOPT_URL;

/**
 * Service exchange
 *
 * @since 3.1.0
 */
class Exchange extends Service
{
    /* @var mixed Exchange rate row */
    protected mixed $current;
    /* @var float Rate factor to maipulate returned rate */
    protected float $factor = 0;
    /* @var string From currency */
    protected string $from;
    /* @var float Latest exchange rate from API */
    protected float $rate = 0;
    /* @var string To currency */
    protected string $to;

    /**
     * Initialize
     *
     * @param  string  $from  ISO currency From
     * @param  string  $to    ISO currency To
     *
     * @throws Exception
     * @since  3.1.0
     */
    public function __construct(string $from, string $to)
    {
        parent::__construct(KrFactory::getListModel('services')::checkForSingleService(true, 'exchange'));

        $this->setFrom($from);
        $this->setTo($to);
    }

    /**
     * Get rate for online conversion
     *
     * @param  bool  $inverse  Indicates if invese rate is required
     *
     * @throws Exception
     * @since  3.4.0.
     * @return float
     */
    public function getRate(bool $inverse): float
    {
        $this->update();

        $dp   = 5;
        $rate = round($this->rate * (($this->factor / 100) + 1), $dp);
        if ($inverse) {
            $rate = round(1 / $rate, $dp);
        }

        return $rate;
    }

    /**
     * Add or update exchange rate
     *
     * @throws Exception
     * @throws Exception
     * @since  3.3.0
     */
    public function update(): void
    {
        if ($this->from !== $this->to) {
            $this->updateRate();
        }
    }

    /**
     * Check that the new rate does not vary by more than the allowable factor
     *
     * @since  3.3.0
     */
    private function checkVariance(): void
    {
        if (empty($this->current)) {
            return;
        }

        $variable = $this->current->rate * $this->current->factor / 100;
        $min      = $this->current->rate - $variable;
        $max      = $this->current->rate + $variable;

        if (!$this->rate || $this->rate <= $min || $this->rate >= $max) {
            try {
                $text = 'Large fluctuation in todays Exchange Rate for ' . $this->from . ' to ' . $this->to;
                $text .= '. Rate has changed from ' . $this->current->rate . ' to ' . $this->rate;
                $text .= '. Please check the exchange rates online and update the rate manually if the new rate is correct';

                $this->rate = $this->current->rate;

                throw new RuntimeException($text);
            } catch (Exception $e) {
                $this->exception = $e;
            }
        }
    }

    /**
     * Build Api Url for Latest request
     *
     * @since  3.3.1
     * @return string
     */
    private function getApiUrlLatest(): string
    {
        $parts[] = $this->parameters->url;
        $parts[] = $this->parameters->apikey;
        $parts[] = $this->method;
        $parts[] = $this->from;

        return implode('/', $parts);
    }

    /**
     * Get v6 rate for all currencies from specified base
     *
     * @throws Exception
     * @since  3.3.0
     */
    private function getRateForAll(): void
    {
        $this->method = 'latest';

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_URL, $this->getApiUrlLatest());

        $this->request  = 'No request data';
        $this->response = curl_exec($ch);

        if (curl_errno($ch)) {
            curl_close($ch);
            throw new RuntimeException('Service Exchange CURL error ' . curl_errno($ch));
        }

        curl_close($ch);

        $data = Utility::decodeJson($this->response);

        if (!isset($data->result) || $data->result !== 'success') {
            throw new RuntimeException('Service Exchange error ' . !empty($data->error) ? $data->error : 'unknown');
        } else {
            foreach ($data->conversion_rates as $currency => $rate) {
                if ($this->to == $currency) {
                    $this->rate = $rate;
                    break;
                }
            }
        }
    }

    /**
     * Insert new exchange rate row if new rate is non-zero
     *
     * @throws Exception
     * @throws Exception
     * @since  3.3.0
     */
    private function insert(): void
    {
        if ($this->rate > 0) {
            $this->factor = !$this->current ? 5 : $this->current->factor;

            $new                = new stdClass();
            $new->id            = 0;
            $new->currency_from = $this->from;
            $new->currency_to   = $this->to;
            $new->rate          = $this->rate;
            $new->factor        = $this->factor;
            $new->state         = 1;
            $new->created_at    = TickTock::getTS();
            $new->updated_at    = TickTock::getTS();
            KrFactory::insert('exchange_rate', $new);

            $this->messages[] = "Exchange rate $this->rate created for $this->from to $this->to";
        }
    }

    /**
     * Get the latest rate for from and to
     *
     * @throws RuntimeException
     * @since 3.3.0
     */
    private function readCurrent(): void
    {
        $this->current = KrFactory::getListModel('exchangerates')->getLatest($this->from, $this->to);
    }

    /**
     * Set from currency
     *
     * @param  string  $from  ISO currency code
     *
     * @throws RuntimeException
     * @since  3.3.0
     */
    private function setFrom(string $from): void
    {
        if (!$from) {
            throw new RuntimeException('From currency not passed to Exchange service');
        }

        $this->from = $from;
    }

    /**
     * Set to currency
     *
     * @param  string  $to  ISO currency code
     *
     * @throws RuntimeException
     * @since  3.3.0
     */
    private function setTo(string $to): void
    {
        if (!$to) {
            throw new RuntimeException('To currency not passed to Exchange service');
        }

        $this->to = $to;
    }

    /**
     * Update or create new exchange rate pair as required
     *
     * @throws Exception
     * @since  3.4.0
     */
    private function updateRate(): void
    {
        $this->readCurrent();
        if (!empty($this->current)) {
            $this->rate   = $this->current->rate;
            $this->factor = $this->current->factor;
        }

        if (empty($this->current) || $this->current->updated_at < TickTock::getMidnight()) {
            try {
                $this->getRateForAll();
                $this->checkVariance();
                $this->insert();
            } catch (Exception $e) {
                $this->messages[] = $e->getMessage();
                $this->addLog(false);
            }
        }
    }
}