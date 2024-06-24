<?php
/**
 * @package     KR
 * @subpackage  Admin views
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */
/** @noinspection PhpPossiblePolymorphicInvocationInspection */
/** @noinspection PhpUnhandledExceptionInspection */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;
use Joomla\CMS\Factory;

$wa = Factory::getApplication()->getDocument()->getWebAssetManager();
$wa->useScript('keepalive')
   ->useScript('bootstrap.modal');
?>

<?php if (!is_countable($this->lines) || (!count($this->lines) && !count($this->payments)
		&& !count($this->ownerpayments) && !count($this->approvals) && !count($this->reviews))): ?>
	<div class="main-card" style="padding:1rem;">
		<div class="row">
			<h2><?php echo KrMethods::plain('COM_KNOWRES_CONTRACTS_OVERVIEW_EMPTY'); ?></h2>
		</div>
	</div>
	<?php return; ?>
<?php endif; ?>

	<div class="accordion">
		<div class="row no-gutters">
			<div class="col">
				<?php echo $this->loadTemplate('requests'); ?>
				<?php echo $this->loadTemplate('payments'); ?>
				<?php echo $this->loadTemplate('enquiry'); ?>
				<?php echo $this->loadTemplate('option'); ?>
				<?php echo $this->loadTemplate('new'); ?>
				<?php echo $this->loadTemplate('duedeposit'); ?>
				<?php echo $this->loadTemplate('overduebalance'); ?>
				<?php echo $this->loadTemplate('duebalance'); ?>
				<?php echo $this->loadTemplate('cancelled'); ?>
				<?php echo $this->loadTemplate('arrivals'); ?>
				<?php echo $this->loadTemplate('departures'); ?>
				<?php echo $this->loadTemplate('ownerpayments'); ?>
				<?php echo $this->loadTemplate('reviews'); ?>
				<?php echo $this->loadTemplate('approvals'); ?>
			</div>
		</div>
	</div>

<?php if ($this->registration) : ?>
	<?php echo $this->loadTemplate('registrationmodal'); ?>
<?php endif; ?>