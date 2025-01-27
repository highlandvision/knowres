<?php
/**
 * @package         Joomla.Site
 * @subpackage      Layout
 * @copyright   (C) 2016 Open Source Matters, Inc. <https://www.joomla.org>
 * @license         GNU General Public License version 2 or later; see LICENSE.txt
 */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Utility;

$wa = $this->document->getWebAssetManager();
$wa->useScript('keepalive')
   ->useScript('form.validate');
?>

<div class="row">
	<div class="col-xl-9 col-xxl-8">
		<fieldset>
			<legend>
				<?php echo KrMethods::sprintf('COM_KNOWRES_CONTRACTGUESTDATA_LEGEND_GUESTS', $this->contract->guests); ?>
				(
				<?php if ($this->contract->adults == 1): ?>
					<?php echo KrMethods::sprintf('COM_KNOWRES_CONTRACT_ADULTS_1', $this->contract->adults); ?>
				<?php elseif ($this->contract->adults > 1): ?>
					<?php echo KrMethods::sprintf('COM_KNOWRES_CONTRACT_ADULTS', $this->contract->adults); ?>
				<?php endif; ?>

				<?php if ($this->contract->children == 1): ?>
					<?php echo ' & ' . KrMethods::sprintf('COM_KNOWRES_CONTRACT_CHILD',
							$this->contract->child_ages[0]); ?>
				<?php elseif ($this->contract->children > 1): ?>
					<?php echo ' & ' . KrMethods::sprintf('COM_KNOWRES_CONTRACT_CHILDREN', $this->contract->children,
							Utility::displayAges($this->contract->child_ages)); ?>
				<?php endif; ?>
				)
			</legend>

			<?php echo $this->form->getInput('guestinfo'); ?>
		</fieldset>
	</div>
	<div class="col-xl-3 offset-xxl-1">
		<?php echo KrMethods::render('joomla.edit.global', $this); ?>
	</div>
</div>