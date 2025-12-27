<?php
/**
 * @package     KR
 * @subpackage  Admin models
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Administrator\Field;

use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Session as KrSession;
use Joomla\CMS\Form\FormField;
use RuntimeException;

use function count;

// phpcs:disable PSR1.Files.SideEffects
defined('_JEXEC') or die;
// phpcs:enable PSR1.Files.SideEffects

/**
 * Supports a value from an external table
 *
 * @since 1.0.0
 */
class JsoncheckinfeesField extends FormField
{
    /** @var string The form field layout. */
    protected $layout = 'form.field.json.generic';
    /** @var string The form field type. */
    protected $type = 'Jsoncheckinfees';

    /**
     * Get the field input.
     *
     * @return string
     * @throws RuntimeException
     * @since  1.6
     */
    public function getInput(): string
    {
        $group  = 'checkin_fees';
        $occurs = 3;
        $values = [];

        $userSession = new KrSession\User();
        $userData    = $userSession->getData();
        $property_id = (int)$userData->cr_property_id;

        $settings = KrFactory::getListModel('propertysettings')->getOneSetting('currency');
        $currency = !isset($settings[$property_id]) ? $settings[0] : $settings[$property_id];

        foreach ($this->value as $v) {
            $tmp      = [$v->checkin_fees_from, $v->checkin_fees_to, $v->checkin_fees_amount];
            $values[] = $tmp;
        }

        while (count($values) < $occurs) {
            $tmp      = [0, 0, 0];
            $values[] = $tmp;
        }

        $form = KrFactory::getAdhocForm('json-checkinfees', 'json_checkinfees.xml', 'administrator', null);
        $form->setFieldAttribute('checkin_fees_amount', 'addonBefore', $currency);

        $data           = [];
        $data['form']   = $form;
        $data['values'] = $values;
        $data['group']  = $group;

        $renderer = $this->getRenderer($this->layout);

        return $renderer->render($data);
    }
}