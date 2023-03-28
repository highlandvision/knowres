<?php
/**
 * @package     Know Reservations
 * @subpackage  Site Layout
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use Highlandvision\KR\Model\ContractModel;

extract($displayData);
/**
 * Layout variables
 *
 * @var false|object $guestddata Contract guestdata;
 * @var false|object $property   Property item;
 * @var false|object $contract   Contract item.
 */

$adults  = $contract->guests;
$infants = 0;
$ages    = '';
if ($guestdata)
{
	$adults  = $guestdata->adults;
	$infants = $guestdata->infants;
	if ($guestdata->children)
	{
		$ages = KrFactory::getAdminModel('contractguestdata')::getChildAges($guestdata->children);
	}
}
// TODO-v4.1 is this needed
//$guests   = $contract->guests;
//$adults   = $contract->adults;
//$children = $contract->children;
//$ages     = $contract->child_ages;
?>

<table style="width:100%;border:none;border-collapse:collapse;">
	<!--	<tr>-->
	<!--		<td style="width:25%;">-->
	<!--			--><?php //echo KrMethods::plain('COM_KNOWRES_GUESTS'); ?>
	<!--		</td>-->
	<!--		<td style="width:75%;">-->
	<!--			--><?php //echo $contract->guests; ?>
	<!--		</td>-->
	<!--	</tr>-->
	<tr>
		<td style="width:25%;">
			<?php echo KrMethods::plain('COM_KNOWRES_GUESTS'); ?>
		</td>
		<td style="width:75%;">
			<?php if ($adults == 1): ?>
				<?php echo KrMethods::sprintf('COM_KNOWRES_CONTRACT_ADULTS_1', $adults); ?>
			<?php elseif ($adults > 1): ?>
				<?php echo KrMethods::sprintf('COM_KNOWRES_CONTRACT_ADULTS', $adults); ?>
			<?php endif; ?>
		</td>
	</tr>
	<?php if ($ages): ?>
		<tr>
			<td></td>
			<td>
				<?php echo $ages; ?>
			</td>
		</tr>
	<?php endif; ?>
	<?php if ((int) $infants): ?>
		<tr>
			<td></td>
			<td>
				<?php echo KrMethods::sprintf('COM_KNOWRES_CONTRACT_INFANTS', $infants,
					$property->sleeps_infant_age);
				?>
			</td>
		</tr>
	<?php endif; ?>
	<!--	--><?php //if ($contract->children > 0): ?>
	<!--		<tr>-->
	<!--			<td style="width:25%;"></td>-->
	<!--			<td style="width:75%;">-->
	<!--				--><?php //if ($contract->children == 1): ?>
	<!--					--><?php //echo KrMethods::sprintf('COM_KNOWRES_CONTRACT_CHILD', $contract->child_ages[0]); ?>
	<!--				--><?php //elseif ($contract->children > 1): ?>
	<!--					--><?php //echo KrMethods::sprintf('COM_KNOWRES_CONTRACT_CHILDREN', $contract->children,
	//						Utility::displayAges($contract->child_ages)); ?>
	<!--				--><?php //endif; ?>
	<!--			</td>-->
	<!--		</tr>-->
	<!--	--><?php //endif; ?>
</table>