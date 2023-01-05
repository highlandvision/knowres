<?php
/**
 * @package    Know Reservations
 * @subpackage Models
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */
/** @noinspection PhpUnhandledExceptionInspection */

defined('_JEXEC') or die;

use Joomla\CMS\Factory;
use Joomla\CMS\Layout\LayoutHelper;

$displayData = [
	'textPrefix' => 'COM_KNOWRES',
	'formURL'    => 'index.php?option=com_knowres&view=taxes',
	'helpURL'    => 'https://docs.joomla.org/Special:MyLanguage/Help40:Taxes',
	'icon'       => 'flag knowres',
];

$user = Factory::getApplication()->getIdentity();

if ($user->authorise('core.create', 'com_knowres')
	|| count($user->getAuthorisedCategories('com_knowres', 'core.create')) > 0)
{
	$displayData['createURL'] = 'index.php?option=com_knowres&task=region.add';
}

echo LayoutHelper::render('joomla.content.emptystate', $displayData);
