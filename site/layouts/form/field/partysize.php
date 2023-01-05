<?php
/**
 * @package         Joomla.Site
 * @subpackage      Layout
 * @copyright   (C) 2016 Open Source Matters, Inc. <https://www.joomla.org>
 * @license         GNU General Public License version 2 or later; see LICENSE.txt
 */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;
use Joomla\CMS\Form\Form;

extract($displayData);
/**
 * Layout variables
 * -----------------
 *
 * @var   Form  $form          Form instance.
 * @var   array $child_ages    Input for child ages.
 * @var   array $child_min_age Minimum child age.
 * @var   array $child_max_age Maximum child age.
 * @var   int   $total_guests  Total paid guests.
 */
?>

<div class="row no-margin-bottom">
	<div class="small-12 medium-3 columns">
		<?php echo $form->renderField('adults'); ?>
	</div>
	<div class="small-12 medium-3 columns">
		<?php echo $form->renderField('child'); ?>
	</div>
	<!--TODO-v4.1 Remove infants for tax and child ages-->
	<div class="small-12 medium-3 columns">
		<?php echo $form->renderField('infants'); ?>
	</div>
</div>
<div class="row">
	<div class="medium-6 medium-offset-3 columns">
		<?php if (!empty($child_ages)): ?>
			<div id="holder">
				<div><?php echo KrMethods::plain('COM_KNOWRES_AGES'); ?></div>
				<?php foreach ($child_ages as $age_drop): ?>
					<?php echo $age_drop; ?>
				<?php endforeach; ?>
			</div>
		<?php else: ?>
			<div id="holder" style="display:none;">
				<div><?php echo KrMethods::plain('COM_KNOWRES_AGES'); ?></div>
			</div>
		<?php endif; ?>
	</div>
</div>

<div id="jsdata" data-childminage="<?php echo $child_min_age; ?>" data-childmaxage="<?php echo $child_max_age; ?>"
     data-totalguests="<?php echo $total_guests; ?>"></div>