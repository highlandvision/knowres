<?php
/**
 * @package     KR
 * @subpackage  Library
 * @copyright   Copyright (c) 2020, Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\KR\Service\Channel\Ru;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Media;
use HighlandVision\KR\Service\Channel\Ru;
use HighlandVision\KR\TickTock;
use HighlandVision\KR\Utility;
use RuntimeException;
use SimpleXMLElement;
use stdClass;

use function count;
use function dom_import_simplexml;
use function in_array;
use function is_array;
use function is_countable;
use function substr;
use function trim;
use function ucfirst;

/**
 * Property Upload
 *
 * @since 1.0.0
 */
class Properties extends Ru
{
	/** @var array RU language info */
	protected array $languages;
	/** @var int Owner for property */
	protected int $owner_id;

	/**
	 * Initiailize
	 *
	 * @param   int  $test  1 for testing
	 *
	 * @throws Exception
	 * @since  2.3.0
	 */
	public function __construct(int $test = 0)
	{
		parent::__construct($test);

		//	var_dump( $this->pullAmenitiesRooms());exit;
		//	print_r($this->pullCompositionRooms());jexit();
		//  var_dump($this->pullAdditionalFees());jexit();
		$this->languages = $this->pullLanguages();

		if (!$this->parameters->owner_id)
		{
			if (!$this->pushOwner())
			{
				return false;
			}
		}
		else
		{
			$this->owner_id = $this->parameters->owner_id;
		}

		$this->processNewProperties();
	}

	/**
	 * Process property updates
	 *
	 * @throws Exception
	 * @since        2.2.0
	 */
	public function processQueue()
	{
		$this->processNewProperties();

		$queue = KrFactory::getListModel('servicequeues')
		                  ->getQueueByServiceMethod($this->service->id, 'updateProperty');
		foreach ($queue as $q)
		{
			try
			{
				if (!$q->id)
				{
					throw new RuntimeException(KrMethods::sprintf('COM_KNOWRES_THROW_MISSING_PARAMETER', 'queue'));
				}

				if (!$q->property_id)
				{
					throw new RuntimeException(KrMethods::sprintf('COM_KNOWRES_THROW_MISSING_PARAMETER',
						'queue.property_id'));
				}

				if (!$q->foreign_key)
				{
					throw new RuntimeException(KrMethods::sprintf('COM_KNOWRES_THROW_MISSING_PARAMETER',
						'queue.foreign_key'));
				}

				$this->queue_id    = $q->id;
				$this->property_id = $q->property_id;
				$this->foreign_key = $q->foreign_key;

				$this->readProperty($this->property_id);
				$this->getSettings($this->property_id);
				$this->pushProperty();

				$actioned           = new stdClass();
				$actioned->id       = $q->id;
				$actioned->actioned = 1;
				KrFactory::update('service_queue', $actioned);
			}
			catch (Exception $e)
			{
				$this->exception = $e;
				$this->addLog(false);
			}
		}
	}

	/**
	 * Add additional fees
	 *
	 * @param   SimpleXMLElement  $xml  Current build
	 *
	 * @throws Exception
	 * @since  3.4
	 * @return SimpleXMLElement
	 */
	protected function addAdditionalFees(SimpleXMLElement $xml): SimpleXMLElement
	{
		$additionalFees = $xml->addChild('AdditionalFees');
		$order          = 0;

		$cleaning = $this->setCleaningFee();
		if ($cleaning)
		{
			$additionalFees = $this->addCleaningFee($additionalFees, Utility::displayMoney($cleaning));
			$order          = 1;
		}

		if ((int) $this->settings['tax_code_1'] && (int) $this->settings['tax_type_1'] == '0')
		{
			$taxrate = KrFactory::getAdminModel('taxrate')->getItem((int) $this->settings['tax_code_1']);
			if (in_array($this->service_id, $taxrate->service))
			{
				$additionalFees = $this->addTaxFee($additionalFees, $taxrate, $order);
				$order          += 1;
			}
		}

		if ((int) $this->settings['tax_code_2'] && (int) $this->settings['tax_type_2'] == '0')
		{
			$taxrate = KrFactory::getAdminModel('taxrate')->getItem((int) $this->settings['tax_code_2']);
			if (in_array($this->service_id, $taxrate->service))
			{
				$additionalFees = $this->addTaxFee($additionalFees, $taxrate, $order);
				$order          += 1;
			}
		}

		if ((int) $this->settings['tax_code_3'] && (int) $this->settings['tax_type_3'] == '0')
		{
			$taxrate = KrFactory::getAdminModel('taxrate')->getItem((int) $this->settings['tax_code_3']);
			if (in_array($this->service_id, $taxrate->service))
			{
				$this->addTaxFee($additionalFees, $taxrate, $order);
			}
		}

		return $xml;
	}

	/**
	 * Adds a CDATA property to an XML document.
	 *
	 * @param   SimpleXMLElement  $parent  Element that the CDATA child should be attached too.
	 * @param   string            $name    Name of property that should contain CDATA.
	 * @param   string            $text    Value that should be inserted into a CDATA child.
	 *
	 * @since  2.2.0
	 * @return SimpleXMLElement
	 */
	protected function addCdata(SimpleXMLElement $parent, string $name, string $text): SimpleXMLElement
	{
		$child = $parent->addChild($name);
		if ($child !== null)
		{
			$child_node  = dom_import_simplexml($child);
			$child_owner = $child_node->ownerDocument;
			$child_node->appendChild($child_owner->createCDATASection($text));
		}

		return $child;
	}

	/**
	 * Add property amenities
	 *
	 * @param   SimpleXMLElement  $xml  Current build
	 *
	 * @since  3.3.1
	 * @return SimpleXMLElement
	 */
	protected function addPropertyAmenities(SimpleXMLElement $xml): SimpleXMLElement
	{
		$composition = $this->mapCompositionRooms();

		$compositionRoomsXml = $xml->addChild('CompositionRooms');
		if (isset($composition['bedroom']))
		{
			$compositionRoomIDXml = $compositionRoomsXml->addChild('CompositionRoomID', $composition['bedroom']);
			$compositionRoomIDXml->addAttribute('Count', $this->property->bedrooms);
		}
		if (isset($composition['bathroom']))
		{
			$compositionRoomIDXml = $compositionRoomsXml->addChild('CompositionRoomID', $composition['bathroom']);
			$compositionRoomIDXml->addAttribute('Count', $this->property->bathrooms);
		}
		if (isset($composition['wc']))
		{
			$compositionRoomIDXml = $compositionRoomsXml->addChild('CompositionRoomID', $composition['wc']);
			$compositionRoomIDXml->addAttribute('Count', $this->property->wc);
		}

		return $xml;
	}

