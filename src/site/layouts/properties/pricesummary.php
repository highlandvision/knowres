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

use HighlandVision\KR\Currency;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Utility;

extract($displayData);
/**
 * Layout variables
 *
 * @var float  $minrate  Minimum rate.
 * @var float  $maxrate  Maximum rate.
 * @var float  $netrate  Net rate.
 * @var float  $markup   Rate markup.
 * @var string $summary  Summary text.
 * @var string $currency Rates / property currency.
 */

$Currency = new Currency();
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

			<?php echo KrMethods::sprintf('COM_KNOWRES_FROM_PRICE',
				$Currency->getSimpleValue($min . ' - ' . $max, $currency)); ?>
		<?php else: ?>
			<?php if ($netrate && $markup): ?>
				<?php $min = KrFactory::getAdminModel('ratemarkup')::getGrossRate($minrate, $markup); ?>
			<?php else: ?>
				<?php $min = $minrate; ?>
			<?php endif; ?>

			<?php echo KrMethods::sprintf('COM_KNOWRES_FROM_PRICE', $Currency->getSimpleValue($min, $currency)); ?>
		<?php endif; ?>
	<?php elseif ($summary): ?>
		<?php echo KrMethods::sprintf('COM_KNOWRES_FROM_PRICE', $Currency->getSimpleValue($summary, $currency)); ?>
	<?php endif; ?>
</div>