<?php
/**
 * @package     Know Reservations
 * @subpackage  Site Controller
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file LICENSE.txt for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

/** @noinspection PhpUnused */

namespace HighlandVision\Component\Knowres\Site\Controller;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Logger;
use HighlandVision\KR\Media\Pdf\Property\Terms;
use HighlandVision\KR\Utility;
use HighlandVision\Vrbo\Manager;
use JetBrains\PhpStorm\NoReturn;
use Joomla\CMS\MVC\Controller\BaseController;
use RuntimeException;

use function count;
use function implode;
use function jexit;
use function serialize;

/**
 * Expedia / Vrbo API Service
 *
 * @since  3.1.0
 */
class HaController extends BaseController
{
	/** @var array Error messages */
	protected array $errors = [];
	/** @var array POST data */
	protected array $fields = [];
	/** @var bool Indicates that test is being run */
	protected bool $test;

	/**
	 * Returns availability request
	 *
	 * @throws Exception
	 * @since  3.3.0
	 */
	#[NoReturn] public function availability(): void
	{
		$test = KrMethods::inputInt('test');
		$id   = KrMethods::inputInt('id');
		$unit = KrMethods::inputString('unit', '');

		$Availability = new Manager\Availability($test);
		$data         = $Availability->availability($id, $unit);

		header("Content-type: text/xml");
		echo $data;

		jexit();
	}

	/**
	 * Booking Service request.
	 *
	 * @throws Exception
	 * @since  3.3.0
	 */
	#[NoReturn] public function br(): void
	{
		$test = KrMethods::inputInt('test');
		if ($test) {
			$xmlstring = $this->zzTestBr();
			$xmlstring = str_replace(array("\r", "\n", "\t"), '', $xmlstring);
			$xml       = simplexml_load_string($xmlstring);
		}
		else if ($_SERVER['REQUEST_METHOD'] === 'POST') {
			$xmlstring = file_get_contents('php://input');
			$xml       = simplexml_load_string($xmlstring);
		}
		else {
			$this->errors[] = 'POST not received';
			foreach ($_SERVER as $key_name => $key_value) {
				$this->errors[] = $key_name . ' = ' . $key_value;
			}

			$this->logError();
		}

		$Bookings = new Manager\Bookings($test);
		$data     = $Bookings->br($xmlstring, $xml->bookingRequestDetails);

		header("Content-type: text/xml;");
		echo $data;

		jexit();
	}

	/**
	 * Request for booking update service
	 *
	 * @throws Exception
	 * @since        3.3.0
	 * @noinspection PhpUnused
	 */
	#[NoReturn] public function bus(): void
	{
		$test = KrMethods::inputInt('test');
		$id   = KrMethods::inputInt('id');

		$bookings = new Manager\Bookings($test);
		$data     = $bookings->bus($id);

		header("Content-type: text/xml");
		echo $data;

		jexit();
	}

	/**
	 * Returns availability request for Fast Availability Service.
	 *
	 * @throws Exception
	 * @since  3.3.0
	 */
	#[NoReturn] public function fas(): void
	{
		$test = KrMethods::inputInt('test');
		if ($test) {
			$json = $this->zzTestFas();
		}
		else if ($_SERVER['REQUEST_METHOD'] === 'POST') {
			$json = file_get_contents('php://input');
		}
		else {
			$this->errors[] = 'POST not received';
			foreach ($_SERVER as $key_name => $key_value) {
				$this->errors[] = $key_name . ' = ' . $key_value;
			}

			$this->logError();
		}

		$Fas  = new Manager\Fas($test);
		$data = $Fas->request($json);

		header('Content-Type: application/json');
		echo Utility::encodeJson($data);

		jexit();
	}

