<?php
/**
 * @package     Know Reservations
 * @subpackage  Admin Layout
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;
use Joomla\CMS\Object\CMSObject;

extract($displayData);
/**
 * Layout variables
 *
 * @var CMSObject $guestdata Guestdata row.
 * @var array     $options   Property options.
 */

$answers = [];
foreach ($guestdata->options as $v)
{
	$answers[$v->id] = $v->answer;
}
?>

	<div class="row mt-2">
		<div class="col fw500">
			<div><?php echo KrMethods::plain('COM_KNOWRES_PROPERTYOPTIONS_TITLE'); ?></div>
		</div>
	</div>

<?php foreach ($options as $o): ?>
	<?php $data = ''; ?>

	<?php if (!empty($answers[$o->id])): ?>
		<?php $answer = $answers[$o->id]; ?>
		<?php if ($o->yesno): ?>
			<?php if ($answer): ?>
				<?php $data = KrMethods::plain('JYES'); ?>
			<?php else: ?>
				<?php $data = KrMethods::plain('JNO'); ?>
			<?php endif; ?>
		<?php else: ?>
			<?php $data = $answer; ?>
		<?php endif; ?>
	<?php endif; ?>

	<div class="row">
		<div class="col">
			<?php echo $o->name; ?>
		</div>
	</div>
	<?php if (!empty($data)): ?>
		<div class="row">
			<div class="col">
				<i class="far fa-lg fa-comment-dots"></i>&nbsp;<?php echo $data; ?>
			</div>
		</div>
	<?php endif; ?>
<?php endforeach; ?>