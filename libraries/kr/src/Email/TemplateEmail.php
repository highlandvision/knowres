<?php
/**
 * @package    Know Reservations
 * @subpackage Library
 * @copyright  Copyright (c) 2020, Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\KR\Email;

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;

use function defined;

/**
 * Email KrMethods
 *
 * @since 1.0.0
 */
class TemplateEmail
{
	/**
	 * Return the available registration tags for the emails
	 *
	 * @since  1.0.0
	 * @return array
	 */
	public static function getRegistrationTags(): array
	{
		$tags                    = [];
		$tags['AGENCYEMAIL']     = 'Agency Email';
		$tags['AGENCYNAME']      = 'Agency Name';
		$tags['AGENCYTELEPHONE'] = 'Agency Telephone';
		$tags['TODAY']           = 'Date Today';
		$tags['REGPASSWORD']     = 'Password';
		$tags['REGNAME']         = 'Registration Name';
		$tags['SITENAME']        = 'Site Name';
		$tags['REGUSERNAME']     = 'Username';

		asort($tags);

		return $tags;
	}

	/**
	 * Return the available enquiry tags for the emails
	 *
	 * @since 1.0.0
	 * @return array
	 */
	public static function getRequestTags(): array
	{
		$tags                    = [];
		$tags['REQNAME']         = 'Requester Name';
		$tags['REQEMAIL']        = 'Requester Email';
		$tags['REQCOUNTRY']      = 'Requester Country';
		$tags['REQPHONE']        = 'Requester Phone';
		$tags['REQMESSAGE']      = 'Requester Message';
		$tags['PROPERTYNAME']    = 'Required Property';
		$tags['LOCATION']        = 'Required Location';
		$tags['ARRIVAL']         = 'Arrival Date';
		$tags['#NIGHTS']         = 'Number of Nights';
		$tags['#ADULTS']         = 'Number of Adults';
		$tags['#CHILDREN']       = 'Number of Children';
		$tags['CHILDAGES']       = 'Child Ages';
		$tags['MANAGERNAME']     = 'Manager Name';
		$tags['MANAGEREMAIL']    = 'Manager Email';
		$tags['AGENCYNAME']      = 'Agency Name';
		$tags['AGENCYTELEPHONE'] = 'Agency Telephone';
		$tags['SITENAME']        = 'Site Name';
		$tags['BUDGET']          = 'Budget';

		asort($tags);

		return $tags;
	}

