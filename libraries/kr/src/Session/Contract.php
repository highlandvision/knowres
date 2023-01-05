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

use HighlandVision\KR\Session;
use JetBrains\PhpStorm\Pure;
use stdClass;

use function defined;
use function is_null;

/**
 * Knowres Session helper
 *
 * @since 3.3.0
 */
class Contract extends Session
{
	/**
	 * Initialise
	 *
	 * @since 3.3.0
	 */
	public function __construct()
	{
		parent::__construct('contract');
	}

	/**
	 * Request session data
	 *
	 * @since 3.3.0
	 * @return stdClass
	 */
	public function getData(): stdClass
	{
		$data = $this->getSession();
		if (is_null($data))
		{
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
	 * Initialise quote session
	 *
	 * @since 3.3.0
	 * @return stdClass
	 */
	#[Pure] private function init(): stdClass
	{
		$data                                  = new stdClass();
		$data->id                              = 0;
		$data->adjustments                     = [];
		$data->adjustmentsRq                   = true;
		$data->adults                          = 0;
		$data->agency_id                       = 0;
		$data->agent_commission                = 0;
		$data->agent_deposit                   = 0;
		$data->agent_deposit_paid              = 0;
		$data->agent_deposit_unconfirmed       = 0;
		$data->agent_deposit_unconfirmed_agent = 0;
		$data->agent_id                        = 0;
		$data->agent_nonrefundable             = false;
		$data->agent_reference                 = '';
		$data->agent_value                     = 0;
		$data->arrival                         = '';
		$data->ajax_warning                    = '';
		$data->balance                         = 0;
		$data->balance_date                    = null;
		$data->balance_days                    = 0;
		$data->base_rate                       = 0;
		$data->base_nightly                    = [];
		$data->black_booking                   = 0;
		$data->block_note                      = '';
		$data->booking_type                    = 0;
		$data->booking_status                  = 0;
		$data->cancelled                       = 0;
		$data->cancelled_timestamp             = '';
		$data->canwebook                       = 0;
		$data->channel_commission              = 0;
		$data->channel_markup                  = 0;
		$data->children                        = 0;
		$data->child_ages                      = [];
		$data->cluster_id                      = 0;
		$data->commission                      = 0;
		$data->contract_total                  = 0;
		$data->coupon_amount                   = 0;
		$data->coupon_code                     = '';
		$data->coupon_discount                 = 0;
		$data->coupon_id                       = 0;
		$data->coupon_is_percentage            = 0;
		$data->created_at                      = '';
		$data->currency                        = '';
		$data->date_range                      = [];
		$data->departure                       = '';
		$data->decimals                        = 2;
		$data->deposit                         = 0;
		$data->deposit_date                    = '';
		$data->deposit_paid                    = 0;
		$data->deposit_system                  = 0;
		$data->discount                        = 0;
		$data->discount_system                 = 0;
		$data->discounts                       = [];
		$data->discountsDb                     = [];
		$data->discountsRq                     = true;
		$data->do_discounts                    = true;
		$data->email_trigger                   = '';
		$data->errors                          = [];
		$data->expiry_date                     = null;
		$data->expiry_days                     = 0;
		$data->extra_ids                       = [];
		$data->extra_quantities                = [];
		$data->extras                          = [];
		$data->extrasDb                        = [];
		$data->extrasRq                        = true;
		$data->extra_total                     = 0;
		$data->fixrate                         = 0;
		$data->foreign_key                     = 0;
		$data->free_guests                     = 0;
		$data->guest_id                        = 0;
		$data->guest_note                      = '';
		$data->guests                          = 0;
		$data->isEdit                          = false;
		$data->manager_id                      = 0;
		$data->markup                          = 0;
		$data->markup_pc                       = 0;
		$data->manual                          = 0;
		$data->net_price                       = 0;
		$data->net_price_system                = 0;
		$data->nightly                         = [];
		$data->nights                          = 0;
		$data->on_request                      = 0;
		$data->owner_deposit                   = 0;
		$data->owner_id                        = 0;
		$data->owner_note                      = '';
		$data->pets                            = 0;
		$data->property_id                     = 0;
		$data->qkey                            = '';
		$data->ratesDb                         = [];
		$data->ratesRq                         = true;
		$data->ratemarkupsDb                   = [];
		$data->ratemarkupsRq                   = true;
		$data->room_total                      = 0;
		$data->room_total_gross                = 0;
		$data->room_total_gross_system         = 0;
		$data->seasonsDb                       = [];
		$data->seasonsRq                       = true;
		$data->service_id                      = [];
		$data->shortbook                       = 0;
		$data->shortbook_departure             = '';
		$data->shortbook_nights                = '0';
		$data->shortbook_date_range            = [];
		$data->source                          = '';
		$data->state                           = 1;
		$data->system_note                     = '';
		$data->tag                             = '';
		$data->tax_total                       = 0;
		$data->taxes                           = [];

		return $data;
	}
}