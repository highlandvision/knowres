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
use Joomla\CMS\Factory;
use Joomla\CMS\HTML\HTMLHelper;

/** @var HighlandVision\Component\Knowres\Administrator\View\Property\DashboardView $this */

HTMLHelper::script('https://www.gstatic.com/charts/loader.js');

/** @var Joomla\CMS\WebAsset\WebAssetManager $wa */
$wa = Factory::getApplication()->getDocument()->getWebAssetManager();
$wa->useScript('keepalive')
   ->useScript('bootstrap.dropdown')
   ->useScript('com_knowres.admin-propertydashboard')
   ->useScript('bootstrap.modal');
?>

	<div class="main-card property-dashboard">
		<?php echo $this->loadTemplate('header'); ?>
		<div class="row">
			<div class="col-12 col-xl-6">
				<div class="alert alert-success" role="alert">
					<h3 class="alert-heading">
						<?php echo KrMethods::plain('COM_KNOWRES_PROPERTYDASHBOARD_RECENT_CONTRACTS') ?>
					</h3>
					<hr>
					<?php echo $this->loadTemplate('latest'); ?>
				</div>
			</div>
			<div class="col-12 col-xl-6">
				<div class="alert alert-success" role="alert">
					<h3 class="alert-heading">
						<?php echo KrMethods::plain('COM_KNOWRES_PROPERTYDASHBOARD_UPCOMING_CONTRACTS') ?>
					</h3>
					<hr>
					<?php echo $this->loadTemplate('upcoming'); ?>
				</div>
			</div>
			<div class="d-none d-md-block col-md-12 col-xl-6">
				<div class="alert alert-success" role="alert">
					<h3 class="alert-heading">
						<?php echo KrMethods::plain('COM_KNOWRES_PROPERTYDASHBOARD_RESERVATION_DATA') ?>
					</h3>
					<hr>
					<?php echo $this->loadTemplate('info'); ?>
				</div>
			</div>
			<?php if ($this->access_level > 10) : ?>
				<div class="d-none d-md-block col-md-12 col-xl-6">
					<div class="alert alert-success" role="alert">
						<h3 class="alert-heading">
							<?php echo KrMethods::plain('COM_KNOWRES_SERVICEXREFS_TITLE') ?>
						</h3>
						<hr>
						<?php echo $this->loadTemplate('xref'); ?>
					</div>
				</div>
				<div class="d-none d-md-block col-md-12 col-xl-6">
					<div class="alert alert-success" role="alert">
						<h3 class="alert-heading">
							<?php echo KrMethods::plain('COM_KNOWRES_SERVICE_OWNER_OVERRIDES') ?>
						</h3>
						<hr>
						<?php echo $this->loadTemplate('ownerpayments'); ?>
					</div>
				</div>
			<?php endif; ?>
		</div>
		<div class="row">
			<div class="d-none d-md-block col-md-12">
				<div class="alert alert-success" role="alert">
					<h3 class="alert-heading">
						<?php echo KrMethods::plain('COM_KNOWRES_MENU_PROPERTY_STATISTICS') ?>
					</h3>
					<hr>
					<?php echo $this->loadTemplate('stats'); ?>
				</div>
			</div>
		</div>
	</div>

<?php if ($this->switch): ?>
	<?php echo $this->loadTemplate('switch'); ?>
<?php endif; ?>
<?php if ($this->clone) : ?>
	<?php echo $this->loadTemplate('clone'); ?>
<?php endif; ?>