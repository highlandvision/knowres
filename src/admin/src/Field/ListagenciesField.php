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

use function array_merge;

// phpcs:disable PSR1.Files.SideEffects
defined('_JEXEC') or die;
// phpcs:enable PSR1.Files.SideEffects

/**
 * Agencies form field
 *
 * @since 1.0.0
 */
class ListagenciesField extends ListField
{
    /** @var string The form field type. */
    protected $type = 'Listagencies';

    /**
     * Get the field options.
     *
     * @return array    The field options.
     * @throws RuntimeException|InvalidArgumentException
     * @since  4.0.0
     */
    protected function getOptions(): array
    {
        $options = [];
        $items   = KrFactory::getListModel('agencies')->getAll();
        foreach ($items as $i) {
            $options[] = HTMLHelper::_('select.option', $i->id, $i->name);
        }

        return array_merge(parent::getOptions(), $options);
    }
}