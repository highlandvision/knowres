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
use HighlandVision\KR\Service\Channel\Ru;
use HighlandVision\KR\TickTock;
use HighlandVision\KR\Utility;
use JetBrains\PhpStorm\NoReturn;
use SimpleXMLElement;
use stdClass;

use function count;
use function jexit;
use function trim;

/**
 * RU Sync channel
 *
 * @since 3.3.1
 */
class Sync extends Ru
{
	/** @var array Local contracts */
	protected array $contracts = [];

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
	 * Reconcile availability for all RU properties.
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	public function doSync()
	{
		$rows = KrFactory::getListModel('servicexrefs')->getPropertiesForService($this->service_id);
		foreach ($rows as $p)
		{
			$this->properties[]           = $p->property_id;
			$this->xrefs[$p->foreign_key] = $p->property_id;
		}

		$this->clearQueue();
		$this->sendAvailability();

		try
		{
			$this->readContracts();
			$this->syncReservations();
			$this->messages[] = 'Sync completed successfully';
			$this->addLog(true);
		}
		catch (Exception $e)
		{
			$this->messages[] = $e->getMessage();
			$this->addLog(false);
		}

		jexit();
	}

	/**
	 * Process any outstanding queue rows.
	 *
	 * @throws Exception
	 * @since  3.3.1
	 */
	private function clearQueue()
	{
		$queue = KrFactory::getListModel('servicequeues')->getQueueByServiceMethod($this->service_id);
		if (is_countable($queue) && count($queue))
		{
			$availability = new Ru\Availability($this->test);
			$availability->processQueue($queue);
		}
	}

	/**
	 * Renove CC details from xml for logging
	 *
	 * @param   SimpleXMLElement  $xml  Reservations to sync
	 *
	 * @since  3.3.1
	 */
	private function removeCCDetails(SimpleXMLElement $xml)
	{
		$tmp = $xml;
		foreach ($tmp->Reservations->Reservation as $Reservation)
		{
			if (isset($Reservation->CreditCard))
			{
				unset($Reservation->CreditCard);
			}
		}

		$this->response = $tmp->asXML();
	}

	/**
	 * Request reservations from channel.
	 *
	 * @throws Exception
	 * @since  3.3.1
	 */
	private function pullChannelContracts()
	{
		if ($this->test)
		{
			$this->method   = 'TEST Pull_ListReservations_RQ';
			$this->response = $this->zzTestReservations();
			$xml            = new SimpleXMLElement($this->response);
		}
		else
		{
			$date_to   = TickTock::getTS();
			$date_from = $this->parameters->reservation_ts === '0000-00-00 00:00:00'
				? TickTock::modifyDays($date_to, 1, '-') : (string) $this->parameters->reservation_ts;
			$xml       = $this->pullReservations($date_from, $date_to);
		}

		$this->removeCCDetails($xml);
	}

	/**
	 * Attempt to match a local and foreign contract
	 *
	 * @param   SimpleXmlElement  $Reservation  Reservation details from channel
	 * @param   int               $cancelled    Cancelled indicater
	 * @param   array             $foreign      Foreign data
	 *
	 * @throws Exception
	 * @throws Exception
	 * @since  3.3.1
	 * @return void
	 */
	private function matchReservation(SimpleXmlElement $Reservation, int $cancelled, array $foreign): void
	{
		foreach ($this->contracts as $k => $local)
		{
			if ((int) $local['foreign_key'] == $foreign['id'] && (int) $local['property_id'] == $foreign['property_id']
				&& $local['arrival'] == $foreign['arrival']
				&& $local['departure'] == $foreign['departure'])
			{
				if ($cancelled == $local['cancelled'])
				{
					if (!$cancelled & $foreign['status'] == 3)
					{
						// Amend local
						$Bookings = new Bookings($this->test);
						$Bookings->processReservation($Reservation, $contract->id);
						$this->messages[] = 'Reservation ' . $local['tag'] . ' amended';
					}
				}
				else if ($cancelled)
				{
					// Cancel Local
					$Bookings = new Bookings($this->test);
					$Bookings->cancelReservation($local['id']);
					$this->messages[] = 'Reservation ' . $local['tag'] . ' was cancelled successfully';
				}
				else
				{
					// Cancel foreign
					$Bookings = new Bookings($this->test);
					$Bookings->pushCancel($foreign['id']);
					$this->messages[] = 'Reservation ' . $local['tag'] . ' was cancelled successfully in RU';
				}

				$this->messages[] = 'Reservation ' . $local['tag'] . ' was synced successfully with RU';
				unset($this->contracts[$k]);

				return;
			}
		}

		$this->messages[] = 'RU reservation reference ' . $foreign['id'] . ' for property ' . $foreign['property_id']
			. ' did not sync with a reservation on your site';
	}

