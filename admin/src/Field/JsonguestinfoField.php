<?php
/**
 * @package    Know Reservations
 * @subpackage Admin Models
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file LICENSE.txt for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

/** @noinspection PhpUnused */

namespace HighlandVision\Component\Knowres\Administrator\Field;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Framework\KrFactory;
use Joomla\CMS\Form\FormField;

/**
 * Display the guest data arrival info
 *
 * @since 1.0.0
 */
class JsonguestinfoField extends FormField
{
	/**
	 * Get the field input.
	 *
	 * @throws Exception
	 * @since  1.6
	 * @return string
	 */
	public function getInput(): string
	{
		$this->type = 'Jsonguestinfo';
		$group      = 'guestinfo';

		$data           = [];
		$data['form']   = KrFactory::getAdhocForm('json-guestinfo', 'json_guestinfo.xml', 'administrator', null);
		$data['values'] = $this->setValues();
		$data['group']  = $group;

		$renderer = $this->getRenderer($this->layout);

		return $renderer->render($data);
	}

	/**
	 * Set up form default values
	 *
	 * @throws Exception
	 * @since  3.3.0
	 * @return array
	 */
	protected function setValues(): array
	{
		$contract_id = $this->form->getValue('contract_id');
		$contract    = KrFactory::getAdminModel('contract')->getItem($contract_id);
		$property    = KrFactory::getAdminModel('property')->getItem($contract->property_id);
		$maxguests   = $contract->guests + $property->sleeps_infant_max;

		$firstname     = '';
		$surname1      = '';
		$document_type = '';
		$document_id   = '';
		if (!empty($contract->guest_id))
		{
			$guest         = KrFactory::getAdminModel('guest')->getItem($contract->guest_id);
			$firstname     = $guest->firstname;
			$surname1      = $guest->surname;
			$document_type = $guest->document_type;
			$document_id   = $guest->document_id;
		}

		$values = [];
		$count  = 0;

		foreach ($this->value as $d)
		{
			$tmp                   = [];
			$tmp['name']           = $d->name;
			$tmp['surname1']       = $d->surname1;
			$tmp['surname2']       = $d->surname2;
			$tmp['sex']            = $d->sex;
			$tmp['dob']            = $d->dob;
			$tmp['document_nat']   = (int) $d->document_nat;
			$tmp['document_type']  = (int) $d->document_type;
			$tmp['document_id']    = $d->document_id;
			$tmp['document_issue'] = $d->document_issue;

			$values[$count] = $tmp;
			$count++;
		}

		while ($count < $maxguests)
		{
			$tmp                   = [];
			$tmp['name']           = !$count ? $firstname : '';
			$tmp['surname1']       = !$count ? $surname1 : '';
			$tmp['surname2']       = '';
			$tmp['sex']            = '';
			$tmp['dob']            = '';
			$tmp['document_nat']   = 0;
			$tmp['document_type']  = !$count ? $document_type : 0;
			$tmp['document_id']    = !$count ? $document_id : '';
			$tmp['document_issue'] = '';

			$values[$count] = $tmp;
			$count++;
		}

		return $values;
	}
}