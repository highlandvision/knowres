<?php
/**
 * @package    Know Reservations
 * @subpackage Library
 * @copyright  Copyright (c) 2020, Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\KR\Session;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Session;
use JetBrains\PhpStorm\Pure;
use stdClass;

use function defined;
use function is_null;
use function property_exists;

/**
 * Knowres Session helper
 *
 * @since 3.0.0
 */
class Payment extends Session
{
    /**
     * Initialise
     *
     * @throws Exception
     * @since 3.3.0
     */
    public function __construct()
    {
        parent::__construct('payment');
    }

    /**
     * Request session data
     *
     * @since  3.3.0
     * @return stdClass
     */
    public function getData(): stdClass
    {
        $data = $this->getSession();
        if (is_null($data)) {
            $data = $this->init();
        }

        return $data;
    }

    /**
     * Reset data and session
     *
     * @since  3.3.0
     * @return stdClass
     */
    public function resetData(): stdClass
    {
        $data = $this->init();
        $this->saveSession($data);

        return $data;
    }

    /**
     * Update session data from array (db item or jform)
     *
     * @param  array|object  $item  Update data
     *
     * @since  3.2.0
     * @return stdClass
     */
    public function updateData(array|object $item): stdClass
    {
		$data = $this->getData();
        foreach ($item as $key => $value) {
            if (property_exists($data, $key)) {
                $data->$key = $value;
            }
        }

        $this->saveSession($data);

        return $data;
    }

    /**
     * Initialise payment data
     *
     * @since  1.0.0
     * @return stdClass
     */
    #[Pure] private function init(): stdClass
    {
        $data                      = new stdClass();
        $data->id                  = 0;
        $data->agency_id           = 0;
        $data->api_version         = '';
        $data->amount              = 0;
        $data->base_amount         = 0;
        $data->base_surcharge      = 0;
        $data->client_secret       = '';
        $data->confirmed           = 1;
        $data->contract_id         = 0;
        $data->currency            = '';
        $data->customer_ref        = '';
        $data->due_date            = '';
        $data->expiry_date         = null;
        $data->gateway_name        = '';
        $data->gateway_description = '';
        $data->gateways            = [];
        $data->guest_id            = 0;
        $data->guestdata_id        = 0;
        $data->manual              = 0;
        $data->merchantParameters  = '';
        $data->merchantSignature   = '';
        $data->note                = '';
        $data->payment_date        = '';
        $data->payment_intent_id   = '';
        $data->payment_method_id   = '';
        $data->payment_ref         = '';
        $data->payment_setup_id    = '';
        $data->payment_type        = '';
        $data->publishable_key     = '';
        $data->process             = '';
        $data->property_id         = 0;
        $data->rate                = 1;
        $data->secret_key          = '';
        $data->service_id          = 0;
        $data->service_ref         = '';
        $data->state               = 1;
        $data->url                 = '';

        return $data;
    }
}