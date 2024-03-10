<?php
/**
 * @package    Know Reservations
 * @subpackage Site View
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */
/** @noinspection PhpUnhandledExceptionInspection */

use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Utility;
use Joomla\CMS\Factory;

defined('_JEXEC') or die;

$pagination = $this->pagination->getPagesLinks(true);
if (!$pagination) {
	$pagination = '&nbsp;';
}

$data = [];

if (!empty($this->items) && count($this->items)) {
	$data['bar'] = $this->Response->searchData->bar;
	$description = $this->Response->searchData->description;
	if (!$description) {
		$description = $this->Response->searchData->region_name . ', ' . KrMethods::getCfg('sitename');
	}
	if (count($this->Response->searchData->baseIds) > 1) {
		$data['heading'] = KrMethods::sprintf('COM_KNOWRES_SEARCH_HEADER_X',
		                                      $description);
//		                                      count($this->Response->searchData->baseIds));
	}
	else {
//		$data['heading'] = KrMethods::sprintf('COM_KNOWRES_SEARCH_HEADER_1', $this->Response->searchData->description);
		$data['heading'] = KrMethods::sprintf('COM_KNOWRES_SEARCH_HEADER_X', $description);
	}

	if ($this->Response->searchData->layout) {
		$data['items'] = $this->loadTemplate('browse');
	} else {
		if ($this->Response->searchData->bar == 'favs') {
			$this->Response->searchData->bar = 'list';
		}
		$data['items'] = $this->loadTemplate($this->Response->searchData->bar);
	}
	$data['filters']    = $this->favs ? '' : $this->loadTemplate('filters_offcanvas');
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

$lifetime = 3600 * 24 * 30;
if (count($this->Response->searchData->favs)) {
	Factory::getApplication()->getInput()->cookie->set('krsaved',
	                                                   implode('xx', $this->Response->searchData->favs),
	                                                   time() + $lifetime,
	                                                   Factory::getApplication()->get('cookie_path', '/'),
	                                                   Factory::getApplication()->get('cookie_domain'));
}
else {
	Factory::getApplication()->getInput()->cookie->set('krsaved',
	                                                   '',
	                                                   time() - $lifetime,
	                                                   Factory::getApplication()->get('cookie_path', '/'),
	                                                   Factory::getApplication()->get('cookie_domain'));
}

jexit();