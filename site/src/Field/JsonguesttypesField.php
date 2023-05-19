<?php
/**
 * @package    Know Reservations
 * @subpackage Site Model
 * @copyright  2017 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Site\Field;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Utility;
use Joomla\CMS\Form\FormField;

/**
 * Display the guest types.
 *
 * @since 1.0.0
 */
class JsonguesttypesField extends FormField
{
	/** @var string The form field type. */
	protected $type = 'Jsonguesttypes';

	/**
	 * Return the form input field.
	 *
	 * @throws Exception
	 * @since  3.2.0
	 * @return string
	 */
	public function getInput(): string
	{
		$guest_types = KrMethods::getUserState('com_knowres.enquiry.jsonguesttypes', []);
		if (!is_array($guest_types))
		{
			$guest_types = Utility::decodeJson($guest_types, true);
		}

		return KrMethods::render('property.enquiry.guesttypes',
			['value' => is_null($this->value) ? array() : json_decode($this->value),
			 'data'  => $guest_types
			]);
	}
}