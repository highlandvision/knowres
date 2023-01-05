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

use HighlandVision\KR\Framework\KrMethods;
use Joomla\CMS\Factory;

$wa = Factory::getApplication()->getDocument()->getWebAssetManager();
$wa->useScript('com_knowres.site')
   ->useScript('keepalive');
?>

<div class="row">
	<div class="small-12 medium-8 large-9 columns">
		<?php if (!$this->request): ?>
			<h1><?php echo KrMethods::plain('COM_KNOWRES_SUCCESS_CONFIRMED'); ?></h1>
			<h2 class="color-dark"><?php echo KrMethods::sprintf('COM_KNOWRES_SUCCESS_CONFIRMED_DETAILS',
					$this->contract->tag,
					$this->contract->property_name); ?></h2>
			<p><?php echo KrMethods::plain('COM_KNOWRES_SUCCESS_CONFIRMED_TEXT'); ?></p>
			<p>
				<?php echo KrMethods::plain('COM_KNOWRES_SUCCESS_DO_NOT_FORGETH'); ?><br>
				<?php echo KrMethods::plain('COM_KNOWRES_SUCCESS_DO_NOT_FORGET'); ?>
			</p>
		<?php else : ?>
			<h1><?php echo KrMethods::plain('COM_KNOWRES_SUCCESS_REQUEST_CONFIRMED'); ?></h1>
			<h2 class="color-dark"><?php echo KrMethods::sprintf('COM_KNOWRES_SUCCESS_REQUEST_CONFIRMED_DETAILS',
					$this->contract->tag,
					$this->contract->property_name); ?></h2>
			<p><?php echo KrMethods::plain('COM_KNOWRES_SUCCESS_REQUEST_CONFIRMED_TEXT'); ?></p>
			<p>
				<?php echo KrMethods::plain('COM_KNOWRES_SUCCESS_REQUEST_DO_NOT_FORGETH'); ?><br>
				<?php echo KrMethods::sprintf('COM_KNOWRES_SUCCESS_REQUEST_DO_NOT_FORGET',
					$this->params->get('booking_request_hold')); ?>
			</p>
		<?php endif; ?>
	</div>
	<div id="sidebar-right" class="small-12 medium-4 large-3 columns">
		<?php echo KrMethods::loadInternal('{loadposition propertyview}'); ?>
	</div>
</div>