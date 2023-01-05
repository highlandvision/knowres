<?php
/**
 * @package     KR
 * @subpackage  Library
 * @copyright   Copyright (c) 2020, Highland Vision. All rights reserved.
 * @license     See the file LICENSE.txt for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\KR\Service\Channel\Ru;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Hub;
use HighlandVision\KR\Service\Channel\Ru;
use HighlandVision\KR\Session as KrSession;
use HighlandVision\KR\TickTock;
use HighlandVision\KR\Utility;
use InvalidArgumentException;
use RuntimeException;
use SimpleXMLElement;
use stdClass;
use Throwable;

use function count;
use function implode;
use function is_countable;
use function simplexml_load_string;
use function str_contains;
use function strpos;
use function substr;
use function trim;

/**
 * Service channel for bookings
 *
 * @since 1.0.0
 */
class Bookings extends Ru
{
	/**
	 * Constructor.
	 *
	 * @param   int  $test  1 for testing
	 *
	 * @throws Exception
	 * @since  2.2.0
	 */
	public function __construct(int $test = 0)
	{
		parent::__construct($test);
	}

	/**
	 * Cancel a reservation
	 *
	 * @param  ?string  $id  Foreign ID for cancellation
	 *
	 * @throws Exception
	 * @since  3.4.0
	 */
	public function cancelReservation(?string $id)
	{
		if (empty($id))
		{
			throw new RuntimeException(KrMethods::plain('Cancellation foreign reservation ID not is empty'));
		}

		$this->foreign_booking = $id;
		$contracts             = $this->getContractByForeignKey();
		if (!is_countable($contracts) || !count($contracts))
		{
			throw new RuntimeException(KrMethods::plain('Contract not found for cancellation for foreign key ' . $id));
		}

		if (count($contracts) > 1)
		{
			throw new RuntimeException(KrMethods::plain('LNM cancellation multiple contracts found for foreign key '
				. $id));
		}

		if (!$this->processCancelled($contractes[0]))
		{
			$message = 'Failure to cancel contract for foreign id ' . $id;
			if (is_countable($this->Hub->errors) && count($this->Hub->errors))
			{
				$message .= implode(',', $this->Hub->errors);
			}

			throw new Exception($message);
		}

		$contractSession->resetData();
		KrMethods::cleanCache('com_knowres_contracts');
	}

	/**
	 * Process LNM - Rentals United Live Notification Mechanism
	 * for new reservations and cancellations
	 *
	 * @param   string            $xmlstring  The xml string received
	 * @param   SimpleXMLElement  $xml        LNM data
	 *
	 * @throws Exception
	 * @since  1.0.0
	 * @return void
	 */
	public function doLNM(string $xmlstring, SimpleXMLElement $xml): void
	{
		$this->request = $xmlstring;
		if (isset($xml->Reservation->CreditCard))
		{
			$xmltmp = simplexml_load_string($this->request);
			unset($xmltmp->Reservation->CreditCard);
			$this->request = $xmltmp->asXML();
		}

		$this->response = 'Response not required for LNM';
		$this->method   = $xml->getName();

		try
		{
			$this->processLNM($xml);
		}
		catch (Throwable $e)
		{
			$this->sendNokBookingResponse($e->getMessage());
		}
	}

	/**
	 * Enable LNM notifications
	 *
	 * @throws Exception
	 * @since        3.1.0
	 */
	public function enableLNM()
	{
		$xml = new SimpleXMLElement('<LNM_PutHandlerUrl_RQ></LNM_PutHandlerUrl_RQ>');

		$authenticationXml = $xml->addChild('Authentication');
		$authenticationXml->addChild('UserName', $this->parameters->username);
		$authenticationXml->addChild('Password', $this->parameters->password);

		$url = KrMethods::getRoot() . 'index.php?option=com_knowres&task=service.rulnmhandler&secret='
			. KrMethods::getCfg('secret');
		$xml->addChild('HandlerUrl', htmlspecialchars($url));

		$dom                                    = dom_import_simplexml($xml);
		$dom->ownerDocument->preserveWhiteSpace = false;
		$dom->ownerDocument->formatOutput       = true;

		$this->method  = 'LNM_PutHandlerUrl_RQ';
		$this->request = $dom->ownerDocument->saveXML($dom->ownerDocument->documentElement);

		$simple = $this->sendCurlRequest();
		$hash   = (string) $simple->Hash;
		if ($hash)
		{
			$parameters                  = [];
			$this->parameters->apassword = $hash;
			foreach ($this->parameters as $k => $v)
			{
				$parameters[$k] = $v;
			}

			$update             = new stdClass();
			$update->id         = $this->service_id;
			$update->parameters = Utility::encodeJson($parameters);
			$update->updated_at = TickTock::getTS();
			KrFactory::update('service', $update);
		}
	}