	/**
	 * Add property amenities and rooms
	 *
	 * @param   SimpleXMLElement  $xml  Current build
	 *
	 * @since  3.3.1
	 * @return SimpleXMLElement
	 */
	protected function addPropertyAmenitiesRooms(SimpleXMLElement $xml): SimpleXMLElement
	{
		$this->features       = KrFactory::getListModel('propertyfeatures')->getAll();
		$this->property_rooms = KrFactory::getListModel('propertyrooms')->getForProperty($this->property->id);

		if (count($this->property_rooms))
		{
			$xml = $this->addPropertyRoomAmenities($xml);
		}
		else
		{
			$xml = $this->addPropertyAmenities($xml);
		}

		if (count($this->property->property_features))
		{
			$generic = $this->setPropertyFeatures(count($this->property_rooms));
			$xref    = $this->setAmenitiesCombinedXref();

			$amenitiesXml = $xml->addChild('Amenities');
			foreach ($this->property->property_features as $id)
			{
				$id = (int) $id;
				if (isset($generic[$id]) && isset($xref[$generic[$id]]))
				{
					$amenitiesXml->addChild('Amenity', $xref[$generic[$id]]);
				}
			}
		}

		if (!count($this->property_rooms))
		{
			$generic = $this->setBedTypes($this->property->bed_types);
			if (count($generic))
			{
				$amenities    = $this->setAmenitiesPropertyXref();
				$amenitiesXml = $xml->addChild('Amenities');
				foreach ($generic as $k => $v)
				{
					if (isset($amenities[$k]) && $v)
					{
						$amenityXml = $amenitiesXml->addChild('Amenity', $amenities[$k]);
						$amenityXml->addAttribute('Count', (string) $v);
					}
				}
			}
		}

		return $xml;
	}

	/**
	 * Add property arrival info
	 *
	 * @param   SimpleXMLElement  $xml  Current build
	 *
	 * @since  3.3.1
	 * @return SimpleXMLElement
	 */
	protected function addPropertyArrivalInfo(SimpleXMLElement $xml): SimpleXMLElement
	{
		$arrivalInstructionsXml = $xml->addChild('ArrivalInstructions');
		$arrivalInstructionsXml->addChild('Landlord', $this->property->contact_name);
		$arrivalInstructionsXml->addChild('Email', $this->property->contact_email);
		$arrivalInstructionsXml->addChild('Phone', $this->property->contact_phone);
		$arrivalInstructionsXml->addChild('DaysBeforeArrival', $this->property->contact_days);

		$howToArriveXml = $arrivalInstructionsXml->addChild('HowToArrive');
		$howToArriveXml->addAttribute('LanguageID', $this->languages['en']);
		$howToArriveXml->addChild('Text', 'tbc by email');

		$PickupServiceXml = $arrivalInstructionsXml->addChild('PickupService');
		$PickupServiceXml->addAttribute('LanguageID', $this->languages['en']);
		$PickupServiceXml->addChild('Text', 'tbc by email');

		return $xml;
	}

	/**
	 * Add base property information
	 *
	 * @param   SimpleXMLElement  $xml            Current build
	 * @param   int               $location       Property location (ru style)
	 * @param   int               $location_type  Type of location
	 *
	 * @since  3.3.1
	 * @return SimpleXMLElement
	 */
	protected function addPropertyBase(SimpleXMLElement $xml, int $location, int $location_type): SimpleXMLElement
	{
		$PUIDXml = $xml->addChild('PUID', $this->property_id);
		$PUIDXml->addAttribute('BuildingID', '-1');

		if (isset($this->property->channel_name) && trim($this->property->channel_name))
		{
			$this->addCdata($xml, 'Name', ucfirst(trim($this->property->channel_name)));
		}
		else
		{
			$this->addCdata($xml, 'Name', ucfirst(trim($this->property->property_name)));
		}

		$xml->addChild('OwnerID', $this->owner_id);

		$detailedLocationIDXml = $xml->addChild('DetailedLocationID', $location);
		$detailedLocationIDXml->addAttribute('TypeID', $location_type);

		if ($this->property->state == 1)
		{
			$xml->addChild('IsActive', 'true');
			$xml->addChild('IsArchived', 'false');
		}
		else
		{
			$xml->addChild('IsActive', 'false');
			$xml->addChild('IsArchived', 'true');
		}

		return $xml;
	}

	/**
	 * Add property cancellation policies
	 *
	 * @param   SimpleXMLElement  $xml  Current build
	 *
	 * @since  3.3.1
	 * @return SimpleXMLElement
	 */
	protected function addPropertyCancellationPolicies(SimpleXMLElement $xml): SimpleXMLElement
	{
		$found = false;

		$cancellationPoliciesXml = $xml->addChild('CancellationPolicies');
		$cancel                  = Utility::arrayToObject($this->property->cancellation_penalty);
		foreach ($cancel as $c)
		{
			if ($c->cancellation_penalty_pc)
			{
				$cancellationPolicyXml = $cancellationPoliciesXml->addChild('CancellationPolicy',
					$c->cancellation_penalty_pc);
				$cancellationPolicyXml->addAttribute('ValidFrom', $c->cancellation_penalty_from);
				$cancellationPolicyXml->addAttribute('ValidTo', $c->cancellation_penalty_to);
				$found = true;
			}
		}

		if (!$found)
		{
			$cancellationPolicyXml = $cancellationPoliciesXml->addChild('CancellationPolicy', '100');
			$cancellationPolicyXml->addAttribute('ValidFrom', '0');
			$cancellationPolicyXml->addAttribute('ValidTo', '0');
		}

		return $xml;
	}

