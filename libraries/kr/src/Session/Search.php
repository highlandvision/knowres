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
use stdClass;

use function defined;
use function is_null;
use function property_exists;

/**
 * Knowres Session helper
 *
 * @since 3.3.0
 */
class Search extends Session
{
	/**
	 * Initialise
	 *
	 * @throws Exception
	 * @since  3.3.0
	 */
	public function __construct()
	{
		parent::__construct('search');
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
	 * @since 3.3.0
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
	 * Initialise search session
	 *
	 * @since  3.3.0
	 * @return stdClass
	 */
	private function init(): stdClass
	{
		$data                 = new stdClass();
		$data->adults         = 2;
		$data->arrival        = '';
		$data->baseIds        = [];
		$data->bedrooms       = 0;
		$data->byAvailability = false;
		$data->category_id    = 0;
		$data->children       = 0;
		$data->child_ages     = [];
		$data->country_name   = [];
		$data->currency       = '';
		$data->departure      = '';
		$data->description    = '';
		$data->direction      = '';
		$data->favs           = [];
		$data->feature_id     = 0;
		$data->field          = '';
		$data->flexible       = 0;
		$data->filterArea     = [];
		$data->filterBedrooms = [];
		$data->filterBook     = [];
		$data->filterCategory = [];
		$data->filterFeature  = [];
		$data->filterPets     = [];
		$data->filterPrice    = [];
		$data->filterType     = [];
		$data->guests         = 2;
		$data->layout         = '';
		$data->limitstart     = 0;
		$data->map_modal      = 0;
		$data->map_zoom       = 20;
		$data->map_zoom_max   = 20;
		$data->nights         = 0;
		$data->order          = '';
		$data->ordercustom    = '';
		$data->ordering       = '';
		$data->pets           = 0;
		$data->property_area  = '';
		$data->rateNet        = [];
		$data->rateDiscount   = [];
		$data->rating         = 0;
		$data->region_id      = [];
		$data->region_name    = [];
		$data->start          = 0;
		$data->type_id        = 0;
		$data->view           = '';

		return $data;
	}
}