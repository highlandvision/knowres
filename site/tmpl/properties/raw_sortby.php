<?php
/**
 * @package    Know Reservations
 * @subpackage Site View
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

/** @noinspection PhpUnhandledExceptionInspection */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;

if (empty($this->items)) {
	return;
}
if (!$this->params->get('order_ordering') &&
	$this->params->get('order_name') &&
	$this->params->get('order_sleeps') &&
	$this->params->get('order_bedrooms') &&
	$this->params->get('order_price') &&
	$this->params->get('order_area') &&
	$this->params->get('order_rating')) {
	return;
}
?>

<div class="actions">
	<div class="small button-group expanded">
		<a id="kr-order-close" class="button clear small" data-close>
		<span aria-hidden="true">
			<i class="fas fa-times-circle"
			   aria-hidden="true"></i>&nbsp;<?php echo KrMethods::plain('COM_KNOWRES_CLOSE'); ?>
		</span>
		</a>
	</div>
</div>

<?php if ($this->params->get('order_ordering')): ?>
	<?php echo KrMethods::render('properties.filtersort', ['order'    => $this->order,
	                                                       'heading'  => KrMethods::plain('COM_KNOWRES_SORTBY_ORDERING'),
	                                                       'value1'   => '01',
	                                                       'value2'   => '02',
	                                                       'sorttype' => 'a'
	]);
	?>
<?php endif; ?>

<?php if ($this->params->get('order_area')): ?><?php
	echo KrMethods::render('properties.filtersort', ['order'    => $this->order,
	                                                 'heading'  => KrMethods::plain('COM_KNOWRES_SORTBY_AREA'),
	                                                 'value1'   => '51',
	                                                 'value2'   => '52',
	                                                 'sorttype' => 'a'
	]);
	?>
<?php endif; ?>

<?php if ($this->params->get('order_name')): ?>
	<?php echo KrMethods::render('properties.filtersort', ['order'    => $this->order,
	                                                       'heading'  => KrMethods::plain('COM_KNOWRES_SORTBY_NAME'),
	                                                       'value1'   => '11',
	                                                       'value2'   => '12',
	                                                       'sorttype' => 'a'
	]);
	?>
<?php endif; ?>

<?php if ($this->params->get('order_sleeps')): ?>
	<?php echo KrMethods::render('properties.filtersort', ['order'    => $this->order,
	                                                       'heading'  => KrMethods::plain('COM_KNOWRES_SORTBY_SLEEPS'),
	                                                       'value1'   => '21',
	                                                       'value2'   => '22',
	                                                       'sorttype' => 'n'
	]);
	?>
<?php endif; ?>

<?php if ($this->params->get('order_bedrooms')): ?>
	<?php echo KrMethods::render('properties.filtersort', ['order'    => $this->order,
	                                                       'heading'  => KrMethods::plain('COM_KNOWRES_SORTBY_BEDROOMS'),
	                                                       'value1'   => '31',
	                                                       'value2'   => '22',
	                                                       'sorttype' => 'n'
	]);
	?>
<?php endif; ?>

<?php if ($this->params->get('order_price')): ?>
	<?php echo KrMethods::render('properties.filtersort', ['order'    => $this->order,
	                                                       'heading'  => KrMethods::plain('COM_KNOWRES_SORTBY_PRICE'),
	                                                       'value1'   => '41',
	                                                       'value2'   => '42',
	                                                       'sorttype' => 'n'
	]);
	?>
<?php endif; ?>

<?php if ($this->params->get('order_rating')): ?>
	<?php echo KrMethods::render('properties.filtersort', ['order'    => $this->order,
	                                                       'heading'  => KrMethods::plain('COM_KNOWRES_SORTBY_RATING'),
	                                                       'value1'   => '61',
	                                                       'value2'   => '62',
	                                                       'sorttype' => 'n'
	]);
	?>
<?php endif; ?>