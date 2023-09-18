<?php
/**
 * @package     Know Reservations
 * @subpackage  Site Layout
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;
?>

<?php if ($link): ?>
	<a href="<?php echo $link; ?>" <?php echo $external; ?>
        title="<?php echo $d['text']; ?>">
<?php endif; ?>

<?php $options = ['src'   => $d['image'],
                  'alt'   => $d['text'],
                  'style' => 'min-height:' . $height,
                  'class' => 'responsive'
];?>
<?php echo KrMethods::render('joomla.html.image', $options); ?>

<?php if ($textbg): ?>
	<?php if ($d['text']): ?>
		<p class="<?php echo implode(' ', $pclass); ?>" style="<?php echo $pstyle; ?>">
			<?php echo $d['text']; ?>
		</p>
	<?php endif; ?>
<?php else: ?>
	<?php if ($d['text']): ?>
		<div class="overlay">
			<p class="<?php echo implode(' ', $pclass); ?>" style="<?php echo $pstyle; ?>">
				<?php echo $d['text']; ?>
			</p>
		</div>
	<?php endif; ?>
<?php endif; ?>

<?php if ($link): ?>
	</a>
<?php endif; ?>