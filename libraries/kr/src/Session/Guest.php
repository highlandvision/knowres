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
 * @since 3.3.0
 */
class Guest extends Session
{
	/**
	 * Initialise
	 *
	 * @throws Exception
	 * @since  3.3.0
	 */
	public function __construct()
	{
		parent::__construct('guest');
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
		foreach ($item as $key => $value)
		{
			if (property_exists($data, $key))
			{
				$data->$key = $value;
			}
		}

		$this->saveSession($data);

		return $data;
	}

	/**
	 * Initialise guest session
	 *
	 * @since 3.3.0
	 * @return stdClass
	 */
	#[Pure] private function init(): stdClass
	{
		$data                    = new stdClass();
		$data->id                = 0;
		$data->address1          = '';
		$data->address2          = '';
		$data->b_address1        = '';
		$data->b_address2        = '';
		$data->b_country_id      = '';
		$data->b_postcode        = 0;
		$data->b_region          = '';
		$data->b_region_id       = 0;
		$data->b_town            = '';
		$data->country_id        = 0;
		$data->customer_ref      = '';
		$data->discount          = 0;
		$data->document_id       = '';
		$data->document_type     = '';
		$data->email             = '';
		$data->email_2           = '';
		$data->email_3           = '';
		$data->firstname         = '';
		$data->foreign_key       = '';
		$data->mobile            = '';
		$data->mobile_country_id = 0;
		$data->postcode          = '';
		$data->property_id       = 0;
		$data->referral_id       = 0;
		$data->referral_info     = '';
		$data->region            = '';
		$data->region_id         = 0;
		$data->surname           = '';
		$data->telephone         = '';
		$data->town              = '';
		$data->state             = 1;
		$data->user_id           = 0;

		return $data;
	}
}