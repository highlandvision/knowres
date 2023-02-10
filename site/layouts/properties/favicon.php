<?php
/**
 * @package    Know Reservations
 * @subpackage Site View
 * @copyright  2018 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;

extract($displayData);
/**
 * Layout variables
 *
 * @var false|object $item  Property Item.
 * @var array        $saved Saved favourites.
 * @var mixed        $view  Current view.
 */
?>

<span class="favspan" data-view="<?php echo $view; ?>" data-property="<?php echo $item->id; ?>">
    <span class="fa-stack fa-lg">
        <i class="favicon-base fas fa-circle fa-stack-2x"></i>
	    <?php if (in_array($item->id, $saved)): ?>
		    <i class="favicon-top fas fa-heart fa-stack-1x favorite in has-tip" data-tooltip data-position="left"
		       data-alignment="center" title="<?php echo KrMethods::plain('COM_KNOWRES_FAVORITES_REMOVE'); ?>">
            </i>
	    <?php else: ?>
		    <i class="favicon-top fas fa-heart fa-stack-1x favorite has-tip" data-tooltip data-position="left"
		       data-alignment="center" title="<?php echo KrMethods::plain('COM_KNOWRES_FAVORITES_ADD'); ?>">
            </i>
	    <?php endif; ?>
	</span>
</span>