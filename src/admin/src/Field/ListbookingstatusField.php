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
use Joomla\CMS\Form\Field\ListField;
use Joomla\CMS\HTML\HTMLHelper;

// phpcs:disable PSR1.Files.SideEffects
defined('_JEXEC') || die;
// phpcs:enable PSR1.Files.SideEffects

/**
 * Supports a value from an external table
 *
 * @since 1.0.0
 */
class ListbookingstatusField extends ListField
{
    /** @var string The form field type. */
    protected $type = 'Listbookingstatus';

    /**
     * Display the list of booking status
     *
     * @return array The field input options.
     * @throws Exception
     * @since  1.0.0
     */
    public function getOptions(): array
    {
        $options = [];

        /** @var $model Contract */
        $model = KrFactory::getAdminModel('contract');
        $items = $model->getBookingStatusOptions();
        foreach ($items as $k => $v) {
            $options[] = HTMLHelper::_('select.option', $k, $v);
        }

        return array_merge(parent::getOptions(), $options);
    }
}