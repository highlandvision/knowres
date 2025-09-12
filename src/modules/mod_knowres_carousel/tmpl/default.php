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

$wa = $app->getDocument()->getWebAssetManager();
$wa->getRegistry()->addExtensionRegistryFile('com_knowres');
$wa->useScript('com_knowres.site-modules');
?>

<?php if (!empty($url)) : ?>
	<a href="<?php echo KrMethods::route('index.php?Itemid=' . $url); ?>" title="<?php echo ''; ?>">
<?php endif; ?>

<div class="kr-carousel kr-slick" data-slick='{"autoplaySpeed": <?php echo $autoPlaySpeed; ?>,"speed": <?php echo $speed; ?>}'>>
	<?php foreach ($images as $i): ?>
		<?php
		$options = [
			'src'    => $i['image'],
			'alt'    => $i['alt'],
			'class'  => 'th responsive',
			'width'  => '100%',
			'height' => 'auto'
		];
		echo KrMethods::render('joomla.html.image', $options);
		?>
	<?php endforeach; ?>
</div>

<?php if (!empty($url)) : ?>
	</a>
<?php endif; ?>