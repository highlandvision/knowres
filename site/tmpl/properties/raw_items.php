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

<?php if ($this->favs && !count($this->Response->searchData->favs)): ?>
	<div class="callout small warning" data-closable>
		<button class="close-button" aria-label="Dismiss alert" type="button" data-close>
			<span aria-hidden="true">&times;</span>
		</button>
		<?php echo KrMethods::plain('COM_KNOWRES_NO_FAVOURITES'); ?>
	</div>
<?php endif; ?>

<?php if (count($this->items)): ?>
	<?php echo $this->loadTemplate('list'); ?>
<?php else : ?>
	<?php echo $this->loadTemplate('sorry'); ?>
<?php endif; ?>