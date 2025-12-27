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
use Joomla\CMS\Factory;
use Joomla\CMS\Form\Field\TextField;

// phpcs:disable PSR1.Files.SideEffects
defined('_JEXEC') or die;
// phpcs:enable PSR1.Files.SideEffects

$wa = Factory::getApplication()->getDocument()->getWebAssetManager();
$wa->useStyle('com_knowres.admin-datepicker')
   ->useScript('com_knowres.admin-datepicker');

/**
 * Displays jQuery Ui Datepicker
 *
 * @since 1.0.0
 */
class UicalendarField extends TextField
{
    /** @var string Required layout */
    protected $layout = 'form.field.uicalendar';
    /** @var string The form field type. */
    protected $type = 'Uicalendar';

    /**
     * Get the field options.
     *
     * @return string The field input markup.
     * @throws Exception
     * @since  1.6
     */
    protected function getInput(): string
    {
        parent::getInput();

        return $this->getRenderer($this->layout)->render($this->getLayoutData());
    }

    /**
     * Method to get the data to be passed to the layout for rendering.
     *
     * @return  array
     * @since   4.0.0
     */
    protected function getLayoutData(): array
    {
        $data = parent::getLayoutData();

        $this->dataAttributes  = $this->setDataAttributes();
        $data['dataAttribute'] = $this->renderDataAttributes();

        return $data;
    }

    /**
     * Get the field data attributes.
     *
     * @return array    The field input markup.
     * @since  4.0.0
     */
    protected function setDataAttributes(): array
    {
        $attributes                    = [];
        $attributes['data-avail']      = $this->getAttribute('avail', '');
        $attributes['data-datepicker'] = $this->getAttribute('datepicker', '');

        return $attributes;
    }
}