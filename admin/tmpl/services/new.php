<?php
/**
 * @package     KR
 * @subpackage  Admin views
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */
/** @noinspection PhpUnhandledExceptionInspection */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Service;
?>

<div class="row row-cols-1 row-cols-md-4 g-4">
	<?php foreach ($this->installed as $plugin => $type): ?>
		<div class="col">
			<div class="card h-100">
				<div class="card-header" style="background-color:#f5f5f5;border-bottom:1px solid #e1e1e1;">
					<h3>
						<?php echo ucfirst($plugin); ?> - <?php echo Service::getType($type[0]); ?>
					</h3>
				</div>
				<div class="card-body d-flex flex-column text-center">
					<?php $var = 'COM_KNOWRES_SERVICE_INFO_' . strtoupper($plugin); ?>
					<p><?php echo KrMethods::plain($var); ?></p>
					<div class="mt-auto">
						<?php $src = "/media/com_knowres/images/services/$plugin.png"; ?>
						<?php $src .= '#joomlaImage://local-' . $src . '?width=120&height=30'; ?>
						<?php echo KrMethods::render('joomla.html.image',
							['src' => $src, 'alt' => $plugin, 'width' => 120, 'height' => 30]); ?>
					</div>
					<br>
				</div>
				<div class="card-footer text-center">
					<?php if (!$type[1] && !$type[2]): ?>
						<?php $link = KrMethods::route("index.php?option=com_knowres&view=service&layout=edit&plugin=" . $plugin); ?>
						<a href="<?php echo $link; ?>" class="button btn btn-primary">
							<?php echo KrMethods::plain('COM_KNOWRES_SERVICES_NEW'); ?>
						</a>
					<?php elseif (!$type[1] && $type[2]): ?>
						<a href="#" class="button btn btn-primary disabled">
							<?php echo KrMethods::plain('COM_KNOWRES_SERVICE_INSTALLED'); ?>
						</a>
					<?php else: ?>
						<a href="#" class="button btn btn-primary disabled">
							<?php echo KrMethods::plain('COM_KNOWRES_SERVICE_ENQUIRY'); ?>
						</a>
					<?php endif; ?>

					<?php $var = 'COM_KNOWRES_SERVICE_LINK_' . strtoupper($plugin); ?>
					<?php $link = KrMethods::plain($var); ?>
					<?php if ($link): ?>
						<a href="<?php echo $link; ?>" class="btn btn-primary" target="_blank">
							<?php echo KrMethods::plain('COM_KNOWRES_SERVICE_MORE_INFO'); ?>
						</a>
					<?php endif; ?>
				</div>
			</div>
		</div>
	<?php endforeach; ?>
</div>