<?php
/**
 * @package    Know Reservations
 * @subpackage Site module
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;
?>

<?php if ($params->get('url', '')) : ?>
	<a href="<?php echo KrMethods::route('index.php?Itemid=' . $params->get('url')); ?>" title="<?php echo ''; ?>">
<?php endif; ?>

	<div class="kr-carousel kr-slick"
	     data-slick='{"autoplaySpeed": <?php echo $params->get('autoPlaySpeed',
		     '5000'); ?>,"speed": <?php echo $params->get('speed', '50'); ?>}'>

		<?php foreach ($images as $i): ?>
			<?php
			$options = [
				'src'    => $i['image'],
				'alt'    => $i['alt'],
				'class'  => 'border th responsive',
				'width'  => $i['width'],
				'height' => $i['height']
			];
			echo KrMethods::render('joomla.html.image', $options);
			?>
		<?php endforeach; ?>
	</div>

<?php if ($params->get('url', '')) : ?>
	</a>
<?php endif; ?>