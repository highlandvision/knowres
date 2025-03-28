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
use HighlandVision\KR\Framework\KrMethods;
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
		if (is_null($data)) {
			$data = $this->init();
		}

		return $data;
	}

	/**
	 * Reset data and session
	 *
	 * @param  string|null  $bar  Currently selected bar layout
	 *
	 * @since 3.3.0
	 * @return stdClass
	 */
	public function resetData(?string $bar = null): stdClass
	{
		$data = $this->init();
		if (!empty($bar)) {
			$data->bar = $bar;
		}
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
	 * Initialise search session
	 *
	 * @since  3.3.0
	 * @return stdClass
	 */
	private function init(): stdClass
	{
		$data                 = new stdClass();
		$data->action         = '';
		$data->action_value   = '';
		$data->adults         = 2;
		$data->area           = '';
		$data->arrival        = '';
		$data->bar            = KrMethods::getParams()->get('default_view', 'grid');
		$data->baseIds        = [];
		$data->bedrooms       = 0;
		$data->byAvailability = false;
		$data->category_id    = 0;
		$data->children       = 0;
		$data->child_ages     = [];
		$data->country_id     = 0;
		$data->country_name   = '';
		$data->currency       = '';
		$data->departure      = '';
		$data->description    = '';
		$data->direction      = '';
		$data->favs           = [];
		$data->feature_id     = 0;
		$data->field          = '';
		$data->filterArea     = [];
		$data->filterBedrooms = [];
		$data->filterBook     = [];
		$data->filterCategory = [];
		$data->filterFeature  = [];
		$data->filterPets     = [];
		$data->filterPrice    = [];
		$data->filterType     = [];
		$data->flexible       = 0;
		$data->guests         = 2;
		$data->initial_area   = '';
		$data->layout         = '';
		$data->limitstart     = 0;
		$data->map_modal      = 0;
		$data->map_zoom       = 0;
		$data->map_zoom_max   = 20;
		$data->nights         = 0;
		$data->order          = '';
		$data->ordercustom    = '';
		$data->ordering       = '';
		$data->pets           = 0;
		$data->rateNet        = [];
		$data->rateDiscount   = [];
		$data->rating         = 0;
		$data->region_id      = KrMethods::getParams()->get('default_region');
		$data->region_name    = '';
		$data->start          = 0;
		$data->type_id        = 0;
		$data->value          = '';

		return $data;
	}
}