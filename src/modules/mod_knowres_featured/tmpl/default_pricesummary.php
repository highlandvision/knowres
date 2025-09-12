<?php
/**
 * @package    Know Reservations
 * @subpackage Site View
 * @copyright  2018 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */
/** @noinspection PhpUnhandledExceptionInspection */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Utility;

$minrate  = $item['minrate'];
$maxrate  = $item['maxrate'];
$netrate  = $item['netrate'];
$markup   = $item['markup'];
$summary  = $item['summary'];
$currency = $item['currency'];
?>

<div class="price">
	<?php if ($minrate > 0): ?>
		<?php if ($maxrate > 0 && $minrate != $maxrate): ?>
			<?php if ($netrate && $markup): ?>
				<?php $min = KrFactory::getAdminModel('ratemarkup')::getGrossRate($minrate, $markup); ?>
				<?php $max = KrFactory::getAdminModel('ratemarkup')::getGrossRate($maxrate, $markup); ?>
			<?php else: ?>
				<?php $min = Utility::roundValue($minrate); ?>
				<?php $max = Utility::roundValue($maxrate); ?>
			<?php endif; ?>

			<?php echo KrMethods::sprintf('MOD_KNOWRES_FEATURED_FROM_PRICE',
				$Currency->getSimpleValue($min . ' - ' . $max, $currency)); ?>
		<?php else: ?>
			<?php if ($netrate && $markup): ?>
				<?php $min = KrFactory::getAdminModel('ratemarkup')::getGrossRate($minrate, $markup); ?>
			<?php else: ?>
				<?php $min = $minrate; ?>
			<?php endif; ?>

			<?php echo KrMethods::sprintf('MOD_KNOWRES_FEATURED_FROM_PRICE',
				$Currency->getSimpleValue($min, $currency)); ?>
		<?php endif; ?>
	<?php elseif ($summary): ?>
		<?php echo KrMethods::sprintf('MOD_KNOWRES_FEATURED_FROM_PRICE',
			$Currency->getSimpleValue($summary, $currency)); ?>
	<?php endif; ?>
</div>