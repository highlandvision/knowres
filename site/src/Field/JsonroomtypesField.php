<?php
/**
 * @package     KR
 * @subpackage  Admin models
 * @copyright   2017 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Site\Field;

defined('JPATH_BASE') or die;

use Exception;
use HighlandVision\KR\Framework\KrMethods;
use Joomla\CMS\Form\FormField;

use function is_null;
use function json_decode;

/**
 * Room types for JSA.
 *
 * @since 4.0.0
 */
class JsonroomtypesField extends FormField
{
	/** @var string The form field type. */
	protected $type = 'Jsonroomtypes';
	/** @var string The form field type. */
	protected $layout = 'property.enquiry.rooms';

	/**
	 * Method to get the field input markup.
	 *
	 * @throws Exception
	 * @since  4.0.0
	 * @return string
	 */
	public function getInput(): string
	{
		$rooms = KrMethods::getUserState('com_knowres.enquiry.jsonrooms', []);
		if (!is_array($rooms))
		{
			$rooms = json_decode($rooms);
		}

		$data          = [];
		$data['rooms'] = $rooms;
		$data['value'] = is_null($this->value) ? [] : json_decode($this->value);

		$renderer = $this->getRenderer($this->layout);

		return $renderer->render($data);
	}
}