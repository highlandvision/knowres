<?php
/**
 * @package    Know Reservations
 * @subpackage Admin Controller
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Administrator\Field;

use HighlandVision\KR\Utility;
use Joomla\CMS\Form\Field\TextField;
use SimpleXMLElement;

use function htmlspecialchars;

use const ENT_COMPAT;

// phpcs:disable PSR1.Files.SideEffects
defined('_JEXEC') or die;
// phpcs:enable PSR1.Files.SideEffects

/**
 * Supports a monetary value
 *
 * @since 1.0.0
 */
class TextmoneyField extends TextField
{
    /** @var string Required layout */
    protected $layout = 'joomla.form.field.text';
    /** @var string The form field type. */
    protected $type = 'Textmoney';

    /**
     * Method to attach a Form object to the field.
     *
     * @param   SimpleXMLElement  $element   The SimpleXMLElement object representing the `<field>` tag for the form field object.
     * @param   mixed             $value     The form field value to validate.
     * @param   string            $group     The field name group control value. This acts as an array container for the field.
     *                                       For example if the field name="foo" and the group value is set to "bar" then the
     *                                       full field name would end up being "bar[foo]".
     *
     * @return  bool  True on success.
     * @since   1.7.0
     */
    public function setup(SimpleXMLElement $element, $value, $group = null): bool
    {
        $return = parent::setup($element, $value, $group);
        if ($return) {
            if ($value != 0) {
                $dp          = $this->getAttribute('dp') ?: 2;
                $this->value = Utility::displayMoney(htmlspecialchars($value, ENT_COMPAT), (int)$dp);
            } else {
                $this->value = '';
            }
        }

        return $return;
    }

    /**
     * Method to get the field options.
     *
     * @return  array  The field option objects.
     * @since   4.0.0
     */
    protected function getOptions(): array
    {
        return parent::getOptions();
    }
}