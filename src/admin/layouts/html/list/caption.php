<?php
/**
 * @package     KR
 * @subpackage  Admin Layouts
 * @copyright   Copyright (C) 2021 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

use HighlandVision\KR\Framework\KrMethods;

extract($displayData);
/**
 * Layout variables
 *
 * @var string $name The name of the view.
 */
?>

<caption class="visually-hidden">
	<?php echo KrMethods::sprintf('COM_KNOWRES_TABLE_CAPTION', strtoupper($name)); ?>,
	<span id="orderedBy"><?php echo KrMethods::plain('JGLOBAL_SORTED_BY'); ?> </span>,
	<span id="filteredBy"><?php echo KrMethods::plain('JGLOBAL_FILTERED_BY'); ?></span>
</caption>
