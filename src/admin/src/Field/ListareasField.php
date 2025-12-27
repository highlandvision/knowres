<?php
/**
 * @package    Know Reservations
 * @subpackage Admin Models
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Administrator\Field;

use HighlandVision\KR\Framework\KrFactory;
use InvalidArgumentException;
use Joomla\CMS\Form\Field\ListField;
use Joomla\CMS\HTML\HTMLHelper;
use RuntimeException;

// phpcs:disable PSR1.Files.SideEffects
defined('_JEXEC') || die;
// phpcs:enable PSR1.Files.SideEffects

/**
 * The area options for menu selection.
 *
 * @since 1.0.0
 */
class ListareasField extends ListField
{
    /** @var string $type The form field type. */
    protected $type = 'Listareas';

    /**
     * Get the field options.
     *
     * @return array  The field options.
     * @throws RuntimeException
     * @throws InvalidArgumentException
     * @since  1.0.0
     */
    public function getOptions(): array
    {
        $options = [];
        $items   = KrFactory::getListModel('properties')->getArea();
        foreach ($items as $i) {
            $options[] = HTMLHelper::_('select.option', urlencode($i), $i);
        }

        return array_merge(parent::getOptions(), $options);
    }
}