	/**
	 * Pull all current reservations from RU
	 *
	 * @param   string  $DateFrom  Arrival date
	 * @param   string  $DateTo    Departure date
	 *
	 * @throws Exception
	 * @since  1.0.0
	 * @return SimpleXmlElement
	 */
	private function pullReservations(string $DateFrom, string $DateTo): SimpleXmlElement
	{
		$xml = new SimpleXMLElement('<Pull_ListReservations_RQ></Pull_ListReservations_RQ>');

		$authenticationXml = $xml->addChild('Authentication');
		$authenticationXml->addChild('UserName', $this->parameters->username);
		$authenticationXml->addChild('Password', $this->parameters->password);

		$xml->addChild('DateFrom', $DateFrom);
		$xml->addChild('DateTo', $DateTo);
		$xml->addChild('LocationID', '0');

		$dom                                    = dom_import_simplexml($xml);
		$dom->ownerDocument->preserveWhiteSpace = false;
		$dom->ownerDocument->formatOutput       = true;

		$this->method  = 'Pull_ListReservations_RQ';
		$this->request = $dom->ownerDocument->saveXML($dom->ownerDocument->documentElement);

		return $this->sendCurlRequest();
	}

	/**
	 * Read contracts
	 *
	 * @throws Exception
	 * @since  3.3.1
	 */
	private function readContracts()
	{
		$rows = KrFactory::getListModel('contracts')->getContractsByProperty($this->properties, $this->service_id);
		foreach ($rows as $c)
		{
			$this->contracts[] = [
				'id'          => $c->id,
				'tag'         => $c->tag,
				'property_id' => $c->property_id,
				'arrival'     => $c->arrival,
				'departure'   => $c->departure,
				'foreign_key' => $c->foreign_key,
				'cancelled'   => $c->cancelled
			];
		}
	}

	/**
	 * Send availability for all properties
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	private function sendAvailability()
	{
		$Availability = new Ru\Availability($this->test);
		$Availability->sendForProperties($this->properties, array_flip($this->xrefs));
	}

	/**
	 * Update the difference timestamp
	 *
	 * @param   string  $date_to  Processed date
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	private function updateTS(string $date_to)
	{
		$parameters                       = [];
		$this->parameters->reservation_ts = $date_to;

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

	/**
	 * Validate and format data for matching
	 *
	 * @throws Exception
	 * @since  2.0.0
	 */
	#[NoReturn] protected function syncReservations()
	{
		$this->pullChannelContracts();

		$simple = new SimpleXMLElement($this->response);
		foreach ($simple->Reservations->Reservation as $Reservation)
		{
			$this->syncReservation($Reservation);
		}

		if (count($this->contracts))
		{
			foreach ($this->contracts as $k => $a)
			{
				$this->messages   = [];
				$this->messages[] = 'No matching Rental United reservation for Contract Id = ' . $k;
				$this->addLog(false);
			}
		}

		if (!$this->test)
		{
			$this->updateTS($date_to);
		}

		jexit();
	}

	/**
	 * Sync one reservation
	 *
	 * @param   SimpleXMLElement  $Reservation  Reservation data for one foreign reservation
	 *
	 * @throws Exception
	 * @since  3.3.1
	 */
	private function syncReservation(SimpleXMLElement $Reservation)
	{
		foreach ($Reservation->StayInfos->StayInfo as $StayInfo)
		{
			if ((string) $StayInfo->DateTo <= $this->today)
			{
				continue;
			}

			$data                     = [];
			$data['foreign_property'] = trim((string) $StayInfo->PropertyID);
			$data['property_id']      = $this->xrefs[$data['foreign_property']];
			$data['id']               = (string) $Reservation->ReservationID;
			$data['arrival']          = (string) $StayInfo->DateFrom;
			$data['departure']        = (string) $StayInfo->DateTo;
			$data['status']           = (int) $Reservation->StatusID;

			$cancelled = $data['status'] == 1 || $data['status'] == 3 ? 0 : 1;
			$this->matchReservation($Reservation, $cancelled, $data);
		}
	}

