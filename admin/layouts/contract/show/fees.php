<?php
/**
 * @package     KR
 * @subpackage  Admin Layouts
 * @copyright   Copyright (C) 2021 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */
/** @noinspection PhpUnhandledExceptionInspection */

use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\TickTock;
use HighlandVision\KR\Utility;
use Joomla\CMS\Object\CMSObject;

extract($displayData);
/**
 * Layout variables
 *
 * @var CMSObject $contract The contract item.
 * @var mixed     $fees     Fees charged
 */

$fee_total = 0;
?>

<?php if (is_countable($fees) && count($fees)) : ?>
	<div class="row">
		<div class="col-3 strong">
			<?php echo KrMethods::plain('JDATE'); ?>
		</div>
		<div class="col-7 strong">
			<?php echo KrMethods::plain('COM_KNOWRES_CONTRACTFEES_DESCRIPTION'); ?>
		</div>
		<div class="col-2 strong text-end">
			<?php echo KrMethods::plain('COM_KNOWRES_CONTRACTFEES_VALUE'); ?>
		</div>
	</div>

	<?php foreach ($fees as $f): ?>
		<div class="row">
			<div class="col-3">
				<?php echo TickTock::displayDate($f->created_at); ?>
			</div>
			<div class="col-7">
				<?php echo $f->description; ?>
			</div>
			<div class="col-2 text-end">
				<?php echo Utility::displayValue($f->value, $contract->currency); ?>
			</div>
		</div>
		<?php $fee_total += $f->value; ?>
	<?php endforeach; ?>
	<div class="row">
		<div class="col-3"></div>
		<div class="col-7 text-end">
			<?php echo KrMethods::plain('COM_KNOWRES_CONTRACTFEES_TOTAL'); ?>
		</div>
		<div class="col-2 text-end strong">
			<?php echo Utility::displayValue($fee_total, $contract->currency); ?>
		</div>
	</div>
<?php endif; ?>