<?php
/**
 * @package    Know Reservations
 * @subpackage Site View
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

defined('_JEXEC') or die;

extract($displayData);
/**
 * Layout variables
 *
 * @var string $image Marker Image.
 * @var string $name  Marker name.
 * @var string $text  Marker text.
 */
?>

<div class="kr-mapmarker">
	<h6><?php echo $name; ?></h6>
	<p>
		<?php echo $text; ?>
	</p>
	<?php if ($image): ?>
		<div class="bground" style="background-image:url('<?php echo $image; ?>');"></div>
	<?php endif; ?>
</div>