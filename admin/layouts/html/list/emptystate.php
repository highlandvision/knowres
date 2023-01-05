<?php
/**
 * @package    Know Reservations
 * @subpackage Admin templates
 * @copyright  2021 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */
/** @noinspection PhpUnhandledExceptionInspection */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Joomla\Extend\HtmlView as KrHtmlView;
use Joomla\CMS\Factory;
use Joomla\CMS\Layout\LayoutHelper;

extract($displayData);
/**
 * Layout variables
 *
 * @var KrHtmlView $data The view data.
 */

$displayData = [
	'content'    => KrMethods::sprintf('COM_KNOWRES_EMPTYSTATE_CONTENT', ucfirst($data->get('name'))),
	'formURL'    => 'index.php?option=com_knowres&view=' . $data->get('name'),
	'helpURL'    => 'https://support.highlandvision.com/hc/en-us/categories/360000564572-KR-Manual',
	'icon'       => 'plus-square ' . $data->get('name'),
	'textPrefix' => 'COM_KNOWRES',
	'title'      => KrMethods::sprintf('COM_KNOWRES_EMPTYSTATE_TITLE', ucfirst($data->get('name')))
];

$user = Factory::getApplication()->getIdentity();
if ($user->authorise('core.create', 'com_knowres')
	|| count($user->getAuthorisedCategories('com_knowres', 'core.create')) > 0)
{
	$displayData['createURL'] = 'index.php?option=com_knowres&task=' . $data->get('form_name') . '.add';
}

echo LayoutHelper::render('joomla.content.emptystate', $displayData);