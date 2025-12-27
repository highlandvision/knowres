<?php
/**
 * @package    Know Reservations
 * @subpackage Admin templates
 * @copyright  2021 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

use HighlandVision\KR\Framework\KrMethods;
use Joomla\CMS\HTML\HTMLHelper;

// phpcs:disable PSR1.Files.SideEffects
defined('_JEXEC') or die;
// phpcs:enable PSR1.Files.SideEffects
?>

<tr>
    <td class="w-1 text-center">
        <?php echo HTMLHelper::_('grid.checkall'); ?>
    </td>
    <?php if ($this->ordering): ?>
        <th scope="col" class="w-1 text-center d-none d-md-table-cell">
            <?php echo HTMLHelper::_('searchtools.sort', '', 'a.ordering', $this->listDirn, $this->listOrder, null,
                    'asc', 'JGRID_HEADING_ORDERING', 'icon-sort'
            ); ?>
        </th>
    <?php endif; ?>
    <th scope="col" class="w-1 text-center">
        <?php echo HTMLHelper::_('searchtools.sort', 'JSTATUS', 'a.state', $this->listDirn, $this->listOrder); ?>
    </th>
    <th class='w-15 d-none d-md-table-cell'>
        <?php echo HTMLHelper::_('searchtools.sort', 'COM_KNOWRES_NAME', 'name', $this->listDirn,
                $this->listOrder
        ); ?>
    </th>
    <th class='w-15 d-none d-md-table-cell text-center'>
        <?php echo KrMethods::plain('COM_KNOWRES_MAPCATEGORIES_MAPICON'); ?>
    </th>
    <th scope="col" class="w-5 d-none d-md-table-cell">
        <?php echo HTMLHelper::_('searchtools.sort', 'JGRID_HEADING_ID', 'a.id', $this->listDirn, $this->listOrder); ?>
    </th>
</tr>