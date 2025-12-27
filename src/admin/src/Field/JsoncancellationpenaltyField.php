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
use Joomla\CMS\Form\FormField;

use function count;

// phpcs:disable PSR1.Files.SideEffects
defined('_JEXEC') or die;
// phpcs:enable PSR1.Files.SideEffects

/**
 * Supports a value from an external table
 *
 * @since 1.0.0
 */
class JsoncancellationpenaltyField extends FormField
{
    /** @var string The form field layout. */
    protected $layout = 'form.field.json.generic';
    /** @var string The form field type. */
    protected $type = 'Jsoncancellationpenalty';

    /**
     * Get the field input.
     *
     * @return string
     * @since  1.6
     */
    public function getInput(): string
    {
        $group  = 'cancellation_penalty';
        $occurs = 5;
        $values = [];

        foreach ($this->value as $v) {
            $tmp      = [$v->cancellation_penalty_from, $v->cancellation_penalty_to, $v->cancellation_penalty_pc];
            $values[] = $tmp;
        }

        while (count($values) < $occurs) {
            $tmp      = [0, 0, 0];
            $values[] = $tmp;
        }

        $form = KrFactory::getAdhocForm('json-cancellationpenalty', 'json_cancellationpenalty.xml', 'administrator',
            null,
        );

        $data           = [];
        $data['form']   = $form;
        $data['values'] = $values;
        $data['group']  = $group;

        $renderer = $this->getRenderer($this->layout);

        return $renderer->render($data);
    }
}