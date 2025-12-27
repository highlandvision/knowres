<?php
/**
 * @package     Joomla.Libraries
 * @subpackage  Form
 * @copyright   2005 - 2016 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE
 */

namespace HighlandVision\Component\Knowres\Administrator\Field;

use Exception;
use HighlandVision\KR\Joomla\Extend\ListField as KrListField;
use HighlandVision\KR\Translations;
use RuntimeException;
use stdClass;

use function array_merge;

// phpcs:disable PSR1.Files.SideEffects
defined('_JEXEC') || die;
// phpcs:enable PSR1.Files.SideEffects

/**
 * Form Field to load a list of filter regions
 *
 * @since  3.2
 */
class FiltermapcategoryField extends KrListField
{
    /** @var string The form field type. */
    protected $type = 'Filtermapcategory';

    /**
     * Populate the map categories filter list
     *
     * @return array  The field option objects.
     * @throws RuntimeException|Exception
     * @since  2.5.1
     */
    protected function getOptions(): array
    {
        $options = [];
        $table   = $this->getAttribute('table');
        $results = self::filteringForeign('#__knowres_map_category', $table, 'map_category_id', 'id', null);

        $Translations = new Translations();
        $tmp          = $Translations->getArray($results, 'mapcategory', 'name');

        foreach ($tmp as $k => $v) {
            $option        = new stdClass();
            $option->value = $k;
            $option->text  = $v;
            $options[]     = $option;
        }

        return array_merge(parent::getOptions(), $options);
    }
}