	/**
	 * Pull agents
	 *
	 * @param   bool  $refresh  Set to true to refresh the data regardless of cache
	 *
	 * @throws Exception
	 * @since  1.0.0
	 * @return mixed
	 */
	public function pullAgents(bool $refresh = false): mixed
	{
		$data = false;
		if (!$refresh)
		{
			$data = $this->checkCache('Pull_GetAgents_RQ');
		}

		if (empty($data))
		{
			$xml = new SimpleXMLElement('<Pull_GetAgents_RQ></Pull_GetAgents_RQ>');

			$authenticationXml = $xml->addChild('Authentication');
			$authenticationXml->addChild('UserName', $this->parameters->username);
			$authenticationXml->addChild('Password', $this->parameters->password);

			$dom                                    = dom_import_simplexml($xml);
			$dom->ownerDocument->preserveWhiteSpace = false;
			$dom->ownerDocument->formatOutput       = true;

			$this->method  = 'Pull_GetAgents_RQ';
			$this->request = $dom->ownerDocument->saveXML($dom->ownerDocument->documentElement);

			$simple = $this->sendCurlRequest();
			$data   = [];
			foreach ($simple->Agents->Agent as $agent)
			{
				$a                = [];
				$a['ID']          = (string) $agent->AgentID;
				$a['Username']    = (string) $agent->UserName;
				$a['CompanyName'] = (string) $agent->CompanyName;
				$a['FirstName']   = (string) $agent->FirstName;
				$a['SurName']     = (string) $agent->SurName;
				$a['Email']       = (string) $agent->Email;
				$a['Telephone']   = (string) $agent->Telephone;

				$data[] = $a;
			}

			$this->storeCache($data, 'Pull_GetAgents_RQ');
		}

		return $data;
	}

	/**
	 * Push reservation cancellation request
	 *
	 * @param   string  $foreign_key  Foreign key for contract
	 *
	 * @throws Exception
	 * @since  2.3.0
	 * @return SimpleXMLElement
	 */
	public function pushCancel(string $foreign_key): SimpleXMLElement
	{
		$xml = new SimpleXMLElement('<Push_CancelReservation_RQ></Push_CancelReservation_RQ>');
		$xml = $this->addAuthentication($xml);
		$xml->addChild('ReservationID', $foreign_key);

		return $this->sendXml($xml, 'Push_CancelReservation_RQ');
	}

	/**
	 * Process the new reservation from LNM or Sync
	 *
	 * @param   SimpleXMLElement  $Reservation  Foreign reservation data
	 * @param   int               $edit_id      ID of contract for edit
	 *
	 * @throws Exception
	 * @since  3.4.0
	 */
	public function processReservation(SimpleXMLElement $Reservation, int $edit_id = 0)
	{
		$contractSession    = new KrSession\Contract();
		$this->contractData = $contractSession->resetData();
		$guestSession       = new KrSession\Guest();
		$this->guestData    = $guestSession->resetData();

		if ($edit_id)
		{
			$item = KrFactory::getAdminModel('contract')->getItem($edit_id);
			if (empty($item->id))
			{
				throw new RuntimeException('Contract not found for LNM edit with ID ' . $edit_id);
			}
			$this->contractData = $contractSession->updateData($item);
		}

		$this->setRequired($Reservation);
		$this->setAgentData($Reservation);
		$this->setGuestData($Reservation->CustomerInfo);
		$this->Hub->setValue('guest_note', (string) $Reservation->Comments);
		$this->Hub->setValue('foreign_key', (string) $Reservation->ReservationID);

		if (!$this->saveContract())
		{
			$message = 'Error in ProcessReservation';
			if (is_countable($this->Hub->errors) && count($this->Hub->errors))
			{
				$message .= implode(',', $this->Hub->errors);
			}

			throw new RunTimeException($message);
		}
	}

	/**
	 * Convert Rentals United address to address line and city
	 * The format is a string containing '<address line> <City: city>'
	 * If no address line City: will be at the start
	 * If no City then the string will be 'City: .'
	 *
	 * @param   string  $address  Address line provided by channel
	 *
	 * @since  1.0.0
	 * @return array
	 */
	protected function convertAddress(string $address): array
	{
		$address = trim($address);
		$line    = '';

		$offset = strpos($address, 'City:');
		if ($offset == 0)
		{
			$city = trim(substr($address, 6));
		}
		else
		{
			$line = trim(substr($address, 0, $offset));
			$city = trim(substr($address, $offset + 6));
		}

		$city = $city !== '.' ? $city : '';

		return [$line,
		        $city];
	}