	/**
	 * Return the available contract tags for the emails
	 *
	 * @since  1.0.0
	 * @return array
	 */
	public static function getReservationTags(): array
	{
		$tags                    = [];
		$tags['AGENCYEMAIL']     = 'Agency Email';
		$tags['AGENCYNAME']      = 'Agency Name';
		$tags['AGENCYTELEPHONE'] = 'Agency Telephone';
		$tags['AGENTNAME']       = 'Booking Agent Name';
		$tags['AGENTTEXT']       = 'Booking Agent Text';
		$tags['ARRIVALDATE']     = 'Date Arrival';
		$tags['BALANCEDATE']     = 'Date Balance Due';
		$tags['BALANCEDAYS']     = '#Balance Days';
		$tags['BOOKINGBALANCE']  = 'Booking Balance';
		$tags['BOOKINGDATE']     = 'Booking Date';
		$tags['BOOKINGDEPOSIT']  = 'Booking Deposit';
		$tags['BOOKINGSTATUS']   = 'Booking Status';
		$tags['BOOKINGTOTAL']    = 'Booking Total';
		$tags['BOOKREQUESTHOLD'] = 'Booking Request Hold Hours';
		$tags['CHECKINTIME']     = 'Property Check-in Time';
		$tags['CHECKOUTTIME']    = 'Property Check-out Time';
		$tags['CONTACTEMAIL']    = 'Property Contact Email';
		$tags['CONTACTNAME']     = 'Property Contact Name';
		$tags['CONTACTPHONE']    = 'Property Contact Phone';
		$tags['DEPARTUREDATE']   = 'Date Departure';
		$tags['EXPIRYDATE']      = 'Date Expiry';
		$tags['EXPIRYDAYS']      = '#Expiry Days';
		$tags['GUESTFIRSTNAME']  = 'Guest First Name';
		$tags['GUESTNAME']       = 'Guest Name';
		$tags['GUESTEMAIL']      = 'Guest Email';
		$tags['GUESTMOBILE']     = 'Guest Mobile';
		$tags['GUESTNOTES']      = 'Guest Notes';
		$tags['GUESTS']          = '#Guests';
		$tags['LINKCARHIRE']     = 'Link to Car Hire affiliate with text - '
			. KrMethods::plain('COM_KNOWRES_HERE');
		$tags['LINKGUESTTERMS']  = 'Link to Guest Terms with text - [sitename] Terms & Conditions';
		if (KrMethods::getParams()->get('create_user', 0))
		{
			$tags['LINKLOGIN'] = 'Link Login';
		}
		$tags['LINKPROPERTY']        = 'Link to Property Details with text - [property name]';
		$tags['LINKOWNERTERMS']      = 'Link to Owner Terms with text - [your agency name]';
		$tags['LINKTRAVELINSURANCE'] = 'Link to Travel Insurance affiliate with text - ' . KrMethods::plain(
				'COM_KNOWRES_HERE');
		$tags['MANAGEREMAIL']        = 'Manager Email';
		$tags['MANAGERNAME']         = 'Manager Name';
		$tags['NEARESTTRANSPORT']    = 'Nearest Transport';
		$tags['NIGHTS']              = '#Booked Nights';
		$tags['OWNERNAME']           = 'Owner Name';
		$tags['OWNERNOTES']          = 'Owner Notes';
		$tags['OWNERTELEPHONE']      = 'Owner Telephone';
		$tags['PAYMENTAMOUNT']       = 'Payment Amount(Requested or Received)';
		$tags['PAYMENTCONFIRMED']    = 'Payments Received (excludes unconfirmed)';
		$tags['PAYMENTTOTAL']        = 'Payments Made (includes unconfirmed)';
		$tags['PLUGIN']              = 'Payment Method';
		$tags['PLUGININSTRUCTIONS']  = 'Payment Method Instructions';
		$tags['PROPERTYAKA']         = 'Property AKA';
		$tags['PROPERTYAREA']        = 'Property Area';
		$tags['PROPERTYCATASTRAL']   = 'Property Official Identifier';
		$tags['PROPERTYCOUNTRY']     = 'Property Country';
		$tags['PROPERTYIMAGE']       = 'Property Image (img tag)';
		$tags['PROPERTYIMAGESRC']    = 'Property Image (src tag)';
		$tags['PROPERTYNAME']        = 'Property Name';
		$tags['PROPERTYPOSTCODE']    = 'Property Post/Zip Code';
		$tags['PROPERTYREGION']      = 'Property Region';
		$tags['PROPERTYSTREET']      = 'Property Street';
		$tags['PROPERTYTOWN']        = 'Property Town';
		$tags['PROPERTYUID']         = 'Property Id';
		$tags['SECURITYAMOUNT']      = 'Property Security Amount';
		$tags['SECURITYTEXT']        = 'Property Security Text';
		$tags['SITENAME']            = 'Site Name';
		$tags['TAG']                 = 'Booking Reference';
		$tags['TODAY']               = 'Date Today';
		$tags['WHEREKEYS']           = 'Property Where to get the keys';

		$tags['BUTTONARRIVAL']   = 'Button for Arrival Details with text - ' . KrMethods::plain(
				'COM_KNOWRES_EMAIL_BUTTONARRIVAL'
			);
		$tags['BUTTONBALANCE']   = 'Button for Balance Payment with text - ' . KrMethods::plain(
				'COM_KNOWRES_EMAIL_BUTTONBALANCE'
			);
		$tags['BUTTONCONFIRM']   = 'Button for Booking Confirm with text - ' . KrMethods::plain(
				'COM_KNOWRES_EMAIL_BUTTONCONFIRM'
			);
		$tags['BUTTONDASHBOARD'] = 'Button for Guest Dashboard with text - ' . KrMethods::plain(
				'COM_KNOWRES_EMAIL_BUTTONDASHBOARD'
			);
		$tags['BUTTONMANAGE']    = 'Button for Manage Booking with text - ' . KrMethods::plain(
				'COM_KNOWRES_EMAIL_BUTTONMANAGE'
			);
		$tags['BUTTONPAYNOW']    = 'Button for Pay Now with text - ' . KrMethods::plain(
				'COM_KNOWRES_EMAIL_BUTTONPAYNOW'
			);
		$tags['BUTTONREVIEW']    = 'Button for Review with text - ' . KrMethods::plain(
				'COM_KNOWRES_EMAIL_BUTTONREVIEW'
			);
		$tags['BUTTONOWNERLINK'] = 'Button for Owner Reservation with text - ' . KrMethods::plain(
				'COM_KNOWRES_EMAIL_BUTTONOWNERLINK'
			);

		if (KrMethods::getParams()->get('property_rooms', 0))
		{
			$tags['BOOKINGGUESTS']     = 'Booking Guests';
			$tags['BOOKINGROOMTYPES']  = 'Booking Room Types';
			$tags['PROPERTYADDRESS']   = 'Property Address (one line)';
			$tags['CANCELLATIONTERMS'] = 'Property Cancellation Terms';
			$tags['CHECKINOUTTIMES']   = 'Property Check-in and out Times (text)';
			$tags['PROPERTYTELEPHONE'] = 'Property Telephone';
		}

		ksort($tags);

		return $tags;
	}
}