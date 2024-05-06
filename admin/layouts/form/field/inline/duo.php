<?php
/**
 * @package         Joomla.Site
 * @subpackage      Layout
 * @copyright   (C) 2018 Open Source Matters, Inc. <https://www.joomla.org>
 * @license         GNU General Public License version 2 or later; see LICENSE.txt
 */

defined('_JEXEC') or die;

extract($displayData);
/**
 * Layout variables
 * -----------------
 *
 * @var   string $label Group label.
 * @var   string $f1    Field 1 input.
 * @var   string $f2    Field 2 input.
  */
?>

<div class="row">
	<div class="col" style="margin-bottom:8px;">
		<?php echo $label; ?>
	</div>
</div>
<div class="row">
	<div class="col">
		<?php echo $f1; ?>
	</div>
	<div class="col">
		<?php echo $f2; ?>
	</div>
</div>