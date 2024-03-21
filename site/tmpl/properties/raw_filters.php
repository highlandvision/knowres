<?php
/**
 * @package    Know Reservations
 * @subpackage Site View
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;

if (!KrMethods::getParams()->get('filter', 0)) {
	return;
}

if (empty($this->Response->searchData->filterArea) &&
	empty($this->Response->searchData->filterBedrooms) &&
	empty($this->Response->searchData->filterBook) &&
	empty($this->Response->searchData->filterCategory) &&
	empty($this->Response->searchData->filterFeature) &&
	empty($this->Response->searchData->filterPets) &&
	empty($this->Response->searchData->filterPrice) &&
	empty($this->Response->searchData->filterType)) {
	return;
}

echo KrMethods::render('properties.raw.filters.offcanvas.heading');

echo KrMethods::render('properties.raw.filters.offcanvas.filter',
                       ['action' => 'property_area',
                        'data'  => $this->Response->searchData->filterArea,
                        'name'  => KrMethods::plain('COM_KNOWRES_FILTER_HEAD_AREA')
                       ]);
echo KrMethods::render('properties.raw.filters.offcanvas.filter',
                       ['action' => 'bedrooms',
                        'data'  => $this->Response->searchData->filterBedrooms,
                        'name'  => KrMethods::plain('COM_KNOWRES_FILTER_HEAD_BEDROOMS')
                       ]);
echo KrMethods::render('properties.raw.filters.offcanvas.filter',
                       ['action' => 'book',
                        'data'  => $this->Response->searchData->filterBook,
                        'name'  => KrMethods::plain('COM_KNOWRES_FILTER_HEAD_BOOK')
                       ]);
echo KrMethods::render('properties.raw.filters.offcanvas.filter',
                       ['action' => 'category',
                        'data'  => $this->Response->searchData->filterCategory,
                        'name'  => KrMethods::plain('COM_KNOWRES_FILTER_HEAD_CATEGORY')
                       ]);
echo KrMethods::render('properties.raw.filters.offcanvas.filter',
                       ['action' => 'feature',
                        'data'  => $this->Response->searchData->filterFeature,
                        'name'  => KrMethods::plain('COM_KNOWRES_FILTER_HEAD_FEATURE')
                       ]);
echo KrMethods::render('properties.raw.filters.offcanvas.filter',
                       ['action' => 'pets',
                        'data'  => $this->Response->searchData->filterPets,
                        'name'  => KrMethods::plain('COM_KNOWRES_FILTER_HEAD_PETS')
                       ]);

if (!$this->Response->searchData->layout) {
	echo KrMethods::render('properties.raw.filters.offcanvas.filter',
	                       ['action' => 'price',
	                        'data'   => $this->Response->searchData->filterPrice,
	                        'name'   => KrMethods::plain('COM_KNOWRES_FILTER_HEAD_PRICE')
	                       ]);
}
echo KrMethods::render('properties.raw.filters.offcanvas.filter',
                       ['action' => 'type',
                        'data'  => $this->Response->searchData->filterType,
                        'name'  => KrMethods::plain('COM_KNOWRES_FILTER_HEAD_TYPE')
                       ]);

$this->Response->searchData->field = '';