	/**
	 * Test code
	 *
	 * @since  1.0.0
	 * @return string
	 */
	private function zzTestReservations(): string
	{
		return '
		<Pull_ListReservations_RS>
		<Status ID="0">Success</Status>
		<Reservations>
			 <Reservation>
			    <ReservationID>20210001</ReservationID>
			    <StatusID>1</StatusID>
			    <LastMod>2021-05-10 12:12:12</LastMod>
			    <StayInfos>
			        <StayInfo>
			            <PropertyID>253204</PropertyID>
			            <DateFrom>2021-10-09</DateFrom>
			            <DateTo>2021-10-16</DateTo>
			            <NumberOfGuests>3</NumberOfGuests>
			            <Costs>
			                <RUPrice>33.33</RUPrice>
			                <ClientPrice>765.65</ClientPrice>
			                <AlreadyPaid>0.00</AlreadyPaid>
			            </Costs>
			            <Comments>This booking is Refundable. No excuses no returns! You should see this in staff comments.</Comments>
			            <Mapping>
			                <ReservationID>20210001</ReservationID>
			                <StayID>R101011</StayID>
			                <HotelID>H101011</HotelID>
			                <RoomID>R101011</RoomID>
			                <RateID>R101011A</RateID>
			            </Mapping>
			        </StayInfo>
			    </StayInfos>
			    <CustomerInfo>
			        <Name>Baldy</Name>
			        <SurName>Bain</SurName>
			        <Email>reservations@northendnairn.co.uk</Email>
			        <Phone>+44 333 333 333</Phone>
			        <SkypeID>test.test</SkypeID>
			        <Address>Address line 1 City: Glasgow</Address>
			        <ZipCode>IV12 4RQ</ZipCode>
			        <CountryID>48</CountryID>
			    </CustomerInfo>
			    <CreditCard>
			        <CCNumber>4242424242424242</CCNumber>
			        <CVC>777</CVC>
			        <NameOnCard>Test Name</NameOnCard>
			        <Expiration>07/2022</Expiration>
			        <BillingAddress>testaddr</BillingAddress>
			        <CardType>VISA</CardType>
			        <Comments>card comments</Comments>
			    </CreditCard>
			    <Comments>This is the guest note. Can you see me?</Comments>
			    <Creator>expedia@rentalsunited.com</Creator>
			</Reservation>>
			 <Reservation>
			    <ReservationID>98765432</ReservationID>
			    <StatusID>1</StatusID>
			    <LastMod>2021-05-10 12:12:12</LastMod>
			    <StayInfos>
			        <StayInfo>
			            <PropertyID>253204</PropertyID>
			            <DateFrom>2021-06-17</DateFrom>
			            <DateTo>2021-06-22</DateTo>
			            <NumberOfGuests>3</NumberOfGuests>
			            <Costs>
			                <RUPrice>33.33</RUPrice>
			                <ClientPrice>555.55</ClientPrice>
			                <AlreadyPaid>0.00</AlreadyPaid>
			            </Costs>
			            <Comments>This booking is Refundable. No excuses no returns! You should see this in staff comments.</Comments>
			            <Mapping>
			                <ReservationID>20210001</ReservationID>
			                <StayID>R101011</StayID>
			                <HotelID>H101011</HotelID>
			                <RoomID>R101011</RoomID>
			                <RateID>R101011A</RateID>
			            </Mapping>
			        </StayInfo>
			    </StayInfos>
			    <CustomerInfo>
			        <Name>Baldy</Name>
			        <SurName>Bain</SurName>
			        <Email>reservations@northendnairn.co.uk</Email>
			        <Phone>+44 333 333 333</Phone>
			        <SkypeID>test.test</SkypeID>
			        <Address>Address line 1 City: Glasgow</Address>
			        <ZipCode>IV12 4RQ</ZipCode>
			        <CountryID>48</CountryID>
			    </CustomerInfo>
			    <CreditCard>
			        <CCNumber>4242424242424242</CCNumber>
			        <CVC>777</CVC>
			        <NameOnCard>Test Name</NameOnCard>
			        <Expiration>07/2022</Expiration>
			        <BillingAddress>testaddr</BillingAddress>
			        <CardType>VISA</CardType>
			        <Comments>card comments</Comments>
			    </CreditCard>
			    <Comments>This is the guest note. Can you see me?</Comments>
			    <Creator>expedia@rentalsunited.com</Creator>
			</Reservation>>
		</Reservations>
</Pull_ListReservations_RS>';
	}
}