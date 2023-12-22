<?php
/**
 * @package     KR
 * @subpackage  Admin views
 * @copyright   2021 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;
use Joomla\CMS\HTML\HTMLHelper;
use Joomla\CMS\Session\Session;
use Joomla\CMS\WebAsset\WebAssetManager;

/** @var WebAssetManager $wa */
$wa = $this->document->getWebAssetManager();
$wa->useScript('table.columns')
   ->useScript('multiselect');

$this->name      = $this->get('name');
/** @noinspection PhpUnhandledExceptionInspection */
$this->user      = KrMethods::getUser();
$this->userId    = $this->user->get('id');
$this->listOrder = $this->escape($this->state->get('list.ordering'));
$this->listDirn  = $this->escape($this->state->get('list.direction'));
$this->saveOrder = $this->listOrder == 'a.ordering';
if ($this->saveOrder)
{
	$this->saveOrderingUrl = 'index.php?option=com_knowres&task=' . $this->name . '.saveOrderAjax&tmpl=component&'
		. Session::getFormToken() . '=1';
	HTMLHelper::_('draggablelist.draggable');
}

$this->canChange  = $this->user->authorise('core.edit.state', 'com_knowres');
$this->canCheckin = $this->user->authorise('core.manage', 'com_knowres');
$this->canEdit    = $this->user->authorise('core.edit', 'com_knowres');
?>