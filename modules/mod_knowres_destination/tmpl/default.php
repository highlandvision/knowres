<?php
/**
 * @package    Know Reservations
 * @subpackage Site module
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */
/** @noinspection PhpUnhandledExceptionInspection */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\SiteHelper;

$Itemid = SiteHelper::getItemId('com_knowres', 'properties', ['region_id' => $params->get('region_id')]);
$link   = KrMethods::route('index.php?option=com_knowres&view=properties&Itemid=' . $Itemid . '&region_id='
	. $params->get('region_id'));
$text   = KrMethods::sprintf('MOD_KNOWRES_DESTINATION_VIEW_PROPERTIES', $destination);
?>

<div class="kr-destinations">
	<div class="grid-x grid-margin-x">
		<div class="small-12 cell">
			<?php $options = ['src'    => $params->get('image'),
			                  'alt'    => $destination,
			                  'class'  => 'th responsive'
				];
			?>
			<?php echo KrMethods::render('joomla.html.image', $options); ?>
			<br><br>

			<h3><?php echo $params->get('heading1'); ?></h3>
			<?php echo $params->get('text1'); ?>
			<br>

			<h3><?php echo $params->get('heading2'); ?></h3>
			<?php echo $params->get('text2'); ?>
			<br>

			<h3><?php echo $params->get('heading3'); ?></h3>
			<?php echo $params->get('text3'); ?>
			<br>

			<h3><?php echo $params->get('heading4'); ?></h3>
			<?php echo $params->get('text4'); ?>
		</div>
	</div>
</div>