	/**
	 * Return listing index
	 *
	 * @throws Exception
	 * @since  3.3.0
	 */
	#[NoReturn] public function ix(): void
	{
		$test = KrMethods::inputInt('test');
		$type = KrMethods::inputString('type', 'properties');

		if ($type === 'properties') {
			$Properties = new Manager\Properties($test);
			$data       = $Properties->getIx();
		}
		else if ($type === 'lodging') {
			$Lodging = new Manager\Lodging($test);
			$data    = $Lodging->getIx();
		}
		else if ($type === 'rates') {
			$Rates = new Manager\Rates($test);
			$data  = $Rates->getIx();
		}
		else if ($type === 'availability') {
			$Availability = new Manager\Availability($test);
			$data         = $Availability->getIx();
		}
		else if ($type === 'bookings') {
			if ($test) {
				$xmlstring = $this->zzTestBix();
				$xml       = simplexml_load_string($xmlstring);
			}
			else if ($_SERVER['REQUEST_METHOD'] === 'POST') {
				$xmlstring = file_get_contents('php://input');
				$xml       = simplexml_load_string($xmlstring);
			}
			else {
				$this->errors[] = 'POST not received';
				foreach ($_SERVER as $key_name => $key_value) {
					$this->errors[] = $key_name . ' = ' . $key_value;
				}

				$this->logError();
			}

			$bookings = new Manager\Bookings($test);
			$data     = $bookings->getIx($xml);
		}

		if ($data) {
			header("Content-type: text/xml");
			echo $data;
		}

		jexit();
	}

	/**
	 * Returns a lodging request
	 *
	 * @throws Exception
	 * @since        3.3.0
	 * @noinspection PhpUnused
	 */
	#[NoReturn] public function lodging(): void
	{
		$test = KrMethods::inputInt('test');
		$id   = KrMethods::inputInt('id');
		$unit = KrMethods::inputString('unit', '');

		$lodging = new Manager\Lodging($test);
		$data    = $lodging->lodging($id, $unit);

		header("Content-type: text/xml");
		echo $data;

		jexit();
	}

	/**
	 * Return property listing
	 *
	 * @throws Exception
	 * @since  3.3.0
	 */
	#[NoReturn] public function properties(): void
	{
		$test = KrMethods::inputInt('test');
		$id   = KrMethods::inputInt('id');

		$Properties = new Manager\Properties($test);
		$data       = $Properties->listing($id);

		header("Content-type: text/xml");
		echo $data;

		jexit();
	}

	/**
	 * Returns a rate request
	 *
	 * @throws Exception
	 * @since  3.3.0
	 */
	#[NoReturn] public function rates(): void
	{
		$test = KrMethods::inputInt('test');
		$id   = KrMethods::inputInt('id');
		$unit = KrMethods::inputString('unit', '');

		$Rates = new Manager\Rates($test);
		$data  = $Rates->rates($id, $unit);

		header("Content-type: text/xml");
		echo $data;

		jexit();
	}

	/**
	 * Display generic / property terms
	 *
	 * @throws RuntimeException
	 * @throws Exception
	 * @since        3.0
	 * @noinspection PhpUnused
	 */
	#[NoReturn] public function termspdf(): void
	{
		// TODO-v5.1 Remove October 2024 as all calls to ServiceController
		try {
			$id    = KrMethods::inputInt('id');
			$Terms = new Terms('download', $id);
			$Terms->getPdf();
		} catch (Exception) {
			throw new RuntimeException('Error creating PDF, please try again later');
		}

		jexit();
	}

	/**
	 * Log error and exit
	 *
	 * @throws Exception
	 * @since  3.3.0
	 */
	#[NoReturn] protected function logError(): void
	{
		$message = "\r\n\r\n";
		if (!empty($this->errors)) {
			$message .= implode("\r\n", $this->errors);
		}
		else {
			$message = 'No errors logged';
		}

		if (count($this->fields)) {
			$message .= "\r\n" . serialize($this->fields);
		}

		Logger::logMe($message);
		jexit();
	}

	/**
	 * Test ha br service
	 *
	 * @since 3.3.0
	 * @return string
	 */
	private function zzTestBix(): string
	{
		return <<<XML
<?xml version='1.0'?>
<document>
			<bookingContentIndexRequest>
				<documentVersion>1.3</documentVersion>
				<advertiser>
					<assignedId>2598745621</assignedId>
				</advertiser>
				<startDate>2020-11-20T09:10:11Z</startDate>
			</bookingContentIndexRequest>';
</document>
XML;

		//			<bookingContentIndexRequest>
		//				<documentVersion>1.3</documentVersion>
		//				<advertiser>
		//					<assignedId>2598745621</assignedId>
		//					<inquirers>
		//						<inquirer>
		//							<emailAddress>john@northendnairn.co.uk</emailAddress>
		//						</inquirer>
		//					</inquirers>
		//				</advertiser>
		//				<startDate>2019-02-01T00:00:00Z</startDate>
		//			</bookingContentIndexRequest>';
	}

