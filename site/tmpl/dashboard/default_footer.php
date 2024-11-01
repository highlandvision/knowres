<?php
/**
 * @package    Know Reservations
 * @subpackage Site Views
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */
/** @noinspection PhpUnhandledExceptionInspection */

use HighlandVision\KR\Framework\KrMethods;

defined('_JEXEC') or die;
?>

<div class="grid-x grid-margin-x">
	<div class="small-12 medium-6 large-3 text-center cell">
		<?php echo KrMethods::loadInternal('{loadposition dashboard-bottom1}'); ?>
		&nbsp;
	</div>
	<div class="small-12 medium-6 large-3 text-center cell">
		<?php echo KrMethods::loadInternal('{loadposition dashboard-bottom2}'); ?>
		&nbsp;
	</div>
	<div class="small-12 medium-6 large-3 text-center cell">
		<?php echo KrMethods::loadInternal('{loadposition dashboard-bottom3}'); ?>
		&nbsp;
	</div>
	<div class="small-12 medium-6 large-3 text-center cell">
		<?php echo KrMethods::loadInternal('{loadposition help}'); ?>
		&nbsp;
	</div>
</div>