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

use function array_merge;

// phpcs:disable PSR1.Files.SideEffects
\defined('_JEXEC') or die;
// phpcs:enable PSR1.Files.SideEffects

/**
 * Supports a value from an external table
 *
 * @since 1.0.0
 */
class ListcurrencypropertyField extends ListField
{
    /** @var string $type The form field type. */
    protected $type = 'Listcurrencyproperty';

    /**
     * Get the field options.
     *
     * @return array  The field input markup.
     * @throws RuntimeException
     * @throws InvalidArgumentException
     * @since  1.6
     */
    public function getOptions(): array
    {
        $options    = [];
        $currencies = [];

        $items = KrFactory::getListModel('currencies')->getAllPropertyCurrencies();
        foreach ($items as $i) {
            $currencies[] = $i->iso;
        }

        $items = array_unique($currencies);

        foreach ($items as $c) {
            $options[] = HTMLHelper::_('select.option', $c, $c);
        }

        return array_merge(parent::getOptions(), $options);
    }
}