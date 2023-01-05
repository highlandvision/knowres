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

use HighlandVision\KR\Framework\KrMethods;
use InvalidArgumentException;
use Joomla\CMS\Form\FormField;
use Joomla\CMS\HTML\HTMLHelper;

use function trim;

/**
 * Display google recaptcha
 *
 * @since 1.0.0
 */
class GrecaptchaField extends FormField
{
	/** @var string The form field type. */
	protected $type = 'Grecaptcha';

	/**
	 * Method to get the field input markup.
	 *
	 * @throws InvalidArgumentException
	 * @since  1.6
	 * @return string    The field input markup.
	 */
	protected function getInput(): string
	{
		$html = [];

		$file = 'https://www.google.com/recaptcha/api.js?hl=' . KrMethods::getLanguageTag();
		HTMLHelper::_('script', trim($file), ['async' => 'async', 'defer' => 'defer']);

		$params      = KrMethods::getParams();
		$grsitekey   = $params->get('grsitekey', '');
		$grsecretkey = $params->get('grsecretkey', '');
		if (!$grsitekey || !$grsecretkey)
		{
			return '';
		}

		$html[] = '<div class="g-recaptcha" data-sitekey="' . $grsitekey . '"></div>';

		return implode($html);
	}
}