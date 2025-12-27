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

<?php foreach ($this->items as $i => $this->item): ?>
    <tr class="row<?php echo $i % 2; ?>;">
        <td class="text-center">
            <?php echo HTMLHelper::_('grid.id', $i, $this->item->id); ?>
        </td>
        <?php if ($this->ordering): ?>
            <td class="text-center d-none d-md-table-cell">
                <?php echo KrMethods::render('html.list.sortable', ['data' => $this]); ?>
            </td>
        <?php endif; ?>
        <td class="text-center">
            <?php echo HTMLHelper::_('jgrid.published', $this->item->state, $i, $this->name . '.', $this->canChange,
                    'cb'
            ); ?>
        </td>
        <th scope="row">
            <?php echo KrMethods::render('html.list.editable',
                    ['data' => $this, 'item' => $this->item, 'i' => $i, 'column' => 'service_name']
            ); ?>
        </th>
        <td class="d-none d-md-table-cell">
            <?php
            if ($this->item->property_name)
            {
                echo KrMethods::plain('COM_KNOWRES_PROPERTY');
            }
            elseif ($this->item->contract_tag || $this->item->contract_id)
            {
                echo KrMethods::plain('COM_KNOWRES_CONTRACT_TITLE');
            }
            elseif ($this->item->guest_name)
            {
                echo KrMethods::plain('COM_KNOWRES_GUEST');
            }
            elseif ($this->item->owner_name)
            {
                echo KrMethods::plain('COM_KNOWRES_OWNER');
            }
            ?>
        </td>
        <td class="d-none d-md-table-cell">
            <?php
            if ($this->item->property_id)
            {
                echo $this->item->property_name;
            }
            elseif ($this->item->contract_id)
            {
                echo $this->item->contract_tag;
            }
            elseif ($this->item->guest_id)
            {
                echo $this->item->guest_name;
            }
            elseif ($this->item->owner_id)
            {
                echo $this->item->owner_name;
            }
            ?>
        </td>
        <td class="d-none d-md-table-cell">
            <?php echo $this->item->foreign_key; ?>
        </td>
        <td class="text-center d-none d-md-table-cell">
            <?php
            if ($this->item->property_id > 0)
            {
                echo $this->item->sell ? KrMethods::plain('JYES') : KrMethods::plain('JNO');
            }
            ?>
        </td>
        <td class="d-none d-md-table-cell">
            <?php echo (int) $this->item->id; ?>
        </td>
    </tr>
<?php endforeach; ?>