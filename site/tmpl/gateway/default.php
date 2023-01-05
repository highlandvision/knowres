<?php
/**
 * @package     Know Reservations
 * @subpackage  Site Controller
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */
/** @noinspection PhpUnhandledExceptionInspection */

defined('_JEXEC') or die;

use Joomla\CMS\Factory;

$wa = Factory::getApplication()->getDocument()->getWebAssetManager();
$wa->useScript('com_knowres.site')
   ->useScript('form.validate')
   ->useScript('keepalive');

if ($this->payment_type == 'OBR')
{
	echo $this->loadTemplate('stripe_request');
}
else
{
	echo $this->loadTemplate($this->gateway_name);
}