<?php
/**
 * @package     KR
 * @subpackage  Admin views
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;
use Joomla\CMS\HTML\HTMLHelper;

echo $this->loadTemplate('stats_init');
?>

<?php echo HTMLHelper::_('bootstrap.startTabSet', 'kr-stats'); ?>
<?php echo HTMLHelper::_('bootstrap.addTab', 'kr-stats', 'year', KrMethods::plain('Last year')); ?>
<?php $this->period = $this->stats['year']; ?>
<?php $this->chartid = "piechart_year"; ?>
<?php echo $this->loadTemplate('stats_data'); ?>
<?php echo HTMLHelper::_('bootstrap.endTab'); ?>

<?php echo HTMLHelper::_('bootstrap.addTab', 'kr-stats', 'month', KrMethods::plain('Last 30 days')); ?>
<?php $this->period = $this->stats['month']; ?>
<?php $this->chartid = "piechart_month"; ?>
<?php echo $this->loadTemplate('stats_data'); ?>
<?php echo HTMLHelper::_('bootstrap.endTab'); ?>

<?php echo HTMLHelper::_('bootstrap.addTab', 'kr-stats', 'week', KrMethods::plain('This week')); ?>
<?php $this->period = $this->stats['week']; ?>
<?php $this->chartid = "piechart_week"; ?>
<?php echo $this->loadTemplate('stats_data'); ?>
<?php echo HTMLHelper::_('bootstrap.endTab'); ?>

<?php echo HTMLHelper::_('bootstrap.addTab', 'kr-stats', 'day', KrMethods::plain('Today')); ?>
<?php $this->period = $this->stats['day']; ?>
<?php $this->chartid = "piechart_day"; ?>
<?php echo $this->loadTemplate('stats_data'); ?>
<?php echo HTMLHelper::_('bootstrap.endTab'); ?>

<?php echo HTMLHelper::_('bootstrap.endTabSet'); ?>