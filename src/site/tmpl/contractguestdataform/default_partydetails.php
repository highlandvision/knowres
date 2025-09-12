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

if (empty($this->contract->adults)) {
	$this->contract->adults = $this->contract->guests;
}
?>

<div class="callout small alert">
	<div class="grid-x grid-margin-x">
		<div class="small-12 cell">
			<h4>
				<?php echo KrMethods::sprintf('COM_KNOWRES_CONTRACTGUESTDATA_GUESTS', $this->contract->guests); ?>
				(<?php if ($this->contract->adults == 1): ?>
					<?php echo KrMethods::sprintf('COM_KNOWRES_ADULTS_1', $this->contract->adults); ?>
				<?php elseif ($this->contract->adults > 1): ?>
					<?php echo KrMethods::sprintf('COM_KNOWRES_ADULTS_PLUS', $this->contract->adults); ?>
				<?php endif; ?>

				<?php if ($this->contract->children == 1): ?>
					<?php echo ', ' . KrMethods::sprintf('COM_KNOWRES_CHILD', $this->contract->child_ages[0]); ?>
				<?php elseif ($this->contract->children > 1): ?>
					<?php echo ', ' . KrMethods::sprintf('COM_KNOWRES_CHILD_PLUS', $this->contract->children,
					                                     Utility::displayAges($this->contract->child_ages)); ?>
				<?php endif; ?>)
			</h4>

			<p><?php echo KrMethods::plain('COM_KNOWRES_CONTRACTGUESTDATAFORM_PARTYSIZE_HELP'); ?></p>
		</div>
	</div>
</div>