<?php
/**
 * @package     KR
 * @subpackage  Admin views
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

/** @noinspection PhpUnhandledExceptionInspection */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Utility;
use Joomla\CMS\Object\CMSObject;

extract($displayData);
/**
 * Layout variables
 *
 * @var CMSObject $guestdata Guestdata row.
 */
?>

<div class="row mt-3">
	<div class="col-4 italic">
		<?php echo KrMethods::plain('COM_KNOWRES_CONTRACTGUESTDATA_VMOBILE_TEXT_LBL') . ':'; ?>
	</div>
	<div class="col-8">
		<?php if (!empty($guestdata->vmobile)): ?>
			<?php echo Utility::formatPhoneNumber($guestdata->vmobile, $guestdata->vmobile_country_id); ?>
		<?php endif; ?>
	</div>
</div>