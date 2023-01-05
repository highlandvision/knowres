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
?>

<ul class="small-block-grid-3 medium-block-grid-5 homethumbs">
	<?php foreach ($data as $d): ?>
		<li>
			<a href="<?php echo KrMethods::route('index.php?option=com_knowres&view=properties&region_id=' . $d['id']
				. '&Itemid=' . $d['Itemid']); ?>" title="<?php echo $d['name']; ?>">

				<?php
				$options = [
					'src'    => $d['image'],
					'alt'    => $d['name'],
					'class'  => 'border responsive',
					'width'  => 84,
					'height' => 84
				];
				echo KrMethods::render('joomla.html.image', $options);
				?>
			</a>
			<h5><?php echo $d['name']; ?></h5>
		</li>
	<?php endforeach; ?>
</ul>