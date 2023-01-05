<?php
/**
 * @package    Know Reservations
 * @subpackage Library
 * @copyright  Copyright (c) 2020, Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\KR\Service\Channel\Ru;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\LosRates;
use HighlandVision\KR\Service\Channel\Ru;
use SimpleXMLElement;

use function count;
use function is_countable;
use function jexit;
use function number_format;

/**
 * Service channel rates for RU
 *
 * @since 1.0.0
 */
class Rates extends Ru
{
	/** @var array Property prices */
	protected array $prices = [];

	/**
	 * @param   int  $test  1 for test
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	public function __construct(int $test = 0)
	{
		parent::__construct($test);
	}

	/**
	 * Sent rates update
	 *
	 * @param   array  $queue  Queue of unactioned rate updates
	 *
	 * @throws Exception
	 * @since  2.0.0
	 */
	public function processQueue(array $queue)
	{
		foreach ($queue as $q)
		{
			try
			{
				if (!$q->id)
				{
					throw new Exception(KrMethods::sprintf('COM_KNOWRES_THROW_MISSING_PARAMETER', 'queue.id'));
				}
				if (!$q->property_id)
				{
					throw new Exception(KrMethods::sprintf('COM_KNOWRES_THROW_MISSING_PARAMETER', 'queue.property_id'));
				}
				if (!$q->foreign_key)
				{
					throw new Exception(KrMethods::sprintf('COM_KNOWRES_THROW_MISSING_PARAMETER', 'queue.foreign_key'));
				}

				$this->queue_id    = $q->id;
				$this->queue_ids   = [$q->id];
				$this->property_id = $q->property_id;
				$this->foreign_key = $q->foreign_key;
				$this->sendForProperty();
				//TODO-v4.1 for testing remove later
				jexit();

				$this->setQueueActioned();
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
	 * Send rates data for a property
	 *
	 * @throws Exception
	 * @since  3.0.0
	 */
	public function sendForProperty()
	{
		$this->readProperty($this->property_id);
		$this->getSettings($this->property_id);
		$this->setDates($this->today, $this->advance_bookings, $this->settings['advanceBookingsLimit']);
		$this->pushRateMethods();
	}

	/**
	 * Push last minute
	 *
	 * @throws Exception
	 * @since  2.2.0
	 */
	private function pushLastMinute()
	{
		$discounts = KrFactory::getListModel('discounts')->getDiscounts($this->property->id);

		$xml = new SimpleXMLElement('<Push_PutLastMinuteDiscounts_RQ></Push_PutLastMinuteDiscounts_RQ>');
		$xml = $this->addAuthentication($xml);

		$LastMinutesXml = $xml->addChild('LastMinutes');
		$LastMinutesXml->addAttribute('PropertyID', $this->foreign_key);

		foreach ($discounts as $d)
		{
			if (!$d->model && $d->is_pc && $d->valid_to > $this->first)
			{
				$valid_from = max($d->valid_from, $this->first);

				$LastMinuteXml = $LastMinutesXml->addChild('Lastminute', (int) $d->discount);
				$LastMinuteXml->addAttribute('DateFrom', $valid_from);
				$LastMinuteXml->addAttribute('DateTo', $d->valid_to);
				$LastMinuteXml->addAttribute('DaysToArrivalFrom', (int) $d->param1);
				$LastMinuteXml->addAttribute('DaysToArrivalTo', (int) $d->param2);
			}
		}

		$this->sendXml($xml, 'Push_PutLastMinuteDiscounts_RQ');
	}

	/**
	 * Push last minute managed
	 *
	 * @throws Exception
	 * @since  2.2.0
	 */
	private function pushLastMinuteManaged()
	{
		$xml = new SimpleXMLElement('<Push_PutLastMinuteDiscounts_RQ></Push_PutLastMinuteDiscounts_RQ>');
		$xml = $this->addAuthentication($xml);

		$LastMinutesXml = $xml->addChild('LastMinutes');
		$LastMinutesXml->addAttribute('PropertyID', $this->foreign_key);

		if ((int) $this->params->get('lmd_pc1', 0) > 0)
		{
			$LastMinuteXml = $LastMinutesXml->addChild('Lastminute', (int) $this->params->get('lmd_pc1', 10));
			$LastMinuteXml->addAttribute('DateFrom', $this->first);
			$LastMinuteXml->addAttribute('DateTo', $this->final);
			$LastMinuteXml->addAttribute('DaysToArrivalFrom', (int) $this->params->get('lmd_range_from1', 0));
			$LastMinuteXml->addAttribute('DaysToArrivalTo', (int) $this->params->get('lmd_range_to1', 7));
		}

		$this->sendXml($xml, 'Push_PutLastMinuteDiscounts_RQ');
	}

	/**
	 * Push long stay
	 *
	 * @throws Exception
	 * @since  2.2.0
	 */
	private function pushLongStay()
	{
		$xml = new SimpleXMLElement('<Push_PutLongStayDiscounts_RQ></Push_PutLongStayDiscounts_RQ>');
		$xml = $this->addAuthentication($xml);

		$LongStaysXml = $xml->addChild('LongStays');
		$LongStaysXml->addAttribute('PropertyID', $this->foreign_key);

		if ((int) $this->settings['longstay_days1'] > 0)
		{
			$LongStayXml = $LongStaysXml->addChild('Longstay', 100 - $this->settings['longstay_percentage1']);
			$LongStayXml->addAttribute('DateFrom', $this->first);
			$LongStayXml->addAttribute('DateTo', $this->final);
			$LongStayXml->addAttribute('Bigger', (int) $this->settings['longstay_days1'] + 1);

			if ((int) $this->settings['longstay_days2'])
			{
				$LongStayXml->addAttribute('Smaller', (int) $this->settings['longstay_days2']);
			}
			else
			{
				$LongStayXml->addAttribute('Smaller', 180);
			}
		}

		if ((int) $this->settings['longstay_days2'] > 0)
		{
			$LongStayXml = $LongStaysXml->addChild('Longstay', 100 - $this->settings['longstay_percentage2']);
			$LongStayXml->addAttribute('DateFrom', $this->first);
			$LongStayXml->addAttribute('DateTo', $this->final);
			$LongStayXml->addAttribute('Bigger', (int) $this->settings['longstay_days2'] + 1);

			if ((int) $this->settings['longstay_days3'])
			{
				$LongStayXml->addAttribute('Smaller', (int) $this->settings['longstay_days3']);
			}
			else
			{
				$LongStayXml->addAttribute('Smaller', 180);
			}
		}

		if ((int) $this->settings['longstay_days3'] > 0)
		{
			$LongStayXml = $LongStaysXml->addChild('Longstay', 100 - $this->settings['longstay_percentage3']);
			$LongStayXml->addAttribute('DateFrom', $this->first);
			$LongStayXml->addAttribute('DateTo', $this->final);
			$LongStayXml->addAttribute('Bigger', (int) $this->settings['longstay_days3'] + 1);
			$LongStayXml->addAttribute('Smaller', 180);
		}

		$this->sendXml($xml, 'Push_PutLongStayDiscounts_RQ');
	}

	/**
	 * Push rate methods to channel
	 *
	 * @throws Exception
	 * @since  3.3.1
	 */
	private function pushRateMethods()
	{
		$this->pushLongStay();

		if (!$this->settings['managed_rates'])
		{
			$this->pushLastMinute();
		}
		else if ($this->settings['managed_rates'] && !$this->settings['exclude_lastminute'])
		{
			$this->pushLastMinuteManaged();
		}

		$markup   = empty($this->parameters->markup) ? 0 : $this->parameters->markup;
		$LosRates = new LosRates($this->property_id, $this->settings, $markup);
		$rates    = $LosRates->getPrices($this->first, $this->final);
		$this->pushRates($rates);
	}

	/**
	 * Push rates to channel
	 *
	 * @param   array  $prices  Los rates
	 *
	 * @throws Exception
	 * @since  3.0.0
	 */
	private function pushRates(array $prices)
	{
		if (is_countable($prices) && count($prices))
		{
			$xml    = new SimpleXMLElement('<Push_PutPrices_RQ></Push_PutPrices_RQ>');
			$xml    = $this->addAuthentication($xml);
			$Prices = $xml->addChild('Prices');
			$Prices->addAttribute('PropertyID', $this->foreign_key);
			$FSPSeasons = $Prices->addChild('FSPSeasons');

			foreach ($prices as $date => $guests)
			{
				$FSPSeason = $FSPSeasons->addChild('FSPSeason');
				$FSPSeason->addAttribute('Date', $date);

				$first = true;
				foreach ($guests as $guest => $nights)
				{
					if ($first)
					{
						// TODO-v4.1 what is needed for default rate?
						$FSPSeason->addAttribute('DefaultPrice', number_format($nights[1], 2, '.', ''));
						$FSPRows = $FSPSeason->addChild('FSPRows');
						$first   = false;
					}

					$FSPRow = $FSPRows->addChild('FSPRow');
					$FSPRow->addAttribute('NrOfGuests', $guest);
					$Prices = $FSPRow->addChild('Prices');

					foreach ($nights as $night => $rate)
					{
						if ($rate > 0)
						{
							$Price = $Prices->addChild('Price', number_format($rate, 2, '.', ''));
							$Price->addAttribute('NrOfNights', $night);
						}
					}
				}
			}
		}

		$this->sendXml($xml, 'Push_PutPrices_RQ');
	}
}