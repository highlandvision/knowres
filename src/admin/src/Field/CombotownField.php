<?php
/**
 * @package    Know Reservations
 * @subpackage Admin Models
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Administrator\Field;

use Exception;
use HighlandVision\KR\Framework\KrFactory;
use InvalidArgumentException;
use Joomla\CMS\Form\Field\ListField;
use Joomla\CMS\HTML\HTMLHelper;

use function array_merge;

// phpcs:disable PSR1.Files.SideEffects
defined('_JEXEC') || die;
// phpcs:enable PSR1.Files.SideEffects

/**
 * Field for town combo.
 *
 * @since  1.0.0
 */
class CombotownField extends ListField
{
    /** @var string The form field type. */
    protected $type = 'Combotown';

    /**
     * Get the field options.
     *
     * @return array The field options
     * @throws Exception
     * @throws InvalidArgumentException
     * @since  1.0.0
     */
    public function getOptions(): array
    {
        $options = [];

        $region_id = $this->fieldname == 'town_id' ? $this->form->getValue('region_id')
            : $this->form->getValue('b_region_id');

        if ($region_id) {
            $items = KrFactory::getListModel('towns')
                              ->getByRegion($region_id, $this->getAttribute('allowproperty', false));

            foreach ($items as $i) {
                $options[] = HTMLHelper::_('select.option', $i->id, $i->name);
            }
        }

        return array_merge(parent::getOptions(), $options);
    }
}