	/**
	 * Add property check in and out info
	 *
	 * @param   SimpleXMLElement  $xml  Current build
	 *
	 * @since  3.3.1
	 * @return SimpleXMLElement
	 */
	protected function addPropertyCheckInOut(SimpleXMLElement $xml): SimpleXMLElement
	{
		$checkin_time    = $this->property->checkin_time != '24:00' ? $this->property->checkin_time : '23:59';
		$checkin_time_to = $this->property->checkin_time_to != '24:00' ? $this->property->checkin_time_to : '23:59';
		$checkout_time   = $this->property->checkout_time != '24:00' ? $this->property->checkout_time : '23:59';

		$checkInOutXml = $xml->addChild('CheckInOut');
		$checkInOutXml->addChild('CheckInFrom', $checkin_time);
		$checkInOutXml->addChild('CheckInTo', $checkin_time_to);
		$checkInOutXml->addChild('CheckOutUntil', $checkout_time);

		if (!empty($this->property->where_keys))
		{
			$checkInOutXml->addChild('Place', $this->property->where_keys);
		}
		else
		{
			$checkInOutXml->addChild('Place', 'tbc by email');
		}

		$found = false;
		foreach ($this->property->checkin_fees as $c)
		{
			$c = is_array($c) ? Utility::arrayToObject($c) : $c;
			if ((float) $c->checkin_fees_amount > 0)
			{
				if (!$found)
				{
					$lateArrivalFeesXml = $checkInOutXml->addChild('LateArrivalFees');
					$found              = true;
				}

				$checkin_fees_from = $c->checkin_fees_from != '24:00' ? $c->checkin_fees_from : '23:59';
				$checkin_fees_to   = $c->checkin_fees_to != '24:00' ? $c->checkin_fees_to : '23:59';

				$lateArrivalFeesFeeXml = $lateArrivalFeesXml->addChild('Fee',
					Utility::displayMoney($c->checkin_fees_amount));
				$lateArrivalFeesFeeXml->addAttribute('From', $checkin_fees_from);
				$lateArrivalFeesFeeXml->addAttribute('To', $checkin_fees_to);
			}
		}

		$found = false;
		foreach ($this->property->checkout_fees as $c)
		{
			$c = is_array($c) ? Utility::arrayToObject($c) : $c;
			if ((float) $c->checkout_fees_amount > 0)
			{
				if (!$found)
				{
					$earlyDepartureFeesXml = $checkInOutXml->addChild('EarlyDepartureFees');
					$found                 = true;
				}

				$checkout_fees_from = $c->checkout_fees_from != '24:00' ? $c->checkout_fees_from : '23:59';
				$checkout_fees_to   = $c->checkout_fees_to != '24:00' ? $c->checkout_fees_to : '23:59';

				$earlyDepartureFeesFeeXml = $earlyDepartureFeesXml->addChild('Fee',
					Utility::displayMoney($c->checkout_fees_amount));
				$earlyDepartureFeesFeeXml->addAttribute('From', $checkout_fees_from);
				$earlyDepartureFeesFeeXml->addAttribute('To', $checkout_fees_to);
			}
		}

		return $xml;
	}

	/**
	 * Add property deposit
	 *
	 * @param   SimpleXMLElement  $xml  Current build
	 *
	 * @since  3.3.1
	 * @return SimpleXMLElement
	 */
	protected function addPropertyDeposit(SimpleXMLElement $xml): SimpleXMLElement
	{
		$depositXml = $xml->addChild('Deposit', Utility::displayMoney($this->settings['depositValue']));
		if (!$this->settings['chargeDepositYesNo'])
		{
			$depositXml->addAttribute('DepositTypeID', 1);
		}
		else if ($this->settings['depositIsPercentage'])
		{
			$depositXml->addAttribute('DepositTypeID', 3);
		}
		else
		{
			$depositXml->addAttribute('DepositTypeID', 5);
		}

		return $xml;
	}

	/**
	 * Add property descriptions
	 *
	 * @param   SimpleXMLElement  $xml  Current build
	 *
	 * @since  3.3.1
	 * @return SimpleXMLElement
	 */
	protected function addPropertyDescriptions(SimpleXMLElement $xml): SimpleXMLElement
	{
		$descriptionsXml = $xml->addChild('Descriptions');
		$descriptions    = $this->getDescriptions('property_fields');
		foreach ($descriptions as $lang => $text)
		{
			$descriptionXml = $descriptionsXml->addChild('Description');
			$descriptionXml->addAttribute('LanguageID', $this->languages[substr($lang, 0, 2)]);
			$this->addCdata($descriptionXml, 'Text', $text);
		}

		return $xml;
	}

	/**
	 * Add property details
	 *
	 * @param   SimpleXMLElement  $xml  Current build
	 *
	 * @throws Exception
	 * @throws Exception
	 * @throws Exception
	 * @since  3.3.1
	 * @return SimpleXMLElement
	 */
	protected function addPropertyDetails(SimpleXMLElement $xml): SimpleXMLElement
	{
		$xml->addChild('Space', (string) $this->property->area);

		$guests = KrFactory::getListModel('rates')->getMaxGuests($this->property->id);
		if (!$guests)
		{
			$guests = 2;
		}

		$xml->addChild('StandardGuests', (int) $guests);
		$xml->addChild('CanSleepMax', $this->property->sleeps + $this->property->sleeps_extra);
		$xml->addChild('PropertyTypeID', $this->setPropertyTypeId($this->property->bedrooms));
		$xml->addChild('ObjectTypeID', $this->setObjectTypeId($this->property->type_name));
		$xml->addChild('Floor', (string) $this->property->floor);
		$xml->addChild('Street', $this->property->property_street);
		$xml->addChild('ZipCode', $this->property->property_postcode);

		$coordinatesXml = $xml->addChild('Coordinates');
		$coordinatesXml->addChild('Longitude', $this->property->lng);
		$coordinatesXml->addChild('Latitude', $this->property->lat);

		return $xml;
	}

	/**
	 * Add property images
	 *
	 * @param   SimpleXMLElement  $xml  Current build
	 *
	 * @throws Exception
	 * @since  3.3.1
	 * @return SimpleXMLElement
	 */
	protected function addPropertyImages(SimpleXMLElement $xml): SimpleXMLElement
	{
		$images = KrFactory::getListModel('images')->getAllForProperty($this->property->id);
		if (is_countable($images) && count($images))
		{
			$imagesXml = $xml->addChild('Images');
			$first     = true;

			foreach ($images as $i)
			{
				$link     = KrMethods::getBase() . Media\Images::getImagePath($this->property->id, 'original');
				$imageXml = $imagesXml->addChild('Image', $link . '/' . $i->filename);
				$type     = $first ? '1' : '3';
				$imageXml->addAttribute('ImageTypeID', $type);

				$first = false;
			}
		}

		return $xml;
	}

	/**
	 * Add property odds and sods
	 *
	 * @param   SimpleXMLElement  $xml  Current build
	 *
	 * @throws Exception
	 * @since  3.3.1
	 * @return SimpleXMLElement
	 */
	protected function addPropertyOdds(SimpleXMLElement $xml): SimpleXMLElement
	{
		$securityDepositXml = $xml->addChild('SecurityDeposit',
			Utility::displayMoney($this->property->security_amount));
		$securityDepositXml->addAttribute('DepositTypeID', 5);

		$xml = $this->addAdditionalFees($xml);

		if (isset($this->property->licence_id) && $this->property->licence_id)
		{
			$licenceInfo = $xml->addChild('LicenceInfo');
			$licenceInfo->addChild('LicenceNumber', $this->property->licence_id);
		}

		return $xml;
	}