	/**
	 * Convert RU phone number to country / number
	 *
	 * @param   string  $phone  Phone number returned by channel
	 *
	 * @since 1.0.0
	 * @return array
	 */
	protected function convertPhone(string $phone): array
	{
		$phone = trim($phone);
		$first = substr($phone, 0, 1);

		if ($first == '+')
		{
			$parts     = explode(' ', substr($phone, 1), 2);
			$dial_code = $parts[0];
			if (strlen($dial_code) < 4)
			{
				$countries = KrFactory::getListModel('countries')->getAll(0, $dial_code);
				if (is_countable($countries))
				{
					foreach ($countries as $c)
					{
						return [$c->id,
						        str_replace(' ', '', $parts[1])];
					}
				}
			}
		}

		return [0, $phone];
	}

	/**
	 * Get the property for the reservation
	 *
	 * @param   string  $foreign_key  Foreign property ID
	 *
	 * @throws Exception
	 * @since  3.4.0
	 */
	protected function getProperty(string $foreign_key): int
	{
		$property_id = KrFactory::getListModel('servicexrefs')->getPropertyForService($this->service_id,
			$foreign_key);

		if (!$property_id)
		{
			throw new Exception(KrMethods::sprintf('COM_KNOWRES_SERVICE_LOG_MSG9', $foreign_key));
		}

		return $property_id;
	}

	/**
	 * Process cancellation received from channel
	 *
	 * @param   object  $item  Contract to be cancelled
	 *
	 * @throws Exception
	 * @since  1.2.2
	 * @return bool
	 */
	public function processCancelled(object $item): bool
	{
		$contractSession = new KrSession\Contract();
		$contractData    = $contractSession->updateData($item);
		$this->Hub       = new Hub($contractData);

		$actions = ['cancel',
		            'servicequeue',
		            'emails'];

		return $this->Hub->action($actions);
	}

	/**
	 * Process LNM request
	 *
	 * @param   SimpleXMLElement  $xml  LNM data
	 *
	 * @throws Exception
	 * @since  3.3.4
	 */
	protected function processLNM(SimpleXmlElement $xml)
	{
		if ($this->parameters->username !== (string) $xml->Authentication->UserName
			|| $this->parameters->apassword !== (string) $xml->Authentication->Password)
		{
			throw new RuntimeException('No matching username ' . $xml->Authentication->UserName . ' or password '
				. $xml->Authentication->Password);
		}

		if ($this->method == 'LNM_CancelReservation_RQ')
		{
			$this->cancelReservation((string) $xml->ReservationID);
		}
		else if ($this->method == 'LNM_PutConfirmedReservation_RQ')
		{
			$this->processReservation($xml->Reservation);
		}
		else
		{
			throw new RuntimeException("Invalid method of $this->method received for bookings");
		}
	}

	/**
	 * Set agent data
	 *
	 * @param   SimpleXMLElement  $Reservation  LNM xml
	 *
	 * @throws RuntimeException
	 * @throws InvalidArgumentException
	 * @throws Exception
	 * @since  3.4.0
	 */
	protected function setAgentData(SimpleXmlElement $Reservation)
	{
		$confirmed = false;
		if (isset($Reservation->Comments))
		{
			$comments = (string) $Reservation->Comments;
			if (str_contains($comments, 'Expedia Virtual Card'))
			{
				$confirmed = true;
			}
		}

		$this->setAgent((string) $Reservation->Creator, 0, $confirmed);
		$this->setAirBnBAnomally($Reservation->StayInfos->StayInfo);
		$this->Hub->setAgent($this->agent);
		$this->Hub->setValue('agent_id', $this->agent->id);
		$this->Hub->setValue('agent_deposit_paid', $this->agent->deposit_paid);
		$this->Hub->setValue('service_id', $this->service_id);

		$this->form = [];
		foreach ($Reservation->StayInfos->StayInfo as $s)
		{
			$this->Hub->setValue('agent_deposit', (float) $s->Costs->AlreadyPaid);
			$this->Hub->setValue('agent_nonrefundable', $this->setNonRefundable((string) $s->Comments));
			$this->Hub->setValue('agent_reference', (string) $s->Mapping->ReservationID);
			$this->Hub->setValue('agent_value', (float) $s->ReservationBreakdown->RUBreakdown->Total);
			$this->Hub->setValue('agent_commission', (float) $s->ReservationBreakdown->ChannelCommission);
			$this->Hub->setValue('channel_commission', 0);

			$deposit                       = (float) $s->Costs->AlreadyPaid
				- (float) $s->ReservationBreakdown->ChannelCommission;
			$this->form['agent_deposit']   = $deposit < 0 ? 0.0 : $deposit;
			$this->form['agent_value']     = (float) $s->ReservationBreakdown->RUBreakdown->Total;
			$this->form['agent_reference'] = (string) $s->Mapping->ReservationID;
			$this->form['arrival']         = (string) $s->DateFrom;
			$this->form['departure']       = (string) $s->DateTo;
			$this->form['guests']          = (int) $s->NumberOfGuests;
			$this->form['guest_id']        = 0;
			$this->form['guest_note']      = (string) $Reservation->Comments;
			$this->form['id']              = $this->contract_id;
			$this->form['nonrefundable']   = $this->setNonRefundable((string) $s->Comments);
			$this->form['room_total']      = (float) $s->ReservationBreakdown->RUBreakdown->Rent;
			$this->form['service_id']      = $this->service_id;

			break;
		}

		//		$fees = [];
		//		foreach ($Reservation->StayInfos->StayInfo->ReservationBreakdown->RUBreakDown->TotalFeesTaxes as $f)
		//		{
		//			$fees[(int) $f->FeeTaxType]['amount'] = (float) $f->Amount;
		//			$fees[(int) $f->FeeTaxType]['name']   = (string) $f->Name;
		//		}
	}

