<?php
/**
 * @package    Know Reservations
 * @subpackage Site View
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

use HighlandVision\KR\Utility;

defined('_JEXEC') or die;

$pagination = $this->pagination->getPagesLinks(true);
if (!$pagination) {
	$pagination = '&nbsp;';
}

$data = [];

if (count($this->items)) {
	$data['view'] = $this->Search->data->view;
	if ($this->Search->data->layout) {
		$data['items'] = $this->loadTemplate('browse');
	}
	else {
		$data['items'] = $this->loadTemplate('items');
	}
	$data['filters']    = $this->favs ? '' : $this->loadTemplate('filters');
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