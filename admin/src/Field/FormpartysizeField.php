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

use Exception;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use Joomla\CMS\Form\FormField;

/**
 * Guest numbers and ages
 *
 * @since 1.0.0
 */
class FormpartysizeField extends FormField
{
	/**
	 * Get the field markup.
	 *
	 * @throws Exception
	 * @since  1.6
	 * @return string
	 */
	public function getInput(): string
	{
		$this->type = 'Formpartysize';
		$form       = KrFactory::getAdhocForm('partysize', 'partysize.xml');

		KrMethods::setUserState('com_knowres.contractguestdata.country_id', $this->contract->guest_country_id);
		KrMethods::setUserState('com_knowres.contractguestdata.infant_age', $this->property->sleeps_infant_age);
		KrMethods::setUserState('com_knowres.contractguestdata.infant_max', $this->property->sleeps_infant_max);
		KrMethods::setUserState('com_knowres.contractguestdata.guests', $this->contract->guests);
		KrMethods::setUserState('com_knowres.contractguestdata.property', $this->property->id);
		KrMethods::setUserState('com_knowres.contractguestdata.firstname', $this->contract->guest_firstname);
		KrMethods::setUserState('com_knowres.contractguestdata.surname', $this->contract->guest_surname);

		$maxguests = $this->property->sleeps + $this->property->sleeps_extra + $this->property->sleeps_infant_max;
		KrMethods::setUserState('com_knowres.guestdata.maxguests', $maxguests);

		$this->total_guests  = $this->contract->guests;
		$this->total_infants = $this->property->sleeps_infant_max;

		$data = ['form'       => $form,
		         'guests'     => KrMethods::getUserState('com_knowres.contractguestdata.guests'),
		         'infant_age' => KrMethods::getUserState('com_knowres.contractguestdata.infant_age'),
		         'infant_max' => KrMethods::getUserState('com_knowres.contractguestdata.infant_max'),
		         'adults'     => KrMethods::getUserState('com_knowres.contractguestdata.adults'),
		         'children'   => KrMethods::getUserState('com_knowres.contractguestdata.children'),
		         'infants'    => KrMethods::getUserState('com_knowres.contractguestdata.infants')
		];

		return $this->getRenderer($this->layout)->render($data);
	}
}