	/**
	 * Add property payment methods
	 *
	 * @param   SimpleXMLElement  $xml  Current build
	 *
	 * @since  3.3.1
	 * @return SimpleXMLElement
	 */
	protected function addPropertyPaymentMethods(SimpleXMLElement $xml): SimpleXMLElement
	{
		$methods           = [];
		$methods['cash']   = 1;
		$methods['wire']   = 2;
		$methods['stripe'] = 3;
		$methods['paypal'] = 4;
		$methods['check']  = 5;

		$paymentMethodsXml = $xml->addChild('PaymentMethods');
		$gateways          = KrFactory::getListModel('services')->getGateways();
		$tmp               = [];
		foreach ($gateways as $g)
		{
			if (!isset($tmp[$g->plugin]))
			{
				if (isset($methods[$g->plugin]))
				{
					$paymentMethodXml = $paymentMethodsXml->addChild('PaymentMethod', 'Details on Request');
					$paymentMethodXml->addAttribute('PaymentMethodID', $methods[$g->plugin]);
					$tmp[$g->plugin] = 1;
				}
			}
		}

		return $xml;
	}

	/**
	 * Add property room amenities
	 *
	 * @param   SimpleXMLElement  $xml  Current build
	 *
	 * @since  3.3.1
	 * @return SimpleXMLElement
	 */
	protected function addPropertyRoomAmenities(SimpleXMLElement $xml): SimpleXMLElement
	{
		$exclusions   = $this->setExclusions();
		$roomfeatures = $this->setAmenitiesByRoom($this->property_rooms);
		$composition  = $this->mapCompositionRooms();

		$compositionRoomsAmenitiesXml = $xml->addChild('CompositionRoomsAmenities');
		foreach ($roomfeatures as $rooms)
		{
			foreach ($rooms as $generic_room => $rf)
			{
				$compositionRoomAmenitiesXml = $compositionRoomsAmenitiesXml->addChild('CompositionRoomAmenities');
				$compositionRoomAmenitiesXml->addAttribute('CompositionRoomID', $composition[$generic_room]);

				$amenitiesXml = $compositionRoomAmenitiesXml->addChild('Amenities');
				$xref         = $this->setAmenitiesByRoomXref($generic_room);
				$generic      = $this->setPropertyFeatures(count($rooms), $generic_room);

				foreach ($rf as $id => $count)
				{
					if (isset($generic[$id]) && isset($xref[$generic[$id]]))
					{
						$send = true;
						foreach ($exclusions as $e)
						{
							if ($composition[$generic_room] == $e['room'] && $xref[$generic[$id]] == $e['amenity'])
							{
								$send = false;
								break;
							}
						}

						if ($send)
						{
							$amenityXml = $amenitiesXml->addChild('Amenity', $xref[$generic[$id]]);
							$amenityXml->addAttribute('Count', (string) $count);
						}
					}
				}
			}
		}

		return $xml;
	}

	/**
	 * Set additional cleaning fee
	 *
	 * @param   SimpleXMLElement  $additionalFees  Current build
	 * @param   float             $fee             Fee
	 *
	 * @since  4.0.0
	 * @return SimpleXMLElement
	 */
	protected function addCleaningFee(SimpleXmlElement $additionalFees, float $fee): SimpleXMLElement
	{
		$additionalFee = $additionalFees->addChild('AdditionalFee');
		$additionalFee->addAttribute('FeeTaxType', $this->cleaning_fee_type);
		$additionalFee->addAttribute('DiscriminatorID', '1');
		$additionalFee->addChild('Value', $fee);
		$additionalFee->addAttribute('Order', 0);

		return $additionalFees;
	}

	/**
	 * Set additional fees for one tax
	 *
	 * @param   SimpleXMLElement  $additionalFees  Current build
	 * @param   object            $tax             Tax row
	 * @param   int               $order           Calculation order
	 *
	 * @since  3.4
	 * @return SimpleXMLElement
	 */
	protected function addTaxFee(SimpleXmlElement $additionalFees, object $tax, int $order): SimpleXMLElement
	{
		$additionalFee = $additionalFees->addChild('AdditionalFee');
		$additionalFee->addAttribute('FeeTaxType', $this->tax_fee_types[$tax->tax_type]);
		if ($tax->fixed)
		{
			if ($tax->per_night)
			{
				$additionalFee->addAttribute('DiscriminatorID', '2');
			}
			else
			{
				$additionalFee->addAttribute('DiscriminatorID', '1');
			}
			$additionalFee->addChild('Value', $tax->rate);
		}
		else
		{
			$additionalFee->addAttribute('DiscriminatorID', '3');
			$additionalFee->addChild('Value', $tax->rate / 100);
		}

		$additionalFee->addAttribute('Order', $order);

		return $additionalFees;
	}

	/**
	 * Get an RU location using lat and lng
	 *
	 * @param   string  $lat  Property latitude
	 * @param   string  $lng  Property longitude
	 *
	 * @throws Exception
	 * @since  2.3.0
	 * @return int
	 */
	protected function getLocationByCoordinates(string $lat, string $lng): int
	{
		if (!$lat || !$lng)
		{
			return 0;
		}

		$xml = new SimpleXMLElement('<Pull_GetLocationByCoordinates_RQ></Pull_GetLocationByCoordinates_RQ>');
		$xml = $this->addAuthentication($xml);

		$xml->addChild('Latitude', $lat);
		$xml->addChild('Longitude', $lng);

		$simple = $this->sendXml($xml, 'Pull_GetLocationByCoordinates_RQ');
		if (isset($simple->Location['LocationID']))
		{
			return (int) $simple->Location['LocationID'];
		}

		return 0;
	}

	//	/**
	//	 * Get the RU location ID for the propertiy's geo co-ordinates
	//	 *
	//	 * @param  bool  $new  True for new property
	//	 *
	//	 * @since  3.4
	//	 * @return SimpleXMLElement
	//	 */
	//	protected function getPropertyLocation(bool $new): array
	//	{
	//		$additionalFee = $additionalFees->addChild('AdditionalFee');
	//		$additionalFee->addAttribute('FeeTaxType', '2');
	//		if ($tax->fixed)
	//		{
	//			if ($tax->per_night)
	//			{
	//				$additionalFee->addAttribute('DiscriminatorID', '2');
	//			}
	//			else
	//			{
	//				$additionalFee->addAttribute('DiscriminatorID', '1');
	//			}
	//			$additionalFee->addChild('Value', $tax->rate);
	//		}
	//		else
	//		{
	//			$additionalFee->addAttribute('DiscriminatorID', '3');
	//			$additionalFee->addChild('Value', $tax->rate / 100);
	//		}
	//
	//		$additionalFee->addAttribute('Order', $order);
	//
	//		return $additionalFees;
	//	}

