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
use HighlandVision\KR\SiteHelper;

$Itemid = SiteHelper::getItemId('com_knowres', 'properties', ['region_id' => $params->get('region_id')]);
$link   = KrMethods::route('index.php?option=com_knowres&view=properties&Itemid=' . $Itemid . '&region_id='
	. $params->get('region_id'));
$text   = KrMethods::sprintf('MOD_KNOWRES_DESTINATION_VIEW_PROPERTIES', $destination);
?>

<div class="kr-property kr-destinations" style="margin-bottom:20px;">
	<div class="row">
		<div class="small-12 columns">
			<h2><?php echo $destination; ?></h2>

			<?php
			$options = [
				'src'    => $params->get('image'),
				'alt'    => $destination,
				'class'  => 'responsive',
				'width'  => $params->get('width'),
				'height' => $params->get('height')
			];
			echo KrMethods::render('joomla.html.image', $options);
			?>
			<br><br>

			<h3><?php echo $params->get('heading1'); ?></h3>
			<?php echo $params->get('text1'); ?>

			<h3><?php echo $params->get('heading2'); ?></h3>
			<?php echo $params->get('text2'); ?>

			<h3><?php echo $params->get('heading3'); ?></h3>
			<?php echo $params->get('text3'); ?>

			<h3><?php echo $params->get('heading4'); ?></h3>
			<?php echo $params->get('text4'); ?>
		</div>

		<h3>
			<a style="color:black;text-decoration:underline;" title="<?php echo $text; ?>"
			   href="<?php echo $link; ?>"><?php echo $text; ?></a>
		</h3>
		<br>
	</div>
</div>