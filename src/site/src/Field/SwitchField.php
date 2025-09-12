<?php
/**
 * @package    Know Reservations
 * @subpackage Site
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Site\Field;

defined('_JEXEC') or die;

use Joomla\CMS\Form\FormField;
use UnexpectedValueException;

use function sprintf;

/**
 * Display google recaptcha
 *
 * @since 1.0.0
 */
class SwitchField extends FormField
{
	/**
	 * Method to get the radio button field input markup.
	 *
	 * @throws UnexpectedValueException
	 * @since  1.7.0
	 * @return string  The field input markup.
	 */
	protected function getInput(): string
	{
		$this->type = 'switch';

		if (empty($this->layout))
		{
			throw new UnexpectedValueException(sprintf('%s has no layout assigned.', $this->name));
		}

		return $this->getRenderer($this->layout)->render($this->getLayoutData());
	}
}