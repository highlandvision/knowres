<?php
/**
 * @package    Know Reservations
 * @subpackage Site
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Site\Field;

use Joomla\CMS\Form\FormField;
use UnexpectedValueException;

use function sprintf;

// phpcs:disable PSR1.Files.SideEffects
defined('_JEXEC') or die;
// phpcs:enable PSR1.Files.SideEffects

/**
 * Display google recaptcha
 *
 * @since 1.0.0
 */
class SwitchField extends FormField
{
    /** @var string The form field type. */
    protected $type = 'switch';

    /**
     * Method to get the radio button field input markup.
     *
     * @return string  The field input markup.
     * @throws UnexpectedValueException
     * @since  1.7.0
     */
    protected function getInput(): string
    {
        if (empty($this->layout)) {
            throw new UnexpectedValueException(sprintf('%s has no layout assigned.', $this->name));
        }

        return $this->getRenderer($this->layout)->render($this->getLayoutData());
    }
}