<?php
/**
 * @package    Know Reservations
 * @subpackage Site View
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;
?>

<?php if (count($this->items)): ?>
	<?php if ($this->nofavs): ?>
		<div class="callout small warning italic" data-closable>
			<?php echo KrMethods::plain('COM_KNOWRES_NO_FAVOURITES'); ?>
			<button class="close-button" aria-label="Dismiss alert" type="button" data-close>
				<span aria-hidden="true">&times;</span>
			</button>
		</div>
	<?php endif; ?>

	<?php if ($this->favs): ?>
		<?php echo $this->loadTemplate($this->params->get('default_view', 'list')); ?>
	<?php else: ?>
		<?php echo $this->loadTemplate($this->Search->data->view); ?>
	<?php endif; ?>
<?php else : ?>
	<?php echo $this->loadTemplate('sorry'); ?>
<?php endif; ?>