	//	/**
	//	 * Get the RU location ID for the propertiy's geo co-ordinates
	//	 *
	//	 * @param  bool  $new  True for new property
	//	 *
	//	 * @since  3.4
	//	 * @return SimpleXMLElement
	//	 */
	//	protected function getPropertyLocation(bool $new): array
	//	{
	//		$additionalFee = $additionalFees->addChild('AdditionalFee');
	//		$additionalFee->addAttribute('FeeTaxType', '2');
	//		if ($tax->fixed)
	//		{
	//			if ($tax->per_night)
	//			{
	//				$additionalFee->addAttribute('DiscriminatorID', '2');
	//			}
	//			else
	//			{
	//				$additionalFee->addAttribute('DiscriminatorID', '1');
	//			}
	//			$additionalFee->addChild('Value', $tax->rate);
	//		}
	//		else
	//		{
	//			$additionalFee->addAttribute('DiscriminatorID', '3');
	//			$additionalFee->addChild('Value', $tax->rate / 100);
	//		}
	//
	//		$additionalFee->addAttribute('Order', $order);
	//
	//		return $additionalFees;
	//	}

	//	/**
	//	 * Get the RU location ID for the propertiy's geo co-ordinates
	//	 *
	//	 * @param  bool  $new  True for new property
	//	 *
	//	 * @since  3.4
	//	 * @return SimpleXMLElement
	//	 */
	//	protected function getPropertyLocation(bool $new): array
	//	{
	//		$additionalFee = $additionalFees->addChild('AdditionalFee');
	//		$additionalFee->addAttribute('FeeTaxType', '2');
	//		if ($tax->fixed)
	//		{
	//			if ($tax->per_night)
	//			{
	//				$additionalFee->addAttribute('DiscriminatorID', '2');
	//			}
	//			else
	//			{
	//				$additionalFee->addAttribute('DiscriminatorID', '1');
	//			}
	//			$additionalFee->addChild('Value', $tax->rate);
	//		}
	//		else
	//		{
	//			$additionalFee->addAttribute('DiscriminatorID', '3');
	//			$additionalFee->addChild('Value', $tax->rate / 100);
	//		}
	//
	//		$additionalFee->addAttribute('Order', $order);
	//
	//		return $additionalFees;
	//	}

	/**
	 * Get the RU location ID for the propertiy's geo co-ordinates
	 *
	 * @param   bool  $new  True for new property
	 *
	 * @throws Exception
	 * @since  3.3.0
	 * @return array
	 */
	protected function getPropertyLocation(bool $new): array
	{
		$location_type = 4;
		$location      = $this->getLocationByCoordinates($this->property->lat, $this->property->lng);
		if (!$location)
		{
			$this->errors[] = 'Location could not be determined for property ' . $this->property->property_name;
			$this->errors[] = $new ? 'Property upload aborted' : 'Property changes aborted';
			$this->addLog(false);
		}
		else
		{
			$location_type = $this->getLocationType($location);
		}

		return [$location,
		        $location_type];
	}

	/**
	 * Map room types to RU IDs to
	 *
	 * @since  2.3.0
	 * @return array
	 */
	protected function mapCompositionRooms(): array
	{
		$data             = [];
		$data['wc']       = '53';
		$data['bathroom'] = '81';
		$data['lk']       = '94';
		$data['kitchen']  = '101';
		$data['living']   = '249';
		$data['bedroom']  = '257';
		$data['lb']       = '372';
		$data['lbk']      = '517';

		return $data;
	}

	/**
	 * Process any new properties sending property, availability and rates
	 *
	 * @throws Exception
	 * @since  1.2.2
	 */
	protected function processNewProperties()
	{
		$properties = KrFactory::getListModel('servicexrefs')->getPropertiesForService($this->service_id, true);
		if (!is_countable($properties))
		{
			return;
		}

		foreach ($properties as $new)
		{
			$this->property_id = $new->property_id;
			$this->readProperty($this->property_id);
			$this->getSettings($this->property_id);

			try
			{
				$this->foreign_key = $this->pushProperty(true);
				if (empty($this->foreign_key) || (int) $this->foreign_key == 1)
				{
					throw new Exception('New property upload aborted. Foreign key was not set');
				}

				$this->resetNewProperty($ip->id);
				$xrefs                     = [];
				$xrefs[$this->property_id] = $this->foreign_key;

				$Rates = new Rates($this->test);
				$Rates->sendForProperty();

				$Availability = new Availability($this->test);
				$Availability->sendForProperties([$this->property_id], $xrefs);

				$this->addLog(true);
			}
			catch (Exception $e)
			{
				$this->exception = $e;
				$this->addLog(false);
				continue;
			}
		}
	}

	/**
	 * Pull languages
	 *
	 * @param   bool  $refresh  Set to true to refresh the data regardless of cache
	 *
	 * @throws Exception
	 * @since  1.2.2
	 * @return array
	 */
	protected function pullAdditionalFees(bool $refresh = false): mixed
	{
		$data = false;
		if (!$refresh)
		{
			$data = $this->checkCache('Pull_ListAdditionalFeeTypes_RQ');
		}
		if ($data)
		{
			return $data;
		}

		$xml = new SimpleXMLElement('<Pull_ListAdditionalFeeTypes_RQ></Pull_ListAdditionalFeeTypes_RQ>');
		$xml = $this->addAuthentication($xml);

		$simple = $this->sendXml($xml, 'Pull_ListAdditionalFeeTypes_RQ');
		$data   = [];
		foreach ($simple->AdditionalFeeTypes->AdditionalFeeTypeInfo as $fee)
		{
			$data[strtolower((string) $fee)] = (string) $fee['ID'];
		}

		$this->storeCache($data, 'Pull_ListAdditionalFeeTypes_RQ');

		return $data;
	}

	/**
	 * Pull languages
	 *
	 * @param   bool  $refresh  Set to true to refresh the data regardless of cache
	 *
	 * @throws Exception
	 * @since  1.2.2
	 * @return array
	 */
	protected function pullLanguages(bool $refresh = false): mixed
	{
		$data = false;
		if (!$refresh)
		{
			$data = $this->checkCache('Pull_ListLanguages_RQ');
		}
		if ($data)
		{
			return $data;
		}

		$xml = new SimpleXMLElement('<Pull_ListLanguages_RQ></Pull_ListLanguages_RQ>');
		$xml = $this->addAuthentication($xml);

		$simple = $this->sendXml($xml, 'Pull_ListLanguages_RQ');
		$data   = [];
		foreach ($simple->Languages->Language as $language)
		{
			$data[(string) $language['LanguageCode']] = (string) $language['LanguageID'];
		}

		$this->storeCache($data, 'Pull_ListLanguages_RQ');

		return $data;
	}

