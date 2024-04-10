<?php
/**
 * @package    Know Reservations
 * @subpackage Site View
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */
/** @noinspection PhpUnhandledExceptionInspection */

defined('_JEXEC') or die;

use HighlandVision\KR\Utility;
use Joomla\CMS\Factory;

$pagination = $this->pagination->getPagesLinks(true);
if (!$pagination) {
	$pagination = '&nbsp;';
}

$data = [];

if (!empty($this->items) && count($this->items)) {
	$data['bar'] = $this->Response->searchData->bar;
	if ($this->Response->searchData->bar == 'favs') {
		$this->Response->searchData->bar = $this->favs_bar;
	}
	$data['items']      = $this->loadTemplate($this->Response->searchData->bar);
	$data['filters']    = $this->favs_bar ? '' : $this->loadTemplate('filters');
	$data['sortby']     = $this->loadTemplate('sortby');
	$data['pagination'] = $pagination;
} else {
	$data['items']   = $this->loadTemplate('sorry');
	$data['sortby']  = '';
	$data['filters'] = '';
}

$data['search'] = true;
echo Utility::encodeJson($data);

$lifetime = 3600 * 24 * 30;
if (count($this->Response->searchData->favs)) {
	Factory::getApplication()->getInput()->cookie->set('krsaved',
	                                                   implode('xx', $this->Response->searchData->favs),
	                                                   time() + $lifetime,
	                                                   Factory::getApplication()->get('cookie_path', '/'),
	                                                   Factory::getApplication()->get('cookie_domain'));
} else {
	Factory::getApplication()->getInput()->cookie->set('krsaved',
	                                                   '',
	                                                   time() - $lifetime,
	                                                   Factory::getApplication()->get('cookie_path', '/'),
	                                                   Factory::getApplication()->get('cookie_domain'));
}

jexit();