	/**
	 * Test ha br service
	 *
	 * @since  3.3.0
	 * @return string
	 */
	private function zzTestBr(): string
	{
		return <<<XML
<?xml version='1.0'?>
<document>
			<bookingRequestDetails>
				<advertiserAssignedId>1931</advertiserAssignedId>
				<listingExternalId>151</listingExternalId>
				<unitExternalId>151a</unitExternalId>
				<propertyUrl>https://stage.homeaway.com/vacation-rental/p3173184</propertyUrl>
				<listingChannel>HOMEAWAY_US</listingChannel>
				<masterListingChannel>HOMEAWAY_US</masterListingChannel>
				<clientIPAddress>127.0.0.1</clientIPAddress>
				<message>Help!</message>
				<inquirer locale="en_GB">
					<title>Mr</title>
					<firstName>Test</firstName>
					<lastName>Name</lastName>
					<emailAddress>reservations@northendnairn.co.uk</emailAddress>
					<phoneCountryCode>GB</phoneCountryCode>
					<phoneNumber>07946630096</phoneNumber>
					<address rel="BILLING">
						<addressLine1>18 Waverley Road</addressLine1>
						<addressLine3>Nairn</addressLine3>
						<addressLine4>Highland</addressLine4>
						<country>GB</country>
						<postalCode>IV12 4RQ</postalCode>
					</address>
				</inquirer>
				<commission/>
				<olbMeta>
					<serviceFee currency="EUR">23.00</serviceFee>
				</olbMeta>
				<reservation>
					<numberOfAdults>2</numberOfAdults>
					<numberOfChildren>0</numberOfChildren>
					<numberOfPets>0</numberOfPets>
					<reservationDates>
						<beginDate>2023-05-19</beginDate>
						<endDate>2023-05-22</endDate>
					</reservationDates>
					<reservationOriginationDate>2023-02-12T14:43:43Z</reservationOriginationDate>
				</reservation>
				<orderItemList>
					<orderItem>
						<externalId>BUFFERED_IPM</externalId>
						<feeType>RENTAL</feeType>
						<name>Total Rent</name>
						<preTaxAmount currency="EUR">596.16</preTaxAmount>
						<productId>RENT</productId>
						<totalAmount currency="EUR">596.16</totalAmount>
					</orderItem>
				</orderItemList>
				<paymentScheduleItemList>
					<paymentScheduleItem>
						<amount currency="EUR">178.85</amount>
						<dueDate>2022-10-22</dueDate>
					</paymentScheduleItem>
					<paymentScheduleItem>
						<amount currency="EUR">417.31</amount>
						<dueDate>2023-03-22</dueDate>
					</paymentScheduleItem>
				</paymentScheduleItemList>
				<paymentForm>
					<paymentCard>
						<paymentFormType>CARD</paymentFormType>
						<billingAddress rel="BILLING">
							<addressLine1>10 Main Street</addressLine1>
							<addressLine3>Austin</addressLine3>
							<addressLine4>TX</addressLine4>
							<country>US</country>
							<postalCode>78703</postalCode>
						</billingAddress>
						<cvv>123</cvv>
						<expiration>12/2021</expiration>
						<maskedNumber>************1111</maskedNumber>
						<nameOnCard>Amy Smith</nameOnCard>
						<number>4111111111111111</number>
						<numberToken>8ec791fd-e6ba-4069-ab3e-2eb0e5758817</numberToken>
						<paymentCardDescriptor>
							<paymentFormType>CARD</paymentFormType>
							<cardCode>VISA</cardCode>
							<cardType>CREDIT</cardType>
						</paymentCardDescriptor>
					</paymentCard>
				</paymentForm>
				<trackingUuid>20c98eb5-b596-4e1a-b74d-a391e3fd2a93</trackingUuid>
				<travelerSource>HOMEAWAY_US</travelerSource>
			</bookingRequestDetails>
</document>
XML;
	}

	/**
	 * Test ha fas service
	 *
	 * @since  3.3.0
	 * @return string
	 */
	private function zzTestFas(): string
	{
		return '{
			"requestVersion": "1.0",
            "systemExternalId": "SystemUniqueId",
            "advertiserExternalId": "AdvertiserUniqueId",
            "listingExternalId": "151",
            "dateRange": {
				"arrivalDate": "2023-03-01",
                "departureDate": "2023-03-07"
            },
            "adults": 3,
            "children": 1,
            "pets": 0,
            "units": [
                {
	                "unitExternalId": "151a"
                }
            ]
		}';
	}
}