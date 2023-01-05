<?php
/**
 * @package    Know Reservations
 * @subpackage Admin Layout
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */
/** @noinspection PhpUnhandledExceptionInspection */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use Joomla\CMS\Object\CMSObject;

extract($displayData);
/**
 * Layout variables
 *
 * @var CMSObject $guestdata Guestdata row.
 * @var CMSObject $property  Property row.
 */

if (!$guestdata->adults)
{
	return;
}

$ages = '0';
if ((int) $guestdata->children)
{
	$ages = KrFactory::getAdminModel('contractguestdata')::getChildAges($guestdata->children);
}
?>

<div class="row mt-2">
	<div class="col-12">
		<div class="row">
			<div class="col-4">
				<?php echo KrMethods::plain('COM_KNOWRES_CONTRACTGUESTDATAS_ADULTS'); ?>
			</div>
			<div class="col-2">
				<?php echo $guestdata->adults; ?>
			</div>
		</div>
		<div class="row">
			<div class="col-4">
				<?php echo KrMethods::plain('COM_KNOWRES_CONTRACTGUESTDATA_CHILDREN_LBL'); ?>
			</div>
			<div class="col-8">
				<?php echo $ages; ?>
			</div>
		</div>
		<?php if ($property->sleeps_infant_age): ?>
			<div class="row">
				<div class="col-4">
					<?php echo KrMethods::sprintf('COM_KNOWRES_CONTRACTGUESTDATA_INFANTS_LBL',
						$property->sleeps_infant_age); ?>
				</div>
				<div class="col-2">
					<?php echo $guestdata->infants; ?>
				</div>
			</div>
		<?php endif; ?>
	</div>
</div>
