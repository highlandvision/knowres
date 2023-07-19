<?php
/**
 * @version     1.0.0
 * @package     com_knowres
 * @copyright   Copyright (C) 2014 Highland Vision Limited. All rights reserved.
 * @license     http://www.gnu.org/licenses/gpl-3.0.html GNU/GPL
 * @author      Hazel Wilson <hazel@highlandvision.com> - https://www.highlandvision.com
 */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;

//TODO-v4.3 test for split terms
$summary = KrMethods::route('index.php?option=com_knowres&task=property.terms&id=' . $this->item->id, false);
$link    = '<a class="notsobig red link" href="' . $summary . '" data-reveal-id="termsModal" data-reveal-ajax="true">
	Show the Full Terms</a>';
?>

<div id="print-terms">
	<h2><?php echo trim($this->article->title); ?></h2>
	<p><?php echo trim($this->article->introtext); ?></p>
	<?php echo $link; ?>
	<a class="close-reveal-modal" aria-label="Close">&#215;</a>
</div>
<button class="close-button" aria-label="Close alert" type="button" data-close>
	<span aria-hidden="true">&times;</span>
</button>