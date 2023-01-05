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
use HighlandVision\KR\Translations;

extract($displayData);
/**
 * Layout variables
 *
 * @var string $type  Tax type.
 * @var float  $value Tax value.
 * @var int    $code  Tax code.
 * @var int    $id    Tax ID.
 */

if ($id)
{
	$Translations = new Translations();
	$name         = $Translations->getText('taxrate', $id);
}
if (!$name)
{
	$name = KrMethods::plain('COM_KNOWRES_CONTRACTS_TAX');
}
?>

<div class="row">
	<?php if ($type == 1): ?>
		<div class="small-12 medium-6 columns"><?php echo $name; ?></div>
		<div class="small-12 medium-6 columns text-right"><?php echo $value; ?></div>
	<?php elseif ($type == 2): ?>
		<div class="small-12 columns">
			<?php echo KrMethods::sprintf('COM_KNOWRES_CONFIRM_TAX_TYPE_INCLUDED', $name, $value); ?>
		</div>
	<?php elseif ($type == 3): ?>
		<div class="small-12 columns">
			<?php echo KrMethods::sprintf('COM_KNOWRES_CONFIRM_TAX_TYPE_ARRIVAL', $name, $value); ?>
		</div>
	<?php endif; ?>
</div>