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

use HighlandVision\KR\Framework\KrMethods;
use InvalidArgumentException;
use Joomla\CMS\Form\Field\ListField;
use Joomla\CMS\HTML\HTMLHelper;

use function array_merge;
use function ksort;

/**
 * Supports a value from an external table
 *
 * @since 1.0.0
 */
class ListtriggeractualField extends ListField
{
	/** @var string $type The form field type. */
	public $type = 'Listtriggeractual';

	/**
	 * Values for trigger actual select
	 *
	 * @since  1.0.0
	 * @return array
	 */
	public static function getValues(): array
	{
		$options                       = [];
		$options['BOOKENQUIRY']        = 'BOOKENQUIRY (Email Enquiry Request)';
		$options['BOOK']               = 'BOOK (Provisional Deposit Request)';
		$options['BOOKCONFIRM']        = 'BOOKCONFIRM (Reservation Confirmed)';
		$options['BOOKREQUEST']        = 'BOOKREQUEST (Request Acknowledgement)';
		$options['BOOKREQUESTCONFIRM'] = 'BOOKREQUESTCONFIRM (Request Confirmed Deposit Paid)';
		//		$options['BOOKREQUESTNODEP']         = 'BOOKREQUESTNODEP (Request Cancelled No Deposit)';
		$options['BOOKCANCEL']               = 'BOOKCANCEL (Reservation Cancelled Manual)';
		$options['BOOKCANCELNODEP']          = 'BOOKCANCELNODEP (Reservation Auto Cancelled No Deposit)';
		$options['BOOKAUTHENTICATE']         = 'BOOKAUTHENTICATE (SCA Authentication Required for Payment)';
		$options['BOOKREQUESTCANCEL']        = 'BOOKREQUESTCANCEL (Request Cancelled Owner Declined)';
		$options['BOOKREQUESTCANCELEXPIRED'] = 'BOOKREQUESTCANCELEXPIRED (Request Cancelled No Owner Response)';
			$options['GUESTENQUIRY'] = 'GUESTENQUIRY (Guest Enquiry)';
		$options['MANUALBOOK']         = 'MANUALBOOK (Manual Guest Update)';
		$options['MANUALBOOKOWNER']    = 'MANUALBOOKOWNER (Manual Owner Update)';
		$options['CUSTOMBYDATE']       = 'CUSTOMBYDATE (Custom Emails by Date and Status)';
		$options['PAYINIT']            = 'PAYINIT (Manual Payment Gateway Request)';
		$options['PAYRECEIPT']         = 'PAYRECEIPT (Payment Receipt Confirmation)';
		$options['GUESTARRIVALREMIND'] = 'GUESTARRIVALREMIND (Guest Arrival Details Reminder)';
		$options['GUESTARRIVALOWNER']  = 'GUESTARRIVALOWNER (Guest Arrival Details to Owner)';
		$options['REVIEWREQUEST']      = 'REVIEWREQUEST (Review Request)';
		$options['REVIEWREMINDER']     = 'REVIEWREMINDER (Review Reminder)';

		if (KrMethods::getParams()->get('create_user', 0)) {
			$options['USERREGISTRATION'] = 'USERREGISTRATION (Send User Registration)';
		}

		ksort($options);

		return $options;
	}

	/**
	 * Get the field options.
	 *
	 * @throws InvalidArgumentException
	 * @since  1.0.0
	 * @return array    The field input markup.
	 */
	protected function getOptions(): array
	{
		$options = [];

		$values = self::getValues();
		foreach ($values as $k => $v)
		{
			$options[] = HTMLHelper::_('select.option', $k, $v);
		}

		return array_merge(parent::getOptions(), $options);
	}
}