	/**
	 * Push owner (site) details to RU
	 *
	 * @throws Exception
	 * @since  1.2.2
	 * @return bool
	 */
	protected function pushOwner(): bool
	{
		$agencies = KrFactory::getListModel('agencies')->getAll();
		foreach ($agencies as $a)
		{
			if ($a->telephone)
			{
				$names = explode(' ', $a->name, 2);

				$xml = new SimpleXMLElement('<Push_PutOwner_RQ></Push_PutOwner_RQ>');
				$xml = $this->addAuthentication($xml);

				$ownerXml = $xml->addChild('Owner');
				$ownerXml->addChild('FirstName', $names[0]);
				$ownerXml->addChild('SurName', $names[1]);
				$ownerXml->addChild('Email', KrMethods::getCfg('mailfrom'));
				$ownerXml->addChild('Phone', $a->telephone);

				$simple         = $this->sendXml($xml, 'Push_PutOwner_RQ');
				$this->owner_id = (string) $simple->OwnerID;
				$this->updateOwnerId();

				return true;
			}
		}

		$this->errors[] = 'Owner could not be created';
		$this->addLog(false);

		return false;
	}

	/**
	 * Push property details to RU
	 *
	 * @param   bool  $new  True for a new property
	 *
	 * @throws Exception
	 * @since  2.3.0
	 * @return bool|string
	 */
	protected function pushProperty(bool $new = false): bool|string
	{
		$this->errors = [];
		list($location, $location_type) = $this->getPropertyLocation($new);

		$xml = new SimpleXMLElement('<Push_PutProperty_RQ></Push_PutProperty_RQ>');
		$xml = $this->addAuthentication($xml);

		$propertyXml = $xml->addChild('Property');
		if (!$new)
		{
			$propertyXml->addChild('ID', $this->foreign_key);
		}

		$propertyXml = $this->addPropertyBase($propertyXml, $location, $location_type);
		$propertyXml = $this->addPropertyDetails($propertyXml);
		$propertyXml = $this->addPropertyAmenitiesRooms($propertyXml);
		$propertyXml = $this->addPropertyImages($propertyXml);
		$propertyXml = $this->addPropertyArrivalInfo($propertyXml);
		$propertyXml = $this->addPropertyCheckInOut($propertyXml);
		$propertyXml = $this->addPropertyPaymentMethods($propertyXml);
		$propertyXml = $this->addPropertyDeposit($propertyXml);
		$propertyXml = $this->addPropertyCancellationPolicies($propertyXml);
		$propertyXml = $this->addPropertyDescriptions($propertyXml);
		$this->addPropertyOdds($propertyXml);

		$simple = $this->sendXml($xml, 'Push_PutProperty_RQ');
		if ($new)
		{
			return (isset($simple->ID)) ? (string) $simple->ID : false;
		}

		return true;
	}

	/**
	 * Reset "new" flag and update foreign key on service xref
	 * After property has been loaded
	 *
	 * @param   int  $id  Key
	 *
	 * @throws Exception
	 * @since  3.0.0
	 */
	protected function resetNewProperty(int $id)
	{
		$update              = new stdClass();
		$update->id          = $id;
		$update->foreign_key = $this->foreign_key;
		$update->new         = 0;
		$update->updated_at  = TickTock::getTS();
		KrFactory::update('service_xref', $update);
	}

	/**
	 * Set bathroom amenities
	 *
	 * @since  2.3.0
	 * @return array
	 */
	protected function setAmenitiesBathroomXref(): array
	{
		$xref                     = [];
		$xref['toiletries']       = 8;
		$xref['washing machine']  = 11;
		$xref['bidet']            = 29;
		$xref['cupboard']         = 32;
		$xref['vanity cupboard']  = 33;
		$xref['toilet']           = 37;
		$xref['chest of drawers'] = 78;
		$xref['washer dryer']     = 134;
		$xref['shower']           = 239;
		$xref['washbasin']        = 245;
		$xref['jacuzzi']          = 253;
		$xref['bathtub']          = 315;
		$xref['heated towel bar'] = 447;
		$xref['mirror']           = 503;

		return $xref;
	}

	/**
	 * Set bedroom amenities
	 *
	 * @since  2.3.0
	 */
	protected function setAmenitiesBedroomXref(): array
	{
		$xref                       = [];
		$xref['alarm clock']        = 21;
		$xref['cupboard']           = 32;
		$xref['double bed']         = 61;
		$xref['built-in wardrobes'] = 66;
		$xref['night table']        = 70;
		$xref['reading lamp']       = 72;
		$xref['desk']               = 73;
		$xref['tv']                 = 74;
		$xref['chest of drawers']   = 78;
		$xref['balcony']            = 89;
		$xref['air conditioning']   = 180;
		$xref['lamp']               = 188;
		$xref['table and chairs']   = 189;
		$xref['double sofa bed']    = 200;
		$xref['wardrobe']           = 201;
		$xref['double sofa']        = 203;
		$xref['sofabed']            = 237;
		$xref['table']              = 250;
		$xref['single bed']         = 323;
		$xref['king size bed']      = 324;
		$xref['armchair']           = 363;
		$xref['fireplace']          = 364;
		$xref['en suite bathroom']  = 409;
		$xref['pair of twin beds']  = 440;
		$xref['bunk beds']          = 444;
		$xref['queen size bed']     = 485;
		$xref['mirror']             = 503;
		$xref['chair']              = 508;
		$xref['en suite shower']    = 516;

		return $xref;
	}

	/**
	 * Set room amenities for each individual room
	 *
	 * @param   array  $rooms  Rooms set up for the property
	 *
	 * @since  2.3.0
	 * @return array
	 */
	protected function setAmenitiesByRoom(array $rooms): array
	{
		$roomfeatures = [];

		foreach ($rooms as $r)
		{
			if (!$r->generic)
			{
				continue;
			}

			$features = [];
			$data     = Utility::decodeJson($r->features);
			foreach ($data as $d)
			{
				$features[$d->id] = $d->count;
			}

			if (count($features))
			{
				$roomfeatures[][$r->generic] = $features;
			}
		}

		return $roomfeatures;
	}

	/**
	 * Set the specific amenities for an RU room type
	 *
	 * @param $room
	 *
	 * @since  2.3.0
	 * @return array
	 */
	protected function setAmenitiesByRoomXref($room): array
	{
		$xref = [];

		if ($room == 'bathroom')
		{
			$xref = $this->setAmenitiesBathroomXref();
		}
		else if ($room == 'bedroom')
		{
			$xref = $this->setAmenitiesBedroomXref();
		}
		else if ($room == 'living')
		{
			$xref = $this->setAmenitiesLivingXref();
		}
		else if ($room == 'kitchen')
		{
			$xref = $this->setAmenitiesKitchenXref();
		}
		else if ($room == 'wc')
		{
			$xref = $this->setAmenitiesWCXref();
		}
		else if ($room == 'lk')
		{
			$xref = array_merge($this->setAmenitiesLivingXref(), $this->setAmenitiesKitchenXref());
		}
		else if ($room == 'lb')
		{
			$xref = array_merge($this->setAmenitiesLivingXref(), $this->setAmenitiesBedroomXref());
		}
		else if ($room == 'lbk')
		{
			$xref = array_merge($this->setAmenitiesLivingXref(), $this->setAmenitiesBedroomXref(),
				$this->setAmenitiesKitchenXref());
		}

		return $xref;
	}