	/**
	 * Set silly AirBnb tourist tax sometimes charged and sometimes not
	 *
	 * @param   SimpleXMLElement  $StayInfo  Stayinfo data
	 *
	 * @since 4.0.0
	 */
	protected function setAirBnBAnomally(SimpleXMLElement $StayInfo)
	{
		if ($this->agent->foreign_key == 'airbnb@rentalsunited.com')
		{
			$cb_tfts = $StayInfo->ReservationBreakdown->ChannelBreakdown->ChannelTotalFeesTaxes;
			foreach ($cb_tfts as $tfts)
			{
				foreach ($tfts as $tft)
				{
					$tfta = $this->setAttributes($tft);
					if (isset($tfta['ItemType']) && isset($tfta['Amount']) && isset($tfta['Name'])
						&& $tfta['ItemType'] == 'Tax'
						&& (float) $tfta['Amount'] > 0
						&& str_contains($tfta['Name'], 'Tourist Tax'))
					{
						$this->agent->tax1_excluded = 0;
					}
				}
			}
		}
	}

	/**
	 * Set guest details
	 *
	 * @param   SimpleXMLElement  $CustomerInfo  Guest data
	 *
	 * @throws RuntimeException
	 * @throws Exception
	 * @since  3.4.0
	 */
	protected function setGuestData(SimpleXMLElement $CustomerInfo)
	{
		$this->Hub->setData($this->guestData, 'guestData');
		$this->Hub->setValue('firstname', (string) $CustomerInfo->Name, 'guestData');
		$this->Hub->setValue('surname', (string) $CustomerInfo->SurName, 'guestData');
		$this->Hub->setValue('email', (string) $CustomerInfo->Email, 'guestData');
		$this->Hub->setValue('user_id', 0, 'guestData');

		if (isset($CustomerInfo->Address))
		{
			list($address, $town) = $this->convertAddress((string) $CustomerInfo->Address);
			$this->Hub->setValue('address1', $address, 'guestData');
			$this->Hub->setValue('town', $town, 'guestData');
		}

		if (isset($CustomerInfo->ZipCode))
		{
			$this->Hub->setValue('postcode', (string) $CustomerInfo->ZipCode, 'guestData');
		}

		if (isset($CustomerInfo->CountryID))
		{
			$this->Hub->setValue('country_id', $this->convertCountry((int) $CustomerInfo->CountryID), 'guestData');
		}

		if (isset($CustomerInfo->Phone))
		{
			$parts = $this->convertPhone((string) $CustomerInfo->Phone);
			$this->Hub->setValue('mobile_country_id', (string) $parts[0], 'guestData');
			$this->Hub->setValue('mobile', (string) $parts[1], 'guestData');
		}
	}

	/**
	 * Set the non-refundable flag
	 *
	 * @param   string  $comments  Reseervation comments
	 *
	 * @since  2.3.0
	 * @return bool
	 */
	protected function setNonRefundable(string $comments): bool
	{
		if (str_contains($comments, 'Non Refundable'))
		{
			return true;
		}
		else
		{
			return false;
		}
	}

	/**
	 * Set required fields and validate
	 *
	 * @param   SimpleXmlElement  $Reservation  Reservation data
	 *
	 * @throws Exception
	 * @since  3.4.0
	 */
	protected function setRequired(SimpleXmlElement $Reservation)
	{
		foreach ($Reservation->StayInfos->StayInfo as $s)
		{
			$this->contractData->property_id = $this->getProperty(trim($s->PropertyID));
			$this->contractData->arrival     = (string) $s->DateFrom;
			$this->contractData->departure   = (string) $s->DateTo;
			$this->contractData->guests      = (int) $s->NumberOfGuests;

			if (!KrFactory::getListModel('contracts')->isPropertyAvailable($this->contractData->property_id,
				$this->contractData->arrival, $this->contractData->departure))
			{
				throw new RuntimeException('Property not available for selected dates');
			}
		}

		$this->Hub = new Hub($this->contractData);
	}
}