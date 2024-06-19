<?php
/**
 * @package    Know Reservations
 * @subpackage Site module
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

use HighlandVision\KR\Framework\KrMethods;

defined('_JEXEC') or die;

$wa = $app->getDocument()->getWebAssetManager();
$wa->getRegistry()->addExtensionRegistryFile('com_knowres');
$wa->useScript('com_knowres.site-modules');
?>

<div class="kr-equalize grid-x grid-margin-x">
	<?php foreach ($regions as $region): ?>
		<div class="small-12 medium-4 cell">
			<a href="<?php echo KrMethods::route('index.php?option=com_knowres&view=properties&region_id=' .
			                                     $region['id']
			                                     .
			                                     '&Itemid=' .
			                                     $region['Itemid']); ?>" title="<?php echo $region['name']; ?>">

				<?php
				$options = ['src'   => $region['image'],
				            'alt'   => $region['name'],
				            'style' => 'min-height:180px',
				            'class' => 'responsive'
				];

				echo KrMethods::render('joomla.html.image', $options);
				?>
			</a>
			<h5><?php echo $region['name']; ?></h5>
		</div>
	<?php endforeach; ?>
</div>