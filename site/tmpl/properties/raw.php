<?php
/**
 * @package    Know Reservations
 * @subpackage Site View
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Utility;

defined('_JEXEC') or die;

$pagination = $this->pagination->getPagesLinks(true);
if (!$pagination) {
	$pagination = '&nbsp;';
}

$data = [];

if (count($this->items)) {
	$data['view'] = $this->Response->searchData->view;
	if (count($this->items) > 1) {
		$data['heading'] = KrMethods::sprintf('COM_KNOWRES_SEARCH_HEADER',
		                                      $this->Response->searchData->description,
		                                      count($this->items));
	}
	else {
		$data['heading'] = KrMethods::sprintf('COM_KNOWRES_SEARCH_HEADER_1', $this->Response->searchData->description);
	}

	if ($this->Response->searchData->layout) {
		$data['items'] = $this->loadTemplate('browse');
	}
	else {
		$data['items'] = $this->loadTemplate('items');
	}
	$data['filters']     = $this->favs ? '' : $this->loadTemplate('filters_offcanvas');
	$data['filters_top'] = $this->favs ? '' : $this->loadTemplate('filters_top');
	$data['sortby']     = $this->loadTemplate('sortby');
	$data['pagination'] = $pagination;
}
else {
	$data['items']   = $this->loadTemplate('sorry');
	$data['sortby']  = '';
	$data['filters'] = '';
}

$data['search'] = $this->modules;

echo Utility::encodeJson($data);
jexit();