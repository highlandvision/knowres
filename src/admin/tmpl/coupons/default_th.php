<?php
/**
 * @package    Know Reservations
 * @subpackage Admin templates
 * @copyright  2021 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

defined('_JEXEC') or die;

use Joomla\CMS\HTML\HTMLHelper;
?>

<tr>
    <th class="w-1 text-center">
        <?php echo HTMLHelper::_('grid.checkall'); ?>
    </th>
    <?php if ($this->ordering): ?>
        <th scope="col" class="w-1 text-center d-none d-md-table-cell">
            <?php echo HTMLHelper::_('searchtools.sort', '', 'a.ordering', $this->listDirn, $this->listOrder, null,
                'asc', 'JGRID_HEADING_ORDERING', 'icon-sort',
            ); ?>
        </th>
    <?php endif; ?>
    <th scope="col" class="w-1 text-center">
        <?php echo HTMLHelper::_('searchtools.sort', 'JSTATUS', 'a.state', $this->listDirn, $this->listOrder); ?>
    </th>
    <th scope="col" class="w-20">
        <?php echo HTMLHelper::_('searchtools.sort', 'COM_KNOWRES_COUPONS_COUPON_CODE', 'a.coupon_code',
            $this->listDirn,
            $this->listOrder,
        ); ?>
    </th>
    <th scope="col" class='w-10'>
        <?php echo HTMLHelper::_('searchtools.sort', 'COM_KNOWRES_COUPONS_VALID_FROM', 'a.valid_from', $this->listDirn,
            $this->listOrder,
        ); ?>
    </th>
    <th scope="col" class='w-10'>
        <?php echo HTMLHelper::_('searchtools.sort', 'COM_KNOWRES_COUPONS_VALID_TO', 'a.valid_to', $this->listDirn,
            $this->listOrder,
        ); ?>
    </th>
    <th scope="col" class='w-10'>
        <?php echo HTMLHelper::_('searchtools.sort', 'COM_KNOWRES_COUPONS_AMOUNT', 'a.amount', $this->listDirn,
            $this->listOrder,
        ); ?>
    </th>
    <th scope="col" class="w-5 d-none d-md-table-cell">
        <?php echo HTMLHelper::_('searchtools.sort', 'JGRID_HEADING_ID', 'a.id', $this->listDirn, $this->listOrder); ?>
    </th>
</tr>