	/**
	 * Set array combination of all generic xrefs
	 *
	 * @since  2.3.0
	 * @return array
	 */
	protected function setAmenitiesCombinedXref(): array
	{
		return array_merge($this->setAmenitiesPropertyXref(), $this->setAmenitiesBathroomXref(),
			$this->setAmenitiesWCXref(), $this->setAmenitiesBedroomXref(), $this->setAmenitiesLivingXref(),
			$this->setAmenitiesKitchenXref());
	}

	/**
	 * Set kitchen amenities
	 *
	 * @since  2.3.0
	 * @return array
	 */
	protected function setAmenitiesKitchenXref(): array
	{
		$xref                                  = [];
		$xref['cookware and kitchen utensils'] = 2;
		$xref['crockery and cutlery']          = 3;
		$xref['washing machine']               = 11;
		$xref['dishwasher']                    = 13;
		$xref['kettle']                        = 17;
		$xref['oven']                          = 115;
		$xref['cooker']                        = 119;
		$xref['electric kettle']               = 123;
		$xref['microwave']                     = 124;
		$xref['toaster']                       = 125;
		$xref['fridge freezer']                = 130;
		$xref['fridge']                        = 131;
		$xref['washer dryer']                  = 134;
		$xref['coffee maker']                  = 140;
		$xref['gas or electric hob']           = 146;
		$xref['breakfast bar and stools']      = 150;
		$xref['table and chairs']              = 189;
		$xref['dining table']                  = 250;
		$xref['espresso-machine']              = 390;
		$xref['ice maker']                     = 413;
		$xref['blender']                       = 436;
		$xref['cupboards']                     = 506;

		return $xref;
	}

	/**
	 * Set living amenities
	 *
	 * @since  2.3.0
	 * @return array
	 */
	protected function setAmenitiesLivingXref(): array
	{
		$xref                      = [];
		$xref['dvd']               = 23;
		$xref['cupboard']          = 32;
		$xref['double bed']        = 61;
		$xref['reading lamp']      = 72;
		$xref['desk']              = 73;
		$xref['tv']                = 74;
		$xref['balcony']           = 89;
		$xref['coffee table']      = 163;
		$xref['air conditioning']  = 180;
		$xref['sofa']              = 182;
		$xref['lamp']              = 188;
		$xref['table and chairs']  = 189;
		$xref['double sofa bed']   = 200;
		$xref['double sofa']       = 203;
		$xref['sofabed']           = 237;
		$xref['dining table']      = 250;
		$xref['fan']               = 261;
		$xref['single bed']        = 323;
		$xref['king size bed']     = 324;
		$xref['armchair']          = 363;
		$xref['fireplace']         = 364;
		$xref['pair of twin beds'] = 440;
		$xref['bunk beds']         = 444;
		$xref['queen size bed']    = 485;
		$xref['chair']             = 508;

		return $xref;
	}

	/**
	 * Set amenity xref - property generic vs RU id
	 * return array
	 *
	 * @since  2.3.0
	 */
	protected function setAmenitiesPropertyXref(): array
	{
		$xref                                = [];
		$xref['iron and board']              = 4;
		$xref['hair dryer']                  = 6;
		$xref['bed linen & towels']          = 7;
		$xref['washing machine']             = 11;
		$xref['dishwasher']                  = 13;
		$xref['tv cable']                    = 19;
		$xref['stereo']                      = 22;
		$xref['dvd']                         = 23;
		$xref['double bed']                  = 61;
		$xref['tv']                          = 74;
		$xref['balcony']                     = 89;
		$xref['small balcony']               = 96;
		$xref['lounge']                      = 99;
		$xref['terrace']                     = 100;
		$xref['fridge freezer']              = 130;
		$xref['washer dryer']                = 134;
		$xref['vacuum cleaner']              = 143;
		$xref['freezer']                     = 152;
		$xref['tv local channels only']      = 166;
		$xref['tv satellite']                = 167;
		$xref['internet connection']         = 174;
		$xref['air conditioning']            = 180;
		$xref['double sofa bed']             = 200;
		$xref['help desk']                   = 205;
		$xref['high chair']                  = 208;
		$xref['airport pick-up service']     = 215;
		$xref['maid service']                = 225;
		$xref['sofabed']                     = 237;
		$xref['wheelchair access']           = 281;
		$xref['gym for guest use']           = 294;
		$xref['parking on street']           = 295;
		$xref['underground parking']         = 296;
		$xref['parking guarded']             = 302;
		$xref['single bed']                  = 323;
		$xref['king size bed']               = 324;
		$xref['internet access free']        = 339;
		$xref['wood burning fireplace']      = 349;
		$xref['weekly maid service']         = 355;
		$xref['fireplace']                   = 364;
		$xref['sauna']                       = 365;
		$xref['internet wifi free']          = 368;
		$xref['cell phone rentals']          = 374;
		$xref['towels included']             = 395;
		$xref['health club']                 = 404;
		$xref['bbq']                         = 408;
		$xref['video game system']           = 418;
		$xref['games room']                  = 421;
		$xref['internet access high speed']  = 438;
		$xref['pair of twin beds']           = 440;
		$xref['bunk beds']                   = 444;
		$xref['free weekly cleaning']        = 448;
		$xref['courtyard']                   = 451;
		$xref['business centre']             = 461;
		$xref['fans on request']             = 490;
		$xref['luggage storage facilities']  = 497;
		$xref['parking private']             = 504;
		$xref['bed linen included']          = 589;
		$xref['iron']                        = 590;
		$xref['ironing board']               = 591;
		$xref['telephone']                   = 592;
		$xref['canal view']                  = 594;
		$xref['pets welcome']                = 595;
		$xref['cot free']                    = 596;
		$xref['cot free on request']         = 597;
		$xref['concierge']                   = 598;
		$xref['safe']                        = 601;
		$xref['sea view']                    = 604;
		$xref['fitness room']                = 605;
		$xref['spa']                         = 606;
		$xref['steam room']                  = 607;
		$xref['hot tub private']             = 611;
		$xref['hot tub shared']              = 612;
		$xref['laundry private']             = 613;
		$xref['laundry shared']              = 614;
		$xref['garden private']              = 625;
		$xref['garden shared']               = 626;
		$xref['laundry service']             = 628;
		$xref['baby listening device']       = 640;
		$xref['beach view']                  = 641;
		$xref['beach']                       = 642;
		$xref['billiard table']              = 647;
		$xref['ceiling fan']                 = 661;
		$xref['conference facilites']        = 663;
		$xref['doctor on call']              = 684;
		$xref['electronic door locks']       = 688;
		$xref['elevator']                    = 689;
		$xref['parking free']                = 702;
		$xref['telephone free local calls']  = 703;
		$xref['no smoking rooms/facilities'] = 725;
		$xref['ocean view']                  = 729;
		$xref['pets not allowed']            = 733;
		$xref['swimming pool heated']        = 737;
		$xref['swimming pool indoor']        = 738;
		$xref['steam bath']                  = 760;
		$xref['tennis court']                = 764;
		$xref['bathroom grab bars']          = 775;
		$xref['central heating']             = 789;
		$xref['parking']                     = 793;
		$xref['smoking permitted']           = 802;
		$xref['internet cable free']         = 807;
		$xref['internet cable paid']         = 808;
		$xref['internet wifi paid']          = 809;
		$xref['cot extra charge']            = 810;
		$xref['swimming pool communal']      = 815;
		$xref['swimming pool private']       = 816;

		return $xref;
	}

