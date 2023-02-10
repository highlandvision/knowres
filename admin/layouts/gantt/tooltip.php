<?php
/**
 * @package     KR
 * @subpackage  Admin views
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

defined('_JEXEC') or die;

use HighlandVision\KR\TickTock;
use HighlandVision\KR\Utility;

extract($displayData);
/**
 * Layout variables
 *
 * @var object $data Tooltip data from contract.
 */
?>

<div>
	<i class="fas fa-lg fa-mobile-alt">&nbsp;</i>
	<span><?php echo Utility::formatPhoneNumber($data->mobile, $data->mobile_country_id); ?></span>
</div>
<?php if ($data->email): ?>
	<div>
		<i class="fas fa-envelope">&nbsp;</i>
		<span><?php echo $data->email; ?></span>
	</div>
<?php endif; ?>
<div>
	<i class="fas fa-lg fa-calendar-alt">&nbsp;</i>
	<?php echo TickTock::displayDate($data->arrival) . ' - ' . TickTock::displayDate($data->departure); ?>
</div>