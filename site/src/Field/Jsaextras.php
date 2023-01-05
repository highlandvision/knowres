<?php
/**
 * @package    Know Reservations
 * @subpackage Site Model
 * @copyright  2017 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;
use Joomla\CMS\Form\FormField;

/**
 * Displays JSA extras for selection
 *
 * @since 3.2.0
 */
class Jsaextras extends FormField
{
	/**
	 * Method to get the field input markup.
	 *
	 * @throws Exception
	 * @since  3.2.0
	 * @return string    The field input markup
	 */
	public function getInput(): string
	{
		$this->type = 'Jsaextras';

		return KrMethods::render('property.enquiry.extraslist', [
			'value' => !$this->value ? [] : json_decode($this->value, true),
			'data'  => KrMethods::getUserState('com_knowres.enquiry.extraslist', [])
		]);
	}
}