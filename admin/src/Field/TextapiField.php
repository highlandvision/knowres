<?php
/**
 * @package    Know Reservations
 * @subpackage Admin Models
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Administrator\Field;

defined('_JEXEC') or die;

use DOMDocument;
use Exception;
use HighlandVision\KR\Utility;
use Joomla\CMS\Form\FormField;
use SimpleXMLElement;

use function htmlentities;
use function is_string;
use function libxml_use_internal_errors;
use function str_replace;
use function trim;

use const LIBXML_NOERROR;

/**
 * Formats xml text from api
 *
 * @since 3.3.0
 */
class TextapiField extends FormField
{
	/** @var string The form field type. */
	protected $type = 'Textapi';

	/**
	 * Simple method to set the value
	 *
	 * @since  3.2
	 * @return string
	 */
	public function getInput(): string
	{
		if (!trim($this->value))
		{
			return '';
		}

		try
		{
			libxml_use_internal_errors(true);
			$xml                     = new SimpleXMLElement(trim($this->value, LIBXML_NOERROR));
			$dom                     = new DOMDocument();
			$dom->preserveWhiteSpace = true;
			$dom->loadXML($xml->asXml());
			$dom->formatOutput       = true;
			$output = str_replace('<?xml version="1.0"?>', '', $dom->saveXML());

			return '<pre>' . htmlentities($output) . '</pre>';
		}
		catch (Exception)
		{
			$test = @json_decode($this->value);
			if ($test)
			{
				$json = Utility::decodeJson($this->value, true);
				$d    = '<pre>';
				foreach ($json as $key => $text)
				{
					if (is_object($text) || is_array($text))
					{
						$properties = (array) $text;
						foreach ($properties as $k => $v)
						{
							$d .= $k . ' = ' . $v . '<br>';
						}
					}
					else
					{
						$d .= $key . ' = ' . $text . '<br>';
					}
				}
				$d .= '</pre>';

				return $d;
			}
			else if (is_string($this->value))
			{
				return '<pre>' . $this->value . '</pre>';
			}
			else if (is_countable($this->value) && count($this->value))
			{
				$d = '<pre>';
				foreach ($this->value as $key => $value)
				{
					$d .= $key . ' = ' . $value . '<br>';
				}
				$d .= '</pre>';

				return $d;
			}
			else
			{
				return "<pre>Sorry the data could not be displayed</pre>";
			}
		}
	}
}