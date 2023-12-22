<?php
/**
 * @package    Know Reservations
 * @subpackage Site View
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

use HighlandVision\KR\Framework\KrMethods;

defined('_JEXEC') or die;

foreach ($this->Response->searchData->filterArea as $k => $f) {
	echo KrMethods::render('properties.raw.filters.top', ['field' => 'property_area', 'data' => $f]);
}
foreach ($this->Response->searchData->filterBedrooms as $k => $f) {
	echo KrMethods::render('properties.raw.filters.top', ['field' => 'bedrooms', 'data' => $f]);
}
foreach ($this->Response->searchData->filterBook as $k => $f) {
	echo KrMethods::render('properties.raw.filters.top', ['field' => 'book', 'data' => $f]);
}
foreach ($this->Response->searchData->filterCategory as $k => $f) {
	echo KrMethods::render('properties.raw.filters.top', ['field' => 'category', 'data' => $f]);
}
foreach ($this->Response->searchData->filterFeature as $k => $f) {
	echo KrMethods::render('properties.raw.filters.top', ['field' => 'feature', 'data' => $f]);
}
foreach ($this->Response->searchData->filterPets as $k => $f) {
	echo KrMethods::render('properties.raw.filters.top', ['field' => 'pets', 'data' => $f]);
}
foreach ($this->Response->searchData->filterPrice as $k => $f) {
	echo KrMethods::render('properties.raw.filters.top', ['field' => 'price', 'data' => $f]);
}
foreach ($this->Response->searchData->filterType as $k => $f) {
	echo KrMethods::render('properties.raw.filters.top', ['field' => 'type', 'data' => $f]);
}