	/**
	 * Set WC amenities
	 *
	 * @since  2.3.0
	 * @return array
	 */
	protected function setAmenitiesWCXref(): array
	{
		$xref                     = [];
		$xref['bidet']            = 29;
		$xref['toilet']           = 37;
		$xref['chest of drawers'] = 78;
		$xref['washbasin']        = 245;
		$xref['heated towel bar'] = 447;
		$xref['mirror']           = 503;

		return $xref;
	}

	/**
	 * Set bed types
	 *
	 * @param   array  $data  Property bed types
	 *
	 * @since  1.2.2
	 * @return array
	 */
	protected function setBedTypes(array $data): array
	{
		$bedtypes = KrFactory::getListModel('bedtypes')->getAll();
		$xref     = array('single'        => 'single bed',
		                  'double'        => 'double bed',
		                  'twin'          => 'pair of twin beds',
		                  'queen'         => 'double bed',
		                  'king'          => 'king size bed',
		                  'singlesofabed' => 'sofabed',
		                  'doublesofabed' => 'double sofa bed',
		                  'extrabed1'     => 'extra bed',
		                  'extrabed2'     => 'extra bed');

		$generic = [];
		foreach ($bedtypes as $b)
		{
			if ($b->generic)
			{
				$generic[$xref[$b->generic]] = 0;
			}
		}

		foreach ($data as $d)
		{
			$beds = $d['bed_types'];
			foreach ($bedtypes as $b)
			{
				if (isset($beds[$b->id]))
				{
					$generic[$xref[$b->generic]] += (int) $beds[$b->id]['bed_number'];
					if ($b->generic == 'extrabed2')
					{
						$generic[$xref[$b->generic]] += (int) $beds[$b->id]['bed_number'];
					}
				}
			}
		}

		return $generic;
	}

	/**
	 * Set the cleaning fee
	 *
	 * @throws RuntimeException
	 * @since  1.2.2
	 */
	protected function setCleaningFee()
	{
		return KrFactory::getListModel('extras')->getCleaningFee($this->property_id);
	}

	/**
	 * Exclude the silly things that RU insists on like no dining table in a studio
	 *
	 * @since  3.3.1
	 * @return array
	 */
	protected function setExclusions(): array
	{
		$exclusions[] = array('room'    => 372,
		                      'amenity' => 250);
		$exclusions[] = array('room'    => 517,
		                      'amenity' => 70);
		$exclusions[] = array('room'    => 517,
		                      'amenity' => 250);

		return $exclusions;
	}

	/**
	 * Get RU ota property type from type
	 *
	 * @param $type_name
	 *
	 * @since  1.2.2
	 * @return int
	 */
	protected function setObjectTypeId($type_name): int
	{
		$type = strpos(strtolower($type_name), 'villa');
		if ($type !== false)
		{
			return 35;
		}
		else
		{
			return 3;
		}
	}

	/**
	 * Set property features
	 *
	 * @param $room_count    bool    Room amenities exist
	 * @param $room          string  Type of room
	 *
	 * @since  1.2.2
	 * @return array
	 */
	protected function setPropertyFeatures(bool $room_count, string $room = ''): array
	{
		$generic = [];

		foreach ($this->features as $f)
		{
			if ($f->generic && !$room_count)
			{
				$generic[$f->id] = $f->generic;
			}
			else if ($f->generic && $room_count && !$room && str_contains($f->room_type, 'property'))
			{
				$generic[$f->id] = $f->generic;
			}
			else if ($f->generic && $room_count && $room)
			{
				$types = [];
				if ($room == 'lk')
				{
					$types[] = 'living';
					$types[] = 'kitchen';
				}
				else if ($room == 'lb')
				{
					$types[] = 'living';
					$types[] = 'bedroom';
				}
				else if ($room == 'lbk')
				{
					$types[] = 'living';
					$types[] = 'bedroom';
					$types[] = 'kitchen';
				}
				else
				{
					$types[] = $room;
				}

				foreach ($types as $t)
				{
					if (str_contains($f->room_type, $t))
					{
						$generic[$f->id] = $f->generic;
					}
				}
			}
		}

		return $generic;
	}

	/**
	 * Get RU property type from number of bedrooms
	 *
	 * @param $bedrooms
	 *
	 * @since  2.3.0
	 * @return  int
	 */
	protected function setPropertyTypeId($bedrooms): int
	{
		$beds     = [];
		$beds[0]  = 1;
		$beds[1]  = 2;
		$beds[2]  = 3;
		$beds[3]  = 4;
		$beds[4]  = 12;
		$beds[5]  = 11;
		$beds[6]  = 26;
		$beds[7]  = 27;
		$beds[8]  = 28;
		$beds[9]  = 29;
		$beds[10] = 30;
		$beds[11] = 34;
		$beds[12] = 35;
		$beds[13] = 36;
		$beds[14] = 37;
		$beds[15] = 38;
		$beds[16] = 39;
		$beds[17] = 40;
		$beds[18] = 41;
		$beds[19] = 42;
		$beds[20] = 43;
		$beds[21] = 44;
		$beds[22] = 45;
		$beds[23] = 46;
		$beds[24] = 47;
		$beds[25] = 48;
		$beds[26] = 49;
		$beds[27] = 50;
		$beds[28] = 51;
		$beds[29] = 52;
		$beds[30] = 53;

		return $beds[$bedrooms];
	}

	/**
	 * Update the owner
	 *
	 * @throws Exception
	 * @since  1.2.2
	 */
	protected function updateOwnerId()
	{
		$parameters                 = [];
		$this->parameters->owner_id = $this->owner_id;
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